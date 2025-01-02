<script lang="ts">
    import LinkedInIcon from './LinkedInIcon.svelte';
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
   
    const dispatch = createEventDispatcher();
   
    async function handleLinkedInSignup(event: MouseEvent) {
      const supabase = $page.data.supabase;
   
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'linkedin_oidc',
          options: {
            skipBrowserRedirect: false,
            redirectTo: new URL('/auth/callback', window.location.origin).toString()
          }
        });
   
        if (error) throw error;
        
      } catch (error) {
        console.error('LinkedIn sign in error:', error);
        dispatch('formUpdate', { 
          type: 'failure', 
          status: 500, 
          message: 'Unable to connect to LinkedIn. Please try again.'
        });
      }
    }
   </script>
   
   <button 
    on:click={handleLinkedInSignup}
    class="btn variant-filled-primary w-full flex items-center justify-center gap-2"
    type="button"
   >
    <LinkedInIcon size={20} />
    Sign In with LinkedIn
   </button>