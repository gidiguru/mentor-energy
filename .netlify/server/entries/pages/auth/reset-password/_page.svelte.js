import { c as create_ssr_component, s as subscribe, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/client.js";
const css = {
  code: ".card.svelte-16075s1{border-radius:0.5rem;border-width:1px;border-color:rgb(var(--color-surface-500) / 0.3);--tw-backdrop-blur:blur(16px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\n}.input.svelte-16075s1{width:100%;border-radius:0.5rem;border-width:1px;padding:0.5rem\n}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nimport { onMount } from \\"svelte\\";\\nimport { goto } from \\"$app/navigation\\";\\nexport let data;\\nlet { supabase } = data;\\nlet password = \\"\\";\\nlet confirmPassword = \\"\\";\\nlet code = $page.url.searchParams.get(\\"code\\") || \\"\\";\\nlet loading = false;\\nlet passwordError = \\"\\";\\nlet passwordSuccess = \\"\\";\\nconst passwordRequirements = {\\n  minLength: 8,\\n  hasUpperCase: false,\\n  hasLowerCase: false,\\n  hasNumber: false,\\n  hasSpecial: false\\n};\\n$: passwordStrength = validatePasswordStrength(password);\\nfunction validatePasswordStrength(pass) {\\n  passwordRequirements.hasUpperCase = /[A-Z]/.test(pass);\\n  passwordRequirements.hasLowerCase = /[a-z]/.test(pass);\\n  passwordRequirements.hasNumber = /[0-9]/.test(pass);\\n  passwordRequirements.hasSpecial = /[^A-Za-z0-9]/.test(pass);\\n  return Object.values(passwordRequirements).filter(Boolean).length;\\n}\\nfunction validatePassword() {\\n  const isLengthValid = password.length >= 8;\\n  const doPasswordsMatch = password === confirmPassword;\\n  const isStrengthValid = passwordStrength >= 3;\\n  return isLengthValid && doPasswordsMatch && isStrengthValid;\\n}\\nasync function handleSubmit(e) {\\n  e.preventDefault();\\n  passwordError = \\"\\";\\n  passwordSuccess = \\"\\";\\n  if (!validatePassword()) {\\n    passwordError = \\"Password does not meet requirements\\";\\n    return;\\n  }\\n  loading = true;\\n  try {\\n    const { data: { user }, error: userError } = await supabase.auth.getUser();\\n    if (userError || !user?.email) {\\n      throw new Error(\\"Could not get user details\\");\\n    }\\n    const { error: signInError } = await supabase.auth.signInWithPassword({\\n      email: user.email,\\n      password\\n    });\\n    if (!signInError) {\\n      passwordError = \\"New password cannot be the same as your current password\\";\\n      loading = false;\\n      return;\\n    }\\n    const { error } = await supabase.auth.updateUser({\\n      password\\n    });\\n    if (error) {\\n      return;\\n    }\\n    const { error: updateError } = await supabase.from(\\"users\\").update({\\n      locked: false,\\n      failed_attempts: 0\\n    }).eq(\\"email\\", user.email);\\n    if (updateError) {\\n      console.error(\\"Failed to reset lock status:\\", updateError);\\n    }\\n    passwordSuccess = \\"Password updated successfully\\";\\n    await goto(\\"/auth?reset=success\\");\\n  } catch (err) {\\n    console.error(\\"Password reset error:\\", err);\\n    passwordError = \\"An unexpected error occurred. Please try again.\\";\\n  } finally {\\n    loading = false;\\n  }\\n}\\n<\/script>\\r\\n \\r\\n<div class=\\"container mx-auto max-w-md p-4\\">\\r\\n    <div class=\\"card p-6\\">\\r\\n        <h2 class=\\"h2 mb-4\\">Reset Password</h2>\\r\\n \\r\\n        <form on:submit={handleSubmit} class=\\"space-y-4\\">\\r\\n            <div class=\\"space-y-2\\">\\r\\n                <label for=\\"password\\">New Password</label>\\r\\n                <input\\r\\n                    type=\\"password\\"\\r\\n                    id=\\"password\\"\\r\\n                    bind:value={password}\\r\\n                    class=\\"input\\"\\r\\n                    required\\r\\n                    minlength=\\"8\\"\\r\\n                />\\r\\n                <div class=\\"text-sm space-y-1\\">\\r\\n                    <div class=\\"{passwordRequirements.minLength ? 'text-success-500' : 'text-error-500'}\\">\\r\\n                        ✓ At least 8 characters\\r\\n                    </div>\\r\\n                    <div class=\\"{passwordRequirements.hasUpperCase ? 'text-success-500' : 'text-error-500'}\\">\\r\\n                        ✓ One uppercase letter\\r\\n                    </div>\\r\\n                    <div class=\\"{passwordRequirements.hasLowerCase ? 'text-success-500' : 'text-error-500'}\\">\\r\\n                        ✓ One lowercase letter\\r\\n                    </div>\\r\\n                    <div class=\\"{passwordRequirements.hasNumber ? 'text-success-500' : 'text-error-500'}\\">\\r\\n                        ✓ One number\\r\\n                    </div>\\r\\n                    <div class=\\"{passwordRequirements.hasSpecial ? 'text-success-500' : 'text-error-500'}\\">\\r\\n                        ✓ One special character\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        \\r\\n            <div class=\\"space-y-2\\">\\r\\n                <label for=\\"confirmPassword\\">Confirm Password</label>\\r\\n                <input\\r\\n                    type=\\"password\\"\\r\\n                    id=\\"confirmPassword\\"\\r\\n                    bind:value={confirmPassword}\\r\\n                    class=\\"input\\"\\r\\n                    required\\r\\n                />\\r\\n                {#if confirmPassword && password !== confirmPassword}\\r\\n                    <div class=\\"text-error-500 text-sm\\">Passwords do not match</div>\\r\\n                {/if}\\r\\n            </div>\\r\\n        \\r\\n            {#if passwordError}\\r\\n                <div class=\\"alert variant-filled-error\\">{passwordError}</div>\\r\\n            {/if}\\r\\n\\r\\n            {#if passwordSuccess}\\r\\n                <div class=\\"alert variant-filled-success\\">{passwordSuccess}</div>\\r\\n            {/if}\\r\\n        \\r\\n            <button \\r\\n                type=\\"submit\\"\\r\\n                class=\\"btn variant-filled-primary w-full\\"\\r\\n                disabled={validatePassword() || loading}\\r\\n            >\\r\\n                {loading ? 'Resetting...' : 'Reset Password'}\\r\\n            </button>\\r\\n        </form>\\r\\n    </div>\\r\\n</div>\\r\\n \\r\\n<style lang=\\"postcss\\">\\r\\n  .card {\\r\\n  \\r\\n    border-radius: 0.5rem;\\r\\n  \\r\\n    border-width: 1px;\\r\\n  \\r\\n    border-color: rgb(var(--color-surface-500) / 0.3);\\r\\n  \\r\\n    --tw-backdrop-blur: blur(16px);\\r\\n  \\r\\n    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);\\r\\n  \\r\\n    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)\\n}\\r\\n  \\r\\n  .input {\\r\\n  \\r\\n    width: 100%;\\r\\n  \\r\\n    border-radius: 0.5rem;\\r\\n  \\r\\n    border-width: 1px;\\r\\n  \\r\\n    padding: 0.5rem\\n}\\r\\n</style>"],"names":[],"mappings":"AAmJE,oBAAM,CAEJ,aAAa,CAAE,MAAM,CAErB,YAAY,CAAE,GAAG,CAEjB,YAAY,CAAE,IAAI,IAAI,mBAAmB,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAEjD,kBAAkB,CAAE,UAAU,CAE9B,uBAAuB,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAE/Q,eAAe,CAAE,IAAI,kBAAkB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,uBAAuB,CAAC,CAAC,IAAI,wBAAwB,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,IAAI,qBAAqB,CAAC,CAAC,IAAI,sBAAsB,CAAC,CAAC,IAAI,mBAAmB;AAC1Q,CAEE,qBAAO,CAEL,KAAK,CAAE,IAAI,CAEX,aAAa,CAAE,MAAM,CAErB,YAAY,CAAE,GAAG,CAEjB,OAAO,CAAE;AACb"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let passwordStrength;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let password = "";
  let confirmPassword = "";
  $page.url.searchParams.get("code") || "";
  let loading = false;
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
  function validatePassword() {
    const isLengthValid = password.length >= 8;
    const doPasswordsMatch = password === confirmPassword;
    const isStrengthValid = passwordStrength >= 3;
    return isLengthValid && doPasswordsMatch && isStrengthValid;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  passwordStrength = validatePasswordStrength(password);
  $$unsubscribe_page();
  return `<div class="container mx-auto max-w-md p-4"><div class="card p-6 svelte-16075s1"><h2 class="h2 mb-4" data-svelte-h="svelte-m0ngdx">Reset Password</h2> <form class="space-y-4"><div class="space-y-2"><label for="password" data-svelte-h="svelte-1fqrm48">New Password</label> <input type="password" id="password" class="input svelte-16075s1" required minlength="8"${add_attribute("value", password, 0)}> <div class="text-sm space-y-1"><div${add_attribute(
    "class",
    "text-success-500",
    0
  )}>✓ At least 8 characters</div> <div${add_attribute(
    "class",
    passwordRequirements.hasUpperCase ? "text-success-500" : "text-error-500",
    0
  )}>✓ One uppercase letter</div> <div${add_attribute(
    "class",
    passwordRequirements.hasLowerCase ? "text-success-500" : "text-error-500",
    0
  )}>✓ One lowercase letter</div> <div${add_attribute(
    "class",
    passwordRequirements.hasNumber ? "text-success-500" : "text-error-500",
    0
  )}>✓ One number</div> <div${add_attribute(
    "class",
    passwordRequirements.hasSpecial ? "text-success-500" : "text-error-500",
    0
  )}>✓ One special character</div></div></div> <div class="space-y-2"><label for="confirmPassword" data-svelte-h="svelte-ckuh5e">Confirm Password</label> <input type="password" id="confirmPassword" class="input svelte-16075s1" required${add_attribute("value", confirmPassword, 0)}> ${``}</div> ${``} ${``} <button type="submit" class="btn variant-filled-primary w-full" ${validatePassword() || loading ? "disabled" : ""}>${escape("Reset Password")}</button></form></div> </div>`;
});
export {
  Page as default
};
