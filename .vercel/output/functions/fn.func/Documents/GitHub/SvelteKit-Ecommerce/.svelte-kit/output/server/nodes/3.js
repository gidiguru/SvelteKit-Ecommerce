import * as server from '../entries/pages/admin/products/_productId_/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_productId_/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/[productId]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.3G31wyTc.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/entry.tFR346P9.js","_app/immutable/chunks/index.3tSfWZJ4.js","_app/immutable/chunks/index.u3c6nUOo.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.PlMnM1hz.js","_app/immutable/chunks/events.tHoz6_OQ.js","_app/immutable/chunks/Icon.q2bkpGCn.js","_app/immutable/chunks/each.-_FoTsOa.js"];
export const stylesheets = [];
export const fonts = [];
