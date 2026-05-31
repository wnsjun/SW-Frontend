import { typo } from '../../styles/typography';

export type DayFilter = 'TODAY' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

const DAYS: { label: string; value: DayFilter }[] = [
  { label: '오늘', value: 'TODAY' },
  { label: '월', value: 'MON' },
  { label: '화', value: 'TUE' },
  { label: '수', value: 'WED' },
  { label: '목', value: 'THU' },
  { label: '금', value: 'FRI' },
  { label: '토', value: 'SAT' },
  { label: '일', value: 'SUN' },
];

interface Props {
  selected: DayFilter;
  onChange: (day: DayFilter) => void;
}

export default function DayFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <span
        className={`${typo.B4_Rg} text-[#3D4A3E] tracking-[0.6px]`}
        style={{ lineHeight: '16px' }}
      >
        요일 필터
      </span>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {DAYS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`${typo.B4_Rg} tracking-[0.6px] inline-flex flex-col justify-center items-center`}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              border: '1px solid #BCCABB',
              background: selected === value ? '#006D36' : '#FFF',
              color: selected === value ? '#FFF' : '#3D4A3E',
              lineHeight: '16px',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
