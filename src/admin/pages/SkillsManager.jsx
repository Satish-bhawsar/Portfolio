import { skillsHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import SkillForm from "../forms/SkillForm";

const columns = [
  { key: "name", label: "Skill" },
  { key: "category", label: "Category", render: (v) => <span className="capitalize text-indigo-400 text-xs">{v}</span> },
  { key: "level", label: "Level", render: (v) => (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${v}%` }} />
      </div>
      <span className="text-slate-400 text-xs">{v}%</span>
    </div>
  )},
  { key: "order", label: "Order", render: (v) => <span className="text-slate-500 text-xs">{v}</span> },
  { key: "isActive", label: "Status", render: (v) => <StatusBadge active={v} /> },
];

const SkillsManager = () => (
  <CrudPage
    title="Skills"
    description="Manage your technical skills and proficiency levels"
    columns={columns}
    useList={skillsHooks.useList}
    useCreate={skillsHooks.useCreate}
    useUpdate={skillsHooks.useUpdate}
    useDelete={skillsHooks.useDelete}
    useToggle={skillsHooks.useToggle}
    FormComponent={SkillForm}
  />
);

export default SkillsManager;
