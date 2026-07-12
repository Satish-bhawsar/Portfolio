import { useState, useEffect } from "react";
import FormField, { inputCls, selectCls } from "../components/FormField";

const BlogForm = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "General", readTime: "5 min read", status: "draft", color: "#6366f1", order: 0, isActive: true });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) { setForm({ title: initial.title || "", slug: initial.slug || "", excerpt: initial.excerpt || "", content: initial.content || "", category: initial.category || "General", readTime: initial.readTime || "5 min read", status: initial.status || "draft", color: initial.color || "#6366f1", order: initial.order || 0, isActive: initial.isActive ?? true }); setTags(initial.tags || []); }
  }, [initial]);

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title required";
    if (!form.slug.trim()) e.slug = "Slug required";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt required";
    if (!form.content.trim()) e.content = "Content required";
    setErrors(e); return !Object.keys(e).length;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (!validate()) return; onSubmit({ ...form, tags }); };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField label="Title" required error={errors.title}>
          <input value={form.title} onChange={(e) => { const t = e.target.value; setForm({ ...form, title: t, slug: autoSlug(t) }); }} className={inputCls(errors.title)} placeholder="My Blog Post" />
        </FormField>
        <FormField label="Slug" required error={errors.slug}>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls(errors.slug)} placeholder="my-blog-post" />
        </FormField>
        <FormField label="Category"><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls()} placeholder="Tutorial, Tips…" /></FormField>
        <FormField label="Read Time"><input value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} className={inputCls()} placeholder="5 min read" /></FormField>
        <FormField label="Status">
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={selectCls()}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FormField>
        <FormField label="Color"><div className="flex gap-2"><input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/10" /><input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className={inputCls() + " flex-1"} /></div></FormField>
      </div>
      <FormField label="Excerpt" required error={errors.excerpt}><textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={inputCls(errors.excerpt) + " resize-none"} placeholder="Short description…" /></FormField>
      <FormField label="Content (Markdown)" required error={errors.content}><textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputCls(errors.content) + " resize-none font-mono text-xs"} /></FormField>
      <FormField label="Tags" hint="Press Enter to add"><input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); const t = tagInput.trim(); if (t && !tags.includes(t)) setTags([...tags, t]); setTagInput(""); } }} className={inputCls()} /><div className="flex flex-wrap gap-1.5 mt-2">{tags.map((t) => <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-indigo-500/10 text-indigo-400">{t}<button type="button" onClick={() => setTags(tags.filter((x) => x !== t))}>×</button></span>)}</div></FormField>
      <div className="flex items-center gap-2"><input type="checkbox" id="blogActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded" /><label htmlFor="blogActive" className="text-slate-400 text-sm">Active</label></div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm disabled:opacity-60">{loading ? "Saving..." : initial ? "Update" : "Add Blog Post"}</button>
        <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl glass border border-white/10 text-slate-400 text-sm hover:text-white transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default BlogForm;
