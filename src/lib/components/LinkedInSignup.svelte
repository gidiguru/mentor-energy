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
    // First store the formData in localStorage before OAuth redirect
    localStorage.setItem('signupData', JSON.stringify({
      discipline: formData.discipline,
      qualification: formData.qualification,
      role: formData.role
    }));

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        scopes: 'openid profile email',
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          signup: 'true' // Add flag to identify this is a signup
        }
      }
    });

    if (error) throw error;
  } catch (error) {
    console.error('LinkedIn signup error:', error);
    dispatch('formUpdate', {
      type: 'failure',
     // error: error.message
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