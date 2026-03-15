import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPageButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate("/")}
      className="px-4 py-2 text-black border border-gray-300 rounded-lg hover:bg-primary/90 hover:text-white transition cursor-pointer"
    >
      <Globe />
    </Button>
  );
};

export default LandingPageButton;
