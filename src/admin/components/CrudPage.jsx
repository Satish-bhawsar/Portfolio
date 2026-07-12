import { useState } from "react";
import { motion } from "framer-motion";
import { HiPlus, HiPencil, HiTrash, HiRefresh } from "react-icons/hi";
import AdminTable from "./AdminTable";
import AdminModal from "./AdminModal";
import SearchBar from "./SearchBar";
import StatusBadge from "./StatusBadge";
import PageHeader from "./PageHeader";
import { confirmDelete } from "./ConfirmDialog";
import { fadeInUp } from "../../utils/animations";

/**
 * Generic CrudPage component.
 * Props:
 *   title, description            — page header
 *   columns                       — table column definitions
 *   useList, useCreate, useUpdate, useDelete, useToggle  — query hooks
 *   FormComponent                 — JSX form rendered in modal
 *   searchable, filterable        — UI options
 *   modalSize                     — AdminModal size
 *   params                        — extra query params
 */
const CrudPage = ({
  title,
  description,
  columns,
  useList,
  useCreate,
  useUpdate,
  useDelete,
  useToggle,
  FormComponent,
  searchable = true,
  modalSize = "md",
  extraParams = {},
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = creating

  const { data, isLoading, refetch } = useList({ search, page, limit: 20, ...extraParams });
  const { mutate: create, isPending: creating } = useCreate();
  const { mutate: update, isPending: updatingItem } = useUpdate();
  const { mutate: remove } = useDelete();
  const { mutate: toggle } = useToggle ? useToggle() : { mutate: undefined };

  const items = data?.data || [];
  const pagination = data?.pagination;

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setModalOpen(true); };
  const closeModal = () => { setEditing(null); setModalOpen(false); };

  const handleSubmit = (formData, isFormData = false) => {
    if (editing) {
      update({ id: editing._id, data: formData, isFormData }, { onSuccess: closeModal });
    } else {
      create({ data: formData, isFormData }, { onSuccess: closeModal });
    }
  };

  const handleDelete = async (item) => {
    const ok = await confirmDelete(item.title || item.name || item.role || "this item");
    if (ok) remove(item._id);
  };

  const handleToggle = (item) => { if (toggle) toggle(item._id); };

  // Append action column
  const tableColumns = [
    ...columns,
    {
      key: "actions",
      label: "Actions",
      width: "120px",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => openEdit(row)}
            className="w-7 h-7 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center text-indigo-400 transition-colors"
            title="Edit"
          >
            <HiPencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors"
            title="Delete"
          >
            <HiTrash className="w-3.5 h-3.5" />
          </button>
          {useToggle && (
            <button
              onClick={() => handleToggle(row)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              title="Toggle status"
            >
              <div className={`w-2 h-2 rounded-full ${row.isActive ? "bg-green-400" : "bg-slate-500"}`} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        action={
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
          >
            <HiPlus className="w-4 h-4" />
            Add New
          </button>
        }
      />

      {/* Toolbar */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-3 mb-5">
        {searchable && (
          <div className="flex-1 max-w-sm">
            <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
          </div>
        )}
        <button
          onClick={() => refetch()}
          className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          title="Refresh"
        >
          <HiRefresh className="w-4 h-4" />
        </button>
        {pagination && (
          <span className="text-slate-500 text-xs self-center">
            {pagination.total} total
          </span>
        )}
      </motion.div>

      <AdminTable columns={tableColumns} data={items} loading={isLoading} />

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {Array.from({ length: pagination.pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "glass border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      <AdminModal
        open={modalOpen}
        onClose={closeModal}
        title={editing ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}
        size={modalSize}
      >
        <FormComponent
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={creating || updatingItem}
        />
      </AdminModal>
    </div>
  );
};

export default CrudPage;
