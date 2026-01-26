import FooterBottomBar from "./FooterBottomBar";
import Logo from "./Logo";
import QuickLinks from "./QuickLinks";
import Contact from "./Contact";
import Courses from "./Courses";

const FooterSection = () => {
  return (
    <footer className="bg-linear-to-r from-[#f3f7fb] via-white to-[#fdecef]">
      <div className="container mx-auto px-4 pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <Logo />
          <QuickLinks />
          <Courses />
          <Contact />
        </div>
        <FooterBottomBar />
      </div>
    </footer>
  );
};

export default FooterSection;
