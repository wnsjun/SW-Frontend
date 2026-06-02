import rocketIcon from '../../assets/rocket.svg';

interface Props {
  message: string;
}

export default function AiCoaching({ message }: Props) {
  return (
    <div
      className="flex flex-col items-start rounded-[12px]"
      style={{
        width: '350px',
        padding: '16px',
        gap: '4px',
        background: 'linear-gradient(135deg, #006D36 0%, #4ADE80 100%)',
        boxShadow: '4px 4px 4px 0 rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="flex items-center gap-1">
        <img src={rocketIcon} width={21} height={21} alt="" />
        <span
          style={{
            color: '#FFF',
            fontFamily: 'Pretendard',
            fontSize: '15px',
            fontWeight: 700,
            lineHeight: '14px',
          }}
        >
          AI 코칭
        </span>
      </div>
      <p
        style={{
          color: '#FFF',
          fontFamily: 'Pretendard',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '22px',
          marginTop: '3px',
          whiteSpace: 'pre-line',
        }}
      >
        {message}
      </p>
    </div>
  );
}
