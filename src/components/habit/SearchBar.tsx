import { Search } from 'lucide-react';
import { typo } from '../../styles/typography';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div
      className="flex items-center gap-2 w-full"
      style={{
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid #BCCABB',
        background: '#F3F4F5',
      }}
    >
      <Search size={18} color="#6D7B6D" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="습관 검색하기"
        className={`${typo.B3_Rg} text-[#191C1D] bg-transparent outline-none w-full placeholder:text-[#BCCABB]`}
      />
    </div>
  );
}
