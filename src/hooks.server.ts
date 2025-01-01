import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const supabase: Handle = async ({ event, resolve }) => {
  /**
   * Creates a Supabase client specific to this server request.
   *
   * The Supabase client gets the Auth token from the request cookies.
   */
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  /**
   * Unlike `supabase.auth.getSession()`, which returns the session _without_
   * validating the JWT, this function also calls `getUser()` to validate the
   * JWT before returning the session.
   */
  event.locals.safeGetSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    if (!session) {
      return { session: null, user: null }
    }

    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      // JWT validation has failed
      return { session: null, user: null }
    }

    return { session, user }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      /**
       * Supabase libraries use the `content-range` and `x-supabase-api-version`
       * headers, so we need to tell SvelteKit to pass it through.
       */
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const authGuard: Handle = async ({ event, resolve }) => {
  // Special handling for callback first
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
        const metadata = user.user_metadata || {};

        console.log('Auth callback - user data:', user);
        
        const { error: upsertError } = await event.locals.supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            first_name: metadata.given_name || metadata.name?.split(' ')[0] || '',
            last_name: metadata.family_name || metadata.name?.split(' ').slice(1).join(' ') || ''
          });

        if (upsertError) {
          console.error('Error updating user data:', upsertError);
          throw redirect(303, '/auth/error');
        }

        // Set session before redirect
        event.locals.session = data.session;
        event.locals.user = data.session.user;

        throw redirect(303, '/auth/complete-signup');
      }
    }
  }

  // Then handle regular session checks
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  // Protected routes check - but exclude complete-signup path
  if (!event.locals.session && 
      event.url.pathname.startsWith('/dashboard') || 
      (event.url.pathname.startsWith('/profile'))) {
    throw redirect(303, '/auth');
  }

  // Special handling for auth paths
  if (event.url.pathname.startsWith('/auth')) {
    // Allow access to complete-signup if coming from callback
    if (event.url.pathname === '/auth/complete-signup' && event.locals.session) {
      return resolve(event);
    }

    // Redirect to dashboard if already authenticated and not on complete-signup
    if (event.locals.session && event.url.pathname !== '/auth/complete-signup') {
      throw redirect(303, '/dashboard');
    }
  }

  return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)