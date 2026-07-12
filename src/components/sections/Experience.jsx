import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiCheckCircle, HiBriefcase } from "react-icons/hi";
import { experiences } from "../../data/experience";
import SectionHeader from "../ui/SectionHeader";
import Badge from "../ui/Badge";
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp, viewportConfig } from "../../utils/animations";

const Experience = () => {
  const [activeId, setActiveId] = useState(1);
  const active = experiences.find((e) => e.id === activeId);

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-width">
        <SectionHeader
          badge="Experience"
          title="My professional"
          highlight="journey"
          description="4+ years of shipping production software across startups, agencies, and enterprise teams."
        />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 mt-4">
          {/* Timeline sidebar */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-2 flex flex-col gap-2 lg:gap-3"
          >
            {experiences.map((exp, i) => (
              <motion.button
                key={exp.id}
                variants={fadeInLeft}
                onClick={() => setActiveId(exp.id)}
                className={`text-left w-full p-4 rounded-xl border transition-all duration-300 ${
                  activeId === exp.id
                    ? "glass-strong"
                    : "glass border-white/[0.04] hover:border-white/10"
                }`}
                style={
                  activeId === exp.id
                    ? { borderColor: `${exp.color}40` }
                    : {}
                }
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${exp.color}20` }}
                  >
                    <HiBriefcase className="w-4 h-4" style={{ color: exp.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-semibold text-sm truncate">{exp.role}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{exp.company}</div>
                    <div className="text-slate-600 text-xs mt-1">{exp.period}</div>
                  </div>
                  {activeId === exp.id && (
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ml-auto"
                      style={{ backgroundColor: exp.color }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Detail pane */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="glass border border-white/[0.06] rounded-2xl p-6 sm:p-8 h-full"
                  style={{ borderColor: `${active.color}20` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-white text-xl font-bold">{active.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={active.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-1 group"
                        >
                          {active.company}
                          <HiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <span className="text-slate-700">·</span>
                        <span className="text-slate-500 text-xs">{active.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <Badge color={active.color} variant="outline">{active.type}</Badge>
                      <span className="text-slate-500 text-xs">{active.duration}</span>
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium mb-5"
                    style={{
                      backgroundColor: `${active.color}15`,
                      color: active.color,
                    }}
                  >
                    {active.period}
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {active.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6">
                    <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-3 text-slate-500">
                      Key Highlights
                    </h4>
                    {active.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-2.5"
                      >
                        <HiCheckCircle
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: active.color }}
                        />
                        <span className="text-slate-300 text-sm">{h}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h4 className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">
                      Tech Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {active.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: `${active.color}15`,
                            color: active.color,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
