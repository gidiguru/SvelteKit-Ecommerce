import * as server from '../entries/pages/admin/products/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.U_Ue4JLP.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js","_app/immutable/chunks/each.5xwV0ohN.js","_app/immutable/chunks/index.nuGukHMn.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RHvsTm_P.js","_app/immutable/chunks/index.dWiL86bg.js","_app/immutable/chunks/table-row.rw0unKVa.js","_app/immutable/chunks/index.bCDbfe7B.js","_app/immutable/chunks/index.mfP5Fu4K.js","_app/immutable/chunks/events.0ltW6YKX.js","_app/immutable/chunks/index.CgobIz6p.js","_app/immutable/chunks/label.3r9qlpP8.js","_app/immutable/chunks/Icon.od-fKyEU.js","_app/immutable/chunks/alert-title.YC6tlhc5.js","_app/immutable/chunks/trash.Uc1QENtX.js","_app/immutable/chunks/pen-square.FM8eyphE.js"];
export const stylesheets = [];
export const fonts = [];
