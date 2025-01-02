// components/GoogleSignIn.svelte
<script lang="ts">
  import { page } from '$app/stores';
  
  async function signInWithGoogle() {
    const { data, error } = await $page.data.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  }
</script>