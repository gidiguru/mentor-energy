import { c as create_ssr_component, e as escape, a as each } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let notes;
  let supabase;
  let user;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ notes, supabase, user } = data);
  return `<div class="container mx-auto p-4"><div class="card p-4 variant-filled-surface"><header class="card-header"><h1 class="h1">Private page for user: ${escape(user?.email)}</h1> <h2 class="h2" data-svelte-h="svelte-19kqp8y">Notes</h2></header> <section class="p-4"><ul class="space-y-2">${each(notes, (note) => {
    return `<li class="card p-4 variant-ghost-surface">${escape(note.note)}</li>`;
  })}</ul> <form class="mt-4" data-svelte-h="svelte-9g25cg"><label class="label"><span>Add a note</span> <input name="note" type="text" class="input" placeholder="Enter your note..."></label> <button type="submit" class="btn variant-filled-primary mt-2">Add Note</button></form></section></div></div>`;
});
export {
  Page as default
};
