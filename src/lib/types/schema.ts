export interface ModuleProgress {
    id: string;
    user_id: string;
    module_id: string;
    completed: boolean;
    current_step: number;
    score: number | null;
    last_accessed: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface LearningModule {
    id: string;
    title: string;
    description: string;
    content: ModuleContent[];
    created_at: string;
    updated_at: string;
  }