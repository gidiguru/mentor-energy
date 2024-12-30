<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    export let data;

    let { supabase, session, user } = data;
    let profile: any = null;
    let loading = true;
    let error: string | null = null;

    $: ({ supabase, session, user } = data);

    onMount(async () => {
        loading = true;
        try {
            if (session?.user) {
                const { data: profileData, error: fetchError } = await supabase
                    .from('users')
                    .select('first_name, last_name, email, role, discipline, qualification')
                    .eq('id', session.user.id)
                    .single();

                if (fetchError) throw fetchError;
                profile = profileData;
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
            error = err instanceof Error ? err.message : 'An unexpected error occurred';
        } finally {
            loading = false;
        }
    });

    async function signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            await invalidateAll(); 
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }
</script>

<div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Profile Card -->
        <div class="card p-4 space-y-4">
            <div class="flex justify-between items-center">
                <h2 class="h2">Profile</h2>
                <button class="btn variant-filled-error" on:click={signOut}>
                    Sign Out
                </button>
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
                <button class="btn variant-filled-surface">Edit Profile</button>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .card {
        @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
    }
</style>