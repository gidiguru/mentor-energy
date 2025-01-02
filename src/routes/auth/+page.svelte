<script lang="ts">
    import EmailSignIn from '$lib/components/EmailSignIn.svelte';
    import LinkedInSignIn from '$lib/components/LinkedInSignIn.svelte';
    import ForgotPassword from '$lib/components/ForgotPassword.svelte';
    import { goto } from '$app/navigation';

    export let data;
    let showForgotPassword = false;
    let error = '';
    
    const { supabase } = data;

    async function handleLinkedInSignIn() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'linkedin_oidc',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });
            if (error) throw error;
        } catch (e) {
            console.error('LinkedIn signin error:', e);
            error = 'Failed to sign in with LinkedIn';
        }
    }

    async function handleGoogleSignIn() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
            });
            if (error) throw error;
        } catch (e) {
            console.error('Google signin error:', e);
            error = 'Failed to sign in with Google';
        }
    }
</script>

<div class="container mx-auto max-w-md p-4">
    <div class="space-y-8">
        {#if error}
            <div class="alert variant-filled-error">{error}</div>
        {/if}

        <LinkedInSignIn onSignIn={handleLinkedInSignIn} />

        <div class="space-y-4">

 
        </div>

        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-surface-100-800-token">Or</span>
            </div>
        </div>

        <EmailSignIn 
            data={{ supabase }} 
            onForgotPassword={() => showForgotPassword = true} 
        />
    </div>
</div>

{#if showForgotPassword}
    <ForgotPassword onClose={() => showForgotPassword = false} />
{/if}