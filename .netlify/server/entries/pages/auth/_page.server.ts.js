import { f as fail, r as redirect } from "../../../chunks/index.js";
const actions = {
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      return fail(400, {
        error: true,
        message: "Invalid login credentials"
      });
    }
    throw redirect(303, "/dashboard");
  }
};
export {
  actions
};
