import * as server from '../entries/pages/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.DWW7qHqi.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js","_app/immutable/chunks/each.E3KfYJXG.js","_app/immutable/chunks/index.YrG0tabY.js","_app/immutable/chunks/entry.0fr2dFsL.js","_app/immutable/chunks/index.Cgh1KLMs.js"];
export const stylesheets = ["_app/immutable/assets/9.BkHe6qoI.css"];
export const fonts = [];
