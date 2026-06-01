import { typo } from '../../styles/typography';
import type { HabitCategory } from '../home/HabitCard';
import checkIcon from '../../assets/check.svg';

const CATEGORY_BG: Record<HabitCategory, string> = {
  HEALTH: 'rgba(74, 222, 128, 0.20)',
  LEARNING: 'rgba(96, 165, 250, 0.20)',
  PRODUCTIVITY: 'rgba(251, 191, 36, 0.20)',
  ETC: 'rgba(203, 213, 225, 0.20)',
};

function formatCheckedAt(checkedAtKst: string | null): string | null {
  if (!checkedAtKst) return null;
  const date = new Date(checkedAtKst);
  if (isNaN(date.getTime())) return null;
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m} 완료`;
}

interface Props {
  title: string;
  category: HabitCategory;
  completed: boolean;
  checkedAt?: string | null;
}

export default function HistoryHabitCard({ title, category, completed, checkedAt }: Props) {
  const checkedLabel = formatCheckedAt(checkedAt ?? null);

  return (
    <div
      className="flex justify-between items-center self-stretch"
      style={{
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #F3F4F6',
        background: '#FFF',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="flex items-center" style={{ gap: '10px' }}>
        <div
          className="flex justify-center items-center shrink-0"
          style={{ width: '48px', height: '48px', borderRadius: '8px', background: CATEGORY_BG[category] }}
        />
        <div className="flex flex-col gap-1">
          <span className={`${typo.T1_Md} text-[#191C1D]`} style={{ lineHeight: '27px' }}>
            {title}
          </span>
          {checkedLabel && (
            <span
              className={`${typo.Cap_Md} text-[#3D4A3E] w-fit`}
              style={{ padding: '2px 8px', borderRadius: '9999px', background: '#EDEEEF', lineHeight: '14px' }}
            >
              {checkedLabel}
            </span>
          )}
        </div>
      </div>

      <div
        className="flex justify-center items-center shrink-0"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '9999px',
          background: completed ? '#4ADE80' : '#E1E3E4',
        }}
      >
        {completed ? (
          <img src={checkIcon} width={14} height={11} alt="완료" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
            <path d="M0 2V0H14V2H0Z" fill="#3D4A3E" />
          </svg>
        )}
      </div>
    </div>
  );
}
