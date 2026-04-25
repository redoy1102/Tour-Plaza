import FooterBottomBar from "./components/FooterBottomBar";
import Logo from "./components/Logo";
import QuickLinks from "./components/QuickLinks";
import Contact from "./components/Contact";

const FooterSection = () => {
  return (
    <footer className="bg-linear-to-r from-[#f3f7fb] via-white to-[#fdecef]">
      <div className="container mx-auto px-4 md:px-6 pt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Logo />
          <QuickLinks />
          <Contact />
        </div>
        <FooterBottomBar />
      </div>
    </footer>
  );
};

export default FooterSection;
