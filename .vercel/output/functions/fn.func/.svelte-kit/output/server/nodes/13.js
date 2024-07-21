import * as server from '../entries/pages/admin/products/_productId_/basics/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_productId_/basics/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/[productId]/basics/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.PRIItM1_.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js","_app/immutable/chunks/forms.mpqiNeKk.js","_app/immutable/chunks/entry.ZuPgesb1.js","_app/immutable/chunks/index.CERCl9-T.js","_app/immutable/chunks/label.5G1amjmf.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RfzFhoBI.js","_app/immutable/chunks/events.rmj-ypxD.js","_app/immutable/chunks/textarea.uf-5MXZV.js","_app/immutable/chunks/index.7C7vluqN.js","_app/immutable/chunks/index.1BCc6Lj8.js","_app/immutable/chunks/index.9YwipT-g.js","_app/immutable/chunks/alert-title.02Aujutz.js","_app/immutable/chunks/Icon.KQdkk_Pl.js","_app/immutable/chunks/each.BMxcx5xk.js"];
export const stylesheets = [];
export const fonts = [];
