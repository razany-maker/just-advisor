import { Outlet, NavLink } from "react-router";
import { MessageSquare, GitMerge, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import justLogo from "../../imports/png-transparent-jordan-university-of-science-and-technology-higher-education-student-academic-degree-science-and-technology-text-people-logo-thumbnail.png";

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { path: "/app/chat", icon: MessageSquare, label: "Advising Chat" },
    { path: "/app/courses", icon: GitMerge, label: "Courses Tree" },
    { path: "/app/profile", icon: User, label: "Profile Dashboard" },
  ];

  return (
    <div className="flex h-screen bg-[#E7ECF0] font-sans selection:bg-[#D03028] selection:text-white relative overflow-hidden">
      {/* Decorative background for the main layout */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-[#263C74]/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#D03028]/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 flex-col bg-white/60 backdrop-blur-xl border-r border-white/50 shadow-[4px_0_24px_rgba(38,60,116,0.05)] m-4 rounded-[2rem] overflow-hidden z-20">
        <div className="p-8 flex items-center space-x-4 border-b border-[#263C74]/10 bg-gradient-to-br from-[#263C74]/5 to-transparent">
          <div className="bg-white p-2 rounded-2xl shadow-md border border-[#263C74]/10 group-hover:rotate-12 transition-transform">
            <ImageWithFallback src={justLogo} alt="JUST Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
          </div>
          <div>
            <h2 className="font-extrabold text-xl leading-tight text-[#1F2D4D]">JUST CS</h2>
            <p className="text-xs font-bold text-[#D03028]">Advisor Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold ${
                  isActive
                    ? "bg-gradient-to-r from-[#263C74] to-[#1F2D4D] text-white shadow-lg shadow-[#263C74]/30 translate-x-2"
                    : "text-[#1F2D4D]/70 hover:bg-white hover:text-[#263C74] hover:shadow-md hover:translate-x-1"
                }`
              }
            >
              <item.icon className={`w-6 h-6 ${false ? "" : ""}`} />
              <span className="text-[15px]">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-[#263C74]/10 bg-white/40 backdrop-blur-md">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#263C74]/10 mb-4 flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#263C74] to-[#D03028] flex items-center justify-center font-extrabold text-white shadow-inner">
              BA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-[#1F2D4D] truncate">Bushra Al momani</p>
              <p className="text-xs font-semibold text-[#1F2D4D]/60 truncate">ID: 112233</p>
            </div>
          </div>
          <NavLink
            to="/login"
            className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl transition-all font-bold text-[#D03028] bg-[#D03028]/10 hover:bg-[#D03028] hover:text-white shadow-sm hover:shadow-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <header className="md:hidden bg-white/80 backdrop-blur-xl text-[#1F2D4D] p-4 flex items-center justify-between shadow-sm border-b border-[#263C74]/10 relative z-30">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-[#263C74]/10">
              <ImageWithFallback src={justLogo} alt="JUST Logo" className="w-8 h-8 object-contain" />
            </div>
            <h2 className="font-extrabold text-lg">JUST CS Advisor</h2>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 bg-[#E7ECF0] rounded-xl hover:bg-[#263C74] hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile Navigation Dropdown */}
        {isSidebarOpen && (
          <div className="md:hidden bg-white shadow-2xl absolute w-full z-20 top-[73px] border-b border-[#263C74]/10 animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-4 px-6 py-4 border-b border-[#263C74]/5 font-bold ${
                    isActive ? "bg-[#263C74]/5 text-[#263C74]" : "text-[#1F2D4D]/70"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            <NavLink
              to="/login"
              className="flex items-center space-x-4 px-6 py-4 font-bold text-[#D03028] bg-[#D03028]/5"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </NavLink>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4 md:p-6 md:pl-0">
          <div className="h-full bg-white/40 backdrop-blur-sm md:rounded-[2rem] md:shadow-lg md:border border-white/50 overflow-hidden relative">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
