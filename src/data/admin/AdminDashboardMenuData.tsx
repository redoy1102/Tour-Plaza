import AdminDashboard from "@/components/AdminDashboardPage/sideNav/dashboard/AdminDashboard";
import Enrollments from "@/components/AdminDashboardPage/sideNav/enrollments/Enrollments";
import Courses from "@/components/AdminDashboardPage/sideNav/courses/Courses";
import Students from "@/components/AdminDashboardPage/sideNav/students/Students";

import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Users,
  Ticket,
  Megaphone,
  UserCog,
  LifeBuoy,
  CreditCard,
  Settings,
  ShieldCheck,
  BadgePercent,
  LogOut,
  Tag,
} from "lucide-react";
import Announcements from "@/components/AdminDashboardPage/sideNav/announcements/Announcements";
import SupportsTickets from "@/components/AdminDashboardPage/sideNav/supports_tickets/SupportsTickets";
import PaymentMethods from "@/components/AdminDashboardPage/sideNav/settings/payment_methods/paymentMethods";
import Instructors from "@/components/AdminDashboardPage/sideNav/team_members/instructors/Instructors";
import SupportStaff from "@/components/AdminDashboardPage/sideNav/team_members/support_staff/SupportStaff";
import RolesPermissions from "@/components/AdminDashboardPage/sideNav/settings/roles_permissions/RolesPermissions";
import PromoCodes from "@/components/AdminDashboardPage/sideNav/settings/promo_codes/PromoCodes";
import CourseCategory from "@/components/AdminDashboardPage/sideNav/course_category/CourseCategory";

export const menuItems = [
  // dashboard
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    component: <AdminDashboard />,
    path: "/admin-dashboard",
  },

  //   Courses
  {
    id: "courses",
    label: "Courses",
    icon: <BookOpen className="w-5 h-5" />,
    hasSubmenu: true,
    submenu: [
      {
        id: "allCourses",
        label: "All Courses",
        icon: <BookOpen className="w-5 h-5" />,
        component: <Courses />,
        path: "/admin-dashboard/courses/allCourses",
      },
      {
        id: "courseCategory",
        label: "Course Category",
        icon: <Tag className="w-5 h-5" />,
        component: <CourseCategory />,
        path: "/admin-dashboard/courses/courseCategory",
      },
    ],
  },

  //   enrollments
  {
    id: "enrollments",
    label: "Enrollments",
    icon: <GraduationCap className="w-5 h-5" />,
    component: <Enrollments />,
    path: "/admin-dashboard/enrollments",
  },

  //   Students
  {
    id: "students",
    label: "Students",
    icon: <Users className="w-5 h-5" />,
    component: <Students />,
    path: "/admin-dashboard/students",
  },

  //   Supports/Tickets
  {
    id: "supportsTickets",
    label: "Supports/Tickets",
    icon: <Ticket className="w-5 h-5" />,
    component: <SupportsTickets />,
    path: "/admin-dashboard/supports-tickets",
  },

  //   Announcements
  {
    id: "announcements",
    label: "Announcements",
    icon: <Megaphone className="w-5 h-5" />,
    component: <Announcements />,
    path: "/admin-dashboard/announcements",
  },

  //   Team members
  {
    id: "teamMembers",
    label: "Team Members",
    icon: <UserCog className="w-5 h-5" />,
    hasSubmenu: true,
    submenu: [
      {
        id: "instructors",
        label: "Instructors",
        icon: <Users className="w-5 h-5" />,
        component: <Instructors />,
        path: "/admin-dashboard/team-members/instructors",
      },
      {
        id: "supportStaff",
        label: "Support Staff",
        icon: <LifeBuoy className="w-5 h-5" />,
        component: <SupportStaff />,
        path: "/admin-dashboard/team-members/support-staff",
      },
    ],
  },

  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    hasSubmenu: true,
    submenu: [
      {
        id: "rolesPermissions",
        label: "Roles & Permissions",
        icon: <ShieldCheck className="w-5 h-5" />,
        component: <RolesPermissions />,
        path: "/admin-dashboard/settings/roles-permissions",
      },
      {
        id: "promoCodes",
        label: "Promo Codes",
        icon: <BadgePercent className="w-5 h-5" />,
        component: <PromoCodes />,
        path: "/admin-dashboard/settings/promo-codes",
      },
      {
        id: "paymentMethods",
        label: "Payment Methods",
        icon: <CreditCard className="w-5 h-5" />,
        component: <PaymentMethods />,
        path: "/admin-dashboard/settings/payment-methods",
      },
    ],
  },

  {
    id: "logOut",
    label: "লগআউট",
    icon: <LogOut className="w-5 h-5" />,
  },
];

export const announcementTableHeader = [
  { id: "index", label: "#" },
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "type", label: "Type" },
  { id: "actions", label: "Actions", align: "right" },
];

export const courseCategoryTableHeader = [
  { id: "index", label: "#" },
  { id: "name", label: "Name" },
  { id: "actions", label: "Actions", align: "right" },
];

export const promoCodesTableHeader = [
  { id: "index", label: "#" },
  { id: "code", label: "Code" },
  { id: "discountPercentage", label: "Discount" },
  { id: "validity", label: "Validity" },
  { id: "actions", label: "Actions", align: "right" },
]