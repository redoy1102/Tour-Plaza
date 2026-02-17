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
import Dashboard from "@/components/StudentDashboardPage/sideNav/dashboard/Dashboard";
import MyCourses from "@/components/StudentDashboardPage/sideNav/MyCourses";
import Profile from "@/components/StudentDashboardPage/sideNav/settings/Profile";
import PasswordUpdate from "@/components/StudentDashboardPage/sideNav/settings/PasswordUpdate";
import LoginHistory from "@/components/StudentDashboardPage/sideNav/settings/LoginHistory";
import VideoClass from "@/components/StudentDashboardPage/videoPlayer/VideoClass";
import NotFound from "@/components/NotFound";
import Quizzes from "./components/StudentDashboardPage/videoPlayer/Quizzes";
import Assignment from "./components/StudentDashboardPage/videoPlayer/Assignment";
import AdminDashboardLayout from "./components/Layouts/AdminDashboardLayout";
import AdminDashboard from "./components/AdminDashboardPage/sideNav/dashboard/AdminDashboard";
import Enrollments from "./components/AdminDashboardPage/sideNav/enrollments/Enrollments";
import Courses from "./components/AdminDashboardPage/sideNav/courses/Courses";
import Students from "./components/AdminDashboardPage/sideNav/students/Students";
import SupportsTickets from "./components/AdminDashboardPage/sideNav/supports_tickets/SupportsTickets";
import PaymentMethods from "./components/AdminDashboardPage/sideNav/settings/payment_methods/paymentMethods";
import Announcements from "./components/AdminDashboardPage/sideNav/announcements/Announcements";
import Instructors from "./components/AdminDashboardPage/sideNav/team_members/instructors/Instructors";
import SupportStaff from "./components/AdminDashboardPage/sideNav/team_members/support_staff/SupportStaff";
import PromoCodes from "./components/AdminDashboardPage/sideNav/settings/promo_codes/PromoCodes";
import RolesPermissions from "./components/AdminDashboardPage/sideNav/settings/roles_permissions/RolesPermissions";
import CourseCategory from "@/components/AdminDashboardPage/sideNav/course_category/CourseCategory";


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

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<PasswordUpdate />} />
            <Route path="login-history" element={<LoginHistory />} />
            <Route path="assignment" element={<Assignment />} />
          </Route>
          <Route path="video-player" element={<VideoClass />} />
          <Route path="quiz" element={<Quizzes />} />

          {/* Admin Routes  */}
          <Route path="/admin-dashboard" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="enrollments" element={<Enrollments />} />
            <Route path="courses/allCourses" element={<Courses />} />
            <Route path="courses/courseCategory" element={<CourseCategory />} />
            <Route path="students" element={<Students />} />
            <Route path="supports-tickets" element={<SupportsTickets />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="team-members/instructors" element={<Instructors />} />
            <Route path="team-members/support-staff" element={<SupportStaff />} />
            <Route path="settings/roles-permissions" element={<RolesPermissions />} />
            <Route path="settings/promo-codes" element={<PromoCodes />} />
            <Route path="settings/payment-methods" element={<PaymentMethods />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
