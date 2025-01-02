<script lang="ts">
    import { onMount } from 'svelte';

    export let data: any;

    let { supabase, session } = data;
    let profile: any = null;
    let profilePictureUrl: string | null = null;
    let newPassword = '';
    let confirmPassword = '';
    let passwordError = '';
    let passwordSuccess = '';

    $: passwordValidation = {
        minLength: newPassword.length >= 8,
        hasUpperCase: /[A-Z]/.test(newPassword),
        hasLowerCase: /[a-z]/.test(newPassword),
        hasNumber: /[0-9]/.test(newPassword),
        hasSpecial: /[^A-Za-z0-9]/.test(newPassword)
    };

    $: isPasswordValid = 
        passwordValidation.minLength &&
        passwordValidation.hasUpperCase &&
        passwordValidation.hasLowerCase &&
        passwordValidation.hasNumber &&
        passwordValidation.hasSpecial &&
        newPassword === confirmPassword;

    function handleImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.onerror = null;
        img.src = defaultProfileIcon();
        console.error('Profile picture failed to load:', profilePictureUrl);
    }

    function defaultProfileIcon() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-surface-500">
                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
            </svg>
        `)}`;
    }

    onMount(async () => {
        if (!session?.user) return;

        try {
            const { data: profileData, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (profileError) throw profileError;

            profile = profileData;
            
            // Validate and set profile picture
            if (profile.profile_picture) {
                // Check if it's a valid URL
                try {
                    new URL(profile.profile_picture);
                    profilePictureUrl = profile.profile_picture;
                } catch {
                    console.error('Invalid profile picture URL:', profile.profile_picture);
                    profilePictureUrl = null;
                }
            }
        } catch (error) {
            console.error('Profile fetch error:', error);
        }
    });

    async function updatePassword() {
        passwordError = '';
        passwordSuccess = '';

        if (!isPasswordValid) {
            passwordError = 'Password does not meet all requirements';
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            passwordSuccess = 'Password updated successfully';
            newPassword = '';
            confirmPassword = '';
        } catch (error) {
            console.error('Password update error:', error);
            passwordError = 'Failed to update password';
        }
    }
</script>

<div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Profile Card -->
        <div class="card p-4 space-y-4">
            <div class="flex flex-col items-center mb-6">
                <!-- Profile Image Section -->
                <div class="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-surface-300">
                    {#if profilePictureUrl}
                        <img 
                            src={profilePictureUrl} 
                            alt="Profile" 
                            class="w-full h-full object-cover"
                            on:error={handleImageError}
                        />
                    {:else}
                        <img 
                            src={defaultProfileIcon()} 
                            alt="Default Profile Icon" 
                            class="w-full h-full object-cover text-surface-500"
                        />
                    {/if}
                </div>
            </div>

            <!-- Profile Information -->
            {#if profile}
            <div class="space-y-3">
                <div class="flex items-center space-x-2">
                    <span class="font-bold min-w-[100px]">Name:</span>
                    <span>{profile.first_name} {profile.last_name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold min-w-[100px]">Email:</span>
                    <span class="break-all">{profile.email}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold min-w-[100px]">Role:</span>
                    <span class="capitalize">{profile.role}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold min-w-[100px]">Discipline:</span>
                    <span class="capitalize">{profile.discipline}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-bold min-w-[100px]">Qualification:</span>
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

                <div class="space-y-2 text-sm">
                    <div class="{passwordValidation.minLength ? 'text-success-500' : 'text-error-500'}">
                        ✓ At least 8 characters
                    </div>
                    <div class="{passwordValidation.hasUpperCase ? 'text-success-500' : 'text-error-500'}">
                        ✓ One uppercase letter
                    </div>
                    <div class="{passwordValidation.hasLowerCase ? 'text-success-500' : 'text-error-500'}">
                        ✓ One lowercase letter
                    </div>
                    <div class="{passwordValidation.hasNumber ? 'text-success-500' : 'text-error-500'}">
                        ✓ One number
                    </div>
                    <div class="{passwordValidation.hasSpecial ? 'text-success-500' : 'text-error-500'}">
                        ✓ One special character
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
                    {#if confirmPassword && newPassword !== confirmPassword}
                        <p class="text-error-500 text-sm">Passwords do not match</p>
                    {/if}
                </div>

                {#if passwordError}
                    <div class="alert variant-filled-error">{passwordError}</div>
                {/if}

                {#if passwordSuccess}
                    <div class="alert variant-filled-success">{passwordSuccess}</div>
                {/if}

                <button 
                    type="submit" 
                    class="btn variant-filled-primary w-full"
                    disabled={!isPasswordValid}
                >
                    Update Password
                </button>
            </form>
        </div>
    </div>
</div>