import { j as json } from "../../../../chunks/index.js";
const POST = async ({ request, locals }) => {
  try {
    const { email } = await request.json();
    const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${new URL(request.url).origin}/auth/reset-password`
    });
    if (error) throw error;
    return json({ message: "Password reset instructions sent" });
  } catch (error) {
    return json(
      //{ message: error.message || 'Failed to send reset instructions' },
      { status: 400 }
    );
  }
};
export {
  POST
};
