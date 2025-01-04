import * as server from '../entries/pages/dashboard/_page.server.ts.js';

export const index = 19;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/19.B_EhGX5M.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js"];
export const stylesheets = ["_app/immutable/assets/19.C0es91vZ.css"];
export const fonts = [];
