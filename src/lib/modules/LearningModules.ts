export interface ModuleContent {
    id: string;
    type: 'text' | 'mcq';
    content?: string;
    question?: string;
    options?: string[];
    correctAnswer?: string;
    correctFeedback?: string;
    incorrectFeedback?: string;
  }
  
  export interface LearningModuleInterface {
    currentStep: number;
    totalSteps: number;
    getCurrentContent: () => ModuleContent;
    isLastStep: () => boolean;
    handleAnswer: (itemId: string, answer: string) => void;
    handleNext: () => void;
    handleRetry: () => void;
    showFeedback: boolean;
    isCorrect: boolean;
    userAnswers: Record<string, string>;
  }
  
  export function LearningModule(): LearningModuleInterface {
    const moduleContent: ModuleContent[] = [
      {
        id: 'intro',
        type: 'text',
        content: 'Welcome to Introduction to Petroleum Geology...'
      },
      // Add more content items...
    ];
  
    let currentStep = 0;
    let showFeedback = false;
    let isCorrect = false;
    const userAnswers: Record<string, string> = {};
  
    return {
      currentStep,
      totalSteps: moduleContent.length,
  
      getCurrentContent: () => moduleContent[currentStep],
  
      isLastStep: () => currentStep === moduleContent.length - 1,
  
      handleAnswer: (itemId: string, answer: string) => {
        userAnswers[itemId] = answer;
        isCorrect = answer === moduleContent[currentStep].correctAnswer;
        showFeedback = true;
      },
  
      handleNext: () => {
        if (currentStep < moduleContent.length - 1) {
          currentStep++;
          showFeedback = false;
        }
      },
  
      handleRetry: () => {
        showFeedback = false;
      },
  
      get showFeedback() {
        return showFeedback;
      },
  
      get isCorrect() {
        return isCorrect;
      },
  
      get userAnswers() {
        return userAnswers;
      }
    };
  }