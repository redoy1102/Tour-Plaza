import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AboutPage from "../Pages/AboutPage/AboutPage";
import ContactPage from "@/Pages/ContactPage/ContactPage";
import CourseDetails from "@/Pages/CourseDetails/CourseDetails";
import AllCoursesPage from "@/Pages/AllCoursesPage/AllCoursesPage";
import PurchasePage from "@/Pages/PurchasePage/PurchasePage";
import StudentDashboardPage from "@/Pages/StudentDashboardPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/courses" element={<AllCoursesPage />} />
      <Route path="/purchase/:courseId" element={<PurchasePage />} />
      <Route path="/student-dashboard" element={<StudentDashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
