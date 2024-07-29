import * as server from '../entries/pages/admin/products/_productId_/sizes/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_productId_/sizes/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/[productId]/sizes/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.Itim7zI4.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js","_app/immutable/chunks/each.5xwV0ohN.js","_app/immutable/chunks/index.nuGukHMn.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RHvsTm_P.js","_app/immutable/chunks/index.dWiL86bg.js","_app/immutable/chunks/table-row.rw0unKVa.js","_app/immutable/chunks/table-header.YyGtBi-S.js","_app/immutable/chunks/index.3R_eKFup.js","_app/immutable/chunks/events.0ltW6YKX.js","_app/immutable/chunks/index.Rl9GRKOs.js","_app/immutable/chunks/x.zN_zz9h5.js","_app/immutable/chunks/Icon.od-fKyEU.js","_app/immutable/chunks/index.CgobIz6p.js","_app/immutable/chunks/label.3r9qlpP8.js","_app/immutable/chunks/forms.EKLRtYMN.js","_app/immutable/chunks/entry.Czeeh5lQ.js","_app/immutable/chunks/pen-square.FM8eyphE.js","_app/immutable/chunks/trash.Uc1QENtX.js"];
export const stylesheets = [];
export const fonts = [];
