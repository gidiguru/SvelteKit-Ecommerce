import * as server from '../entries/pages/admin/products/_productId_/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_productId_/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/[productId]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.mG3Aof4G.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js","_app/immutable/chunks/entry.ZuPgesb1.js","_app/immutable/chunks/index.CERCl9-T.js","_app/immutable/chunks/index.Oto-ehUL.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RfzFhoBI.js","_app/immutable/chunks/events.rmj-ypxD.js","_app/immutable/chunks/Icon.KQdkk_Pl.js","_app/immutable/chunks/each.BMxcx5xk.js"];
export const stylesheets = [];
export const fonts = [];
