import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            // Prerender the root route (homepage) by default
            prerender: {
                entries: ['/']
            },
            // Output directory
            out: 'build',
            // Split your app into smaller chunks (optional)
            split: false
        }),
        // You can add more kit options here
        alias: {
            $components: 'src/lib/components',
            $utils: 'src/lib/utils'
        },
        // Enable SvelteKit's CSRF protection (recommended)
        csrf: {
            checkOrigin: true,
        }
    }
};

export default config;