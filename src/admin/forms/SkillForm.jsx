import { useState, useEffect } from "react";
import FormField, { inputCls, selectCls } from "../components/FormField";

const CATEGORIES = ["frontend", "backend", "database", "devops", "other"];

const SkillForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    name: "", level: 80, category: "frontend", icon: "SiReact", color: "#6366f1", order: 0, isActive: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ name: initial.name || "", level: initial.level || 80, category: initial.category || "frontend", icon: initial.icon || "SiReact", color: initial.color || "#6366f1", order: initial.order || 0, isActive: initial.isActive ?? true });
  }, [initial]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (form.level < 0 || form.level > 100) e.level = "Level must be 0–100";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const f = (key) => ({ value: form[key], onChange: (ev) => setForm({ ...form, [key]: ev.target.value }) });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Skill Name" required error={errors.name}>
          <input {...f("name")} className={inputCls(errors.name)} placeholder="React.js" />
        </FormField>
        <FormField label="Category" required>
          <select {...f("category")} className={selectCls()}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FormField>
        <FormField label="Level (%)" required error={errors.level}>
          <input type="number" min={0} max={100} {...f("level")} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} className={inputCls(errors.level)} />
        </FormField>
        <FormField label="Icon Key" hint="e.g. SiReact, SiNodedotjs">
          <input {...f("icon")} className={inputCls()} placeholder="SiReact" />
        </FormField>
        <FormField label="Color">
          <div className="flex gap-2">
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" />
            <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} />
          </div>
        </FormField>
        <FormField label="Display Order">
          <input type="number" {...f("order")} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls()} />
        </FormField>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" />
        <label htmlFor="isActive" className="text-slate-400 text-sm">Active</label>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">
          {loading ? "Saving..." : initial ? "Update Skill" : "Add Skill"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
