import AboutHero from "./components/AboutHero";
import AboutMissionVision from "./components/AboutMissionVision";
import AboutFounder from "./components/AboutFounder";
import AboutAwards from "./components/AboutAwards";
import AboutTeamMembers from "./components/AboutTeamMembers";
import AboutCTA from "./components/AboutCTA";

const AboutSection = () => {
  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans selection:bg-primary selection:text-white py-15">
      <AboutHero />
      <AboutMissionVision />
      <AboutFounder />
      <AboutTeamMembers />
      <AboutAwards />
      <AboutCTA />
    </div>
  );
};

export default AboutSection;
