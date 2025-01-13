import * as universal from '../entries/pages/legal/_layout.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/legal/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/legal/+layout.ts";
export const imports = ["_app/immutable/nodes/6.D44X1IJh.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js","_app/immutable/chunks/each.E3KfYJXG.js","_app/immutable/chunks/index.Cgh1KLMs.js"];
export const stylesheets = [];
export const fonts = [];
