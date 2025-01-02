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
        
        // Extensive logging
        console.log('OAuth User Full Data:', JSON.stringify({
          id: user.id,
          email: user.email,
          userMetadata: user.user_metadata,
          identities: user.identities
        }, null, 2));

        // Multiple methods to extract profile picture
        const profilePicture = 
          user.user_metadata?.picture || 
          user.user_metadata?.avatar_url || 
          user.identities?.[0]?.identity_data?.picture ||
          user.identities?.[0]?.identity_data?.avatar_url;

        console.log('Extracted Profile Picture:', profilePicture);

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

        // Set session before redirect
        event.locals.session = data.session;
        event.locals.user = data.session.user;

        throw redirect(303, '/auth/complete-signup');
      }
    }
  }

  return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)