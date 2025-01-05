interface TextContent {
    id: string;
    type: 'text';
    content: string;
  }
  
  interface MCQContent {
    id string;
    type: 'mcq';
    question: string;
    options: string[];
    correctAnswer: string;
    correctFeedback: string;
    incorrectFeedback: string;
  }
  
  type ModuleContent = TextContent | MCQContent;
  
  const moduleContent: ModuleContent[] = [
    {
      id: '1',
      type: 'text',
      content: 'Welcome to the Introduction to Petroleum Geology module.'
    },
    {
      id: '2',
      type: 'mcq',
      question: 'Which of the following is NOT a type of hydrocarbon trap?',
      options: [
        'Structural trap',
        'Stratigraphic trap',
        'Crystalline trap',
        'Combination trap'
      ],
      correctAnswer: 'Crystalline trap',
      correctFeedback: 'Correct! Crystalline trap is not a real type of hydrocarbon trap.',
      incorrectFeedback: 'That\'s not correct. Review the types of hydrocarbon traps.'
    },
    {
      id: '3',
      type: 'mcq',
      question: 'What is the primary source rock for most petroleum deposits?',
      options: [
        'Sandstone',
        'Shale',
        'Limestone',
        'Granite'
      ],
      correctAnswer: 'Shale',
      correctFeedback: 'Correct! Shale is the most common source rock.',
      incorrectFeedback: 'Not quite. Consider the organic content of different rocks.'
    }
  ];
  
  function getTextContent(content: ModuleContent): content is TextContent {
    return content.type === 'text';
  }
  
  function getMCQContent(content: ModuleContent): content is MCQContent {
    return content.type === 'mcq';
  }
  
  function LearningModule() {
    let currentStep = 0;
    let userAnswers: Record<string, string> = {};
    let showFeedback = false;
    let isCorrect = false;
  
    function handleAnswer(itemId: string, answer: string) {
      userAnswers[itemId] = answer;
      const currentContent = moduleContent[currentStep];
      
      if (getMCQContent(currentContent)) {
        isCorrect = answer === currentContent.correctAnswer;
        showFeedback = true;
      }
    }
  
    function handleNext() {
      if (currentStep < moduleContent.length - 1) {
        currentStep++;
        showFeedback = false;
      }
    }
  
    return {
      getCurrentContent(): ModuleContent {
        return moduleContent[currentStep];
      },
      isLastStep(): boolean {
        return currentStep === moduleContent.length - 1;
      },
      handleAnswer,
      handleNext,
      showFeedback,
      isCorrect,
      userAnswers
    };
  }
  
  export { LearningModule, type ModuleContent, type TextContent, type MCQContent };