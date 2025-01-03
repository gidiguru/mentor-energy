import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen flex flex-col"><h2 class="h2 text-center mb-6" data-svelte-h="svelte-biowzr">Sign In to Your Account</h2> <main class="flex-1">${slots.default ? slots.default({}) : ``}</main></div>`;
});
export {
  Layout as default
};
