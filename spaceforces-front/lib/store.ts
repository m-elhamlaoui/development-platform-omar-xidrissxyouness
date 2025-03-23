import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface QuizCreationState {
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Array<{
    question: string;
    answers: string[];
    correctAnswer: number;
  }>;
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  addQuestion: (question: string, answers: string[], correctAnswer: number) => void;
  removeQuestion: (index: number) => void;
  resetQuiz: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useQuizCreationStore = create<QuizCreationState>((set) => ({
  title: '',
  category: '',
  difficulty: 'medium',
  questions: [],
  setTitle: (title) => set({ title }),
  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  addQuestion: (question, answers, correctAnswer) =>
    set((state) => ({
      questions: [...state.questions, { question, answers, correctAnswer }],
    })),
  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
  resetQuiz: () =>
    set({
      title: '',
      category: '',
      difficulty: 'medium',
      questions: [],
    }),
}));