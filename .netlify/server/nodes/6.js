import * as universal from '../entries/pages/legal/_layout.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/legal/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/legal/+layout.ts";
export const imports = ["_app/immutable/nodes/6.B14IUwJc.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/each.CEP1wcp-.js","_app/immutable/chunks/index.DanwDDwR.js"];
export const stylesheets = [];
export const fonts = [];
