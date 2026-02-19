import { Trash } from "lucide-react";

interface DeleteButtonProps {
  onDelete: (index: number) => void;
  index: number;
}

const DeleteButton = ({ onDelete, index }: DeleteButtonProps) => {
  return (
    <button
      onClick={() => onDelete(index)}
      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition cursor-pointer"
      aria-label="Delete tool"
    >
      <Trash className="w-4 h-4" />
    </button>
  );
};

export default DeleteButton;
