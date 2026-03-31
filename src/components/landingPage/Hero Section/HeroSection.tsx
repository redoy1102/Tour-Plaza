import { CalendarDays, MapPin, Users, Play } from "lucide-react";
import PrimaryButton from "@/components/shared/PrimaryButton";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Video with subtle zoom effect */}
      <div className="absolute inset-0 scale-105 animate-subtle-zoom">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Modern Gradient Overlay: Darker on bottom and left for text contrast */}
      <div className="absolute inset-0 bg-linear-to-tr from-black/90 via-black/30 to-transparent" />

      {/* Main Content Area */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 lg:px-20">
        <div className="max-w-3xl">
          {/* Small Badge */}
          <div className="mb-6 flex items-center gap-2 w-fit rounded-full bg-sky-400/20 px-4 py-1.5 border border-sky-400/30 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-100">
              Discover Paradise 2026
            </span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white md:text-8xl lg:leading-[1.1]">
            Where Nature <br />
            <span className="bg-linear-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">
              Meets Luxury
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Escape the ordinary and immerse yourself in the tranquil beauty of
            Tour Plaza. Your private oasis awaits on the edge of the horizon.
          </p>

          <div className="my-8 flex flex-wrap gap-4">
            <PrimaryButton size="lg" title="Explore Villas" />

            <button className="flex items-center gap-3 text-white font-semibold hover:text-sky-300 transition-colors group cursor-pointer">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm group-hover:bg-white/20">
                <Play className="fill-white" size={18} />
              </div>
              Watch Film
            </button>
          </div>
        </div>
      </div>

      {/* Floating Booking Bar (Desktop Only) */}
      <div className="absolute bottom-12 left-1/2 z-20 hidden w-[90%] -translate-x-1/2 transform rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl lg:flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-4 border-r border-white/20 px-6 flex-1">
          <MapPin className="text-sky-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-300 font-bold">
              Location
            </span>
            <span className="text-sm text-white font-medium">
              Grand Maldives, Tour Plaza
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 border-r border-white/20 px-6 flex-1">
          <CalendarDays className="text-sky-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-300 font-bold">
              Dates
            </span>
            <span className="text-sm text-white font-medium">
              Check-in / Check-out
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 px-6 flex-1">
          <Users className="text-sky-400" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-300 font-bold">
              Guests
            </span>
            <span className="text-sm text-white font-medium">
              2 Adults, 1 Child
            </span>
          </div>
        </div>

        <PrimaryButton height="14" px="10" title="Check Availability" />
      </div>

      {/* Bottom Visual Gradient */}
      <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
};

export default HeroSection;
