import * as server from '../entries/pages/private/_layout.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/private/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/private/+layout.server.ts";
export const imports = ["_app/immutable/nodes/5.C511yos5.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/stores.DsWyTlkS.js","_app/immutable/chunks/entry.cv0Uih6x.js","_app/immutable/chunks/index.BOZ2xkje.js","_app/immutable/chunks/index.zCkZVI4I.js"];
export const stylesheets = ["_app/immutable/assets/5.D8rPqgA6.css"];
export const fonts = [];
