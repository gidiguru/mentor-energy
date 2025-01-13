import * as server from '../entries/pages/auth/reset-password/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/reset-password/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/reset-password/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.B2r58uKe.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js","_app/immutable/chunks/stores.DGvAPBGG.js","_app/immutable/chunks/entry.0fr2dFsL.js","_app/immutable/chunks/index.Cgh1KLMs.js"];
export const stylesheets = ["_app/immutable/assets/15.DJoguNLG.css"];
export const fonts = [];
