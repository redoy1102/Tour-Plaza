import AppInfo from "./AppInfo";
import AppPreview from "./AppPreview";

const AppSection = () => {
  return (
    <div className="bg-linear-to-r from-[#eef3f8] via-white to-[#FEFEFE]">
      <div className="container mx-auto px-4 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AppInfo />
          <AppPreview />
        </div>
      </div>
    </div>
  );
};

export default AppSection;
