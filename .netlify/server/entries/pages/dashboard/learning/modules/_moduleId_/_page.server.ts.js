import { e as error } from "../../../../../../chunks/index.js";
const load = async ({ params, locals }) => {
  console.log(`[Module Load] Starting load for module: ${params.moduleId}`);
  const { session, user } = await locals.safeGetSession();
  console.log("[Module Load] Session check", {
    hasSession: !!session,
    hasUser: !!user,
    userId: user?.id
  });
  if (!session || !user) {
    console.warn("[Module Load] Unauthorized - No session or user");
    throw error(401, "Unauthorized");
  }
  try {
    console.log("[Module Load] Fetching module details");
    const { data: module, error: moduleError } = await locals.supabase.from("learning_modules").select("*").eq("module_id", params.moduleId).single();
    console.log("[Module Load] Module fetch result", {
      moduleId: params.moduleId,
      moduleFound: !!module,
      error: moduleError
    });
    if (moduleError || !module) {
      console.error("[Module Load] Module fetch failed", moduleError);
      throw error(404, "Module not found");
    }
    console.log("[Module Load] Fetching module progress", {
      userId: user.id,
      moduleId: module.id
    });
    const { data: progress, error: progressError } = await locals.supabase.from("module_progress").select("*").match({
      user_id: user.id,
      module_id: module.id
    }).maybeSingle();
    console.log("[Module Load] Progress fetch result", {
      progressFound: !!progress,
      error: progressError
    });
    if (progressError) {
      console.error("[Module Load] Progress fetch failed", progressError);
      const { data: newProgress, error: insertError } = await locals.supabase.from("module_progress").insert({
        user_id: user.id,
        module_id: module.id,
        progress: 0,
        completed: false
      }).select().single();
      if (insertError) {
        console.error("[Module Load] Failed to create progress", insertError);
      }
    }
    return {
      module,
      progress: progress || null,
      moduleId: module.id
      // Return the actual module ID
    };
  } catch (err) {
    console.error("[Module Load] Unexpected error", {
      error: err instanceof Error ? err.message : err,
      stack: err instanceof Error ? err.stack : null
    });
    throw error(500, "Failed to load module");
  }
};
export {
  load
};
