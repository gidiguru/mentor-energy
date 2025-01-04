import * as server from '../entries/pages/dashboard/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.9AJMvSKY.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/each.CEP1wcp-.js","_app/immutable/chunks/entry.gI6Wngmu.js","_app/immutable/chunks/index.DanwDDwR.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.CCeLm8H2.js","_app/immutable/chunks/index.DFeveyjr.js"];
export const stylesheets = ["_app/immutable/assets/3.DUuB39r-.css","_app/immutable/assets/ProgressBar.c6i8ireL.css"];
export const fonts = [];
