

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/status/list/added/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/25.19nnJWQm.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js"];
export const stylesheets = [];
export const fonts = [];
