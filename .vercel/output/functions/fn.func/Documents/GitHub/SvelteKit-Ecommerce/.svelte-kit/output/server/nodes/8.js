import * as server from '../entries/pages/admin/orders/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/orders/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/orders/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.AOHrIlJa.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/each.-_FoTsOa.js","_app/immutable/chunks/forms.v_Dxtd-J.js","_app/immutable/chunks/entry.-X8jaEPo.js","_app/immutable/chunks/index.3tSfWZJ4.js","_app/immutable/chunks/index.3NDdlAmi.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.PlMnM1hz.js","_app/immutable/chunks/table-row._rYr33ml.js","_app/immutable/chunks/table-header.WdUPJMUi.js","_app/immutable/chunks/index.QdjIMNDW.js","_app/immutable/chunks/events.tHoz6_OQ.js","_app/immutable/chunks/index.KR-R4Bb-.js","_app/immutable/chunks/Icon.q2bkpGCn.js"];
export const stylesheets = ["_app/immutable/assets/index.60knD0-d.css"];
export const fonts = [];
