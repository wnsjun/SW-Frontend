import { typo } from '../../styles/typography';
import calendarIcon from '../../assets/calendar.svg';
import screenIcon from '../../assets/screen.svg';
import exitIcon from '../../assets/exit.svg';

function NextIcon({ color }: { color: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
      <path d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z" fill={color} />
    </svg>
  );
}

interface Props {
  onWithdraw?: () => void;
  onHabitManage?: () => void;
}

export default function SettingsSection({ onWithdraw, onHabitManage }: Props) {
  return (
    <div
      className="flex flex-col"
      style={{ borderRadius: '12px', border: '1px solid rgba(188, 202, 187, 0.20)', background: '#FFF', boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)', overflow: 'hidden' }}
    >
      {/* 환경설정 타이틀 */}
      <div className="flex flex-col items-start self-stretch px-[4px] py-0">
        <span className={`${typo.B2_Rg} text-[#3D4A3E]`}>환경설정</span>
      </div>

      {/* 습관 관리 */}
      <button
        className="flex items-center justify-between self-stretch p-[16px] cursor-pointer"
        onClick={onHabitManage}
      >
        <div className="flex items-center gap-[16px]">
          <img src={calendarIcon} alt="calendar" />
          <span className={`${typo.B2_Rg} text-[#191C1D]`} style={{ lineHeight: '24px' }}>
            습관 관리
          </span>
        </div>
        <NextIcon color="#6D7B6D" />
      </button>

      {/* 화면 설정 */}
      <div
        className="flex items-center justify-between self-stretch p-[16px]"
        style={{ borderTop: '1px solid rgba(188, 202, 187, 0.30)' }}
      >
        <div className="flex items-center gap-[16px]">
          <img src={screenIcon} alt="screen" />
          <span className={`${typo.B2_Rg} text-[#191C1D]`} style={{ lineHeight: '24px' }}>
            화면 설정
          </span>
        </div>
      </div>

      {/* 계정 관리 타이틀 */}
      <div className="flex flex-col items-start self-stretch px-[4px] py-0 mt-[5px]">
        <span className={`${typo.B2_Rg} text-[#3D4A3E]`}>계정 관리</span>
      </div>

      {/* 회원 탈퇴 */}
      <button
        className="flex items-center justify-between self-stretch p-[16px] cursor-pointer"
        style={{ borderTop: '1px solid rgba(188, 202, 187, 0.30)' }}
        onClick={onWithdraw}
      >
        <div className="flex items-center gap-[16px]">
          <img src={exitIcon} alt="exit" />
          <span className={`${typo.B2_Rg} text-[#BA1A1A]`} style={{ lineHeight: '24px' }}>
            회원 탈퇴
          </span>
        </div>
        <NextIcon color="#BA1A1A" />
      </button>
    </div>
  );
}
