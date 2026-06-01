import type { Category } from './habit';

export type InsightType = 'COLD_START' | 'PENDING' | 'INSIGHT';

export interface AiInsightData {
  type: InsightType;
  insight?: string;
}

export interface DailyAchievement {
  date: string;
  completedCount: number;
  targetCount: number;
  rate: number;
}

export interface CategoryAchievementData {
  category: Category;
  completedCount: number;
  targetCount: number;
  rate: number;
}

export interface DashboardResponse {
  status: number;
  code: string;
  message: string;
  data: {
    nickname: string;
    monthlyAchievementRate: number;
    improvedFromLastMonth: number;
    dailyAchievements: DailyAchievement[];
    categoryAchievements: CategoryAchievementData[];
  };
}

export interface AiInsightResponse {
  status: number;
  code: string;
  message: string;
  data: AiInsightData;
}
