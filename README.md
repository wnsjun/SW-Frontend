# 🌿 Routiner Frontend

> 개인 습관/루틴 트래커 + AI 코치 **루티너**의 프론트엔드 레포지토리입니다.

<br/>

## 🛠 기술 스택

| 분류 | 사용 기술 |
|------|----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| HTTP | Axios (Bearer 토큰 인터셉터) |
| Routing | React Router DOM |
| DnD | @dnd-kit (습관 카드 순서 정렬) |
| Deploy | Vercel |

<br/>

## 🚀 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build
```

### 환경변수

프로젝트 루트에 `.env` 파일 생성:

```env
VITE_API_BASE_URL=https://loutiner.p-e.kr
```

<br/>

## 📁 프로젝트 구조

```
src/
├── api/              # Axios API 호출 함수
│   ├── instance.ts   # Axios 인스턴스 (인터셉터 설정)
│   ├── auth.ts       # 로그인 / 회원가입
│   ├── habit.ts      # 습관 CRUD, 체크인
│   ├── history.ts    # 날짜별 히스토리 조회
│   ├── stats.ts      # 통계 대시보드
│   ├── ai.ts         # AI 코칭 / 인사이트
│   └── user.ts       # 프로필, 닉네임 수정, 탈퇴
│
├── types/            # TypeScript 타입 정의
│
├── components/
│   ├── common/       # Navbar, BottomNav, Button, ConfirmModal
│   ├── home/         # HabitCard, HabitFilter, AiCoaching, TodayGoal 등
│   ├── habit/        # DayFilter, DaySelectModal, SearchBar, SortableHabitCard
│   ├── history/      # HistoryCalendar, HistoryHabitCard
│   ├── statistics/   # MonthlyAchievement, WeeklyChart, CategoryAchievement, AiInsight
│   └── mypage/       # ProfileSection, StatsSection, SettingsSection, NicknameEditModal
│
├── pages/
│   ├── Home.tsx          # 오늘의 습관 + AI 코칭
│   ├── HabitList.tsx     # 나의 습관 목록 (편집/정렬)
│   ├── HabitForm.tsx     # 습관 등록 / 수정
│   ├── History.tsx       # 날짜별 히스토리
│   ├── Statistics.tsx    # 통계 대시보드
│   └── Mypage.tsx        # 마이페이지
│
└── styles/
    └── typography.ts     # Pretendard 폰트 타입 유틸
```

<br/>

## 📱 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 로그인 | `/` | 자체 로그인 |
| 회원가입 | `/signup` | 닉네임/ID/PW 설정 |
| 홈 | `/home` | 오늘의 습관 체크인 + AI 코칭 카드 |
| 나의 습관 | `/habits` | 전체 습관 목록, 요일/카테고리 필터, 드래그 정렬 |
| 습관 등록/수정 | `/habits/new`, `/habits/edit/:id` | 이름, 빈도, 카테고리 설정 |
| 히스토리 | `/history` | 캘린더로 날짜 선택 후 해당 날의 기록 조회 |
| 통계 | `/stats` | 월간 달성률, 주간 차트, 카테고리별 달성률, AI 인사이트 |
| 마이페이지 | `/mypage` | 닉네임 수정, 로그아웃, 회원 탈퇴 |
