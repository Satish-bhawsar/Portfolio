import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiCode, HiPhotograph, HiBriefcase, HiChat, HiMail,
  HiDocumentText, HiStar, HiBadgeCheck, HiAcademicCap,
} from "react-icons/hi";
import { FaTrophy } from "react-icons/fa";
import { useDashboardStats } from "../../hooks/usePortfolioData";
import useAuthStore from "../../store/authStore";
import { staggerContainer, fadeInUp, scaleIn, viewportConfig } from "../../utils/animations";

const StatCard = ({ icon: Icon, label, value, color, to }) => (
  <motion.div variants={scaleIn}>
    <Link
      to={to}
      className="block glass border border-white/[0.06] rounded-xl p-5 hover:border-indigo-500/20 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="text-2xl font-black" style={{ color }}>{value ?? "—"}</span>
      </div>
      <p className="text-slate-500 text-xs font-medium">{label}</p>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  const admin = useAuthStore((s) => s.admin);
  const { data, isLoading } = useDashboardStats();
  const stats = data?.data;

  const cards = [
    { icon: HiPhotograph, label: "Projects", value: stats?.projects, color: "#6366f1", to: "/admin/projects" },
    { icon: HiCode, label: "Skills", value: stats?.skills, color: "#06b6d4", to: "/admin/skills" },
    { icon: HiBriefcase, label: "Experience", value: stats?.experiences, color: "#10b981", to: "/admin/experience" },
    { icon: HiAcademicCap, label: "Education", value: stats?.educations, color: "#f59e0b", to: "/admin/education" },
    { icon: HiBadgeCheck, label: "Certificates", value: stats?.certificates, color: "#8b5cf6", to: "/admin/certificates" },
    { icon: FaTrophy, label: "Achievements", value: stats?.achievements, color: "#ec4899", to: "/admin/achievements" },
    { icon: HiChat, label: "Testimonials", value: stats?.testimonials, color: "#14b8a6", to: "/admin/testimonials" },
    { icon: HiDocumentText, label: "Blogs", value: stats?.blogs, color: "#f97316", to: "/admin/blogs" },
    { icon: HiMail, label: "Unread Messages", value: stats?.unreadMessages, color: "#ef4444", to: "/admin/messages" },
  ];

  return (
    <div>
      {/* Welcome */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <h1 className="text-white text-2xl font-bold">
          Welcome back, <span className="gradient-text">{admin?.fullName?.split(" ")[0] || "Admin"}</span> 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Here's what's happening with your portfolio.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10"
      >
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </motion.div>

      {/* Recent Messages */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Recent Messages</h2>
          <Link to="/admin/messages" className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="glass border border-white/[0.06] rounded-xl p-8 text-center">
            <svg className="w-5 h-5 animate-spin text-indigo-400 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
          </div>
        ) : (
          <div className="glass border border-white/[0.06] rounded-xl overflow-hidden">
            {stats?.recentMessages?.length ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium hidden sm:table-cell">Email</th>
                    <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium hidden md:table-cell">Subject</th>
                    <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentMessages.map((msg) => (
                    <tr key={msg._id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-white font-medium">{msg.name}</td>
                      <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">{msg.email}</td>
                      <td className="px-4 py-3 text-slate-400 hidden md:table-cell truncate max-w-[200px]">{msg.subject || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                          msg.status === "unread"
                            ? "bg-red-500/10 text-red-400"
                            : msg.status === "replied"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-slate-500/10 text-slate-400"
                        }`}>
                          {msg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-slate-500 text-sm py-8">No messages yet</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
