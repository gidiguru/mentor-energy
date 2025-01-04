import { c as create_ssr_component, a as each, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
const css = {
  code: ".card.svelte-1j8d17m{border-radius:0.5rem;border-width:1px;border-color:rgb(var(--color-surface-500) / 0.3);--tw-backdrop-blur:blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\n}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">const learningPaths = [\\n  {\\n    title: \\"Learning Modules\\",\\n    path: \\"/dashboard/learning/modules\\",\\n    icon: \\"\\\\u{1F4DA}\\",\\n    description: \\"Structured courses in geology and energy\\",\\n    items: [\\"Petroleum Geology\\", \\"Structural Geology\\", \\"Seismic Interpretation\\"]\\n  },\\n  {\\n    title: \\"Virtual Labs\\",\\n    path: \\"/dashboard/learning/virtual-labs\\",\\n    icon: \\"\\\\u{1F52C}\\",\\n    description: \\"Interactive laboratory simulations\\",\\n    items: [\\"Rock Analysis\\", \\"Well Logging\\", \\"Reservoir Modeling\\"]\\n  },\\n  {\\n    title: \\"Field Trips\\",\\n    path: \\"/dashboard/learning/field-trips\\",\\n    icon: \\"\\\\u{1F30D}\\",\\n    description: \\"Virtual field experiences\\",\\n    items: [\\"Sedimentary Basins\\", \\"Structural Features\\", \\"Production Sites\\"]\\n  }\\n];\\n<\/script>\\r\\n  \\r\\n  <div class=\\"container mx-auto p-4 space-y-8\\">\\r\\n    <header class=\\"space-y-4\\">\\r\\n      <h2 class=\\"h2\\">Learning Center</h2>\\r\\n      <p>Access comprehensive educational resources for your energy sector career.</p>\\r\\n    </header>\\r\\n  \\r\\n    <div class=\\"grid md:grid-cols-2 lg:grid-cols-3 gap-6\\">\\r\\n      {#each learningPaths as path}\\r\\n        <a href={path.path} class=\\"card p-6 hover:bg-primary-500/10 transition-colors\\">\\r\\n          <div class=\\"flex items-center gap-3 mb-4\\">\\r\\n            <span class=\\"text-3xl\\">{path.icon}</span>\\r\\n            <h3 class=\\"h3\\">{path.title}</h3>\\r\\n          </div>\\r\\n          <p class=\\"text-surface-600-300-token mb-4\\">{path.description}</p>\\r\\n          <ul class=\\"list-disc list-inside text-sm space-y-1\\">\\r\\n            {#each path.items as item}\\r\\n              <li>{item}</li>\\r\\n            {/each}\\r\\n          </ul>\\r\\n        </a>\\r\\n      {/each}\\r\\n    </div>\\r\\n  </div>\\r\\n  \\r\\n  <style lang=\\"postcss\\">\\r\\n    .card {\\n    border-radius: 0.5rem;\\n    border-width: 1px;\\n    border-color: rgb(var(--color-surface-500) / 0.3);\\n    --tw-backdrop-blur: blur(16px);\\n    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\\n    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\\n}\\r\\n  </style>"],"names":[],"mappings":"AAkDI,oBAAM,CACN,aAAa,CAAE,MAAM,CACrB,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,IAAI,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACjD,kBAAkB,CAAE,UAAU,CAC9B,uBAAuB,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAC/Q,eAAe,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB;AAC1Q"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const learningPaths = [
    {
      title: "Learning Modules",
      path: "/dashboard/learning/modules",
      icon: "📚",
      description: "Structured courses in geology and energy",
      items: ["Petroleum Geology", "Structural Geology", "Seismic Interpretation"]
    },
    {
      title: "Virtual Labs",
      path: "/dashboard/learning/virtual-labs",
      icon: "🔬",
      description: "Interactive laboratory simulations",
      items: ["Rock Analysis", "Well Logging", "Reservoir Modeling"]
    },
    {
      title: "Field Trips",
      path: "/dashboard/learning/field-trips",
      icon: "🌍",
      description: "Virtual field experiences",
      items: ["Sedimentary Basins", "Structural Features", "Production Sites"]
    }
  ];
  $$result.css.add(css);
  return `<div class="container mx-auto p-4 space-y-8"><header class="space-y-4" data-svelte-h="svelte-d7ngl6"><h2 class="h2">Learning Center</h2> <p>Access comprehensive educational resources for your energy sector career.</p></header> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">${each(learningPaths, (path) => {
    return `<a${add_attribute("href", path.path, 0)} class="card p-6 hover:bg-primary-500/10 transition-colors svelte-1j8d17m"><div class="flex items-center gap-3 mb-4"><span class="text-3xl">${escape(path.icon)}</span> <h3 class="h3">${escape(path.title)}</h3></div> <p class="text-surface-600-300-token mb-4">${escape(path.description)}</p> <ul class="list-disc list-inside text-sm space-y-1">${each(path.items, (item) => {
      return `<li>${escape(item)}</li>`;
    })}</ul> </a>`;
  })}</div> </div>`;
});
export {
  Page as default
};
