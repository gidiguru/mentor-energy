import * as server from '../entries/pages/auth/reset-password/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/reset-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/reset-password/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.BlzOUhKL.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/stores.DsWyTlkS.js","_app/immutable/chunks/entry.cv0Uih6x.js","_app/immutable/chunks/index.BOZ2xkje.js"];
export const stylesheets = ["_app/immutable/assets/13.DJoguNLG.css"];
export const fonts = [];
