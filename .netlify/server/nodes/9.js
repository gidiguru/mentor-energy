import * as server from '../entries/pages/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.Co_7iV91.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/each.CEP1wcp-.js","_app/immutable/chunks/index.DFeveyjr.js","_app/immutable/chunks/entry.gI6Wngmu.js","_app/immutable/chunks/index.DanwDDwR.js"];
export const stylesheets = ["_app/immutable/assets/9.BkHe6qoI.css"];
export const fonts = [];
