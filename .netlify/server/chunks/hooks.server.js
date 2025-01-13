import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_ANON_KEY } from "./public.js";
import { createServerClient } from "@supabase/ssr";
import { r as redirect, e as error } from "./index.js";
function sequence(...handlers) {
  const length = handlers.length;
  if (!length) return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
const supabase = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => event.cookies.set(key, value, { ...options, path: "/" }),
      remove: (key, options) => event.cookies.delete(key, { ...options, path: "/" })
    }
  });
  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    if (!session) {
      return { session: null, user: null };
    }
    const {
      data: { user },
      error: userError
    } = await event.locals.supabase.auth.getUser();
    if (userError) {
      return { session: null, user: null };
    }
    return { session, user };
  };
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range" || name === "x-supabase-api-version";
    }
  });
};
const authGuard = async ({ event, resolve }) => {
  console.log("[AUTH GUARD] Full URL:", event.url.toString());
  console.log("[AUTH GUARD] Pathname:", event.url.pathname);
  console.log("[AUTH GUARD] Params:", event.params);
  const moduleRouteMatch = event.url.pathname.match(/^\/dashboard\/modules\/([^/]+)\/content$/);
  if (moduleRouteMatch) {
    event.params.moduleId = moduleRouteMatch[1];
    console.log("[AUTH GUARD] Extracted Module ID:", event.params.moduleId);
  }
  if (event.url.pathname === "/auth/callback") {
    const code = event.url.searchParams.get("code");
    if (code) {
      const { data, error: error2 } = await event.locals.supabase.auth.exchangeCodeForSession(code);
      if (error2) {
        console.error("Session exchange error:", error2);
        throw redirect(303, "/auth/error");
      }
      if (data?.session) {
        const user2 = data.session.user;
        const profilePicture = user2.user_metadata?.picture || user2.user_metadata?.avatar_url || user2.identities?.[0]?.identity_data?.picture || user2.identities?.[0]?.identity_data?.avatar_url;
        const { error: upsertError } = await event.locals.supabase.from("users").upsert({
          id: user2.id,
          email: user2.email,
          first_name: user2.user_metadata?.given_name || user2.user_metadata?.name?.split(" ")[0] || user2.identities?.[0]?.identity_data?.given_name || "",
          last_name: user2.user_metadata?.family_name || user2.user_metadata?.name?.split(" ").slice(1).join(" ") || user2.identities?.[0]?.identity_data?.family_name || "",
          profile_picture: profilePicture
        });
        if (upsertError) {
          console.error("Error updating user data:", upsertError);
          throw redirect(303, "/auth/error");
        }
        event.locals.session = data.session;
        event.locals.user = data.session.user;
        throw redirect(303, "/auth/complete-signup");
      }
    }
  }
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;
  if (event.url.pathname.startsWith("/dashboard/learning/modules/") && event.url.pathname.includes("/content")) {
    if (!session) {
      console.warn("[AUTH GUARD] Unauthorized module access attempt");
      throw redirect(303, "/auth");
    }
    try {
      const { data: module, error: moduleError } = await event.locals.supabase.from("learning_modules").select("*").eq("module_id", event.params.moduleId).single();
      if (moduleError || !module) {
        console.error("[AUTH GUARD] Module not found:", moduleError);
        throw error(404, "Module not found");
      }
    } catch (err) {
      console.error("[AUTH GUARD] Module validation error:", err);
      throw error(500, "Failed to validate module");
    }
  }
  const protectedRoutes = ["/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some(
    (route) => event.url.pathname.startsWith(route)
  );
  if (!session && isProtectedRoute) {
    throw redirect(303, "/auth");
  }
  if (session && event.url.pathname === "/auth") {
    throw redirect(303, "/dashboard");
  }
  return resolve(event);
};
const handle = sequence(supabase, authGuard);
export {
  handle
};
