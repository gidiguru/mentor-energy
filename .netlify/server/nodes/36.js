import * as server from '../entries/pages/supabase-test/_page.server.ts.js';

export const index = 36;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/supabase-test/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/supabase-test/+page.server.ts";
export const imports = ["_app/immutable/nodes/36.CAusA2gE.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/each.CEP1wcp-.js","_app/immutable/chunks/index.GshdcV3z.js"];
export const stylesheets = [];
export const fonts = [];
