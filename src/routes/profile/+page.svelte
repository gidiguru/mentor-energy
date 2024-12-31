<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    export let data;

    let { supabase, session, user } = data;
    let profile: any = null;
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';
    let passwordError = '';
    let passwordSuccess = '';

    const passwordRequirements = {
      minLength: 8,
      hasUpperCase: false, 
      hasLowerCase: false,
      hasNumber: false,
      hasSpecial: false
    };

    $: passwordStrength = validatePasswordStrength(newPassword);
    
    function validatePasswordStrength(pass: string) {
      passwordRequirements.hasUpperCase = /[A-Z]/.test(pass);
      passwordRequirements.hasLowerCase = /[a-z]/.test(pass);
      passwordRequirements.hasNumber = /[0-9]/.test(pass);
      passwordRequirements.hasSpecial = /[^A-Za-z0-9]/.test(pass);
      return Object.values(passwordRequirements).filter(Boolean).length;
    }

    $: ({ supabase, session, user } = data);

    onMount(async () => {
        if (session?.user) {
            try {
                const { data: profileData, error } = await supabase
                    .from('users')
                    .select('first_name, last_name, email, role, discipline, qualification')
                    .eq('id', session.user.id)
                    .single();

                if (error) throw error;
                profile = profileData;
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
    });

    async function updatePassword() {
        passwordError = '';
        passwordSuccess = '';

        if (newPassword !== confirmPassword) {
            passwordError = 'New passwords do not match';
            return;
        }

        if (newPassword.length < 8) {
            passwordError = 'Password must be at least 8 characters';
            return;
        }

        const strength = validatePasswordStrength(newPassword);
        if (strength < 3) {
            passwordError = 'Password must include at least 3 of: uppercase, lowercase, number, special character';
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            passwordSuccess = 'Password updated successfully';
            currentPassword = '';
            newPassword = '';
            confirmPassword = '';
        } catch (error) {
            console.error('Error updating password:', error);
            //passwordError = error.message || 'Error updating password';
        }
    }
</script>

<div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Profile Card -->
        <div class="card p-4 space-y-4">
            <div class="flex justify-between items-center">
                <h2 class="h2">Profile</h2>
            </div>
            
            {#if profile}
            <div class="space-y-2">
                <div class="flex items-center space-x-2">
                    <span class="font-bold">Name:</span>
                    <span>{profile.first_name} {profile.last_name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold">Email:</span>
                    <span>{profile.email}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold">Role:</span>
                    <span class="capitalize">{profile.role}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold">Discipline:</span>
                    <span class="capitalize">{profile.discipline}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold">Qualification:</span>
                    <span class="capitalize">{profile.qualification}</span>
                </div>
            </div>
            {:else}
            <p>Loading profile...</p>
            {/if}
        </div>

        <!-- Password Reset Card -->
        <div class="card p-4 space-y-4">
            <h2 class="h2">Change Password</h2>
            
            <form on:submit|preventDefault={updatePassword} class="space-y-4">
                <div class="space-y-2 relative">
                    <label for="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        bind:value={newPassword}
                        class="input pr-8"
                        placeholder="Password (8+ chars, mix of types)"
                    />
                    <div 
                        class="absolute right-2 top-1/2 -translate-y-1/2 cursor-help" 
                        title="Password must be at least 8 characters and include 3 of: uppercase, lowercase, number, special character"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle text-surface-500">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <path d="M12 17h.01"/>
                        </svg>
                    </div>
                </div>

                <div class="space-y-2">
                    <label for="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        bind:value={confirmPassword}
                        class="input"
                        placeholder="Confirm new password"
                    />
                </div>

                {#if passwordError}
                    <div class="alert variant-filled-error">{passwordError}</div>
                {/if}

                {#if passwordSuccess}
                    <div class="alert variant-filled-success">{passwordSuccess}</div>
                {/if}

                <button type="submit" class="btn variant-filled-primary w-full">
                    Update Password
                </button>
            </form>
        </div>
    </div>
</div>