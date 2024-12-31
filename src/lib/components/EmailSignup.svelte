<script lang="ts">
    import { enhance } from '$app/forms';
    import { createEventDispatcher } from 'svelte';
   
    const dispatch = createEventDispatcher();
   
    export let formData: {
      discipline: string;
      qualification: string;
      role: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    };
   
    let loading = false;
    let passwordError = '';
    
    const passwordRequirements = {
      minLength: 8,
      hasUpperCase: false, 
      hasLowerCase: false,
      hasNumber: false,
      hasSpecial: false
    };
 
    $: passwordStrength = validatePasswordStrength(formData.password);
    
    function validatePasswordStrength(pass: string) {
      passwordRequirements.hasUpperCase = /[A-Z]/.test(pass);
      passwordRequirements.hasLowerCase = /[a-z]/.test(pass);
      passwordRequirements.hasNumber = /[0-9]/.test(pass);
      passwordRequirements.hasSpecial = /[^A-Za-z0-9]/.test(pass);
      return Object.values(passwordRequirements).filter(Boolean).length;
    }
 
    function validatePassword() {
      const isLengthValid = formData.password.length >= 8;
      const isStrengthValid = passwordStrength >= 3;

      if (!isLengthValid) {
        passwordError = 'Password must be at least 8 characters long';
        return false;
      }

      if (!isStrengthValid) {
        passwordError = 'Password must include at least 3 of the following: uppercase, lowercase, number, special character';
        return false;
      }

      passwordError = '';
      return true;
    }
   
    function handleSubmit(event: SubmitEvent) {
      if (!validatePassword()) {
        event.preventDefault();
        return;
      }
    }
   </script>
   
   <form 
     on:submit={handleSubmit}
     use:enhance={() => {
      loading = true;
      return async ({ result }) => {
        loading = false;
        
        if (result.data) {
          dispatch('formUpdate', {
            type: 'success',
            success: result.data?.success,
            requiresEmailConfirmation: result.data?.requiresEmailConfirmation, 
            email: result.data?.email,
            data: {
              existingUser: result.data?.existingUser || false
            }
          });
        } else if (result.type === 'failure' && result.status === 400) {
          dispatch('formUpdate', {
            type: 'failure',
            status: 400,
            data: {
              ...result.data,
              existingUser: result.data?.existingUser || false
            }
          });
        }
      };
    }}
    method="POST"
    action="?/signup"
    class="space-y-4"
   >
    <input type="hidden" name="discipline" value={formData.discipline}>
    <input type="hidden" name="qualification" value={formData.qualification}>
    <input type="hidden" name="role" value={formData.role}>
    
    <div class="grid grid-cols-2 gap-4">
      <label class="label">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          bind:value={formData.firstName}
          class="input"
          required
          disabled={loading}
        />
      </label>
      <label class="label">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name" 
          bind:value={formData.lastName}
          class="input"
          required
          disabled={loading}
        />
      </label>
    </div>
    
    <label class="label">
      <input
        type="email"
        name="email"
        placeholder="Email"
        bind:value={formData.email}
        class="input"
        required
        disabled={loading}
      />
    </label>
    
    <label class="label relative">
      <input
        type="password"
        name="password"
        placeholder="Password (8+ chars, mix of types)"
        bind:value={formData.password}
        class="input pr-8"
        required
        disabled={loading}
      />
      <div 
        class="absolute right-2 top-1/2 -translate-y-1/2 cursor-help" 
        title="Password must be at least 8 characters and include 3 of: uppercase, lowercase, number, special character"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle text-surface-500">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      </div>
    </label>
    
    {#if passwordError}
      <div class="alert variant-filled-error">{passwordError}</div>
    {/if}
    
    <button 
      type="submit"
      class="btn variant-filled-primary w-full"
      disabled={loading}
    >
      {loading ? 'Creating Account...' : 'Sign up with Email'}
    </button>
   </form>