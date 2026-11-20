import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function excludeAistudioFromDist(): Plugin {
  return {
    name: 'exclude-aistudio-from-dist',
    apply: 'build',
    closeBundle() {
      const target = path.resolve(process.cwd(), 'dist', 'assets', 'aistudio');
      if (fs.existsSync(target)) {
        fs.rmSync(target, { recursive: true, force: true });
      }
    },
  };
}

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      excludeAistudioFromDist(),
      ...(command === 'build'
        ? [
            VitePWA({
              registerType: 'autoUpdate',
        includeAssets: [
          'icon.svg',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
        ],
        manifest: {
          id: '/',
          name: 'Ilmizo — Islamic Learning & Kids Tarbiyah',
          short_name: 'Ilmizo',
          description:
            'Offline-first, local-first Islamic learning platform for adults, children, and families with 114 Surahs, Hifz Mastery, Salah Tracker, Kids 3D Learning World, and Parent Hub.',
          theme_color: '#0F3826',
          background_color: '#FDFBF7',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          orientation: 'portrait',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2,json,mp3}'],
          globIgnores: ['**/assets/aistudio/**', '**/android/**'],
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          navigateFallback: 'index.html',
          navigateFallbackDenylist: [/^\/api\//],
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'ilmizo-google-fonts',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
            {
              urlPattern: /^https:\/\/api\.alquran\.cloud\/v1\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'ilmizo-quran-api-cache',
                networkTimeoutSeconds: 6,
                expiration: {
                  maxEntries: 150,
                  maxAgeSeconds: 60 * 60 * 24 * 90,
                },
              },
            },
            {
              urlPattern: /^https:\/\/api\.aladhan\.com\/v1\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'ilmizo-prayer-api-cache',
                networkTimeoutSeconds: 5,
                expiration: {
                  maxEntries: 40,
                  maxAgeSeconds: 60 * 60 * 24 * 14,
                },
              },
            },
            {
              urlPattern: /^https:\/\/cdn\.islamic\.network\/quran\/audio\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'ilmizo-quran-audio-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 60,
                },
              },
            },
          ],
        },
            }),
          ]
        : []),
    ],
    optimizeDeps: {
      entries: ['index.html'],
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'lucide-react',
        'motion/react',
        '@capacitor/core',
        '@capacitor/haptics',
        '@capacitor/local-notifications',
      ],
    },
    build: {
      chunkSizeWarningLimit: 750,
      rolldownOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
                return 'vendor-react';
              }
              if (id.includes('/motion/') || id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('@capacitor/')) {
                return 'vendor-capacitor';
              }
            }
            if (id.includes('/src/data/islamicContent')) {
              return 'data-islamic-content';
            }
            if (id.includes('/src/data/quranData')) {
              return 'data-quran-meta';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              ignored: ['**/android/**', '**/dist/**', '**/.ilmizo-server-cache/**'],
            },
    },
  };
});
