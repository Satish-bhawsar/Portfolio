import { blogsHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import BlogForm from "../forms/BlogForm";

const columns = [
  { key: "title", label: "Post", render: (v, row) => (<div><p className="text-white font-medium text-sm">{v}</p><p className="text-slate-500 text-xs">{row.category} · {row.readTime}</p></div>) },
  { key: "status", label: "Status", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === "published" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>{v}</span> },
  { key: "tags", label: "Tags", render: (v) => <div className="flex flex-wrap gap-1">{(v || []).slice(0, 2).map((t) => <span key={t} className="px-1.5 py-0.5 rounded text-xs bg-white/5 text-slate-400">{t}</span>)}</div> },
  { key: "isActive", label: "Visible", render: (v) => <StatusBadge active={v} /> },
];

const BlogsManager = () => (
  <CrudPage
    title="Blogs"
    description="Manage your blog posts and articles"
    columns={columns}
    useList={blogsHooks.useList}
    useCreate={blogsHooks.useCreate}
    useUpdate={blogsHooks.useUpdate}
    useDelete={blogsHooks.useDelete}
    useToggle={blogsHooks.useToggle}
    FormComponent={BlogForm}
    modalSize="xl"
  />
);

export default BlogsManager;
