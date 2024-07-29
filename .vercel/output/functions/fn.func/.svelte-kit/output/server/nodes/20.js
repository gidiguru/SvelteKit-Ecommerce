import * as server from '../entries/pages/products/_page.server.ts.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/products/+page.server.ts";
export const imports = ["_app/immutable/nodes/20.ljJHnbV1.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js","_app/immutable/chunks/each.5xwV0ohN.js","_app/immutable/chunks/entry.Czeeh5lQ.js","_app/immutable/chunks/index.dWiL86bg.js","_app/immutable/chunks/CldImage.61Rz0iPn.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/getCldImageUrl.DuPXM9E8.js","_app/immutable/chunks/index.nuGukHMn.js","_app/immutable/chunks/utils.RHvsTm_P.js","_app/immutable/chunks/cart.ZgnymEzl.js","_app/immutable/chunks/index.bCDbfe7B.js","_app/immutable/chunks/index.RcfqlyiP.js","_app/immutable/chunks/Icon.od-fKyEU.js","_app/immutable/chunks/stores.hMZXNVST.js","_app/immutable/chunks/index.-xDqt56M.js","_app/immutable/chunks/events.0ltW6YKX.js","_app/immutable/nodes/21.ObOdw4dz.js","_app/immutable/chunks/globals.0cDDIVm6.js","_app/immutable/chunks/index.CgobIz6p.js"];
export const stylesheets = ["_app/immutable/assets/20.uugKvIxd.css","_app/immutable/assets/index.60knD0-d.css","_app/immutable/assets/21.k8N6-39U.css"];
export const fonts = [];
