import { useEffect, useState } from 'react';
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
import { getHabits, deleteHabit, postCheckIn, deleteCheckIn } from '../api/habit';
import type { TodayHabit, DayOfWeek } from '../types/habit';
// DayOfWeek used in FILTER_TO_DOW mapping

const DAY_LABEL: Record<string, string> = {
  MONDAY: '월', TUESDAY: '화', WEDNESDAY: '수',
  THURSDAY: '목', FRIDAY: '금', SATURDAY: '토', SUNDAY: '일',
};

const FILTER_TO_DOW: Record<DayFilterType, DayOfWeek | undefined> = {
  TODAY: undefined,
  MON: 'MONDAY', TUE: 'TUESDAY', WED: 'WEDNESDAY',
  THU: 'THURSDAY', FRI: 'FRIDAY', SAT: 'SATURDAY', SUN: 'SUNDAY',
};

function formatSchedule(habit: TodayHabit): string {
  if (habit.frequencyType === 'DAILY') return '매일';
  if (habit.frequencyType === 'CUSTOM') return habit.customDays.map((d) => DAY_LABEL[d]).join(', ');
  return '주 1회';
}

export default function HabitList() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<TodayHabit[]>([]);
  const [search, setSearch] = useState('');
  const [dayFilter, setDayFilter] = useState<DayFilterType>('TODAY');
  const [categoryFilter, setCategoryFilter] = useState<HabitFilterType>('ALL');
  const [editMode, setEditMode] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  useEffect(() => {
    getHabits(FILTER_TO_DOW[dayFilter]).then(setHabits);
  }, [dayFilter]);

  const handleToggle = async (habit: TodayHabit) => {
    if (habit.completedToday) {
      await deleteCheckIn(habit.id);
      setHabits((prev) => prev.map((h) => h.id === habit.id ? { ...h, completedToday: false } : h));
    } else {
      await postCheckIn(habit.id);
      setHabits((prev) => prev.map((h) => h.id === habit.id ? { ...h, completedToday: true } : h));
    }
  };

  const handleDelete = async () => {
    if (deleteTargetId === null) return;
    await deleteHabit(deleteTargetId);
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
    const matchesSearch = h.name.includes(search);
    const matchesCategory = categoryFilter === 'ALL' || h.category === categoryFilter;
    return matchesSearch && matchesCategory;
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
          <button className="flex items-center gap-1 cursor-pointer" onClick={() => setEditMode((v) => !v)}>
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
                    title={habit.name}
                    category={habit.category}
                    schedule={formatSchedule(habit)}
                    completed={habit.completedToday}
                    editMode={editMode}
                    showCheckbox={dayFilter === 'TODAY'}
                    onToggle={() => handleToggle(habit)}
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
          onConfirm={handleDelete}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </div>
  );
}
