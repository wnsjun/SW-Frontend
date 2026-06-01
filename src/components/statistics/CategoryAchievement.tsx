import { typo } from '../../styles/typography';

interface CategoryData {
  label: string;
  percentage: number;
  color: string;
}

interface Props {
  data?: CategoryData[];
}

export default function CategoryAchievement({ data = [] }: Props) {
  return (
    <div
      className="flex flex-col w-full"
      style={{
        padding: '24px 20px 20px',
        borderRadius: '12px',
        border: '1px solid #E7E8E9',
        background: '#FFF',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        gap: '20px',
      }}
    >
      <span
        className="font-pretendard-sb text-[#3D4A3E] tracking-[0.6px] uppercase"
        style={{ fontSize: '16px', lineHeight: '16px' }}
      >
        이번달 카테고리별 상세 달성률
      </span>

      <div className="flex flex-col" style={{ gap: '16px' }}>
        {data.map(({ label, percentage, color }) => (
          <div key={label} className="flex flex-col" style={{ gap: '8px' }}>
            <div className="flex justify-between items-center">
              <span className={`${typo.B3_Rg} text-[#3D4A3E]`}>{label}</span>
              <span className={`${typo.B3_Rg} text-[#3D4A3E]`}>{percentage}%</span>
            </div>
            <div
              style={{
                height: '8px',
                borderRadius: '9999px',
                background: '#E5F0E8',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${percentage}%`,
                  borderRadius: '9999px',
                  background: color,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
