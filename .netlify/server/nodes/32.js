import * as server from '../entries/pages/private/_page.server.ts.js';

export const index = 32;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/private/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/private/+page.server.ts";
export const imports = ["_app/immutable/nodes/32.OHljTr6b.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/each.CEP1wcp-.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/entry.gI6Wngmu.js","_app/immutable/chunks/index.DanwDDwR.js"];
export const stylesheets = [];
export const fonts = [];
