import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, ModuleAnswers } from '$lib/types/database';

export async function markSectionComplete(
  supabase: SupabaseClient<Database>,
  moduleId: string,
  sectionId: string,
  userId: string
): Promise<void> {
  // Get current progress
  const { data: currentProgress, error: fetchError } = await supabase
    .from('module_progress')
    .select('answers, progress')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .single();

  if (fetchError) throw fetchError;

  // Update section progress
  const answers: ModuleAnswers = currentProgress?.answers || {
    sections: {},
    currentSectionId: sectionId
  };

  answers.sections[sectionId] = {
    ...answers.sections[sectionId],
    completed: true,
    viewed: true,
    lastViewedAt: new Date().toISOString()
  };

  // Calculate overall progress
  const completedSections = Object.values(answers.sections).filter(s => s.completed).length;
  const totalSections = Object.keys(answers.sections).length;
  const progress = (completedSections / totalSections) * 100;

  // Update progress record
  const { error: updateError } = await supabase
    .from('module_progress')
    .update({
      answers,
      progress,
      completed: progress === 100,
      completed_at: progress === 100 ? new Date().toISOString() : null
    })
    .eq('user_id', userId)
    .eq('module_id', moduleId);

  if (updateError) throw updateError;
}

export async function navigateToSection(
  supabase: SupabaseClient<Database>,
  moduleId: string,
  sectionId: string,
  userId: string
): Promise<void> {
  // Get current progress
  const { data: currentProgress, error: fetchError } = await supabase
    .from('module_progress')
    .select('answers')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .single();

  if (fetchError) throw fetchError;

  // Update section progress
  const answers: ModuleAnswers = currentProgress?.answers || {
    sections: {},
    currentSectionId: sectionId
  };

  answers.sections[sectionId] = {
    ...answers.sections[sectionId],
    viewed: true,
    lastViewedAt: new Date().toISOString()
  };

  answers.currentSectionId = sectionId;

  // Update progress record
  const { error: updateError } = await supabase
    .from('module_progress')
    .update({ answers })
    .eq('user_id', userId)
    .eq('module_id', moduleId);

  if (updateError) throw updateError;
}

export async function getModuleProgress(
  supabase: SupabaseClient<Database>,
  moduleId: string,
  userId: string
): Promise<ModuleAnswers> {
  const { data, error } = await supabase
    .from('module_progress')
    .select('answers')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .single();

  if (error) throw error;

  return data?.answers || {
    sections: {},
    currentSectionId: null
  };
}