import { typo } from '../../styles/typography';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-primary ${typo.T1_Md} text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
