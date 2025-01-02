<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import type { Session } from '@supabase/supabase-js';
  
    export let data: {
      supabase: any;
      session: Session | null;
    };
  
    let step = 1;
    let loading = false;
    let error = '';
  
    interface FormData {
      discipline: string;
      qualification: string;
      role: string;
    }
  
    let formData: FormData = {
      discipline: '',
      qualification: '',
      role: ''
    };
  
    const disciplines = [
      { id: 'geoscience', label: 'Geoscience', active: true },
      { id: 'petroleum', label: 'Petroleum Engineering', active: false },
      { id: 'facilities', label: 'Facilities Engineering', active: false },
      { id: 'operations', label: 'Operations', active: false }
    ];
  
    const qualifications = [
      { id: 'student', label: 'Student' },
      { id: 'bachelors', label: "Bachelor's" },
      { id: 'masters', label: "Master's" },
      { id: 'doctorate', label: 'Doctorate' }
    ];
  
    const roles = [
      { id: 'mentee', label: 'Mentee' },
      { id: 'mentor', label: 'Mentor' }
    ];
  
    onMount(async () => {
      if (!data.session) {
        console.error('No session found');
        goto('/auth');
        return;
      }
  
      try {
        // Check if profile already has these fields
        const { data: profile, error: profileError } = await data.supabase
          .from('users')
          .select('discipline, qualification, role')
          .eq('id', data.session.user.id)
          .single();
  
        if (profileError) throw profileError;
  
        // If profile is complete, redirect to dashboard
        if (profile?.discipline && profile?.qualification && profile?.role) {
          goto('/dashboard');
        }
      } catch (err) {
        console.error('Error checking profile:', err);
        error = 'Failed to load profile data';
      }
    });
  
    async function handleSelection(field: keyof FormData, value: string) {
      formData[field] = value;
      
      if (field === 'role') {
        // This is the last step, submit the data
        await completeProfile();
      } else {
        step++;
      }
    }
  
    async function completeProfile() {
      if (!data.session?.user?.id) {
        error = 'No user session found';
        return;
      }
  
      loading = true;
      error = '';
  
      try {
        const { error: updateError } = await data.supabase
          .from('users')
          .update({
            discipline: formData.discipline,
            qualification: formData.qualification,
            role: formData.role,
            signup_completed: true
          })
          .eq('id', data.session.user.id);
  
        if (updateError) throw updateError;
  
        // Redirect to dashboard on success
        goto('/dashboard');
      } catch (err) {
        console.error('Profile completion error:', err);
        error = 'Failed to complete profile. Please try again.';
      } finally {
        loading = false;
      }
    }
  </script>
  
  <div class="container mx-auto p-6">
    <div class="card p-6 bg-surface-50-900-token max-w-xl mx-auto">
      {#if error}
        <div class="alert variant-filled-error mb-4">
          {error}
        </div>
      {/if}
  
      {#if step === 1}
        <div class="space-y-4">
          <h2 class="h2 text-center mb-6">Which discipline are you interested in?</h2>
          <div class="grid grid-cols-2 gap-4">
            {#each disciplines as discipline}
              <button
                on:click={() => discipline.active && handleSelection('discipline', discipline.id)}
                class="btn {discipline.active ? 'variant-filled-primary' : 'variant-ghost-surface opacity-50 cursor-not-allowed'}"
                disabled={!discipline.active || loading}
              >
                {discipline.label}
              </button>
            {/each}
          </div>
        </div>
      {:else if step === 2}
        <div class="space-y-4">
          <h2 class="h2 text-center mb-6">What is your highest qualification?</h2>
          <div class="grid grid-cols-2 gap-4">
            {#each qualifications as qual}
              <button
                on:click={() => handleSelection('qualification', qual.id)}
                class="btn variant-filled-primary"
                disabled={loading}
              >
                {qual.label}
              </button>
            {/each}
          </div>
        </div>
      {:else if step === 3}
        <div class="space-y-4">
          <h2 class="h2 text-center mb-6">Are you interested in being...</h2>
          <div class="grid grid-cols-2 gap-4">
            {#each roles as role}
              <button
                on:click={() => handleSelection('role', role.id)}
                class="btn variant-filled-primary"
                disabled={loading}
              >
                {role.label}
              </button>
            {/each}
          </div>
        </div>
      {/if}
  
      <div class="mt-4 flex justify-between">
        {#if step > 1}
          <button
            on:click={() => step--}
            class="btn variant-ghost-primary"
            disabled={loading}
          >
            Back
          </button>
        {/if}
      </div>
    </div>
  </div>
  
  <style lang="postcss">
    .card {
      @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
    }
  </style>