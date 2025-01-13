import * as server from '../entries/pages/private/_page.server.ts.js';

export const index = 33;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/private/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/private/+page.server.ts";
export const imports = ["_app/immutable/nodes/33.YRRNm10u.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/each.E3KfYJXG.js","_app/immutable/chunks/index.BFhDyFNX.js","_app/immutable/chunks/entry.0fr2dFsL.js","_app/immutable/chunks/index.Cgh1KLMs.js"];
export const stylesheets = [];
export const fonts = [];
