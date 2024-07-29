import * as server from '../entries/pages/admin/orders/_orderId_/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/orders/_orderId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/orders/[orderId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.ACiVMRRP.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js"];
export const stylesheets = [];
export const fonts = [];
