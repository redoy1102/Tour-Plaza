import { MapPin, Navigation, Compass } from "lucide-react";
import { branchOffices } from "@/data/landingPage/contactData";

const BranchLocations = () => {
  return (
    <div className="py-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
      {/* 1. Elegant Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-16">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <Compass className="text-accent animate-spin-slow" size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
              Our Destinations
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F172A] leading-tight">
            Visit Our{" "}
            <span className="italic text-muted-foreground">Sanctuaries</span>
          </h2>
        </div>
        <p className="max-w-xs text-slate-500 text-sm md:text-right">
          Find us across the region, from coastal retreats to urban concierge
          hubs.
        </p>
      </div>

      {/* 2. Redesigned Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branchOffices.map((office, index) => (
          <div
            key={index}
            className="group relative bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-55"
          >
            {/* Hover Accent: Brand Primary Color */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-[#0F172A] group-hover:text-primary transition-colors">
                    {office.title}
                  </h3>
                  <div className="h-0.5 w-8 bg-accent rounded-full transition-all group-hover:w-16" />
                </div>

                {/* Map Pin with custom brand color */}
                <div className="p-3 rounded-xl bg-slate-50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                  <MapPin size={20} />
                </div>
              </div>

              <p className="text-slate-500 leading-relaxed text-sm font-medium mb-8">
                {office.address}
              </p>
            </div>

            {/* Action Link: More engaging than a button */}
            <a
              href={office.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F172A] hover:text-accent transition-colors group/link w-fit"
            >
              <span>Get Directions</span>
              <Navigation
                size={14}
                className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchLocations;
