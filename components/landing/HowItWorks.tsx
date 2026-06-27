"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MessageCircle, Camera, Wand2, Rocket, ArrowRight, CheckCircle2, Clock, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Contact us.",
    description:
      "Reach out with your property details — number of units, project stage, and what you need. We'll craft a custom plan for you.",
    detail: "FREE CONSULTATION",
    accent: "#F26522",
    accentLight: "rgba(242, 101, 34, 0.08)",
    accentBorder: "rgba(242, 101, 34, 0.20)",
    stat: "< 24hr",
    statLabel: "Response Time",
    statIcon: Clock,
  },
  {
    number: "02",
    icon: Camera,
    title: "We capture.",
    description:
      "Our professional team visits your site with 360° cameras and LiDAR scanners to capture every detail of the property in high fidelity.",
    detail: "ON-SITE SHOOT",
    accent: "#8b5cf6",
    accentLight: "rgba(139, 92, 246, 0.08)",
    accentBorder: "rgba(139, 92, 246, 0.20)",
    stat: "4K+",
    statLabel: "Capture Points",
    statIcon: Zap,
  },
  {
    number: "03",
    icon: Wand2,
    title: "We build.",
    description:
      "We process the captures into immersive 3D showcases, interactive floor plans, and branded property microsites — all delivered within days.",
    detail: "DELIVERED IN 48–72 HRS",
    accent: "#06b6d4",
    accentLight: "rgba(6, 182, 212, 0.08)",
    accentBorder: "rgba(6, 182, 212, 0.20)",
    stat: "48hrs",
    statLabel: "Avg. Delivery",
    statIcon: Clock,
  },
  {
    number: "04",
    icon: Rocket,
    title: "You sell faster.",
    description:
      "Share tours via link, embed on your website, or use our lead capture tools. Track buyer engagement and close deals with confidence.",
    detail: "40% AVG. CONVERSION LIFT",
    accent: "#10b981",
    accentLight: "rgba(16, 185, 129, 0.08)",
    accentBorder: "rgba(16, 185, 129, 0.20)",
    stat: "40%",
    statLabel: "Conversion Lift",
    statIcon: TrendingUp,
  },
];

function ProgressRing({ progress, accent }: { progress: number; accent: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="absolute inset-0">
      {/* Background ring */}
      <circle
        cx="64"
        cy="64"
        r={radius}
        fill="none"
        stroke="rgba(0,0,0,0.04)"
        strokeWidth="3"
      />
      {/* Progress ring */}
      <motion.circle
        cx="64"
        cy="64"
        r={radius}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformOrigin: "center",
          transform: "rotate(-90deg)",
        }}
      />
    </svg>
  );
}

function StepCard({
  step,
  index,
  isActive,
  isCompleted,
  onClick,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) {
  const Icon = step.icon;
  const StatIcon = step.statIcon;

  return (
    <motion.div
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative cursor-pointer rounded-[20px] p-6 sm:p-8 transition-all duration-500
        ${isActive
          ? "bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] scale-[1.02]"
          : "bg-[#fafafa] hover:bg-white hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]"
        }
        border
      `}
      style={{
        borderColor: isActive ? step.accentBorder : "rgba(0,0,0,0.06)",
      }}
    >
      {/* Accent top line */}
      <motion.div
        className="absolute top-0 left-6 right-6 h-[3px] rounded-full"
        style={{ background: step.accent }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Top row: number + icon + completed badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500"
            style={{
              background: isActive ? step.accentLight : "rgba(0,0,0,0.03)",
              border: `1.5px solid ${isActive ? step.accentBorder : "rgba(0,0,0,0.06)"}`,
            }}
            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Icon
              className="w-5 h-5 transition-colors duration-500"
              style={{ color: isActive ? step.accent : "#999" }}
            />
          </motion.div>
          <span
            className="text-[13px] font-mono font-bold tracking-wider transition-colors duration-500"
            style={{ color: isActive ? step.accent : "#bbb" }}
          >
            STEP {step.number}
          </span>
        </div>

        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </motion.div>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-[22px] sm:text-[26px] font-semibold leading-tight tracking-[-0.02em] mb-3 transition-colors duration-500"
        style={{ color: isActive ? "#171717" : "#888" }}
      >
        {step.title}
      </h3>

      {/* Description - expands when active */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-[#555] leading-relaxed mb-5">
              {step.description}
            </p>

            {/* Stat card */}
            <div
              className="inline-flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-500"
              style={{
                background: step.accentLight,
                border: `1px solid ${step.accentBorder}`,
              }}
            >
              <StatIcon className="w-4 h-4" style={{ color: step.accent }} />
              <div>
                <span
                  className="text-[18px] font-bold block leading-none"
                  style={{ color: step.accent }}
                >
                  {step.stat}
                </span>
                <span className="text-[11px] text-[#888] font-medium uppercase tracking-wide">
                  {step.statLabel}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail tag */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className="text-[10px] font-mono font-semibold tracking-wider uppercase transition-colors duration-500"
          style={{ color: isActive ? step.accent : "#ccc" }}
        >
          {step.detail}
        </span>
        {isActive && (
          <motion.div
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <ArrowRight className="w-4 h-4" style={{ color: step.accent }} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Also allow auto-cycling when section is in view
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-advance steps based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (hasInteracted) return;
    // Map scroll progress to step index (0 to 3)
    const stepFromScroll = Math.max(0, Math.min(3, Math.floor(latest * 4)));
    if (stepFromScroll !== activeStep) {
      setActiveStep(stepFromScroll);
    }
  });



  useEffect(() => {
    if (isHovered || hasInteracted) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, hasInteracted]);

  const currentStep = steps[activeStep];
  const progress = (activeStep + 1) / steps.length;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-white pt-16 sm:pt-20 lg:pt-32 pb-16 sm:pb-20 lg:pb-32 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #171717 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Badge Row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-[#fafafa] shadow-[0px_1px_1px_#00000005]">
            HOW IT WORKS
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 sm:mb-20 px-5 sm:px-8 lg:px-12"
        >
          <h2 className="text-[#171717] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,6vw,3.5rem)] mx-auto max-w-[900px]">
            From property to tour in days, not weeks.
          </h2>
          <p className="text-[#4d4d4d] text-[16px] sm:text-[17px] leading-relaxed mt-5 max-w-[520px] mx-auto">
            A simple, streamlined process that gets your properties online
            and generating leads fast.
          </p>
        </motion.div>

        {/* Main content: sticky left panel + scrolling cards */}
        <div
          className="px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left panel — large step counter with ring */}
          <div className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-32">
            <motion.div
              className="relative rounded-[24px] p-8 sm:p-10 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${currentStep.accentLight}, white)`,
                border: `1.5px solid ${currentStep.accentBorder}`,
              }}
              layout
              transition={{ duration: 0.5 }}
            >
              {/* Background glow */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
                animate={{ background: currentStep.accent }}
                transition={{ duration: 0.8 }}
              />

              {/* Step counter with progress ring */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <ProgressRing progress={progress} accent={currentStep.accent} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeStep}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[42px] font-bold tracking-[-0.04em]"
                      style={{ color: currentStep.accent }}
                    >
                      {currentStep.number}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Active step title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <h3 className="text-[24px] font-semibold text-[#171717] mb-2 tracking-[-0.02em]">
                    {currentStep.title}
                  </h3>
                  <span
                    className="text-[11px] font-mono font-semibold uppercase tracking-wider"
                    style={{ color: currentStep.accent }}
                  >
                    {currentStep.detail}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Step dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveStep(i);
                      setHasInteracted(true);
                    }}
                    className="relative p-1 group"
                    aria-label={`Go to step ${i + 1}`}
                  >
                    <motion.div
                      className="rounded-full transition-all duration-300"
                      animate={{
                        width: i === activeStep ? 24 : 8,
                        height: 8,
                        background: i === activeStep ? currentStep.accent : i < activeStep ? currentStep.accent + "60" : "#ddd",
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right panel — step cards */}
          <div className="flex-1 space-y-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isActive={index === activeStep}
                isCompleted={index < activeStep}
                onClick={() => {
                  setActiveStep(index);
                  setHasInteracted(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
