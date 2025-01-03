import * as server from '../entries/pages/profile/_layout.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/profile/+layout.server.ts";
export const imports = ["_app/immutable/nodes/6._1EAAZjG.js","_app/immutable/chunks/6.DsA0FpBg.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js"];
export const stylesheets = [];
export const fonts = [];
