import * as universal from '../entries/pages/dashboard/learning/modules/_moduleId_/_layout.ts.js';
import * as server from '../entries/pages/dashboard/learning/modules/_moduleId_/_layout.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/learning/modules/_moduleId_/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/dashboard/learning/modules/[moduleId]/+layout.ts";
export { server };
export const server_id = "src/routes/dashboard/learning/modules/[moduleId]/+layout.server.ts";
export const imports = ["_app/immutable/nodes/5.CdPjV9ZM.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js"];
export const stylesheets = [];
export const fonts = [];
