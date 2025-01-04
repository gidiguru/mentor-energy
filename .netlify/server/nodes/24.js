import * as universal from '../entries/pages/legal/_page.ts.js';

export const index = 24;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/legal/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/legal/+page.ts";
export const imports = ["_app/immutable/nodes/24.CXnrlQiR.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/entry.gI6Wngmu.js","_app/immutable/chunks/index.DanwDDwR.js"];
export const stylesheets = [];
export const fonts = [];
