export interface ProfileResponse {
  status: number;
  code: string;
  message: string;
  data: {
    nickname: string;
    activeHabitCount: number;
    monthlyAchievementRate: number;
  } | null;
}
