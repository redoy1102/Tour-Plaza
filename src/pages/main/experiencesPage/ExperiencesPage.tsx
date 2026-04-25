import ExperiencesSection from "@/modules/main/experiences/ExperiencesSection";
import { Helmet } from "react-helmet-async";

const ExperiencesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Experiences | Tour Plaza</title>
      </Helmet>
      <ExperiencesSection />
    </div>
  );
};

export default ExperiencesPage;
