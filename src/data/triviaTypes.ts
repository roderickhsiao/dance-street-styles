export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  relatedStyle?: string;
}

export interface TriviaSession {
  id: string;
  questions: TriviaQuestion[];
  currentQuestionIndex: number;
  score: number;
  answered: boolean[];
  startTime: Date;
  endTime?: Date;
}
