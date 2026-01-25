import { Button } from "../ui/button";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const AppDownloadButtons = () => {
  return (
    <div className="flex items-center gap-1">
      {/* Google Play Button */}
      <div className="flex items-center gap-1">
        <Button
          className="mr-4 flex items-center py-8 px-4 rounded-2xl"
        >
          <FaGooglePlay className="h-10 w-10 text-white" />
          <span className="text-left">
            <span className="text-[10px] text-gray">Get it on</span> <br /> <span className="font-semibold">Google Play</span>
          </span>
        </Button>
      </div>

      {/* App Store Button */}
      <div className="flex items-center gap-1">
        <Button className="flex items-center py-8 px-4 rounded-2xl">
          <FaApple className="h-8 w-8 text-white" />
          <span className="text-left">
            <span className="text-[10px] text-gray">Download on the</span> <br /> <span className="font-semibold">App Store</span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default AppDownloadButtons;
