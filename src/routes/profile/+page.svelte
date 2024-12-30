<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    export let data;

    let { supabase, session, user } = data;
    let profile: any = null;

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

        <!-- Rest of the component remains the same -->
    </div>
</div>