import * as server from '../entries/pages/supabase-test/_page.server.ts.js';

export const index = 37;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/supabase-test/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/supabase-test/+page.server.ts";
export const imports = ["_app/immutable/nodes/37.ALZemiBs.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/each.E3KfYJXG.js","_app/immutable/chunks/index.BFhDyFNX.js"];
export const stylesheets = [];
export const fonts = [];
