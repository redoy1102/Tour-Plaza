import { Trash } from "lucide-react";

interface DeleteButtonProps {
  onDelete: (index: string) => void;
  index?: string;
}

const DeleteButton = ({ onDelete, index }: DeleteButtonProps) => {
  return (
    <button
      onClick={() => index !== undefined && onDelete(index)}
      className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition cursor-pointer"
      aria-label="Delete tool"
    >
      <Trash className="w-3 h-3" />
    </button>
  );
};

export default DeleteButton;
