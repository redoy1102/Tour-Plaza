import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import { Toaster } from "react-hot-toast";
import StudentLayout from "./components/Layouts/StudentLayout";
import Home from "@/Pages/Home/Home";
import AboutPage from "@/Pages/AboutPage/AboutPage";
import ContactPage from "@/Pages/ContactPage/ContactPage";
import CourseDetails from "@/Pages/CourseDetails/CourseDetails";
import AllCoursesPage from "@/Pages/AllCoursesPage/AllCoursesPage";
import PurchasePage from "@/Pages/PurchasePage/PurchasePage";
import StudentDashboardPage from "@/Pages/StudentDashboardPage";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="courses" element={<AllCoursesPage />} />
            <Route path="courses/:courseId" element={<CourseDetails />} />
            <Route path="purchase/:courseId" element={<PurchasePage />} />
          </Route>

          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboardPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
