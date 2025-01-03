import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect, error } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => event.cookies.set(key, value, { ...options, path: '/' }),
      remove: (key, options) => event.cookies.delete(key, { ...options, path: '/' }),
    },
  })

  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error: userError,
    } = await event.locals.supabase.auth.getUser()
    if (userError) {
      return { session: null, user: null }
    }

    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  // Handle callback route first
  if (event.url.pathname === '/auth/callback') {
    const code = event.url.searchParams.get('code');
    
    if (code) {
      const { data, error } = await event.locals.supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Session exchange error:', error);
        throw redirect(303, '/auth/error');
      }

      if (data?.session) {
        // Get signup data from URL if it exists
        const signupData = event.url.searchParams.get('signupData');
        
        if (signupData) {
          // Handle new signup flow
          throw redirect(303, '/auth/complete-signup');
        } else {
          // Regular sign in - redirect to dashboard
          throw redirect(303, '/dashboard');
        }
      }
    }
  }

  // Handle regular auth state
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  // Protected routes check
  const protectedRoutes = ['/dashboard', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => 
    event.url.pathname.startsWith(route)
  );

  if (!session && isProtectedRoute) {
    throw redirect(303, `/auth?redirectTo=${encodeURIComponent(event.url.pathname)}`);
  }

  // Redirect authenticated users away from auth pages
  if (session && event.url.pathname === '/auth') {
    throw redirect(303, '/dashboard');
  }

  try {
    const response = await resolve(event);
    return response;
  } catch (err) {
    if (err instanceof redirect) {
      throw err;
    }
    console.error('Error in auth guard:', err);
    throw error(500, 'Internal server error');
  }
};

export const handle: Handle = sequence(supabase, authGuard)