import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/shared/Spinner";
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
import StudentAuthGuard from "./components/Routes/StudentAuthGuard";
import AdminDashboard from "./components/AdminDashboardPage/sideNav/dashboard/AdminDashboard";
import Enrollments from "./components/AdminDashboardPage/sideNav/enrollments/Enrollments";
import Courses from "./components/AdminDashboardPage/sideNav/courses/Courses";
import Students from "./components/AdminDashboardPage/sideNav/students/Students";
import SupportsTickets from "./components/AdminDashboardPage/sideNav/supports_tickets/SupportsTickets";
import Announcements from "./components/AdminDashboardPage/sideNav/announcements/Announcements";
import Instructors from "./components/AdminDashboardPage/sideNav/team_members/instructors/Instructors";
import SupportStaff from "./components/AdminDashboardPage/sideNav/team_members/support_staff/SupportStaff";
import PromoCodes from "./components/AdminDashboardPage/sideNav/settings/promo_codes/PromoCodes";
import RolesPermissions from "./components/AdminDashboardPage/sideNav/settings/roles_permissions/RolesPermissions";
import CourseCategory from "@/components/AdminDashboardPage/sideNav/course_category/CourseCategory";
import Tools from "@/components/AdminDashboardPage/sideNav/settings/tools/Tools";
import Prerequisites from "@/components/AdminDashboardPage/sideNav/settings/prerequisites/Prerequisites";
import Faqs from "@/components/AdminDashboardPage/sideNav/settings/faqs/Faqs";
import AddCourseForm from "./components/AdminDashboardPage/sideNav/courses/AddCourseForm";
import CourseView from "./components/AdminDashboardPage/sideNav/courses/CourseView";
import CourseOutlinePage from "./components/AdminDashboardPage/sideNav/courses/CourseOutlinePage";
import ManualPaymentHistory from "./components/AdminDashboardPage/sideNav/settings/payment/manual_payment/ManualPaymentHistory";
import ManualPayment from "./components/AdminDashboardPage/sideNav/settings/payment/manual_payment/ManualPayment";
import PaymentGateways from "./components/AdminDashboardPage/sideNav/settings/payment/payment_gateways/PaymentGateways";

function App() {
  const [isAppReady] = useState(true);

  if (!isAppReady) return <Spinner />;

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
            <Route element={<StudentAuthGuard />}>
              <Route path="purchase/:courseId" element={<PurchasePage />} />
            </Route>
          </Route>

          {/* Student Routes (protected) */}
          <Route element={<StudentAuthGuard />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="profile" element={<Profile />} />
              <Route path="password" element={<PasswordUpdate />} />
              <Route path="login-history" element={<LoginHistory />} />
              <Route path="assignment" element={<Assignment />} />
              <Route path="video-player/:courseName" element={<VideoClass />} />
            </Route>

            {/* standalone student-related pages */}

            <Route path="quiz" element={<Quizzes />} />

            {/* Admin Routes  */}
            <Route path="/admin-dashboard" element={<AdminDashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="enrollments" element={<Enrollments />} />
              <Route path="courses/allCourses" element={<Courses />} />
              <Route path="courses/addCourse" element={<AddCourseForm />} />
              <Route
                path="courses/edit/:courseId"
                element={<AddCourseForm />}
              />
              <Route path="courses/view/:courseId" element={<CourseView />} />
              <Route path="courses/outline" element={<CourseOutlinePage />} />
              <Route
                path="courses/outline/:courseId"
                element={<CourseOutlinePage />}
              />
              <Route
                path="courses/courseCategory"
                element={<CourseCategory />}
              />

              <Route path="students" element={<Students />} />
              <Route path="supports-tickets" element={<SupportsTickets />} />
              <Route path="announcements" element={<Announcements />} />
              <Route
                path="team-members/instructors"
                element={<Instructors />}
              />
              <Route
                path="team-members/support-staff"
                element={<SupportStaff />}
              />
              {/* Payment */}
              <Route
                path="payment/payment-gateways"
                element={<PaymentGateways />}
              />
              <Route
                path="payment/manual-payment-methods"
                element={<ManualPayment />}
              />
              <Route
                path="payment/manual-payment-history"
                element={<ManualPaymentHistory />}
              />
              {/* Settings */}
              <Route
                path="settings/roles-permissions"
                element={<RolesPermissions />}
              />
              <Route path="settings/promo-codes" element={<PromoCodes />} />
              <Route path="settings/tools" element={<Tools />} />
              <Route
                path="settings/prerequisites"
                element={<Prerequisites />}
              />
              <Route path="settings/faqs" element={<Faqs />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
