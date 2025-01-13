import * as server from '../entries/pages/dashboard/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.BEz36UmO.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js","_app/immutable/chunks/each.E3KfYJXG.js","_app/immutable/chunks/entry.0fr2dFsL.js","_app/immutable/chunks/index.Cgh1KLMs.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.reQF_sGg.js","_app/immutable/chunks/index.YrG0tabY.js"];
export const stylesheets = ["_app/immutable/assets/3.asYRW-2W.css","_app/immutable/assets/ProgressBar.c6i8ireL.css"];
export const fonts = [];
