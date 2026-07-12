import { experienceHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import ExperienceForm from "../forms/ExperienceForm";

const columns = [
  {
    key: "role",
    label: "Position",
    render: (v, row) => (
      <div>
        <p className="text-white font-medium text-sm">{v}</p>
        <p className="text-slate-500 text-xs">{row.company}</p>
      </div>
    ),
  },
  { key: "type", label: "Type", render: (v) => <span className="text-indigo-400 text-xs">{v}</span> },
  { key: "period", label: "Period", render: (v) => <span className="text-slate-400 text-xs">{v}</span> },
  { key: "duration", label: "Duration", render: (v) => <span className="text-slate-500 text-xs">{v}</span> },
  { key: "isActive", label: "Status", render: (v) => <StatusBadge active={v} /> },
];

const ExperienceManager = () => (
  <CrudPage
    title="Experience"
    description="Manage your work experience timeline"
    columns={columns}
    useList={experienceHooks.useList}
    useCreate={experienceHooks.useCreate}
    useUpdate={experienceHooks.useUpdate}
    useDelete={experienceHooks.useDelete}
    useToggle={experienceHooks.useToggle}
    FormComponent={ExperienceForm}
    modalSize="lg"
  />
);

export default ExperienceManager;
