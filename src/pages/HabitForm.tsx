import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import HabitFormBanner from '../components/habit/HabitFormBanner';
import DaySelectModal from '../components/habit/DaySelectModal';
import { typo } from '../styles/typography';
import type { HabitCategory } from '../components/home/HabitCard';
import type { DayOfWeek } from '../types/habit';
import { getHabits, postHabit, putHabit } from '../api/habit';

type FrequencyType = 'DAILY' | 'CUSTOM';

const DAY_ORDER = ['월', '화', '수', '목', '금', '토', '일'];
const sortDays = (days: string[]) => [...days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));

const CATEGORIES: { value: HabitCategory; label: string }[] = [
  { value: 'HEALTH', label: '건강' },
  { value: 'LEARNING', label: '학습' },
  { value: 'PRODUCTIVITY', label: '생산성' },
  { value: 'ETC', label: '기타' },
];

const KOREAN_TO_DOW: Record<string, DayOfWeek> = {
  '월': 'MONDAY', '화': 'TUESDAY', '수': 'WEDNESDAY',
  '목': 'THURSDAY', '금': 'FRIDAY', '토': 'SATURDAY', '일': 'SUNDAY',
};
const DOW_TO_KOREAN: Record<DayOfWeek, string> = {
  MONDAY: '월', TUESDAY: '화', WEDNESDAY: '수',
  THURSDAY: '목', FRIDAY: '금', SATURDAY: '토', SUNDAY: '일',
};

const LABEL_STYLE = `${typo.B2_Rg} text-[#3D4A3E]`;

export default function HabitForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<FrequencyType | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [category, setCategory] = useState<HabitCategory | null>(null);
  const [showDayModal, setShowDayModal] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getHabits().then((habits) => {
      const habit = habits.find((h) => h.id === Number(id));
      if (!habit) return;
      setName(habit.name);
      setCategory(habit.category as HabitCategory);
      if (habit.frequencyType === 'DAILY') {
        setFrequency('DAILY');
      } else if (habit.frequencyType === 'CUSTOM') {
        setFrequency('CUSTOM');
        setSelectedDays(habit.customDays.map((d) => DOW_TO_KOREAN[d]));
      }
    });
  }, [id, isEdit]);

  const handleFrequencyClick = (type: FrequencyType) => {
    setFrequency(type);
    if (type === 'CUSTOM') setShowDayModal(true);
    if (type === 'DAILY') setSelectedDays([]);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !frequency || !category) return;
    const customDays = frequency === 'CUSTOM'
      ? selectedDays.map((d) => KOREAN_TO_DOW[d])
      : null;

    if (isEdit) {
      await putHabit(Number(id), { name, category, frequencyType: frequency, customDays });
    } else {
      await postHabit({ name, category, frequencyType: frequency, customDays });
    }
    navigate('/habits');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="back" title={isEdit ? '습관 수정' : '습관 등록'} />

      <div className="flex flex-col px-5 pb-10">
        <div className="mt-[24px]">
          <HabitFormBanner />
        </div>

        {/* 습관 이름 */}
        <div className="flex flex-col gap-2 mt-[30px]">
          <span className={LABEL_STYLE} style={{ lineHeight: '24px' }}>습관 이름</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="습관 이름을 입력해주세요"
            className={`${typo.B2_Rg} text-[#191C1D] outline-none placeholder:text-[#BCCABB] w-full`}
            style={{
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #BCCABB',
              background: '#FFF',
              boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
            }}
          />
        </div>

        {/* 목표 빈도 */}
        <div className="flex flex-col gap-2 mt-[40px]">
          <span className={LABEL_STYLE} style={{ lineHeight: '24px' }}>목표 빈도</span>
          <div className="grid grid-cols-2 gap-3">
            {(['DAILY', 'CUSTOM'] as FrequencyType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleFrequencyClick(type)}
                className={`${typo.B1_Rg} text-[#3D4A3E] text-center flex flex-col items-center justify-center`}
                style={{
                  padding: '17px',
                  borderRadius: '12px',
                  border: frequency === type ? '2px solid #006D36' : '1px solid #BCCABB',
                  background: '#FFF',
                  lineHeight: '24px',
                }}
              >
                {type === 'DAILY' ? '매일' : '요일 선택'}
                {type === 'CUSTOM' && frequency === 'CUSTOM' && selectedDays.length > 0 && (
                  <span className={`${typo.Cap_Md} text-[#006D36] mt-1`}>
                    {selectedDays.join(', ')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex flex-col gap-2 mt-[24px]">
          <span className={LABEL_STYLE} style={{ lineHeight: '24px' }}>카테고리</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                className={`${typo.B3_Rg} text-[#3D4A3E] inline-flex items-center`}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: category === value ? '1px solid #006D36' : '1px solid #BCCABB',
                  background: category === value ? 'rgba(74, 222, 128, 0.10)' : '#FFF',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[30px] flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={
              !name.trim() ||
              frequency === null ||
              category === null ||
              (frequency === 'CUSTOM' && selectedDays.length === 0)
            }
          >
            저장하기
          </Button>
        </div>
      </div>

      {showDayModal && (
        <DaySelectModal
          selected={selectedDays}
          onConfirm={(days) => {
            setSelectedDays(sortDays(days));
            setShowDayModal(false);
          }}
          onCancel={() => {
            setFrequency(isEdit ? 'CUSTOM' : 'DAILY');
            setShowDayModal(false);
          }}
        />
      )}
    </div>
  );
}
