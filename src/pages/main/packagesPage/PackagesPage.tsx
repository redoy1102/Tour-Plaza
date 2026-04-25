import PackagesSection from "@/modules/main/packages/PackagesSection";
import { Helmet } from "react-helmet-async";

const PackagesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Packages | Tour Plaza</title>
      </Helmet>
      <PackagesSection />
    </div>
  );
};

export default PackagesPage;
