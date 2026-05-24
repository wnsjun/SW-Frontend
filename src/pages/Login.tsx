import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { typo } from '../styles/typography';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar title="Routiner" />
      <div className="flex flex-col items-center px-6 pt-[50px]">
        <h1 className={`${typo.Display_Sb} tracking-[-0.32px] text-[#0B1C30] text-center`}>
          환영합니다!
        </h1>
        <p className={`mt-[10px] ${typo.B2_Rg} text-[#45464D] text-center`}>
          루티와 함께 오늘의 습관을 시작해볼까요?
        </p>
        <div className="mt-6 w-full">
          <LoginForm />
        </div>
        {/* 임시 버튼 */}
        <div className="mt-4 w-full">
          <Button className="w-full" onClick={() => navigate('/home')}>
            홈 화면으로 이동 (임시)
          </Button>
        </div>
      </div>
    </div>
  );
}
