import type { Category } from './habit';

export interface HistoryHabit {
  habitId: number;
  name: string;
  category: Category;
  completed: boolean;
  checkedAtKst: string | null;
}

export interface HistoryResponse {
  status: number;
  code: string;
  message: string;
  data: {
    date: string;
    totalCount: number;
    completedCount: number;
    habits: HistoryHabit[];
  };
}
