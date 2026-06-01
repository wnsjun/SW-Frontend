import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import AiCoaching from '../components/home/AiCoaching';
import TodayGoal from '../components/home/TodayGoal';
import TotalStreak from '../components/home/TotalStreak';
import HabitCard from '../components/home/HabitCard';
import AddHabitCard from '../components/home/AddHabitCard';
import HabitFilter, { type HabitFilter as HabitFilterType } from '../components/home/HabitFilter';
import { typo } from '../styles/typography';
import { getTodayHabits, postCheckIn, deleteCheckIn } from '../api/habit';
import { getAiCoaching } from '../api/ai';
import type { TodayHabit } from '../types/habit';
import type { HabitCategory } from '../components/home/HabitCard';

const DAY_LABEL: Record<string, string> = {
  MONDAY: '월', TUESDAY: '화', WEDNESDAY: '수',
  THURSDAY: '목', FRIDAY: '금', SATURDAY: '토', SUNDAY: '일',
};

function formatSchedule(habit: TodayHabit): string {
  if (habit.frequencyType === 'DAILY') return '매일';
  if (habit.frequencyType === 'CUSTOM') return habit.customDays.map((d) => DAY_LABEL[d]).join(', ');
  return '주 1회';
}

export default function Home() {
  const navigate = useNavigate();
  const nickname = localStorage.getItem('nickname') ?? '';
  const [habits, setHabits] = useState<TodayHabit[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [coachingMessage, setCoachingMessage] = useState('');
  const [filter, setFilter] = useState<HabitFilterType>('ALL');
  const _d = new Date();
  const TODAY = `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, '0')}-${String(_d.getDate()).padStart(2, '0')}`;
  const STORAGE_KEY = 'checkInIdMap';

  const loadCheckInIdMap = (): Record<number, number> => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed.date === TODAY ? parsed.map : {};
    } catch {
      return {};
    }
  };

  const [checkInIdMap, setCheckInIdMap] = useState<Record<number, number>>(loadCheckInIdMap);

  const saveCheckInIdMap = (map: Record<number, number>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: TODAY, map }));
  };

  useEffect(() => {
    getTodayHabits().then((data) => {
      setHabits(data.habits);
      setTotalCount(data.totalCount);
      setCompletedCount(data.completedCount);
      setMaxStreak(data.maxStreak);
    });
    getAiCoaching().then(setCoachingMessage);
  }, []);

  const handleToggle = async (habit: TodayHabit) => {
    if (habit.completedToday) {
      const checkInId = checkInIdMap[habit.id];
      if (checkInId == null) return;
      await deleteCheckIn(checkInId);
      const next = { ...checkInIdMap };
      delete next[habit.id];
      setCheckInIdMap(next);
      saveCheckInIdMap(next);
      setHabits((prev) => prev.map((h) => h.id === habit.id ? { ...h, completedToday: false } : h));
      setCompletedCount((c) => c - 1);
    } else {
      const data = await postCheckIn(habit.id);
      const next = { ...checkInIdMap, [habit.id]: data.checkInId };
      setCheckInIdMap(next);
      saveCheckInIdMap(next);
      setHabits((prev) => prev.map((h) => h.id === habit.id ? { ...h, completedToday: true } : h));
      setCompletedCount((c) => c + 1);
    }
  };

  const filteredHabits =
    filter === 'ALL' ? habits : habits.filter((h) => h.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="greeting" nickname={nickname} />

      <div className="flex flex-col px-5">
        <div className="mt-[10px]">
          <AiCoaching message={coachingMessage} />
        </div>

        <div className="grid grid-cols-2 gap-[10px] mt-[30px]">
          <TodayGoal total={totalCount} completed={completedCount} />
          <TotalStreak streak={maxStreak} />
        </div>

        <div className="flex justify-between items-center mt-[30px]">
          <span className={`${typo.B1_Rg} text-[#191C1D]`} style={{ lineHeight: '24px' }}>
            오늘의 습관
          </span>
          <span
            className={`${typo.B4_Rg} text-[#006D36] tracking-[0.6px] cursor-pointer`}
            style={{ lineHeight: '16px' }}
            onClick={() => navigate('/habits')}
          >
            전체보기
          </span>
        </div>

        <div className="flex flex-col mt-[15px]" style={{ gap: '12px' }}>
          <AddHabitCard onClick={() => navigate('/habits/new')} />
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              title={habit.name}
              category={habit.category as HabitCategory}
              schedule={formatSchedule(habit)}
              completed={habit.completedToday}
              onToggle={() => handleToggle(habit)}
            />
          ))}
        </div>

        <div className="mt-[30px] mb-6">
          <HabitFilter selected={filter} onChange={setFilter} />
        </div>
      </div>
    </div>
  );
}
