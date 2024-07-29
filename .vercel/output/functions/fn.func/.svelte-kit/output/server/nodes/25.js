

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/status/list/added/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/25.ByLIVygQ.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js"];
export const stylesheets = [];
export const fonts = [];
