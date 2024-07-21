import * as server from '../entries/pages/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.5V-pLPJA.js","_app/immutable/chunks/scheduler.I4M8gLU-.js","_app/immutable/chunks/index.87xRCZ45.js","_app/immutable/chunks/each.BMxcx5xk.js","_app/immutable/chunks/CldImage.vNrjymSR.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/Icon.KQdkk_Pl.js"];
export const stylesheets = ["_app/immutable/assets/5.5O5XnfkA.css"];
export const fonts = [];
