import { TriviaQuestion } from './triviaTypes';

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 'hiphop-origin-1',
    question: 'In which New York borough did Hip-Hop culture originate?',
    options: ['Manhattan', 'Brooklyn', 'The Bronx', 'Queens'],
    correctAnswer: 2,
    explanation: 'Hip-Hop culture originated in the Bronx in the 1970s, particularly at block parties thrown by DJ Kool Herc.',
    difficulty: 'easy',
    category: 'Origins',
    relatedStyle: 'hip-hop'
  },
  {
    id: 'breaking-elements-1',
    question: 'How many main elements does breaking consist of?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'Breaking consists of four main elements: toprock, downrock/footwork, power moves, and freezes.',
    difficulty: 'easy',
    category: 'Techniques',
    relatedStyle: 'breaking'
  },
  {
    id: 'popping-creator-1',
    question: 'Who is credited with creating the popping dance style?',
    options: ['Don Campbell', 'Boogaloo Sam', 'Crazy Legs', 'Afrika Bambaataa'],
    correctAnswer: 1,
    explanation: 'Boogaloo Sam (Sam Solomon) is credited with creating popping and founding the Electric Boogaloos crew in Fresno, California.',
    difficulty: 'medium',
    category: 'Pioneers',
    relatedStyle: 'popping'
  },
  {
    id: 'locking-origin-2',
    question: 'What was the original name for locking when it was first created?',
    options: ['Funking', 'Campbelling', 'Locking', 'Pointing'],
    correctAnswer: 1,
    explanation: 'Locking was originally called "Campbelling" after its creator Don Campbell, before it became known as locking.',
    difficulty: 'hard',
    category: 'History',
    relatedStyle: 'locking'
  },
  {
    id: 'house-music-1',
    question: 'House dance originated alongside house music in which decade?',
    options: ['1970s', '1980s', '1990s', '2000s'],
    correctAnswer: 1,
    explanation: 'House dance emerged in the 1980s alongside house music in Chicago and New York club scenes.',
    difficulty: 'easy',
    category: 'Origins',
    relatedStyle: 'house'
  },
  {
    id: 'voguing-ballroom-1',
    question: 'Voguing originated from which cultural community?',
    options: ['Hip-Hop heads in Brooklyn', 'Punk rockers in Manhattan', 'Black and Latino LGBTQ+ ballroom scene in Harlem', 'Jazz dancers in Chicago'],
    correctAnswer: 2,
    explanation: 'Voguing emerged from the Black and Latino LGBTQ+ ballroom scene in Harlem, New York, during the 1960s-80s.',
    difficulty: 'medium',
    category: 'Culture',
    relatedStyle: 'voguing'
  },
  {
    id: 'breaking-cypher-1',
    question: 'What is the circular dance space where b-boys and b-girls battle called?',
    options: ['Circle', 'Ring', 'Cypher', 'Arena'],
    correctAnswer: 2,
    explanation: 'The circular dance space in breaking and other street dances is called a "cypher" (also spelled "cipher").',
    difficulty: 'easy',
    category: 'Terminology',
    relatedStyle: 'breaking'
  },
  {
    id: 'electro-boogaloos-1',
    question: 'The Electric Boogaloos crew was founded in which California city?',
    options: ['Los Angeles', 'San Francisco', 'Fresno', 'Oakland'],
    correctAnswer: 2,
    explanation: 'The Electric Boogaloos crew was founded by Boogaloo Sam in Fresno, California in 1977.',
    difficulty: 'medium',
    category: 'Crews',
    relatedStyle: 'popping'
  },
  {
    id: 'madonna-vogue-1',
    question: 'In what year did Madonna release "Vogue," bringing voguing to mainstream attention?',
    options: ['1988', '1990', '1992', '1994'],
    correctAnswer: 1,
    explanation: 'Madonna released "Vogue" in 1990, which brought voguing from the ballroom scene to mainstream pop culture.',
    difficulty: 'medium',
    category: 'Pop Culture',
    relatedStyle: 'voguing'
  },
  {
    id: 'rock-steady-crew-1',
    question: 'Which legendary breaking crew was featured in movies like "Flashdance" and "Beat Street"?',
    options: ['New York City Breakers', 'Rock Steady Crew', 'Electric Boogaloos', 'The Lockers'],
    correctAnswer: 1,
    explanation: 'Rock Steady Crew, founded in 1977, became internationally famous and appeared in multiple movies during the 1980s.',
    difficulty: 'medium',
    category: 'Crews',
    relatedStyle: 'breaking'
  }
];

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): TriviaQuestion[] => {
  return triviaQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): TriviaQuestion[] => {
  return triviaQuestions.filter(q => q.category === category);
};

export const getQuestionsByStyle = (styleId: string): TriviaQuestion[] => {
  return triviaQuestions.filter(q => q.relatedStyle === styleId);
};

export const getRandomQuestions = (count: number): TriviaQuestion[] => {
  const shuffled = [...triviaQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getAllCategories = (): string[] => {
  return [...new Set(triviaQuestions.map(q => q.category))];
};
