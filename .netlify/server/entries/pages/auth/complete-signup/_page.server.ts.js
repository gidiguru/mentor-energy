import { r as redirect } from "../../../../chunks/index.js";
const load = async ({ locals }) => {
  const { session, user } = await locals.safeGetSession();
  if (!session || !user) {
    throw redirect(303, "/auth");
  }
  return {
    session,
    user
  };
};
export {
  load
};
