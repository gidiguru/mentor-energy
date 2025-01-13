import * as server from '../entries/pages/auth/callback/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/callback/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/callback/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.CYttU9WO.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js"];
export const stylesheets = ["_app/immutable/assets/12.D57YaHZ9.css"];
export const fonts = [];
