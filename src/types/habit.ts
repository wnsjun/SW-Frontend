export type Category = 'HEALTH' | 'LEARNING' | 'PRODUCTIVITY' | 'ETC';
export type FrequencyType = 'DAILY' | 'WEEKLY' | 'CUSTOM';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface TodayHabit {
  id: number;
  name: string;
  category: Category;
  frequencyType: FrequencyType;
  customDays: DayOfWeek[];
  completedToday: boolean;
  streak: number;
}

export interface CheckInResponse {
  status: number;
  code: string;
  message: string;
  data: {
    checkInId: number;
    habitId: number;
    checkedAtKst: string;
    dayOfWeek: DayOfWeek;
    checkedDate: string;
  };
}

export interface TodayHabitsResponse {
  status: number;
  code: string;
  message: string;
  data: {
    totalCount: number;
    completedCount: number;
    completionRate: number;
    maxStreak: number;
    habits: TodayHabit[];
  };
}
