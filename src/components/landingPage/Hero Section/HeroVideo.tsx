import { Play } from "lucide-react";
import { useRef, useState } from "react";

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = () => {
    videoRef.current?.play();
    setShowOverlay(false);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        src="/landingPage/HeroVideo.mp4"
        className="w-full h-auto"
        controls
      />

      {showOverlay && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary shadow-lg transition hover:scale-110">
            <Play className="ml-1 h-8 w-8 text-white fill-white" />
          </span>
        </button>
      )}
    </div>
  );
};

export default HeroVideo;
