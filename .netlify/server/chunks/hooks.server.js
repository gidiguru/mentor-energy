import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_ANON_KEY } from "./public.js";
import { createServerClient } from "@supabase/ssr";
import { r as redirect } from "./index.js";
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
  if (event.url.pathname === "/auth/callback") {
    const code = event.url.searchParams.get("code");
    if (code) {
      const { data, error: error2 } = await event.locals.supabase.auth.exchangeCodeForSession(code);
      if (error2) {
        console.error("Session exchange error:", error2);
        throw redirect(303, "/auth/error");
      }
      if (data?.session) {
        throw redirect(303, "/auth/complete-signup");
      }
    }
  }
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;
  const protectedRoutes = ["/dashboard", "/profile"];
  const isProtectedRoute = protectedRoutes.some(
    (route) => event.url.pathname.startsWith(route)
  );
  if (!session && isProtectedRoute) {
    throw redirect(303, "/auth/complete-signup");
  }
  if (session && event.url.pathname === "/auth") {
    throw redirect(303, "/auth/complete-signup");
  }
  return resolve(event);
};
const handle = sequence(supabase, authGuard);
export {
  handle
};
