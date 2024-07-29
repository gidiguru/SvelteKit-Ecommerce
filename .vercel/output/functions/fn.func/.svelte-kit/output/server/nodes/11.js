import * as server from '../entries/pages/admin/products/new/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/new/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/new/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.0ipzbLZx.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js","_app/immutable/chunks/forms.EKLRtYMN.js","_app/immutable/chunks/entry.Czeeh5lQ.js","_app/immutable/chunks/index.dWiL86bg.js","_app/immutable/chunks/label.3r9qlpP8.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/utils.RHvsTm_P.js","_app/immutable/chunks/events.0ltW6YKX.js","_app/immutable/chunks/textarea.HvYlK1y9.js","_app/immutable/chunks/index.nuGukHMn.js"];
export const stylesheets = [];
export const fonts = [];
