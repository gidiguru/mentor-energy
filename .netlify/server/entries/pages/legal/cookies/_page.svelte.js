import { c as create_ssr_component, s as subscribe, e as escape, a as each } from "../../../../chunks/ssr.js";
import { w as writable } from "../../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeSection, $$unsubscribe_activeSection;
  const lastUpdated = /* @__PURE__ */ new Date("2025-01-01");
  const cookiePolicySections = [
    {
      title: "Essential Cookies",
      content: [
        "Authentication and login sessions",
        "User preferences and settings",
        "Security features and fraud prevention",
        "Load balancing and site performance",
        "Basic platform functionality",
        "Shopping cart and payment processing"
      ]
    },
    {
      title: "Functional Cookies",
      content: [
        "Language preferences",
        "Theme and display settings",
        "User interface customization",
        "Recently viewed items",
        "Video player settings",
        "Form auto-fill assistance"
      ]
    },
    {
      title: "Analytics Cookies",
      content: [
        "Platform usage patterns",
        "Feature popularity tracking",
        "User journey analysis",
        "Performance monitoring",
        "Error and crash reporting",
        "User engagement metrics"
      ]
    },
    {
      title: "Third-Party Cookies",
      content: [
        "LinkedIn integration cookies",
        "Google authentication cookies",
        "Payment processor cookies",
        "Video platform cookies",
        "Analytics service cookies",
        "Social media integration"
      ]
    },
    {
      title: "Cookie Management",
      content: [
        "Browser cookie settings",
        "Cookie preference center",
        "Third-party cookie controls",
        "Cookie deletion instructions",
        "Cookie blocking options",
        "Do Not Track support"
      ]
    },
    {
      title: "Cookie Duration",
      content: [
        "Session cookies (temporary)",
        "Persistent cookies (1 year max)",
        "Authentication cookies (2 weeks)",
        "Preference cookies (6 months)",
        "Analytics cookies (90 days)",
        "Marketing cookies (30 days)"
      ]
    },
    {
      title: "Data Collection and Use",
      content: [
        "Purpose of each cookie type",
        "Data storage location",
        "Data sharing practices",
        "Cookie security measures",
        "Cross-site tracking limitations",
        "Data retention periods"
      ]
    }
  ];
  const activeSection = writable(null);
  $$unsubscribe_activeSection = subscribe(activeSection, (value) => $activeSection = value);
  $$unsubscribe_activeSection();
  return `<div class="max-w-4xl"><h1 class="h1 font-bold mb-6 text-center" data-svelte-h="svelte-1788c7q">Cookie Policy</h1> <div class="card variant-soft-surface p-4 mb-6 text-center"><p class="text-sm text-surface-600">Last Updated: ${escape(lastUpdated.toLocaleDateString())}</p></div> <div class="mb-6" data-svelte-h="svelte-aax20y"><h2 class="h2 mb-4">1. Introduction</h2> <p class="text-base">mentor.energy uses cookies and similar technologies to provide, improve, and protect our platform. This policy explains how and why we use these technologies and the choices you have.</p></div> ${each(cookiePolicySections, (section) => {
    return `<div class="mb-4 border-b border-surface-500/30"><button class="w-full text-left py-4 flex justify-between items-center hover:variant-soft-primary transition-colors"><h3 class="h3">${escape(section.title)}</h3> <span class="text-2xl">${escape($activeSection === section ? "−" : "+")} </span></button> ${$activeSection === section ? `<div class="p-4 variant-soft-surface rounded-lg"><ul class="list-disc pl-5 space-y-2">${each(section.content, (item) => {
      return `<li>${escape(item)}</li>`;
    })}</ul> </div>` : ``} </div>`;
  })} <div class="mt-8" data-svelte-h="svelte-1c4skte"><h2 class="h2 mb-4">Your Cookie Choices</h2> <p class="text-base mb-4">You can control or delete cookies based on your preferences. Details on how to manage cookies can be found in your browser&#39;s help section. Note that removing or blocking cookies may impact your platform experience.</p></div> <div class="mt-8 text-center" data-svelte-h="svelte-rpnuh8"><p class="text-sm text-surface-600">By continuing to use mentor.energy, you consent to our use of cookies as described in this policy.</p> <p class="text-sm text-surface-600 mt-2">Contact us at privacy@mentor.energy for questions about our cookie practices.</p></div></div>`;
});
export {
  Page as default
};
