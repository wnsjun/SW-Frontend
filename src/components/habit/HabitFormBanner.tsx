import { typo } from '../../styles/typography';

export default function HabitFormBanner() {
  return (
    <div
      className="flex items-center"
      style={{
        height: '128px',
        padding: '0 24px',
        borderRadius: '12px',
        border: '1px solid rgba(74, 222, 128, 0.30)',
        background: 'rgba(74, 222, 128, 0.20)',
      }}
    >
      <div className="flex flex-col gap-1">
        <span className={`${typo.T1_Rg} text-[#005E2D]`} style={{ lineHeight: '24px' }}>
          빛나는 변화의 시작
        </span>
        <span className={`${typo.B2_Rg}`} style={{ lineHeight: '20px', color: 'rgba(0, 94, 45, 0.80)' }}>
          새로운 습관으로 당신의 하루를 채워보세요.
        </span>
      </div>
    </div>
  );
}
