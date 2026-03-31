// features/facilities/components/FacilitiesSection.tsx

import { facilities } from "@/data/landingPage/facilitiesData";
import FacilityCard from "./components/FacilityCard";

const FacilitiesSection = () => {
  return (
    <section className="py-20 bg-linear-to-t from-background to-muted/50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">
            Unmatched Comfort
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight">
            Experience Our World-Class
            <span className="text-primary"> Facilities</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            We provide exceptional amenities to ensure your stay is not just
            comfortable, but truly memorable.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <FacilityCard
              key={index}
              image={facility.image}
              title={facility.title}
              description={facility.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
