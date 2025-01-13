

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/become-mentor/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/16.Bn-WaWxl.js","_app/immutable/chunks/scheduler.U2msqvy9.js","_app/immutable/chunks/index.BFhDyFNX.js"];
export const stylesheets = [];
export const fonts = [];
