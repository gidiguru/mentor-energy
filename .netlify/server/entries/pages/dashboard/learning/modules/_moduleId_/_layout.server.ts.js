import { e as error } from "../../../../../../chunks/index.js";
const load = async ({ params, locals }) => {
  console.log("LAYOUT SERVER LOAD - Module ID:", params.moduleId);
  const { data: module, error: moduleError } = await locals.supabase.from("learning_modules").select("*").eq("module_id", params.moduleId).single();
  if (moduleError || !module) {
    console.error("Module not found:", moduleError);
    throw error(404, "Module not found");
  }
  return { moduleId: params.moduleId };
};
export {
  load
};
