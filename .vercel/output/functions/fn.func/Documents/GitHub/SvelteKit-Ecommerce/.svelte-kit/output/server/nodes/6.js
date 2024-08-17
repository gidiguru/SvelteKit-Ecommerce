

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.zj8JOUlL.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js"];
export const stylesheets = [];
export const fonts = [];
