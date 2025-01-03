import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DT-Xyzmw.js","_app/immutable/chunks/0.gv1db5Pq.js","_app/immutable/chunks/preload-helper.C1FmrZbK.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/index.BOZ2xkje.js","_app/immutable/chunks/each.IEvShl-d.js","_app/immutable/chunks/index.zCkZVI4I.js","_app/immutable/chunks/entry.cv0Uih6x.js","_app/immutable/chunks/stores.DsWyTlkS.js"];
export const stylesheets = ["_app/immutable/assets/0.CrrKbyIb.css"];
export const fonts = [];
