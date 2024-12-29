import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { RequestHandler } from './$types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
    const supabase = createSupabaseServerClient({
      supabaseUrl: PUBLIC_SUPABASE_URL,
      supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
      event
    });
  
    const { searchParams } = new URL(event.request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
  
    if (error) {
      console.error('Auth callback error:', error);
      throw redirect(303, '/signup?error=authentication_failed');
    }
  
    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('Session exchange error:', exchangeError);
        throw redirect(303, '/signup?error=session_exchange_failed');
      }
  
      throw redirect(303, '/dashboard');
    }
  };