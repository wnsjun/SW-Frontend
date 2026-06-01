import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { typo } from '../../styles/typography';

type NavbarProps =
  | { variant?: 'default'; title: string; nickname?: never }
  | { variant: 'greeting'; nickname: string; title?: never }
  | { variant: 'back'; title: string; nickname?: never };

export default function Navbar({ variant = 'default', title, nickname }: NavbarProps) {
  const navigate = useNavigate();

  if (variant === 'greeting') {
    return (
      <nav className="flex w-[390px] px-5 py-4 items-center border-b-[3px] border-[#F3F4F6]">
        <span className={`${typo.B2_Md} text-[#006D36]`} style={{ lineHeight: '24px' }}>
          좋은 하루 보내세요, {nickname}님
        </span>
      </nav>
    );
  }

  if (variant === 'back') {
    return (
      <nav className="relative flex w-[390px] px-5 py-4 items-center border-b-[3px] border-[#F3F4F6]">
        <button onClick={() => navigate(-1)} className="flex items-center">
          <ChevronLeft size={24} color="#006D36" />
        </button>
        <span
          className={`${typo.H1_Md} text-[#006D36] tracking-[-0.24px] absolute left-1/2 -translate-x-1/2`}
          style={{ lineHeight: '32px' }}
        >
          {title}
        </span>
      </nav>
    );
  }

  return (
    <nav className="flex w-[390px] px-5 py-4 justify-center items-center border-b-[3px] border-[#F3F4F6]">
      <span className={`${typo.T1_Eb} tracking-[-0.5px] text-black`}>
        {title}
      </span>
    </nav>
  );
}
