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
   </script>
   
   <form 
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
    
    <label class="label">
      <input
        type="password"
        name="password"
        placeholder="Password"
        bind:value={formData.password}
        class="input"
        required
        disabled={loading}
      />
    </label>
    
    <button 
      type="submit"
      class="btn variant-filled-primary w-full"
      disabled={loading}
    >
      {loading ? 'Creating Account...' : 'Sign up with Email'}
    </button>
   </form>