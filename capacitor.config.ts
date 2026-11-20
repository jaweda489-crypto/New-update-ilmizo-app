/**
 * Capacitor Configuration for Ilmizo — Islamic Learning & Family Tarbiyah
 * Ready for Google Play Store Android APK / AAB packaging and iOS App Store build.
 */
export interface IlmizoCapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  bundledWebRuntime: boolean;
  server: {
    androidScheme: 'https';
  };
  plugins: {
    SplashScreen: {
      launchShowDuration: number;
      backgroundColor: string;
      showSpinner: boolean;
    };
    StatusBar: {
      style: 'DARK' | 'LIGHT';
      backgroundColor: string;
    };
    LocalNotifications: {
      smallIcon: string;
      iconColor: string;
      sound: string;
    };
  };
}

const config: IlmizoCapacitorConfig = {
  appId: 'com.ilmizo.tarbiyah',
  appName: 'Ilmizo - Islamic Learning & Tarbiyah',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      backgroundColor: '#0F3826',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#0F3826',
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_ilmizo_crescent',
      iconColor: '#14532D',
      sound: 'adhan_makkah.wav',
    },
  },
};

export default config;
