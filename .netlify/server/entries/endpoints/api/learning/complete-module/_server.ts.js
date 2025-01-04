import { j as json } from "../../../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  const { session } = await locals.safeGetSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const { moduleId, answers } = await request.json();
    const { error: progressError } = await locals.supabase.from("user_progress").upsert({
      user_id: session.user.id,
      module_id: moduleId,
      completed: true,
      answers,
      completed_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (progressError) throw progressError;
    return json({ success: true });
  } catch (error) {
    console.error("Error saving module progress:", error);
    return json({ error: "Failed to save progress" }, { status: 500 });
  }
};
export {
  POST
};
