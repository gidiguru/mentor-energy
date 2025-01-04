

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/dashboard/learning/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/20.CKwA88hp.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/each.CEP1wcp-.js","_app/immutable/chunks/index.GshdcV3z.js"];
export const stylesheets = ["_app/immutable/assets/13.ApciN1GP.css"];
export const fonts = [];
