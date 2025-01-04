

export const index = 30;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mentors/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/30.CXLXsYt1.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js","_app/immutable/chunks/each.CEP1wcp-.js"];
export const stylesheets = ["_app/immutable/assets/13.ApciN1GP.css"];
export const fonts = [];
