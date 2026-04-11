import FooterBottomBar from "./FooterBottomBar";
import Logo from "./Logo";
import QuickLinks from "./QuickLinks";
import Contact from "./Contact";

const FooterSection = () => {
  return (
    <footer className="bg-linear-to-r from-[#f3f7fb] via-white to-[#fdecef]">
      <div className="container mx-auto pt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Logo />
          <QuickLinks />
          {/* <Courses /> */}
          <Contact />
        </div>
        <FooterBottomBar />
      </div>
    </footer>
  );
};

export default FooterSection;
