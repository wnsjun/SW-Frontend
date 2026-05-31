import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import AiCoaching from '../components/home/AiCoaching';
import TodayGoal from '../components/home/TodayGoal';
import TotalStreak from '../components/home/TotalStreak';
import HabitCard, { type HabitCategory } from '../components/home/HabitCard';
import AddHabitCard from '../components/home/AddHabitCard';
import HabitFilter, { type HabitFilter as HabitFilterType } from '../components/home/HabitFilter';
import { typo } from '../styles/typography';

interface Habit {
  id: number;
  title: string;
  category: HabitCategory;
  schedule: string;
  completed: boolean;
}

const MOCK_HABITS: Habit[] = [
  { id: 1, title: '아침 운동', category: 'HEALTH', schedule: '매일', completed: false },
  { id: 2, title: '독서', category: 'LEARNING', schedule: '평일', completed: true },
  { id: 3, title: '할 일 목록 작성', category: 'PRODUCTIVITY', schedule: '매일', completed: false },
];

export default function Home() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS);
  const [filter, setFilter] = useState<HabitFilterType>('ALL');

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const filteredHabits = filter === 'ALL' ? habits : habits.filter((h) => h.category === filter);
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="greeting" nickname="준희" />

      <div className="flex flex-col px-5">
        <div className="mt-[10px]">
          <AiCoaching />
        </div>

        <div className="grid grid-cols-2 gap-[10px] mt-[30px]">
          <TodayGoal total={habits.length} completed={completedCount} />
          <TotalStreak streak={10} />
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
          <AddHabitCard />
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              title={habit.title}
              category={habit.category}
              schedule={habit.schedule}
              completed={habit.completed}
              onToggle={() => toggleHabit(habit.id)}
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
