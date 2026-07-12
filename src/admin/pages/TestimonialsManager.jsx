import { testimonialsHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import TestimonialForm from "../forms/TestimonialForm";

const columns = [
  { key: "name", label: "Person", render: (v, row) => (<div><p className="text-white font-medium text-sm">{v}</p><p className="text-slate-500 text-xs">{row.role} @ {row.company}</p></div>) },
  { key: "rating", label: "Rating", render: (v) => <span className="text-amber-400 text-sm">{"★".repeat(v)}</span> },
  { key: "featured", label: "Featured", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? "bg-indigo-500/10 text-indigo-400" : "bg-white/5 text-slate-500"}`}>{v ? "Yes" : "No"}</span> },
  { key: "isActive", label: "Status", render: (v) => <StatusBadge active={v} /> },
];

const TestimonialsManager = () => (
  <CrudPage
    title="Testimonials"
    description="Manage client testimonials and reviews"
    columns={columns}
    useList={testimonialsHooks.useList}
    useCreate={testimonialsHooks.useCreate}
    useUpdate={testimonialsHooks.useUpdate}
    useDelete={testimonialsHooks.useDelete}
    useToggle={testimonialsHooks.useToggle}
    FormComponent={TestimonialForm}
  />
);

export default TestimonialsManager;
