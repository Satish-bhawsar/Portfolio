import { motion } from "framer-motion";
import {
  HiCode,
  HiLocationMarker,
  HiMail,
  HiDownload,
  HiLightningBolt,
} from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { personalInfo } from "../../data/personal";
import SectionHeader from "../ui/SectionHeader";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  fadeInUp,
  viewportConfig,
} from "../../utils/animations";

const highlights = [
  { icon: HiLightningBolt, label: "Performance-first development", color: "#f59e0b" },
  { icon: HiCode, label: "Clean, maintainable code architecture", color: "#6366f1" },
  { icon: HiCode, label: "Full-cycle product delivery", color: "#10b981" },
  { icon: HiCode, label: "Strong communication & collaboration", color: "#06b6d4" },
];

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-width">
        <SectionHeader
          badge="About Me"
          title="The developer"
          highlight="behind the code"
          description="Passionate about crafting digital experiences that are both technically excellent and delightful to use."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-4">
          {/* Left — Avatar + Quick Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-6"
          >
            {/* Avatar Card */}
            <div className="relative mx-auto lg:mx-0 w-fit">
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 blur-2xl scale-110" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl glass border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Placeholder avatar */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-cyan-600/10 flex items-center justify-center">
                  <img src={personalInfo.avatar} className="" />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl glass border border-white/10 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-slate-300">Open to Work</span>
              </motion.div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0">
              {personalInfo.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass border border-white/[0.06] rounded-xl p-4"
                >
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="space-y-6"
          >
            <motion.div variants={fadeInRight}>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                {personalInfo.bio}
              </p>
              <p className="text-slate-400 leading-relaxed">
                {personalInfo.bioExtended}
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={fadeInRight} className="space-y-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-slate-300 text-sm">{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Contact info */}
            <motion.div
              variants={fadeInRight}
              className="glass border border-white/[0.06] rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center gap-3 text-sm">
                <HiLocationMarker className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-slate-400">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <HiMail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeInRight} className="flex flex-wrap gap-3">
              <a
                href={personalInfo.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                <HiDownload className="w-4 h-4" />
                Download CV
              </a>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-300 text-sm font-medium hover:border-indigo-500/40 hover:text-white transition-all duration-200"
              >
              <SiGithub className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-300 text-sm font-medium hover:border-indigo-500/40 hover:text-white transition-all duration-200"
              >
                <FaLinkedinIn className="w-4 h-4" />
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
