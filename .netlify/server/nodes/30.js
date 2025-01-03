import * as server from '../entries/pages/supabase-test/_page.server.ts.js';

export const index = 30;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/supabase-test/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/supabase-test/+page.server.ts";
export const imports = ["_app/immutable/nodes/30.DXwT_yHF.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/each.IEvShl-d.js","_app/immutable/chunks/index.DUhc_Oi1.js"];
export const stylesheets = [];
export const fonts = [];
