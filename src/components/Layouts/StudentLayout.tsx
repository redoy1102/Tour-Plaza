import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { X, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/data/student/StudentDashboardMenuData";

const StudentLayout = () => {
  const location = useLocation();
  // console.log("Current Path:", location.pathname);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  // Determine activeTab based on current path
  const getActiveTab = () => {
    for (const item of menuItems) {
      if (item.path === location.pathname) {
        return item.id;
      }
      if (item.submenu) {
        const subItem = item.submenu.find(
          (sub) => sub.path === location.pathname
        );
        if (subItem) {
          return subItem.id;
        }
      }
    }
    return "dashboard";
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-65 border-r border-gray-300 bg-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:-ml-72"
        }`}
      >
        {/* Dashboard Sidebar */}
        <div className="p-6 flex items-center justify-between border-b border-gray-300">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
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
            <div key={item.id}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedMenu(expandedMenu === item.id ? null : item.id)
                    }
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      expandedMenu === item.id
                        ? "text-primary shadow-sm"
                        : "hover:text-gray-800"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown
                      className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                        expandedMenu === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedMenu === item.id && (
                    <div className="space-y-1 mt-1 ml-4">
                      {item.submenu?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => {
                            if (subItem.path) {
                              navigate(subItem.path);
                            }
                          }}
                          className={`w-full flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm ${
                            activeTab === subItem.id
                              ? "text-primary bg-gray-200 shadow-sm"
                              : "hover:text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {subItem.icon}
                          <span className="font-medium">{subItem.label}</span>
                          {activeTab === subItem.id && (
                            <div className="ml-auto w-1 h-1 rounded-full bg-red-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    if (item.id === "logOut") {
                      navigate("/");
                    } else if (item.path) {
                      navigate(item.path);
                    }
                    setExpandedMenu(null);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeTab === item.id
                      ? "text-primary shadow-sm"
                      : "hover:text-gray-800"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-gray-300 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <span className="ml-4 font-bold text-black">ড্যাশবোর্ড</span>
        </div>

        {/* Component is rendering from here */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
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

export default StudentLayout;
