import 'dotenv/config';
import crypto from 'node:crypto';
import http from 'node:http';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';

const PORT = Number(process.env.PORT || 3000);
const TTS_STORY_MODEL = 'gemini-3.8-flash-tts';
const TTS_QAIDA_MODEL = 'gemini-3.8-flash-lite-tts';
const TAJWEED_MODEL = 'gemini-4-hydrogen';
const SERVER_AUDIO_CACHE_DIR = path.resolve(process.cwd(), '.ilmizo-server-cache', 'audio');

interface ServerCachedAudioEntry {
  version: string;
  contentId: string;
  mimeType: string;
  voiceName?: string;
  base64Audio: string;
  bytes: number;
  sha256: string;
  createdAtIso: string;
}

function hashCacheKey(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex');
}

function readServerAudioCache(cacheKey: string): ServerCachedAudioEntry | null {
  try {
    const filePath = path.join(SERVER_AUDIO_CACHE_DIR, `${cacheKey}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as ServerCachedAudioEntry;
    if (!parsed?.base64Audio || typeof parsed.base64Audio !== 'string' || parsed.base64Audio.length < 64) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeServerAudioCache(cacheKey: string, entry: Omit<ServerCachedAudioEntry, 'version' | 'sha256' | 'createdAtIso'>): void {
  try {
    if (!entry.base64Audio || entry.base64Audio.length < 64) return;
    fs.mkdirSync(SERVER_AUDIO_CACHE_DIR, { recursive: true });
    const fullEntry: ServerCachedAudioEntry = {
      version: 'v1',
      contentId: entry.contentId,
      mimeType: entry.mimeType,
      voiceName: entry.voiceName,
      base64Audio: entry.base64Audio,
      bytes: entry.bytes,
      sha256: crypto.createHash('sha256').update(entry.base64Audio).digest('hex'),
      createdAtIso: new Date().toISOString(),
    };
    const finalPath = path.join(SERVER_AUDIO_CACHE_DIR, `${cacheKey}.json`);
    const tmpPath = `${finalPath}.${process.pid}.${Date.now()}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(fullEntry), 'utf8');
    fs.renameSync(tmpPath, finalPath);
  } catch {
    // Non-fatal server cache write failure
  }
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function languageDisplayLabel(lang: string): string {
  switch (lang) {
    case 'hi':
      return 'Hindi (Devanagari, warm natural pronunciation)';
    case 'ur':
      return 'Urdu (polite, warm storytelling tone)';
    case 'hinglish':
      return 'Hinglish (conversational Hindi-English, warm and natural for Indian families)';
    case 'ar':
      return 'Modern Standard Arabic (clear, gentle storytelling for children)';
    default:
      return 'English (warm, clear storytelling for children)';
  }
}

function uiLanguageInstructionName(lang: string): string {
  switch (lang) {
    case 'hi':
      return 'Hindi (Devanagari script, gentle encouraging tone)';
    case 'ur':
      return 'Urdu (gentle encouraging tone)';
    case 'hinglish':
      return 'Hinglish (friendly everyday Roman Hindi + English)';
    case 'ar':
      return 'Arabic (clear and encouraging)';
    default:
      return 'English (clear and encouraging)';
  }
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json({ limit: '14mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
      timestampIso: new Date().toISOString(),
    });
  });

  // 1. Studio Human Storyteller Audio (Shared Server Cache + Gemini 3.8 Flash TTS -> WAV audio)
  app.post('/api/ai/story-audio', async (req, res) => {
    const body = req.body as {
      storyId?: string;
      pageIndex?: number;
      text?: string;
      language?: string;
      voiceStyle?: 'storyteller' | 'teacher';
    };

    const storyId = typeof body?.storyId === 'string' ? body.storyId.trim() : 'story';
    const pageIndex = typeof body?.pageIndex === 'number' && Number.isFinite(body.pageIndex) ? body.pageIndex : 0;
    const text = typeof body?.text === 'string' ? body.text.trim() : '';
    const language = typeof body?.language === 'string' ? body.language : 'en';
    const voiceStyle = body?.voiceStyle === 'teacher' ? 'teacher' : 'storyteller';

    if (!text) {
      res.status(400).json({ ok: false, error: 'Story page text is required.' });
      return;
    }

    const voiceName = voiceStyle === 'teacher' ? 'Zephyr' : 'Kore';
    const cacheKey = `story_${hashCacheKey(`${storyId}|${pageIndex}|${language}|${voiceStyle}|${text.slice(0, 2200)}`)}`;
    const cached = readServerAudioCache(cacheKey);
    if (cached) {
      res.json({
        ok: true,
        mimeType: cached.mimeType,
        base64Audio: cached.base64Audio,
        voiceName: cached.voiceName || voiceName,
        fromServerCache: true,
        contentVersion: cached.version,
        checksumSha256: cached.sha256,
      });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        ok: false,
        error: 'Studio Storyteller service requires GEMINI_API_KEY on the server.',
      });
      return;
    }

    const styleDirective =
      voiceStyle === 'teacher'
        ? `Warm, calm, affectionate Islamic teacher reading a short children's story aloud in ${languageDisplayLabel(language)}. Pronounce Islamic terms like Allah, Bismillah, SubhanAllah, and Prophet names respectfully and clearly at a soothing child-friendly pace.`
        : `Warm, loving grandmother/storyteller (Dadi/Nani style) reading an Islamic bedtime story to children in ${languageDisplayLabel(language)}. Expressive, gentle, engaging, and clear.`;

    try {
      const response = await ai.models.generateContent({
        model: TTS_STORY_MODEL,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Speak the following children's story passage verbatim with warm human expression and zero added commentary:\n\n${text.slice(0, 2200)}`,
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
          speechMetadata: {
            style: styleDirective,
          },
        } as Record<string, unknown>,
      });

      const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      const base64Audio = inlineData?.data;
      const mimeType = inlineData?.mimeType || 'audio/wav';

      if (!base64Audio) {
        res.status(502).json({
          ok: false,
          error: 'Studio storyteller returned no audio data. Please try again.',
        });
        return;
      }

      const byteLen = Buffer.from(base64Audio, 'base64').byteLength;
      writeServerAudioCache(cacheKey, {
        contentId: `${storyId}:p${pageIndex}:${language}:${voiceStyle}`,
        mimeType,
        voiceName,
        base64Audio,
        bytes: byteLen,
      });

      res.json({
        ok: true,
        mimeType,
        base64Audio,
        voiceName,
        fromServerCache: false,
        contentVersion: 'v1',
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to generate studio storyteller audio.';
      res.status(502).json({ ok: false, error: message });
    }
  });

  // 2. Noorani Qaida Syllable & Harakat Studio Audio (Shared Server Cache + Gemini 3.8 Flash Lite TTS)
  app.post('/api/ai/qaida-syllable', async (req, res) => {
    const body = req.body as {
      arabicText?: string;
      label?: string;
    };

    const arabicText = typeof body?.arabicText === 'string' ? body.arabicText.trim() : '';
    const label = typeof body?.label === 'string' ? body.label.trim() : '';

    if (!arabicText) {
      res.status(400).json({ ok: false, error: 'arabicText is required.' });
      return;
    }

    const cacheKey = `qaida_${hashCacheKey(`${arabicText}|${label}`)}`;
    const cached = readServerAudioCache(cacheKey);
    if (cached) {
      res.json({
        ok: true,
        mimeType: cached.mimeType,
        base64Audio: cached.base64Audio,
        fromServerCache: true,
        contentVersion: cached.version,
        checksumSha256: cached.sha256,
      });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        ok: false,
        error: 'Qaida syllable studio audio requires GEMINI_API_KEY on the server.',
      });
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: TTS_QAIDA_MODEL,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Pronounce ONLY this Arabic Noorani Qaida syllable or short word once in crisp classical Quranic Arabic (Tajweed Harakat accuracy for Fatha, Kasra, Damma, Tanween, Sukoon, or Shaddah), with no explanation or extra words: ${arabicText}${label ? ` (${label})` : ''}`,
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Charon' },
            },
          },
          speechMetadata: {
            style:
              'Patient, articulate classical Arabic Quran Ustad pronouncing a single Noorani Qaida syllable or short word clearly for a child learning Tajweed.',
          },
        } as Record<string, unknown>,
      });

      const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      const base64Audio = inlineData?.data;
      const mimeType = inlineData?.mimeType || 'audio/wav';

      if (!base64Audio) {
        res.status(502).json({
          ok: false,
          error: 'Qaida audio generator returned empty audio.',
        });
        return;
      }

      const byteLen = Buffer.from(base64Audio, 'base64').byteLength;
      writeServerAudioCache(cacheKey, {
        contentId: `qaida_syl:${arabicText}`,
        mimeType,
        voiceName: 'Charon',
        base64Audio,
        bytes: byteLen,
      });

      res.json({
        ok: true,
        mimeType,
        base64Audio,
        fromServerCache: false,
        contentVersion: 'v1',
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to generate Qaida syllable audio.';
      res.status(502).json({ ok: false, error: message });
    }
  });

  // 3. Tarteel-Style AI Tajweed & Harakat Recitation Coach (Gemini 4 Hydrogen Audio Understanding)
  app.post('/api/ai/tajweed-check', async (req, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        ok: false,
        error: 'AI Tajweed Coach requires GEMINI_API_KEY on the server.',
      });
      return;
    }

    const body = req.body as {
      audioBase64?: string;
      mimeType?: string;
      targetArabic?: string;
      targetTransliteration?: string;
      uiLanguage?: string;
      mode?: 'kids' | 'adult';
    };

    const audioBase64 = typeof body?.audioBase64 === 'string' ? body.audioBase64.trim() : '';
    const mimeType = typeof body?.mimeType === 'string' ? body.mimeType.trim() : 'audio/webm';
    const targetArabic = typeof body?.targetArabic === 'string' ? body.targetArabic.trim() : '';
    const targetTransliteration =
      typeof body?.targetTransliteration === 'string' ? body.targetTransliteration.trim() : '';
    const uiLanguage = typeof body?.uiLanguage === 'string' ? body.uiLanguage : 'en';
    const mode = body?.mode === 'kids' ? 'kids' : 'adult';

    if (!audioBase64 || !targetArabic) {
      res.status(400).json({
        ok: false,
        error: 'Recorded audio and target Arabic verse are required.',
      });
      return;
    }

    const coachingInstruction =
      mode === 'kids'
        ? `You are an encouraging, gentle Quran Tajweed teacher helping a child practice reciting Arabic Ayahs.`
        : `You are an attentive, accurate Quran Tajweed coach reviewing an adult's recitation.`;

    const prompt = `${coachingInstruction}
Listen carefully to the attached audio recording and compare it against the target Arabic Ayah below.

Target Arabic: ${targetArabic}
Transliteration: ${targetTransliteration || 'N/A'}

Evaluate:
1. Word-by-word presence and order.
2. Short & long vowel accuracy (Harakat: Zabar/Fatha, Zer/Kasra, Pesh/Damma, Tanween, Shaddah, Madd).
3. Letter articulation (Makhraj), e.g., heavy vs light letters or throat letters.

Write "feedbackSummary", "makhrajTip", "accuracyLabel", and each word's "note" in ${uiLanguageInstructionName(uiLanguage)}.
Be honest: if the audio is silent, noise-only, or clearly a different phrase, score it low and state clearly what was heard.`;

    try {
      const response = await ai.models.generateContent({
        model: TAJWEED_MODEL,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType.split(';')[0] || 'audio/webm',
                data: audioBase64,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: {
                type: Type.INTEGER,
                description: 'Recitation accuracy score from 0 to 100.',
              },
              accuracyLabel: {
                type: Type.STRING,
                description: 'Short label like "MashaAllah Clear", "Watch Harakat", or "Try Again Slowly".',
              },
              transcriptArabic: {
                type: Type.STRING,
                description: 'What was heard in Arabic script, or "[unclear/silent]" if no Arabic speech.',
              },
              feedbackSummary: {
                type: Type.STRING,
                description: 'Concise 1-2 sentence encouraging feedback in the requested UI language.',
              },
              makhrajTip: {
                type: Type.STRING,
                description: 'One concrete actionable Harakat or Makhraj tip in the requested UI language.',
              },
              wordFeedback: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    status: {
                      type: Type.STRING,
                      enum: ['correct', 'harakat_issue', 'makhraj_issue', 'missed'],
                    },
                    note: { type: Type.STRING },
                  },
                  required: ['word', 'status', 'note'],
                },
              },
            },
            required: [
              'overallScore',
              'accuracyLabel',
              'transcriptArabic',
              'feedbackSummary',
              'makhrajTip',
              'wordFeedback',
            ],
          },
        },
      });

      const rawText = response.text;
      if (!rawText) {
        res.status(502).json({ ok: false, error: 'AI Tajweed Coach returned an empty response.' });
        return;
      }

      const parsed = JSON.parse(rawText);
      res.json({ ok: true, result: parsed });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to analyze recitation audio right now.';
      res.status(502).json({ ok: false, error: message });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
        ws: {
          server: httpServer,
        },
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.get('*', async (req, res, next) => {
      if (
        req.originalUrl.startsWith('/api/') ||
        req.originalUrl.startsWith('/assets/') ||
        /\.[a-z0-9]{2,6}(\?.*)?$/i.test(req.originalUrl)
      ) {
        next();
        return;
      }
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        const template = fs.readFileSync(indexPath, 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (req, res, next) => {
      if (req.originalUrl.startsWith('/api/')) {
        next();
        return;
      }
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Ilmizo server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Ilmizo server:', err);
  process.exit(1);
});
