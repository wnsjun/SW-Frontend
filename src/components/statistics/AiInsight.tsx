import type { AiInsightData } from '../../types/stats';

const FALLBACK_MESSAGES: Record<string, string> = {
  COLD_START: '아직 데이터가 부족해요. 습관을 꾸준히 실천하면 AI 인사이트를 받을 수 있어요!',
  PENDING: 'AI 인사이트를 분석 중이에요. 잠시 후 다시 확인해주세요.',
};

interface Props {
  data: AiInsightData;
}

export default function AiInsight({ data }: Props) {
  if (!data) return null;
  const message = data.type === 'INSIGHT' ? (data.content ?? '') : FALLBACK_MESSAGES[data.type];

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        padding: '24px',
        gap: '8px',
        borderRadius: '12px',
        border: '1px solid rgba(0, 109, 54, 0.20)',
        background: 'rgba(0, 109, 54, 0.05)',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="flex items-center" style={{ gap: '6px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 15 20" fill="none">
          <path d="M7.5 20C6.95 20 6.47917 19.8042 6.0875 19.4125C5.69583 19.0208 5.5 18.55 5.5 18H9.5C9.5 18.55 9.30417 19.0208 8.9125 19.4125C8.52083 19.8042 8.05 20 7.5 20ZM3.5 17V15H11.5V17H3.5ZM3.75 14C2.6 13.3167 1.6875 12.4 1.0125 11.25C0.3375 10.1 0 8.85 0 7.5C0 5.41667 0.729167 3.64583 2.1875 2.1875C3.64583 0.729167 5.41667 0 7.5 0C9.58333 0 11.3542 0.729167 12.8125 2.1875C14.2708 3.64583 15 5.41667 15 7.5C15 8.4 14.6625 10.1 13.9875 11.25C13.3125 12.4 12.4 13.3167 11.25 14H3.75ZM4.35 12H10.65C11.4 11.4667 11.9792 10.8083 12.3875 10.025C12.7958 9.24167 13 8.4 13 7.5C13 5.96667 12.4667 4.66667 11.4 3.6C10.3333 2.53333 9.03333 2 7.5 2C5.96667 2 4.66667 2.53333 3.6 3.6C2.53333 4.66667 2 5.96667 2 7.5C2 8.4 2.20417 9.24167 2.6125 10.025C3.02083 10.8083 3.6 11.4667 4.35 12Z" fill="#006D36" />
        </svg>
        <span
          className="font-pretendard-sb text-[#006D36] tracking-[0.6px] uppercase"
          style={{ fontSize: '12px', lineHeight: '16px' }}
        >
          AI 분석 인사이트
        </span>
      </div>

      <p
        className="font-pretendard-rg text-[#191C1D]"
        style={{ fontSize: '16px', lineHeight: '26px', marginTop: '2px' }}
      >
        {message}
      </p>
    </div>
  );
}
