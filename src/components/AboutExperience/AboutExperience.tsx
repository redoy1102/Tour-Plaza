import AboutLeft from "./AboutLeft";
import AboutRight from "./AboutRight";

const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <AboutLeft />
        <AboutRight />
      </div>
    </section>
  );
};

export default AboutSection;
