import { useScrollProgress } from "../../hooks/useScrollProgress";

const ScrollIndicator = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;
