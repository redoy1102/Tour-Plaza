import AboutLeft from "./components/AboutLeft";
import AboutRight from "./components/AboutRight";

const AboutSection = () => {
  return (
    <section className="pt-32 pb-12 container mx-auto bg-background overflow-hidden w-full">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <AboutLeft />
        <AboutRight />
      </div>
    </section>
  );
};

export default AboutSection;
