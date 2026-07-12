import { useState, useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome, HiUser, HiCode, HiBriefcase, HiAcademicCap,
  HiStar, HiChat, HiDocumentText, HiLogout, HiMenuAlt3,
  HiX, HiPhotograph, HiMail, HiBadgeCheck, HiSparkles,
  HiChevronDown,
} from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";

const navItems = [
  { label: "Dashboard", icon: HiHome, path: "/admin" },
  { label: "Hero", icon: HiSparkles, path: "/admin/hero" },
  { label: "Skills", icon: HiCode, path: "/admin/skills" },
  { label: "Projects", icon: HiPhotograph, path: "/admin/projects" },
  { label: "Experience", icon: HiBriefcase, path: "/admin/experience" },
  { label: "Education", icon: HiAcademicCap, path: "/admin/education" },
  { label: "Certificates", icon: HiBadgeCheck, path: "/admin/certificates" },
  { label: "Achievements", icon: FaTrophy, path: "/admin/achievements" },
  { label: "Testimonials", icon: HiChat, path: "/admin/testimonials" },
  { label: "Blogs", icon: HiDocumentText, path: "/admin/blogs" },
  { label: "Messages", icon: HiMail, path: "/admin/messages" },
  { label: "Settings", icon: HiUser, path: "/admin/settings" },
];

const Sidebar = ({ open, onClose, admin }) => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          bg-[#0a0a0f] border-r border-white/[0.06]`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="text-white font-bold text-sm">
              Portfolio <span className="text-indigo-400">CMS</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Admin info */}
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {admin?.fullName?.charAt(0) || "A"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{admin?.fullName || "Admin"}</p>
              <p className="text-slate-500 text-xs truncate">{admin?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <HiLogout className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const admin = useAuthStore((s) => s.admin);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} admin={admin} />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-30 glass border-b border-white/[0.06] px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400"
          >
            <HiMenuAlt3 className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-400 text-xs">API Connected</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">
              {admin?.fullName?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
