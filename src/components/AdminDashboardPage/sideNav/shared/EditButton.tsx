import { SquarePen } from "lucide-react";

interface EditButtonProps {
  onEdit: (index: number) => void;
  index: number;
}

const EditButton = ({ onEdit, index }: EditButtonProps) => {
  return (
    <button
      onClick={() => onEdit(index)}
      className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition cursor-pointer"
      aria-label="Edit tool"
    >
      <SquarePen className="w-3 h-3" />
    </button>
  );
};

export default EditButton;
