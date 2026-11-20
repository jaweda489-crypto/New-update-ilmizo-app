function validateBackupStructure(rawJson: string): { valid: boolean; errors: string[] } {
  if (!rawJson || typeof rawJson !== 'string' || !rawJson.trim()) {
    return { valid: false, errors: ['Backup JSON payload is empty.'] };
  }
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(rawJson) as Record<string, unknown>;
  } catch {
    return { valid: false, errors: ['Invalid JSON backup payload.'] };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { valid: false, errors: ['Backup root must be a JSON object.'] };
  }
  const recognizableKeys = [
    'user',
    'childrenProfiles',
    'bookmarks',
    'hifzPlans',
    'salahRecords',
    'learningEvents',
  ];
  if (!recognizableKeys.some((k) => k in parsed)) {
    return { valid: false, errors: ['Unrecognized Ilmizo backup structure.'] };
  }
  return { valid: true, errors: [] };
}

export type ParentVoucherAction = 'grant_10m' | 'grant_15m' | 'unlock_today';

export interface EncryptedSyncEnvelope {
  format: 'ilmizo-encrypted-sync-v1';
  kdf: 'PBKDF2-SHA256-100000';
  cipher: 'AES-256-GCM';
  saltB64: string;
  ivB64: string;
  ciphertextB64: string;
  exportedAtIso: string;
}

const REDEEMED_VOUCHERS_STORAGE_KEY = 'ilmizo_redeemed_vouchers_v1';

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(bytes).toString('base64');
  }
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  if (typeof Buffer !== 'undefined') {
    return new Uint8Array(Buffer.from(b64, 'base64'));
  }
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function getSubtleCrypto(): SubtleCrypto | null {
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.subtle) {
    return globalThis.crypto.subtle;
  }
  return null;
}

async function deriveAesKeyFromPassphrase(
  passphrase: string,
  salt: Uint8Array,
  usages: KeyUsage[]
): Promise<CryptoKey> {
  const subtle = getSubtleCrypto();
  if (!subtle) {
    throw new Error('Web Crypto API is unavailable in this environment.');
  }
  const enc = new TextEncoder();
  const baseKey = await subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    usages
  );
}

/**
 * Encrypts a verified Ilmizo JSON backup string using PBKDF2-SHA256 (100,000 iterations)
 * + AES-256-GCM so families can safely transfer progress across devices via AirDrop,
 * WhatsApp, USB, or local files without any cloud server.
 */
export async function exportEncryptedSyncBundle(
  plainBackupJson: string,
  passphrase: string
): Promise<{ ok: boolean; encryptedContent?: string; error?: string }> {
  const trimmedPass = passphrase.trim();
  if (trimmedPass.length < 6) {
    return {
      ok: false,
      error: 'Sync passphrase must be at least 6 characters long.',
    };
  }

  const check = validateBackupStructure(plainBackupJson);
  if (!check.valid) {
    return {
      ok: false,
      error: check.errors[0] || 'Backup payload validation failed before encryption.',
    };
  }

  const subtle = getSubtleCrypto();
  if (!subtle || typeof globalThis.crypto?.getRandomValues !== 'function') {
    return {
      ok: false,
      error: 'Web Crypto encryption is unavailable in this browser.',
    };
  }

  try {
    const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
    const aesKey = await deriveAesKeyFromPassphrase(trimmedPass, salt, ['encrypt']);
    const encoded = new TextEncoder().encode(plainBackupJson);
    const cipherBuffer = await subtle.encrypt(
      { name: 'AES-GCM', iv: iv as unknown as BufferSource },
      aesKey,
      encoded
    );

    const envelope: EncryptedSyncEnvelope = {
      format: 'ilmizo-encrypted-sync-v1',
      kdf: 'PBKDF2-SHA256-100000',
      cipher: 'AES-256-GCM',
      saltB64: bytesToBase64(salt),
      ivB64: bytesToBase64(iv),
      ciphertextB64: bytesToBase64(new Uint8Array(cipherBuffer)),
      exportedAtIso: new Date().toISOString(),
    };

    return {
      ok: true,
      encryptedContent: JSON.stringify(envelope, null, 2),
    };
  } catch {
    return {
      ok: false,
      error: 'Failed to encrypt family sync package.',
    };
  }
}

/**
 * Decrypts an `.ilmizo-sync` file with the family passphrase and validates the inner
 * Ilmizo backup schema before returning raw JSON for preview & safe restore.
 */
export async function importEncryptedSyncBundle(
  rawSyncText: string,
  passphrase: string
): Promise<{ ok: boolean; rawBackupJson?: string; error?: string }> {
  const trimmedPass = passphrase.trim();
  if (!trimmedPass) {
    return { ok: false, error: 'Please enter the sync passphrase.' };
  }

  let parsed: EncryptedSyncEnvelope;
  try {
    parsed = JSON.parse(rawSyncText) as EncryptedSyncEnvelope;
  } catch {
    return { ok: false, error: 'Selected sync file is not valid JSON.' };
  }

  if (
    !parsed ||
    parsed.format !== 'ilmizo-encrypted-sync-v1' ||
    parsed.cipher !== 'AES-256-GCM' ||
    !parsed.saltB64 ||
    !parsed.ivB64 ||
    !parsed.ciphertextB64
  ) {
    return { ok: false, error: 'Unsupported or corrupted .ilmizo-sync file header.' };
  }

  const subtle = getSubtleCrypto();
  if (!subtle) {
    return { ok: false, error: 'Web Crypto decryption is unavailable in this browser.' };
  }

  try {
    const salt = base64ToBytes(parsed.saltB64);
    const iv = base64ToBytes(parsed.ivB64);
    const cipherBytes = base64ToBytes(parsed.ciphertextB64);
    const aesKey = await deriveAesKeyFromPassphrase(trimmedPass, salt, ['decrypt']);
    const plainBuffer = await subtle.decrypt(
      { name: 'AES-GCM', iv: iv as unknown as BufferSource },
      aesKey,
      cipherBytes as unknown as BufferSource
    );
    const rawBackupJson = new TextDecoder().decode(plainBuffer);
    const check = validateBackupStructure(rawBackupJson);
    if (!check.valid) {
      return {
        ok: false,
        error: check.errors[0] || 'Decrypted sync payload failed schema validation.',
      };
    }

    return { ok: true, rawBackupJson };
  } catch {
    return {
      ok: false,
      error: 'Incorrect sync passphrase or modified .ilmizo-sync file.',
    };
  }
}

function mapActionToPrefix(action: ParentVoucherAction): '10M' | '15M' | 'DAY' {
  if (action === 'grant_15m') return '15M';
  if (action === 'unlock_today') return 'DAY';
  return '10M';
}

function mapPrefixToAction(prefix: string): ParentVoucherAction | null {
  if (prefix === '10M') return 'grant_10m';
  if (prefix === '15M') return 'grant_15m';
  if (prefix === 'DAY') return 'unlock_today';
  return null;
}

async function computeVoucherTagHex(params: {
  signingKey: string;
  childId: string;
  prefix: '10M' | '15M' | 'DAY';
  nonce: string;
}): Promise<string> {
  const payload = `ilmizo_voucher_v1|${params.signingKey}|${params.childId}|${params.prefix}|${params.nonce}`;
  const subtle = getSubtleCrypto();
  if (subtle) {
    const buf = await subtle.digest('SHA-256', new TextEncoder().encode(payload));
    return Array.from(new Uint8Array(buf))
      .slice(0, 4)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  }
  let h = 2166136261;
  for (let i = 0; i < payload.length; i++) {
    h ^= payload.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0').toUpperCase();
}

function generateRandomNonce6(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(6);
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 6; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

export function loadRedeemedVoucherIds(): string[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REDEEMED_VOUCHERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export function saveRedeemedVoucherIds(ids: string[]): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(REDEEMED_VOUCHERS_STORAGE_KEY, JSON.stringify(ids.slice(-100)));
  } catch {
    // ignore storage quota errors
  }
}

/**
 * Generates a single-use, cryptographically tagged offline Parent Time Voucher
 * (e.g. `ILMZ-10M-K9X2P4-A7F3C9D2`) bound to the family's non-plaintext `parentPinVerifier`
 * and target child profile ID.
 */
export async function issueParentTimeVoucher(params: {
  action: ParentVoucherAction;
  childId: string;
  signingKey?: string;
}): Promise<{ ok: boolean; code?: string; error?: string }> {
  const key = params.signingKey?.trim();
  if (!key) {
    return {
      ok: false,
      error: 'Set up your 4-digit Parent PIN first before issuing signed time vouchers.',
    };
  }

  const prefix = mapActionToPrefix(params.action);
  const nonce = generateRandomNonce6();
  const tag = await computeVoucherTagHex({
    signingKey: key,
    childId: params.childId,
    prefix,
    nonce,
  });

  return {
    ok: true,
    code: `ILMZ-${prefix}-${nonce}-${tag}`,
  };
}

/**
 * Verifies a Parent Time Voucher offline and enforces single-use anti-replay tracking.
 */
export async function verifyAndRedeemParentTimeVoucher(params: {
  code: string;
  childId: string;
  signingKey?: string;
  usedVoucherIds?: string[];
}): Promise<{
  ok: boolean;
  action?: ParentVoucherAction;
  voucherId?: string;
  nextUsedVoucherIds?: string[];
  error?: string;
}> {
  const key = params.signingKey?.trim();
  if (!key) {
    return {
      ok: false,
      error: 'Parent PIN verifier is not initialized on this device yet.',
    };
  }

  const normalized = params.code.trim().toUpperCase().replace(/\s+/g, '');
  const match = normalized.match(/^ILMZ-(10M|15M|DAY)-([A-Z0-9]{6})-([0-9A-F]{8})$/);
  if (!match) {
    return {
      ok: false,
      error: 'Invalid voucher format. Expected ILMZ-10M-XXXXXX-YYYYYYYY.',
    };
  }

  const [, prefixRaw, nonce, providedTag] = match;
  const prefix = prefixRaw as '10M' | '15M' | 'DAY';
  const action = mapPrefixToAction(prefix);
  if (!action) {
    return { ok: false, error: 'Unsupported voucher action.' };
  }

  const expectedTag = await computeVoucherTagHex({
    signingKey: key,
    childId: params.childId,
    prefix,
    nonce,
  });

  if (expectedTag !== providedTag) {
    return {
      ok: false,
      error: 'Voucher signature mismatch for this child or family profile.',
    };
  }

  const voucherId = `${params.childId}:${prefix}:${nonce}:${providedTag}`;
  const usedList = params.usedVoucherIds ?? loadRedeemedVoucherIds();
  if (usedList.includes(voucherId)) {
    return {
      ok: false,
      error: 'This one-time Parent Voucher has already been redeemed.',
    };
  }

  const nextUsedVoucherIds = [...usedList, voucherId];
  if (!params.usedVoucherIds) {
    saveRedeemedVoucherIds(nextUsedVoucherIds);
  }

  return {
    ok: true,
    action,
    voucherId,
    nextUsedVoucherIds,
  };
}
