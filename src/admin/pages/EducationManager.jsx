import { educationHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import EducationForm from "../forms/EducationForm";

const columns = [
  { key: "degree", label: "Degree", render: (v, row) => (<div><p className="text-white font-medium text-sm">{v}</p><p className="text-slate-500 text-xs">{row.institution}</p></div>) },
  { key: "period", label: "Period", render: (v) => <span className="text-slate-400 text-xs">{v}</span> },
  { key: "gpa", label: "GPA", render: (v) => <span className="text-slate-500 text-xs">{v || "—"}</span> },
  { key: "isActive", label: "Status", render: (v) => <StatusBadge active={v} /> },
];

const EducationManager = () => (
  <CrudPage
    title="Education"
    description="Manage your educational background"
    columns={columns}
    useList={educationHooks.useList}
    useCreate={educationHooks.useCreate}
    useUpdate={educationHooks.useUpdate}
    useDelete={educationHooks.useDelete}
    useToggle={educationHooks.useToggle}
    FormComponent={EducationForm}
    modalSize="lg"
  />
);

export default EducationManager;
