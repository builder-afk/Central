"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Box,
  Ruler,
  Globe,
  Wand2,
  Video,
  BarChart3,
  Play,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: Box,
    number: "01",
    title: "Immersive 3D Property Showcases",
    shortTitle: "3D Showcases",
    description:
      "Full property walkthrough with room-to-room navigation, interactive hotspots, and mobile-friendly web-based access. Let buyers experience a property before visiting.",
    highlights: ["Walkthroughs", "Hotspots", "Mobile-ready"],
    color: "#F26522",
    bgAccent: "rgba(242, 101, 34, 0.06)",
    borderAccent: "rgba(242, 101, 34, 0.15)",
    image: "/services/svc-3d-showcase.png",
    stats: [
      { value: "3x", label: "More engagement" },
      { value: "85%", label: "Buyer preference" },
    ],
  },
  {
    icon: Globe,
    number: "02",
    title: "360° Virtual Tours",
    shortTitle: "360° Tours",
    description:
      "Professional 360° photography stitched into guided, interactive tours. Perfect for ready-to-move apartments, villas, commercial spaces, and model homes.",
    highlights: ["360° Photos", "Guided Tours", "Navigation"],
    color: "#8b5cf6",
    bgAccent: "rgba(139, 92, 246, 0.06)",
    borderAccent: "rgba(139, 92, 246, 0.15)",
    image: "/services/svc-360-tour.png",
    stats: [
      { value: "360°", label: "Full coverage" },
      { value: "4K", label: "Resolution" },
    ],
  },
  {
    icon: Ruler,
    number: "03",
    title: "Interactive Floor Plans",
    shortTitle: "Floor Plans",
    description:
      "Replace static PDFs with clickable 3D floor plans — buyers tap a room to see dimensions, photos, and real-time details instantly.",
    highlights: ["Clickable Rooms", "Measurements", "Live Data"],
    color: "#06b6d4",
    bgAccent: "rgba(6, 182, 212, 0.06)",
    borderAccent: "rgba(6, 182, 212, 0.15)",
    image: "/services/svc-floor-plan.png",
    stats: [
      { value: "2x", label: "Faster decisions" },
      { value: "98%", label: "Accuracy" },
    ],
  },
  {
    icon: Wand2,
    number: "04",
    title: "Virtual Staging & AI Visualization",
    shortTitle: "AI Staging",
    description:
      "AI-powered transformations — empty rooms to furnished, construction sites to finished projects. Sell the vision, not just the current state.",
    highlights: ["AI-powered", "Virtual Staging", "Concept Renders"],
    color: "#ec4899",
    bgAccent: "rgba(236, 72, 153, 0.06)",
    borderAccent: "rgba(236, 72, 153, 0.15)",
    image: "/services/svc-ai-staging.png",
    stats: [
      { value: "40%", label: "Faster sales" },
      { value: "AI", label: "Powered" },
    ],
  },
  {
    icon: Video,
    number: "05",
    title: "Drone & Cinematic Showcases",
    shortTitle: "Drone & Video",
    description:
      "Professional drone footage, aerial mapping, and cinematic property videos with motion graphics — showcase the full picture from every angle.",
    highlights: ["Drone Shots", "Aerial Maps", "Cinematic Edits"],
    color: "#10b981",
    bgAccent: "rgba(16, 185, 129, 0.06)",
    borderAccent: "rgba(16, 185, 129, 0.15)",
    image: "/services/svc-drone.png",
    stats: [
      { value: "4K", label: "Ultra HD" },
      { value: "120", label: "FPS Capture" },
    ],
  },
  {
    icon: BarChart3,
    number: "06",
    title: "Property Microsites",
    shortTitle: "Microsites",
    description:
      "Dedicated branded websites for each project — 3D showcase, gallery, brochure, location map, and lead forms in one polished URL.",
    highlights: ["Custom URL", "Lead Capture", "Branding"],
    color: "#f59e0b",
    bgAccent: "rgba(245, 158, 11, 0.06)",
    borderAccent: "rgba(245, 158, 11, 0.15)",
    image: "/services/svc-microsite.png",
    stats: [
      { value: "5x", label: "More leads" },
      { value: "1", label: "URL" },
    ],
  },
];

/* ─── Tab Button ─── */
function TabButton({
  service,
  index,
  isActive,
  onClick,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = service.icon;
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left transition-all duration-400
        ${isActive
          ? "bg-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.1)]"
          : "hover:bg-white/60"
        }
      `}
    >
      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
          style={{ background: service.color }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
        style={{
          background: isActive ? service.bgAccent : "transparent",
          border: `1px solid ${isActive ? service.borderAccent : "transparent"}`,
        }}
      >
        <Icon
          className="w-4 h-4 transition-colors duration-300"
          style={{ color: isActive ? service.color : "#aaa" }}
        />
      </div>

      <div className="min-w-0">
        <span
          className={`text-[13px] font-semibold block truncate transition-colors duration-300 ${
            isActive ? "text-[#171717]" : "text-[#888]"
          }`}
        >
          {service.shortTitle}
        </span>
        <span
          className="text-[10px] font-mono uppercase tracking-wider transition-colors duration-300"
          style={{ color: isActive ? service.color : "#ccc" }}
        >
          {service.number}
        </span>
      </div>
    </button>
  );
}

/* ─── Showcase Panel ─── */
function ShowcasePanel({ service }: { service: (typeof services)[0] }) {
  const Icon = service.icon;

  return (
    <motion.div
      key={service.number}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
    >
      {/* Image Side */}
      <div className="relative group">
        <div
          className="relative aspect-[4/3] rounded-[20px] overflow-hidden border"
          style={{ borderColor: service.borderAccent }}
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Play className="w-6 h-6 text-white ml-1" />
            </motion.div>
          </div>

          {/* Number badge */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[12px] font-mono font-bold text-white backdrop-blur-md"
            style={{ background: `${service.color}cc` }}
          >
            SERVICE {service.number}
          </div>

          {/* Bottom stat strip */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center gap-6">
            {service.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[22px] font-bold text-white block leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] text-white/60 font-medium uppercase tracking-wide">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex flex-col justify-center py-2 lg:py-6">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: service.bgAccent,
              border: `1.5px solid ${service.borderAccent}`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: service.color }} />
          </motion.div>
          <motion.span
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-[11px] font-mono font-bold uppercase tracking-wider"
            style={{ color: service.color }}
          >
            {service.number}
          </motion.span>
        </div>

        <motion.h3
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[28px] sm:text-[32px] font-semibold text-[#171717] leading-tight tracking-[-0.02em] mb-4"
        >
          {service.title}
        </motion.h3>

        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-[15px] sm:text-[16px] text-[#555] leading-relaxed mb-6"
        >
          {service.description}
        </motion.p>

        {/* Highlight tags */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {service.highlights.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.05, duration: 0.3 }}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-300 hover:scale-105 cursor-default"
              style={{
                borderColor: service.borderAccent,
                background: service.bgAccent,
                color: service.color,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium text-white transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg group/btn"
            style={{ background: service.color }}
          >
            Learn more
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Card ─── */
function MobileServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative bg-white rounded-[16px] border overflow-hidden cursor-pointer transition-all duration-400"
      style={{
        borderColor: isExpanded ? service.borderAccent : "rgba(0,0,0,0.06)",
        boxShadow: isExpanded
          ? "0 8px 32px -8px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: service.color }}
        animate={{ scaleX: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 p-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: service.bgAccent,
            border: `1px solid ${service.borderAccent}`,
          }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: service.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] font-semibold text-[#171717] leading-tight truncate">
            {service.title}
          </h3>
          <span
            className="text-[10px] font-mono uppercase tracking-wider"
            style={{ color: service.color }}
          >
            {service.number}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-4 h-4 text-[#ccc]" />
        </motion.div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full aspect-[16/9] mx-5 mb-4 rounded-xl overflow-hidden" style={{ width: "calc(100% - 40px)" }}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 flex gap-4">
                {service.stats.map((stat, i) => (
                  <div key={i}>
                    <span className="text-[16px] font-bold text-white block leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[9px] text-white/60 uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="px-5 pb-5">
              <p className="text-[14px] text-[#555] leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium border"
                    style={{
                      borderColor: service.borderAccent,
                      background: service.bgAccent,
                      color: service.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[13px] font-semibold transition-colors"
                style={{ color: service.color }}
              >
                Learn more <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-rotate
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const activeService = services[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#faf5f0] pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-20 lg:pb-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <div className="text-[12px] font-mono uppercase tracking-widest border border-[#171717]/15 rounded-full px-4 py-1.5 text-[#171717] bg-white shadow-[0px_1px_1px_#00000005]">
            OUR SERVICES
          </div>
          <div className="flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-widest text-[#171717]/50">
            <Star className="w-3 h-3" />
            <span>What We Offer</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 sm:mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <h2 className="text-[#171717] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2.2rem,6vw,4rem)] max-w-[800px]">
              Everything you need to sell properties{" "}
              <span className="text-[#F26522]">faster.</span>
            </h2>
            <p className="text-[#171717]/55 text-[16px] sm:text-[17px] leading-relaxed mt-5 max-w-[560px]">
              From immersive 3D walkthroughs and AI visualization to analytics
              dashboards — the complete digital toolkit for modern real estate.
            </p>
          </div>

          {/* Service count indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center gap-3"
          >
            <span className="text-[48px] font-bold tracking-[-0.04em]" style={{ color: activeService.color }}>
              {activeService.number}
            </span>
            <div>
              <span className="text-[12px] font-mono text-[#888] uppercase tracking-wider block">
                of 06
              </span>
              <span className="text-[13px] font-semibold text-[#171717]">
                Services
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Desktop: Tab + Showcase Layout ─── */}
        <div
          className="hidden lg:flex gap-6"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left sidebar tabs */}
          <div className="w-[220px] shrink-0">
            <div className="bg-[#f5ede5] rounded-2xl p-2 space-y-1 sticky top-28">
              {services.map((service, index) => (
                <TabButton
                  key={service.number}
                  service={service}
                  index={index}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4 px-2">
              <div className="h-[3px] bg-[#e8ddd2] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: activeService.color }}
                  animate={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] font-mono text-[#aaa] uppercase tracking-wider">
                  {activeIndex + 1} / {services.length}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: activeService.color }}>
                  {activeService.shortTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right showcase panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <ShowcasePanel key={activeIndex} service={activeService} />
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Mobile: Accordion Cards ─── */}
        <div className="lg:hidden space-y-3">
          {services.map((service, index) => (
            <MobileServiceCard
              key={service.number}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-12 sm:mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] text-white text-[14px] font-medium hover:bg-[#624334] transition-all duration-300 hover:translate-y-[-1px] shadow-md"
          >
            Explore All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#171717]/10 text-[#171717]/70 text-[14px] font-medium hover:border-[#171717]/25 hover:text-[#171717] transition-all duration-300 bg-white"
          >
            View Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
