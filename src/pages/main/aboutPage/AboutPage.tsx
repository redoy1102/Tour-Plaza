import AboutSection from "@/modules/main/home/components/about/AboutSection";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>About | Tour Plaza</title>
      </Helmet>
      <AboutSection />
    </div>
  );
};

export default AboutPage;
