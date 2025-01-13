import { c as create_ssr_component, s as subscribe, a as each, e as escape } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { w as writable } from "../../../chunks/index2.js";
import "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const css = {
  code: ".app-bar{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\n}.btn.svelte-1h0cnll.svelte-1h0cnll{padding:0.75rem;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms\n}nav.svelte-1h0cnll button.svelte-1h0cnll{border-radius:0px;border-bottom-width:1px;border-color:rgb(var(--color-surface-500) / 0.3)\n}nav.svelte-1h0cnll button.svelte-1h0cnll:first-child{border-top-left-radius:0.5rem;border-top-right-radius:0.5rem\n}nav.svelte-1h0cnll button.svelte-1h0cnll:last-child{border-bottom-right-radius:0.5rem;border-bottom-left-radius:0.5rem;border-style:none\n}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nimport { goto } from \\"$app/navigation\\";\\nimport { AppBar } from \\"@skeletonlabs/skeleton\\";\\nimport { onMount } from \\"svelte\\";\\nimport { writable } from \\"svelte/store\\";\\nimport { slide } from \\"svelte/transition\\";\\nimport { clickOutside } from \\"$lib/actions/clickOutside\\";\\nexport let data;\\nlet { supabase, session, user, profile } = data;\\nconst currentPath = writable(\\"\\");\\nlet isNavOpen = false;\\nlet isMobile = false;\\nlet expandedItem = null;\\nlet mobileNavRef;\\nconst navItems = [\\n  { path: \\"/dashboard\\", label: \\"Overview\\", icon: \\"\\\\u{1F3E0}\\" },\\n  {\\n    path: \\"/dashboard/learning\\",\\n    label: \\"Learning\\",\\n    icon: \\"\\\\u{1F4DA}\\",\\n    hasSubItems: true,\\n    subItems: [\\n      { path: \\"/dashboard/learning/modules\\", label: \\"Modules\\", icon: \\"\\\\u{1F4D6}\\" },\\n      { path: \\"/dashboard/learning/virtual-labs\\", label: \\"Virtual Labs\\", icon: \\"\\\\u{1F52C}\\" },\\n      { path: \\"/dashboard/learning/field-trips\\", label: \\"Field Trips\\", icon: \\"\\\\u{1F30D}\\" }\\n    ]\\n  },\\n  { path: \\"/dashboard/mentorship\\", label: \\"Mentorship\\", icon: \\"\\\\u{1F465}\\" },\\n  {\\n    path: \\"/dashboard/community\\",\\n    label: \\"Community\\",\\n    icon: \\"\\\\u{1F4AC}\\",\\n    hasSubItems: true,\\n    subItems: [\\n      { path: \\"/dashboard/community/chat\\", label: \\"Chat Room\\", icon: \\"\\\\u{1F4AD}\\" },\\n      { path: \\"/dashboard/community/challenges\\", label: \\"Challenges\\", icon: \\"\\\\u{1F3AE}\\" }\\n    ]\\n  },\\n  { path: \\"/dashboard/projects\\", label: \\"Projects\\", icon: \\"\\\\u{1F4CB}\\" },\\n  { path: \\"/dashboard/certifications\\", label: \\"Certificates\\", icon: \\"\\\\u{1F3C6}\\" },\\n  { path: \\"/dashboard/settings\\", label: \\"Settings\\", icon: \\"\\\\u2699\\\\uFE0F\\" }\\n];\\nonMount(() => {\\n  currentPath.set(window.location.pathname);\\n  checkMobile();\\n  window.addEventListener(\\"resize\\", checkMobile);\\n  const observer = new MutationObserver(() => {\\n    currentPath.set(window.location.pathname);\\n  });\\n  observer.observe(document.documentElement, {\\n    subtree: true,\\n    childList: true\\n  });\\n  return () => {\\n    observer.disconnect();\\n    window.removeEventListener(\\"resize\\", checkMobile);\\n  };\\n});\\nfunction checkMobile() {\\n  isMobile = window.innerWidth < 768;\\n  if (!isMobile) isNavOpen = false;\\n}\\nfunction toggleNav() {\\n  isNavOpen = !isNavOpen;\\n}\\nfunction toggleSubMenu(path) {\\n  expandedItem = expandedItem === path ? null : path;\\n}\\nfunction handleNavClick(path) {\\n  goto(path);\\n  isNavOpen = false;\\n}\\nasync function handleSignOut() {\\n  const { error } = await supabase.auth.signOut();\\n  if (!error) {\\n    goto(\\"/\\");\\n  }\\n}\\nfunction handleClickOutside(event) {\\n  isNavOpen = false;\\n}\\n<\/script>\\r\\n\\r\\n<div class=\\"h-screen flex flex-col md:flex-row\\">\\r\\n    <!-- Desktop Sidebar -->\\r\\n    {#if !isMobile}\\r\\n        <aside class=\\"w-64 bg-surface-100-800-token border-r border-surface-500/30 p-4 h-full overflow-y-auto\\">\\r\\n            <div class=\\"flex flex-col gap-2 h-full\\">\\r\\n                {#each navItems as item}\\r\\n                    <div class=\\"w-full\\">\\r\\n                        <button \\r\\n                            class=\\"btn w-full {$currentPath === item.path ? 'variant-filled-primary' : 'variant-ghost'} justify-start\\"\\r\\n                            on:click={() => item.hasSubItems ? toggleSubMenu(item.path) : handleNavClick(item.path)}\\r\\n                        >\\r\\n                            <span class=\\"flex items-center gap-3\\">\\r\\n                                <span class=\\"text-xl\\">{item.icon}</span>\\r\\n                                <span>{item.label}</span>\\r\\n                                {#if item.hasSubItems}\\r\\n                                    <span class=\\"ml-auto\\">{expandedItem === item.path ? '▼' : '▶'}</span>\\r\\n                                {/if}\\r\\n                            </span>\\r\\n                        </button>\\r\\n \\r\\n                        {#if item.hasSubItems && expandedItem === item.path}\\r\\n                            <div class=\\"bg-surface-200-700-token rounded-b-lg\\" transition:slide>\\r\\n                                {#each item.subItems as subItem}\\r\\n                                    <button \\r\\n                                        class=\\"btn w-full pl-8 {$currentPath === subItem.path ? 'variant-filled-primary' : 'variant-ghost'}\\"\\r\\n                                        on:click={() => handleNavClick(subItem.path)}\\r\\n                                    >\\r\\n                                        <span class=\\"flex items-center gap-3\\">\\r\\n                                            <span class=\\"text-xl\\">{subItem.icon}</span>\\r\\n                                            <span>{subItem.label}</span>\\r\\n                                        </span>\\r\\n                                    </button>\\r\\n                                {/each}\\r\\n                            </div>\\r\\n                        {/if}\\r\\n                    </div>\\r\\n                {/each}\\r\\n                \\r\\n                <button \\r\\n                    class=\\"btn variant-ghost-error mt-auto\\"\\r\\n                    on:click={handleSignOut}\\r\\n                >\\r\\n                    <span class=\\"flex items-center gap-3\\">\\r\\n                        <span class=\\"text-xl\\">🚪</span>\\r\\n                        <span>Sign Out</span>\\r\\n                    </span>\\r\\n                </button>\\r\\n            </div>\\r\\n        </aside>\\r\\n    {/if}\\r\\n \\r\\n    <!-- Main Content Area -->\\r\\n    <div class=\\"flex-1 flex flex-col\\">\\r\\n        <!-- Mobile Header -->\\r\\n        {#if isMobile}\\r\\n            <header class=\\"bg-surface-100-800-token border-b border-surface-500/30 p-4 sticky top-0 z-50\\">\\r\\n                <button \\r\\n                    class=\\"btn variant-filled-primary w-full flex items-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all\\"\\r\\n                    on:click={toggleNav}\\r\\n                >\\r\\n                    <span class=\\"text-2xl\\">📱</span>\\r\\n                    <span>Menu</span>\\r\\n                    <span class=\\"ml-auto text-xl\\">{isNavOpen ? '▼' : '▶'}</span>\\r\\n                </button>\\r\\n \\r\\n                {#if isNavOpen}\\r\\n                    <nav \\r\\n                    role=\\"dialog\\"\\r\\n                    aria-modal=\\"true\\"\\r\\n                    bind:this={mobileNavRef}\\r\\n                    use:clickOutside\\r\\n                    on:clickOutside={handleClickOutside}  \\r\\n                    class=\\"fixed inset-x-4 mt-3 bg-surface-50-900-token rounded-xl shadow-2xl border-2 border-primary-500 max-h-[80vh] overflow-y-auto\\"\\r\\n                        transition:slide={{duration: 200}}\\r\\n                    >\\r\\n                        {#each navItems as item}\\r\\n                            <div class=\\"w-full\\">\\r\\n                                <button \\r\\n                                    class=\\"btn w-full text-lg {$currentPath === item.path ? 'variant-filled-primary' : 'variant-ghost hover:variant-soft-primary'}\\"\\r\\n                                    on:click={() => item.hasSubItems ? toggleSubMenu(item.path) : handleNavClick(item.path)}\\r\\n                                >\\r\\n                                    <span class=\\"flex items-center gap-4 py-1\\">\\r\\n                                        <span class=\\"text-2xl\\">{item.icon}</span>\\r\\n                                        <span>{item.label}</span>\\r\\n                                        {#if item.hasSubItems}\\r\\n                                            <span class=\\"ml-auto\\">{expandedItem === item.path ? '▼' : '▶'}</span>\\r\\n                                        {/if}\\r\\n                                    </span>\\r\\n                                </button>\\r\\n \\r\\n                                {#if item.hasSubItems && expandedItem === item.path}\\r\\n                                    <div class=\\"bg-surface-200-700-token\\" transition:slide>\\r\\n                                        {#each item.subItems as subItem}\\r\\n                                            <button \\r\\n                                                class=\\"btn w-full text-lg pl-12 {$currentPath === subItem.path ? 'variant-filled-primary' : 'variant-ghost hover:variant-soft-primary'}\\"\\r\\n                                                on:click={() => handleNavClick(subItem.path)}\\r\\n                                            >\\r\\n                                                <span class=\\"flex items-center gap-4 py-1\\">\\r\\n                                                    <span class=\\"text-xl\\">{subItem.icon}</span>\\r\\n                                                    <span>{subItem.label}</span>\\r\\n                                                </span>\\r\\n                                            </button>\\r\\n                                        {/each}\\r\\n                                    </div>\\r\\n                                {/if}\\r\\n                            </div>\\r\\n                        {/each}\\r\\n                        \\r\\n                        <button \\r\\n                            class=\\"btn w-full text-lg variant-ghost-error hover:variant-filled-error\\"\\r\\n                            on:click={handleSignOut}\\r\\n                        >\\r\\n                            <span class=\\"flex items-center gap-4 py-1\\">\\r\\n                                <span class=\\"text-2xl\\">🚪</span>\\r\\n                                <span>Sign Out</span>\\r\\n                            </span>\\r\\n                        </button>\\r\\n                    </nav>\\r\\n                {/if}\\r\\n            </header>\\r\\n        {/if}\\r\\n \\r\\n        <!-- Page Content -->\\r\\n        <main class=\\"flex-1 p-4 overflow-auto\\">\\r\\n            <slot />\\r\\n        </main>\\r\\n    </div>\\r\\n</div>\\r\\n \\r\\n<style lang=\\"postcss\\">\\r\\n    :global(.app-bar) {\\r\\n    \\r\\n    --tw-shadow: 0 0 #0000;\\r\\n    \\r\\n    --tw-shadow-colored: 0 0 #0000;\\r\\n    \\r\\n    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)\\n}\\r\\n    \\r\\n    .btn {\\r\\n    \\r\\n    padding: 0.75rem;\\r\\n    \\r\\n    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\\r\\n    \\r\\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\r\\n    \\r\\n    transition-duration: 200ms\\n}\\r\\n \\r\\n    nav button {\\r\\n    \\r\\n    border-radius: 0px;\\r\\n    \\r\\n    border-bottom-width: 1px;\\r\\n    \\r\\n    border-color: rgb(var(--color-surface-500) / 0.3)\\n}\\r\\n \\r\\n    nav button:first-child {\\r\\n    \\r\\n    border-top-left-radius: 0.5rem;\\r\\n    \\r\\n    border-top-right-radius: 0.5rem\\n}\\r\\n \\r\\n    nav button:last-child {\\r\\n    \\r\\n    border-bottom-right-radius: 0.5rem;\\r\\n    \\r\\n    border-bottom-left-radius: 0.5rem;\\r\\n    \\r\\n    border-style: none\\n}\\r\\n</style>"],"names":[],"mappings":"AAqNY,QAAU,CAElB,WAAW,CAAE,SAAS,CAEtB,mBAAmB,CAAE,SAAS,CAE9B,UAAU,CAAE,IAAI,uBAAuB,CAAC,UAAU,CAAC,CAAC,CAAC,IAAI,gBAAgB,CAAC,UAAU,CAAC,CAAC,CAAC,IAAI,WAAW;AAC1G,CAEI,kCAAK,CAEL,OAAO,CAAE,OAAO,CAEhB,mBAAmB,CAAE,KAAK,CAAC,CAAC,gBAAgB,CAAC,CAAC,YAAY,CAAC,CAAC,qBAAqB,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,CAE/F,0BAA0B,CAAE,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAExD,mBAAmB,CAAE;AACzB,CAEI,kBAAG,CAAC,qBAAO,CAEX,aAAa,CAAE,GAAG,CAElB,mBAAmB,CAAE,GAAG,CAExB,YAAY,CAAE,IAAI,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,GAAG;AACpD,CAEI,kBAAG,CAAC,qBAAM,YAAa,CAEvB,sBAAsB,CAAE,MAAM,CAE9B,uBAAuB,CAAE;AAC7B,CAEI,kBAAG,CAAC,qBAAM,WAAY,CAEtB,0BAA0B,CAAE,MAAM,CAElC,yBAAyB,CAAE,MAAM,CAEjC,YAAY,CAAE;AAClB"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentPath, $$unsubscribe_currentPath;
  let { data } = $$props;
  const currentPath = writable("");
  $$unsubscribe_currentPath = subscribe(currentPath, (value) => $currentPath = value);
  let expandedItem = null;
  const navItems = [
    {
      path: "/dashboard",
      label: "Overview",
      icon: "🏠"
    },
    {
      path: "/dashboard/learning",
      label: "Learning",
      icon: "📚",
      hasSubItems: true,
      subItems: [
        {
          path: "/dashboard/learning/modules",
          label: "Modules",
          icon: "📖"
        },
        {
          path: "/dashboard/learning/virtual-labs",
          label: "Virtual Labs",
          icon: "🔬"
        },
        {
          path: "/dashboard/learning/field-trips",
          label: "Field Trips",
          icon: "🌍"
        }
      ]
    },
    {
      path: "/dashboard/mentorship",
      label: "Mentorship",
      icon: "👥"
    },
    {
      path: "/dashboard/community",
      label: "Community",
      icon: "💬",
      hasSubItems: true,
      subItems: [
        {
          path: "/dashboard/community/chat",
          label: "Chat Room",
          icon: "💭"
        },
        {
          path: "/dashboard/community/challenges",
          label: "Challenges",
          icon: "🎮"
        }
      ]
    },
    {
      path: "/dashboard/projects",
      label: "Projects",
      icon: "📋"
    },
    {
      path: "/dashboard/certifications",
      label: "Certificates",
      icon: "🏆"
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: "⚙️"
    }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_currentPath();
  return `<div class="h-screen flex flex-col md:flex-row"> ${`<aside class="w-64 bg-surface-100-800-token border-r border-surface-500/30 p-4 h-full overflow-y-auto"><div class="flex flex-col gap-2 h-full">${each(navItems, (item) => {
    return `<div class="w-full"><button class="${"btn w-full " + escape(
      $currentPath === item.path ? "variant-filled-primary" : "variant-ghost",
      true
    ) + " justify-start svelte-1h0cnll"}"><span class="flex items-center gap-3"><span class="text-xl">${escape(item.icon)}</span> <span>${escape(item.label)}</span> ${item.hasSubItems ? `<span class="ml-auto">${escape(expandedItem === item.path ? "▼" : "▶")}</span>` : ``} </span></button> ${item.hasSubItems && expandedItem === item.path ? `<div class="bg-surface-200-700-token rounded-b-lg">${each(item.subItems, (subItem) => {
      return `<button class="${"btn w-full pl-8 " + escape(
        $currentPath === subItem.path ? "variant-filled-primary" : "variant-ghost",
        true
      ) + " svelte-1h0cnll"}"><span class="flex items-center gap-3"><span class="text-xl">${escape(subItem.icon)}</span> <span>${escape(subItem.label)}</span></span> </button>`;
    })} </div>` : ``} </div>`;
  })} <button class="btn variant-ghost-error mt-auto svelte-1h0cnll" data-svelte-h="svelte-v7p5xh"><span class="flex items-center gap-3"><span class="text-xl">🚪</span> <span>Sign Out</span></span></button></div></aside>`}  <div class="flex-1 flex flex-col"> ${``}  <main class="flex-1 p-4 overflow-auto">${slots.default ? slots.default({}) : ``}</main></div> </div>`;
});
export {
  Layout as default
};
