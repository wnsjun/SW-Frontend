import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ProfileSection from '../components/mypage/ProfileSection';
import StatsSection from '../components/mypage/StatsSection';
import SettingsSection from '../components/mypage/SettingsSection';
import NicknameEditModal from '../components/mypage/NicknameEditModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { typo } from '../styles/typography';
import logoutIcon from '../assets/logout.svg';
import { getMyProfile, patchNickname, postLogout, deleteUser } from '../api/user';

export default function Mypage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(localStorage.getItem('nickname') ?? '');
  const [activeHabits, setActiveHabits] = useState(0);
  const [achievementRate, setAchievementRate] = useState(0);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  useEffect(() => {
    getMyProfile().then((res) => {
      if (res.data) {
        setNickname(res.data.nickname);
        setActiveHabits(res.data.activeHabitCount);
        setAchievementRate(res.data.monthlyAchievementRate);
        localStorage.setItem('nickname', res.data.nickname);
      }
    }).catch(() => {});
  }, []);

  const handleNicknameSave = async (newNickname: string) => {
    try {
      await patchNickname(newNickname);
      setNickname(newNickname);
      localStorage.setItem('nickname', newNickname);
    } catch {}
    setShowNicknameModal(false);
  };

  const handleLogout = async () => {
    try {
      await postLogout();
    } catch {}
    localStorage.clear();
    navigate('/');
  };

  const handleWithdraw = async () => {
    try {
      await deleteUser();
    } catch {}
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <Navbar variant="greeting" nickname={nickname} />

      <div className="flex flex-col px-6">
        <div className="mt-[32px] flex justify-center">
          <ProfileSection nickname={nickname} onEditProfile={() => setShowNicknameModal(true)} />
        </div>

        <div className="mt-[32px]">
          <StatsSection activeHabits={activeHabits} achievementRate={achievementRate} />
        </div>

        <div className="mt-[32px]">
          <SettingsSection
            onHabitManage={() => navigate('/habits')}
            onWithdraw={() => setShowWithdrawConfirm(true)}
          />
        </div>

        <button
          className="mt-[32px] flex items-center justify-center gap-[5px] cursor-pointer"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <img src={logoutIcon} alt="logout" />
          <span className={`${typo.B2_Rg} text-[#3D4A3E]`} style={{ lineHeight: '24px' }}>
            로그아웃
          </span>
        </button>
      </div>

      {showNicknameModal && (
        <NicknameEditModal
          currentNickname={nickname}
          onConfirm={handleNicknameSave}
          onCancel={() => setShowNicknameModal(false)}
        />
      )}

      {showLogoutConfirm && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          confirmLabel="로그아웃"
          confirmColor="#006D36"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

      {showWithdrawConfirm && (
        <ConfirmModal
          message={`정말 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제됩니다.`}
          confirmLabel="탈퇴"
          confirmColor="#BA1A1A"
          onConfirm={handleWithdraw}
          onCancel={() => setShowWithdrawConfirm(false)}
        />
      )}
    </div>
  );
}
