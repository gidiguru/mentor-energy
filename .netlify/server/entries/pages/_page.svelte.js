import { c as create_ssr_component, b as add_attribute, a as each, e as escape, v as validate_component } from "../../chunks/ssr.js";
import "../../chunks/client.js";
const AIChatPreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let messages = [
    {
      role: "assistant",
      content: "👋 Hi! I'm your energy career assistant. Try asking me about geology careers, industry skills, or mentorship opportunities."
    }
  ];
  let inputValue = "";
  let chatContainer;
  return `<div class="card p-3 sm:p-4 w-full max-w-2xl mx-auto bg-surface-100-800-token"><div class="h-[250px] sm:h-[300px] overflow-y-auto mb-3 sm:mb-4 space-y-3 sm:space-y-4 p-2 sm:p-4"${add_attribute("this", chatContainer, 0)}>${each(messages, (message) => {
    return `<div class="${"flex " + escape(
      message.role === "user" ? "justify-end" : "justify-start",
      true
    )}"><div class="${"max-w-[80%] rounded-lg p-3 " + escape(
      message.role === "user" ? "bg-primary-500 text-white" : "bg-surface-200-700-token",
      true
    )}">${escape(message.content)}</div> </div>`;
  })} ${``}</div> <form class="flex gap-2"><input type="text" placeholder="Ask about geology careers, skills, or mentorship..." class="input" ${""}${add_attribute("value", inputValue, 0)}> <button type="submit" ${""} class="btn variant-filled-primary">Send</button></form> <p class="text-sm mt-4 text-center" data-svelte-h="svelte-id9i3h">Note: This is a preview. Sign up for full AI assistance and mentor connections!</p></div>`;
});
const css = {
  code: ".card.svelte-1tecnn9{border-radius:0.5rem;border-width:1px;border-color:rgb(var(--color-surface-500) / 0.3);--tw-backdrop-blur:blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\n}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { fade, fly } from \\"svelte/transition\\";\\nimport AIChatPreview from \\"$lib/components/AIChatPreview.svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nfunction handleGetStarted() {\\n  goto(\\"/signup\\");\\n}\\nconst stats = [\\n  { label: \\"Active Mentors\\", value: \\"50+\\" },\\n  { label: \\"Universities\\", value: \\"6\\" },\\n  { label: \\"Success Rate\\", value: \\"85%\\" },\\n  { label: \\"Student Projects\\", value: \\"200+\\" }\\n];\\nconst features = [\\n  {\\n    title: \\"Industry Mentorship\\",\\n    description: \\"Connect with experienced professionals in geology and energy sectors\\",\\n    icon: \\"\\\\u{1F465}\\"\\n  },\\n  {\\n    title: \\"Virtual Labs\\",\\n    description: \\"Access state-of-the-art virtual geology laboratories and simulations\\",\\n    icon: \\"\\\\u{1F52C}\\"\\n  },\\n  {\\n    title: \\"Software Training\\",\\n    description: \\"Learn industry-standard software like Petrel through guided tutorials\\",\\n    icon: \\"\\\\u{1F4BB}\\"\\n  },\\n  {\\n    title: \\"Field Experience\\",\\n    description: \\"Participate in virtual field trips and real-world projects\\",\\n    icon: \\"\\\\u{1F30D}\\"\\n  }\\n];\\nconst testimonials = [\\n  {\\n    quote: \\"The mentorship program helped me secure my dream role at a leading energy company.\\",\\n    author: \\"Chioma O.\\",\\n    role: \\"300-level Geology Student\\",\\n    university: \\"University of Ibadan\\"\\n  },\\n  {\\n    quote: \\"Being a mentor has been incredibly rewarding. The platform makes it easy to share knowledge.\\",\\n    author: \\"Dr. Adeyemi S.\\",\\n    role: \\"Senior Geologist\\",\\n    company: \\"Major Energy Company\\"\\n  }\\n];\\nlet visible = false;\\nonMount(() => {\\n  visible = true;\\n});\\n<\/script>\\n  \\n  <!-- Hero Section -->\\n  <div class=\\"container mx-auto px-4 py-8 md:py-24\\">\\n\\t{#if visible}\\n\\t  <div class=\\"grid md:grid-cols-2 gap-6 md:gap-8 items-center\\" in:fade>\\n\\t\\t<div class=\\"space-y-4 md:space-y-6\\">\\n\\t\\t  <h1 class=\\"h1 font-bold !text-3xl sm:!text-4xl md:!text-5xl\\">\\n\\t\\t\\tBuild Your Future in Nigeria's Energy Sector\\n\\t\\t  </h1>\\n\\t\\t  <p class=\\"text-lg sm:text-xl\\">\\n\\t\\t\\tConnect with industry mentors, access virtual labs, and gain practical experience \\n\\t\\t\\twhile still in or out of the university. Bridge the gap between education and industry.\\n\\t\\t  </p>\\n\\t\\t  <div class=\\"flex flex-col sm:flex-row gap-4\\">\\n\\t\\t\\t<a href=\\"/signup\\" class=\\"btn variant-filled-primary\\">Get Started</a>\\n\\t\\t\\t<a href=\\"/mentors\\" class=\\"btn variant-ghost-surface\\">Browse Mentors</a>\\n\\t\\t  </div>\\n\\t\\t</div>\\n\\t\\t<div class=\\"relative\\" in:fly={{ y: 50, duration: 1000 }}>\\n\\t\\t  <div class=\\"rounded-lg shadow-xl bg-surface-200-700-token p-8 h-[400px] flex items-center justify-center\\">\\n\\t\\t\\t<div class=\\"text-center\\">\\n\\t\\t\\t  <span class=\\"text-6xl mb-4 block\\">🎓🌍</span>\\n\\t\\t\\t  <p class=\\"text-xl font-medium\\">Connecting Students with Industry Experts</p>\\n\\t\\t\\t</div>\\n\\t\\t  </div>\\n\\t\\t</div>\\n\\t  </div>\\n\\t{/if}\\n  </div>\\n  \\n  <!-- Stats Section -->\\n  <div class=\\"bg-surface-100-800-token py-12\\">\\n\\t<div class=\\"container mx-auto px-4\\">\\n\\t  <div class=\\"grid grid-cols-2 md:grid-cols-4 gap-8\\">\\n\\t\\t{#each stats as stat}\\n\\t\\t  <div class=\\"text-center\\">\\n\\t\\t\\t<p class=\\"h2 font-bold text-primary-500\\">{stat.value}</p>\\n\\t\\t\\t<p class=\\"text-lg\\">{stat.label}</p>\\n\\t\\t  </div>\\n\\t\\t{/each}\\n\\t  </div>\\n\\t</div>\\n  </div>\\n  \\n  <!-- AI Assistant Preview -->\\n  <div class=\\"container mx-auto px-4 py-16\\">\\n\\t<h2 class=\\"h2 text-center mb-4\\">Get Instant Career Guidance</h2>\\n\\t<p class=\\"text-center text-lg mb-8\\">Try our AI career assistant. Ask about geology careers, required skills, or industry trends.</p>\\n\\t<AIChatPreview />\\n  </div>\\n  \\n  <!-- Features Section -->\\n  <div class=\\"container mx-auto px-4 py-16\\">\\n\\t<h2 class=\\"h2 text-center mb-12\\">Why Choose mentor.energy?</h2>\\n\\t<div class=\\"grid md:grid-cols-2 lg:grid-cols-4 gap-8\\">\\n\\t  {#each features as feature}\\n\\t\\t<div class=\\"card p-6 text-center\\">\\n\\t\\t  <div class=\\"text-4xl mb-4\\">{feature.icon}</div>\\n\\t\\t  <h3 class=\\"h3 mb-2\\">{feature.title}</h3>\\n\\t\\t  <p>{feature.description}</p>\\n\\t\\t</div>\\n\\t  {/each}\\n\\t</div>\\n  </div>\\n  \\n  <!-- Testimonials Section -->\\n  <div class=\\"bg-surface-100-800-token py-16\\">\\n\\t<div class=\\"container mx-auto px-4\\">\\n\\t  <h2 class=\\"h2 text-center mb-12\\">What Our Community Says</h2>\\n\\t  <div class=\\"grid md:grid-cols-2 gap-8\\">\\n\\t\\t{#each testimonials as testimonial}\\n\\t\\t  <div class=\\"card p-6\\">\\n\\t\\t\\t<p class=\\"italic text-lg mb-4\\">\\"{testimonial.quote}\\"</p>\\n\\t\\t\\t<div>\\n\\t\\t\\t  <p class=\\"font-bold\\">{testimonial.author}</p>\\n\\t\\t\\t  <p>{testimonial.role}</p>\\n\\t\\t\\t  <p class=\\"text-sm\\">{testimonial.university || testimonial.company}</p>\\n\\t\\t\\t</div>\\n\\t\\t  </div>\\n\\t\\t{/each}\\n\\t  </div>\\n\\t</div>\\n  </div>\\n  \\n  <!-- CTA Section -->\\n  <div class=\\"container mx-auto px-4 py-16 text-center\\">\\n\\t<h2 class=\\"h2 mb-6\\">Ready to Start Your Journey?</h2>\\n\\t<p class=\\"text-xl mb-8 max-w-2xl mx-auto\\">\\n\\t  Join mentor.energy today and take the first step towards a successful career \\n\\t  in Nigeria's energy sector.\\n\\t</p>\\n\\t<div class=\\"flex flex-col sm:flex-row gap-4 justify-center\\">\\n\\t  <a href=\\"/signup\\" class=\\"btn variant-filled-primary\\">Sign Up as Student</a>\\n\\t  <a href=\\"/signup\\" class=\\"btn variant-ghost-surface\\">Become a Mentor</a>\\n\\t</div>\\n  </div>\\n  \\n  <style lang=\\"postcss\\">\\n\\t.card {\\n    border-radius: 0.5rem;\\n    border-width: 1px;\\n    border-color: rgb(var(--color-surface-500) / 0.3);\\n    --tw-backdrop-blur: blur(16px);\\n    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\\n    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\\n}\\n  </style>"],"names":[],"mappings":"AAwJC,oBAAM,CACH,aAAa,CAAE,MAAM,CACrB,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,IAAI,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACjD,kBAAkB,CAAE,UAAU,CAC9B,uBAAuB,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAC/Q,eAAe,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB;AAC1Q"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const stats = [
    { label: "Active Mentors", value: "50+" },
    { label: "Universities", value: "6" },
    { label: "Success Rate", value: "85%" },
    { label: "Student Projects", value: "200+" }
  ];
  const features = [
    {
      title: "Industry Mentorship",
      description: "Connect with experienced professionals in geology and energy sectors",
      icon: "👥"
    },
    {
      title: "Virtual Labs",
      description: "Access state-of-the-art virtual geology laboratories and simulations",
      icon: "🔬"
    },
    {
      title: "Software Training",
      description: "Learn industry-standard software like Petrel through guided tutorials",
      icon: "💻"
    },
    {
      title: "Field Experience",
      description: "Participate in virtual field trips and real-world projects",
      icon: "🌍"
    }
  ];
  const testimonials = [
    {
      quote: "The mentorship program helped me secure my dream role at a leading energy company.",
      author: "Chioma O.",
      role: "300-level Geology Student",
      university: "University of Ibadan"
    },
    {
      quote: "Being a mentor has been incredibly rewarding. The platform makes it easy to share knowledge.",
      author: "Dr. Adeyemi S.",
      role: "Senior Geologist",
      company: "Major Energy Company"
    }
  ];
  $$result.css.add(css);
  return ` <div class="container mx-auto px-4 py-8 md:py-24">${``}</div>  <div class="bg-surface-100-800-token py-12"><div class="container mx-auto px-4"><div class="grid grid-cols-2 md:grid-cols-4 gap-8">${each(stats, (stat) => {
    return `<div class="text-center"><p class="h2 font-bold text-primary-500">${escape(stat.value)}</p> <p class="text-lg">${escape(stat.label)}</p> </div>`;
  })}</div></div></div>  <div class="container mx-auto px-4 py-16"><h2 class="h2 text-center mb-4" data-svelte-h="svelte-1tuctcn">Get Instant Career Guidance</h2> <p class="text-center text-lg mb-8" data-svelte-h="svelte-y4x48b">Try our AI career assistant. Ask about geology careers, required skills, or industry trends.</p> ${validate_component(AIChatPreview, "AIChatPreview").$$render($$result, {}, {}, {})}</div>  <div class="container mx-auto px-4 py-16"><h2 class="h2 text-center mb-12" data-svelte-h="svelte-72mzvy">Why Choose mentor.energy?</h2> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">${each(features, (feature) => {
    return `<div class="card p-6 text-center svelte-1tecnn9"><div class="text-4xl mb-4">${escape(feature.icon)}</div> <h3 class="h3 mb-2">${escape(feature.title)}</h3> <p>${escape(feature.description)}</p> </div>`;
  })}</div></div>  <div class="bg-surface-100-800-token py-16"><div class="container mx-auto px-4"><h2 class="h2 text-center mb-12" data-svelte-h="svelte-cjwaq">What Our Community Says</h2> <div class="grid md:grid-cols-2 gap-8">${each(testimonials, (testimonial) => {
    return `<div class="card p-6 svelte-1tecnn9"><p class="italic text-lg mb-4">&quot;${escape(testimonial.quote)}&quot;</p> <div><p class="font-bold">${escape(testimonial.author)}</p> <p>${escape(testimonial.role)}</p> <p class="text-sm">${escape(testimonial.university || testimonial.company)}</p></div> </div>`;
  })}</div></div></div>  <div class="container mx-auto px-4 py-16 text-center" data-svelte-h="svelte-l0jmix"><h2 class="h2 mb-6">Ready to Start Your Journey?</h2> <p class="text-xl mb-8 max-w-2xl mx-auto">Join mentor.energy today and take the first step towards a successful career 
	  in Nigeria&#39;s energy sector.</p> <div class="flex flex-col sm:flex-row gap-4 justify-center"><a href="/signup" class="btn variant-filled-primary">Sign Up as Student</a> <a href="/signup" class="btn variant-ghost-surface">Become a Mentor</a></div> </div>`;
});
export {
  Page as default
};
