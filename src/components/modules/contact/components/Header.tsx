import { Mail, MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <div className="relative pb-12 overflow-hidden">
      {/* Decorative Background Element (Subtle) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-sky-100/20 via-transparent to-transparent -z-10" />

      <div className="text-center container mx-auto px-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
        {/* Modern Label Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            Concierge Desk
          </span>
        </div>

        {/* Main Heading: Using Serif for Luxury Feel */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#0F172A] mb-8 leading-[1.1] tracking-tight">
          Plan Your <br />
          <span className="italic text-muted-foreground">Bespoke Escape</span>
        </h1>

        {/* Description: Balanced and Relaxed */}
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
          Whether you have a specific inquiry about our villas or simply need
          inspiration for your next journey, our dedicated team is here to
          curate your perfect stay at{" "}
          <span className="font-semibold text-[#0F172A]">Tour Plaza</span>.
        </p>

        {/* Quick Contact Chips: Added value for the user */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-medium text-[#0F172A]">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <MessageSquare size={16} className="text-accent" />
            <span>Live Chat Available</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <Mail size={16} className="text-accent" />
            <span>Average Response: 2h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
