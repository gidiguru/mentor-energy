<script lang="ts">
    import { goto } from '$app/navigation';

    export let onForgotPassword: () => void;

    async function signup() {
        await goto('/signup');
    }
</script>

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
            <button 
    type="button" 
    class="btn variant-ghost-surface" 
    on:click={onForgotPassword}
>
    Forgot Password?
</button>
        </div>
    </form>
</div>
