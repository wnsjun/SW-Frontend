import { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import HistoryCalendar from '../components/history/HistoryCalendar';
import HistoryHabitCard from '../components/history/HistoryHabitCard';
import { getHistory } from '../api/history';
import type { HistoryHabit } from '../types/history';
import type { HabitCategory } from '../components/home/HabitCard';

const DAY_KR = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function formatDateLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return `${month}월 ${day}일 ${DAY_KR[date.getDay()]}`;
}

export default function History() {
  const nickname = localStorage.getItem('nickname') ?? '';
  const todayStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [habits, setHabits] = useState<HistoryHabit[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (!selectedDate) return;
    getHistory(selectedDate).then((data) => {
      setHabits(data.habits);
      setCompletedCount(data.completedCount);
    });
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <Navbar variant="greeting" nickname={nickname} />

      <div className="mt-[15px]">
        <HistoryCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>

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
                  key={habit.habitId}
                  title={habit.name}
                  category={habit.category as HabitCategory}
                  completed={habit.completed}
                  checkedAt={habit.checkedAtKst}
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
    </div>
  );
}
