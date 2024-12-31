<script lang="ts">
    import EmailSignIn from '$lib/components/EmailSignIn.svelte';
    import LinkedInSignIn from '$lib/components/LinkedInSignIn.svelte';
    import ForgotPassword from '$lib/components/ForgotPassword.svelte';

    let showForgotPassword = false;
    
    async function handleLinkedInSignIn() {
        // LinkedIn sign in logic will go here
        console.log('LinkedIn sign in clicked');
    }
</script>

<div class="container mx-auto max-w-md p-4">
    <div class="space-y-8">
        <LinkedInSignIn onSignIn={handleLinkedInSignIn} />
        <EmailSignIn onForgotPassword={() => { 
            showForgotPassword = true;
            return;
        }} />
    </div>
</div>

{#if showForgotPassword}
    <ForgotPassword onClose={() => showForgotPassword = false} />
{/if}