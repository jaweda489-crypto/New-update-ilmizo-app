package com.ilmizo.tarbiyah;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.widget.RemoteViews;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

/**
 * Native Android Home-Screen Prayer Widgets (Small 2x1 & Medium 4x2) +
 * Opt-in Silent Persistent Prayer Countdown Notification.
 *
 * Strictly local-first: reads today's prayer schedule cached by the Ilmizo web layer
 * in SharedPreferences ("ilmizo_prayer_widget_prefs") with zero cloud dependency.
 */
public class IlmizoPrayerWidgetProvider extends AppWidgetProvider {

    public static final String PREFS_NAME = "ilmizo_prayer_widget_prefs";
    public static final String COUNTDOWN_CHANNEL_ID = "ilmizo_prayer_countdown_channel";
    public static final int COUNTDOWN_NOTIFICATION_ID = 4401;

    protected int getLayoutResId() {
        return R.layout.widget_prayer_small;
    }

    protected int getRootViewId() {
        return R.id.widget_prayer_small_root;
    }

    protected boolean isMediumLayout() {
        return false;
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        if (appWidgetIds == null || appWidgetIds.length == 0) return;
        for (int widgetId : appWidgetIds) {
            RemoteViews views = buildRemoteViews(context, getLayoutResId(), getRootViewId(), isMediumLayout());
            appWidgetManager.updateAppWidget(widgetId, views);
        }
    }

    public static class Small extends IlmizoPrayerWidgetProvider {
        @Override
        protected int getLayoutResId() {
            return R.layout.widget_prayer_small;
        }

        @Override
        protected int getRootViewId() {
            return R.id.widget_prayer_small_root;
        }

        @Override
        protected boolean isMediumLayout() {
            return false;
        }
    }

    public static class Medium extends IlmizoPrayerWidgetProvider {
        @Override
        protected int getLayoutResId() {
            return R.layout.widget_prayer_medium;
        }

        @Override
        protected int getRootViewId() {
            return R.id.widget_prayer_medium_root;
        }

        @Override
        protected boolean isMediumLayout() {
            return true;
        }
    }

    private static String stripAmPmCompact(String raw) {
        if (raw == null) return "--:--";
        return raw.replace(" AM", "").replace(" PM", "").trim();
    }

    private static RemoteViews buildRemoteViews(
        Context context,
        int layoutResId,
        int rootViewId,
        boolean includeAllFiveTimes
    ) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String city = prefs.getString("city", "Jamshedpur");
        String hijri = prefs.getString("hijriDate", "1448 AH");
        String nextPrayerName = prefs.getString("nextPrayerName", "Fajr");
        String nextPrayerTime = prefs.getString("nextPrayerTime", "4:52 AM");

        RemoteViews views = new RemoteViews(context.getPackageName(), layoutResId);
        views.setTextViewText(R.id.widget_city_label, "Ilmizo · " + city);
        views.setTextViewText(R.id.widget_next_prayer_name, "Next: " + nextPrayerName);
        views.setTextViewText(R.id.widget_next_prayer_time, nextPrayerTime);
        views.setTextViewText(
            R.id.widget_hijri_date,
            includeAllFiveTimes ? hijri : (hijri + " · Tap to open Salah")
        );

        if (includeAllFiveTimes) {
            views.setTextViewText(R.id.widget_time_fajr, stripAmPmCompact(prefs.getString("fajr", "4:52 AM")));
            views.setTextViewText(R.id.widget_time_dhuhr, stripAmPmCompact(prefs.getString("dhuhr", "12:08 PM")));
            views.setTextViewText(R.id.widget_time_asr, stripAmPmCompact(prefs.getString("asr", "3:35 PM")));
            views.setTextViewText(R.id.widget_time_maghrib, stripAmPmCompact(prefs.getString("maghrib", "5:52 PM")));
            views.setTextViewText(R.id.widget_time_isha, stripAmPmCompact(prefs.getString("isha", "7:08 PM")));
        }

        Intent launchIntent = new Intent(context, MainActivity.class);
        launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 4400, launchIntent, flags);
        views.setOnClickPendingIntent(rootViewId, pendingIntent);
        return views;
    }

    public static int updateAllWidgets(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        if (manager == null) return 0;

        int updated = 0;

        int[] smallIds = manager.getAppWidgetIds(new ComponentName(context, Small.class));
        if (smallIds != null && smallIds.length > 0) {
            RemoteViews smallViews = buildRemoteViews(
                context,
                R.layout.widget_prayer_small,
                R.id.widget_prayer_small_root,
                false
            );
            for (int id : smallIds) {
                manager.updateAppWidget(id, smallViews);
                updated++;
            }
        }

        int[] mediumIds = manager.getAppWidgetIds(new ComponentName(context, Medium.class));
        if (mediumIds != null && mediumIds.length > 0) {
            RemoteViews mediumViews = buildRemoteViews(
                context,
                R.layout.widget_prayer_medium,
                R.id.widget_prayer_medium_root,
                true
            );
            for (int id : mediumIds) {
                manager.updateAppWidget(id, mediumViews);
                updated++;
            }
        }

        return updated;
    }

    /**
     * Posts or cancels the opt-in silent ongoing Prayer Countdown notification.
     * Respects Android 13+ POST_NOTIFICATIONS runtime permission safely.
     */
    public static boolean updatePersistentCountdownNotification(Context context) {
        NotificationManager nm = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return false;

        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        boolean enabled = prefs.getBoolean("persistentCountdownEnabled", false);
        if (!enabled) {
            nm.cancel(COUNTDOWN_NOTIFICATION_ID);
            return false;
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
                return false;
            }
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                COUNTDOWN_CHANNEL_ID,
                "Ilmizo Next Prayer Bar",
                NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("Optional silent ongoing reminder showing your next Salah time.");
            channel.setShowBadge(false);
            channel.enableVibration(false);
            channel.setSound(null, null);
            nm.createNotificationChannel(channel);
        }

        String city = prefs.getString("city", "Jamshedpur");
        String nextPrayerName = prefs.getString("nextPrayerName", "Fajr");
        String nextPrayerTime = prefs.getString("nextPrayerTime", "4:52 AM");
        String hijri = prefs.getString("hijriDate", "1448 AH");

        Intent launchIntent = new Intent(context, MainActivity.class);
        launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 4402, launchIntent, flags);

        Notification notification = new NotificationCompat.Builder(context, COUNTDOWN_CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_stat_ilmizo_crescent)
            .setContentTitle("Next Salah: " + nextPrayerName + " at " + nextPrayerTime)
            .setContentText(city + " · " + hijri + " · Tap to open Ilmizo")
            .setOngoing(true)
            .setSilent(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setCategory(NotificationCompat.CATEGORY_STATUS)
            .setContentIntent(pendingIntent)
            .build();

        nm.notify(COUNTDOWN_NOTIFICATION_ID, notification);
        return true;
    }
}
