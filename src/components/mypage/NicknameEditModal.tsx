import { useState } from 'react';
import { typo } from '../../styles/typography';
import Button from '../common/Button';

interface Props {
  currentNickname: string;
  onConfirm: (nickname: string) => void;
  onCancel: () => void;
}

export default function NicknameEditModal({ currentNickname, onConfirm, onCancel }: Props) {
  const [nickname, setNickname] = useState(currentNickname);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={onCancel}
    >
      <div
        className="flex flex-col w-[300px]"
        style={{ padding: '24px 20px 20px', borderRadius: '16px', background: '#FFF', gap: '20px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={`${typo.B2_Md} text-[#191C1D]`}>닉네임 수정</span>

        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          className={`${typo.B2_Rg} text-[#191C1D] outline-none placeholder:text-[#BCCABB] w-full`}
          style={{
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #BCCABB',
            background: '#FFF',
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
          }}
        />

        <Button
          onClick={() => nickname.trim() && onConfirm(nickname.trim())}
          disabled={!nickname.trim()}
          className="w-full"
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
