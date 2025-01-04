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
            <button 
                on:click={handleGoogleSignIn}
                class="btn variant-filled-primary w-full flex items-center justify-center gap-2" 
            >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Sign in with Google
            </button>
 
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