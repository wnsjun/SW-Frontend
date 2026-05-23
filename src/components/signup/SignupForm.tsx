import { useState } from 'react';
import Button from '../common/Button';
import { typo } from '../../styles/typography';

const FIELDS = [
  { label: '닉네임', placeholder: '사용하실 닉네임을 입력해주세요', type: 'text', key: 'nickname' },
  { label: '아이디', placeholder: '아이디를 입력해주세요', type: 'text', key: 'id' },
  { label: '비밀번호', placeholder: '비밀번호를 입력해주세요', type: 'password', key: 'password' },
  { label: '비밀번호 확인', placeholder: '비밀번호를 다시 입력해주세요', type: 'password', key: 'passwordConfirm' },
] as const;

type FieldKey = (typeof FIELDS)[number]['key'];

export default function SignupForm() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    nickname: '',
    id: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4">
        {FIELDS.map(({ label, placeholder, type, key }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className={`${typo.B4_Sb} tracking-[0.6px] text-[#3D4A3E] self-stretch`}>
              {label}
            </label>
            <input
              type={type}
              value={values[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              className="pt-[17px] px-4 pb-4 rounded-lg border border-[#BCCABB] bg-[#F3F4F5] w-full outline-none"
            />
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-[30px] self-center">
        계정 생성하기
      </Button>
    </div>
  );
}
