import {
  Trophy,
  Compass,
  MapPin,
} from "lucide-react";

const AboutAwards = () => {
  return (
    <section className="py-20 border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-between items-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
          <div className="flex items-center gap-3">
            <Trophy size={20} />{" "}
            <span className="font-bold text-xs uppercase tracking-tighter">
              Gold Resort 2025
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Compass size={20} />{" "}
            <span className="font-bold text-xs uppercase tracking-tighter">
              Eco-Travel Choice
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={20} />{" "}
            <span className="font-bold text-xs uppercase tracking-tighter">
              Best Coastal View
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAwards;
