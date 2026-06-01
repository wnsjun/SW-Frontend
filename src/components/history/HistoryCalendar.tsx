import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface Props {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export default function HistoryCalendar({ selectedDate, onSelectDate }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-');

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const getDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const isFuture = (day: number) => getDateStr(day) > todayStr;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col px-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1">
          <ChevronLeft size={20} color="#191C1D" />
        </button>
        <span className="font-pretendard-md text-[#191C1D]" style={{ fontSize: '16px', lineHeight: '24px' }}>
          {viewYear}년 {viewMonth + 1}월
        </span>
        <button onClick={nextMonth} className="p-1">
          <ChevronRight size={20} color="#191C1D" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="font-pretendard-rg text-center py-1"
            style={{ fontSize: '12px', color: '#A0A0A0' }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} className="aspect-square" />;

          const dateStr = getDateStr(day);
          const future = isFuture(day);
          const isSelected = selectedDate === dateStr;
          const isToday = dateStr === todayStr;

          const textColor = isSelected ? '#FFF' : future ? '#C4C4C4' : '#191C1D';
          const bg = isSelected
            ? '#006D36'
            : isToday
            ? 'rgba(0, 109, 54, 0.10)'
            : 'transparent';

          return (
            <div key={idx} className="flex items-center justify-center aspect-square">
              <button
                onClick={() => !future && onSelectDate(dateStr)}
                disabled={future}
                className="flex items-center justify-center w-8 h-8 rounded-full font-pretendard-rg"
                style={{ fontSize: '14px', color: textColor, background: bg }}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
