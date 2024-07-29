import * as server from '../entries/pages/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.0bbwZUOZ.js","_app/immutable/chunks/scheduler.wvXfHD85.js","_app/immutable/chunks/index.g90p2mwt.js","_app/immutable/chunks/each.5xwV0ohN.js","_app/immutable/chunks/techshopng-logo.po2uv8wO.js","_app/immutable/chunks/CldImage.61Rz0iPn.js","_app/immutable/chunks/spread.rEx3vLA9.js","_app/immutable/chunks/getCldImageUrl.DuPXM9E8.js","_app/immutable/chunks/Icon.od-fKyEU.js"];
export const stylesheets = ["_app/immutable/assets/5.5O5XnfkA.css"];
export const fonts = [];
