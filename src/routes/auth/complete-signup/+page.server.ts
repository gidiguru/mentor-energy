// src/routes/auth/complete-signup/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { session, user } = await locals.safeGetSession();
  
  if (!session || !user) {
    throw redirect(303, '/auth');
  }

  return {
    session,
    user
  };
};