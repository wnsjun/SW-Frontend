import { typo } from '../../styles/typography';

interface ProfileSectionProps {
  nickname: string;
  onEditProfile?: () => void;
}

export default function ProfileSection({ nickname, onEditProfile }: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline gap-[4px]">
        <span className={`${typo.H1_Bd} text-[#191C1D] tracking-[-0.24px]`}>
          {nickname}
        </span>
        <span className={`${typo.T1_Sb} text-[#3D4A3E]`}>
          님
        </span>
      </div>

      <div className="mt-[35px]">
        <button
          onClick={onEditProfile}
          className="inline-flex flex-col items-center justify-center px-[24px] py-[8px] rounded-full border border-[#6D7B6D] cursor-pointer"
        >
          <span className={`${typo.B2_Md} text-[#006D36] text-center`}>
            프로필 수정
          </span>
        </button>
      </div>
    </div>
  );
}
