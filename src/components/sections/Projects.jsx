import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiCode } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { projects, projectCategories } from "../../data/projects";
import SectionHeader from "../ui/SectionHeader";
import { staggerContainer, scaleIn, fadeInUp, viewportConfig } from "../../utils/animations";

const StatusBadge = ({ status }) => {
  const styles = {
    Live: "bg-green-500/15 text-green-400 border-green-500/20",
    "Open Source": "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    WIP: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  };
  const dots = {
    Live: "bg-green-400",
    "Open Source": "bg-indigo-400",
    WIP: "bg-amber-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${styles[status] || styles.Live}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.Live} animate-pulse-slow`} />
      {status}
    </span>
  );
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/15 flex flex-col"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}60)` }}
      />

      {/* Image / Gradient area */}
      <div
        className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Project initial */}
        <span
          className="text-6xl font-black select-none opacity-20"
          style={{ color: project.color }}
        >
          {project.shortTitle.slice(0, 2)}
        </span>

        {/* Hover overlay with links */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
              style={{ backgroundColor: "rgba(10,10,15,0.8)", backdropFilter: "blur(8px)" }}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-200"
                  style={{ backgroundColor: `${project.color}30`, border: `1px solid ${project.color}50` }}
                >
                  <HiExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/20 text-white text-sm font-medium"
              >
                <SiGithub className="w-4 h-4" />
                Code
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Year */}
        <span className="absolute top-3 left-3 text-xs text-slate-600 font-mono">
          {project.year}
        </span>

        {/* Status */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span
              className="text-xs font-medium mb-1 block"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
            <h3 className="text-white font-bold text-base leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${project.color}15`, color: project.color }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md glass border border-white/[0.06] text-slate-500"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded-md glass border border-white/[0.06] text-slate-600">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
          >
            <SiGithub className="w-3.5 h-3.5" />
            Source
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: project.color }}
            >
              <HiExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-width">
        <SectionHeader
          badge="Projects"
          title="Things I've"
          highlight="built"
          description="A selection of projects that showcase my range — from SaaS platforms to open-source tools."
        />

        {/* Filters */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {projectCategories.map((cat) => (
            <motion.button
              key={cat}
              variants={scaleIn}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeFilter === cat
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "glass border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            No projects in this category yet.
          </div>
        )}

        {/* GitHub CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/alexmorgan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-slate-300 text-sm font-medium hover:border-indigo-500/40 hover:text-white transition-all duration-200"
          >
            <SiGithub className="w-4 h-4" />
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
