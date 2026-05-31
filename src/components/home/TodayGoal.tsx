import { typo } from '../../styles/typography';

interface Props {
  total: number;
  completed: number;
}

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TodayGoal({ total, completed }: Props) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  const offset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div
      className="flex flex-col items-start"
      style={{
        padding: '17px',
        gap: '12.5px',
        aspectRatio: '1 / 1',
        justifySelf: 'stretch',
        borderRadius: '12px',
        border: '1px solid rgba(188, 202, 187, 0.20)',
        background: '#FFF',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
      }}
    >
      <span
        className={`${typo.B3_Rg} text-[#3D4A3E] uppercase tracking-[0.6px]`}
        style={{ lineHeight: '16px' }}
      >
        오늘의 목표
      </span>

      <div className="flex flex-col items-center self-stretch" style={{ marginTop: '7.5px' }}>
        <div className="relative flex items-center justify-center">
          <svg width="86" height="86" viewBox="0 0 86 86">
            <circle cx="43" cy="43" r={RADIUS} fill="none" stroke="#E5F0E8" strokeWidth="8" />
            <circle
              cx="43"
              cy="43"
              r={RADIUS}
              fill="none"
              stroke="#006D36"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              transform="rotate(-90 43 43)"
            />
          </svg>
          <span className={`${typo.T2_Bd} text-[#3D4A3E] absolute`}>
            {percentage}%
          </span>
        </div>

        <span
          className={`${typo.B3_Rg} text-[#3D4A3E] text-center`}
          style={{ marginTop: '20px', fontSize: '13px', lineHeight: '14px' }}
        >
          습관 {total}개 중 {completed}개 완료
        </span>
      </div>
    </div>
  );
}
