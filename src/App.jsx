import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

// Portfolio (public)
import BackgroundGrid from "./components/ui/BackgroundGrid";
import ScrollIndicator from "./components/ui/ScrollIndicator";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Services from "./components/sections/Services";
import Achievements from "./components/sections/Achievements";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";

// Admin
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import Login from "./admin/pages/Login";

// Lazy-load admin pages
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Settings = lazy(() => import("./admin/pages/Settings"));
const HeroManager = lazy(() => import("./admin/pages/HeroManager"));
const SkillsManager = lazy(() => import("./admin/pages/SkillsManager"));
const ProjectsManager = lazy(() => import("./admin/pages/ProjectsManager"));
const ExperienceManager = lazy(() => import("./admin/pages/ExperienceManager"));
const EducationManager = lazy(() => import("./admin/pages/EducationManager"));
const CertificatesManager = lazy(() => import("./admin/pages/CertificatesManager"));
const AchievementsManager = lazy(() => import("./admin/pages/AchievementsManager"));
const TestimonialsManager = lazy(() => import("./admin/pages/TestimonialsManager"));
const BlogsManager = lazy(() => import("./admin/pages/BlogsManager"));
const MessagesManager = lazy(() => import("./admin/pages/MessagesManager"));

// Loading fallback for admin pages
const AdminLoader = () => (
  <div className="flex items-center justify-center h-64">
    <svg className="w-6 h-6 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
    </svg>
  </div>
);

// Public portfolio page
const PortfolioHome = () => (
  <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
    <BackgroundGrid />
    <ScrollIndicator />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Achievements />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <>
      <Routes>
        {/* ── Public Portfolio ── */}
        <Route path="/" element={<PortfolioHome />} />

        {/* ── Admin Auth ── */}
        <Route path="/admin/login" element={<Login />} />

        {/* ── Admin Panel (protected) ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Suspense fallback={<AdminLoader />}><Dashboard /></Suspense>}
          />
          <Route path="settings" element={<Suspense fallback={<AdminLoader />}><Settings /></Suspense>} />
          <Route path="hero" element={<Suspense fallback={<AdminLoader />}><HeroManager /></Suspense>} />
          <Route path="skills" element={<Suspense fallback={<AdminLoader />}><SkillsManager /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<AdminLoader />}><ProjectsManager /></Suspense>} />
          <Route path="experience" element={<Suspense fallback={<AdminLoader />}><ExperienceManager /></Suspense>} />
          <Route path="education" element={<Suspense fallback={<AdminLoader />}><EducationManager /></Suspense>} />
          <Route path="certificates" element={<Suspense fallback={<AdminLoader />}><CertificatesManager /></Suspense>} />
          <Route path="achievements" element={<Suspense fallback={<AdminLoader />}><AchievementsManager /></Suspense>} />
          <Route path="testimonials" element={<Suspense fallback={<AdminLoader />}><TestimonialsManager /></Suspense>} />
          <Route path="blogs" element={<Suspense fallback={<AdminLoader />}><BlogsManager /></Suspense>} />
          <Route path="messages" element={<Suspense fallback={<AdminLoader />}><MessagesManager /></Suspense>} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0f0f1a",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;
