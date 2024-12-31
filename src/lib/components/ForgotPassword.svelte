<!-- src/lib/components/ForgotPassword.svelte -->
<script lang="ts">
    export let onClose: () => void;
    
    let email = '';
    let message = '';
    let error = '';
    let loading = false;

    async function handleSubmit() {
        loading = true;
        error = '';
        message = '';

        try {
            const response = await fetch('/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                message = 'Password reset instructions sent to your email';
                email = '';
            } else {
                error = data.message || 'Failed to send reset instructions';
            }
        } catch (err) {
            error = 'An error occurred. Please try again.';
        } finally {
            loading = false;
        }
    }
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="card p-6 max-w-md w-full mx-4 relative">
        <button 
            class="absolute top-2 right-2 btn btn-sm variant-ghost-surface" 
            on:click={onClose}
        >
            ×
        </button>

        <h2 class="h2 mb-4">Reset Password</h2>

        <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div class="space-y-2">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    bind:value={email}
                    class="input"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                />
            </div>

            {#if error}
                <div class="alert variant-filled-error">{error}</div>
            {/if}

            {#if message}
                <div class="alert variant-filled-success">{message}</div>
            {/if}

            <button 
                type="submit" 
                class="btn variant-filled-primary w-full"
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
        </form>
    </div>
</div>