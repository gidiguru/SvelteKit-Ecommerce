import * as server from '../entries/pages/admin/orders/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/orders/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/orders/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.S3tQJTgF.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js","_app/immutable/chunks/each.BMxcx5xk.js","_app/immutable/chunks/forms.mpqiNeKk.js","_app/immutable/chunks/entry.ZuPgesb1.js","_app/immutable/chunks/index.CERCl9-T.js","_app/immutable/chunks/index.7C7vluqN.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RfzFhoBI.js","_app/immutable/chunks/table-row.0eKQW74D.js","_app/immutable/chunks/table-header.26-UEYrC.js","_app/immutable/chunks/index.AZrcI-K7.js","_app/immutable/chunks/events.rmj-ypxD.js","_app/immutable/chunks/index.cOM4vecV.js","_app/immutable/chunks/Icon.KQdkk_Pl.js"];
export const stylesheets = ["_app/immutable/assets/index.60knD0-d.css"];
export const fonts = [];
