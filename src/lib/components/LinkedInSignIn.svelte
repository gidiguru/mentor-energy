<script lang="ts">
    import LinkedInIcon from './LinkedInIcon.svelte';
    
    export let onSignIn: () => void = () => {};
</script>

<div class="card p-6 variant-filled-surface text-center">
    <h3 class="h3 mb-4">Sign In with LinkedIn</h3>
    <button 
        type="button" 
        class="btn variant-filled-primary w-full flex items-center justify-center gap-2"
        on:click={onSignIn}
    >
        <LinkedInIcon size={20} />
        Sign in with LinkedIn
    </button>
</div>
