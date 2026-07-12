import { HiSearch, HiX } from "react-icons/hi";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="relative">
    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/40 transition-all"
    />
    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
      >
        <HiX className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
);

export default SearchBar;
