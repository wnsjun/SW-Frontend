import { typo } from '../../styles/typography';
import type { HabitCategory } from './HabitCard';

export type HabitFilter = HabitCategory | 'ALL';

const FILTERS: { label: string; value: HabitFilter }[] = [
  { label: '전체', value: 'ALL' },
  { label: '건강', value: 'HEALTH' },
  { label: '학습', value: 'LEARNING' },
  { label: '생산성', value: 'PRODUCTIVITY' },
  { label: '기타', value: 'ETC' },
];

interface Props {
  selected: HabitFilter;
  onChange: (filter: HabitFilter) => void;
}

export default function HabitFilter({ selected, onChange }: Props) {
  return (
    <div className="flex items-center" style={{ gap: '10px' }}>
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`${typo.B4_Rg} text-[#3D4A3E] text-center tracking-[0.6px] cursor-pointer`}
          style={{
            padding: '8px 16px',
            borderRadius: '9999px',
            background: selected === value ? '#64A8FE' : '#E7E8E9',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
