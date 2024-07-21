import * as server from '../entries/pages/products/_productId_/_page.server.ts.js';

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/products/_productId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/products/[productId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/21.jqmv-pWs.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js","_app/immutable/chunks/CldOgImage.AapG6G-L.js","_app/immutable/chunks/CldImage.vNrjymSR.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/each.BMxcx5xk.js","_app/immutable/chunks/index.7C7vluqN.js","_app/immutable/chunks/utils.RfzFhoBI.js","_app/immutable/chunks/index.CERCl9-T.js","_app/immutable/chunks/cart.cmASA_hh.js"];
export const stylesheets = ["_app/immutable/assets/21.k8N6-39U.css"];
export const fonts = [];
