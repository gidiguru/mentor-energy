import { c as create_ssr_component, s as subscribe, a as each, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index2.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentPath, $$unsubscribe_currentPath;
  const currentPath = writable("");
  $$unsubscribe_currentPath = subscribe(currentPath, (value) => $currentPath = value);
  const navItems = [
    {
      path: "/legal/privacy",
      label: "Privacy Policy"
    },
    {
      path: "/legal/terms",
      label: "Terms of Service"
    },
    {
      path: "/legal/cookies",
      label: "Cookie Policy"
    }
  ];
  $$unsubscribe_currentPath();
  return `<div class="container mx-auto px-4 py-8"><div class="flex flex-col sm:flex-row gap-8"><aside class="w-full sm:w-64 space-y-2">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.path, 0)} class="${"btn w-full " + escape(
      $currentPath === item.path ? "variant-filled-primary" : "variant-ghost",
      true
    )}">${escape(item.label)} </a>`;
  })}</aside> <main class="flex-1">${slots.default ? slots.default({}) : ``}</main></div></div>`;
});
export {
  Layout as default
};
