import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { typo } from '../../styles/typography';
import { postLogin } from '../../api/auth';

export default function LoginForm() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await postLogin({ routinerId: id, password });
      navigate('/home');
    } catch {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start gap-6 self-stretch rounded-xl border border-[#F3F4F6] bg-white p-6 shadow-[0_2px_8px_0_rgba(0,0,0,0.04)]"
    >
      <div className="flex flex-col gap-4 w-full">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          className="h-16 w-full rounded-lg bg-[#E5EEFF] px-4 outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="h-16 w-full rounded-lg bg-[#E5EEFF] px-4 outline-none"
        />
      </div>
      {error && <p className={`${typo.B4_Sb} text-red-500 self-center`}>{error}</p>}
      <Button type="submit">로그인</Button>
      <span className={`${typo.B4_Sb} tracking-[0.36px] text-[#45464D] self-center`}>
        비밀번호를 잊으셨나요?
      </span>
      <p className="self-center">
        <span className={`${typo.B2_Rg} text-[#45464D]`}>계정이 없으신가요? </span>
        <span
          className={`${typo.B2_Bd} text-black cursor-pointer`}
          onClick={() => navigate('/signup')}
        >
          회원가입
        </span>
      </p>
    </form>
  );
}
