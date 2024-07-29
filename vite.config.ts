import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [
      sveltekit(),

    ],
    ssr: {
      noExternal: ['svelte-email']
  },
    // You can add more Vite configuration options here
    build: {
      // Add any build-specific options
    },
    server: {
      // Add any development server options
    }
  };

  if (mode === 'production') {
    // Add any production-specific configuration
  }

  return config;
});