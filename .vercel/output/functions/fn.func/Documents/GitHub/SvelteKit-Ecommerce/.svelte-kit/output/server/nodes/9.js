import * as server from '../entries/pages/admin/orders/_orderId_/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/orders/_orderId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/orders/[orderId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.OPhg1xZX.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js"];
export const stylesheets = [];
export const fonts = [];
