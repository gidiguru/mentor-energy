import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="flex-1 p-4 overflow-auto">${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};
