import * as server from '../entries/pages/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.BSG1Wdhk.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/each.IEvShl-d.js","_app/immutable/chunks/index.zCkZVI4I.js","_app/immutable/chunks/entry.CFKdJtq4.js","_app/immutable/chunks/index.BOZ2xkje.js"];
export const stylesheets = ["_app/immutable/assets/7.BkHe6qoI.css"];
export const fonts = [];
