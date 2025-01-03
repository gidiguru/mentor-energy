import { c as create_ssr_component, a as each, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let countries;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ countries } = data);
  return `<div class="container mx-auto p-4"><h1 class="text-2xl font-bold mb-4" data-svelte-h="svelte-13s7qek">Top 5 Countries</h1> ${countries.length > 0 ? `<ul class="space-y-2">${each(countries, (country) => {
    return `<li class="p-3 bg-surface-100-800-token rounded shadow">${escape(country.name)} </li>`;
  })}</ul>` : `<p class="text-center text-surface-500" data-svelte-h="svelte-7baq9i">No countries found</p>`}</div>`;
});
export {
  Page as default
};
