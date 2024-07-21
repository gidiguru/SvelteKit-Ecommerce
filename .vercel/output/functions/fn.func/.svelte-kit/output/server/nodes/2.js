import * as server from '../entries/pages/admin/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.IXdP_PxZ.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js"];
export const stylesheets = [];
export const fonts = [];
