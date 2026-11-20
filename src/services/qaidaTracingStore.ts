export interface LetterTracingMasteryRecord {
  letterId: string;
  letterArabic: string;
  letterName: string;
  tracedCount: number;
  bestCoveragePercent: number;
  lastTracedIso: string;
}

export interface QaidaMistakeRecord {
  id: string;
  lessonId: string;
  lessonNumber: number;
  arabicText: string;
  label: string;
  missCount: number;
  lastMissedIso: string;
  resolved: boolean;
}

export interface QaidaChildLocalMastery {
  tracingByLetterId: Record<string, LetterTracingMasteryRecord>;
  mistakes: QaidaMistakeRecord[];
}

export interface LetterStrokeGuide {
  startX: number; // Normalized 0..1 on canvas width
  startY: number; // Normalized 0..1 on canvas height
  endX: number;
  endY: number;
  directionHint: string;
}

const QAIDA_MASTERY_STORE_KEY = 'ilmizo_qaida_local_mastery_v1';

function readAllMasteryMap(): Record<string, QaidaChildLocalMastery> {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(QAIDA_MASTERY_STORE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeAllMasteryMap(map: Record<string, QaidaChildLocalMastery>): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(QAIDA_MASTERY_STORE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage errors
  }
}

export function loadChildQaidaMastery(childId: string): QaidaChildLocalMastery {
  const all = readAllMasteryMap();
  const entry = all[childId];
  if (!entry) {
    return { tracingByLetterId: {}, mistakes: [] };
  }
  return {
    tracingByLetterId: entry.tracingByLetterId || {},
    mistakes: Array.isArray(entry.mistakes) ? entry.mistakes : [],
  };
}

export function saveChildLetterTracingProgress(params: {
  childId: string;
  letterId: string;
  letterArabic: string;
  letterName: string;
  coveragePercent: number;
}): QaidaChildLocalMastery {
  const all = readAllMasteryMap();
  const current = all[params.childId] || { tracingByLetterId: {}, mistakes: [] };
  const existing = current.tracingByLetterId[params.letterId];

  current.tracingByLetterId[params.letterId] = {
    letterId: params.letterId,
    letterArabic: params.letterArabic,
    letterName: params.letterName,
    tracedCount: (existing?.tracedCount || 0) + 1,
    bestCoveragePercent: Math.max(existing?.bestCoveragePercent || 0, params.coveragePercent),
    lastTracedIso: new Date().toISOString(),
  };

  all[params.childId] = current;
  writeAllMasteryMap(all);
  return current;
}

export function recordChildQaidaMistake(params: {
  childId: string;
  lessonId: string;
  lessonNumber: number;
  arabicText: string;
  label: string;
}): QaidaChildLocalMastery {
  const all = readAllMasteryMap();
  const current = all[params.childId] || { tracingByLetterId: {}, mistakes: [] };
  const mistakeId = `${params.lessonId}::${params.arabicText}`;
  const existingIdx = current.mistakes.findIndex((m) => m.id === mistakeId);

  if (existingIdx >= 0) {
    const prev = current.mistakes[existingIdx];
    current.mistakes[existingIdx] = {
      ...prev,
      missCount: prev.missCount + 1,
      lastMissedIso: new Date().toISOString(),
      resolved: false,
    };
  } else {
    current.mistakes.unshift({
      id: mistakeId,
      lessonId: params.lessonId,
      lessonNumber: params.lessonNumber,
      arabicText: params.arabicText,
      label: params.label,
      missCount: 1,
      lastMissedIso: new Date().toISOString(),
      resolved: false,
    });
  }

  current.mistakes = current.mistakes.slice(0, 24);
  all[params.childId] = current;
  writeAllMasteryMap(all);
  return current;
}

export function markChildQaidaMistakeResolved(
  childId: string,
  mistakeId: string
): QaidaChildLocalMastery {
  const all = readAllMasteryMap();
  const current = all[childId] || { tracingByLetterId: {}, mistakes: [] };
  current.mistakes = current.mistakes.map((m) =>
    m.id === mistakeId ? { ...m, resolved: true } : m
  );
  all[childId] = current;
  writeAllMasteryMap(all);
  return current;
}

export function getActiveQaidaRevisionRecommendations(
  childId: string,
  limit = 4
): QaidaMistakeRecord[] {
  const mastery = loadChildQaidaMastery(childId);
  return mastery.mistakes
    .filter((m) => !m.resolved)
    .sort((a, b) => b.missCount - a.missCount)
    .slice(0, limit);
}

/**
 * Provides clear RTL calligraphy start & end anchor guidance for Arabic letters
 * so young learners learn proper top-to-bottom / right-to-left writing direction.
 */
export function getArabicLetterStrokeGuide(letterArabic: string): LetterStrokeGuide {
  const verticalTopDown = new Set(['ا', 'ل', 'ط', 'ظ', 'ك']);
  const rightBowls = new Set(['ب', 'ت', 'ث', 'ن', 'ف', 'ق', 'س', 'ش', 'ص', 'ض', 'ي']);
  const archRightToLeft = new Set(['ج', 'ح', 'خ', 'ع', 'غ']);
  const curvedDescenders = new Set(['د', 'ذ', 'ر', 'ز', 'و', 'م', 'ه']);

  if (verticalTopDown.has(letterArabic)) {
    return {
      startX: 0.52,
      startY: 0.24,
      endX: 0.48,
      endY: 0.72,
      directionHint: 'Start at the top dot and glide straight down',
    };
  }
  if (rightBowls.has(letterArabic)) {
    return {
      startX: 0.66,
      startY: 0.46,
      endX: 0.34,
      endY: 0.52,
      directionHint: 'Start on the right dot and sweep smoothly to the left',
    };
  }
  if (archRightToLeft.has(letterArabic)) {
    return {
      startX: 0.58,
      startY: 0.34,
      endX: 0.44,
      endY: 0.72,
      directionHint: 'Trace the top crest right-to-left, then curve gently down',
    };
  }
  if (curvedDescenders.has(letterArabic)) {
    return {
      startX: 0.58,
      startY: 0.38,
      endX: 0.38,
      endY: 0.68,
      directionHint: 'Start upper-right and curve smoothly down toward the left',
    };
  }
  return {
    startX: 0.62,
    startY: 0.4,
    endX: 0.38,
    endY: 0.62,
    directionHint: 'Start at the emerald dot (1) and trace smoothly right to left',
  };
}
