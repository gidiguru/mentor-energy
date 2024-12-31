import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, cookies }) => {
  await locals.supabase.auth.signOut();
  
  // Clear all auth-related cookies
  const authCookies = cookies.getAll();
  authCookies.forEach(cookie => {
    if (cookie.name.includes('auth') || cookie.name.includes('supabase')) {
      cookies.delete(cookie.name, { path: '/' });
    }
  });

  throw redirect(303, '/auth');
};