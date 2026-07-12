import { motion } from "framer-motion";
import {
  HiStar,
  HiBadgeCheck,
  HiLightningBolt,
  HiUsers,
  HiNewspaper,
  HiCode,
  HiAcademicCap,
  HiBriefcase,
  HiCollection,
} from "react-icons/hi";

import { FaTrophy } from "react-icons/fa";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { achievements, codingStats } from "../../data/achievements";
import SectionHeader from "../ui/SectionHeader";
import { staggerContainer, scaleIn, fadeInUp, viewportConfig } from "../../utils/animations";
import { useState } from "react";

const iconMap = {
  HiTrophy: FaTrophy,
  HiStar,
  HiBadgeCheck,
  HiLightningBolt,
  HiUsers,
  HiNewspaper,
  HiCode,
  HiAcademicCap,
  HiBriefcase,
  HiCollection,
};

const AchievementCard = ({ achievement }) => {
  const Icon = iconMap[achievement.icon] || HiTrophy;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, borderColor: `${achievement.color}30` }}
      transition={{ duration: 0.3 }}
      className="glass border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden group"
    >
      {/* BG glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: achievement.color }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${achievement.color}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: achievement.color }} />
          </div>
          <div className="text-right">
            <div className="text-lg font-black" style={{ color: achievement.color }}>
              {achievement.metric}
            </div>
            <div className="text-xs text-slate-600">{achievement.year}</div>
          </div>
        </div>

        <h3 className="text-white font-bold text-sm mb-1">{achievement.title}</h3>
        <p className="text-slate-600 text-xs font-medium mb-2">{achievement.platform}</p>
        <p className="text-slate-400 text-xs leading-relaxed">{achievement.description}</p>
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const [gitData, setGitData] = useState(false);

  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-width">
        <SectionHeader
          badge="Achievements"
          title="Recognition &"
          highlight="milestones"
          description="Highlights from my journey — competitions, certifications, and community impact."
        />

        {/* Achievement Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14"
        >
          {achievements.map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </motion.div>

        {/* GitHub Stats */}
        {gitData && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="glass border border-white/[0.06] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <SiGithub className="w-6 h-6 text-white" />
              <h3 className="text-white font-bold text-lg">GitHub & Coding Stats</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {codingStats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl"
                  style={{ backgroundColor: `${stat.color}10` }}
                >
                  <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* GitHub Contribution Graph placeholder */}
            <div className="rounded-xl overflow-hidden border border-white/[0.06]">
              <div className="p-4 bg-[#0d1117]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400 text-xs">
                    1,847 contributions in the last year
                  </span>
                  <span className="text-slate-600 text-xs">alexmorgan</span>
                </div>
                {/* Simulated contribution grid */}
                <div className="flex gap-1 overflow-hidden">
                  {Array.from({ length: 52 }).map((_, weekI) => (
                    <div key={weekI} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, dayI) => {
                        const rand = Math.random();
                        const opacity =
                          rand < 0.3 ? 0.05 : rand < 0.5 ? 0.2 : rand < 0.7 ? 0.4 : rand < 0.85 ? 0.6 : 0.9;
                        return (
                          <div
                            key={dayI}
                            className="w-2.5 h-2.5 rounded-sm"
                            style={{ backgroundColor: `rgba(99,102,241,${opacity})` }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LeetCode stats */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                { label: "Easy", value: "200+", color: "#10b981", bg: "#10b98115" },
                { label: "Medium", value: "250+", color: "#f59e0b", bg: "#f59e0b15" },
                { label: "Hard", value: "50+", color: "#ef4444", bg: "#ef444415" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 flex items-center justify-between"
                  style={{ backgroundColor: item.bg }}
                >
                  <div className="flex items-center gap-2">
                    <SiLeetcode className="w-4 h-4" style={{ color: item.color }} />
                    <span className="text-sm text-slate-400">{item.label}</span>
                  </div>
                  <span className="font-bold text-sm" style={{ color: item.color }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
