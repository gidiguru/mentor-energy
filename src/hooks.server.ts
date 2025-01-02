import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { type Handle, redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const supabase: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => event.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
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
      error,
    } = await event.locals.supabase.auth.getUser()
    if (error) {
      return { session: null, user: null }
    }

    return { session, user }
  }

  const response = await resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })

  // Add scroll-to-top behavior for HTML responses
  if (response.headers.get('content-type')?.includes('text/html')) {
    const html = await response.text()
    const modifiedHtml = html.replace(
      '</body>',
      `<script>
        window.addEventListener('sveltekit:navigation-end', () => {
          window.scrollTo(0, 0);
        });
        window.addEventListener('load', () => {
          window.scrollTo(0, 0);
        });
      </script>
      </body>`
    )
    
    return new Response(modifiedHtml, {
      status: response.status,
      headers: response.headers,
    })
  }

  return response
}

const authGuard: Handle = async ({ event, resolve }) => {
  // Your existing authGuard code...
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

        throw redirect(303, '/auth/complete-signup');
      }
    }
  }

  const { session, user } = await event.locals.safeGetSession()
  event.locals.session = session
  event.locals.user = user

  if (!event.locals.session && (
    event.url.pathname.startsWith('/dashboard') || 
    event.url.pathname.startsWith('/profile')
  )) {
    throw redirect(303, '/auth');
  }

  if (event.locals.session && event.url.pathname === '/auth') {
    redirect(303, '/dashboard')
  }

  return resolve(event)
}

export const handle: Handle = sequence(supabase, authGuard)