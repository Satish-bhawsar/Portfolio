import { projectsHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import ProjectForm from "../forms/ProjectForm";

const columns = [
  {
    key: "title",
    label: "Project",
    render: (v, row) => (
      <div>
        <p className="text-white font-medium text-sm">{row.shortTitle || v}</p>
        <p className="text-slate-500 text-xs truncate max-w-[200px]">{row.category}</p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        v === "Live" ? "bg-green-500/10 text-green-400" :
        v === "Open Source" ? "bg-indigo-500/10 text-indigo-400" :
        "bg-amber-500/10 text-amber-400"
      }`}>{v}</span>
    ),
  },
  { key: "year", label: "Year", render: (v) => <span className="text-slate-500 text-xs">{v}</span> },
  {
    key: "tech",
    label: "Tech",
    render: (v) => (
      <div className="flex flex-wrap gap-1">
        {(v || []).slice(0, 3).map((t) => (
          <span key={t} className="px-1.5 py-0.5 rounded text-xs bg-white/5 text-slate-400">{t}</span>
        ))}
        {(v || []).length > 3 && <span className="text-slate-600 text-xs">+{v.length - 3}</span>}
      </div>
    ),
  },
  { key: "isActive", label: "Visible", render: (v) => <StatusBadge active={v} /> },
];

const ProjectsManager = () => (
  <CrudPage
    title="Projects"
    description="Manage your portfolio projects"
    columns={columns}
    useList={projectsHooks.useList}
    useCreate={projectsHooks.useCreate}
    useUpdate={projectsHooks.useUpdate}
    useDelete={projectsHooks.useDelete}
    useToggle={projectsHooks.useToggle}
    FormComponent={ProjectForm}
    modalSize="lg"
  />
);

export default ProjectsManager;
