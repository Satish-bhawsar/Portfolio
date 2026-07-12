import { useState, useEffect } from "react";
import FormField, { inputCls, selectCls } from "../components/FormField";

const STATUSES = ["Live", "Open Source", "WIP", "Archived"];

const ProjectForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    title: "", shortTitle: "", category: "", description: "",
    longDescription: "", color: "#6366f1", gradient: "from-indigo-500/20 to-purple-500/10",
    githubUrl: "", liveUrl: "", year: "", status: "Live",
    order: 0, isActive: true,
  });
  const [techInput, setTechInput] = useState("");
  const [tech, setTech] = useState([]);
  const [highlightsInput, setHighlightsInput] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "", shortTitle: initial.shortTitle || "",
        category: initial.category || "", description: initial.description || "",
        longDescription: initial.longDescription || "", color: initial.color || "#6366f1",
        gradient: initial.gradient || "from-indigo-500/20 to-purple-500/10",
        githubUrl: initial.githubUrl || "", liveUrl: initial.liveUrl || "",
        year: initial.year || "", status: initial.status || "Live",
        order: initial.order || 0, isActive: initial.isActive ?? true,
      });
      setTech(initial.tech || []);
      setHighlights(initial.highlights || []);
      setTags(initial.tags || []);
    }
  }, [initial]);

  const addTag = (val, list, setList, setInput) => {
    const trimmed = val.trim();
    if (trimmed && !list.includes(trimmed)) setList([...list, trimmed]);
    setInput("");
  };
  const removeTag = (val, list, setList) => setList(list.filter((t) => t !== val));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, tech, highlights, tags });
  };

  const TagList = ({ items, onRemove, color = "indigo" }) => (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {items.map((t) => (
        <span key={t} className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-${color}-500/10 text-${color}-400`}>
          {t}
          <button type="button" onClick={() => onRemove(t)} className="hover:text-white ml-0.5">×</button>
        </span>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Title" required error={errors.title}>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls(errors.title)} placeholder="NexaFlow — SaaS Platform" />
        </FormField>
        <FormField label="Short Title">
          <input value={form.shortTitle} onChange={(e) => setForm({ ...form, shortTitle: e.target.value })} className={inputCls()} placeholder="NexaFlow" />
        </FormField>
        <FormField label="Category">
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls()} placeholder="SaaS, E-Commerce…" />
        </FormField>
        <FormField label="Status">
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={selectCls()}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>
        <FormField label="Year">
          <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className={inputCls()} placeholder="2024" />
        </FormField>
        <FormField label="Color">
          <div className="flex gap-2">
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" />
            <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} />
          </div>
        </FormField>
        <FormField label="GitHub URL">
          <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} className={inputCls()} placeholder="https://github.com/…" />
        </FormField>
        <FormField label="Live URL">
          <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} className={inputCls()} placeholder="https://…" />
        </FormField>
      </div>

      <FormField label="Description" required error={errors.description}>
        <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls(errors.description) + " resize-none"} />
      </FormField>
      <FormField label="Long Description">
        <textarea rows={3} value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} className={inputCls() + " resize-none"} />
      </FormField>

      {/* Tech Stack */}
      <FormField label="Tech Stack" hint="Press Enter to add">
        <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(techInput, tech, setTech, setTechInput); } }}
          className={inputCls()} placeholder="React, Node.js…" />
        <TagList items={tech} onRemove={(t) => removeTag(t, tech, setTech)} />
      </FormField>

      {/* Highlights */}
      <FormField label="Highlights" hint="Press Enter to add">
        <input value={highlightsInput} onChange={(e) => setHighlightsInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(highlightsInput, highlights, setHighlights, setHighlightsInput); } }}
          className={inputCls()} placeholder="10K+ users…" />
        <TagList items={highlights} onRemove={(t) => removeTag(t, highlights, setHighlights)} color="green" />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Display Order">
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputCls()} />
        </FormField>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="projActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" />
          <label htmlFor="projActive" className="text-slate-400 text-sm">Active</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">
          {loading ? "Saving..." : initial ? "Update Project" : "Add Project"}
        </button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default ProjectForm;
