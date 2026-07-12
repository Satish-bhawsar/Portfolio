const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial gradient top */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl" />
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-3xl" />
      {/* Middle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-cyan-600/3 blur-3xl" />
      {/* Bottom */}
      <div className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-3xl" />
    </div>
  );
};

export default BackgroundGrid;
