import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Get session and profile data securely
  const { session, user } = await locals.safeGetSession();

  // Redirect if not authenticated
  if (!session) {
    throw redirect(303, '/auth');
  }

  try {
    // Get user's profile data
    const { data: profile, error: profileError } = await locals.supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) throw profileError;

    // Get user's progress stats
    const { data: stats, error: statsError } = await locals.supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', session.user.id);

    if (statsError) throw statsError;

    // Calculate progress metrics
    const completedModules = stats.filter(s => s.completed).length;
    const totalModules = stats.length;
    const progressPercentage = totalModules ? 
      Math.round((completedModules / totalModules) * 100) : 0;

    return {
      session,
      user,
      profile,
      stats: {
        completedModules,
        totalModules,
        progressPercentage
      }
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return {
      session,
      user,
      profile: null,
      stats: {
        completedModules: 0,
        totalModules: 0,
        progressPercentage: 0
      }
    };
  }
};