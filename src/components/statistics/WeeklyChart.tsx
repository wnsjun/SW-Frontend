const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const MAX_BAR_HEIGHT = 100;

interface DayData {
  day: string;
  percentage: number;
}

interface Props {
  data?: DayData[];
}

export default function WeeklyChart({ data = [] }: Props) {
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
        주간 달성 현황
      </span>

      <div className="flex items-end justify-between">
        {DAYS.map((day) => {
          const item = data.find((d) => d.day === day);
          const pct = item?.percentage ?? 0;
          const barHeight = Math.round((pct / 100) * MAX_BAR_HEIGHT);

          return (
            <div key={day} className="flex flex-col items-center" style={{ gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: `${MAX_BAR_HEIGHT}px`,
                  borderRadius: '8px',
                  background: '#E5F0E8',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${barHeight}px`,
                    background: 'linear-gradient(180deg, #4ADE80 0%, #006D36 100%)',
                    borderRadius: '8px',
                    transition: 'height 0.3s ease',
                  }}
                />
              </div>
              <span
                className="font-pretendard-rg text-[#A0A0A0]"
                style={{ fontSize: '12px', lineHeight: '16px' }}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
