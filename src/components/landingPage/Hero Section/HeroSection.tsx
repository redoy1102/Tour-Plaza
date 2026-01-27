import HeroContent from "./HeroContent";
import HeroVideo from "./HeroVideo";

const HeroSection = () => {
    return (
      <div className="container mx-auto px-4 md:px-12 xl:px-4 pt-10 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <HeroVideo />
        </div>
      </div>
  );
};

export default HeroSection;