import * as server from '../entries/pages/dashboard/_page.server.ts.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/17.I09zg-mb.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/entry.C2qMhEbX.js","_app/immutable/chunks/index.BOZ2xkje.js"];
export const stylesheets = ["_app/immutable/assets/17.DK8RLof7.css"];
export const fonts = [];
