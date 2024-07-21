import * as server from '../entries/pages/admin/products/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.9jOXw8dX.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js","_app/immutable/chunks/each.BMxcx5xk.js","_app/immutable/chunks/index.7C7vluqN.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RfzFhoBI.js","_app/immutable/chunks/index.CERCl9-T.js","_app/immutable/chunks/table-row.0eKQW74D.js","_app/immutable/chunks/index.1BCc6Lj8.js","_app/immutable/chunks/index.2rwJa9hN.js","_app/immutable/chunks/events.rmj-ypxD.js","_app/immutable/chunks/index.9YwipT-g.js","_app/immutable/chunks/label.5G1amjmf.js","_app/immutable/chunks/Icon.KQdkk_Pl.js","_app/immutable/chunks/alert-title.02Aujutz.js","_app/immutable/chunks/trash.Na_pMOp-.js","_app/immutable/chunks/pen-square.gJ3x8CAZ.js"];
export const stylesheets = [];
export const fonts = [];
