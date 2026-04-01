// import TopBar from "../landingPage/Header/TopBar";
import MainNavbar from "../modules/home/nav/MainNavbar";
import FooterSection from "../modules/FooterSection/FooterSection";
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
