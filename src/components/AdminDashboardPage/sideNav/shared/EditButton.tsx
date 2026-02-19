import { SquarePen } from "lucide-react";

interface EditButtonProps {
  onEdit: (index: number) => void;
  index: number;
}

const EditButton = ({ onEdit, index }: EditButtonProps) => {
  return (
    <button
      onClick={() => onEdit(index)}
      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
      aria-label="Edit tool"
    >
      <SquarePen className="w-4 h-4" />
    </button>
  );
};

export default EditButton;
