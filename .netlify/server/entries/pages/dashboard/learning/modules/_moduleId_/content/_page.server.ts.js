import { e as error } from "../../../../../../../chunks/index.js";
const load = async ({ params, locals }) => {
  console.log("Module Loading Started", {
    moduleId: params.moduleId,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  const { session, user } = await locals.safeGetSession();
  if (!session || !user) {
    console.warn("Unauthorized Module Access Attempt", {
      moduleId: params.moduleId,
      hasSession: !!session,
      hasUser: !!user
    });
    throw error(401, "Unauthorized");
  }
  console.log("User Authentication Successful", {
    userId: user.id,
    moduleId: params.moduleId
  });
  try {
    const { data: module, error: moduleError } = await locals.supabase.from("learning_modules").select(`
        *,
        sections:module_sections (
          *,
          pages:section_pages (
            *,
            media_content (*)
          )
        )
      `).eq("module_id", params.moduleId).single();
    if (moduleError || !module) {
      throw error(404, "Module not found");
    }
    const { data: progressData, error: progressError } = await locals.supabase.from("section_progress").select("*").match({
      user_id: user.id,
      module_id: module.id
    });
    if (progressError) {
      console.error("Progress fetch error:", progressError);
    }
    const progress = progressData?.reduce((acc, curr) => {
      const sectionId = curr.section_id;
      if (!acc.sections[sectionId]) {
        acc.sections[sectionId] = {
          completed: false,
          pages: {},
          current_page_id: null
        };
      }
      acc.sections[sectionId].pages[curr.page_id] = {
        completed: curr.completed,
        viewed: curr.viewed,
        time_spent: curr.time_spent,
        last_viewed_at: curr.last_viewed_at,
        score: curr.score
      };
      return acc;
    }, {
      module_id: module.id,
      sections: {},
      current_section_id: null,
      overall_progress: 0
    });
    if (progress && module.sections) {
      let completedPages = 0;
      let totalPages = 0;
      module.sections.forEach((section) => {
        section.pages?.forEach((page) => {
          totalPages++;
          if (progress.sections[section.id]?.pages[page.id]?.completed) {
            completedPages++;
          }
        });
      });
      progress.overall_progress = totalPages > 0 ? Math.round(completedPages / totalPages * 100) : 0;
    }
    return {
      module,
      moduleContent: module.sections || [],
      // Ensure this is an array
      progress: progress || {
        module_id: module.id,
        sections: {},
        current_section_id: null,
        overall_progress: 0
      }
    };
  } catch (err) {
    console.error("Module load error:", err);
    throw error(500, "Failed to load module content");
  }
};
export {
  load
};
