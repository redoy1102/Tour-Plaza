import { Button } from "@/components/ui/button";
interface CreateButtonProps {
  onRoute?: string;
}

const CreateButton = ({ onRoute }: CreateButtonProps) => {
  return (
    <Button
      onClick={() => onRoute}
      size="lg"
      className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
    >
      Create
    </Button>
  );
};

export default CreateButton;
