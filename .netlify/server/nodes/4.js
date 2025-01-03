import * as universal from '../entries/pages/legal/_layout.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/legal/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/legal/+layout.ts";
export const imports = ["_app/immutable/nodes/4.DlyOObkv.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/each.IEvShl-d.js","_app/immutable/chunks/index.BOZ2xkje.js"];
export const stylesheets = [];
export const fonts = [];
