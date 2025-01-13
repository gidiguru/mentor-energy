// src/routes/dashboard/modules/[moduleId]/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params, locals }) => {
  console.log('LAYOUT SERVER LOAD - Module ID:', params.moduleId);
  
  // Validate module exists
  const { data: module, error: moduleError } = await locals.supabase
    .from('learning_modules')
    .select('*')
    .eq('module_id', params.moduleId)
    .single();

  if (moduleError || !module) {
    console.error('Module not found:', moduleError);
    throw error(404, 'Module not found');
  }

  return { moduleId: params.moduleId };
};