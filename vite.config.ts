import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import svelteEmailTailwind from 'svelte-email-tailwind/vite';

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [
      sveltekit(),
      svelteEmailTailwind({
        // You can customize the folder where your email templates are located
        // Default is '/src/lib/emails'
        // emailsFolder: '/src/emails',
        
        // You can also customize the Tailwind config for emails
        // tailwindConfig: './tailwind.config.cjs',
      })
    ],
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