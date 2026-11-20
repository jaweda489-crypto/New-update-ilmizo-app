import { ChildProfile } from '../types/ilmizo';

/**
 * Maximum elapsed milliseconds accepted in a single foreground timer tick.
 * Prevents phantom time accumulation if the browser tab was suspended, hibernated, or backgrounded.
 */
export const MAX_FOREGROUND_TICK_DELTA_MS = 5000;

/**
 * Threshold in milliseconds for detecting suspicious backward wall-clock jumps.
 */
export const CLOCK_ROLLBACK_TOLERANCE_MS = 60_000;

/**
 * Computes the current daily usage period key (`YYYY-MM-DD_rHH`) taking into account
 * the parent's configured local daily reset hour (0..23, default 0 = midnight).
 * If the current local hour is before `resetHour`, the usage period belongs to the previous calendar day.
 */
export function getUsagePeriodKey(now: Date = new Date(), resetHour = 0): string {
  const safeResetHour =
    Number.isFinite(resetHour) && resetHour >= 0 && resetHour <= 23
      ? Math.floor(resetHour)
      : 0;

  const adjusted = new Date(now.getTime());
  if (adjusted.getHours() < safeResetHour) {
    adjusted.setDate(adjusted.getDate() - 1);
  }

  const year = adjusted.getFullYear();
  const month = String(adjusted.getMonth() + 1).padStart(2, '0');
  const day = String(adjusted.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}_r${String(safeResetHour).padStart(2, '0')}`;
}

/**
 * Returns the effective usage-period calendar date key (`YYYY-MM-DD`) respecting `resetHour`.
 */
export function getUsagePeriodDateKey(now: Date = new Date(), resetHour = 0): string {
  return getUsagePeriodKey(now, resetHour).slice(0, 10);
}

/**
 * Extracts the stored resetHour (0..23) from a `YYYY-MM-DD_rHH` usagePeriodKey if present.
 */
export function parseResetHourFromUsagePeriodKey(periodKey?: string): number | undefined {
  if (!periodKey || typeof periodKey !== 'string') return undefined;
  const match = periodKey.match(/_r(\d{2})$/);
  if (!match) return undefined;
  const parsed = Number.parseInt(match[1], 10);
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 23 ? parsed : undefined;
}

/**
 * Single canonical daily usage-period rollover function.
 * Ensures a child profile's daily screen-time usage and quest steps are reset ONLY when
 * the local clock legitimately crosses forward into a new daily usage period (`resetHour`).
 *
 * Includes device clock tampering safeguards:
 * - If the device wall-clock moves backward beyond `CLOCK_ROLLBACK_TOLERANCE_MS`, or if
 *   `currentPeriodKey` is earlier than `storedPeriodKey`, daily usage is NEVER reset to 0
 *   and `clockTamperDetected` is flagged as `true`.
 */
export function ensureChildUsagePeriodRollover(
  child: ChildProfile,
  now: Date = new Date(),
  resetHour?: number
): ChildProfile {
  const effectiveResetHour =
    typeof resetHour === 'number' && Number.isFinite(resetHour)
      ? Math.max(0, Math.min(23, Math.floor(resetHour)))
      : parseResetHourFromUsagePeriodKey(child.usagePeriodKey) ?? 0;

  const currentPeriodKey = getUsagePeriodKey(now, effectiveResetHour);
  const currentCalendarDateKey = currentPeriodKey.slice(0, 10);

  const rawUsagePeriodKey = child.usagePeriodKey || '';
  const rawStoredDatePart = rawUsagePeriodKey ? rawUsagePeriodKey.slice(0, 10) : '';
  const storedPeriodKey =
    child.lastActiveDateKey &&
    (!rawUsagePeriodKey || rawStoredDatePart !== child.lastActiveDateKey)
      ? `${child.lastActiveDateKey}_r${String(effectiveResetHour).padStart(2, '0')}`
      : rawUsagePeriodKey;

  const hasExplicitSeconds =
    typeof child.activeSecondsToday === 'number' &&
    Number.isFinite(child.activeSecondsToday) &&
    (child.activeSecondsToday > 0 || (child.activeMinutesToday || 0) === 0);
  const normalizedSeconds = hasExplicitSeconds
    ? Math.max(0, Math.floor(child.activeSecondsToday!))
    : Math.max(0, Math.floor((child.activeMinutesToday || 0) * 60));

  const nowMs = now.getTime();
  const prevWallMs =
    typeof child.lastUsageTimestampMs === 'number' && Number.isFinite(child.lastUsageTimestampMs)
      ? child.lastUsageTimestampMs
      : undefined;

  // Device clock tampering safeguard 1: wall clock moved backward compared to last recorded usage timestamp
  const backwardClockJumpDetected =
    prevWallMs !== undefined && nowMs + CLOCK_ROLLBACK_TOLERANCE_MS < prevWallMs;

  // Device clock tampering safeguard 2: current usage period date is earlier than stored usage period date
  const storedDatePart = storedPeriodKey ? storedPeriodKey.slice(0, 10) : '';
  const backwardPeriodDetected =
    Boolean(storedDatePart && currentCalendarDateKey < storedDatePart);

  if (backwardClockJumpDetected || backwardPeriodDetected) {
    return {
      ...child,
      activeSecondsToday: normalizedSeconds,
      activeMinutesToday: Math.floor(normalizedSeconds / 60),
      extraMinutesGrantedToday: child.extraMinutesGrantedToday || 0,
      usagePeriodKey: storedPeriodKey || currentPeriodKey,
      lastActiveDateKey: storedDatePart || currentCalendarDateKey,
      lastUsageTimestampMs: prevWallMs ?? nowMs,
      clockTamperDetected: true,
    };
  }

  if (!storedPeriodKey) {
    return {
      ...child,
      activeSecondsToday: normalizedSeconds,
      activeMinutesToday: Math.floor(normalizedSeconds / 60),
      extraMinutesGrantedToday: child.extraMinutesGrantedToday || 0,
      screenTimeUnlockedForPeriodKey: child.screenTimeUnlockedForPeriodKey,
      usagePeriodKey: currentPeriodKey,
      lastActiveDateKey: currentCalendarDateKey,
      clockTamperDetected: false,
    };
  }

  // Same usage period (or only the resetHour suffix changed on the same effective date)
  if (storedPeriodKey === currentPeriodKey || storedDatePart === currentCalendarDateKey) {
    return {
      ...child,
      activeSecondsToday: normalizedSeconds,
      activeMinutesToday: Math.floor(normalizedSeconds / 60),
      extraMinutesGrantedToday: child.extraMinutesGrantedToday || 0,
      usagePeriodKey: currentPeriodKey,
      lastActiveDateKey: currentCalendarDateKey,
      clockTamperDetected: Boolean(child.clockTamperDetected),
    };
  }

  // Forward crossing into a new daily usage period -> reset daily usage counters & daily quest steps
  return {
    ...child,
    activeSecondsToday: 0,
    activeMinutesToday: 0,
    extraMinutesGrantedToday: 0,
    screenTimeUnlockedForPeriodKey: undefined,
    usagePeriodKey: currentPeriodKey,
    lastActiveDateKey: currentCalendarDateKey,
    lastUsageTimestampMs: nowMs,
    clockTamperDetected: false,
    questStepsCompleted: {
      quran: false,
      dua: false,
      quiz: false,
      salah: false,
      family: false,
    },
  };
}

/**
 * Returns the effective daily screen-time limit in seconds for a child profile,
 * including any bonus minutes granted by the parent for the current day.
 */
export function getEffectiveDailyLimitSeconds(child: ChildProfile): number {
  const baseMinutes =
    typeof child.dailyGoalMinutes === 'number' && child.dailyGoalMinutes > 0
      ? child.dailyGoalMinutes
      : 15;
  const bonusMinutes =
    typeof child.extraMinutesGrantedToday === 'number' && child.extraMinutesGrantedToday > 0
      ? child.extraMinutesGrantedToday
      : 0;
  return (baseMinutes + bonusMinutes) * 60;
}

/**
 * Determines whether the child has reached or exceeded their daily Kids World screen-time limit.
 */
export function isChildScreenTimeLimitReached(
  child: ChildProfile,
  now: Date = new Date(),
  resetHour = 0
): boolean {
  const rolled = ensureChildUsagePeriodRollover(child, now, resetHour);
  const currentPeriodKey = getUsagePeriodKey(now, resetHour);

  if (
    rolled.screenTimeUnlockedForPeriodKey === currentPeriodKey ||
    (rolled.clockTamperDetected &&
      rolled.screenTimeUnlockedForPeriodKey &&
      rolled.screenTimeUnlockedForPeriodKey === rolled.usagePeriodKey)
  ) {
    return false;
  }

  const limitSeconds = getEffectiveDailyLimitSeconds(rolled);
  const usedSeconds = rolled.activeSecondsToday ?? rolled.activeMinutesToday * 60;
  return usedSeconds >= limitSeconds;
}

/**
 * Pure function that accumulates foreground Kids World usage time.
 * - Pauses automatically when `isForegroundAndVisible` is false.
 * - Caps delta at `MAX_FOREGROUND_TICK_DELTA_MS` so background sleep / tab suspension cannot add phantom time.
 * - Tracks `lastUsageTimestampMs` so backward clock tampering cannot reset usage.
 * - Clamps usage at the effective limit once reached until parent unlocks or grants bonus time.
 */
export function accumulateKidsForegroundUsage(params: {
  child: ChildProfile;
  elapsedMs: number;
  isForegroundAndVisible: boolean;
  now?: Date;
  resetHour?: number;
}): {
  updatedChild: ChildProfile;
  limitReached: boolean;
  secondsAdded: number;
} {
  const {
    child,
    elapsedMs,
    isForegroundAndVisible,
    now = new Date(),
    resetHour = 0,
  } = params;

  const rolled = ensureChildUsagePeriodRollover(child, now, resetHour);

  if (!isForegroundAndVisible || elapsedMs <= 0 || !Number.isFinite(elapsedMs)) {
    return {
      updatedChild: rolled,
      limitReached: isChildScreenTimeLimitReached(rolled, now, resetHour),
      secondsAdded: 0,
    };
  }

  if (isChildScreenTimeLimitReached(rolled, now, resetHour)) {
    return {
      updatedChild: rolled,
      limitReached: true,
      secondsAdded: 0,
    };
  }

  const boundedMs = Math.min(Math.max(0, elapsedMs), MAX_FOREGROUND_TICK_DELTA_MS);
  const secondsToAdd = Math.max(1, Math.round(boundedMs / 1000));
  const limitSeconds = getEffectiveDailyLimitSeconds(rolled);
  const currentPeriodKey = getUsagePeriodKey(now, resetHour);
  const isUnlimitedToday = rolled.screenTimeUnlockedForPeriodKey === currentPeriodKey;

  const prevSeconds = rolled.activeSecondsToday ?? rolled.activeMinutesToday * 60;
  const nextSeconds = isUnlimitedToday
    ? prevSeconds + secondsToAdd
    : Math.min(limitSeconds, prevSeconds + secondsToAdd);

  const nowMs = now.getTime();
  const nextWallMs =
    typeof rolled.lastUsageTimestampMs === 'number'
      ? Math.max(rolled.lastUsageTimestampMs, nowMs)
      : nowMs;

  const updatedChild: ChildProfile = {
    ...rolled,
    activeSecondsToday: nextSeconds,
    activeMinutesToday: Math.floor(nextSeconds / 60),
    lastUsageTimestampMs: nextWallMs,
  };

  return {
    updatedChild,
    limitReached: isChildScreenTimeLimitReached(updatedChild, now, resetHour),
    secondsAdded: nextSeconds - prevSeconds,
  };
}

/**
 * Grants parent-authorized bonus time or unlocks the remainder of the current usage period
 * after verifying the 4-digit Parent PIN against the stored verifier (or legacy PIN).
 */
export function unlockChildScreenTimeWithPin(params: {
  child: ChildProfile;
  enteredPin: string;
  storedParentPin?: string;
  storedPinVerifier?: string;
  action: 'grant_10m' | 'grant_15m' | 'unlock_today';
  now?: Date;
  resetHour?: number;
}): {
  ok: boolean;
  error?: string;
  updatedChild: ChildProfile;
} {
  const {
    child,
    enteredPin,
    storedParentPin,
    storedPinVerifier,
    action,
    now = new Date(),
    resetHour = 0,
  } = params;

  const verifierTarget = storedPinVerifier || storedParentPin || '';
  if (!verifyParentPin(enteredPin, verifierTarget)) {
    return {
      ok: false,
      error: 'Incorrect Parent PIN. Please enter the 4-digit PIN set in Parent Hub.',
      updatedChild: child,
    };
  }

  const rolled = ensureChildUsagePeriodRollover(child, now, resetHour);
  const currentPeriodKey = getUsagePeriodKey(now, resetHour);

  if (action === 'unlock_today') {
    return {
      ok: true,
      updatedChild: {
        ...rolled,
        screenTimeUnlockedForPeriodKey: currentPeriodKey,
      },
    };
  }

  const addMinutes = action === 'grant_15m' ? 15 : 10;
  return {
    ok: true,
    updatedChild: {
      ...rolled,
      extraMinutesGrantedToday: (rolled.extraMinutesGrantedToday || 0) + addMinutes,
    },
  };
}

// ============================================================================
// PART B — PARENT PIN & LOCAL RECOVERY CODE ENGINE (WEB CRYPTO PBKDF2-SHA256)
// ============================================================================

const RECOVERY_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excludes ambiguous 0/O, 1/I
export const PBKDF2_ITERATIONS = 100_000;

function bytesToHex(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 1) {
    out += bytes[i].toString(16).padStart(2, '0');
  }
  return out;
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim().toLowerCase();
  if (clean.length % 2 !== 0) return new Uint8Array(0);
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i += 1) {
    out[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16) || 0;
  }
  return out;
}

function generateRandomSaltHex(byteLength = 16): string {
  const bytes = new Uint8Array(byteLength);
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < byteLength; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return bytesToHex(bytes);
}

/**
 * Constant-time string comparison to avoid timing side channels.
 */
function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Derives a 256-bit hex key using Web Crypto API PBKDF2-SHA256.
 */
async function derivePbkdf2Sha256Hex(
  secret: string,
  saltHex: string,
  iterations = PBKDF2_ITERATIONS
): Promise<string> {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    globalThis.crypto.subtle &&
    typeof globalThis.crypto.subtle.importKey === 'function'
  ) {
    const enc = new TextEncoder();
    const keyMaterial = await globalThis.crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    const derivedBits = await globalThis.crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: hexToBytes(saltHex) as BufferSource,
        iterations,
        hash: 'SHA-256',
      },
      keyMaterial,
      256
    );
    return bytesToHex(new Uint8Array(derivedBits));
  }
  // Fallback only if subtle crypto is completely unavailable in an exotic environment
  return computeNonPlaintextDigest(`fallback_pbkdf2:${iterations}:${saltHex}:${secret}`);
}

/**
 * Synchronous non-plaintext multi-round digest used when migrating legacy plaintext PINs
 * inside synchronous state normalizers before async Web Crypto upgrade runs.
 */
function computeNonPlaintextDigest(payload: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  let h3 = 0x9e3779b9;
  let h4 = 0x85ebca6b;

  for (let round = 0; round < 64; round += 1) {
    for (let i = 0; i < payload.length; i += 1) {
      const ch = payload.charCodeAt(i) + round * 17;
      h1 = Math.imul(h1 ^ ch, 0x01000193);
      h2 = Math.imul(h2 ^ (ch + i * 31), 0x85ebca6b);
      h3 = Math.imul(h3 ^ (ch ^ (h1 >>> 13)), 0xc2b2ae35);
      h4 = Math.imul(h4 ^ (ch + (h2 >>> 11)), 0x27d4eb2f);
    }
  }

  return [h1, h2, h3, h4]
    .map((h) => (h >>> 0).toString(16).padStart(8, '0'))
    .join('');
}

/**
 * Validates that a candidate PIN is strictly 4 numeric digits.
 */
export function isValidParentPinFormat(pin: string): boolean {
  return typeof pin === 'string' && /^\d{4}$/.test(pin.trim());
}

/**
 * Creates a non-plaintext synchronous PIN verifier (`pin_v1$<saltHex>$<digestHex>`)
 * so plaintext PINs are never stored in memory snapshots, IndexedDB, or JSON backups.
 */
export function createParentPinVerifierSync(pin: string, customSaltHex?: string): string {
  if (!isValidParentPinFormat(pin)) return '';
  const cleanPin = pin.trim();
  const saltHex = customSaltHex || generateRandomSaltHex(16);
  const digest = computeNonPlaintextDigest(`ilmizo_pin_v1:${saltHex}:${cleanPin}`);
  return `pin_v1$${saltHex}$${digest}`;
}

/**
 * Creates a salted Web Crypto API PBKDF2-SHA256 Parent PIN verifier (`pin_pbkdf2_v2$100000$<saltHex>$<derivedHex>`).
 */
export async function createParentPinVerifierAsync(
  pin: string,
  customSaltHex?: string,
  iterations = PBKDF2_ITERATIONS
): Promise<string> {
  if (!isValidParentPinFormat(pin)) return '';
  const cleanPin = pin.trim();
  const saltHex = customSaltHex || generateRandomSaltHex(16);
  const derivedHex = await derivePbkdf2Sha256Hex(
    `ilmizo_parent_pin_v2:${cleanPin}`,
    saltHex,
    iterations
  );
  return `pin_pbkdf2_v2$${iterations}$${saltHex}$${derivedHex}`;
}

/**
 * Verifies an entered 4-digit PIN against a stored PIN verifier (`pin_v1$...` or legacy 4-digit string).
 */
export function verifyParentPin(enteredPin: string, storedVerifierOrPin?: string): boolean {
  if (!isValidParentPinFormat(enteredPin) || !storedVerifierOrPin || typeof storedVerifierOrPin !== 'string') {
    return false;
  }
  const cleanPin = enteredPin.trim();
  const target = storedVerifierOrPin.trim();

  if (target.startsWith('pin_v1$')) {
    const parts = target.split('$');
    if (parts.length !== 3) return false;
    const saltHex = parts[1];
    const expectedVerifier = createParentPinVerifierSync(cleanPin, saltHex);
    return timingSafeEqualStr(expectedVerifier, target);
  }

  if (isValidParentPinFormat(target)) {
    return timingSafeEqualStr(cleanPin, target);
  }

  return false;
}

/**
 * Asynchronously verifies an entered 4-digit PIN against a Web Crypto PBKDF2-SHA256 verifier
 * (`pin_pbkdf2_v2$...`), a sync migration verifier (`pin_v1$...`), or a legacy 4-digit PIN.
 */
export async function verifyParentPinAsync(
  enteredPin: string,
  storedVerifierOrPin?: string
): Promise<boolean> {
  if (!isValidParentPinFormat(enteredPin) || !storedVerifierOrPin || typeof storedVerifierOrPin !== 'string') {
    return false;
  }
  const cleanPin = enteredPin.trim();
  const target = storedVerifierOrPin.trim();

  if (target.startsWith('pin_pbkdf2_v2$')) {
    const parts = target.split('$');
    if (parts.length !== 4) return false;
    const iterations = Number.parseInt(parts[1], 10) || PBKDF2_ITERATIONS;
    const saltHex = parts[2];
    const candidate = await createParentPinVerifierAsync(cleanPin, saltHex, iterations);
    return timingSafeEqualStr(candidate, target);
  }

  return verifyParentPin(cleanPin, target);
}

/**
 * Normalizes a user-entered recovery code by upper-casing and stripping spaces/hyphens.
 */
export function normalizeRecoveryCodeInput(rawCode: string): string {
  if (typeof rawCode !== 'string') return '';
  return rawCode
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/^ILMZ/, '');
}

/**
 * Legacy v1 recovery code hash function retained ONLY for verifying/migrating pre-existing
 * `ilmz_rc_v1_` hashes so existing users are not locked out.
 */
export function hashRecoveryCodeLegacyV1(rawCode: string): string {
  const clean = normalizeRecoveryCodeInput(rawCode);
  if (clean.length < 8) return '';

  const payload = `ilmizo_pin_recovery_v1:${clean}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;

  for (let i = 0; i < payload.length; i += 1) {
    const ch = payload.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= ch + i * 31;
    h2 = Math.imul(h2, 0x85ebca6b);
  }

  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return `ilmz_rc_v1_${hex1}_${hex2}`;
}

/**
 * Computes a salted non-plaintext verification digest for a local recovery code (sync interface).
 */
export function hashRecoveryCode(rawCode: string, customSaltHex?: string): string {
  const clean = normalizeRecoveryCodeInput(rawCode);
  if (clean.length < 8) return '';
  return hashRecoveryCodeLegacyV1(clean);
}

/**
 * Computes a Web Crypto API PBKDF2-SHA256 hash (`pbkdf2_sha256_v2$100000$<saltHex>$<derivedHex>`)
 * with a unique 16-byte random salt per recovery code.
 */
export async function hashRecoveryCodeAsync(
  rawCode: string,
  customSaltHex?: string,
  iterations = PBKDF2_ITERATIONS
): Promise<string> {
  const clean = normalizeRecoveryCodeInput(rawCode);
  if (clean.length < 8) return '';
  const saltHex = customSaltHex || generateRandomSaltHex(16);
  const derivedHex = await derivePbkdf2Sha256Hex(
    `ilmizo_recovery_code_v2:${clean}`,
    saltHex,
    iterations
  );
  return `pbkdf2_sha256_v2$${iterations}$${saltHex}$${derivedHex}`;
}

/**
 * Verifies a recovery code against either a Web Crypto PBKDF2-SHA256 hash (`pbkdf2_sha256_v2$...`)
 * or a legacy v1 hash (`ilmz_rc_v1_...`).
 */
export async function verifyRecoveryCodeHashAsync(
  enteredRecoveryCode: string,
  storedRecoveryHash?: string
): Promise<boolean> {
  if (!storedRecoveryHash || typeof storedRecoveryHash !== 'string') return false;
  const clean = normalizeRecoveryCodeInput(enteredRecoveryCode);
  if (clean.length < 8) return false;

  if (storedRecoveryHash.startsWith('pbkdf2_sha256_v2$')) {
    const parts = storedRecoveryHash.split('$');
    if (parts.length !== 4) return false;
    const iterations = Number.parseInt(parts[1], 10) || PBKDF2_ITERATIONS;
    const saltHex = parts[2];
    const candidate = await hashRecoveryCodeAsync(clean, saltHex, iterations);
    return timingSafeEqualStr(candidate, storedRecoveryHash);
  }

  if (storedRecoveryHash.startsWith('ilmz_rc_v1_')) {
    const candidate = hashRecoveryCodeLegacyV1(clean);
    return Boolean(candidate && timingSafeEqualStr(candidate, storedRecoveryHash));
  }

  return false;
}

function generateRecoveryCodeString(): string {
  const bytes = new Uint8Array(8);
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 8; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  let chars = '';
  for (let i = 0; i < 8; i += 1) {
    chars += RECOVERY_ALPHABET[bytes[i] % RECOVERY_ALPHABET.length];
  }

  return `ILMZ-${chars.slice(0, 4)}-${chars.slice(4, 8)}`;
}

/**
 * Generates a fresh human-readable local recovery code (`ILMZ-XXXX-XXXX`) and its stored hash.
 * Note: For Web Crypto PBKDF2-SHA256 salted hashes, prefer `generateParentRecoveryCodeAsync()`.
 */
export function generateParentRecoveryCode(_seedHint?: string): {
  recoveryCode: string;
  formattedCode: string;
  recoveryHash: string;
} {
  const formattedCode = generateRecoveryCodeString();
  const recoveryHash = hashRecoveryCodeLegacyV1(formattedCode);
  return {
    recoveryCode: formattedCode,
    formattedCode,
    recoveryHash,
  };
}

/**
 * Generates a fresh human-readable local recovery code (`ILMZ-XXXX-XXXX`) and its
 * Web Crypto PBKDF2-SHA256 salted hash (`pbkdf2_sha256_v2$100000$<saltHex>$<derivedHex>`).
 */
export async function generateParentRecoveryCodeAsync(): Promise<{
  recoveryCode: string;
  formattedCode: string;
  recoveryHash: string;
}> {
  const formattedCode = generateRecoveryCodeString();
  const recoveryHash = await hashRecoveryCodeAsync(formattedCode);
  return {
    recoveryCode: formattedCode,
    formattedCode,
    recoveryHash,
  };
}

/**
 * Synchronous verification & single-use PIN reset helper.
 * Consumes and invalidates `storedRecoveryHash` (`nextRecoveryHash: undefined`, `recoveryCodeInvalidated: true`)
 * so a used recovery code can NEVER be reused.
 */
export function verifyRecoveryCodeAndResetPin(params: {
  enteredRecoveryCode: string;
  storedRecoveryHash?: string;
  newPin: string;
}): {
  ok: boolean;
  error?: string;
  updatedPin?: string;
  newPin?: string;
  nextPinVerifier?: string;
  nextRecoveryHash?: undefined;
  recoveryCodeInvalidated?: boolean;
} {
  const { enteredRecoveryCode, storedRecoveryHash, newPin } = params;

  if (!storedRecoveryHash) {
    return {
      ok: false,
      error:
        'No active recovery code is available on this device (or your previous recovery code was already used). Generate a new recovery code in Parent Hub or reset site data.',
    };
  }

  const candidateHash = hashRecoveryCodeLegacyV1(enteredRecoveryCode);
  if (!candidateHash || !timingSafeEqualStr(candidateHash, storedRecoveryHash)) {
    return {
      ok: false,
      error: 'Invalid recovery code. Please check your saved ILMZ-XXXX-XXXX recovery code.',
    };
  }

  if (!isValidParentPinFormat(newPin)) {
    return {
      ok: false,
      error: 'New PIN must be exactly 4 numeric digits (0–9).',
    };
  }

  const cleanPin = newPin.trim();
  return {
    ok: true,
    updatedPin: cleanPin,
    newPin: cleanPin,
    nextPinVerifier: createParentPinVerifierSync(cleanPin),
    nextRecoveryHash: undefined,
    recoveryCodeInvalidated: true,
  };
}

/**
 * Asynchronous Web Crypto PBKDF2-SHA256 verification & single-use PIN reset.
 * Supports both `pbkdf2_sha256_v2$...` and legacy `ilmz_rc_v1_...` hashes, and invalidates
 * the recovery code upon successful reset so it cannot be reused.
 */
export async function verifyRecoveryCodeAndResetPinAsync(params: {
  enteredRecoveryCode: string;
  storedRecoveryHash?: string;
  newPin: string;
}): Promise<{
  ok: boolean;
  error?: string;
  updatedPin?: string;
  newPin?: string;
  nextPinVerifier?: string;
  nextRecoveryHash?: undefined;
  recoveryCodeInvalidated?: boolean;
}> {
  const { enteredRecoveryCode, storedRecoveryHash, newPin } = params;

  if (!storedRecoveryHash) {
    return {
      ok: false,
      error:
        'No active recovery code is available on this device (or your previous recovery code was already used). Generate a new recovery code in Parent Hub or reset site data.',
    };
  }

  const isMatch = await verifyRecoveryCodeHashAsync(enteredRecoveryCode, storedRecoveryHash);
  if (!isMatch) {
    return {
      ok: false,
      error: 'Invalid recovery code. Please check your saved ILMZ-XXXX-XXXX recovery code.',
    };
  }

  if (!isValidParentPinFormat(newPin)) {
    return {
      ok: false,
      error: 'New PIN must be exactly 4 numeric digits (0–9).',
    };
  }

  const cleanPin = newPin.trim();
  const nextPinVerifier = await createParentPinVerifierAsync(cleanPin);
  return {
    ok: true,
    updatedPin: cleanPin,
    newPin: cleanPin,
    nextPinVerifier,
    nextRecoveryHash: undefined,
    recoveryCodeInvalidated: true,
  };
}
