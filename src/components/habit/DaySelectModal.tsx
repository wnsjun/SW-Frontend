import { useState } from 'react';
import { typo } from '../../styles/typography';
import Button from '../common/Button';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

interface Props {
  selected: string[];
  onConfirm: (days: string[]) => void;
  onCancel: () => void;
}

export default function DaySelectModal({ selected, onConfirm, onCancel }: Props) {
  const [days, setDays] = useState<string[]>(selected);

  const toggle = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={onCancel}
    >
      <div
        className="flex flex-col w-[300px]"
        style={{ padding: '24px 20px 20px', borderRadius: '16px', background: '#FFF', gap: '20px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={`${typo.B2_Md} text-[#191C1D]`}>요일 선택</span>

        <div className="grid grid-cols-7 gap-1.5">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => toggle(day)}
              className={`${typo.B4_Rg} text-[#3D4A3E] flex items-center justify-center aspect-square rounded-full cursor-pointer`}
              style={{
                border: days.includes(day) ? '2px solid #006D36' : '1px solid #BCCABB',
                background: days.includes(day) ? 'rgba(74, 222, 128, 0.10)' : '#FFF',
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <Button onClick={() => onConfirm(days)} className="w-full">확인</Button>
      </div>
    </div>
  );
}
