// src/routes/auth/complete-signup/+page.svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Session } from '@supabase/supabase-js';
  
  export let data: {
    supabase: any;
    session: Session | null;
  };

  onMount(async () => {
    try {
      // Check if we have a session
      if (!data.session) {
        console.error('No session found');
        goto('/auth');
        return;
      }

      // Get stored signup data
      const signupDataStr = localStorage.getItem('signupData');
      console.log('Retrieved signup data:', signupDataStr);
      
      if (!signupDataStr) {
        console.error('No signup data found');
        goto('/auth');
        return;
      }
      
      const signupData = JSON.parse(signupDataStr);
      
      console.log('Updating user with data:', signupData);
      
      // Update user record with the stored data
      const { error } = await data.supabase
        .from('users')
        .update({
          discipline: signupData.discipline,
          qualification: signupData.qualification,
          role: signupData.role
        })
        .eq('id', data.session.user.id);
        
      if (error) {
        console.error('Update error:', error);
        throw error;
      }
      
      // Clear stored data
      localStorage.removeItem('signupData');
      
      // Redirect to dashboard
      goto('/dashboard');
    } catch (error) {
      console.error('Complete signup error:', error);
      goto('/auth/error');
    }
  });
</script>

<div class="container mx-auto p-6 text-center">
  {#if !data.session}
    <p>Redirecting to login...</p>
  {:else}
    <h2 class="h2">Completing your signup...</h2>
    <p>Please wait while we finish setting up your account.</p>
  {/if}
</div>