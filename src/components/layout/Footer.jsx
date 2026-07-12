import { motion } from "framer-motion";
import { HiHeart, HiArrowUp } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { personalInfo } from "../../data/personal";
import { fadeInUp, viewportConfig } from "../../utils/animations";

const navGroups = [
  {
    label: "Navigation",
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
    ],
  },
  {
    label: "More",
    links: [
      { label: "Services", href: "#services" },
      { label: "Achievements", href: "#achievements" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNav = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.04] pt-16 pb-8">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="container-width px-5 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                SB
              </div>
              <span className="text-white font-bold text-base">
                Satish<span className="gradient-text">Bhawsar</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Full Stack MERN Developer crafting scalable web experiences. Available for freelance & full-time opportunities.
            </p>
            <div className="flex gap-3">
              {[
                { icon: SiGithub, href: personalInfo.social.github, label: "GitHub" },
                { icon: FaLinkedinIn, href: personalInfo.social.linkedin, label: "LinkedIn" },
                { icon: FaTwitter, href: personalInfo.social.twitter, label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {navGroups.map((group) => (
            <div key={group.label}>
              <h4 className="text-white text-sm font-semibold mb-4">{group.label}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            © {new Date().getFullYear()} Satish Bhawsar · Built with
            <HiHeart className="w-3 h-3 text-red-500" />
            using React & Tailwind CSS
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-300 transition-colors group"
          >
            Back to top
            <span className="w-6 h-6 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
              <HiArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
