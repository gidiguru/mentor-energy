import * as server from '../entries/pages/dashboard/learning/modules/_moduleId_/_page.server.ts.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/learning/modules/_moduleId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/dashboard/learning/modules/[moduleId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/22.xcn4Ajb7.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js","_app/immutable/chunks/entry.0fr2dFsL.js","_app/immutable/chunks/index.Cgh1KLMs.js"];
export const stylesheets = ["_app/immutable/assets/19.C0es91vZ.css"];
export const fonts = [];
