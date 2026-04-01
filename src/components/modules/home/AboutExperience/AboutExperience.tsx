import AboutLeft from "./AboutLeft";
import AboutRight from "./AboutRight";

const AboutSection = () => {
  return (
    <section className="py-15 bg-background overflow-hidden w-full">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
        <AboutLeft />
        <AboutRight />
      </div>
    </section>
  );
};

export default AboutSection;
