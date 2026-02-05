import TopBar from "../landingPage/Header/TopBar";
import MainNavbar from "../landingPage/Header/MainNavbar";
import FooterSection from "../landingPage/FooterSection/FooterSection";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <TopBar />
      <MainNavbar />
      <Outlet />
      <FooterSection />
    </div>
  );
};

export default Layout;
