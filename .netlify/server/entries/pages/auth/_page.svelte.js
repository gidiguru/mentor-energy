import { c as create_ssr_component, b as add_attribute, e as escape, s as subscribe, h as createEventDispatcher, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { L as LinkedInIcon } from "../../../chunks/LinkedInIcon.js";
import { p as page } from "../../../chunks/stores.js";
const EmailSignIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { onForgotPassword } = $$props;
  let email = "";
  let password = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.onForgotPassword === void 0 && $$bindings.onForgotPassword && onForgotPassword !== void 0) $$bindings.onForgotPassword(onForgotPassword);
  return `<div class="card p-6 variant-filled-surface"><h3 class="h3 mb-4 text-center" data-svelte-h="svelte-1f2kl5">Sign In with Email</h3> <form class="space-y-4"><label class="label"><span data-svelte-h="svelte-1bg9cgq">Email</span> <input name="email" type="email" class="input" placeholder="Enter your email" required${add_attribute("value", email, 0)}></label> <label class="label"><span data-svelte-h="svelte-1kvjhoz">Password</span> <input name="password" type="password" class="input" placeholder="Enter your password" required${add_attribute("value", password, 0)}></label> ${``} <div class="flex flex-col gap-2"><button type="submit" class="btn variant-filled-primary w-full" ${""}>${escape("Sign In")}</button> <button type="button" class="btn variant-ghost-surface w-full" data-svelte-h="svelte-235arg">Create an account</button> <button type="button" class="btn variant-ghost-surface" data-svelte-h="svelte-1y1defr">Forgot Password?</button></div></form></div>`;
});
const LinkedInSignIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  createEventDispatcher();
  $$unsubscribe_page();
  return `<button class="btn variant-filled-primary w-full flex items-center justify-center gap-2" type="button">${validate_component(LinkedInIcon, "LinkedInIcon").$$render($$result, { size: 20 }, {}, {})}
    Sign In with LinkedIn</button>`;
});
const ForgotPassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onClose } = $$props;
  let email = "";
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  return `  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="card p-6 max-w-md w-full mx-4 relative"><button class="absolute top-2 right-2 btn btn-sm variant-ghost-surface" data-svelte-h="svelte-1l8qghf">×</button> <h2 class="h2 mb-4" data-svelte-h="svelte-m0ngdx">Reset Password</h2> <form class="space-y-4"><div class="space-y-2"><label for="email" data-svelte-h="svelte-1p9d3fm">Email</label> <input type="email" id="email" class="input" placeholder="Enter your email" required ${""}${add_attribute("value", email, 0)}></div> ${``} ${``} <button type="submit" class="btn variant-filled-primary w-full" ${""}>${escape("Send Reset Instructions")}</button></form></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let showForgotPassword = false;
  let error = "";
  const { supabase } = data;
  async function handleLinkedInSignIn() {
    try {
      const { data: data2, error: error2 } = await supabase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error2) throw error2;
    } catch (e) {
      console.error("LinkedIn signin error:", e);
      error = "Failed to sign in with LinkedIn";
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="container mx-auto max-w-md p-4"><div class="space-y-8">${error ? `<div class="alert variant-filled-error">${escape(error)}</div>` : ``} ${validate_component(LinkedInSignIn, "LinkedInSignIn").$$render($$result, { onSignIn: handleLinkedInSignIn }, {}, {})} <div class="space-y-4"><button class="btn variant-filled-primary w-full flex items-center justify-center gap-2" data-svelte-h="svelte-xaffte"><svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path></svg>
                Sign in with Google</button></div> <div class="relative" data-svelte-h="svelte-oe4f4j"><div class="absolute inset-0 flex items-center"><div class="w-full border-t"></div></div> <div class="relative flex justify-center text-sm"><span class="px-2 bg-surface-100-800-token">Or</span></div></div> ${validate_component(EmailSignIn, "EmailSignIn").$$render(
    $$result,
    {
      data: { supabase },
      onForgotPassword: () => showForgotPassword = true
    },
    {},
    {}
  )}</div></div> ${showForgotPassword ? `${validate_component(ForgotPassword, "ForgotPassword").$$render(
    $$result,
    {
      onClose: () => showForgotPassword = false
    },
    {},
    {}
  )}` : ``}`;
});
export {
  Page as default
};
