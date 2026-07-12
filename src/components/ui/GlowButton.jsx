import { motion } from "framer-motion";

const GlowButton = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  target,
  rel,
  className = "",
  icon,
  disabled = false,
}) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40",
    secondary:
      "glass border border-white/10 text-white hover:border-indigo-500/40 hover:bg-white/5",
    outline:
      "border border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5",
  };

  const cls = `relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer select-none ${sizes[size]} ${variants[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={cls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
};

export default GlowButton;
