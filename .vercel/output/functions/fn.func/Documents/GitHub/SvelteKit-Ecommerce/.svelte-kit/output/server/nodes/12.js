import * as server from '../entries/pages/admin/products/new-old/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/new-old/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/new-old/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.fdLPNOOo.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/each.-_FoTsOa.js","_app/immutable/chunks/forms.CgtWCEx0.js","_app/immutable/chunks/entry.M627rufR.js","_app/immutable/chunks/index.3tSfWZJ4.js","_app/immutable/chunks/CldImage.lt91u4k9.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/getCldImageUrl.b_Vz0iCf.js","_app/immutable/chunks/analytics.81QmT11y.js","_app/immutable/chunks/CldUploadButton.avESbS1a.js","_app/immutable/chunks/input.p0W_-8Fv.js","_app/immutable/chunks/utils.PlMnM1hz.js","_app/immutable/chunks/label.-bVuneSm.js","_app/immutable/chunks/events.tHoz6_OQ.js","_app/immutable/chunks/textarea.sN8sVFgx.js","_app/immutable/chunks/index.3NDdlAmi.js"];
export const stylesheets = [];
export const fonts = [];
