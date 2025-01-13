import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
  const { session } = await locals.safeGetSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { moduleId, answers } = await request.json();

    // Save completion data
    const { error: progressError } = await locals.supabase
      .from('section_progress')
      .upsert({
        user_id: session.user.id,
        module_id: moduleId,
        completed: true,
        answers,
        completed_at: new Date().toISOString()
      });

    if (progressError) throw progressError;

    return json({ success: true });
  } catch (error) {
    console.error('Error saving module progress:', error);
    return json({ error: 'Failed to save progress' }, { status: 500 });
  }
};