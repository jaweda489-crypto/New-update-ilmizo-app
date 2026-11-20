package com.ilmizo.tarbiyah;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;

/**
 * Native Android Media Playback Foreground Service keeping Ilmizo Quran & Story
 * recitation active when the phone screen locks, with Lock-Screen Play/Pause/Previous/Next controls.
 */
public class IlmizoMediaPlaybackService extends Service {

    public static final String CHANNEL_ID = "ilmizo_media_playback_channel";
    public static final int NOTIFICATION_ID = 4501;

    public static final String ACTION_UPDATE = "com.ilmizo.tarbiyah.MEDIA_UPDATE";
    public static final String ACTION_STOP_SERVICE = "com.ilmizo.tarbiyah.MEDIA_STOP_SERVICE";
    public static final String ACTION_BROADCAST_CONTROL = "com.ilmizo.tarbiyah.MEDIA_CONTROL";

    public static final String EXTRA_CONTROL = "control";
    public static final String EXTRA_TITLE = "title";
    public static final String EXTRA_ARTIST = "artist";
    public static final String EXTRA_ALBUM = "album";
    public static final String EXTRA_IS_PLAYING = "isPlaying";
    public static final String EXTRA_CAN_NEXT = "canNext";
    public static final String EXTRA_CAN_PREVIOUS = "canPrevious";

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null) {
            stopSelf();
            return START_NOT_STICKY;
        }

        String action = intent.getAction();
        if (ACTION_STOP_SERVICE.equals(action)) {
            stopForeground(true);
            stopSelf();
            return START_NOT_STICKY;
        }

        if (ACTION_BROADCAST_CONTROL.equals(action)) {
            String control = intent.getStringExtra(EXTRA_CONTROL);
            if ("stop".equals(control)) {
                IlmizoMediaSessionPlugin.dispatchMediaControl("stop");
                stopForeground(true);
                stopSelf();
                return START_NOT_STICKY;
            }
            if (control != null) {
                IlmizoMediaSessionPlugin.dispatchMediaControl(control);
            }
            return START_STICKY;
        }

        String title = intent.getStringExtra(EXTRA_TITLE);
        String artist = intent.getStringExtra(EXTRA_ARTIST);
        String album = intent.getStringExtra(EXTRA_ALBUM);
        boolean isPlaying = intent.getBooleanExtra(EXTRA_IS_PLAYING, true);
        boolean canNext = intent.getBooleanExtra(EXTRA_CAN_NEXT, true);
        boolean canPrevious = intent.getBooleanExtra(EXTRA_CAN_PREVIOUS, false);

        ensureChannel();
        Notification notification = buildNotification(
            title != null ? title : "Ilmizo Quran Recitation",
            artist != null ? artist : "Ilmizo",
            album != null ? album : "Ilmizo — Learn · Pray · Grow",
            isPlaying,
            canPrevious,
            canNext
        );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(
                NOTIFICATION_ID,
                notification,
                ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
            );
        } else {
            startForeground(NOTIFICATION_ID, notification);
        }

        return START_STICKY;
    }

    private void ensureChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm == null) return;
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "Ilmizo Quran & Audio Player",
                NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("Lock-screen controls for continuous Quran recitation and audio.");
            channel.setShowBadge(false);
            channel.setSound(null, null);
            channel.enableVibration(false);
            nm.createNotificationChannel(channel);
        }
    }

    private PendingIntent buildControlPendingIntent(String control, int requestCode) {
        Intent i = new Intent(this, IlmizoMediaPlaybackService.class);
        i.setAction(ACTION_BROADCAST_CONTROL);
        i.putExtra(EXTRA_CONTROL, control);
        int piFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            piFlags |= PendingIntent.FLAG_IMMUTABLE;
        }
        return PendingIntent.getService(this, requestCode, i, piFlags);
    }

    private Notification buildNotification(
        String title,
        String artist,
        String album,
        boolean isPlaying,
        boolean canPrevious,
        boolean canNext
    ) {
        Intent launchIntent = new Intent(this, MainActivity.class);
        launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int piFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            piFlags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent contentIntent = PendingIntent.getActivity(this, 4500, launchIntent, piFlags);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_stat_ilmizo_crescent)
            .setContentTitle(title)
            .setContentText(artist)
            .setSubText(album)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setCategory(NotificationCompat.CATEGORY_TRANSPORT)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setOngoing(isPlaying)
            .setSilent(true)
            .setContentIntent(contentIntent);

        if (canPrevious) {
            builder.addAction(
                android.R.drawable.ic_media_previous,
                "Previous",
                buildControlPendingIntent("previous", 4510)
            );
        }

        builder.addAction(
            isPlaying ? android.R.drawable.ic_media_pause : android.R.drawable.ic_media_play,
            isPlaying ? "Pause" : "Play",
            buildControlPendingIntent(isPlaying ? "pause" : "play", 4511)
        );

        if (canNext) {
            builder.addAction(
                android.R.drawable.ic_media_next,
                "Next",
                buildControlPendingIntent("next", 4512)
            );
        }

        builder.addAction(
            android.R.drawable.ic_menu_close_clear_cancel,
            "Stop",
            buildControlPendingIntent("stop", 4513)
        );

        return builder.build();
    }
}
