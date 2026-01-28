import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseSeeBtnProps {
  btnLabel?: string;
  btnLink?: string;
}

const CourseSeeBtn = ({
  btnLabel = "সব কোর্স দেখুন",
  btnLink = "/courses",
}: CourseSeeBtnProps) => {
  return (
    <Button
      size="lg"
      asChild
      className="bg-[#1e3a5f] hover:bg-[#2d5078] text-white px-8 cursor-pointer rounded-xl"
    >
      <Link to={btnLink}>
        <BookOpen className="h-5 w-5" />
        {btnLabel}
      </Link>
    </Button>
  );
};

export default CourseSeeBtn;
