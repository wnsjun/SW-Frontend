import { typo } from '../../styles/typography';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmColor?: string;
}

export default function ConfirmModal({ message, onConfirm, onCancel, confirmLabel = '삭제', confirmColor = '#BA1A1A' }: Props) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
      onClick={onCancel}
    >
      <div
        className="flex flex-col items-center w-[300px]"
        style={{
          padding: '24px 20px 20px',
          borderRadius: '16px',
          background: '#FFF',
          gap: '20px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className={`${typo.B2_Rg} text-[#191C1D] text-center`}
          style={{ lineHeight: '24px' }}
        >
          {message}
        </p>

        <div className="flex w-full" style={{ gap: '8px' }}>
          <button
            onClick={onCancel}
            className={`${typo.B3_Rg} text-[#6D7B6D] flex-1`}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #BCCABB',
              background: '#FFF',
            }}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className={`${typo.B3_Rg} text-white flex-1`}
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: confirmColor,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
