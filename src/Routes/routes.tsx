import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AboutPage from "../Pages/AboutPage/AboutPage";
import ContactPage from "@/Pages/ContactPage/ContactPage";
import CourseDetails from "@/Pages/CourseDetails/CourseDetails";
import AllCoursesPage from "@/Pages/AllCoursesPage/AllCoursesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/allCourses" element={<AllCoursesPage />} />
    </Routes>
  );
};

export default AppRoutes;
