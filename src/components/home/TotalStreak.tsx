import { typo } from '../../styles/typography';
import flameIcon from '../../assets/flame.svg';

interface Props {
  streak: number;
}

export default function TotalStreak({ streak }: Props) {
  return (
    <div
      className="flex flex-col items-start"
      style={{
        padding: '17px',
        gap: '12.5px',
        justifySelf: 'stretch',
        alignSelf: 'stretch',
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
        전체 스트릭
      </span>

      <div className="flex flex-col items-center self-stretch gap-3" style={{ marginTop: '8px' }}>
        <span
          className={`${typo.Display_Bd} text-[#191C1D]`}
          style={{ lineHeight: '40px', letterSpacing: '-0.64px' }}
        >
          {streak}
        </span>
        <img src={flameIcon} width={24} height={27} alt="" />
        <span className={`${typo.Cap_Md} text-[#3D4A3E] mt-1`}>오늘도 화이팅</span>
      </div>
    </div>
  );
}
