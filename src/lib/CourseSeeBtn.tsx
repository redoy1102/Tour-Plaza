import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const CourseSeeBtn = () => {
  return (
    <Button
      size="lg"
      className="bg-[#1e3a5f] hover:bg-[#2d5078] text-white px-8 cursor-pointer rounded-xl"
    >
      <BookOpen className="h-5 w-5" />
      সব কোর্স দেখুন
    </Button>
  );
};

export default CourseSeeBtn;
