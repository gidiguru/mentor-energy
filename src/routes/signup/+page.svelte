<script lang="ts">
  import EmailSignup from '$lib/components/EmailSignup.svelte';
  import LinkedInSignup from '$lib/components/LinkedInSignup.svelte';
  import { goto } from '$app/navigation';

    export let form: {
    error?: boolean;
    existingUser?: boolean;
    email?: string;
    message?: string;
    status?: number;
    success?: boolean;
    requiresEmailConfirmation?: boolean;
  } | null = null;

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
    profile_picture: string;
  }


  let step = 1;
  let formData: FormData = {
    discipline: '',
    qualification: '',
    role: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    profile_picture: '',
  };

  let existingUserEmail: string | null = null;

  $: {
  if (form) {
    console.log('Reactive block triggered', form);
    
    if (form.success && form.requiresEmailConfirmation) {
      step = 5;
    } 
    
    // Add explicit check for existing user
    if ((form.success === true && form.existingUser === true) || 
        (form.error === true && form.existingUser === true)) {
      existingUserEmail = form.email ?? null;
      step = 6;
    }
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


$: {
  console.log('Current Step:', step);
  console.log('Form State:', form);
  console.log('Existing User Email:', existingUserEmail);
}

function handleSelection(field: keyof FormData, value: string) {
    formData[field] = value;
    step++;
}

function handleFormUpdate(event: CustomEvent) {
  const result = event.detail;
  console.log('Form update received:', result);

  if (result.type === 'success') {
    form = {
      success: true,
      requiresEmailConfirmation: result.requiresEmailConfirmation || false,
      email: result.email,
      existingUser: result.data?.existingUser || false
    };

    if (result.data) {
      formData.discipline = result.data.discipline || formData.discipline;
      formData.qualification = result.data.qualification || formData.qualification;
      formData.role = result.data.role || formData.role;
    }

    // Check for existing user and set step accordingly
    if (form.existingUser) {
      existingUserEmail = form.email ?? null;
      step = 6;
    }
  } else if (result.type === 'failure' && result.status === 400 && result.data?.existingUser) {
    form = {
      error: true,
      existingUser: true,
      email: result.data.email
    };
    existingUserEmail = result.data.email ?? null;
    step = 6;
  }
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
        
        <LinkedInSignup {formData} on:formUpdate={handleFormUpdate}/>
        
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-surface-500/30" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-surface-50-900-token">Or</span>
          </div>
        </div>

        <EmailSignup {formData} on:formUpdate={handleFormUpdate} />
      </div>
    {:else if step === 5}
      <div class="space-y-6 text-center">
        <div class="text-4xl mb-4">✉️</div>
        <h2 class="h2">Check Your Email</h2>
        <p class="text-lg">
          We've sent a confirmation email to <strong>{form?.email}</strong>
        </p>
        <p class="mt-4">
          Please click the link in the email to activate your account. 
          The link will expire in 24 hours.
        </p>
        <div class="pt-6">
          <p class="text-sm text-surface-600-300-token">
            Didn't receive the email? Check your spam folder or
            <button 
              class="text-primary-500 hover:underline" 
              on:click={() => step = 4}
            >
              try signing up again
            </button>
          </p>
        </div>
      </div>
        {:else if step === 6}
    <div class="space-y-6 text-center">
      <div class="text-4xl mb-4">🔔</div>
      <h2 class="h2">Account Already Exists</h2>
      <p class="text-lg">
        An account is already registered with the email <strong>{existingUserEmail}</strong>
      </p>
      <div class="space-y-4 mt-6">
        <button 
          class="btn variant-filled-primary w-full"
          on:click={() => {
            // Redirect to login or populate login form
            goto('/auth?email=' + encodeURIComponent(existingUserEmail || ''));
          }}
        >
          Go to Login
        </button>
        <button 
          class="btn variant-ghost-surface w-full"
          on:click={() => {
            // Reset to email entry step
            existingUserEmail = null;
            step = 4;
          }}
        >
          Try Different Email
        </button>
      </div>
      <p class="text-sm text-surface-600-300-token mt-4">
        If you've forgotten your password, you can reset it on the login page.
      </p>
    </div>
    {/if}
    

    <div class="mt-4 flex justify-between">
      {#if step > 1 && step < 5}
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

<style lang="postcss">
  .card {
    @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
  }
</style>