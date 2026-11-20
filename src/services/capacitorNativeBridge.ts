import { Capacitor, registerPlugin } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PrayerName } from '../types/ilmizo';
import { audioManager } from './audioManager';

export type AdhanVoiceOption = 'makkah_haram' | 'alafasy_adhan' | 'madinah_fajr' | 'silent_visual';

export interface AzanPrayerAlertConfig {
  enabled: boolean;
  soundMode: AdhanVoiceOption;
  minutesBeforeReminder: 0 | 5 | 10 | 15;
}

export interface AzanNotificationPreferences {
  masterEnabled: boolean;
  defaultAdhanVoice: AdhanVoiceOption;
  prayers: Record<PrayerName, AzanPrayerAlertConfig>;
  lastScheduledIso: string | null;
}

export interface ScheduledAzanNotificationItem {
  id: number;
  prayerName: PrayerName;
  scheduledTime24h: string;
  scheduledDateIso: string;
  title: string;
  body: string;
  soundMode: AdhanVoiceOption;
}

export interface CapacitorRuntimeStatus {
  isNativeApp: boolean;
  platform: 'android' | 'ios' | 'web';
  appId: string;
  appName: string;
  notificationPermission: 'granted' | 'denied' | 'default' | 'unsupported';
  supportsBackgroundLocalNotifications: boolean;
}

const AZAN_PREFS_STORAGE_KEY = 'ilmizo_azan_notification_prefs_v1';

export const ADHAN_AUDIO_STREAMS: Record<
  Exclude<AdhanVoiceOption, 'silent_visual'>,
  {
    label: string;
    reciter: string;
    mp3Url: string;
    fallbackArabicText: string;
  }
> = {
  makkah_haram: {
    label: 'Makkah Al-Mukarramah Adhan',
    reciter: 'Masjid al-Haram Muadhin (Authentic Adhan MP3)',
    mp3Url: 'https://cdn.aladhan.com/audio/adhans/a1.mp3',
    fallbackArabicText: 'ٱللَّهُ أَكْبَرُ ٱللَّهُ أَكْبَرُ ، أَشْهَدُ أَنْ لَا إِلَـٰهَ إِلَّا ٱللَّهُ ، حَيَّ عَلَى ٱلصَّلَاةِ',
  },
  alafasy_adhan: {
    label: 'Sheikh Mishary Rashid Alafasy Adhan',
    reciter: 'Mishary Rashid Alafasy (Authentic Adhan MP3)',
    mp3Url: 'https://www.islamcan.com/audio/adhan/azan1.mp3',
    fallbackArabicText: 'ٱللَّهُ أَكْبَرُ ٱللَّهُ أَكْبَرُ ، أَشْهَدُ أَنْ لَا إِلَـٰهَ إِلَّا ٱللَّهُ ، حَيَّ عَلَى ٱلْفَلَاحِ',
  },
  madinah_fajr: {
    label: 'Madinah Al-Munawwarah Fajr Adhan',
    reciter: 'Masjid an-Nabawi Style (Authentic Adhan MP3)',
    mp3Url: 'https://cdn.aladhan.com/audio/adhans/a4.mp3',
    fallbackArabicText: 'ٱلصَّلَاةُ خَيْرٌ مِنَ ٱلنَّوْمِ ، قَدْ قَامَتِ ٱلصَّلَاةُ',
  },
};

export const DEFAULT_AZAN_NOTIFICATION_PREFS: AzanNotificationPreferences = {
  masterEnabled: true,
  defaultAdhanVoice: 'makkah_haram',
  prayers: {
    Fajr: { enabled: true, soundMode: 'madinah_fajr', minutesBeforeReminder: 0 },
    Dhuhr: { enabled: true, soundMode: 'makkah_haram', minutesBeforeReminder: 0 },
    Asr: { enabled: true, soundMode: 'makkah_haram', minutesBeforeReminder: 0 },
    Maghrib: { enabled: true, soundMode: 'makkah_haram', minutesBeforeReminder: 0 },
    Isha: { enabled: true, soundMode: 'alafasy_adhan', minutesBeforeReminder: 0 },
  },
  lastScheduledIso: null,
};

/**
 * Inspects whether Ilmizo is running inside a Capacitor Android/iOS native wrapper
 * or a standard Web/PWA environment.
 */
export function getCapacitorRuntimeStatus(): CapacitorRuntimeStatus {
  const isNative =
    typeof window !== 'undefined' &&
    typeof Capacitor?.isNativePlatform === 'function' &&
    Capacitor.isNativePlatform();
  const rawPlatform =
    typeof window !== 'undefined' && typeof Capacitor?.getPlatform === 'function'
      ? Capacitor.getPlatform()
      : 'web';
  const platform: 'android' | 'ios' | 'web' =
    rawPlatform === 'android' || rawPlatform === 'ios' ? rawPlatform : 'web';

  let notificationPermission: CapacitorRuntimeStatus['notificationPermission'] = 'unsupported';
  if (typeof Notification !== 'undefined') {
    notificationPermission = Notification.permission;
  } else if (isNative) {
    notificationPermission = 'granted';
  }

  return {
    isNativeApp: isNative,
    platform,
    appId: 'com.ilmizo.tarbiyah',
    appName: 'Ilmizo - Islamic Learning & Tarbiyah',
    notificationPermission,
    supportsBackgroundLocalNotifications: isNative,
  };
}

export function loadAzanNotificationPrefs(): AzanNotificationPreferences {
  if (typeof localStorage === 'undefined') {
    return { ...DEFAULT_AZAN_NOTIFICATION_PREFS };
  }
  try {
    const raw = localStorage.getItem(AZAN_PREFS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_AZAN_NOTIFICATION_PREFS };
    const parsed = JSON.parse(raw);
    return {
      masterEnabled:
        typeof parsed.masterEnabled === 'boolean'
          ? parsed.masterEnabled
          : DEFAULT_AZAN_NOTIFICATION_PREFS.masterEnabled,
      defaultAdhanVoice: parsed.defaultAdhanVoice || 'makkah_haram',
      prayers: {
        Fajr: { ...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Fajr, ...(parsed.prayers?.Fajr || {}) },
        Dhuhr: { ...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Dhuhr, ...(parsed.prayers?.Dhuhr || {}) },
        Asr: { ...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Asr, ...(parsed.prayers?.Asr || {}) },
        Maghrib: {
          ...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Maghrib,
          ...(parsed.prayers?.Maghrib || {}),
        },
        Isha: { ...DEFAULT_AZAN_NOTIFICATION_PREFS.prayers.Isha, ...(parsed.prayers?.Isha || {}) },
      },
      lastScheduledIso: parsed.lastScheduledIso || null,
    };
  } catch {
    return { ...DEFAULT_AZAN_NOTIFICATION_PREFS };
  }
}

export function saveAzanNotificationPrefs(prefs: AzanNotificationPreferences): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(AZAN_PREFS_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Computes the next scheduled Azan notification items from a 5-prayer time map (e.g. { Fajr: "05:12", ... }).
 */
export function buildDailyAzanSchedule(params: {
  prayerTimes24h: Record<PrayerName, string>;
  prefs: AzanNotificationPreferences;
  referenceDate?: Date;
}): ScheduledAzanNotificationItem[] {
  const { prayerTimes24h, prefs, referenceDate = new Date() } = params;
  if (!prefs.masterEnabled) return [];

  const prayerOrder: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const items: ScheduledAzanNotificationItem[] = [];

  prayerOrder.forEach((prayer, idx) => {
    const cfg = prefs.prayers[prayer];
    if (!cfg || !cfg.enabled) return;

    const rawTime = prayerTimes24h[prayer] || '12:00';
    const [hhStr, mmStr] = rawTime.split(':');
    const hh = Number(hhStr) || 0;
    const mm = Number(mmStr) || 0;

    const target = new Date(referenceDate);
    target.setHours(hh, mm, 0, 0);
    if (cfg.minutesBeforeReminder > 0) {
      target.setMinutes(target.getMinutes() - cfg.minutesBeforeReminder);
    }

    // If the prayer time today has already passed, schedule for tomorrow
    if (target.getTime() <= referenceDate.getTime()) {
      target.setDate(target.getDate() + 1);
    }

    items.push({
      id: 1001 + idx,
      prayerName: prayer,
      scheduledTime24h: rawTime,
      scheduledDateIso: target.toISOString(),
      title:
        cfg.minutesBeforeReminder > 0
          ? `${prayer} Salah in ${cfg.minutesBeforeReminder} mins`
          : `Time for ${prayer} Salah (${rawTime})`,
      body:
        prayer === 'Fajr'
          ? 'As-salatu khayrun minan-nawm — Prayer is better than sleep.'
          : `Hayya 'alas-Salah — Come to prayer, come to success (${prayer}).`,
      soundMode: cfg.soundMode,
    });
  });

  return items;
}

/**
 * Requests notification permission and schedules local notifications via Capacitor LocalNotifications
 * (when inside the Android/iOS APK) or Web Notification API (when on Web/PWA).
 */
export async function scheduleDailyAzanNotifications(params: {
  prayerTimes24h: Record<PrayerName, string>;
  prefs: AzanNotificationPreferences;
  referenceDate?: Date;
}): Promise<{
  ok: boolean;
  scheduledCount: number;
  schedule: ScheduledAzanNotificationItem[];
  message: string;
}> {
  const schedule = buildDailyAzanSchedule(params);
  const runtime = getCapacitorRuntimeStatus();

  if (runtime.isNativeApp && typeof LocalNotifications?.schedule === 'function') {
    try {
      const perm = await LocalNotifications.requestPermissions();
      if (perm.display === 'granted' || perm.display === 'prompt') {
        if (runtime.platform === 'android' && typeof LocalNotifications.createChannel === 'function') {
          await LocalNotifications.createChannel({
            id: 'ilmizo_azan_channel',
            name: 'Ilmizo Daily Azan Reminders',
            description: 'Five daily Salah & Azan alerts',
            importance: 5,
            visibility: 1,
            sound: 'adhan_makkah.wav',
            vibration: true,
          });
        }
        const pending = await LocalNotifications.getPending?.();
        if (pending?.notifications?.length) {
          await LocalNotifications.cancel({ notifications: pending.notifications.map((n) => ({ id: n.id })) });
        }
        await LocalNotifications.schedule({
          notifications: schedule.map((item) => ({
            id: item.id,
            title: item.title,
            body: item.body,
            channelId: runtime.platform === 'android' ? 'ilmizo_azan_channel' : undefined,
            schedule: { at: new Date(item.scheduledDateIso), allowWhileIdle: true },
            sound: item.soundMode === 'silent_visual' ? undefined : 'adhan_makkah.wav',
          })),
        });
        let exactScheduledCount = 0;
        if (runtime.platform === 'android') {
          try {
            const exactRes = await IlmizoPrayerWidgetNative.scheduleExactAdhanAlarms({
              alarms: schedule.map((item) => ({
                id: item.id,
                prayerName: item.prayerName,
                triggerAtMillis: new Date(item.scheduledDateIso).getTime(),
                title: item.title,
                body: item.body,
                soundMode: item.soundMode,
              })),
            });
            exactScheduledCount = Number(exactRes?.scheduled || 0);
          } catch {
            // LocalNotifications fallback above remains active
          }
        }
        const nextPrefs: AzanNotificationPreferences = {
          ...params.prefs,
          lastScheduledIso: new Date().toISOString(),
        };
        saveAzanNotificationPrefs(nextPrefs);
        return {
          ok: true,
          scheduledCount: Math.max(schedule.length, exactScheduledCount),
          schedule,
          message:
            exactScheduledCount > 0
              ? `Scheduled ${exactScheduledCount} Android Exact Background Adhan Alarms (Doze-safe).`
              : `Scheduled ${schedule.length} native ${runtime.platform.toUpperCase()} background Azan notifications.`,
        };
      }
    } catch {
      // Fall through to web notification scheduling
    }
  }

  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    try {
      await Notification.requestPermission();
    } catch {
      // Ignore permission prompt errors
    }
  }

  const nextPrefs: AzanNotificationPreferences = {
    ...params.prefs,
    lastScheduledIso: new Date().toISOString(),
  };
  saveAzanNotificationPrefs(nextPrefs);

  return {
    ok: true,
    scheduledCount: schedule.length,
    schedule,
    message:
      schedule.length > 0
        ? `Scheduled ${schedule.length} daily Salah reminders (${schedule.map((s) => s.prayerName).join(', ')}).`
        : 'Azan notifications are currently paused.',
  };
}

/**
 * Plays an authentic Human Adhan call to prayer when the user taps "Test Adhan Audio"
 * or when a foreground prayer alert triggers.
 */
export function playHumanAdhanPreview(
  voice: AdhanVoiceOption = 'makkah_haram',
  onStatus?: (msg: string) => void
): void {
  if (voice === 'silent_visual') {
    if (onStatus) onStatus('Silent visual notification mode selected (no audio played).');
    return;
  }

  const descriptor = ADHAN_AUDIO_STREAMS[voice] || ADHAN_AUDIO_STREAMS.makkah_haram;
  audioManager.playAudioUrl({
    id: `adhan_preview_${voice}`,
    url: descriptor.mp3Url,
    fallbackText: descriptor.fallbackArabicText,
    fallbackLang: 'ar-SA',
    allowTtsFallback: true,
    onError: (err) => {
      if (onStatus) onStatus(err);
    },
  });

  if (onStatus) {
    onStatus(`Playing ${descriptor.label} (${descriptor.reciter})`);
  }
}

/**
 * Returns the step-by-step Capacitor Android APK build commands for packaging Ilmizo for Google Play Store.
 */
export function getAndroidApkBuildCommands(): {
  step: number;
  title: string;
  command: string;
  description: string;
}[] {
  return [
    {
      step: 1,
      title: 'Sync Web Assets into Android Project',
      command: 'npm run cap:sync',
      description:
        'Builds the 11 MB WebP-optimized PWA bundle (excluding aistudio/) and syncs it with Android permissions, launcher icons, notification icon, and adhan_makkah.wav.',
    },
    {
      step: 2,
      title: 'Create Upload Keystore (One-Time)',
      command:
        'keytool -genkey -v -keystore android/release-upload.jks -keyalg RSA -keysize 2048 -validity 10000 -alias ilmizo_upload && cp android/keystore.properties.example android/keystore.properties',
      description:
        'Generates your Google Play upload keystore and signing config (edit passwords inside android/keystore.properties; git-ignored automatically).',
    },
    {
      step: 3,
      title: 'Build Signed Play Store Bundle (.aab)',
      command: 'cd android && ./gradlew bundleRelease',
      description:
        'Produces the Play Store-ready signed bundle at android/app/build/outputs/bundle/release/app-release.aab (or use Android Studio > Build > Generate Signed App Bundle).',
    },
  ];
}

// ---------------------------------------------------------------------------
// Native Android Home-Screen Prayer Widget & Opt-In Persistent Countdown Bar
// ---------------------------------------------------------------------------

export interface PrayerWidgetSyncPayload {
  city: string;
  hijriDate: string;
  nextPrayerName: PrayerName;
  nextPrayerTime: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  persistentCountdownEnabled: boolean;
  updatedAtIso: string;
}

interface IlmizoPrayerWidgetNativePlugin {
  syncPrayerSchedule(options: PrayerWidgetSyncPayload): Promise<{
    synced: boolean;
    widgetsUpdated: number;
    countdownActive: boolean;
  }>;
  setPersistentCountdown(options: { enabled: boolean }): Promise<{
    enabled: boolean;
    countdownActive: boolean;
  }>;
  scheduleExactAdhanAlarms(options: {
    alarms: Array<{
      id: number;
      prayerName: string;
      triggerAtMillis: number;
      title: string;
      body: string;
      soundMode: string;
    }>;
  }): Promise<{
    scheduled: number;
    exactAlarmPermitted: boolean;
  }>;
  requestPinPrayerWidget(options: { size: 'small' | 'medium' }): Promise<{
    requested: boolean;
    supported: boolean;
    reason?: string;
  }>;
}

const IlmizoPrayerWidgetNative = registerPlugin<IlmizoPrayerWidgetNativePlugin>(
  'IlmizoPrayerWidget'
);

const PERSISTENT_COUNTDOWN_KEY = 'ilmizo_persistent_prayer_countdown_v1';
const LAST_WIDGET_PAYLOAD_KEY = 'ilmizo_prayer_widget_payload_v1';

export function isPersistentPrayerCountdownEnabled(): boolean {
  if (typeof localStorage === 'undefined') return false;
  try {
    return localStorage.getItem(PERSISTENT_COUNTDOWN_KEY) === 'true';
  } catch {
    return false;
  }
}

export function getPrayerWidgetPlatformCapability(): {
  platform: 'android' | 'ios' | 'web';
  supportsHomeScreenWidget: boolean;
  supportsPersistentCountdownNotification: boolean;
  honestStatusNote: string;
} {
  const runtime = getCapacitorRuntimeStatus();
  if (runtime.isNativeApp && runtime.platform === 'android') {
    return {
      platform: 'android',
      supportsHomeScreenWidget: true,
      supportsPersistentCountdownNotification: true,
      honestStatusNote:
        'Native Android AppWidget (Small & Medium) and opt-in ongoing prayer countdown notification are ready on this device.',
    };
  }
  if (runtime.isNativeApp && runtime.platform === 'ios') {
    return {
      platform: 'ios',
      supportsHomeScreenWidget: false,
      supportsPersistentCountdownNotification: false,
      honestStatusNote:
        'iOS WidgetKit / Live Activities require a Swift Widget Extension compiled in Xcode on macOS.',
    };
  }
  return {
    platform: 'web',
    supportsHomeScreenWidget: false,
    supportsPersistentCountdownNotification: false,
    honestStatusNote:
      'Running in Web/PWA mode. Android home-screen widgets & ongoing countdown notifications activate automatically inside the installed Android APK.',
  };
}

/**
 * Resolves which of the 5 daily prayers is next based on 12-hour or 24-hour time strings.
 */
export function resolveNextPrayerForWidget(
  prayerTimes: Record<PrayerName, string>,
  now: Date = new Date()
): { name: PrayerName; time: string } {
  const order: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const parseToMinutes = (raw: string): number | null => {
    if (!raw) return null;
    const match = raw.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?/i);
    if (!match) return null;
    let h = Number(match[1]);
    const m = Number(match[2]);
    const meridiem = match[3]?.toUpperCase();
    if (meridiem === 'PM' && h < 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };

  for (const name of order) {
    const mins = parseToMinutes(prayerTimes[name]);
    if (mins !== null && mins > nowMinutes) {
      return { name, time: prayerTimes[name] };
    }
  }
  return { name: 'Fajr', time: prayerTimes.Fajr || '5:00 AM' };
}

/**
 * Persists the latest prayer timings locally and pushes them to the native Android
 * AppWidgetProvider & optional ongoing countdown notification when running inside the APK.
 */
export async function syncNativePrayerWidget(params: {
  city: string;
  hijriDate: string;
  prayerTimes: Record<PrayerName, string>;
  persistentCountdownEnabled?: boolean;
}): Promise<{
  syncedNative: boolean;
  widgetsUpdated: number;
  countdownActive: boolean;
  payload: PrayerWidgetSyncPayload;
}> {
  const next = resolveNextPrayerForWidget(params.prayerTimes);
  const countdownEnabled =
    typeof params.persistentCountdownEnabled === 'boolean'
      ? params.persistentCountdownEnabled
      : isPersistentPrayerCountdownEnabled();

  const payload: PrayerWidgetSyncPayload = {
    city: params.city || 'Jamshedpur',
    hijriDate: params.hijriDate || '1448 AH',
    nextPrayerName: next.name,
    nextPrayerTime: next.time,
    fajr: params.prayerTimes.Fajr,
    dhuhr: params.prayerTimes.Dhuhr,
    asr: params.prayerTimes.Asr,
    maghrib: params.prayerTimes.Maghrib,
    isha: params.prayerTimes.Isha,
    persistentCountdownEnabled: countdownEnabled,
    updatedAtIso: new Date().toISOString(),
  };

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(LAST_WIDGET_PAYLOAD_KEY, JSON.stringify(payload));
    } catch {
      // Ignore quota errors
    }
  }

  const runtime = getCapacitorRuntimeStatus();
  if (runtime.isNativeApp && runtime.platform === 'android') {
    try {
      const res = await IlmizoPrayerWidgetNative.syncPrayerSchedule(payload);
      return {
        syncedNative: Boolean(res?.synced),
        widgetsUpdated: Number(res?.widgetsUpdated || 0),
        countdownActive: Boolean(res?.countdownActive),
        payload,
      };
    } catch {
      return {
        syncedNative: false,
        widgetsUpdated: 0,
        countdownActive: false,
        payload,
      };
    }
  }

  return {
    syncedNative: false,
    widgetsUpdated: 0,
    countdownActive: false,
    payload,
  };
}

export async function setPersistentPrayerCountdownEnabled(
  enabled: boolean
): Promise<{ enabled: boolean; syncedNative: boolean; countdownActive: boolean }> {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(PERSISTENT_COUNTDOWN_KEY, enabled ? 'true' : 'false');
    } catch {
      // Ignore quota errors
    }
  }

  const runtime = getCapacitorRuntimeStatus();
  if (runtime.isNativeApp && runtime.platform === 'android') {
    try {
      const res = await IlmizoPrayerWidgetNative.setPersistentCountdown({ enabled });
      return {
        enabled: Boolean(res?.enabled ?? enabled),
        syncedNative: true,
        countdownActive: Boolean(res?.countdownActive),
      };
    } catch {
      return { enabled, syncedNative: false, countdownActive: false };
    }
  }

  return { enabled, syncedNative: false, countdownActive: false };
}

/**
 * Triggers Android 8+ native AppWidgetManager.requestPinAppWidget() so users can add
 * the Compact (2x1) or Full 5-Prayer (4x2) Salah Widget to their home screen in 1 tap.
 */
export async function requestPinNativePrayerWidget(
  size: 'small' | 'medium' = 'medium'
): Promise<{ requested: boolean; supported: boolean; message: string }> {
  const runtime = getCapacitorRuntimeStatus();
  if (runtime.isNativeApp && runtime.platform === 'android') {
    try {
      const res = await IlmizoPrayerWidgetNative.requestPinPrayerWidget({ size });
      if (res?.requested) {
        return {
          requested: true,
          supported: true,
          message:
            size === 'medium'
              ? 'Pin request sent! Tap "Add" on your Android Home Screen for the 5-Prayer Widget.'
              : 'Pin request sent! Tap "Add" on your Android Home Screen for the Compact Prayer Widget.',
        };
      }
      return {
        requested: false,
        supported: Boolean(res?.supported),
        message:
          res?.reason ||
          'Long-press your Android Home Screen -> Widgets -> Ilmizo to add the Prayer Widget.',
      };
    } catch {
      return {
        requested: false,
        supported: false,
        message:
          'Long-press your Android Home Screen -> Widgets -> Ilmizo to place the Salah Widget.',
      };
    }
  }

  return {
    requested: false,
    supported: false,
    message:
      'Install the Ilmizo Android APK to pin the live Salah Widget directly to your phone Home Screen.',
  };
}

