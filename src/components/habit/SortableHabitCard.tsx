import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import HabitCard, { type HabitCategory } from '../home/HabitCard';

interface Props {
  id: number;
  title: string;
  category: HabitCategory;
  schedule: string;
  completed: boolean;
  editMode: boolean;
  showCheckbox: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function SortableHabitCard({ id, editMode, ...props }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <HabitCard
        {...props}
        editMode={editMode}
        dragHandleProps={editMode ? { ...attributes, ...listeners } : undefined}
      />
    </div>
  );
}
