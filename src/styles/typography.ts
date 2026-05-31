/**
 * 디자이너 타이포 스타일 상수
 *
 * 네이밍 규칙:
 *   Eb = ExtraBold (font-weight: 800)
 *   Bd = Bold      (font-weight: 700)
 *   Sb = SemiBold  (font-weight: 600)
 *   Md = Medium    (font-weight: 500)
 *   Rg = Regular   (font-weight: 400)
 *
 * 사이즈 / 라인높이:
 *   H1       24 / 140%
 *   T1       20 / 140%
 *   T2       18 / 140%
 *   T3       16 / 140%
 *   B1       18 / 140%
 *   B2       16 / 140%
 *   B3       14 / 140%
 *   B4       12 / 140%
 *   B5       10 / 140%
 *
 * 사용 예시:
 *   import { typo } from '@/styles/typography'
 *   <p className={typo.H1_Eb}>제목</p>
 */

export const typo = {
  // ── Display ──────────────────────────────
  Display_Sb: "font-pretendard-sb text-display",

  // ── Heading ──────────────────────────────
  H1_Bd: "font-pretendard-bd text-h1",

  // ── Title ────────────────────────────────
  T1_Eb: "font-pretendard-eb text-t1",
  T1_Sb: "font-pretendard-sb text-t1",
  T1_Md: "font-pretendard-md text-t1",
  T2_Bd: "font-pretendard-bd text-t2",

  // ── Body ─────────────────────────────────
  B2_Md: "font-pretendard-md text-b2",
  B2_Bd: "font-pretendard-bd text-b2",
  B2_Rg: "font-pretendard-rg text-b2",
  B3_Rg: "font-pretendard-rg text-b3",
  B3_Bd: "font-pretendard-bd text-b3",
  B4_Sb: "font-pretendard-sb text-b4",
  B4_Rg: "font-pretendard-rg text-b4",
  Cap_Md: "font-pretendard-md text-cap",
} as const;

export type TypoKey = keyof typeof typo;
