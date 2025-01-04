

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/learning/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CgJj6kka.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js"];
export const stylesheets = [];
export const fonts = [];
