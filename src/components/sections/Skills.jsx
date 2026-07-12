import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiRedux, SiFramer, SiHtml5, SiNodedotjs, SiExpress, SiPostman,
  SiGraphql, SiSocket, SiPython, SiMongodb, SiPostgresql,
  SiMysql, SiRedis, SiPrisma, SiDocker, SiGit, SiVercel, SiNginx,
  SiLinux, SiKubernetes, SiJsonwebtokens, SiGithubactions,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { skillCategories, techStack } from "../../data/skills";
import SectionHeader from "../ui/SectionHeader";
import { staggerContainer, fadeInUp, viewportConfig, scaleIn } from "../../utils/animations";

const iconMap = {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiRedux, SiFramer, SiHtml5, SiNodedotjs, SiExpress, SiPostman,
  SiGraphql, SiPython, SiMongodb, SiPostgresql,
  SiMysql, SiRedis, SiPrisma, SiDocker, SiGit, SiVercel, SiNginx,
  SiLinux, SiKubernetes, SiJsonwebtokens, SiGithubactions,
  // Aliased icons
  SiSocketdotio: SiSocket,
  SiMongoose: SiMongodb,
  SiAmazon: FaAmazon,
};

const SkillBar = ({ name, level, color, icon, delay = 0 }) => {
  const Icon = iconMap[icon] || SiReact;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-sm font-medium text-slate-300">{name}</span>
        </div>
        <span className="text-xs font-semibold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </motion.div>
  );
};

const TechPill = ({ name, icon, color }) => {
  const Icon = iconMap[icon] || SiReact;
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/[0.06] hover:border-white/15 transition-all duration-200 cursor-default"
    >
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
      <span className="text-xs font-medium text-slate-300">{name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeCategory = skillCategories.find((c) => c.id === activeTab);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-width">
        <SectionHeader
          badge="Skills & Tech"
          title="My technical"
          highlight="arsenal"
          description="A curated stack of technologies I use to build performant, scalable, and beautiful products."
        />

        {/* Tech Stack Pills */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap gap-2 justify-center mb-16"
        >
          {techStack.map((tech) => (
            <motion.div key={tech.name} variants={scaleIn}>
              <TechPill {...tech} />
            </motion.div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                activeTab === cat.id
                  ? "text-white border-transparent"
                  : "text-slate-400 border-white/10 glass hover:text-white"
              }`}
              style={
                activeTab === cat.id
                  ? {
                      background: `linear-gradient(135deg, ${cat.color}30, ${cat.color}15)`,
                      borderColor: `${cat.color}40`,
                      color: cat.color,
                    }
                  : {}
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass border border-white/[0.06] rounded-2xl p-8"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {activeCategory.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={activeCategory.color}
                    delay={i * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center text-slate-600 text-sm mt-8"
        >
          Always learning · Currently exploring AI/ML integration with web apps
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
