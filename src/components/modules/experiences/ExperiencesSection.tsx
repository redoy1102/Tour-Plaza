import { useMemo, useState } from "react";
import { Camera } from "lucide-react";
import { experiencesData } from "@/data/experiencesData";
import ExperienceHeader from "./components/ExperienceHeader";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import ExperienceCategoryButtons from "./components/ExperienceCategoryButtons";
import ExperienceCard from "./components/ExperienceCard";

const ExperiencesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExperiences = useMemo(() => {
    if (activeCategory === "All") {
      return experiencesData;
    } else {
      return experiencesData.filter((exp) => exp.category === activeCategory);
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background py-15">
      <ExperienceHeader />

      <ExperienceCategoryButtons
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredExperiences && filteredExperiences.length > 0 ? (
              filteredExperiences.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
              ))
            ) : (
              <p className="text-center col-span-2">No experiences found.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white text-center">
        <div className="container mx-auto px-6">
          <Camera className="mx-auto mb-6 text-accent" size={48} />
          <h2 className="text-4xl font-serif mb-6">
            Ready to Create Memories?
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
            Book your stay today and gain access to our full catalog of
            exclusive island activities and wellness retreats.
          </p>
          <PrimaryButton size="lg" title="Book My Stay Now" px="12" py="7" />
        </div>
      </section>
    </div>
  );
};

export default ExperiencesSection;
