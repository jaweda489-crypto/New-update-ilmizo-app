import { audioManager } from './audioManager';

let sharedChimeCtx: AudioContext | null = null;

function getChimeAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!sharedChimeCtx) {
    try {
      sharedChimeCtx = new Ctor();
    } catch {
      return null;
    }
  }
  if (sharedChimeCtx.state === 'suspended') {
    void sharedChimeCtx.resume().catch(() => {});
  }
  return sharedChimeCtx;
}

/**
 * Plays a gentle synthesized harmonic chime strictly after an explicit user interaction,
 * always respecting Ilmizo's global mute setting.
 */
export function playGentleCelebrationChime(kind: 'tap' | 'star' | 'lesson_complete'): void {
  if (audioManager.getState().isMuted) return;
  const ctx = getChimeAudioContext();
  if (!ctx) return;

  const notes =
    kind === 'lesson_complete'
      ? [523.25, 659.25, 783.99, 1046.5] // C5-E5-G5-C6 joyful chord arpeggio
      : kind === 'star'
      ? [587.33, 880.0] // D5-A5 bright sparkle
      : [523.25]; // C5 gentle tap

  const now = ctx.currentTime;
  notes.forEach((freq, idx) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.085);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.085);
      gain.gain.exponentialRampToValueAtTime(kind === 'tap' ? 0.045 : 0.07, now + idx * 0.085 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.085 + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.085);
      osc.stop(now + idx * 0.085 + 0.26);
    } catch {
      // Ignore oscillator scheduling failures in restricted environments
    }
  });
}
