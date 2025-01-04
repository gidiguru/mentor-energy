import { c as create_ssr_component, a as each, e as escape } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/client.js";
const css = {
  code: ".card.svelte-1p8ywfn{border-radius:0.5rem;border-width:1px;border-color:rgb(var(--color-surface-500) / 0.3);--tw-backdrop-blur:blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\n}.progress-bar.svelte-1p8ywfn{height:0.5rem;overflow:hidden;border-radius:9999px\n}.progress-bar-fill.svelte-1p8ywfn{height:100%;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:300ms\n}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nconst modules = [\\n  {\\n    id: \\"intro-petro-geology\\",\\n    title: \\"Introduction to Petroleum Geology\\",\\n    description: \\"Learn the fundamentals of petroleum geology and hydrocarbon formation.\\",\\n    duration: \\"45 mins\\",\\n    progress: 0\\n  },\\n  {\\n    id: \\"structural-geology\\",\\n    title: \\"Structural Geology Basics\\",\\n    description: \\"Understanding geological structures and their formation.\\",\\n    duration: \\"60 mins\\",\\n    progress: 0\\n  },\\n  {\\n    id: \\"seismic-interpretation\\",\\n    title: \\"Seismic Interpretation\\",\\n    description: \\"Basic principles of seismic data interpretation.\\",\\n    duration: \\"90 mins\\",\\n    progress: 0\\n  }\\n];\\n<\/script>\\r\\n  \\r\\n  <div class=\\"container mx-auto p-4 space-y-8\\">\\r\\n    <header class=\\"space-y-4\\">\\r\\n      <h2 class=\\"h2\\">Learning Modules</h2>\\r\\n      <p class=\\"text-surface-600-300-token\\">\\r\\n        Interactive modules to build your geological expertise.\\r\\n      </p>\\r\\n    </header>\\r\\n  \\r\\n    <div class=\\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\\">\\r\\n      {#each modules as module}\\r\\n        <a \\r\\n          href=\\"/dashboard/learning/modules/{module.id}\\" \\r\\n          class=\\"card p-6 hover:bg-primary-500/10 transition-colors\\"\\r\\n        >\\r\\n          <div class=\\"flex justify-between items-start mb-4\\">\\r\\n            <h3 class=\\"h3\\">{module.title}</h3>\\r\\n            <span class=\\"badge variant-filled-surface\\">{module.duration}</span>\\r\\n          </div>\\r\\n          <p class=\\"text-surface-600-300-token mb-4\\">{module.description}</p>\\r\\n          <div class=\\"space-y-2\\">\\r\\n            <div class=\\"flex justify-between text-sm\\">\\r\\n              <span>Progress</span>\\r\\n              <span>{module.progress}%</span>\\r\\n            </div>\\r\\n            <div class=\\"progress-bar bg-surface-200-700-token\\">\\r\\n              <div \\r\\n                class=\\"progress-bar-fill bg-primary-500\\" \\r\\n                style=\\"width: {module.progress}%\\"\\r\\n              />\\r\\n            </div>\\r\\n          </div>\\r\\n        </a>\\r\\n      {/each}\\r\\n    </div>\\r\\n  </div>\\r\\n  \\r\\n  <style lang=\\"postcss\\">\\r\\n    .card {\\r\\n    \\r\\n    border-radius: 0.5rem;\\r\\n    \\r\\n    border-width: 1px;\\r\\n    \\r\\n    border-color: rgb(var(--color-surface-500) / 0.3);\\r\\n    \\r\\n    --tw-backdrop-blur: blur(16px);\\r\\n    \\r\\n    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\\r\\n    \\r\\n    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\\n}\\r\\n    \\r\\n    .progress-bar {\\r\\n    \\r\\n    height: 0.5rem;\\r\\n    \\r\\n    overflow: hidden;\\r\\n    \\r\\n    border-radius: 9999px\\n}\\r\\n    \\r\\n    .progress-bar-fill {\\r\\n    \\r\\n    height: 100%;\\r\\n    \\r\\n    transition-property: all;\\r\\n    \\r\\n    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\r\\n    \\r\\n    transition-duration: 300ms\\n}\\r\\n  </style>"],"names":[],"mappings":"AA+DI,oBAAM,CAEN,aAAa,CAAE,MAAM,CAErB,YAAY,CAAE,GAAG,CAEjB,YAAY,CAAE,IAAI,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAEjD,kBAAkB,CAAE,UAAU,CAE9B,uBAAuB,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAE/Q,eAAe,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB;AAC1Q,CAEI,4BAAc,CAEd,MAAM,CAAE,MAAM,CAEd,QAAQ,CAAE,MAAM,CAEhB,aAAa,CAAE;AACnB,CAEI,iCAAmB,CAEnB,MAAM,CAAE,IAAI,CAEZ,mBAAmB,CAAE,GAAG,CAExB,0BAA0B,CAAE,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAExD,mBAAmB,CAAE;AACzB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const modules = [
    {
      id: "intro-petro-geology",
      title: "Introduction to Petroleum Geology",
      description: "Learn the fundamentals of petroleum geology and hydrocarbon formation.",
      duration: "45 mins",
      progress: 0
    },
    {
      id: "structural-geology",
      title: "Structural Geology Basics",
      description: "Understanding geological structures and their formation.",
      duration: "60 mins",
      progress: 0
    },
    {
      id: "seismic-interpretation",
      title: "Seismic Interpretation",
      description: "Basic principles of seismic data interpretation.",
      duration: "90 mins",
      progress: 0
    }
  ];
  $$result.css.add(css);
  return `<div class="container mx-auto p-4 space-y-8"><header class="space-y-4" data-svelte-h="svelte-sgkrk7"><h2 class="h2">Learning Modules</h2> <p class="text-surface-600-300-token">Interactive modules to build your geological expertise.</p></header> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${each(modules, (module) => {
    return `<a href="${"/dashboard/learning/modules/" + escape(module.id, true)}" class="card p-6 hover:bg-primary-500/10 transition-colors svelte-1p8ywfn"><div class="flex justify-between items-start mb-4"><h3 class="h3">${escape(module.title)}</h3> <span class="badge variant-filled-surface">${escape(module.duration)}</span></div> <p class="text-surface-600-300-token mb-4">${escape(module.description)}</p> <div class="space-y-2"><div class="flex justify-between text-sm"><span data-svelte-h="svelte-16oy1pd">Progress</span> <span>${escape(module.progress)}%</span></div> <div class="progress-bar bg-surface-200-700-token svelte-1p8ywfn"><div class="progress-bar-fill bg-primary-500 svelte-1p8ywfn" style="${"width: " + escape(module.progress, true) + "%"}"></div> </div></div> </a>`;
  })}</div> </div>`;
});
export {
  Page as default
};
