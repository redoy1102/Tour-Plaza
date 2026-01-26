import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";

const AboutSection = () => {
  return (
    <div className="bg-linear-to-r from-[#eef3f8] via-white to-[#fdecef]">
      <div className="container mx-auto px-4 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AboutContent />
          <AboutImage />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
