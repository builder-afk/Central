"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Box, Camera, Maximize2 } from "lucide-react";
interface AnimatedButtonProps {
  text: string;
  className?: string;
  iconColor?: string;
  iconBg?: string;
  iconIcon?: React.ComponentType<{ className?: string }>;
}

const AnimatedButton = ({
  text,
  className = "",
  iconColor = "text-black",
  iconBg = "bg-white",
  iconIcon = ArrowRight,
}: AnimatedButtonProps) => {
  const Icon = iconIcon;
  return (
    <button
      className={`group flex items-center justify-between gap-3 pl-6 pr-2.5 py-2.5 rounded-full font-semibold text-[14px] ${className}`}
    >
      <div className="h-[20px] overflow-hidden flex flex-col relative">
        <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
          {text}
        </span>
        <span className="absolute top-full left-0 translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
          {text}
        </span>
      </div>
      <div
        className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center shrink-0 shadow-sm`}
      >
        <Icon
          className={`w-4 h-4 ${iconColor} -rotate-45 group-hover:-rotate-[90deg] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`}
        />
      </div>
    </button>
  );
};

const serviceHighlights = [
  { icon: Box, label: "3D Showcases" },
  { icon: Camera, label: "360° Tours" },
  { icon: Maximize2, label: "Floor Plans" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* Soft Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#F26522]/10 to-transparent blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gray-300/30 to-transparent blur-[60px]" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        
        {/* Top Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-gray-800 uppercase">
            Property Visualization Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5.5rem)] max-w-[900px] mx-auto"
        >
          Immersive digital experiences for modern real estate.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-[16px] sm:text-[18px] text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          We create stunning 3D property showcases, 360° virtual tours, and
          interactive floor plans that help builders sell faster and reduce
          unnecessary site visits.
        </motion.p>

        {/* Service Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {serviceHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[13px] font-semibold text-gray-700"
              >
                <Icon className="w-4 h-4 text-[#F26522]" />
                {item.label}
              </div>
            );
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
        >
          <Link href="/contact">
            <AnimatedButton
              text="Start Your Project"
              className="bg-gray-900 text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              iconColor="text-gray-900"
            />
          </Link>

          <Link
            href="#how-it-works"
            className="group flex items-center gap-3 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-full py-3 px-6"
          >
            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-gray-100 transition-colors">
              <Play className="w-3 h-3 text-gray-900 ml-0.5" />
            </div>
            <span className="text-[14px] font-semibold text-gray-900">
              See How It Works
            </span>
          </Link>
        </motion.div>

        {/* Quick Stats Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-24 w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-6 relative z-20"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[32px] sm:text-[40px] font-bold text-gray-900 leading-none tracking-tight mb-2">
              200<span className="text-[#F26522]">+</span>
            </span>
            <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Builders Served
            </span>
          </div>
          
          <div className="w-full sm:w-px h-px sm:h-16 bg-gray-200" />
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[32px] sm:text-[40px] font-bold text-gray-900 leading-none tracking-tight mb-2">
              10K<span className="text-[#F26522]">+</span>
            </span>
            <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Tours Created
            </span>
          </div>

          <div className="w-full sm:w-px h-px sm:h-16 bg-gray-200" />
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[32px] sm:text-[40px] font-bold text-gray-900 leading-none tracking-tight mb-2">
              40<span className="text-[#F26522]">%</span>
            </span>
            <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
              Conversion Lift
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
