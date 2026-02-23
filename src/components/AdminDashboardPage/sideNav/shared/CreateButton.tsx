import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface CreateButtonProps {
  route?: string;
  btnLabel?: string;
}

const CreateButton = ({ route = "#", btnLabel = "Create" }: CreateButtonProps) => {
  return (
    <Link to={route}>
      <Button
        size="lg"
        className="bg-red-500 hover:bg-red-600 cursor-pointer rounded-xl"
      >
        {btnLabel}
      </Button>
    </Link>
  );
};

export default CreateButton;
