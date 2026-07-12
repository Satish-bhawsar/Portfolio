import { motion } from "framer-motion";
import {
  HiCodeBracket,
  HiComputerDesktop,
  HiServer,
  HiCircleStack,
  HiShieldCheck,
  HiCloudArrowUp,
} from "react-icons/hi2";
import { services } from "../../data/services";
import SectionHeader from "../ui/SectionHeader";
import { staggerContainer, scaleIn, viewportConfig, fadeInUp } from "../../utils/animations";

const iconMap = {
  HiCodeBracket,
  HiComputerDesktop,
  HiServer,
  HiCircleStack,
  HiShieldCheck,
  HiCloudArrowUp,
};
const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || HiCodeBracket;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, borderColor: `${service.color}30` }}
      transition={{ duration: 0.3 }}
      className="relative glass border border-white/[0.06] rounded-2xl p-6 overflow-hidden group flex flex-col"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Badge */}
      {service.badge && (
        <div
          className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: `${service.color}25`, color: service.color }}
        >
          {service.badge}
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
          style={{ backgroundColor: `${service.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: service.color }} />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-lg mb-3">{service.title}</h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: service.color }}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding relative">
      <div className="container-width">
        <SectionHeader
          badge="Services"
          title="What I can"
          highlight="do for you"
          description="From MVP to enterprise-scale, I offer end-to-end development services tailored to your needs and goals."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mt-14"
        >
          <div className="glass border border-white/[0.06] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-white text-xl font-bold mb-3">
              Have a project in mind?
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              I'm currently accepting new clients. Let's discuss your project and see
              if we're a good fit.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-indigo-500/20"
            >
              Start a Conversation →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
