import HeaderAbout from "@/components/AboutPage/HeaderAbout";
import MissionAbout from "@/components/AboutPage/MissionAbout";
import VisionAbout from "@/components/AboutPage/VisionAbout";
import TeamAbout from "@/components/AboutPage/TeamAbout";
import StoryAbout from "@/components/AboutPage/StoryAbout";
// import StoryAbout from "@/components/AboutPage/StoryAbout";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 md:px-12 xl:px-4 pb-20 mt-20">
      <HeaderAbout />

      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <MissionAbout />
          <VisionAbout />
        </div>
      </section>

      <StoryAbout />
      <TeamAbout />
      {/* <StoryAbout /> */}
    </div>
  );
};

export default AboutPage;
