import Profile from "@/components/StudentDashboardPage/sideNav/settings/Profile";
import PasswordUpdate from "@/components/StudentDashboardPage/sideNav/settings/PasswordUpdate";
import MyCourses from "@/components/StudentDashboardPage/sideNav/MyCourses";
import LoginHistory from "@/components/StudentDashboardPage/sideNav/settings/LoginHistory";
import Dashboard from "@/components/StudentDashboardPage/sideNav/dashboard/Dashboard";
import {
  User,
  Lock,
  BookOpen,
  MonitorSmartphone,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export const menuItems = [
  {
    id: "dashboard",
    label: "ড্যাশবোর্ড",
    icon: <LayoutDashboard className="w-5 h-5" />,
    component: <Dashboard />,
    path: "/student",
  },
  {
    id: "myCourses",
    label: "আমার কোর্সসমূহ",
    icon: <BookOpen className="w-5 h-5" />,
    component: <MyCourses />,
    path: "/student/my-courses",
  },
  {
    id: "settings",
    label: "সেটিংস",
    icon: <Lock className="w-5 h-5" />,
    hasSubmenu: true,
    submenu: [
      {
        id: "profile",
        label: "প্রোফাইল",
        icon: <User className="w-5 h-5" />,
        component: <Profile />,
        path: "/student/profile",
      },
      {
        id: "password",
        label: "পাসওয়ার্ড",
        icon: <Lock className="w-5 h-5" />,
        component: <PasswordUpdate />,
        path: "/student/password",
      },
      {
        id: "login-history",
        label: "লগইন হিস্ট্রি",
        icon: <MonitorSmartphone className="w-5 h-5" />,
        component: <LoginHistory />,
        path: "/student/login-history",
      },
    ],
  },
  {
    id: "logOut",
    label: "লগআউট",
    icon: <LogOut className="w-5 h-5" />,
    component: <LoginHistory />,
  },
];
