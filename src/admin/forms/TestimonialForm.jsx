import { useState, useEffect } from "react";
import FormField, { inputCls } from "../components/FormField";

const TestimonialForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ name: "", role: "", company: "", initials: "", rating: 5, content: "", color: "#6366f1", featured: false, order: 0, isActive: true });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ name: initial.name || "", role: initial.role || "", company: initial.company || "", initials: initial.initials || "", rating: initial.rating || 5, content: initial.content || "", color: initial.color || "#6366f1", featured: initial.featured || false, order: initial.order || 0, isActive: initial.isActive ?? true });
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.role.trim()) e.role = "Role required";
    if (!form.company.trim()) e.company = "Company required";
    if (!form.content.trim()) e.content = "Content required";
    setErrors(e); return !Object.keys(e).length;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (!validate()) return; onSubmit(form); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Full Name" required error={errors.name}><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls(errors.name)} placeholder="Sarah Chen" /></FormField>
        <FormField label="Role / Position" required error={errors.role}><input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls(errors.role)} placeholder="CTO" /></FormField>
        <FormField label="Company" required error={errors.company}><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls(errors.company)} placeholder="TechVision Labs" /></FormField>
        <FormField label="Initials" hint="For avatar placeholder"><input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} className={inputCls()} placeholder="SC" /></FormField>
        <FormField label="Rating (1–5)"><input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className={inputCls()} /></FormField>
        <FormField label="Color"><div className="flex gap-2"><input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" /><input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} /></div></FormField>
      </div>
      <FormField label="Testimonial Content" required error={errors.content}><textarea rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputCls(errors.content) + " resize-none"} placeholder="Alex is one of the most talented engineers…" /></FormField>
      <div className="flex gap-6">
        <div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded" /><label htmlFor="featured" className="text-slate-400 text-sm">Featured</label></div>
        <div className="flex items-center gap-2"><input type="checkbox" id="testActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" /><label htmlFor="testActive" className="text-slate-400 text-sm">Active</label></div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">{loading ? "Saving..." : initial ? "Update" : "Add Testimonial"}</button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default TestimonialForm;
