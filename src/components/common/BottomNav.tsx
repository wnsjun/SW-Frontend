import { useLocation, useNavigate } from 'react-router-dom';
import { Home, CheckSquare, BarChart2, User } from 'lucide-react';
import { typo } from '../../styles/typography';

const NAV_ITEMS = [
  { label: '홈', icon: Home, path: '/home' },
  { label: '루틴', icon: CheckSquare, path: '/routine' },
  { label: '통계', icon: BarChart2, path: '/stats' },
  { label: '마이페이지', icon: User, path: '/mypage' },
] as const;

const HIDDEN_PATHS = ['/', '/signup'];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  if (HIDDEN_PATHS.includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-[#E8E8E8]">
      <ul className="flex items-center justify-around h-[64px] px-2">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          const color = isActive ? '#006D36' : '#A0A0A0';

          return (
            <li key={path} className="flex-1">
              <button
                onClick={() => navigate(path)}
                className="flex flex-col items-center justify-center gap-1 w-full h-full"
              >
                <Icon size={22} color={color} strokeWidth={isActive ? 2.5 : 1.8} />
                <span
                  className={isActive ? typo.B4_Sb : 'font-pretendard-rg text-b4'}
                  style={{ color }}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
