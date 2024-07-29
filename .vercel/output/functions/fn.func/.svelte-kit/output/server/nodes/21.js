import * as server from '../entries/pages/products/_productId_/_page.server.ts.js';

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/products/_productId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/products/[productId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/21.ObOdw4dz.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/each.5xwV0ohN.js","_app/immutable/chunks/index.nuGukHMn.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RHvsTm_P.js","_app/immutable/chunks/index.dWiL86bg.js","_app/immutable/chunks/CldImage.61Rz0iPn.js","_app/immutable/chunks/getCldImageUrl.DuPXM9E8.js","_app/immutable/chunks/cart.ZgnymEzl.js"];
export const stylesheets = ["_app/immutable/assets/21.k8N6-39U.css"];
export const fonts = [];
