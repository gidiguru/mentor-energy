import { r as redirect } from "../../../../chunks/index.js";
const POST = async ({ locals, cookies }) => {
  await locals.supabase.auth.signOut();
  const authCookies = cookies.getAll();
  authCookies.forEach((cookie) => {
    if (cookie.name.includes("auth") || cookie.name.includes("supabase")) {
      cookies.delete(cookie.name, { path: "/" });
    }
  });
  throw redirect(303, "/auth");
};
export {
  POST
};
