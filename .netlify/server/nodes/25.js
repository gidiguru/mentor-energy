

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/pricing/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/25.CvY5doaY.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js"];
export const stylesheets = [];
export const fonts = [];
