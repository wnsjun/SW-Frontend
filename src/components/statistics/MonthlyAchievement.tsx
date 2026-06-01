import { typo } from '../../styles/typography';

const RADIUS = 65;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Props {
  rate: number;
  improvedFromLastMonth?: number;
}

export default function MonthlyAchievement({ rate }: Props) {
  const percentage = Math.round(rate);
  const offset = CIRCUMFERENCE * (1 - percentage / 100);

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{
        height: '246px',
        borderRadius: '12px',
        border: '1px solid #E7E8E9',
        background: '#FFF',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        paddingTop: '25px',
      }}
    >
      <span
        className="font-pretendard-sb text-[#3D4A3E] text-center tracking-[0.6px] uppercase"
        style={{ fontSize: '20px', lineHeight: '16px' }}
      >
        이번달 달성률
      </span>

      <div className="relative flex items-center justify-center" style={{ marginTop: '15px' }}>
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r={RADIUS} fill="none" stroke="#E5F0E8" strokeWidth="10" />
          <circle
            cx="75"
            cy="75"
            r={RADIUS}
            fill="none"
            stroke="#006D36"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 75 75)"
          />
        </svg>
        <span className={`${typo.T2_Bd} text-[#3D4A3E] absolute`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}
