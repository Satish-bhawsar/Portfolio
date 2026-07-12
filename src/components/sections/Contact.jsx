import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiCheckCircle,
} from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";
import { personalInfo } from "../../data/personal";
import SectionHeader from "../ui/SectionHeader";
import { fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from "../../utils/animations";

const contactInfo = [
  { icon: HiMail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "#6366f1" },
  { icon: HiPhone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: "#06b6d4" },
  { icon: HiLocationMarker, label: "Location", value: personalInfo.location, href: null, color: "#10b981" },
];

const socialLinks = [
  { icon: SiGithub, href: personalInfo.social.github, label: "GitHub" },
  { icon: FaLinkedinIn, href: personalInfo.social.linkedin, label: "LinkedIn" },
  { icon: FaTwitter, href: personalInfo.social.twitter, label: "Twitter" },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
    setForm(initialForm);
    toast.success("Message sent! I'll get back to you shortly.", {
      duration: 5000,
      style: { background: "#0f0f1a", color: "#f8fafc", border: "1px solid rgba(99,102,241,0.3)" },
    });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-width">
        <SectionHeader
          badge="Contact"
          title="Let's work"
          highlight="together"
          description="Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours."
        />

        <div className="grid lg:grid-cols-5 gap-10 mt-4">
          {/* Left: Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact cards */}
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const Inner = (
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-0.5">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={item.label}
                  variants={fadeInLeft}
                  className="glass border border-white/[0.06] rounded-xl p-4 hover:border-indigo-500/20 transition-all duration-200"
                >
                  {item.href ? (
                    <a href={item.href}>{Inner}</a>
                  ) : Inner}
                </motion.div>
              );
            })}

            {/* Social */}
            <motion.div variants={fadeInLeft} className="pt-2">
              <p className="text-slate-600 text-xs uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              variants={fadeInLeft}
              className="glass border border-green-500/20 rounded-xl p-5"
              style={{ backgroundColor: "rgba(16,185,129,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Available for new projects</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">
                Currently accepting freelance & full-time opportunities. Response time within 24 hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-3"
          >
            <div className="glass border border-white/[0.06] rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                    <HiCheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-white text-xl font-bold">Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-2">
                        Name <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-2">
                        Email <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-medium mb-2">
                      Message <span className="text-indigo-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all duration-200 resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.01 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
