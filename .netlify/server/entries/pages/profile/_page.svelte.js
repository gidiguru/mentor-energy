import { c as create_ssr_component, b as add_attribute } from "../../../chunks/ssr.js";
function defaultProfileIcon() {
  return `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-surface-500">
                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
            </svg>
        `)}`;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let passwordValidation;
  let isPasswordValid;
  let { data } = $$props;
  let newPassword = "";
  let confirmPassword = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  passwordValidation = {
    minLength: newPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasLowerCase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    hasSpecial: /[^A-Za-z0-9]/.test(newPassword)
  };
  isPasswordValid = passwordValidation.minLength && passwordValidation.hasUpperCase && passwordValidation.hasLowerCase && passwordValidation.hasNumber && passwordValidation.hasSpecial && newPassword === confirmPassword;
  return `<div class="container mx-auto p-4"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="card p-4 space-y-4"><div class="flex flex-col items-center mb-6"> <div class="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-surface-300">${`<img${add_attribute("src", defaultProfileIcon(), 0)} alt="Default Profile Icon" class="w-full h-full object-cover text-surface-500">`}</div></div>  ${`<p data-svelte-h="svelte-y2oeu7">Loading profile...</p>`}</div>  <div class="card p-4 space-y-4"><h2 class="h2" data-svelte-h="svelte-1lbpdoi">Change Password</h2> <form class="space-y-4"><div class="space-y-2 relative"><label for="newPassword" data-svelte-h="svelte-imw5ia">New Password</label> <input type="password" id="newPassword" class="input pr-8" placeholder="Password (8+ chars, mix of types)"${add_attribute("value", newPassword, 0)}> <div class="absolute right-2 top-1/2 -translate-y-1/2 cursor-help" title="Password must be at least 8 characters and include 3 of: uppercase, lowercase, number, special character" data-svelte-h="svelte-2q0niy"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle text-surface-500"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg></div></div> <div class="space-y-2 text-sm"><div${add_attribute(
    "class",
    passwordValidation.minLength ? "text-success-500" : "text-error-500",
    0
  )}>✓ At least 8 characters</div> <div${add_attribute(
    "class",
    passwordValidation.hasUpperCase ? "text-success-500" : "text-error-500",
    0
  )}>✓ One uppercase letter</div> <div${add_attribute(
    "class",
    passwordValidation.hasLowerCase ? "text-success-500" : "text-error-500",
    0
  )}>✓ One lowercase letter</div> <div${add_attribute(
    "class",
    passwordValidation.hasNumber ? "text-success-500" : "text-error-500",
    0
  )}>✓ One number</div> <div${add_attribute(
    "class",
    passwordValidation.hasSpecial ? "text-success-500" : "text-error-500",
    0
  )}>✓ One special character</div></div> <div class="space-y-2"><label for="confirmPassword" data-svelte-h="svelte-ckuh5e">Confirm Password</label> <input type="password" id="confirmPassword" class="input" placeholder="Confirm new password"${add_attribute("value", confirmPassword, 0)}> ${``}</div> ${``} ${``} <button type="submit" class="btn variant-filled-primary w-full" ${!isPasswordValid ? "disabled" : ""}>Update Password</button></form></div></div></div>`;
});
export {
  Page as default
};
