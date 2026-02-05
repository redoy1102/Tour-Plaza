import { useState } from "react";
import { User, Lock, FileText, BookOpen, LogIn, X, Menu } from "lucide-react";
import Profile from "@/components/StudentDashboardPage/Profile";
import PasswordUpdate from "@/components/StudentDashboardPage/PasswordUpdate";
// import Transaction from "@/components/StudentDashboardPage/Transaction";
import Enrollment from "@/components/StudentDashboardPage/Enrollment";
import LoginHistory from "@/components/StudentDashboardPage/LoginHistory";
import { Button } from "@/components/ui/button";

const StudentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      id: "profile",
      label: "প্রোফাইল",
      icon: <User className="w-5 h-5" />,
      component: <Profile />,
    },
    {
      id: "password",
      label: "পাসওয়ার্ড",
      icon: <Lock className="w-5 h-5" />,
      component: <PasswordUpdate />,
    },
    // {
    //   id: "transaction",
    //   label: "ট্রানজেকশন",
    //   icon: <FileText className="w-5 h-5" />,
    //   component: <Transaction />,
    // },
    {
      id: "enrollment",
      label: "এনরোলমেন্ট",
      icon: <BookOpen className="w-5 h-5" />,
      component: <Enrollment />,
    },
    {
      id: "login-history",
      label: "লগইন হিস্ট্রি",
      icon: <LogIn className="w-5 h-5" />,
      component: <LoginHistory />,
    },
  ];

  return (
    <div className="min-h-screen  flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 border-r border-slate-800/50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:-ml-72"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
          <h2 className="text-xl font-bold tracking-tight">
            ড্যাশবোর্ড
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden "
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === item.id
                  ? "text-primary shadow-sm"
                  : " hover:text-slate-600"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-slate-800/50 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <span className="ml-4 font-bold text-white">ড্যাশবোর্ড</span>
        </div>

        {/* Component is rendering from here */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {menuItems.find((item) => item.id === activeTab)?.component}
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboardPage;
