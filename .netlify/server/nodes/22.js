import * as server from '../entries/pages/dashboard/learning/modules/_moduleId_/_page.server.ts.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/learning/modules/_moduleId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/learning/modules/[moduleId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/22.CoLJorkO.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/each.CEP1wcp-.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.CCeLm8H2.js","_app/immutable/chunks/index.DanwDDwR.js"];
export const stylesheets = ["_app/immutable/assets/13.ApciN1GP.css","_app/immutable/assets/ProgressBar.c6i8ireL.css"];
export const fonts = [];
