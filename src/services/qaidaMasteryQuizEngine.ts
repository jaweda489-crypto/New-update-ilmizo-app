import { NOORANI_QAIDA_COURSE_LESSONS, QaidaCourseLesson } from '../data/nooraniQaidaCourse';
import { NOORANI_QAIDA_28_LETTERS } from './humanDuaAndQaidaAudio';

export interface QaidaMasteryQuestionOption {
  id: string;
  arabic: string;
  label: string;
  sublabel?: string;
}

export interface QaidaMasteryQuestion {
  id: string;
  questionIndex: number;
  kind: 'audio_recognition' | 'drill_recognition' | 'rule_check';
  promptEn: string;
  promptHinglish: string;
  /** Audio source to play when user taps "Hear Sound" */
  audio: {
    letterAudioSlug?: string;
    wbwWordPath?: string;
    globalAyahNumber?: number;
    arabicText: string;
    spokenLabel: string;
  };
  /** Optional visible Arabic target (hidden in pure audio_recognition questions so the child listens!) */
  visibleTargetArabic?: string;
  options: QaidaMasteryQuestionOption[];
  correctIndex: number;
  explanationEn: string;
}

export interface QaidaMasteryQuizSession {
  lessonId: string;
  lessonNumber: number;
  passingScorePercent: number;
  questions: QaidaMasteryQuestion[];
}

export const QAIDA_MASTERY_PASS_PERCENT = 80; // 4 out of 5 questions
export const QAIDA_MASTERY_QUESTION_COUNT = 5;

function seededShuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  let s = Math.abs(seed | 0) || 1;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function extractLetterAudioSlug(mp3Url: string): string {
  const match = mp3Url.match(/\/([^/]+)\.mp3$/i);
  return match ? match[1] : 'alif';
}

/**
 * Generates a deterministic 5-question Duolingo-style Audio Recognition & Drill Mastery Quiz
 * for any Noorani Qaida lesson (Lessons 1–17).
 * - Lesson 1: 4 pure Audio-First Letter Recognition questions (using bundled real human MP3s) + 1 Rule check.
 * - Lessons 2–17: 4 Drill Audio/Visual Recognition questions from the lesson's real tiles + 1 Rule check.
 */
export function buildQaidaMasteryQuiz(
  lessonOrNumber: QaidaCourseLesson | number,
  seed = 42
): QaidaMasteryQuizSession {
  const lesson =
    typeof lessonOrNumber === 'number'
      ? NOORANI_QAIDA_COURSE_LESSONS.find((l) => l.lessonNumber === lessonOrNumber) ||
        NOORANI_QAIDA_COURSE_LESSONS[0]
      : lessonOrNumber;

  const questions: QaidaMasteryQuestion[] = [];

  if (lesson.lessonNumber === 1) {
    // 4 Audio-First Letter Recognition questions using verified bundled human MP3 letters
    const pickedLetters = seededShuffle(NOORANI_QAIDA_28_LETTERS, seed + 17).slice(0, 4);
    pickedLetters.forEach((target, qIdx) => {
      const distractors = seededShuffle(
        NOORANI_QAIDA_28_LETTERS.filter((l) => l.id !== target.id),
        seed + (qIdx + 1) * 97
      ).slice(0, 3);

      const rawOptions: Array<{ option: QaidaMasteryQuestionOption; isCorrect: boolean }> = [
        {
          option: {
            id: `opt_${target.id}`,
            arabic: target.letterArabic,
            label: target.nameEn,
            sublabel: target.makhrajTip.en,
          },
          isCorrect: true,
        },
        ...distractors.map((d) => ({
          option: {
            id: `opt_${d.id}`,
            arabic: d.letterArabic,
            label: d.nameEn,
            sublabel: d.makhrajTip.en,
          },
          isCorrect: false,
        })),
      ];

      const shuffled = seededShuffle(rawOptions, seed + (qIdx + 3) * 31);
      const correctIndex = shuffled.findIndex((item) => item.isCorrect);

      questions.push({
        id: `${lesson.id}_q_${qIdx + 1}`,
        questionIndex: qIdx,
        kind: 'audio_recognition',
        promptEn: 'Listen carefully and tap the Arabic letter you hear!',
        promptHinglish: 'Dhyan se suno aur jo Arabic harf suna us par tap karo!',
        audio: {
          letterAudioSlug: extractLetterAudioSlug(target.letterAudioMp3Url),
          arabicText: target.letterArabic,
          spokenLabel: target.nameEn,
        },
        options: shuffled.map((item) => item.option),
        correctIndex,
        explanationEn: `That sound is "${target.nameEn}" (${target.letterArabic}) — ${target.makhrajTip.en}`,
      });
    });
  } else {
    // Lessons 2–17: Build 4 audio/drill recognition questions from the lesson's real tiles
    const lessonTiles = lesson.tiles || [];
    const fallbackTiles = NOORANI_QAIDA_COURSE_LESSONS.flatMap((l) => l.tiles || []);
    const primaryPool = lessonTiles.length >= 4 ? lessonTiles : [...lessonTiles, ...fallbackTiles];
    const ownPicked = seededShuffle(lessonTiles, seed + lesson.lessonNumber * 29).slice(0, 4);
    const padNeeded = Math.max(0, 4 - ownPicked.length);
    const padTiles =
      padNeeded > 0
        ? seededShuffle(
            fallbackTiles.filter((ft) => !ownPicked.some((ot) => ot.arabic === ft.arabic)),
            seed + lesson.lessonNumber * 61
          ).slice(0, padNeeded)
        : [];
    const pickedTargets = [...ownPicked, ...padTiles];

    pickedTargets.forEach((tile, qIdx) => {
      const hasAudioSource = Boolean(
        tile.letterAudioSlug || tile.wbwWordPath || tile.globalAyahNumber
      );

      const distractorPool = primaryPool.filter(
        (d) => d.arabic !== tile.arabic && d.transliteration !== tile.transliteration
      );
      const distractors = seededShuffle(
        distractorPool,
        seed + lesson.lessonNumber * 53 + qIdx * 19
      ).slice(0, 3);

      const isAudioFirst = hasAudioSource && qIdx % 2 === 0;

      const rawOptions: Array<{ option: QaidaMasteryQuestionOption; isCorrect: boolean }> = [
        {
          option: {
            id: `opt_${tile.id}`,
            arabic: tile.arabic,
            label: isAudioFirst ? 'Tap to choose' : tile.transliteration,
            sublabel: tile.tajweedRuleNote.en,
          },
          isCorrect: true,
        },
        ...distractors.map((d, dIdx) => ({
          option: {
            id: `opt_${d.id}_${dIdx}`,
            arabic: d.arabic,
            label: isAudioFirst ? 'Tap to choose' : d.transliteration,
            sublabel: d.tajweedRuleNote.en,
          },
          isCorrect: false,
        })),
      ];

      const shuffled = seededShuffle(rawOptions, seed + qIdx * 43 + lesson.lessonNumber * 11);
      const correctIndex = shuffled.findIndex((item) => item.isCorrect);

      questions.push({
        id: `${lesson.id}_q_${qIdx + 1}`,
        questionIndex: qIdx,
        kind: isAudioFirst ? 'audio_recognition' : 'drill_recognition',
        promptEn: isAudioFirst
          ? 'Tap Play, listen to the pronunciation, and pick the matching Arabic drill!'
          : `Which Arabic drill matches "${tile.transliteration}"?`,
        promptHinglish: isAudioFirst
          ? 'Play dabao, awaaz suno aur sahi Arabic lafz chuno!'
          : `"${tile.transliteration}" ke liye sahi Arabic lafz chuno!`,
        audio: {
          letterAudioSlug: tile.letterAudioSlug,
          wbwWordPath: tile.wbwWordPath,
          globalAyahNumber: tile.globalAyahNumber,
          arabicText: tile.arabic,
          spokenLabel: tile.transliteration,
        },
        options: shuffled.map((item) => item.option),
        correctIndex,
        explanationEn: `${tile.arabic} is read as "${tile.transliteration}" — ${tile.tajweedRuleNote.en}`,
      });
    });
  }

  // Question 5: Canonical Lesson Rule Check from lesson.quiz
  const ruleOptionsRaw = lesson.quiz.options.map((opt, idx) => ({
    option: {
      id: `rule_opt_${idx}`,
      arabic: opt.arabic,
      label: opt.label,
    },
    isCorrect: idx === lesson.quiz.correctIndex,
  }));
  const shuffledRuleOptions = seededShuffle(ruleOptionsRaw, seed + lesson.lessonNumber * 71);
  const ruleCorrectIndex = shuffledRuleOptions.findIndex((item) => item.isCorrect);

  questions.push({
    id: `${lesson.id}_q_5`,
    questionIndex: questions.length,
    kind: 'rule_check',
    promptEn: lesson.quiz.prompt.en,
    promptHinglish: lesson.quiz.prompt.hinglish || lesson.quiz.prompt.en,
    audio: {
      arabicText: lesson.quiz.arabicTarget,
      spokenLabel: lesson.title.en,
      wbwWordPath: lesson.tiles?.[0]?.wbwWordPath,
      letterAudioSlug: lesson.tiles?.[0]?.letterAudioSlug,
      globalAyahNumber: lesson.tiles?.[0]?.globalAyahNumber,
    },
    visibleTargetArabic: lesson.quiz.arabicTarget,
    options: shuffledRuleOptions.map((item) => item.option),
    correctIndex: ruleCorrectIndex,
    explanationEn: lesson.quiz.explanation.en,
  });

  return {
    lessonId: lesson.id,
    lessonNumber: lesson.lessonNumber,
    passingScorePercent: QAIDA_MASTERY_PASS_PERCENT,
    questions,
  };
}

export function evaluateQaidaMasteryResult(params: {
  correctCount: number;
  totalQuestions: number;
}): {
  scorePercent: number;
  passed: boolean;
  starsEarned: number;
} {
  const total = Math.max(1, params.totalQuestions);
  const correct = Math.max(0, Math.min(total, params.correctCount));
  const scorePercent = Math.round((correct / total) * 100);
  const passed = scorePercent >= QAIDA_MASTERY_PASS_PERCENT;
  const starsEarned = passed ? (scorePercent === 100 ? 15 : 10) : 0;
  return { scorePercent, passed, starsEarned };
}
