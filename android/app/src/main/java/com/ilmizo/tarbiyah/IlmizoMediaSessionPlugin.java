package com.ilmizo.tarbiyah;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Capacitor Plugin bridging Ilmizo audioManager playback state with the native
 * Android Media Playback Foreground Service and forwarding Lock-Screen controls back to JS.
 */
@CapacitorPlugin(name = "IlmizoMediaSession")
public class IlmizoMediaSessionPlugin extends Plugin {

    private static volatile IlmizoMediaSessionPlugin activeInstance;

    @Override
    public void load() {
        super.load();
        activeInstance = this;
    }

    @Override
    protected void handleOnDestroy() {
        if (activeInstance == this) {
            activeInstance = null;
        }
        super.handleOnDestroy();
    }

    public static void dispatchMediaControl(String action) {
        IlmizoMediaSessionPlugin plugin = activeInstance;
        if (plugin == null || action == null) return;
        JSObject payload = new JSObject();
        payload.put("action", action);
        plugin.notifyListeners("mediaAction", payload);
    }

    @PluginMethod
    public void updatePlayback(PluginCall call) {
        Context context = getContext();
        Intent intent = new Intent(context, IlmizoMediaPlaybackService.class);
        intent.setAction(IlmizoMediaPlaybackService.ACTION_UPDATE);
        intent.putExtra(IlmizoMediaPlaybackService.EXTRA_TITLE, call.getString("title", "Ilmizo Quran"));
        intent.putExtra(IlmizoMediaPlaybackService.EXTRA_ARTIST, call.getString("artist", "Ilmizo"));
        intent.putExtra(IlmizoMediaPlaybackService.EXTRA_ALBUM, call.getString("album", "Ilmizo"));
        intent.putExtra(
            IlmizoMediaPlaybackService.EXTRA_IS_PLAYING,
            Boolean.TRUE.equals(call.getBoolean("isPlaying", true))
        );
        intent.putExtra(
            IlmizoMediaPlaybackService.EXTRA_CAN_NEXT,
            Boolean.TRUE.equals(call.getBoolean("canNext", false))
        );
        intent.putExtra(
            IlmizoMediaPlaybackService.EXTRA_CAN_PREVIOUS,
            Boolean.TRUE.equals(call.getBoolean("canPrevious", false))
        );

        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent);
            } else {
                context.startService(intent);
            }
            JSObject ret = new JSObject();
            ret.put("active", true);
            call.resolve(ret);
        } catch (Exception e) {
            JSObject ret = new JSObject();
            ret.put("active", false);
            call.resolve(ret);
        }
    }

    @PluginMethod
    public void stopPlayback(PluginCall call) {
        Context context = getContext();
        try {
            Intent intent = new Intent(context, IlmizoMediaPlaybackService.class);
            intent.setAction(IlmizoMediaPlaybackService.ACTION_STOP_SERVICE);
            context.stopService(intent);
        } catch (Exception ignored) {
            // Safe cleanup if service is not running
        }
        JSObject ret = new JSObject();
        ret.put("active", false);
        call.resolve(ret);
    }
}
