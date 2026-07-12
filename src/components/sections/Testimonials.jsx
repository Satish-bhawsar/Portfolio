import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { testimonials } from "../../data/testimonials";
import SectionHeader from "../ui/SectionHeader";
import { fadeInUp, viewportConfig } from "../../utils/animations";

const StarRating = ({ rating, color }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <HiStar
        key={i}
        className="w-3.5 h-3.5"
        style={{ color: i < rating ? "#f59e0b" : "#334155" }}
      />
    ))}
  </div>
);

const Avatar = ({ initials, color }) => (
  <div
    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
    style={{ backgroundColor: `${color}25`, color }}
  >
    {initials}
  </div>
);

const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.97 }}
    transition={{ duration: 0.4 }}
    className={`glass border rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300 ${
      isActive ? "border-indigo-500/20" : "border-white/[0.04]"
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar initials={testimonial.initials} color={testimonial.color} />
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-slate-500 text-xs">{testimonial.role}</div>
          <div className="text-slate-600 text-xs">{testimonial.company}</div>
        </div>
      </div>
      <StarRating rating={testimonial.rating} />
    </div>
    <p className="text-slate-400 text-sm leading-relaxed flex-1">
      "{testimonial.content}"
    </p>
  </motion.div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const total = testimonials.length;

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
    return () => clearInterval(id);
  }, [autoPlay, total]);

  const prev = () => {
    setAutoPlay(false);
    setCurrent((c) => (c - 1 + total) % total);
  };

  const next = () => {
    setAutoPlay(false);
    setCurrent((c) => (c + 1) % total);
  };

  // Show 3 cards centered around current
  const getVisible = () => {
    return [-1, 0, 1].map((offset) => ({
      t: testimonials[(current + offset + total) % total],
      isActive: offset === 0,
    }));
  };

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="container-width">
        <SectionHeader
          badge="Testimonials"
          title="What clients"
          highlight="say"
          description="Feedback from people I've had the privilege of working with."
        />

        {/* Desktop: 3-card layout */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {getVisible().map(({ t, isActive }, i) => (
              <TestimonialCard key={t.id} testimonial={t} isActive={isActive} />
            ))}
          </div>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={testimonials[current]} isActive={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
          >
            <HiChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setAutoPlay(false); setCurrent(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-6 h-2 bg-indigo-500" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
          >
            <HiChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust row */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 text-xs uppercase tracking-widest mb-4">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {["TechVision Labs", "ShopSphere", "Nexus Agency", "TaskNest", "StartupForge"].map(
              (name) => (
                <span
                  key={name}
                  className="text-slate-700 text-sm font-medium hover:text-slate-500 transition-colors"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
