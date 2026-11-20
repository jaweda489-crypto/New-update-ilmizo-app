package com.ilmizo.tarbiyah;

import android.Manifest;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Native Android Doze-Safe Exact Background Adhan Alarm Receiver.
 * Uses AlarmManager.setExactAndAllowWhileIdle so daily Salah alerts & bundled Adhan audio
 * fire accurately even when the device is sleeping, and auto-reschedule after reboot.
 */
public class IlmizoExactAdhanReceiver extends BroadcastReceiver {

    public static final String PREFS_NAME = "ilmizo_exact_adhan_alarms_v1";
    public static final String KEY_SAVED_ALARMS = "saved_alarms_json";
    public static final String EXACT_ADHAN_CHANNEL_ID = "ilmizo_exact_adhan_channel";

    public static final String EXTRA_ALARM_ID = "alarm_id";
    public static final String EXTRA_PRAYER_NAME = "prayer_name";
    public static final String EXTRA_TITLE = "title";
    public static final String EXTRA_BODY = "body";
    public static final String EXTRA_SOUND_MODE = "sound_mode";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (context == null || intent == null) return;

        PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wakeLock = null;
        try {
            if (pm != null) {
                wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ilmizo:ExactAdhanWakeLock");
                wakeLock.acquire(8000L);
            }

            int alarmId = intent.getIntExtra(EXTRA_ALARM_ID, 4601);
            String title = intent.getStringExtra(EXTRA_TITLE);
            String body = intent.getStringExtra(EXTRA_BODY);
            String soundMode = intent.getStringExtra(EXTRA_SOUND_MODE);

            showAdhanNotification(
                context,
                alarmId,
                title != null ? title : "Time for Salah",
                body != null ? body : "Hayya 'alas-Salah — Come to prayer.",
                !"silent_visual".equals(soundMode)
            );
            IlmizoPrayerWidgetProvider.updateAllWidgets(context);
            IlmizoPrayerWidgetProvider.updatePersistentCountdownNotification(context);
        } finally {
            if (wakeLock != null && wakeLock.isHeld()) {
                try {
                    wakeLock.release();
                } catch (Exception ignored) {
                }
            }
        }
    }

    private static void showAdhanNotification(
        Context context,
        int notificationId,
        String title,
        String body,
        boolean playAdhanSound
    ) {
        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
                return;
            }
        }

        Uri adhanSoundUri = Uri.parse(
            ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + context.getPackageName() + "/raw/adhan_makkah"
        );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                EXACT_ADHAN_CHANNEL_ID,
                "Ilmizo Exact Adhan Alarms",
                NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("Exact background Salah & Adhan call-to-prayer alarms.");
            channel.enableVibration(true);
            channel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            AudioAttributes audioAttrs = new AudioAttributes.Builder()
                .setUsage(AudioAttributes.USAGE_ALARM)
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .build();
            channel.setSound(adhanSoundUri, audioAttrs);
            nm.createNotificationChannel(channel);
        }

        Intent launchIntent = new Intent(context, MainActivity.class);
        launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int piFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            piFlags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getActivity(context, notificationId, launchIntent, piFlags);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, EXACT_ADHAN_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_stat_ilmizo_crescent)
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent);

        if (playAdhanSound) {
            builder.setSound(adhanSoundUri);
        } else {
            builder.setSilent(true);
        }

        nm.notify(notificationId, builder.build());
    }

    public static int scheduleAlarmsJson(Context context, String alarmsJson) {
        if (context == null || alarmsJson == null) return 0;
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return 0;

        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(KEY_SAVED_ALARMS, alarmsJson).apply();

        int scheduled = 0;
        long now = System.currentTimeMillis();

        try {
            JSONArray array = new JSONArray(alarmsJson);
            for (int i = 0; i < array.length(); i++) {
                JSONObject item = array.optJSONObject(i);
                if (item == null) continue;
                int id = item.optInt("id", 4601 + i);
                long triggerAt = item.optLong("triggerAtMillis", 0L);
                if (triggerAt <= now) {
                    // Roll forward 24h if alarm timestamp is in the past after a reboot
                    while (triggerAt > 0 && triggerAt <= now) {
                        triggerAt += 24L * 60L * 60L * 1000L;
                    }
                }
                if (triggerAt <= now) continue;

                Intent intent = new Intent(context, IlmizoExactAdhanReceiver.class);
                intent.putExtra(EXTRA_ALARM_ID, id);
                intent.putExtra(EXTRA_PRAYER_NAME, item.optString("prayerName", "Salah"));
                intent.putExtra(EXTRA_TITLE, item.optString("title", "Time for Salah"));
                intent.putExtra(EXTRA_BODY, item.optString("body", "Hayya 'alas-Salah"));
                intent.putExtra(EXTRA_SOUND_MODE, item.optString("soundMode", "makkah_haram"));

                int piFlags = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    piFlags |= PendingIntent.FLAG_IMMUTABLE;
                }
                PendingIntent pi = PendingIntent.getBroadcast(context, id, intent, piFlags);

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !alarmManager.canScheduleExactAlarms()) {
                    alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pi);
                } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pi);
                } else {
                    alarmManager.setExact(AlarmManager.RTC_WAKEUP, triggerAt, pi);
                }
                scheduled++;
            }
        } catch (Exception ignored) {
            return scheduled;
        }
        return scheduled;
    }

    public static void rescheduleSavedAlarms(Context context) {
        if (context == null) return;
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String saved = prefs.getString(KEY_SAVED_ALARMS, null);
        if (saved != null && !saved.isEmpty()) {
            scheduleAlarmsJson(context, saved);
        }
    }
}
