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
import Dashboard from "@/components/StudentDashboardPage/Dashboard";
import MyCourses from "@/components/StudentDashboardPage/MyCourses";
import Profile from "@/components/StudentDashboardPage/Profile";
import PasswordUpdate from "@/components/StudentDashboardPage/PasswordUpdate";
import LoginHistory from "@/components/StudentDashboardPage/LoginHistory";
import VideoClass from "@/components/StudentDashboardPage/videoPlayer/VideoClass";
import NotFound from "@/components/NotFound";
import Quizzes from "./components/StudentDashboardPage/videoPlayer/Quizzes";

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
            <Route index element={<Dashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<PasswordUpdate />} />
            <Route path="login-history" element={<LoginHistory />} />
          </Route>
          <Route path="video-player" element={<VideoClass />} />
          <Route path="quiz" element={<Quizzes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
