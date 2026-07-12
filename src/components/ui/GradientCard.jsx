import { motion } from "framer-motion";

const GradientCard = ({ children, className = "", glow = false, hover = true, gradient }) => {
  return (
    <motion.div
      className={`relative rounded-2xl glass border border-white/[0.06] overflow-hidden ${hover ? "card-hover" : ""} ${glow ? "glow-purple" : ""} ${className}`}
      whileHover={hover ? { y: -4, borderColor: "rgba(99,102,241,0.3)" } : {}}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {gradient && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 pointer-events-none`}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GradientCard;
