import { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import AiCoaching from '../components/home/AiCoaching';
import MonthlyAchievement from '../components/statistics/MonthlyAchievement';
import AiInsight from '../components/statistics/AiInsight';
import WeeklyChart from '../components/statistics/WeeklyChart';
import CategoryAchievement from '../components/statistics/CategoryAchievement';
import { getDashboard, getAiInsights } from '../api/stats';
import { getAiCoaching } from '../api/ai';
import type { AiInsightData, DailyAchievement, CategoryAchievementData } from '../types/stats';

const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  HEALTH: { label: '건강', color: '#4ADE80' },
  LEARNING: { label: '학습', color: '#60A5FA' },
  PRODUCTIVITY: { label: '생산성', color: '#FBBF24' },
  ETC: { label: '기타', color: '#94A3B8' },
};

const DOW_TO_KR: Record<number, string> = { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토', 0: '일' };

function getWeeklyData(dailyAchievements: DailyAchievement[]) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const found = dailyAchievements.find((a) => a.date === dateStr);
    return { day: DOW_TO_KR[d.getDay()], percentage: found ? Math.round(found.rate) : 0 };
  });
}

function getCategoryData(categoryAchievements: CategoryAchievementData[]) {
  return categoryAchievements.map((item) => ({
    label: CATEGORY_CONFIG[item.category]?.label ?? item.category,
    percentage: Math.round(item.rate),
    color: CATEGORY_CONFIG[item.category]?.color ?? '#94A3B8',
  }));
}

export default function Statistics() {
  const nickname = localStorage.getItem('nickname') ?? '';

  const [coachingMessage, setCoachingMessage] = useState('');
  const [insightData, setInsightData] = useState<AiInsightData>({ type: 'COLD_START' });
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [improvedFromLastMonth, setImprovedFromLastMonth] = useState(0);
  const [weeklyData, setWeeklyData] = useState<{ day: string; percentage: number }[]>([]);
  const [categoryData, setCategoryData] = useState<{ label: string; percentage: number; color: string }[]>([]);

  useEffect(() => {
    getAiCoaching().then(setCoachingMessage).catch(() => {});
    getAiInsights().then(setInsightData).catch(() => {});
    getDashboard().then((data) => {
      setMonthlyRate(data.monthlyAchievementRate);
      setImprovedFromLastMonth(data.improvedFromLastMonth);
      setWeeklyData(getWeeklyData(data.dailyAchievements));
      setCategoryData(getCategoryData(data.categoryAchievements));
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <Navbar variant="greeting" nickname={nickname} />

      <div className="flex flex-col px-5">
        <div className="mt-[15px]">
          <AiCoaching message={coachingMessage} />
        </div>

        <div className="mt-[35px]">
          <MonthlyAchievement rate={monthlyRate} improvedFromLastMonth={improvedFromLastMonth} />
        </div>

        <div className="mt-[35px]">
          <AiInsight data={insightData} />
        </div>

        <div className="mt-[35px]">
          <WeeklyChart data={weeklyData} />
        </div>

        <div className="mt-[35px]">
          <CategoryAchievement data={categoryData} />
        </div>
      </div>
    </div>
  );
}
