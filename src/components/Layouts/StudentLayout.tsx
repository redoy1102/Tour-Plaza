import { Outlet } from "react-router-dom";
// import MainNavbar from "../landingPage/Header/MainNavbar";

const StudentLayout = () => {
  return (
    <div>
      {/* <MainNavbar /> */}
      <Outlet />
    </div>
  );
};

export default StudentLayout;
