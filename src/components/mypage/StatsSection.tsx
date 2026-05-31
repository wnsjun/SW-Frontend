import { typo } from '../../styles/typography';

interface StatsSectionProps {
  activeHabits: number;
  achievementRate: number;
}

function StatCard({
  value,
  label,
  valueColor,
}: {
  value: string;
  label: string;
  valueColor: string;
}) {
  return (
    <div
      className="flex flex-col items-center p-[16px] rounded-[12px]"
      style={{
        flex: 1,
        background: '#FFF',
        border: '1px solid rgba(188, 202, 187, 0.20)',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
      }}
    >
      <span className={`${typo.T1_Md}`} style={{ color: valueColor, lineHeight: '24px' }}>
        {value}
      </span>
      <span className={`${typo.B2_Md} text-[#3D4A3E]`} style={{ lineHeight: '24px' }}>
        {label}
      </span>
    </div>
  );
}

export default function StatsSection({ activeHabits, achievementRate }: StatsSectionProps) {
  return (
    <div className="flex gap-[12px]">
      <StatCard
        value={String(activeHabits)}
        label="활성습관"
        valueColor="#006D36"
      />
      <StatCard
        value={`${achievementRate}%`}
        label="달성률"
        valueColor="#735C00"
      />
    </div>
  );
}
