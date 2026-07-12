import { useState, useEffect } from "react";
import FormField, { inputCls } from "../components/FormField";

const CertificateForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ title: "", issuer: "", issuerUrl: "", credentialId: "", credentialUrl: "", issueDate: "", expiryDate: "", description: "", color: "#6366f1", order: 0, isActive: true });
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) { setForm({ title: initial.title || "", issuer: initial.issuer || "", issuerUrl: initial.issuerUrl || "", credentialId: initial.credentialId || "", credentialUrl: initial.credentialUrl || "", issueDate: initial.issueDate || "", expiryDate: initial.expiryDate || "", description: initial.description || "", color: initial.color || "#6366f1", order: initial.order || 0, isActive: initial.isActive ?? true }); setSkills(initial.skills || []); }
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title required";
    if (!form.issuer.trim()) e.issuer = "Issuer required";
    if (!form.issueDate.trim()) e.issueDate = "Issue date required";
    setErrors(e); return !Object.keys(e).length;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (!validate()) return; onSubmit({ ...form, skills }); };
  const addSkill = () => { const t = skillInput.trim(); if (t && !skills.includes(t)) setSkills([...skills, t]); setSkillInput(""); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Certificate Title" required error={errors.title}><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls(errors.title)} placeholder="AWS Certified Developer" /></FormField>
        <FormField label="Issuer" required error={errors.issuer}><input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} className={inputCls(errors.issuer)} placeholder="Amazon Web Services" /></FormField>
        <FormField label="Credential ID"><input value={form.credentialId} onChange={(e) => setForm({ ...form, credentialId: e.target.value })} className={inputCls()} /></FormField>
        <FormField label="Issue Date" required error={errors.issueDate}><input value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} className={inputCls(errors.issueDate)} placeholder="March 2023" /></FormField>
        <FormField label="Expiry Date"><input value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className={inputCls()} placeholder="March 2026 or No Expiry" /></FormField>
        <FormField label="Color"><div className="flex gap-2"><input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" /><input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} /></div></FormField>
        <FormField label="Credential URL"><input value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} className={inputCls()} placeholder="https://…" /></FormField>
        <FormField label="Order"><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls()} /></FormField>
      </div>
      <FormField label="Description"><textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls() + " resize-none"} /></FormField>
      <FormField label="Skills" hint="Press Enter to add"><input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} className={inputCls()} /><div className="flex flex-wrap gap-1.5 mt-2">{skills.map((s) => <span key={s} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-500/10 text-indigo-400">{s}<button type="button" onClick={() => setSkills(skills.filter((x) => x !== s))}>×</button></span>)}</div></FormField>
      <div className="flex items-center gap-2"><input type="checkbox" id="certActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" /><label htmlFor="certActive" className="text-slate-400 text-sm">Active</label></div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">{loading ? "Saving..." : initial ? "Update" : "Add Certificate"}</button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default CertificateForm;
