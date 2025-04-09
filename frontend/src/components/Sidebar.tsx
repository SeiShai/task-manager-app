import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Home,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    { name: "Tasks", icon: <CheckSquare size={20} />, path: "/tasks" },
    { name: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
    { name: "Home", icon: <Home size={20} />, path: "/" },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`h-full bg-white border-r border-slate-200 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-17"
      } flex flex-col`}
    >
      {/* Logo and toggle button in the same row */}
      <div className="flex items-center justify-between py-6 px-4">
        <div className="flex items-center space-x-2">
          {isExpanded && (
            <div className="flex items-center space-x-2">
              <CheckSquare
                size={24}
                className="text-purple-700 flex-shrink-0"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-800 to-indigo-700 bg-clip-text text-transparent">
                TaskMaster
              </h1>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          title="Toggle Sidebar"
          aria-label="Toggle Sidebar"
          className="bg-purple-700 text-white rounded-full cursor-pointer p-1 shadow-md hover:bg-purple-800 transition-colors"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "hover:bg-slate-100"
                  }`}
                >
                  <div className="text-purple-700">{item.icon}</div>
                  {isExpanded && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
