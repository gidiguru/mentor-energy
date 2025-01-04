import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  const { session, user } = await locals.safeGetSession();
  if (!session) {
    throw redirect(303, "/auth");
  }
  try {
    const { data: profile, error: profileError } = await locals.supabase.from("users").select("*").eq("id", session.user.id).single();
    if (profileError) throw profileError;
    const { data: stats, error: statsError } = await locals.supabase.from("user_progress").select("*").eq("user_id", session.user.id);
    if (statsError) throw statsError;
    const completedModules = stats.filter((s) => s.completed).length;
    const totalModules = stats.length;
    const progressPercentage = totalModules ? Math.round(completedModules / totalModules * 100) : 0;
    return {
      session,
      user,
      profile,
      stats: {
        completedModules,
        totalModules,
        progressPercentage
      }
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    return {
      session,
      user,
      profile: null,
      stats: {
        completedModules: 0,
        totalModules: 0,
        progressPercentage: 0
      }
    };
  }
};
export {
  load
};
