import { useState, useEffect } from "react";
import FormField, { inputCls } from "../components/FormField";

const ICONS = ["HiStar", "HiBadgeCheck", "HiLightningBolt", "HiUsers", "HiNewspaper", "FaTrophy", "HiCode", "HiGlobe"];

const AchievementForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ icon: "HiStar", title: "", platform: "", description: "", metric: "", color: "#6366f1", year: "", order: 0, isActive: true });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ icon: initial.icon || "HiStar", title: initial.title || "", platform: initial.platform || "", description: initial.description || "", metric: initial.metric || "", color: initial.color || "#6366f1", year: initial.year || "", order: initial.order || 0, isActive: initial.isActive ?? true });
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title required";
    if (!form.platform.trim()) e.platform = "Platform required";
    if (!form.description.trim()) e.description = "Description required";
    if (!form.metric.trim()) e.metric = "Metric required";
    setErrors(e); return !Object.keys(e).length;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (!validate()) return; onSubmit(form); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Title" required error={errors.title}><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls(errors.title)} placeholder="Top 1% Developer" /></FormField>
        <FormField label="Platform" required error={errors.platform}><input value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className={inputCls(errors.platform)} placeholder="LeetCode" /></FormField>
        <FormField label="Metric" required error={errors.metric}><input value={form.metric} onChange={(e) => setForm({ ...form, metric: e.target.value })} className={inputCls(errors.metric)} placeholder="500+ Problems" /></FormField>
        <FormField label="Year"><input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className={inputCls()} placeholder="2024" /></FormField>
        <FormField label="Color"><div className="flex gap-2"><input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" /><input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} /></div></FormField>
        <FormField label="Order"><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls()} /></FormField>
      </div>
      <FormField label="Description" required error={errors.description}><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls(errors.description) + " resize-none"} /></FormField>
      <div className="flex items-center gap-2"><input type="checkbox" id="achActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" /><label htmlFor="achActive" className="text-slate-400 text-sm">Active</label></div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">{loading ? "Saving..." : initial ? "Update" : "Add Achievement"}</button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default AchievementForm;
