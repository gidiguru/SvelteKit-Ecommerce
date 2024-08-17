import * as server from '../entries/pages/admin/products/new/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/new/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/new/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.BX0gJbsh.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/forms.v_Dxtd-J.js","_app/immutable/chunks/entry.-X8jaEPo.js","_app/immutable/chunks/index.3tSfWZJ4.js","_app/immutable/chunks/input.p0W_-8Fv.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.PlMnM1hz.js","_app/immutable/chunks/label.-bVuneSm.js","_app/immutable/chunks/events.tHoz6_OQ.js","_app/immutable/chunks/textarea.sN8sVFgx.js","_app/immutable/chunks/index.3NDdlAmi.js"];
export const stylesheets = [];
export const fonts = [];
