export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  rank: Rank;
  points: number;
  description?: string;
}

export interface Submission {
  id: number;
  userId: number;
  questionId: number;
  optionId: number;
}

export interface Rank {
  id: number;
  title: string;
  abbreviation?: string;
  minPoints: number;
  maxPoints?: number;
}

export interface Question {
  id: number;
  quizId: number;
  points: number;
  tags?: string;
  questionText: string;
  correctOption: string;
}

export interface QuizCreate {
  id: number;
  title: string;
  description?: string;
  difficultyId: number;
  topic?: string;
  createdById?: number;
  createdAt?: string;
  startDateTime?: string;
  duration: number;
  mode: QuizMode;
}

export interface Difficulty {
  id: number;
  diff: string;
  abbreviation: string;
}
export interface Quiz {
  id: number;
  title: string;
  description?: string;
  difficulty: Difficulty;
  topic?: string;
  createdBy: User;
  createdAt?: string;
  startDateTime?: string;
  duration: number;
  status?: QuizStatus;
  mode: QuizMode;
}

export enum QuizMode {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  OFFICIAL = 'OFFICIAL',
}

export enum QuizStatus {
  CREATED = 'CREATED',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED',
}

export interface QuizQuestion {
  id: number;
  quiz: Quiz;
  points: number;
  tags?: string;
  questionText: string;
  imageUrl?: string;
}

export interface Option {
  id: number;
  optionText: string;
  valid: boolean;
}

export interface Participation {
  id: number;
  user: User;
  quiz: Quiz;
  score: number;
  completionTime: string;
}