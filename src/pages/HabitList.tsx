import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import Navbar from '../components/common/Navbar';
import SearchBar from '../components/habit/SearchBar';
import DayFilter, { type DayFilter as DayFilterType } from '../components/habit/DayFilter';
import HabitFilter, { type HabitFilter as HabitFilterType } from '../components/home/HabitFilter';
import SortableHabitCard from '../components/habit/SortableHabitCard';
import ConfirmModal from '../components/common/ConfirmModal';
import editIcon from '../assets/edit.svg';
import { typo } from '../styles/typography';
import type { HabitCategory } from '../components/home/HabitCard';

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
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [dayFilter, setDayFilter] = useState<DayFilterType>('TODAY');
  const [categoryFilter, setCategoryFilter] = useState<HabitFilterType>('ALL');
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS);
  const [editMode, setEditMode] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const toggleHabit = (id: number) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)));
  };

  const deleteHabit = () => {
    if (deleteTargetId === null) return;
    setHabits((prev) => prev.filter((h) => h.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setHabits((prev) => {
        const oldIndex = prev.findIndex((h) => h.id === active.id);
        const newIndex = prev.findIndex((h) => h.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
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

        <div className="flex justify-between items-center mt-[30px]">
          <span className={`${typo.B1_Rg} text-[#191C1D]`} style={{ lineHeight: '24px' }}>
            나의 습관
          </span>
          <button className="flex items-center gap-1" onClick={() => setEditMode((v) => !v)}>
            {!editMode && <img src={editIcon} width={11} height={11} alt="" />}
            <span
              className={`${typo.B4_Rg} text-[#006D36] tracking-[0.6px]`}
              style={{ lineHeight: '16px' }}
            >
              {editMode ? '완료' : '편집'}
            </span>
          </button>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={filtered.map((h) => h.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col mt-3 mb-6" style={{ gap: '12px' }}>
              {filtered.length > 0 ? (
                filtered.map((habit) => (
                  <SortableHabitCard
                    key={habit.id}
                    id={habit.id}
                    title={habit.title}
                    category={habit.category}
                    schedule={habit.schedule}
                    completed={habit.completed}
                    editMode={editMode}
                    showCheckbox={dayFilter === 'TODAY'}
                    onToggle={() => toggleHabit(habit.id)}
                    onDelete={() => setDeleteTargetId(habit.id)}
                    onEdit={() => navigate(`/habits/edit/${habit.id}`)}
                  />
                ))
              ) : (
                <p className={`${typo.B3_Rg} text-[#BCCABB] text-center mt-8`}>
                  해당하는 습관이 없어요
                </p>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {deleteTargetId !== null && (
        <ConfirmModal
          message="정말 이 습관을 삭제할까요?"
          onConfirm={deleteHabit}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
