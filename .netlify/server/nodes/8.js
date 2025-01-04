import * as server from '../entries/pages/profile/_layout.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/profile/+layout.server.ts";
export const imports = ["_app/immutable/nodes/8.tjFBcBel.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js"];
export const stylesheets = [];
export const fonts = [];
