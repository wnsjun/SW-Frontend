import { typo } from '../../styles/typography';
import checkIcon from '../../assets/check.svg';
import dragHandleIcon from '../../assets/drag-handle.svg';
import removeCircleIcon from '../../assets/remove-circle.svg';

export type HabitCategory = 'HEALTH' | 'LEARNING' | 'PRODUCTIVITY' | 'ETC';

const CATEGORY_BG: Record<HabitCategory, string> = {
  HEALTH: 'rgba(74, 222, 128, 0.20)',
  LEARNING: 'rgba(96, 165, 250, 0.20)',
  PRODUCTIVITY: 'rgba(251, 191, 36, 0.20)',
  ETC: 'rgba(203, 213, 225, 0.20)',
};

interface Props {
  title: string;
  category: HabitCategory;
  schedule: string;
  completed: boolean;
  onToggle: () => void;
  showCheckbox?: boolean;
  editMode?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLImageElement>;
}

export default function HabitCard({
  title, category, schedule, completed, onToggle,
  showCheckbox = true, editMode = false, onDelete, onEdit, dragHandleProps,
}: Props) {
  return (
    <div
      className="flex justify-between items-center self-stretch"
      style={{
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #F3F4F6',
        background: '#FFF',
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="flex items-center" style={{ gap: '10px' }}>
        {editMode && (
          <img
            src={dragHandleIcon}
            width={16}
            height={6}
            alt=""
            className="shrink-0 cursor-grab"
            {...dragHandleProps}
          />
        )}
        <div
          className="flex justify-center items-center shrink-0"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            background: CATEGORY_BG[category],
          }}
        />

        <div className="flex flex-col gap-1">
          <span className={`${typo.T1_Md} text-[#191C1D]`} style={{ lineHeight: '27px' }}>
            {title}
          </span>
          <span
            className={`${typo.Cap_Md} text-[#3D4A3E] w-fit`}
            style={{
              padding: '2px 8px',
              borderRadius: '9999px',
              background: '#EDEEEF',
              lineHeight: '14px',
            }}
          >
            {schedule}
          </span>
        </div>
      </div>

      {editMode ? (
        <div className="flex items-center shrink-0" style={{ gap: '10px' }}>
          <button
            onClick={onEdit}
            className="font-pretendard-rg text-[#3D4A3E] tracking-[0.6px]"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #BCCABB',
              fontSize: '15px',
              lineHeight: '16px',
            }}
          >
            수정
          </button>
          <button onClick={onDelete}>
            <img src={removeCircleIcon} width={20} height={20} alt="삭제" />
          </button>
        </div>
      ) : showCheckbox && (
        <button
          onClick={onToggle}
          className="flex justify-center items-center shrink-0"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            ...(completed
              ? { background: '#4ADE80', border: 'none' }
              : { background: 'transparent', border: '2px solid #BCCABB' }),
          }}
        >
          {completed && <img src={checkIcon} width={14} height={11} alt="완료" />}
        </button>
      )}
    </div>
  );
}
