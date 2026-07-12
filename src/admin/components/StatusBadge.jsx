const StatusBadge = ({ active, trueLabel = "Active", falseLabel = "Inactive" }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
      active
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-slate-500/10 text-slate-500 border-slate-500/20"
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-400" : "bg-slate-500"}`} />
    {active ? trueLabel : falseLabel}
  </span>
);

export default StatusBadge;
