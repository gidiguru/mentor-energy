import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  // Ensure user is authenticated
  const { session } = await locals.safeGetSession();
  if (!session) {
    throw error(401, 'Unauthorized');
  }

  try {
    // Fetch module data
    const { data: module, error: moduleError } = await locals.supabase
      .from('learning_modules')
      .select('*')
      .eq('id', params.moduleId)
      .single();

    if (moduleError) throw moduleError;

    // Fetch user's progress
    const { data: progress, error: progressError } = await locals.supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('module_id', params.moduleId)
      .single();

    if (progressError && progressError.code !== 'PGRST116') { // Not found is ok
      throw progressError;
    }

    return {
      module,
      progress,
      moduleId: params.moduleId
    };
  } catch (err) {
    console.error('Error loading module:', err);
    throw error(500, 'Failed to load module');
  }
}