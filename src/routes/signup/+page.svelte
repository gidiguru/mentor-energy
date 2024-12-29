<script lang="ts">
  import { enhance } from '$app/forms';
  import LinkedInIcon from '../../../src/lib/components/LinkedInIcon.svelte';
  import type { ActionData } from './$types';

  export let form: FormData | null = null;

  interface FormData {
    discipline: string;
    qualification: string;
    role: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    error?: string;
    message?: string;
    missing?: string;
  }

  let step = 1;
  let formData: FormData = {
    discipline: '',
    qualification: '',
    role: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  $: {
    if (form?.error) {
      console.error(form.error);
    }
    if (form?.message) {
      console.log(form.message);
    }
  }

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

  function handleSelection(field: keyof FormData, value: string) {
    formData[field] = value;
    step++;
  }
</script>

<div class="container mx-auto p-6">
  <div class="card p-6 bg-surface-50-900-token">
    {#if form?.error}
      <div class="p-4 mb-4 bg-error-500/20 text-error-500 rounded">
        {form.error}
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
              disabled={!discipline.active}
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
            >
              {role.label}
            </button>
          {/each}
        </div>
      </div>
    {:else if step === 4}
      <div class="space-y-6">
        <h2 class="h2 text-center mb-6">Create your account</h2>
        
        <form use:enhance method="POST" action="?/linkedinSignup" class="space-y-4">
          <input type="hidden" name="discipline" value={formData.discipline}>
          <input type="hidden" name="qualification" value={formData.qualification}>
          <input type="hidden" name="role" value={formData.role}>
          
          <button type="submit" class="btn variant-filled-primary w-full flex items-center justify-center gap-2">
            <LinkedInIcon size={20} />
            Sign up with LinkedIn
          </button>
        </form>
        
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-surface-500/30" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-surface-50-900-token">Or</span>
          </div>
        </div>

        <form use:enhance method="POST" action="?/signup" class="space-y-4">
          <input type="hidden" name="discipline" value={formData.discipline}>
          <input type="hidden" name="qualification" value={formData.qualification}>
          <input type="hidden" name="role" value={formData.role}>
          
          <div class="grid grid-cols-2 gap-4">
            <label class="label">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                bind:value={formData.firstName}
                class="input"
                required
              />
            </label>
            <label class="label">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                bind:value={formData.lastName}
                class="input"
                required
              />
            </label>
          </div>
          
          <label class="label">
            <input
              type="email"
              name="email"
              placeholder="Email"
              bind:value={formData.email}
              class="input"
              required
            />
          </label>
          
          <label class="label">
            <input
              type="password"
              name="password"
              placeholder="Password"
              bind:value={formData.password}
              class="input"
              required
            />
          </label>
          
          <button type="submit" class="btn variant-filled-primary w-full">
            Sign up with Email
          </button>
        </form>
      </div>
    {/if}

    <div class="mt-4 flex justify-between">
      {#if step > 1}
        <button
          on:click={() => step--}
          class="btn variant-ghost-primary"
        >
          Back
        </button>
      {/if}
    </div>
  </div>
</div>