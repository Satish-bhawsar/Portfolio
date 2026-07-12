import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiTrash, HiRefresh, HiEye } from "react-icons/hi";
import { useMessages } from "../../hooks/usePortfolioData";
import { adminAPI } from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";
import { confirmDelete } from "../components/ConfirmDialog";
import AdminModal from "../components/AdminModal";
import SearchBar from "../components/SearchBar";
import PageHeader from "../components/PageHeader";
import { KEYS } from "../../hooks/usePortfolioData";
import toast from "react-hot-toast";
import { fadeInUp } from "../../utils/animations";

const STATUS_COLORS = {
  unread: "bg-red-500/10 text-red-400",
  read: "bg-slate-500/10 text-slate-400",
  replied: "bg-green-500/10 text-green-400",
  archived: "bg-white/5 text-slate-600",
};

const MessagesManager = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useMessages({ search, status: statusFilter, page, limit: 20 });
  const messages = data?.data || [];
  const pagination = data?.pagination;

  const handleView = async (msg) => {
    setSelected(msg);
    if (msg.status === "unread") {
      await adminAPI.updateMessageStatus(msg._id, "read");
      qc.invalidateQueries({ queryKey: [KEYS.messages] });
      qc.invalidateQueries({ queryKey: [KEYS.stats] });
    }
  };

  const handleStatusChange = async (id, status) => {
    await adminAPI.updateMessageStatus(id, status);
    qc.invalidateQueries({ queryKey: [KEYS.messages] });
    qc.invalidateQueries({ queryKey: [KEYS.stats] });
    toast.success(`Marked as ${status}`);
  };

  const handleDelete = async (msg) => {
    const ok = await confirmDelete(msg.name);
    if (!ok) return;
    await adminAPI.deleteMessage(msg._id);
    qc.invalidateQueries({ queryKey: [KEYS.messages] });
    toast.success("Message deleted");
  };

  return (
    <div>
      <PageHeader title="Contact Messages" description="View and manage messages from your portfolio contact form" />

      {/* Toolbar */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 max-w-sm">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 text-sm focus:outline-none focus:border-indigo-500/40">
          <option value="">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
        <button onClick={() => refetch()} className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white">
          <HiRefresh className="w-4 h-4" />
        </button>
        {pagination && <span className="text-slate-500 text-xs self-center">{pagination.total} total</span>}
      </motion.div>

      {/* Table */}
      {isLoading ? (
        <div className="glass border border-white/[0.06] rounded-2xl p-8 text-center">
          <svg className="w-6 h-6 animate-spin text-indigo-400 mx-auto" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg>
        </div>
      ) : !messages.length ? (
        <div className="glass border border-white/[0.06] rounded-2xl p-12 text-center text-slate-500 text-sm">No messages found</div>
      ) : (
        <div className="glass border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium">From</th>
                  <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium hidden sm:table-cell">Subject</th>
                  <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium hidden md:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-slate-500 text-xs uppercase tracking-wider font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className={`border-b border-white/[0.04] hover:bg-white/[0.02] ${msg.status === "unread" ? "bg-indigo-500/[0.03]" : ""}`}>
                    <td className="px-4 py-3">
                      <p className={`font-medium text-sm ${msg.status === "unread" ? "text-white" : "text-slate-300"}`}>{msg.name}</p>
                      <p className="text-slate-500 text-xs">{msg.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-400 hidden sm:table-cell truncate max-w-[180px]">{msg.subject || "—"}</td>
                    <td className="px-4 py-3">
                      <select value={msg.status} onChange={(e) => handleStatusChange(msg._id, e.target.value)} className={`px-2 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[msg.status]} bg-transparent`}>
                        <option value="unread">unread</option>
                        <option value="read">read</option>
                        <option value="replied">replied</option>
                        <option value="archived">archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs hidden md:table-cell">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleView(msg)} className="w-7 h-7 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center text-indigo-400" title="View">
                          <HiEye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(msg)} className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400" title="Delete">
                          <HiTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {pagination?.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {Array.from({ length: pagination.pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${page === i + 1 ? "bg-indigo-600 text-white" : "glass border border-white/10 text-slate-400 hover:text-white"}`}>{i + 1}</button>
          ))}
        </div>
      )}

      {/* View Modal */}
      <AdminModal open={!!selected} onClose={() => setSelected(null)} title="Message Detail">
        {selected && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><p className="text-slate-500 text-xs mb-1">From</p><p className="text-white font-medium">{selected.name}</p></div>
              <div><p className="text-slate-500 text-xs mb-1">Email</p><a href={`mailto:${selected.email}`} className="text-indigo-400 hover:text-indigo-300">{selected.email}</a></div>
              {selected.subject && <div className="sm:col-span-2"><p className="text-slate-500 text-xs mb-1">Subject</p><p className="text-white">{selected.subject}</p></div>}
              <div><p className="text-slate-500 text-xs mb-1">Date</p><p className="text-slate-300">{new Date(selected.createdAt).toLocaleString()}</p></div>
              <div><p className="text-slate-500 text-xs mb-1">Status</p><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[selected.status]}`}>{selected.status}</span></div>
            </div>
            <div><p className="text-slate-500 text-xs mb-2">Message</p><div className="glass border border-white/[0.06] rounded-xl p-4 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</div></div>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || "Your message"}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium">
              <HiMail className="w-4 h-4" /> Reply via Email
            </a>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default MessagesManager;
