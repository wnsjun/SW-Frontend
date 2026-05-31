import { typo } from '../../styles/typography';

type NavbarProps =
  | { variant?: 'default'; title: string; nickname?: never }
  | { variant: 'greeting'; nickname: string; title?: never };

export default function Navbar({ variant = 'default', title, nickname }: NavbarProps) {
  if (variant === 'greeting') {
    return (
      <nav className="flex w-[390px] px-5 py-4 items-center border-b-[3px] border-[#F3F4F6]">
        <span className={`${typo.B2_Md} text-[#006D36]`} style={{ lineHeight: '24px' }}>
          좋은 아침이에요, {nickname}님
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
