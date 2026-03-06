import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  const floatingElements = useMemo(() => {
    const getRandomValue = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return (x - Math.floor(x)) * 100;
    };
    return [...Array(6)].map((_, i) => ({
      id: i,
      left: getRandomValue(i * 2),
      top: getRandomValue(i * 2 + 1),
      delay: i * 0.5,
      duration: 3 + i,
    }));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 text-slate-900 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-500/5 rounded-full blur-[120px]" />

      <div className="max-w-2xl w-full text-center relative z-10 animate-fade-in">
        {/* Animated 404 Text */}
        <div className="relative animate-slide-in-bottom">
          <h1 className="text-[150px] md:text-[220px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-300">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-2 border-primary/10 rounded-full animate-ping opacity-10" />
          </div>
        </div>

        {/* Text Content */}
        <div
          className="space-y-6 -mt-5 animate-slide-in-bottom"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            পেজটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
            দুঃখিত, আপনি যে ফাইলটি খুঁজছেন সেটি সরানো হয়েছে অথবা মুছে ফেলা
            হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex items-center justify-center mt-12 animate-slide-in-bottom"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-10 h-14 rounded-2xl bg-primary hover:bg-red-500 text-white gap-3 text-lg font-bold shadow-xl shadow-primary/20 transition-all duration-300 cursor-pointer"
          >
            <Home className="w-5 h-5" />
            হোম পেজে ফিরুন
          </Button>
        </div>
      </div>

      {/* Floating Elements for visual interest using Tailwind animate-pulse or simple div */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute hidden md:block w-2 h-2 rounded-full bg-primary/20 animate-pulse`}
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${element.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default NotFound;
