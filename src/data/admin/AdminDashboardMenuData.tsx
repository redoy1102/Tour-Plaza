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
  VectorSquare,
} from "lucide-react";
import Announcements from "@/components/AdminDashboardPage/sideNav/announcements/Announcements";
import SupportsTickets from "@/components/AdminDashboardPage/sideNav/supports_tickets/SupportsTickets";
import ManualPayment from "@/components/AdminDashboardPage/sideNav/settings/payment/manual_payment/ManualPayment";
import Instructors from "@/components/AdminDashboardPage/sideNav/team_members/instructors/Instructors";
import SupportStaff from "@/components/AdminDashboardPage/sideNav/team_members/support_staff/SupportStaff";
import RolesPermissions from "@/components/AdminDashboardPage/sideNav/settings/roles_permissions/RolesPermissions";
import PromoCodes from "@/components/AdminDashboardPage/sideNav/settings/promo_codes/PromoCodes";
import CourseCategory from "@/components/AdminDashboardPage/sideNav/course_category/CourseCategory";
import Tools from "@/components/AdminDashboardPage/sideNav/settings/tools/Tools";
import Prerequisites from "@/components/AdminDashboardPage/sideNav/settings/prerequisites/Prerequisites";
import ManualPaymentHistory from "@/components/AdminDashboardPage/sideNav/settings/payment/manual_payment/ManualPaymentHistory";
import PaymentGateways from "@/components/AdminDashboardPage/sideNav/settings/payment/payment_gateways/PaymentGateways";

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
        createButtonPath: "/admin-dashboard/courses/addCourse",
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
  // Payment
  {
    id: "paymentMethods",
    label: "Payment",
    icon: <CreditCard className="w-5 h-5" />,
    hasSubmenu: true,
    submenu: [
      {
        id: "paymentMethods",
        label: "Payment Gateways",
        icon: <CreditCard className="w-5 h-5" />,
        component: <PaymentGateways />,
        path: "/admin-dashboard/payment/payment-gateways",
      },
      {
        id: "manualPaymentMethods",
        label: "Manual Payment Methods",
        icon: <CreditCard className="w-5 h-5" />,
        component: <ManualPayment />,
        path: "/admin-dashboard/payment/manual-payment-methods",
      },
      {
        id: "manualPaymentHistory",
        label: "Manual Payment History",
        icon: <CreditCard className="w-5 h-5" />,
        component: <ManualPaymentHistory />,
        path: "/admin-dashboard/payment/manual-payment-history",
      },
    ],
  },
  // Settings
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
        id: "tools",
        label: "Tools",
        icon: <VectorSquare className="w-5 h-5" />,
        component: <Tools />,
        path: "/admin-dashboard/settings/tools",
      },
      {
        id: "prerequisites",
        label: "Prerequisites",
        icon: <VectorSquare className="w-5 h-5" />,
        component: <Prerequisites />,
        path: "/admin-dashboard/settings/prerequisites",
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
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End Date" },
  { id: "actions", label: "Actions", align: "right" },
];

export const instructorsTableHeader = [
  { id: "index", label: "#" },
  { id: "img", label: "Image" },
  { id: "name", label: "Name" },
  { id: "role", label: "Role" },
  { id: "runningCompanyName", label: "Company" },
  { id: "actions", label: "Actions", align: "right" },
];

export const supportStaffTableHeader = [
  { id: "index", label: "#" },
  { id: "img", label: "Image" },
  { id: "name", label: "Name" },
  { id: "role", label: "Role" },
  { id: "runningCompanyName", label: "Company" },
  { id: "actions", label: "Actions", align: "right" },
];

export const paymentMethodsTableHeader = [
  { id: "index", label: "#" },
  // { id: "img", label: "Image" },
  { id: "name", label: "Name" },
  {id: "description", label: "Description" },
  { id: "actions", label: "Actions", align: "right" },
];

export const toolsTableHeader = [
  { id: "index", label: "#" },
  { id: "img", label: "Image" },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "actions", label: "Actions", align: "right" },
];

export const prerequisitesTableHeader = [
  { id: "index", label: "#" },
  { id: "icon", label: "Icon" },
  { id: "title", label: "Title" },
  { id: "actions", label: "Actions", align: "right" },
];
