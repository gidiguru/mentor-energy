<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    export let data;
 
    let { supabase } = data;
    let password = '';
    let confirmPassword = '';
    let code = $page.url.searchParams.get('code') || '';
    let loading = false;
    let passwordError = '';
    let passwordSuccess = '';
 
    const passwordRequirements = {
      minLength: 8,
      hasUpperCase: false, 
      hasLowerCase: false,
      hasNumber: false,
      hasSpecial: false
    };
 
    $: passwordStrength = validatePasswordStrength(password);
    
    function validatePasswordStrength(pass: string) {
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
 
    async function handleSubmit(e: Event) {
  e.preventDefault();
  passwordError = '';
  passwordSuccess = '';
  
  if (!validatePassword()) {
    passwordError = 'Password does not meet requirements';
    return;
  }
  
  loading = true;
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user?.email) {
      throw new Error('Could not get user details');
    }

    // Try signing in with the new password to see if it matches current
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: password
    });

    if (!signInError) {
      passwordError = 'New password cannot be the same as your current password';
      loading = false;
      return;
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      // Existing error handling...
      return;
    }

    // Reset lock status
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        locked: false,
        failed_attempts: 0 
      })
      .eq('email', user.email);

    if (updateError) {
      console.error('Failed to reset lock status:', updateError);
    }
    
    passwordSuccess = 'Password updated successfully';
    await goto('/auth?reset=success');
  } catch (err) {
    console.error('Password reset error:', err);
    passwordError = 'An unexpected error occurred. Please try again.';
  } finally {
    loading = false;
  }
}
</script>
 
<div class="container mx-auto max-w-md p-4">
    <div class="card p-6">
        <h2 class="h2 mb-4">Reset Password</h2>
 
        <form on:submit={handleSubmit} class="space-y-4">
            <div class="space-y-2">
                <label for="password">New Password</label>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    class="input"
                    required
                    minlength="8"
                />
                <div class="text-sm space-y-1">
                    <div class="{passwordRequirements.minLength ? 'text-success-500' : 'text-error-500'}">
                        ✓ At least 8 characters
                    </div>
                    <div class="{passwordRequirements.hasUpperCase ? 'text-success-500' : 'text-error-500'}">
                        ✓ One uppercase letter
                    </div>
                    <div class="{passwordRequirements.hasLowerCase ? 'text-success-500' : 'text-error-500'}">
                        ✓ One lowercase letter
                    </div>
                    <div class="{passwordRequirements.hasNumber ? 'text-success-500' : 'text-error-500'}">
                        ✓ One number
                    </div>
                    <div class="{passwordRequirements.hasSpecial ? 'text-success-500' : 'text-error-500'}">
                        ✓ One special character
                    </div>
                </div>
            </div>
        
            <div class="space-y-2">
                <label for="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    bind:value={confirmPassword}
                    class="input"
                    required
                />
                {#if confirmPassword && password !== confirmPassword}
                    <div class="text-error-500 text-sm">Passwords do not match</div>
                {/if}
            </div>
        
            {#if passwordError}
                <div class="alert variant-filled-error">{passwordError}</div>
            {/if}

            {#if passwordSuccess}
                <div class="alert variant-filled-success">{passwordSuccess}</div>
            {/if}
        
            <button 
                type="submit"
                class="btn variant-filled-primary w-full"
                disabled={validatePassword() || loading}
            >
                {loading ? 'Resetting...' : 'Reset Password'}
            </button>
        </form>
    </div>
</div>
 
<style lang="postcss">
  .card {
    @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
  }
  
  .input {
    @apply w-full p-2 border rounded-lg;
  }
</style>