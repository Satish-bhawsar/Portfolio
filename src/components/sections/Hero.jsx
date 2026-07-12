import { motion } from "framer-motion";
import { HiArrowRight, HiDownload } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { personalInfo } from "../../data/personal";
import { staggerContainer, fadeInUp, fadeInDown, scaleIn } from "../../utils/animations";

const floatingTech = [
  { label: "React", color: "#61dafb", top: "15%", left: "8%", delay: 0 },
  { label: "Node.js", color: "#68a063", top: "20%", right: "10%", delay: 0.2 },
  { label: "MongoDB", color: "#47a248", bottom: "30%", left: "6%", delay: 0.4 },
  { label: "TypeScript", color: "#3178c6", bottom: "25%", right: "8%", delay: 0.1 },
  { label: "AWS", color: "#ff9900", top: "60%", left: "12%", delay: 0.3 },
  { label: "Docker", color: "#2496ed", top: "40%", right: "5%", delay: 0.5 },
];

const Hero = () => {
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-1/4 left-1/2 w-[600px] h-[300px] rounded-full bg-cyan-600/10 blur-[100px]"
        />
      </div>

      {/* Floating tech badges — hidden on mobile */}
      {floatingTech.map((tech, i) => (
        <motion.div
          key={tech.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 1 + tech.delay },
            scale: { duration: 0.5, delay: 1 + tech.delay },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: tech.delay },
          }}
          className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-medium"
          style={{
            top: tech.top,
            bottom: tech.bottom,
            left: tech.left,
            right: tech.right,
            color: tech.color,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: tech.color }}
          />
          {tech.label}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Status badge */}
        <motion.div variants={fadeInDown} className="inline-flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium text-slate-300 tracking-wide">
              {personalInfo.availability}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeInUp} className="mb-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05]">
            Hi, I'm{" "}
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>
        </motion.div>

        {/* Title with animated words */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-lg sm:text-2xl lg:text-3xl font-semibold text-slate-300">
              Full Stack
            </span>
            <span className="px-4 py-1 rounded-xl bg-gradient-to-r from-indigo-600/30 to-violet-600/30 border border-indigo-500/30 text-indigo-300 text-lg sm:text-2xl lg:text-3xl font-bold">
              MERN Developer
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {personalInfo.tagline} — I craft{" "}
          <span className="text-white font-medium">scalable web applications</span>,{" "}
          <span className="text-white font-medium">elegant APIs</span>, and{" "}
          <span className="text-white font-medium">pixel-perfect interfaces</span> that
          users love and businesses rely on.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            onClick={() => handleScroll("projects")}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/30 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.a
            href={personalInfo.resumeUrl}
            download
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-slate-300 font-semibold text-sm hover:text-white hover:border-indigo-500/40 transition-all duration-200 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <HiDownload className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            Download Resume
          </motion.a>

          <motion.button
            onClick={() => handleScroll("contact")}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border border-indigo-500/40 text-indigo-400 font-semibold text-sm hover:bg-indigo-500/10 transition-all duration-200 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Talk
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 mb-16"
        >
          {[
            { icon: SiGithub, href: personalInfo.social.github, label: "GitHub" },
            { icon: FaLinkedinIn, href: personalInfo.social.linkedin, label: "LinkedIn" },
            { icon: FaTwitter, href: personalInfo.social.twitter, label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
          <span className="text-slate-600 text-sm">or find me at</span>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
          >
            {personalInfo.email}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={scaleIn}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {personalInfo.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass border border-white/[0.06] rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-9 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-indigo-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
