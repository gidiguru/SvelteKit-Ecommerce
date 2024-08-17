import * as server from '../entries/pages/products/_page.server.ts.js';

export const index = 28;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/products/+page.server.ts";
export const imports = ["_app/immutable/nodes/28.mv0KV7aj.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/each.-_FoTsOa.js","_app/immutable/chunks/entry.-X8jaEPo.js","_app/immutable/chunks/index.3tSfWZJ4.js","_app/immutable/chunks/CldImage.lt91u4k9.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/getCldImageUrl.b_Vz0iCf.js","_app/immutable/chunks/analytics.81QmT11y.js","_app/immutable/chunks/index.3NDdlAmi.js","_app/immutable/chunks/utils.PlMnM1hz.js","_app/immutable/chunks/cart.MGYI9m6o.js","_app/immutable/chunks/index.KR-R4Bb-.js","_app/immutable/chunks/Icon.q2bkpGCn.js","_app/immutable/chunks/stores.llTg9FJI.js","_app/immutable/chunks/index.u3c6nUOo.js","_app/immutable/chunks/events.tHoz6_OQ.js","_app/immutable/nodes/29.hOIl4TE6.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/index.21O2vQU9.js","_app/immutable/chunks/tabs-content.emM-aSV5.js"];
export const stylesheets = ["_app/immutable/assets/28.uugKvIxd.css","_app/immutable/assets/index.60knD0-d.css","_app/immutable/assets/29.k8N6-39U.css"];
export const fonts = [];
