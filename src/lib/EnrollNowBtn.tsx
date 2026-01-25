import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const EnrollNowBtn = () => {
    return (
        <Button
          size="lg"
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 px-8 cursor-pointer rounded-xl "
        >
          <UserPlus className="h-5 w-5 text-white" />
          এনরোল করুন
        </Button>
    );
};

export default EnrollNowBtn;