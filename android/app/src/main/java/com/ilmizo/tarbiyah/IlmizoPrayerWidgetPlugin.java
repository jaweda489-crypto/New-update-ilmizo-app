package com.ilmizo.tarbiyah;

import android.app.AlarmManager;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Capacitor Plugin bridge allowing the Ilmizo web layer to sync local prayer schedules
 * into Android SharedPreferences for home-screen AppWidgets, 1-tap widget pinning,
 * opt-in ongoing prayer countdown notifications, and Doze-safe Exact Background Adhan Alarms.
 */
@CapacitorPlugin(name = "IlmizoPrayerWidget")
public class IlmizoPrayerWidgetPlugin extends Plugin {

    @PluginMethod
    public void syncPrayerSchedule(PluginCall call) {
        Context context = getContext();
        SharedPreferences prefs = context.getSharedPreferences(
            IlmizoPrayerWidgetProvider.PREFS_NAME,
            Context.MODE_PRIVATE
        );

        SharedPreferences.Editor editor = prefs.edit();
        editor.putString("city", call.getString("city", "Jamshedpur"));
        editor.putString("hijriDate", call.getString("hijriDate", "1448 AH"));
        editor.putString("nextPrayerName", call.getString("nextPrayerName", "Fajr"));
        editor.putString("nextPrayerTime", call.getString("nextPrayerTime", "4:52 AM"));
        editor.putString("fajr", call.getString("fajr", "4:52 AM"));
        editor.putString("dhuhr", call.getString("dhuhr", "12:08 PM"));
        editor.putString("asr", call.getString("asr", "3:35 PM"));
        editor.putString("maghrib", call.getString("maghrib", "5:52 PM"));
        editor.putString("isha", call.getString("isha", "7:08 PM"));
        editor.putString("updatedAtIso", call.getString("updatedAtIso", ""));
        if (call.hasOption("persistentCountdownEnabled")) {
            editor.putBoolean(
                "persistentCountdownEnabled",
                Boolean.TRUE.equals(call.getBoolean("persistentCountdownEnabled", false))
            );
        }
        editor.apply();

        int widgetsUpdated = IlmizoPrayerWidgetProvider.updateAllWidgets(context);
        boolean countdownActive = IlmizoPrayerWidgetProvider.updatePersistentCountdownNotification(context);

        JSObject ret = new JSObject();
        ret.put("synced", true);
        ret.put("widgetsUpdated", widgetsUpdated);
        ret.put("countdownActive", countdownActive);
        call.resolve(ret);
    }

    @PluginMethod
    public void setPersistentCountdown(PluginCall call) {
        boolean enabled = Boolean.TRUE.equals(call.getBoolean("enabled", false));
        Context context = getContext();
        SharedPreferences prefs = context.getSharedPreferences(
            IlmizoPrayerWidgetProvider.PREFS_NAME,
            Context.MODE_PRIVATE
        );
        prefs.edit().putBoolean("persistentCountdownEnabled", enabled).apply();

        boolean countdownActive = IlmizoPrayerWidgetProvider.updatePersistentCountdownNotification(context);
        JSObject ret = new JSObject();
        ret.put("enabled", enabled);
        ret.put("countdownActive", countdownActive);
        call.resolve(ret);
    }

    @PluginMethod
    public void scheduleExactAdhanAlarms(PluginCall call) {
        Context context = getContext();
        JSArray alarms = call.getArray("alarms");
        String json = alarms != null ? alarms.toString() : "[]";
        int scheduled = IlmizoExactAdhanReceiver.scheduleAlarmsJson(context, json);

        boolean exactPermitted = true;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            exactPermitted = am != null && am.canScheduleExactAlarms();
        }

        JSObject ret = new JSObject();
        ret.put("scheduled", scheduled);
        ret.put("exactAlarmPermitted", exactPermitted);
        call.resolve(ret);
    }

    @PluginMethod
    public void requestPinPrayerWidget(PluginCall call) {
        Context context = getContext();
        String size = call.getString("size", "medium");
        JSObject ret = new JSObject();

        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            ret.put("requested", false);
            ret.put("supported", false);
            ret.put("reason", "Long-press your Android Home Screen -> Widgets -> Ilmizo.");
            call.resolve(ret);
            return;
        }

        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        if (manager == null || !manager.isRequestPinAppWidgetSupported()) {
            ret.put("requested", false);
            ret.put("supported", false);
            ret.put("reason", "Your launcher requires adding widgets via Home Screen -> Widgets -> Ilmizo.");
            call.resolve(ret);
            return;
        }

        ComponentName provider = "small".equals(size)
            ? new ComponentName(context, IlmizoPrayerWidgetProvider.Small.class)
            : new ComponentName(context, IlmizoPrayerWidgetProvider.Medium.class);

        boolean requested = manager.requestPinAppWidget(provider, null, null);
        ret.put("requested", requested);
        ret.put("supported", true);
        call.resolve(ret);
    }
}
