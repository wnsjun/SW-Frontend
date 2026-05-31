import { useState } from 'react';
import Navbar from '../components/common/Navbar';
import HistoryCalendar from '../components/history/HistoryCalendar';
import HistoryHabitCard from '../components/history/HistoryHabitCard';
import type { HabitCategory } from '../components/home/HabitCard';

interface HabitRecord {
  id: number;
  title: string;
  category: HabitCategory;
  schedule: string;
  completed: boolean;
}

const MOCK_HISTORY: Record<string, HabitRecord[]> = {
  '2026-05-26': [
    { id: 1, title: '아침 운동', category: 'HEALTH', schedule: '매일', completed: true },
    { id: 2, title: '독서', category: 'LEARNING', schedule: '매일', completed: true },
    { id: 3, title: '할 일 목록 작성', category: 'PRODUCTIVITY', schedule: '매일', completed: false },
    { id: 4, title: '물 2L 마시기', category: 'HEALTH', schedule: '매일', completed: true },
    { id: 5, title: '영어 공부', category: 'LEARNING', schedule: '평일', completed: false },
    { id: 6, title: '명상', category: 'ETC', schedule: '매일', completed: true },
  ],
  '2026-05-27': [
    { id: 1, title: '아침 운동', category: 'HEALTH', schedule: '매일', completed: true },
    { id: 2, title: '독서', category: 'LEARNING', schedule: '매일', completed: false },
    { id: 3, title: '할 일 목록 작성', category: 'PRODUCTIVITY', schedule: '매일', completed: true },
    { id: 4, title: '물 2L 마시기', category: 'HEALTH', schedule: '매일', completed: true },
    { id: 5, title: '명상', category: 'ETC', schedule: '매일', completed: false },
  ],
  '2026-05-28': [
    { id: 1, title: '아침 운동', category: 'HEALTH', schedule: '매일', completed: false },
    { id: 2, title: '독서', category: 'LEARNING', schedule: '매일', completed: true },
    { id: 3, title: '할 일 목록 작성', category: 'PRODUCTIVITY', schedule: '매일', completed: true },
  ],
  '2026-05-29': [
    { id: 1, title: '아침 운동', category: 'HEALTH', schedule: '매일', completed: true },
    { id: 2, title: '독서', category: 'LEARNING', schedule: '매일', completed: true },
    { id: 3, title: '할 일 목록 작성', category: 'PRODUCTIVITY', schedule: '매일', completed: true },
    { id: 4, title: '물 2L 마시기', category: 'HEALTH', schedule: '매일', completed: false },
  ],
  '2026-05-30': [
    { id: 1, title: '아침 운동', category: 'HEALTH', schedule: '매일', completed: true },
    { id: 2, title: '독서', category: 'LEARNING', schedule: '매일', completed: false },
    { id: 3, title: '할 일 목록 작성', category: 'PRODUCTIVITY', schedule: '매일', completed: true },
    { id: 4, title: '영어 공부', category: 'LEARNING', schedule: '평일', completed: true },
  ],
  '2026-05-31': [
    { id: 1, title: '아침 운동', category: 'HEALTH', schedule: '매일', completed: true },
    { id: 2, title: '독서', category: 'LEARNING', schedule: '매일', completed: true },
    { id: 3, title: '할 일 목록 작성', category: 'PRODUCTIVITY', schedule: '매일', completed: false },
    { id: 4, title: '물 2L 마시기', category: 'HEALTH', schedule: '매일', completed: true },
  ],
};

const DAY_KR = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function formatDateLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return `${month}월 ${day}일 ${DAY_KR[date.getDay()]}`;
}

export default function History() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const habits = selectedDate ? (MOCK_HISTORY[selectedDate] ?? []) : [];
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <Navbar variant="greeting" nickname="준희" />

      <div className="mt-[15px]">
        <HistoryCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>

      {selectedDate && (
        <div className="px-5" style={{ marginTop: '30px' }}>
          <div className="flex items-center justify-between">
            <span
              className="font-pretendard-sb text-[#191C1D]"
              style={{ fontSize: '20px', lineHeight: '28px' }}
            >
              {formatDateLabel(selectedDate)}
            </span>
            <span
              className="font-pretendard-rg shrink-0"
              style={{
                padding: '4px 8px',
                borderRadius: '9999px',
                background: '#EDEEEF',
                fontSize: '12px',
                lineHeight: '16px',
                color: '#3D4A3E',
              }}
            >
              {completedCount}/{habits.length} 완료됨
            </span>
          </div>

          <div className="flex flex-col mt-[15px]" style={{ gap: '12px' }}>
            {habits.length > 0 ? (
              habits.map((habit) => (
                <HistoryHabitCard
                  key={habit.id}
                  title={habit.title}
                  category={habit.category}
                  schedule={habit.schedule}
                  completed={habit.completed}
                />
              ))
            ) : (
              <p
                className="font-pretendard-rg text-[#A0A0A0] text-center py-8"
                style={{ fontSize: '14px' }}
              >
                해당 날짜의 습관 기록이 없습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
