<script lang="ts">
    import { enhance } from '$app/forms';
    import { LinkedIn } from 'lucide-svelte';
  
    let step = 1;
    let formData = {
      discipline: '',
      qualification: '',
      role: '',
      email: '',
      education: '',
      workHistory: ''
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
  
    function handleSelection(field: string, value: string) {
      formData[field] = value;
      step++;
    }
  
    async function handleEmailSubmit(event: SubmitEvent) {
      // Form submission logic will go here
      console.log('Form submitted:', formData);
    }
  
    async function handleLinkedInLogin() {
      // LinkedIn OAuth integration will go here
      console.log('LinkedIn login initiated');
    }
  </script>
  
  <div class="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg">
    <div class="p-6">
      <!-- Progress Bar -->
      <div class="flex justify-between mb-6">
        {#each Array(4) as _, i}
          <div
            class="h-2 flex-1 mx-1 rounded transition-colors"
            class:bg-blue-600={i + 1 <= step}
            class:bg-gray-200={i + 1 > step}
          />
        {/each}
      </div>
  
      <!-- Step Content -->
      {#if step === 1}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-center mb-6">
            Which discipline are you interested in?
          </h3>
          <div class="grid grid-cols-2 gap-4">
            {#each disciplines as { id, label, active }}
              <button
                on:click={() => active && handleSelection('discipline', id)}
                class="p-4 rounded-lg transition-colors text-center"
                class:bg-blue-600={active}
                class:text-white={active}
                class:bg-gray-100={!active}
                class:opacity-50={!active}
                class:cursor-not-allowed={!active}
                disabled={!active}
              >
                {label}
              </button>
            {/each}
          </div>
        </div>
  
      {:else if step === 2}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-center mb-6">
            What is your highest qualification?
          </h3>
          <div class="grid grid-cols-2 gap-4">
            {#each qualifications as { id, label }}
              <button
                on:click={() => handleSelection('qualification', id)}
                class="p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {label}
              </button>
            {/each}
          </div>
        </div>
  
      {:else if step === 3}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-center mb-6">
            Are you interested in being...
          </h3>
          <div class="grid grid-cols-2 gap-4">
            {#each roles as { id, label }}
              <button
                on:click={() => handleSelection('role', id)}
                class="p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {label}
              </button>
            {/each}
          </div>
        </div>
  
      {:else if step === 4}
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-center mb-6">
            Sign up to get started
          </h3>
          
          <!-- LinkedIn Button -->
          <button
            on:click={handleLinkedInLogin}
            class="w-full p-4 rounded-lg bg-[#0077b5] text-white hover:bg-[#006097] transition-colors flex items-center justify-center gap-2"
          >
            <LinkedIn class="h-5 w-5" />
            Sign up with LinkedIn
          </button>
  
          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-gray-500">
                or continue with email
              </span>
            </div>
          </div>
  
          <!-- Email Form -->
          <form
            on:submit|preventDefault={handleEmailSubmit}
            class="space-y-4"
            use:enhance
          >
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                bind:value={formData.email}
                placeholder="you@example.com"
                required
                class="w-full p-2 border rounded-lg"
              />
            </div>
  
            <div class="space-y-2">
              <label for="education" class="block text-sm font-medium">
                Education History
              </label>
              <input
                id="education"
                type="text"
                bind:value={formData.education}
                placeholder="Your educational background"
                required
                class="w-full p-2 border rounded-lg"
              />
            </div>
  
            <div class="space-y-2">
              <label for="workHistory" class="block text-sm font-medium">
                Work History
              </label>
              <input
                id="workHistory"
                type="text"
                bind:value={formData.workHistory}
                placeholder="Your work experience"
                required
                class="w-full p-2 border rounded-lg"
              />
            </div>
  
            <button
              type="submit"
              class="w-full p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      {/if}
    </div>
  </div>