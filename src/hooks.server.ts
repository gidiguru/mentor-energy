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
  console.log('AUTH GUARD - Full URL:', event.url.toString());
  console.log('AUTH GUARD - Pathname:', event.url.pathname);
  console.log('AUTH GUARD - Params:', event.params);
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
        const user = data.session.user;
        
        const profilePicture = 
          user.user_metadata?.picture || 
          user.user_metadata?.avatar_url || 
          user.identities?.[0]?.identity_data?.picture ||
          user.identities?.[0]?.identity_data?.avatar_url;

        const { error: upsertError } = await event.locals.supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            first_name: 
              user.user_metadata?.given_name || 
              user.user_metadata?.name?.split(' ')[0] || 
              user.identities?.[0]?.identity_data?.given_name || 
              '',
            last_name: 
              user.user_metadata?.family_name || 
              user.user_metadata?.name?.split(' ').slice(1).join(' ') || 
              user.identities?.[0]?.identity_data?.family_name || 
              '',
            profile_picture: profilePicture
          });

        if (upsertError) {
          console.error('Error updating user data:', upsertError);
          throw redirect(303, '/auth/error');
        }

        event.locals.session = data.session;
        event.locals.user = data.session.user;

        // Always redirect to complete-signup after successful authentication
        throw redirect(303, '/auth/complete-signup');
      }
    }
  }

  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  // Protected routes check
  const protectedRoutes = ['/dashboard', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => 
    event.url.pathname.startsWith(route)
  );

  if (!session && isProtectedRoute) {
    throw redirect(303, '/auth/complete-signup');
  }

  // Redirect authenticated users to complete-signup
  if (session && event.url.pathname === '/auth') {
    throw redirect(303, '/auth/complete-signup');
  }

  return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard)