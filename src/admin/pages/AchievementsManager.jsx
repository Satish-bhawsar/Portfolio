import { achievementsHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import AchievementForm from "../forms/AchievementForm";

const columns = [
  { key: "title", label: "Achievement", render: (v, row) => (<div><p className="text-white font-medium text-sm">{v}</p><p className="text-slate-500 text-xs">{row.platform}</p></div>) },
  { key: "metric", label: "Metric", render: (v) => <span className="text-indigo-400 font-semibold text-sm">{v}</span> },
  { key: "year", label: "Year", render: (v) => <span className="text-slate-500 text-xs">{v}</span> },
  { key: "isActive", label: "Status", render: (v) => <StatusBadge active={v} /> },
];

const AchievementsManager = () => (
  <CrudPage
    title="Achievements"
    description="Manage your awards, recognitions and milestones"
    columns={columns}
    useList={achievementsHooks.useList}
    useCreate={achievementsHooks.useCreate}
    useUpdate={achievementsHooks.useUpdate}
    useDelete={achievementsHooks.useDelete}
    useToggle={achievementsHooks.useToggle}
    FormComponent={AchievementForm}
  />
);

export default AchievementsManager;
