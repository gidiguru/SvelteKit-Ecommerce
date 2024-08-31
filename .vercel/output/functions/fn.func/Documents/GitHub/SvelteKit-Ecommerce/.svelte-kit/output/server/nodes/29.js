import * as server from '../entries/pages/products/_productId_/_page.server.ts.js';

export const index = 29;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/products/_productId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/products/[productId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/29.4QzAlgjr.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/each.-_FoTsOa.js","_app/immutable/chunks/index.3NDdlAmi.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.PlMnM1hz.js","_app/immutable/chunks/index.3tSfWZJ4.js","_app/immutable/chunks/CldImage.lt91u4k9.js","_app/immutable/chunks/getCldImageUrl.b_Vz0iCf.js","_app/immutable/chunks/analytics.81QmT11y.js","_app/immutable/chunks/cart.no7K6MAv.js"];
export const stylesheets = ["_app/immutable/assets/29.k8N6-39U.css"];
export const fonts = [];
