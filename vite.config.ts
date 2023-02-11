/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  plugins: [
    react(),
    EnvironmentPlugin([
      'VITE_API_ENDPOINT',
      'VITE_SENTRY_DNS',
      'VITE_GA_TRACKING_CODE',
    ]),
  ],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:4000',
      },
    },
  },
  test: {
    coverage: {
      exclude: [
        'node_modules/',
        'jest/',
        'mocks/',
        'scripts/',
        'server/',
        'src/**/*.d.ts',
        'src/**/*.stories.*',
        'src/redux/**',
        'src/offscreen/Redirect.tsx',
        'src/main.tsx',
        'src/mockServiceWorker.js',
      ],
      reporter: ['text', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: 'jest/setupTests.js',
  },
})
