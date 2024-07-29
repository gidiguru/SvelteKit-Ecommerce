declare module 'svelte-email' {
    import { SvelteComponent } from 'svelte';

    export function render(options: {
        template: typeof SvelteComponent;
        props?: Record<string, any>;
    }): string;
}