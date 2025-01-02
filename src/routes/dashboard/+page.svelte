<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let data;

    let { supabase, session, user } = data;
    let profile: any = null;
    let profilePictureUrl: string | null = null;
    let loading = true;
    let error: string | null = null;
    let imageFile: File | null = null;
    let isUploading = false;

    $: ({ supabase, session, user } = data);

    function defaultProfileIcon() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-surface-500">
                <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
            </svg>
        `)}`;
    }

    function handleImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.onerror = null;
        img.src = defaultProfileIcon();
        console.error('Profile picture failed to load:', profilePictureUrl);
    }

    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            imageFile = input.files[0];
            uploadProfilePicture();
        }
    }

    async function uploadProfilePicture() {
    if (!imageFile || !session?.user) return;

    isUploading = true;
    try {
        // Generate a unique filename
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${session.user.id}/profile.${fileExt}`;
        const filePath = fileName;

        // Upload to Supabase storage
        const { error: uploadError } = await supabase.storage
            .from('profile-pictures')
            .upload(filePath, imageFile, { 
                upsert: true,
                contentType: imageFile.type 
            });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data } = supabase.storage
            .from('profile-pictures')
            .getPublicUrl(filePath);

        // Update user profile with new picture URL
        const { error: profileUpdateError } = await supabase
            .from('users')
            .update({ profile_picture: data.publicUrl })
            .eq('id', session.user.id);

        if (profileUpdateError) throw profileUpdateError;

        // Update local state
        profilePictureUrl = data.publicUrl;
        imageFile = null;
    } catch (error) {
        console.error('Profile picture upload error:', error);
    } finally {
        isUploading = false;
    }
}

    onMount(async () => {
        loading = true;
        try {
            if (session?.user) {
                const { data: profileData, error: fetchError } = await supabase
                    .from('users')
                    .select('first_name, last_name, email, role, discipline, qualification, profile_picture')
                    .eq('id', session.user.id)
                    .single();

                if (fetchError) throw fetchError;
                profile = profileData;
                
                // Set profile picture
                if (profile.profile_picture) {
                    try {
                        new URL(profile.profile_picture);
                        profilePictureUrl = profile.profile_picture;
                    } catch {
                        console.error('Invalid profile picture URL:', profile.profile_picture);
                        profilePictureUrl = null;
                    }
                }
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            error = err instanceof Error ? err.message : 'An unexpected error occurred';
        } finally {
            loading = false;
        }
    });
</script>

<div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Profile Card -->
        <div class="card p-4 space-y-4">
            <div class="flex flex-col items-center mb-6">
                <!-- Profile Image Section -->
                <div class="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-surface-300 group">
                    {#if loading}
                        <div class="w-full h-full bg-surface-200 flex items-center justify-center">
                            <span>Loading...</span>
                        </div>
                    {:else if profilePictureUrl}
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
                    
                    <!-- Upload Overlay -->
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <label 
                            class="cursor-pointer text-white text-sm flex items-center justify-center w-full h-full"
                            title="Upload Profile Picture"
                        >
                            <input 
                                type="file" 
                                accept="image/*" 
                                class="hidden" 
                                on:change={handleFileSelect}
                            />
                            {#if isUploading}
                                <span>Uploading...</span>
                            {:else}
                                <span>Upload</span>
                            {/if}
                        </label>
                    </div>
                </div>

                {#if profile}
                    <div class="text-center">
                        <h3 class="h3">{profile.first_name} {profile.last_name}</h3>
                        <p class="text-surface-600-300-token">{profile.email}</p>
                    </div>
                {/if}
            </div>
            
            {#if loading}
                <p>Loading profile...</p>
            {:else if error}
                <div class="text-error-500">
                    {error}
                </div>
            {:else if profile}
                <div class="space-y-2">
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
            {/if}
        </div>

        <!-- Stats Card -->
        <div class="card p-4 space-y-4">
            <h2 class="h2">Activity</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 rounded bg-surface-100-800-token">
                    <div class="text-2xl font-bold">0</div>
                    <div class="text-sm">Sessions</div>
                </div>
                <div class="text-center p-4 rounded bg-surface-100-800-token">
                    <div class="text-2xl font-bold">0</div>
                    <div class="text-sm">Projects</div>
                </div>
                <div class="text-center p-4 rounded bg-surface-100-800-token">
                    <div class="text-2xl font-bold">0</div>
                    <div class="text-sm">Resources</div>
                </div>
                <div class="text-center p-4 rounded bg-surface-100-800-token">
                    <div class="text-2xl font-bold">0</div>
                    <div class="text-sm">Certificates</div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="card p-4 space-y-4">
            <h2 class="h2">Quick Actions</h2>
            <div class="grid gap-2">
                <button class="btn variant-filled-primary">Schedule Session</button>
                <button class="btn variant-filled-secondary">Browse Resources</button>
                <button class="btn variant-filled-tertiary">View Projects</button>
                <button class="btn variant-filled-surface" on:click={() => goto('/profile')}
            >
                Edit Profile
            </button>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .card {
        @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
    }
</style>