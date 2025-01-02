<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    onMount(() => {
      // Redirect to privacy policy by default
      goto('/legal/privacy');
    });
  </script>