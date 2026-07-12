import { useState, useEffect } from "react";
import FormField, { inputCls } from "../components/FormField";

const EducationForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    degree: "", institution: "", institutionUrl: "#", location: "",
    period: "", duration: "", description: "", gpa: "",
    color: "#6366f1", order: 0, isActive: true,
  });
  const [hlInput, setHlInput] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({ degree: initial.degree || "", institution: initial.institution || "", institutionUrl: initial.institutionUrl || "#", location: initial.location || "", period: initial.period || "", duration: initial.duration || "", description: initial.description || "", gpa: initial.gpa || "", color: initial.color || "#6366f1", order: initial.order || 0, isActive: initial.isActive ?? true });
      setHighlights(initial.highlights || []);
    }
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.degree.trim()) e.degree = "Degree is required";
    if (!form.institution.trim()) e.institution = "Institution is required";
    if (!form.period.trim()) e.period = "Period is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, highlights });
  };

  const addHl = () => {
    const t = hlInput.trim();
    if (t && !highlights.includes(t)) setHighlights([...highlights, t]);
    setHlInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Degree / Qualification" required error={errors.degree}>
          <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className={inputCls(errors.degree)} placeholder="B.Sc. Computer Science" />
        </FormField>
        <FormField label="Institution" required error={errors.institution}>
          <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} className={inputCls(errors.institution)} placeholder="MIT" />
        </FormField>
        <FormField label="Location">
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls()} placeholder="Cambridge, MA" />
        </FormField>
        <FormField label="Period" required error={errors.period}>
          <input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className={inputCls(errors.period)} placeholder="2016 – 2020" />
        </FormField>
        <FormField label="GPA">
          <input value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} className={inputCls()} placeholder="3.9 / 4.0" />
        </FormField>
        <FormField label="Color">
          <div className="flex gap-2">
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" />
            <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} />
          </div>
        </FormField>
      </div>
      <FormField label="Description">
        <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls() + " resize-none"} />
      </FormField>
      <FormField label="Highlights" hint="Press Enter to add">
        <input value={hlInput} onChange={(e) => setHlInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addHl(); } }} className={inputCls()} placeholder="Dean's List…" />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {highlights.map((h) => (
            <span key={h} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-500/10 text-indigo-400">
              {h}<button type="button" onClick={() => setHighlights(highlights.filter((x) => x !== h))}>×</button>
            </span>
          ))}
        </div>
      </FormField>
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Order"><input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls()} /></FormField>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="eduActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" />
          <label htmlFor="eduActive" className="text-slate-400 text-sm">Active</label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">
          {loading ? "Saving..." : initial ? "Update" : "Add Education"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default EducationForm;
