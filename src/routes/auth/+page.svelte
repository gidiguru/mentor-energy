<script lang="ts">
    import { goto } from '$app/navigation';
    import LinkedInIcon from '../../lib/components/LinkedInIcon.svelte';

    async function signup() {
        await goto('/signup');
    }
</script>

<div class="container mx-auto max-w-md p-4">
    <div class="space-y-8">
        <!-- LinkedIn Sign In -->
        <div class="card p-6 variant-filled-surface text-center">
            <h3 class="h3 mb-4">Sign In with LinkedIn</h3>
            <button type="submit" class="btn variant-filled-primary w-full flex items-center justify-center gap-2">
                <LinkedInIcon size={20} />
                Sign in with LinkedIn
            </button>
        </div>

        <!-- Email Sign In -->
        <div class="card p-6 variant-filled-surface">
            <h3 class="h3 mb-4 text-center">Sign In with Email</h3>
            <form method="POST" action="?/login" class="space-y-4">
                <label class="label">
                    <span>Email</span>
                    <input 
                        name="email" 
                        type="email" 
                        class="input" 
                        placeholder="Enter your email"
                    />
                </label>
                <label class="label">
                    <span>Password</span>
                    <input 
                        name="password" 
                        type="password" 
                        class="input" 
                        placeholder="Enter your password"
                    />
                </label>
                <div class="flex flex-col gap-2">
                    <button type="submit" class="btn variant-filled-primary w-full">Sign In</button>
                    <button type="button" class="btn variant-ghost-surface w-full" on:click={signup}>
                        Create an account
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>