import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase, safeGetSession } }) => {
  const code = url.searchParams.get('code');
  console.log('Auth callback received with code:', !!code); // Log presence of code

  if (code) {
    try {
      console.log('Exchanging code for session...');
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.log('Exchange error:', exchangeError);
        throw redirect(303, '/auth?error=exchange');
      }

      console.log('Getting session...');
      const { session, user } = await safeGetSession();
      console.log('Auth result:', { 
        hasSession: !!session, 
        hasUser: !!user,
        userId: user?.id 
      });
      
      if (session && user) {
        throw redirect(303, '/dashboard');
      }
    } catch (error) {
      // ... existing error handling
    }
  }
}