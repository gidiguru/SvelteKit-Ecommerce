import * as server from '../entries/pages/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.cTqU5wxb.js","_app/immutable/chunks/scheduler.nD82W9v2.js","_app/immutable/chunks/index.yaR_9bqv.js","_app/immutable/chunks/each.-_FoTsOa.js","_app/immutable/chunks/sgs-logo.lT0MrB7V.js","_app/immutable/chunks/CldImage.lt91u4k9.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/getCldImageUrl.b_Vz0iCf.js","_app/immutable/chunks/analytics.81QmT11y.js","_app/immutable/chunks/Icon.q2bkpGCn.js"];
export const stylesheets = ["_app/immutable/assets/5.5O5XnfkA.css"];
export const fonts = [];
