import * as universal from '../entries/pages/legal/_page.ts.js';

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/legal/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/legal/+page.ts";
export const imports = ["_app/immutable/nodes/25.Bsl-cURP.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js","_app/immutable/chunks/entry.0fr2dFsL.js","_app/immutable/chunks/index.Cgh1KLMs.js"];
export const stylesheets = [];
export const fonts = [];
