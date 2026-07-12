import { certificatesHooks } from "../../hooks/usePortfolioData";
import CrudPage from "../components/CrudPage";
import StatusBadge from "../components/StatusBadge";
import CertificateForm from "../forms/CertificateForm";

const columns = [
  { key: "title", label: "Certificate", render: (v, row) => (<div><p className="text-white font-medium text-sm">{v}</p><p className="text-slate-500 text-xs">{row.issuer}</p></div>) },
  { key: "issueDate", label: "Issued", render: (v) => <span className="text-slate-400 text-xs">{v}</span> },
  { key: "expiryDate", label: "Expires", render: (v) => <span className="text-slate-500 text-xs">{v || "No Expiry"}</span> },
  { key: "isActive", label: "Status", render: (v) => <StatusBadge active={v} /> },
];

const CertificatesManager = () => (
  <CrudPage
    title="Certificates"
    description="Manage your certifications and credentials"
    columns={columns}
    useList={certificatesHooks.useList}
    useCreate={certificatesHooks.useCreate}
    useUpdate={certificatesHooks.useUpdate}
    useDelete={certificatesHooks.useDelete}
    useToggle={certificatesHooks.useToggle}
    FormComponent={CertificateForm}
    modalSize="lg"
  />
);

export default CertificatesManager;
