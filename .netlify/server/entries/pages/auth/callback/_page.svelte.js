import { c as create_ssr_component } from "../../../../chunks/ssr.js";
const css = {
  code: ".spinner.svelte-1gvejr8{width:40px;height:40px;border:4px solid #ddd;border-top:4px solid #666;border-radius:50%;animation:svelte-1gvejr8-spin 1s linear infinite}@keyframes svelte-1gvejr8-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nonMount(() => {\\n  console.log(\\"Processing authentication...\\");\\n});\\n<\/script>\\r\\n  \\r\\n  <div class=\\"container mx-auto p-8 text-center\\">\\r\\n    <h2 class=\\"h2 mb-4\\">Processing Your Sign In</h2>\\r\\n    <p class=\\"text-lg mb-8\\">Please wait while we complete your authentication...</p>\\r\\n    <div class=\\"flex justify-center\\">\\r\\n      <div class=\\"spinner\\" />\\r\\n    </div>\\r\\n  </div>\\r\\n  \\r\\n  <style>\\r\\n    .spinner {\\r\\n      width: 40px;\\r\\n      height: 40px;\\r\\n      border: 4px solid #ddd;\\r\\n      border-top: 4px solid #666;\\r\\n      border-radius: 50%;\\r\\n      animation: spin 1s linear infinite;\\r\\n    }\\r\\n  \\r\\n    @keyframes spin {\\r\\n      0% { transform: rotate(0deg); }\\r\\n      100% { transform: rotate(360deg); }\\r\\n    }\\r\\n  </style>\\r\\n  "],"names":[],"mappings":"AAeI,uBAAS,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CAC1B,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,mBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC5B,CAEA,WAAW,mBAAK,CACd,EAAG,CAAE,SAAS,CAAE,OAAO,IAAI,CAAG,CAC9B,IAAK,CAAE,SAAS,CAAE,OAAO,MAAM,CAAG,CACpC"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="container mx-auto p-8 text-center" data-svelte-h="svelte-1wk64gv"><h2 class="h2 mb-4">Processing Your Sign In</h2> <p class="text-lg mb-8">Please wait while we complete your authentication...</p> <div class="flex justify-center"><div class="spinner svelte-1gvejr8"></div></div> </div>`;
});
export {
  Page as default
};
