import * as server from '../entries/pages/private/_page.server.ts.js';

export const index = 26;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/private/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/private/+page.server.ts";
export const imports = ["_app/immutable/nodes/26.JXBtktIv.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/each.IEvShl-d.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/entry.cv0Uih6x.js","_app/immutable/chunks/index.BOZ2xkje.js"];
export const stylesheets = [];
export const fonts = [];
