

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.Bn-WaWxl.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js"];
export const stylesheets = [];
export const fonts = [];
