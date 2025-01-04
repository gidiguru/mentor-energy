import * as server from '../entries/pages/auth/reset-password/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/reset-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/reset-password/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.DrV-hL5g.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/stores.ZEZdG0RM.js","_app/immutable/chunks/entry.gI6Wngmu.js","_app/immutable/chunks/index.DanwDDwR.js"];
export const stylesheets = ["_app/immutable/assets/15.DJoguNLG.css"];
export const fonts = [];
