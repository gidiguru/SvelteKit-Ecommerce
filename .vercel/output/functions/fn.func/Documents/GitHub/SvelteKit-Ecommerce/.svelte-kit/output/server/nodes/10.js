import * as server from '../entries/pages/admin/products/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.gs5Iz5KY.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/each.-_FoTsOa.js","_app/immutable/chunks/index.3NDdlAmi.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.PlMnM1hz.js","_app/immutable/chunks/index.3tSfWZJ4.js","_app/immutable/chunks/table-row._rYr33ml.js","_app/immutable/chunks/index.1d4xG6v8.js","_app/immutable/chunks/index.3dRzczEt.js","_app/immutable/chunks/events.tHoz6_OQ.js","_app/immutable/chunks/index.21O2vQU9.js","_app/immutable/chunks/input.p0W_-8Fv.js","_app/immutable/chunks/label.-bVuneSm.js","_app/immutable/chunks/Icon.q2bkpGCn.js","_app/immutable/chunks/trash.rBnlcUZ6.js","_app/immutable/chunks/alert-title.r4ERVnDc.js","_app/immutable/chunks/square-pen.EZtzbEwE.js"];
export const stylesheets = [];
export const fonts = [];
