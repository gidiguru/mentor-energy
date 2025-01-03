import * as server from '../entries/pages/auth/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.C01NY5w-.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js","_app/immutable/chunks/entry.CFKdJtq4.js","_app/immutable/chunks/index.BOZ2xkje.js","_app/immutable/chunks/LinkedInIcon.D6fvDWNe.js","_app/immutable/chunks/stores.vGeInHSN.js"];
export const stylesheets = [];
export const fonts = [];
