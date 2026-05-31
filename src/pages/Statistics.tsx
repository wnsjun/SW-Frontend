import Navbar from '../components/common/Navbar';
import AiCoaching from '../components/home/AiCoaching';
import MonthlyAchievement from '../components/statistics/MonthlyAchievement';
import AiInsight from '../components/statistics/AiInsight';
import WeeklyChart from '../components/statistics/WeeklyChart';
import CategoryAchievement from '../components/statistics/CategoryAchievement';

const MOCK_AI_MESSAGE =
  '이번 달 전반적인 습관 달성률이 지난 달보다 12% 향상되었어요! 특히 건강 카테고리의 꾸준한 실천이 돋보입니다. 학습 습관도 조금 더 신경 써보면 더욱 균형 잡힌 성장을 이룰 수 있을 것 같아요. 이 페이스를 유지해봐요! 💪';

export default function Statistics() {
  const nickname = localStorage.getItem('nickname') ?? '';

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <Navbar variant="greeting" nickname={nickname} />

      <div className="flex flex-col px-5">
        <div className="mt-[15px]">
          <AiCoaching />
        </div>

        <div className="mt-[35px]">
          <MonthlyAchievement total={30} completed={20} />
        </div>

        <div className="mt-[35px]">
          <AiInsight message={MOCK_AI_MESSAGE} />
        </div>

        <div className="mt-[35px]">
          <WeeklyChart />
        </div>

        <div className="mt-[35px]">
          <CategoryAchievement />
        </div>
      </div>
    </div>
  );
}
