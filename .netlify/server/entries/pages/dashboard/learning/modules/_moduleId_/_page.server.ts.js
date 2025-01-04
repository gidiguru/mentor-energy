import { e as error } from "../../../../../../chunks/index.js";
const load = async ({ params, locals }) => {
  const { session } = await locals.safeGetSession();
  if (!session) {
    throw error(401, "Unauthorized");
  }
  try {
    const { data: module, error: moduleError } = await locals.supabase.from("learning_modules").select("*").eq("id", params.moduleId).single();
    if (moduleError) throw moduleError;
    const { data: progress, error: progressError } = await locals.supabase.from("user_progress").select("*").eq("user_id", session.user.id).eq("module_id", params.moduleId).single();
    if (progressError && progressError.code !== "PGRST116") {
      throw progressError;
    }
    return {
      module,
      progress,
      moduleId: params.moduleId
    };
  } catch (err) {
    console.error("Error loading module:", err);
    throw error(500, "Failed to load module");
  }
};
export {
  load
};
