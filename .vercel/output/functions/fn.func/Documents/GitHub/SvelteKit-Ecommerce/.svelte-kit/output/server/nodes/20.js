

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/password/reset/success/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.L-dhpu4N.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js"];
export const stylesheets = [];
export const fonts = [];
