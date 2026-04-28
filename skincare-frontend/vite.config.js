import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], // Ensure these assets exist in your /public folder
      manifest: {
        name: '7°Skin | Luxury Skincare',
        short_name: '7°Skin',
        description: 'Luxury skincare, bodycare, and haircare inspired by Sri Lankan heritage.',
        theme_color: '#fff5e1',
        background_color: '#fff5e1',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Increase limit to 5 MB (5 * 1024 * 1024 bytes)
        // Pre-cache all static assets including common image formats
        // This ensures your local images (manually added) are cached during the build.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,gif}'],
        // Runtime caching for external images (e.g., from CDNs or external links)
        // This caches images as they are requested by the user.
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp)$/, // Match common image file extensions
            handler: 'CacheFirst', // Strategy: Try to serve from cache first, then network
            options: {
              cacheName: 'images-cache', // A name for this specific cache
              expiration: {
                maxEntries: 50, // Cache up to 50 images
                maxAgeSeconds: 60 * 60 * 24 * 30, // Keep images in cache for 30 days
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache opaque responses (e.g., cross-origin) and successful ones
              },
            },
          },
          // You can add more runtime caching rules here for other external assets like fonts or APIs if needed.
          // For example, if you use Google Fonts:
          // { urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, handler: 'CacheFirst', options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } } }
        ],
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});