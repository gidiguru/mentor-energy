<script lang="ts">
  import { invalidate } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ notes, supabase, user } = data);

  async function handleSubmit(evt: SubmitEvent) {
      evt.preventDefault();
      const form = evt.target as HTMLFormElement;
      if (!form) return;

      const note = (new FormData(form).get('note') ?? '') as string;
      if (!note) return;

      const { error } = await supabase.from('notes').insert({ note });
      if (error) console.error(error);

      invalidate('supabase:db:notes');
      form.reset();
  }
</script>

<div class="container mx-auto p-4">
  <div class="card p-4 variant-filled-surface">
      <header class="card-header">
          <h1 class="h1">Private page for user: {user?.email}</h1>
          <h2 class="h2">Notes</h2>
      </header>

      <section class="p-4">
          <ul class="space-y-2">
              {#each notes as note (note.id)}
                  <li class="card p-4 variant-ghost-surface">{note.note}</li>
              {/each}
          </ul>

          <form on:submit={handleSubmit} class="mt-4">
              <label class="label">
                  <span>Add a note</span>
                  <input 
                      name="note" 
                      type="text" 
                      class="input"
                      placeholder="Enter your note..."
                  />
              </label>
              <button type="submit" class="btn variant-filled-primary mt-2">Add Note</button>
          </form>
      </section>
  </div>
</div>