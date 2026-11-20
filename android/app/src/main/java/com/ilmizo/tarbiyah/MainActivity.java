package com.ilmizo.tarbiyah;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(IlmizoBillingPlugin.class);
        registerPlugin(IlmizoPrayerWidgetPlugin.class);
        registerPlugin(IlmizoMediaSessionPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
