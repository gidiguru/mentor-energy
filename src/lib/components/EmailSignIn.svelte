<script lang="ts">
    import { goto } from '$app/navigation';
    import type { SupabaseClient } from '@supabase/supabase-js';
    import { onMount } from 'svelte';
 
    interface ComponentProps {
        data: { supabase: SupabaseClient };
    }
 
    export let data: ComponentProps['data'];
    export let onForgotPassword: () => void;
    
    let email = '';
    let password = '';
    let loading = false;
    let error = '';
    let accountLocked = false;
 
    onMount(async () => {
        if (email) {
            const { data: userData } = await data.supabase
                .from('users')
                .select('locked, failed_attempts')
                .eq('email', email)
                .single();
            
            if (userData?.locked) {
                accountLocked = true;
                error = 'Account locked. Please use password reset.';
            }
        }
    });
 
    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        loading = true;
        error = '';
 
        // Check if account is already locked
        const { data: userData } = await data.supabase
            .from('users')
            .select('locked, failed_attempts')
            .eq('email', email)
            .single();
 
        if (userData?.locked) {
            error = 'Account locked. Please use password reset.';
            loading = false;
            return;
        }
 
        const { data: authData, error: signInError } = await data.supabase.auth.signInWithPassword({
            email,
            password
        });
 
        if (signInError) {
            const newAttempts = (userData?.failed_attempts || 0) + 1;
            
            if (newAttempts >= 3) {
                await data.supabase
                    .from('users')
                    .update({ 
                        locked: true,
                        failed_attempts: newAttempts 
                    })
                    .eq('email', email);
                
                error = 'Account locked. Please use password reset.';
                accountLocked = true;
            } else {
                await data.supabase
                    .from('users')
                    .update({ failed_attempts: newAttempts })
                    .eq('email', email);
                
                error = `Incorrect email or password. ${3 - newAttempts} attempts remaining`;
            }
            loading = false;
            return;
        }
 
        // Reset failed attempts on successful login
        await data.supabase
            .from('users')
            .update({ 
                failed_attempts: 0,
                locked: false 
            })
            .eq('email', email);
 
        await goto('/dashboard');
    }
 
    async function signup() {
        await goto('/signup');
    }
 </script>
 
 <div class="card p-6 variant-filled-surface">
    <h3 class="h3 mb-4 text-center">Sign In with Email</h3>
    
    <form on:submit={handleSubmit} class="space-y-4">
        <label class="label">
            <span>Email</span>
            <input
                name="email"
                type="email"
                class="input"
                bind:value={email}
                placeholder="Enter your email"
                required
            />
        </label>
 
        <label class="label">
            <span>Password</span>
            <input
                name="password"
                type="password"
                class="input" 
                bind:value={password}
                placeholder="Enter your password"
                required
            />
        </label>
 
        {#if error}
            <div class="alert variant-filled-error">{error}</div>
        {/if}
 
        <div class="flex flex-col gap-2">
            <button 
                type="submit"
                class="btn variant-filled-primary w-full"
                disabled={loading}
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
 
            <button 
                type="button"
                class="btn variant-ghost-surface w-full"
                on:click={signup}
            >
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