<script lang="ts">
    import { enhance } from '$app/forms';
    import LinkedInIcon from './LinkedInIcon.svelte';
  
    export let formData: {
      discipline: string;
      qualification: string;
      role: string;
    };
  </script>
  
  <form use:enhance method="POST" action="?/linkedinSignup" class="space-y-4">
    <input type="hidden" name="discipline" value={formData.discipline}>
    <input type="hidden" name="qualification" value={formData.qualification}>
    <input type="hidden" name="role" value={formData.role}>
    
    <button type="submit" class="btn variant-filled-primary w-full flex items-center justify-center gap-2">
      <LinkedInIcon size={20} />
      Sign up with LinkedIn
    </button>
  </form>