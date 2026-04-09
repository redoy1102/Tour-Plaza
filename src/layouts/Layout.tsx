// import TopBar from "../landingPage/Header/TopBar";

import FooterSection from "@/components/shared/footer/FooterSection";
import MainNavbar from "@/modules/main/nav/MainNavbar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* <div className="hidden md:block">
        <TopBar />
      </div> */}
      <MainNavbar />
      <Outlet />
      <FooterSection />
    </div>
  );
};

export default Layout;
