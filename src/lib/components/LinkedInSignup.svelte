<script lang="ts">
    import LinkedInIcon from './LinkedInIcon.svelte';
    import { createEventDispatcher } from 'svelte';
    import { page } from '$app/stores';
   
    export let formData: {
      discipline: string;
      qualification: string; 
      role: string;
    };
   
    const dispatch = createEventDispatcher();
   

    async function handleLinkedInSignup() {
  const supabase = $page.data.supabase;

  try {
    // Store formData and add profile picture flag
    localStorage.setItem('signupData', JSON.stringify({
      discipline: formData.discipline,
      qualification: formData.qualification,
      role: formData.role,
      capture_profile_picture: true  // New flag to signal profile picture capture
    }));

    const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'linkedin_oidc',
          options: {
            skipBrowserRedirect: false,
            redirectTo: new URL('/auth/callback', window.location.origin).toString()
          }
        });
   

    if (error) throw error;
  } catch (error) {
    console.error('LinkedIn signup error:', error);
    dispatch('formUpdate', {
      type: 'failure'
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
    Sign up with LinkedIn
   </button>