import { useState, useEffect } from "react";
import FormField, { inputCls, selectCls } from "../components/FormField";

const TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];

const ExperienceForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    role: "", company: "", companyUrl: "#", location: "",
    type: "Full-time", period: "", duration: "", description: "",
    color: "#6366f1", order: 0, isActive: true,
  });
  const [techInput, setTechInput] = useState("");
  const [tech, setTech] = useState([]);
  const [hlInput, setHlInput] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        role: initial.role || "", company: initial.company || "",
        companyUrl: initial.companyUrl || "#", location: initial.location || "",
        type: initial.type || "Full-time", period: initial.period || "",
        duration: initial.duration || "", description: initial.description || "",
        color: initial.color || "#6366f1", order: initial.order || 0,
        isActive: initial.isActive ?? true,
      });
      setTech(initial.tech || []);
      setHighlights(initial.highlights || []);
    }
  }, [initial]);

  const addItem = (val, list, setList, setInput) => {
    const t = val.trim();
    if (t && !list.includes(t)) setList([...list, t]);
    setInput("");
  };
  const removeItem = (val, list, setList) => setList(list.filter((x) => x !== val));

  const validate = () => {
    const e = {};
    if (!form.role.trim()) e.role = "Role is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.period.trim()) e.period = "Period is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, tech, highlights });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Role / Position" required error={errors.role}>
          <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls(errors.role)} placeholder="Senior Developer" />
        </FormField>
        <FormField label="Company" required error={errors.company}>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls(errors.company)} placeholder="TechVision Labs" />
        </FormField>
        <FormField label="Company URL">
          <input value={form.companyUrl} onChange={(e) => setForm({ ...form, companyUrl: e.target.value })} className={inputCls()} placeholder="https://…" />
        </FormField>
        <FormField label="Location">
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls()} placeholder="San Francisco, CA" />
        </FormField>
        <FormField label="Employment Type">
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={selectCls()}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>
        <FormField label="Period" required error={errors.period}>
          <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className={inputCls(errors.period)} placeholder="Jan 2023 – Present" />
        </FormField>
        <FormField label="Duration">
          <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className={inputCls()} placeholder="2 yrs+" />
        </FormField>
        <FormField label="Color">
          <div className="flex gap-2">
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" />
            <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} />
          </div>
        </FormField>
      </div>

      <FormField label="Description" required error={errors.description}>
        <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls(errors.description) + " resize-none"} />
      </FormField>

      <FormField label="Key Highlights" hint="Press Enter to add">
        <input value={hlInput} onChange={(e) => setHlInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(hlInput, highlights, setHighlights, setHlInput); } }}
          className={inputCls()} placeholder="Led migration to microservices…" />
        <div className="flex flex-col gap-1 mt-2">
          {highlights.map((h) => (
            <div key={h} className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <span className="text-slate-300 text-xs">{h}</span>
              <button type="button" onClick={() => removeItem(h, highlights, setHighlights)} className="text-slate-600 hover:text-red-400 text-xs ml-2">×</button>
            </div>
          ))}
        </div>
      </FormField>

      <FormField label="Tech Used" hint="Press Enter to add">
        <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(techInput, tech, setTech, setTechInput); } }}
          className={inputCls()} placeholder="React, Node.js…" />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tech.map((t) => (
            <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-500/10 text-indigo-400">
              {t}<button type="button" onClick={() => removeItem(t, tech, setTech)} className="hover:text-white">×</button>
            </span>
          ))}
        </div>
      </FormField>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Display Order">
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls()} />
        </FormField>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="expActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" />
          <label htmlFor="expActive" className="text-slate-400 text-sm">Active</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">
          {loading ? "Saving..." : initial ? "Update" : "Add Experience"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default ExperienceForm;
