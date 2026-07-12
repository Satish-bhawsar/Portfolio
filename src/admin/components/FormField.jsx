const FormField = ({ label, error, required, children, hint }) => (
  <div>
    {label && (
      <label className="block text-slate-400 text-xs font-medium mb-2">
        {label} {required && <span className="text-indigo-400">*</span>}
      </label>
    )}
    {children}
    {hint && !error && <p className="text-slate-600 text-xs mt-1">{hint}</p>}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export const inputCls = (error) =>
  `w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-white placeholder-slate-600 text-sm focus:outline-none focus:bg-white/[0.05] transition-all ${
    error ? "border-red-500/40" : "border-white/[0.08] focus:border-indigo-500/40"
  }`;

export const selectCls = (error) =>
  `w-full px-4 py-2.5 rounded-xl bg-[#0f0f1a] border text-white text-sm focus:outline-none transition-all ${
    error ? "border-red-500/40" : "border-white/[0.08] focus:border-indigo-500/40"
  }`;

export default FormField;
