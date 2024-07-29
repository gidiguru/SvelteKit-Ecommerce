import * as server from '../entries/pages/admin/products/_productId_/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_productId_/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/[productId]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.8vRAcAp5.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js","_app/immutable/chunks/entry.Czeeh5lQ.js","_app/immutable/chunks/index.dWiL86bg.js","_app/immutable/chunks/index.-xDqt56M.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RHvsTm_P.js","_app/immutable/chunks/events.0ltW6YKX.js","_app/immutable/chunks/Icon.od-fKyEU.js","_app/immutable/chunks/each.5xwV0ohN.js"];
export const stylesheets = [];
export const fonts = [];
