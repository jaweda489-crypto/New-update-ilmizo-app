package com.ilmizo.tarbiyah;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Refreshes Ilmizo home-screen prayer widgets and the opt-in persistent countdown
 * notification after device reboot, clock adjustment, or timezone change.
 */
public class IlmizoPrayerBootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (context == null || intent == null || intent.getAction() == null) return;
        String action = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(action)
            || Intent.ACTION_TIME_CHANGED.equals(action)
            || Intent.ACTION_TIMEZONE_CHANGED.equals(action)
            || Intent.ACTION_DATE_CHANGED.equals(action)) {
            IlmizoPrayerWidgetProvider.updateAllWidgets(context);
            IlmizoPrayerWidgetProvider.updatePersistentCountdownNotification(context);
            IlmizoExactAdhanReceiver.rescheduleSavedAlarms(context);
        }
    }
}
