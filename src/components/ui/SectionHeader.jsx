import { motion } from "framer-motion";
import { fadeInUp, viewportConfig } from "../../utils/animations";

const SectionHeader = ({ badge, title, highlight, description, center = true }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-5 ${center ? "mx-auto" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse-slow" />
          <span className="text-xs font-medium text-indigo-400 tracking-widest uppercase">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
        {title}{" "}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className={`text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
