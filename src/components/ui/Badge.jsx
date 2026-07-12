const Badge = ({ children, color, variant = "default", size = "sm" }) => {
  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  const base = `inline-flex items-center gap-1.5 rounded-full font-medium ${sizes[size]}`;

  if (variant === "outline") {
    return (
      <span
        className={`${base} border`}
        style={{
          color: color || "#6366f1",
          borderColor: `${color || "#6366f1"}40`,
          backgroundColor: `${color || "#6366f1"}10`,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`${base}`}
      style={{
        color: color || "#6366f1",
        backgroundColor: `${color || "#6366f1"}20`,
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
