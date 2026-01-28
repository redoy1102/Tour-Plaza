import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface EnrollNowBtnProps {
  btnLabel?: string;
  btnLink?: string;
}

const EnrollNowBtn = ({
  btnLabel = "এনরোল করুন",
  btnLink = "/enroll",
}: EnrollNowBtnProps) => {
  return (
    <Button
      asChild
      size="lg"
      variant="destructive"
      className="bg-red-500 hover:bg-red-600 px-8 cursor-pointer rounded-xl "
    >
      <Link to={btnLink}>
        <UserPlus className="h-5 w-5 text-white" />
        {btnLabel}
      </Link>
    </Button>
  );
};

export default EnrollNowBtn;
