import { typo } from '../../styles/typography';
import addCircleIcon from '../../assets/add-circle.svg';
import chevronRightIcon from '../../assets/chevron-right.svg';

interface Props {
  onClick?: () => void;
}

export default function AddHabitCard({ onClick }: Props) {
  return (
    <div
      className="flex justify-between items-center self-stretch cursor-pointer"
      style={{
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #F3F4F6',
        background: '#FFF',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
      }}
      onClick={onClick}
    >
      <div className="flex items-center" style={{ gap: '10px' }}>
        <div
          className="flex justify-center items-center shrink-0"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            background: 'rgba(231, 232, 233, 0.50)',
          }}
        >
          <img src={addCircleIcon} width={20} height={20} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <span className={`${typo.T1_Md} text-[#191C1D]`} style={{ lineHeight: '27px' }}>
            새로운 습관 추가하기
          </span>
        </div>
      </div>

      <img src={chevronRightIcon} width={8} height={12} alt="" />
    </div>
  );
}
