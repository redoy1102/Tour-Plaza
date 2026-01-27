import TopBar from "./landingPage/Header/TopBar";
import MainNavbar from "./landingPage/Header/MainNavbar";
import FooterSection from "./landingPage/FooterSection/FooterSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopBar />
      <MainNavbar />
      {children}
      <FooterSection />
    </div>
  );
};

export default Layout;
