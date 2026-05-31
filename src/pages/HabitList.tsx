import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import SearchBar from '../components/habit/SearchBar';
import DayFilter, { type DayFilter as DayFilterType } from '../components/habit/DayFilter';
import HabitFilter, { type HabitFilter as HabitFilterType } from '../components/home/HabitFilter';
import HabitCard, { type HabitCategory } from '../components/home/HabitCard';
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
  { id: 4, title: '스트레칭', category: 'HEALTH', schedule: '월,수,금', completed: false },
  { id: 5, title: '영어 공부', category: 'LEARNING', schedule: '주말', completed: false },
];

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const DAY_TO_LABEL: Record<DayFilterType, string> = {
  TODAY: WEEK_DAYS[new Date().getDay()],
  MON: '월', TUE: '화', WED: '수', THU: '목', FRI: '금', SAT: '토', SUN: '일',
};

function matchesDay(schedule: string, day: DayFilterType): boolean {
  const label = DAY_TO_LABEL[day];
  if (schedule === '매일') return true;
  if (schedule === '평일') return ['월', '화', '수', '목', '금'].includes(label);
  if (schedule === '주말') return ['토', '일'].includes(label);
  return schedule.includes(label);
}

export default function HabitList() {
  const [search, setSearch] = useState('');
  const [dayFilter, setDayFilter] = useState<DayFilterType>('TODAY');
  const [categoryFilter, setCategoryFilter] = useState<HabitFilterType>('ALL');
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS);

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const filtered = habits.filter((h) => {
    const matchesSearch = h.title.includes(search);
    const matchesCategory = categoryFilter === 'ALL' || h.category === categoryFilter;
    const matchesDayFilter = matchesDay(h.schedule, dayFilter);
    return matchesSearch && matchesCategory && matchesDayFilter;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="back" title="나의 습관목록" />

      <div className="flex flex-col px-5">
        <div className="mt-[15px]">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mt-[15px]">
          <DayFilter selected={dayFilter} onChange={setDayFilter} />
        </div>

        <div className="mt-[15px]">
          <HabitFilter selected={categoryFilter} onChange={setCategoryFilter} />
        </div>

        <span
          className={`${typo.B1_Rg} text-[#191C1D] mt-[30px]`}
          style={{ lineHeight: '24px' }}
        >
          나의 습관
        </span>

        <div className="flex flex-col mt-3 mb-6" style={{ gap: '12px' }}>
          {filtered.length > 0 ? (
            filtered.map((habit) => (
              <HabitCard
                key={habit.id}
                title={habit.title}
                category={habit.category}
                schedule={habit.schedule}
                completed={habit.completed}
                onToggle={() => toggleHabit(habit.id)}
                showCheckbox={dayFilter === 'TODAY'}
              />
            ))
          ) : (
            <p className={`${typo.B3_Rg} text-[#BCCABB] text-center mt-8`}>
              해당하는 습관이 없어요
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
