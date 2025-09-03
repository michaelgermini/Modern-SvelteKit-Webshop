import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    strictPort: true,
    host: 'localhost',
    hmr: {
      port: 5173,
      host: 'localhost',
      protocol: 'ws'
    },
    fs: {
      strict: false
    }
  },
  build: {
    sourcemap: false,
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    exclude: ['@sveltejs/kit', '@sveltejs/vite-plugin-svelte'],
    include: ['svelte', 'svelte/store', 'svelte/internal']
  },
  ssr: {
    noExternal: ['@sveltejs/kit', 'svelte', 'svelte/store']
  },
  define: {
    global: 'globalThis'
  }
});