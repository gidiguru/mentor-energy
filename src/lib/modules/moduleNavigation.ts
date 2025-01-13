export async function getModuleNavigation(supabase: any, moduleId: string, userId: string) {
    // Get all sections for the module
    const { data: sections } = await supabase
      .from('module_sections')
      .select(`
        id,
        title,
        sequence,
        section_progress!inner (
          completed,
          viewed
        )
      `)
      .eq('module_id', moduleId)
      .eq('section_progress.user_id', userId)
      .order('sequence');
  
    // Get current section progress
    const { data: currentProgress } = await supabase
      .from('module_progress')
      .select('current_section_id')
      .eq('module_id', moduleId)
      .eq('user_id', userId)
      .single();
  
    return {
      sections: sections || [],
      currentSectionId: currentProgress?.current_section_id || sections?.[0]?.id
    };
  }
  
  export async function navigateToSection(
    supabase: any, 
    moduleId: string, 
    sectionId: string, 
    userId: string
  ) {
    const now = new Date().toISOString();
  
    // Update section progress
    await supabase
      .from('section_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        section_id: sectionId,
        viewed: true,
        last_viewed_at: now
      });
  
    // Update current section in module progress
    await supabase
      .from('module_progress')
      .update({ 
        current_section_id: sectionId,
        updated_at: now 
      })
      .eq('module_id', moduleId)
      .eq('user_id', userId);
  }
  
  export async function markSectionComplete(
    supabase: any,
    moduleId: string,
    sectionId: string,
    userId: string
  ) {
    const now = new Date().toISOString();
  
    // Mark section as completed
    await supabase
      .from('section_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        section_id: sectionId,
        completed: true,
        updated_at: now
      });
  
    // Calculate overall module progress
    const { data: sections } = await supabase
      .from('section_progress')
      .select('completed')
      .eq('module_id', moduleId)
      .eq('user_id', userId);
  
    const completedCount = sections?.filter(s => s.completed).length || 0;
    const progress = Math.round((completedCount / sections.length) * 100);
  
    // Update module progress
    await supabase
      .from('module_progress')
      .update({ 
        progress,
        completed: progress === 100,
        updated_at: now
      })
      .eq('module_id', moduleId)
      .eq('user_id', userId);
  }