import { c as create_ssr_component, s as subscribe, e as escape, a as each } from "../../../../chunks/ssr.js";
import { w as writable } from "../../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeSection, $$unsubscribe_activeSection;
  const lastUpdated = /* @__PURE__ */ new Date("2025-01-01");
  const termsSections = [
    {
      title: "User Registration and Accounts",
      content: [
        "Must provide accurate and complete information",
        "Must be at least 18 years old",
        "Responsible for account security",
        "Must notify us of unauthorized use",
        "Different account types available (Student, Mentor, Corporate)",
        "One account per user allowed"
      ]
    },
    {
      title: "User Responsibilities",
      content: [
        "Use platform in accordance with laws",
        "Maintain professional conduct",
        "Respect intellectual property rights",
        "Protect confidentiality of discussions",
        "No discriminatory or harassing behavior",
        "No false or misleading information",
        "No unauthorized sharing of materials"
      ]
    },
    {
      title: "Subscription and Payments",
      content: [
        "Free tier with basic features",
        "Premium subscription (₦5,000/month)",
        "Professional subscription (₦10,000/month)",
        "Corporate partnership packages available",
        "Fees payable in Nigerian Naira",
        "No refunds for partial months",
        "Automatic renewal unless cancelled"
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        "Platform content protected by copyright",
        "Users retain ownership of original content",
        "License granted to mentor.energy for content use",
        "No unauthorized use of platform materials",
        "Respect for third-party intellectual property",
        "Right to remove infringing content"
      ]
    },
    {
      title: "Platform Usage",
      content: [
        "Access to mentorship services",
        "Use of virtual laboratories",
        "Access to educational resources",
        "Communication tools usage",
        "Video conferencing facilities",
        "Assessment and certification tools"
      ]
    },
    {
      title: "Termination",
      content: [
        "Right to terminate for Terms violations",
        "Suspension for harmful behavior",
        "Termination for false information",
        "Cancellation for non-payment",
        "No refunds upon termination",
        "Data retention post-termination"
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        'Service provided "as is"',
        "No guarantee of uninterrupted service",
        "Not liable for service interruptions",
        "No warranty for accuracy of content",
        "Right to modify features",
        "Limitation of damages"
      ]
    }
  ];
  const activeSection = writable(null);
  $$unsubscribe_activeSection = subscribe(activeSection, (value) => $activeSection = value);
  $$unsubscribe_activeSection();
  return `<div class="max-w-4xl"><h1 class="h1 font-bold mb-6 text-center" data-svelte-h="svelte-1jfw2xn">Terms of Service</h1> <div class="card variant-soft-surface p-4 mb-6 text-center"><p class="text-sm text-surface-600">Last Updated: ${escape(lastUpdated.toLocaleDateString())}</p></div> <div class="mb-6" data-svelte-h="svelte-1efwpag"><h2 class="h2 mb-4">1. Agreement to Terms</h2> <p class="text-base">By accessing or using mentor.energy (&quot;the Platform&quot;), you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Platform.</p></div> ${each(termsSections, (section) => {
    return `<div class="mb-4 border-b border-surface-500/30"><button class="w-full text-left py-4 flex justify-between items-center hover:variant-soft-primary transition-colors"><h3 class="h3">${escape(section.title)}</h3> <span class="text-2xl">${escape($activeSection === section ? "−" : "+")} </span></button> ${$activeSection === section ? `<div class="p-4 variant-soft-surface rounded-lg"><ul class="list-disc pl-5 space-y-2">${each(section.content, (item) => {
      return `<li>${escape(item)}</li>`;
    })}</ul> </div>` : ``} </div>`;
  })} <div class="mt-8 text-center" data-svelte-h="svelte-1r3t56r"><p class="text-sm text-surface-600">By using mentor.energy, you acknowledge that you have read and agree to these Terms of Service.</p> <p class="text-sm text-surface-600 mt-2">Contact us at legal@mentor.energy for any questions about these Terms.</p></div></div>`;
});
export {
  Page as default
};
