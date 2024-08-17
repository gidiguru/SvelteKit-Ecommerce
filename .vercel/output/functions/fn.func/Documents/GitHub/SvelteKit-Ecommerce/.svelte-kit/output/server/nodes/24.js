import * as server from '../entries/pages/auth/verify/email/_page.server.ts.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/verify/email/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/verify/email/+page.server.ts";
export const imports = ["_app/immutable/nodes/24.iyIkoqyF.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js"];
export const stylesheets = [];
export const fonts = [];
