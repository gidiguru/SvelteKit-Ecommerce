import * as server from '../entries/pages/admin/products/new-old/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/products/new-old/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/products/new-old/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.TjG2cLPQ.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js","_app/immutable/chunks/each.BMxcx5xk.js","_app/immutable/chunks/forms.mpqiNeKk.js","_app/immutable/chunks/entry.ZuPgesb1.js","_app/immutable/chunks/index.CERCl9-T.js","_app/immutable/chunks/CldImage.vNrjymSR.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/CldUploadButton.ZqF6s6OU.js","_app/immutable/chunks/label.5G1amjmf.js","_app/immutable/chunks/utils.RfzFhoBI.js","_app/immutable/chunks/events.rmj-ypxD.js","_app/immutable/chunks/textarea.uf-5MXZV.js","_app/immutable/chunks/index.7C7vluqN.js"];
export const stylesheets = [];
export const fonts = [];
