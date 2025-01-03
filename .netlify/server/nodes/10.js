import * as server from '../entries/pages/auth/callback/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/callback/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/callback/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.DMAqEJXT.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js"];
export const stylesheets = ["_app/immutable/assets/10.D57YaHZ9.css"];
export const fonts = [];
