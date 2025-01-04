import { c as create_ssr_component, f as createEventDispatcher, b as add_attribute, e as escape, s as subscribe, v as validate_component, a as each } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { L as LinkedInIcon } from "../../../chunks/LinkedInIcon.js";
import { p as page } from "../../../chunks/stores.js";
const EmailSignup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { formData } = $$props;
  const passwordRequirements = {
    minLength: 8,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false
  };
  function validatePasswordStrength(pass) {
    passwordRequirements.hasUpperCase = /[A-Z]/.test(pass);
    passwordRequirements.hasLowerCase = /[a-z]/.test(pass);
    passwordRequirements.hasNumber = /[0-9]/.test(pass);
    passwordRequirements.hasSpecial = /[^A-Za-z0-9]/.test(pass);
    return Object.values(passwordRequirements).filter(Boolean).length;
  }
  if ($$props.formData === void 0 && $$bindings.formData && formData !== void 0) $$bindings.formData(formData);
  validatePasswordStrength(formData.password);
  return `<form method="POST" action="?/signup" class="space-y-4"><input type="hidden" name="discipline"${add_attribute("value", formData.discipline, 0)}> <input type="hidden" name="qualification"${add_attribute("value", formData.qualification, 0)}> <input type="hidden" name="role"${add_attribute("value", formData.role, 0)}> <div class="grid grid-cols-2 gap-4"><label class="label"><input type="text" name="firstName" placeholder="First Name" class="input" required ${""}${add_attribute("value", formData.firstName, 0)}></label> <label class="label"><input type="text" name="lastName" placeholder="Last Name" class="input" required ${""}${add_attribute("value", formData.lastName, 0)}></label></div> <label class="label"><input type="email" name="email" placeholder="Email" class="input" required ${""}${add_attribute("value", formData.email, 0)}></label> <label class="label relative"><input type="password" name="password" placeholder="Password (8+ chars, mix of types)" class="input pr-8" required ${""}${add_attribute("value", formData.password, 0)}> <div class="absolute right-2 top-1/2 -translate-y-1/2 cursor-help" title="Password must be at least 8 characters and include 3 of: uppercase, lowercase, number, special character" data-svelte-h="svelte-10tu2hm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle text-surface-500"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg></div></label> ${``} <button type="submit" class="btn variant-filled-primary w-full" ${""}>${escape("Sign up with Email")}</button></form>`;
});
const LinkedInSignup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { formData } = $$props;
  createEventDispatcher();
  if ($$props.formData === void 0 && $$bindings.formData && formData !== void 0) $$bindings.formData(formData);
  $$unsubscribe_page();
  return `<button class="btn variant-filled-primary w-full flex items-center justify-center gap-2" type="button">${validate_component(LinkedInIcon, "LinkedInIcon").$$render($$result, { size: 20 }, {}, {})}
    Sign up with LinkedIn</button>`;
});
const css = {
  code: ".card.svelte-17nq6si{border-radius:0.5rem;border-width:1px;border-color:rgb(var(--color-surface-500) / 0.3);--tw-backdrop-blur:blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\n}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import EmailSignup from \\"$lib/components/EmailSignup.svelte\\";\\nimport LinkedInSignup from \\"$lib/components/LinkedInSignup.svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nexport let form = null;\\nlet step = 1;\\nlet formData = {\\n  discipline: \\"\\",\\n  qualification: \\"\\",\\n  role: \\"\\",\\n  email: \\"\\",\\n  firstName: \\"\\",\\n  lastName: \\"\\",\\n  password: \\"\\",\\n  profile_picture: \\"\\"\\n};\\nlet existingUserEmail = null;\\nexport let data;\\nconst { supabase } = data;\\nlet error = \\"\\";\\n$: {\\n  if (form) {\\n    console.log(\\"Reactive block triggered\\", form);\\n    if (form.success && form.requiresEmailConfirmation) {\\n      step = 5;\\n    }\\n    if (form.success === true && form.existingUser === true || form.error === true && form.existingUser === true) {\\n      existingUserEmail = form.email ?? null;\\n      step = 6;\\n    }\\n  }\\n}\\nconst disciplines = [\\n  { id: \\"geoscience\\", label: \\"Geoscience\\", active: true },\\n  { id: \\"petroleum\\", label: \\"Petroleum Engineering\\", active: false },\\n  { id: \\"facilities\\", label: \\"Facilities Engineering\\", active: false },\\n  { id: \\"operations\\", label: \\"Operations\\", active: false }\\n];\\nconst qualifications = [\\n  { id: \\"student\\", label: \\"Student\\" },\\n  { id: \\"bachelors\\", label: \\"Bachelor's\\" },\\n  { id: \\"masters\\", label: \\"Master's\\" },\\n  { id: \\"doctorate\\", label: \\"Doctorate\\" }\\n];\\nconst roles = [\\n  { id: \\"mentee\\", label: \\"Mentee\\" },\\n  { id: \\"mentor\\", label: \\"Mentor\\" }\\n];\\n$: {\\n  console.log(\\"Current Step:\\", step);\\n  console.log(\\"Form State:\\", form);\\n  console.log(\\"Existing User Email:\\", existingUserEmail);\\n}\\nfunction handleSelection(field, value) {\\n  formData[field] = value;\\n  step++;\\n}\\nfunction handleFormUpdate(event) {\\n  const result = event.detail;\\n  console.log(\\"Form update received:\\", result);\\n  if (result.type === \\"success\\") {\\n    form = {\\n      success: true,\\n      requiresEmailConfirmation: result.requiresEmailConfirmation || false,\\n      email: result.email,\\n      existingUser: result.data?.existingUser || false\\n    };\\n    if (result.data) {\\n      formData.discipline = result.data.discipline || formData.discipline;\\n      formData.qualification = result.data.qualification || formData.qualification;\\n      formData.role = result.data.role || formData.role;\\n    }\\n    if (form.existingUser) {\\n      existingUserEmail = form.email ?? null;\\n      step = 6;\\n    }\\n  } else if (result.type === \\"failure\\" && result.status === 400 && result.data?.existingUser) {\\n    form = {\\n      error: true,\\n      existingUser: true,\\n      email: result.data.email\\n    };\\n    existingUserEmail = result.data.email ?? null;\\n    step = 6;\\n  }\\n}\\nasync function handleGoogleSignIn() {\\n  try {\\n    const { data: data2, error: error2 } = await supabase.auth.signInWithOAuth({\\n      provider: \\"google\\",\\n      options: {\\n        redirectTo: \`\${window.location.origin}/auth/callback\`\\n      }\\n    });\\n    if (error2) throw error2;\\n  } catch (e) {\\n    console.error(\\"Google signin error:\\", e);\\n    error = \\"Failed to sign in with Google\\";\\n  }\\n}\\n<\/script>\\r\\n\\r\\n<div class=\\"container mx-auto p-6\\">\\r\\n  <div class=\\"card p-6 bg-surface-50-900-token\\">\\r\\n    {#if form?.error}\\r\\n      <div class=\\"p-4 mb-4 bg-error-500/20 text-error-500 rounded\\">\\r\\n        {form.error}\\r\\n      </div>\\r\\n    {/if}\\r\\n\\r\\n    {#if step === 1}\\r\\n      <div class=\\"space-y-4\\">\\r\\n        <h2 class=\\"h2 text-center mb-6\\">Which discipline are you interested in?</h2>\\r\\n        <div class=\\"grid grid-cols-2 gap-4\\">\\r\\n          {#each disciplines as discipline}\\r\\n            <button\\r\\n              on:click={() => discipline.active && handleSelection('discipline', discipline.id)}\\r\\n              class=\\"btn {discipline.active ? 'variant-filled-primary' : 'variant-ghost-surface opacity-50 cursor-not-allowed'}\\"\\r\\n              disabled={!discipline.active}\\r\\n            >\\r\\n              {discipline.label}\\r\\n            </button>\\r\\n          {/each}\\r\\n        </div>\\r\\n      </div>\\r\\n    {:else if step === 2}\\r\\n      <div class=\\"space-y-4\\">\\r\\n        <h2 class=\\"h2 text-center mb-6\\">What is your highest qualification?</h2>\\r\\n        <div class=\\"grid grid-cols-2 gap-4\\">\\r\\n          {#each qualifications as qual}\\r\\n            <button\\r\\n              on:click={() => handleSelection('qualification', qual.id)}\\r\\n              class=\\"btn variant-filled-primary\\"\\r\\n            >\\r\\n              {qual.label}\\r\\n            </button>\\r\\n          {/each}\\r\\n        </div>\\r\\n      </div>\\r\\n    {:else if step === 3}\\r\\n      <div class=\\"space-y-4\\">\\r\\n        <h2 class=\\"h2 text-center mb-6\\">Are you interested in being...</h2>\\r\\n        <div class=\\"grid grid-cols-2 gap-4\\">\\r\\n          {#each roles as role}\\r\\n            <button\\r\\n              on:click={() => handleSelection('role', role.id)}\\r\\n              class=\\"btn variant-filled-primary\\"\\r\\n            >\\r\\n              {role.label}\\r\\n            </button>\\r\\n          {/each}\\r\\n        </div>\\r\\n      </div>\\r\\n    {:else if step === 4}\\r\\n      <div class=\\"space-y-6\\">\\r\\n        <h2 class=\\"h2 text-center mb-6\\">Create your account</h2>\\r\\n        \\r\\n        <LinkedInSignup {formData} on:formUpdate={handleFormUpdate}/>\\r\\n\\r\\n        <button \\r\\n        on:click={handleGoogleSignIn}\\r\\n        class=\\"btn variant-filled-primary w-full flex items-center justify-center gap-2\\" \\r\\n    >\\r\\n        <svg class=\\"w-5 h-5\\" viewBox=\\"0 0 24 24\\">\\r\\n            <path fill=\\"currentColor\\" d=\\"M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z\\"/>\\r\\n        </svg>\\r\\n        Sign in with Google\\r\\n    </button>\\r\\n        \\r\\n        <div class=\\"relative\\">\\r\\n          <div class=\\"absolute inset-0 flex items-center\\">\\r\\n            <div class=\\"w-full border-t border-surface-500/30\\" />\\r\\n          </div>\\r\\n          <div class=\\"relative flex justify-center text-sm\\">\\r\\n            <span class=\\"px-2 bg-surface-50-900-token\\">Or</span>\\r\\n          </div>\\r\\n        </div>\\r\\n\\r\\n        <EmailSignup {formData} on:formUpdate={handleFormUpdate} />\\r\\n      </div>\\r\\n    {:else if step === 5}\\r\\n      <div class=\\"space-y-6 text-center\\">\\r\\n        <div class=\\"text-4xl mb-4\\">✉️</div>\\r\\n        <h2 class=\\"h2\\">Check Your Email</h2>\\r\\n        <p class=\\"text-lg\\">\\r\\n          We've sent a confirmation email to <strong>{form?.email}</strong>\\r\\n        </p>\\r\\n        <p class=\\"mt-4\\">\\r\\n          Please click the link in the email to activate your account. \\r\\n          The link will expire in 24 hours.\\r\\n        </p>\\r\\n        <div class=\\"pt-6\\">\\r\\n          <p class=\\"text-sm text-surface-600-300-token\\">\\r\\n            Didn't receive the email? Check your spam folder or\\r\\n            <button \\r\\n              class=\\"text-primary-500 hover:underline\\" \\r\\n              on:click={() => step = 4}\\r\\n            >\\r\\n              try signing up again\\r\\n            </button>\\r\\n          </p>\\r\\n        </div>\\r\\n      </div>\\r\\n        {:else if step === 6}\\r\\n    <div class=\\"space-y-6 text-center\\">\\r\\n      <div class=\\"text-4xl mb-4\\">🔔</div>\\r\\n      <h2 class=\\"h2\\">Account Already Exists</h2>\\r\\n      <p class=\\"text-lg\\">\\r\\n        An account is already registered with the email <strong>{existingUserEmail}</strong>\\r\\n      </p>\\r\\n      <div class=\\"space-y-4 mt-6\\">\\r\\n        <button \\r\\n          class=\\"btn variant-filled-primary w-full\\"\\r\\n          on:click={() => {\\r\\n            // Redirect to login or populate login form\\r\\n            goto('/auth?email=' + encodeURIComponent(existingUserEmail || ''));\\r\\n          }}\\r\\n        >\\r\\n          Go to Login\\r\\n        </button>\\r\\n        <button \\r\\n          class=\\"btn variant-ghost-surface w-full\\"\\r\\n          on:click={() => {\\r\\n            // Reset to email entry step\\r\\n            existingUserEmail = null;\\r\\n            step = 4;\\r\\n          }}\\r\\n        >\\r\\n          Try Different Email\\r\\n        </button>\\r\\n      </div>\\r\\n      <p class=\\"text-sm text-surface-600-300-token mt-4\\">\\r\\n        If you've forgotten your password, you can reset it on the login page.\\r\\n      </p>\\r\\n    </div>\\r\\n    {/if}\\r\\n    \\r\\n\\r\\n    <div class=\\"mt-4 flex justify-between\\">\\r\\n      {#if step > 1 && step < 5}\\r\\n        <button\\r\\n          on:click={() => step--}\\r\\n          class=\\"btn variant-ghost-primary\\"\\r\\n        >\\r\\n          Back\\r\\n        </button>\\r\\n      {/if}\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style lang=\\"postcss\\">\\r\\n  .card {\\n    border-radius: 0.5rem;\\n    border-width: 1px;\\n    border-color: rgb(var(--color-surface-500) / 0.3);\\n    --tw-backdrop-blur: blur(16px);\\n    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\\n    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\\n}\\r\\n</style>"],"names":[],"mappings":"AA2PE,oBAAM,CACJ,aAAa,CAAE,MAAM,CACrB,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,IAAI,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACjD,kBAAkB,CAAE,UAAU,CAC9B,uBAAuB,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAC/Q,eAAe,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB;AAC1Q"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form = null } = $$props;
  let step = 1;
  let formData = {
    discipline: "",
    qualification: "",
    role: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    profile_picture: ""
  };
  let existingUserEmail = null;
  let { data } = $$props;
  const disciplines = [
    {
      id: "geoscience",
      label: "Geoscience",
      active: true
    },
    {
      id: "petroleum",
      label: "Petroleum Engineering",
      active: false
    },
    {
      id: "facilities",
      label: "Facilities Engineering",
      active: false
    },
    {
      id: "operations",
      label: "Operations",
      active: false
    }
  ];
  const qualifications = [
    { id: "student", label: "Student" },
    { id: "bachelors", label: "Bachelor's" },
    { id: "masters", label: "Master's" },
    { id: "doctorate", label: "Doctorate" }
  ];
  const roles = [{ id: "mentee", label: "Mentee" }, { id: "mentor", label: "Mentor" }];
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  {
    {
      if (form) {
        console.log("Reactive block triggered", form);
        if (form.success && form.requiresEmailConfirmation) {
          step = 5;
        }
        if (form.success === true && form.existingUser === true || form.error === true && form.existingUser === true) {
          existingUserEmail = form.email ?? null;
          step = 6;
        }
      }
    }
  }
  {
    {
      console.log("Current Step:", step);
      console.log("Form State:", form);
      console.log("Existing User Email:", existingUserEmail);
    }
  }
  return `<div class="container mx-auto p-6"><div class="card p-6 bg-surface-50-900-token svelte-17nq6si">${form?.error ? `<div class="p-4 mb-4 bg-error-500/20 text-error-500 rounded">${escape(form.error)}</div>` : ``} ${step === 1 ? `<div class="space-y-4"><h2 class="h2 text-center mb-6" data-svelte-h="svelte-wrm6vv">Which discipline are you interested in?</h2> <div class="grid grid-cols-2 gap-4">${each(disciplines, (discipline) => {
    return `<button class="${"btn " + escape(
      discipline.active ? "variant-filled-primary" : "variant-ghost-surface opacity-50 cursor-not-allowed",
      true
    )}" ${!discipline.active ? "disabled" : ""}>${escape(discipline.label)} </button>`;
  })}</div></div>` : `${step === 2 ? `<div class="space-y-4"><h2 class="h2 text-center mb-6" data-svelte-h="svelte-19pcct">What is your highest qualification?</h2> <div class="grid grid-cols-2 gap-4">${each(qualifications, (qual) => {
    return `<button class="btn variant-filled-primary">${escape(qual.label)} </button>`;
  })}</div></div>` : `${step === 3 ? `<div class="space-y-4"><h2 class="h2 text-center mb-6" data-svelte-h="svelte-1sjl9yw">Are you interested in being...</h2> <div class="grid grid-cols-2 gap-4">${each(roles, (role) => {
    return `<button class="btn variant-filled-primary">${escape(role.label)} </button>`;
  })}</div></div>` : `${step === 4 ? `<div class="space-y-6"><h2 class="h2 text-center mb-6" data-svelte-h="svelte-1ivj4yy">Create your account</h2> ${validate_component(LinkedInSignup, "LinkedInSignup").$$render($$result, { formData }, {}, {})} <button class="btn variant-filled-primary w-full flex items-center justify-center gap-2" data-svelte-h="svelte-6lrf0y"><svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path></svg>
        Sign in with Google</button> <div class="relative" data-svelte-h="svelte-1njzjt6"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-surface-500/30"></div></div> <div class="relative flex justify-center text-sm"><span class="px-2 bg-surface-50-900-token">Or</span></div></div> ${validate_component(EmailSignup, "EmailSignup").$$render($$result, { formData }, {}, {})}</div>` : `${step === 5 ? `<div class="space-y-6 text-center"><div class="text-4xl mb-4" data-svelte-h="svelte-u4l9m9">✉️</div> <h2 class="h2" data-svelte-h="svelte-4e6p62">Check Your Email</h2> <p class="text-lg">We&#39;ve sent a confirmation email to <strong>${escape(form?.email)}</strong></p> <p class="mt-4" data-svelte-h="svelte-cpwbkc">Please click the link in the email to activate your account. 
          The link will expire in 24 hours.</p> <div class="pt-6"><p class="text-sm text-surface-600-300-token">Didn&#39;t receive the email? Check your spam folder or
            <button class="text-primary-500 hover:underline" data-svelte-h="svelte-1u60v5h">try signing up again</button></p></div></div>` : `${step === 6 ? `<div class="space-y-6 text-center"><div class="text-4xl mb-4" data-svelte-h="svelte-1z12z3e">🔔</div> <h2 class="h2" data-svelte-h="svelte-1tp2h68">Account Already Exists</h2> <p class="text-lg">An account is already registered with the email <strong>${escape(existingUserEmail)}</strong></p> <div class="space-y-4 mt-6"><button class="btn variant-filled-primary w-full" data-svelte-h="svelte-1fvvi7o">Go to Login</button> <button class="btn variant-ghost-surface w-full" data-svelte-h="svelte-xkyf5y">Try Different Email</button></div> <p class="text-sm text-surface-600-300-token mt-4" data-svelte-h="svelte-qobufa">If you&#39;ve forgotten your password, you can reset it on the login page.</p></div>` : ``}`}`}`}`}`} <div class="mt-4 flex justify-between">${step > 1 && step < 5 ? `<button class="btn variant-ghost-primary" data-svelte-h="svelte-58q48c">Back</button>` : ``}</div></div> </div>`;
});
export {
  Page as default
};
