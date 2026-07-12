import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi";
import { heroHooks } from "../../hooks/usePortfolioData";
import PageHeader from "../components/PageHeader";
import FormField, { inputCls } from "../components/FormField";
import { fadeInUp } from "../../utils/animations";
import toast from "react-hot-toast";

// Hero is a single document — show edit form directly
const HeroManager = () => {
  const { data, isLoading } = heroHooks.useList({ isActive: true });
  const { mutate: create, isPending: creating } = heroHooks.useCreate();
  const { mutate: update, isPending: updating } = heroHooks.useUpdate();

  const hero = data?.data?.[0];

  const [form, setForm] = useState({
    name: "", title: "", subtitle: "", description: "",
    badge: "", resumeUrl: "/resume.pdf",
    ctaPrimary: "View My Work", ctaSecondary: "Download Resume", ctaTertiary: "Let's Talk",
  });

  useEffect(() => {
    if (hero) {
      setForm({
        name: hero.name || "",
        title: hero.title || "",
        subtitle: hero.subtitle || "",
        description: hero.description || "",
        badge: hero.badge || "",
        resumeUrl: hero.resumeUrl || "/resume.pdf",
        ctaPrimary: hero.ctaPrimary || "View My Work",
        ctaSecondary: hero.ctaSecondary || "Download Resume",
        ctaTertiary: hero.ctaTertiary || "Let's Talk",
      });
    }
  }, [hero]);

  const handleSave = () => {
    if (!form.name || !form.title) { toast.error("Name and title are required"); return; }
    if (hero) {
      update({ id: hero._id, data: form });
    } else {
      create({ data: { ...form, isActive: true } });
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-48">
      <svg className="w-6 h-6 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
      </svg>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <PageHeader title="Hero Section" description="Manage your hero section content" />

      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-5">
        <div className="glass border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-semibold">Main Content</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Your Name" required>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls()} placeholder="Alex Morgan" />
            </FormField>
            <FormField label="Title / Role" required>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls()} placeholder="Full Stack MERN Developer" />
            </FormField>
          </div>
          <FormField label="Tagline / Subtitle">
            <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className={inputCls()} placeholder="Building scalable web experiences" />
          </FormField>
          <FormField label="Description">
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls() + " resize-none"} placeholder="Short intro paragraph..." />
          </FormField>
          <FormField label="Availability Badge">
            <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className={inputCls()} placeholder="Available for Freelance" />
          </FormField>
          <FormField label="Resume URL">
            <input value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} className={inputCls()} placeholder="/resume.pdf" />
          </FormField>
        </div>

        <div className="glass border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-semibold">CTA Button Labels</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <FormField label="Primary CTA">
              <input value={form.ctaPrimary} onChange={(e) => setForm({ ...form, ctaPrimary: e.target.value })} className={inputCls()} />
            </FormField>
            <FormField label="Secondary CTA">
              <input value={form.ctaSecondary} onChange={(e) => setForm({ ...form, ctaSecondary: e.target.value })} className={inputCls()} />
            </FormField>
            <FormField label="Tertiary CTA">
              <input value={form.ctaTertiary} onChange={(e) => setForm({ ...form, ctaTertiary: e.target.value })} className={inputCls()} />
            </FormField>
          </div>
        </div>

        <button onClick={handleSave} disabled={creating || updating} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60 transition-all shadow-lg shadow-indigo-500/20">
          {creating || updating ? "Saving..." : <><HiCheck className="w-4 h-4" /> Save Hero</>}
        </button>
      </motion.div>
    </div>
  );
};

export default HeroManager;
