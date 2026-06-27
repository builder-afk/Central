"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Box,
  Eye,
  Smartphone,
  Globe,
  MousePointerClick,
  Navigation,
  Camera,
  MapPin,
  Building2,
  Home,
  Ruler,
  Info,
  Compass,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Star,
  FileText,
  Image,
  MapPinned,
  ClipboardList,
  CheckCircle2,
  Phone,
  Zap,
  Wand2,
  Sofa,
  PenTool,
  Map,
  LayoutGrid,
  MonitorSmartphone,
  Clapperboard,
  Video,
  BarChart3,
  Target,
  Glasses,
  ScanLine,
  Package,
  Crown,
  Rocket,
  ChevronRight,
  TrendingUp,
  Users,
  Timer,
  Megaphone,
} from "lucide-react";

/* ═══════════════════════════════════════
   SERVICE DATA — Organized by Category
   ═══════════════════════════════════════ */

interface ServiceItem {
  number: string;
  emoji: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  includes: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; label: string }[];
  perfectFor?: string[];
  example?: string;
  showFlow?: { from: string; to: string };
  tracks?: string[];
  color: string;
  bgAccent: string;
  borderAccent: string;
}

interface ServiceCategory {
  id: string;
  emoji: string;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  services: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "core",
    emoji: "🏢",
    label: "CORE SERVICES",
    title: "Foundation of digital real estate",
    subtitle: "Our bread-and-butter offerings that every property needs.",
    color: "#F26522",
    services: [
      {
        number: "01",
        emoji: "🏢",
        badge: "FLAGSHIP",
        title: "Immersive 3D Property Showcases",
        tagline: "Let buyers experience a property before visiting.",
        description:
          "Our flagship offering transforms physical spaces into rich, navigable 3D environments. Every room, every angle, every detail — captured and delivered through a seamless web experience.",
        includes: [
          { icon: Navigation, label: "Full property walkthrough" },
          { icon: Box, label: "Room-to-room navigation" },
          { icon: MousePointerClick, label: "Interactive hotspots" },
          { icon: Smartphone, label: "Mobile-friendly viewing" },
          { icon: Globe, label: "Web-based access" },
        ],
        color: "#F26522",
        bgAccent: "rgba(242, 101, 34, 0.06)",
        borderAccent: "rgba(242, 101, 34, 0.15)",
      },
      {
        number: "02",
        emoji: "📸",
        badge: "POPULAR",
        title: "360° Virtual Tours",
        tagline: "Reduce unnecessary site visits.",
        description:
          "Professional 360° photography stitched into guided, interactive tours. Perfect for properties that are ready to show.",
        includes: [
          { icon: Camera, label: "360° photography" },
          { icon: Eye, label: "Guided tours" },
          { icon: Compass, label: "Interactive navigation" },
        ],
        perfectFor: ["Ready-to-move apartments", "Villas", "Commercial spaces", "Model homes"],
        color: "#8b5cf6",
        bgAccent: "rgba(139, 92, 246, 0.06)",
        borderAccent: "rgba(139, 92, 246, 0.15)",
      },
      {
        number: "03",
        emoji: "📐",
        badge: "SMART",
        title: "Interactive Floor Plans",
        tagline: "Buyers instantly understand layouts.",
        description:
          "Replace static PDFs with living, clickable floor plans. Buyers tap a room to see dimensions, photos, and details.",
        includes: [
          { icon: MousePointerClick, label: "Clickable rooms" },
          { icon: Ruler, label: "Area measurements" },
          { icon: Info, label: "Room information" },
          { icon: Navigation, label: "Live navigation" },
        ],
        color: "#06b6d4",
        bgAccent: "rgba(6, 182, 212, 0.06)",
        borderAccent: "rgba(6, 182, 212, 0.15)",
      },
      {
        number: "04",
        emoji: "🌐",
        badge: "PREMIUM",
        title: "Property Microsites",
        tagline: "Premium project presentation.",
        description:
          "Dedicated website for each project. A single branded URL that houses everything a buyer needs in one polished, shareable experience.",
        includes: [
          { icon: Box, label: "3D walkthrough" },
          { icon: Navigation, label: "Floor plans" },
          { icon: Image, label: "Gallery" },
          { icon: FileText, label: "Brochure" },
          { icon: MapPinned, label: "Location map" },
          { icon: ClipboardList, label: "Lead form" },
        ],
        example: "builderscentral.com/project/green-valley",
        color: "#10b981",
        bgAccent: "rgba(16, 185, 129, 0.06)",
        borderAccent: "rgba(16, 185, 129, 0.15)",
      },
    ],
  },
  {
    id: "premium",
    emoji: "🚀",
    label: "PREMIUM SERVICES",
    title: "Next-level property experiences",
    subtitle: "Advanced visualization and staging that sell the dream, not just the property.",
    color: "#8b5cf6",
    services: [
      {
        number: "05",
        emoji: "✨",
        badge: "AI-POWERED",
        title: "AI-Powered Property Visualization",
        tagline: "Sell the vision, not just the current state.",
        description:
          "Use AI to show buyers the full potential of any property — from empty rooms to furnished spaces, construction sites to finished projects.",
        includes: [
          { icon: Wand2, label: "Empty room → Furnished" },
          { icon: Building2, label: "Construction site → Finished project" },
          { icon: PenTool, label: "Shell structure → Interior concepts" },
        ],
        color: "#8b5cf6",
        bgAccent: "rgba(139, 92, 246, 0.06)",
        borderAccent: "rgba(139, 92, 246, 0.15)",
      },
      {
        number: "06",
        emoji: "🛋️",
        badge: "TRANSFORM",
        title: "Virtual Staging",
        tagline: "Makes properties more attractive online.",
        description:
          "Transform empty properties into beautifully furnished, magazine-worthy homes. Digital staging at a fraction of the cost of physical staging.",
        includes: [
          { icon: Sofa, label: "Luxury furniture placement" },
          { icon: Image, label: "Photorealistic rendering" },
          { icon: PenTool, label: "Multiple style options" },
        ],
        showFlow: { from: "Empty property", to: "Luxury furnished home" },
        color: "#ec4899",
        bgAccent: "rgba(236, 72, 153, 0.06)",
        borderAccent: "rgba(236, 72, 153, 0.15)",
      },
      {
        number: "07",
        emoji: "🏛️",
        badge: "ARCHVIZ",
        title: "Architectural Visualization",
        tagline: "Start marketing before completion.",
        description:
          "For projects still under construction. Photorealistic 3D renders and flythrough videos that bring unbuilt properties to life for early marketing.",
        includes: [
          { icon: Building2, label: "Exterior renders" },
          { icon: Home, label: "Interior renders" },
          { icon: Video, label: "Flythrough videos" },
        ],
        color: "#f59e0b",
        bgAccent: "rgba(245, 158, 11, 0.06)",
        borderAccent: "rgba(245, 158, 11, 0.15)",
      },
      {
        number: "08",
        emoji: "🗺️",
        badge: "INTERACTIVE",
        title: "Interactive Project Masterplans",
        tagline: "Better project understanding.",
        description:
          "Interactive map for builders showcasing towers, amenities, roads, parks, and clubhouses. Give buyers a bird's-eye view of the entire development.",
        includes: [
          { icon: Building2, label: "Towers & blocks" },
          { icon: Map, label: "Amenities & clubhouses" },
          { icon: Navigation, label: "Roads & connectivity" },
          { icon: MapPin, label: "Parks & open spaces" },
          { icon: MousePointerClick, label: "Interactive map navigation" },
        ],
        color: "#06b6d4",
        bgAccent: "rgba(6, 182, 212, 0.06)",
        borderAccent: "rgba(6, 182, 212, 0.15)",
      },
    ],
  },
  {
    id: "builder",
    emoji: "🏗️",
    label: "BUILDER-FOCUSED",
    title: "Built for developers & builders",
    subtitle: "End-to-end solutions designed specifically for real estate developers.",
    color: "#F26522",
    services: [
      {
        number: "09",
        emoji: "📦",
        badge: "COMPLETE",
        title: "Project Marketing Suite",
        tagline: "Everything needed to market a project.",
        description:
          "A complete marketing package for your project — from landing pages and 3D showcases to brochures, lead generation, and CRM integration.",
        includes: [
          { icon: Globe, label: "Landing page" },
          { icon: Box, label: "3D showcase" },
          { icon: FileText, label: "Digital brochure" },
          { icon: Target, label: "Lead generation" },
          { icon: Users, label: "CRM integration" },
        ],
        color: "#F26522",
        bgAccent: "rgba(242, 101, 34, 0.06)",
        borderAccent: "rgba(242, 101, 34, 0.15)",
      },
      {
        number: "10",
        emoji: "🖥️",
        badge: "SHOWROOM",
        title: "Digital Sales Gallery",
        tagline: "Impress high-value buyers.",
        description:
          "A physical sales office replacement. Touchscreen experiences with interactive project displays and virtual walkthroughs that close deals.",
        includes: [
          { icon: MonitorSmartphone, label: "Touchscreen experiences" },
          { icon: LayoutGrid, label: "Interactive project displays" },
          { icon: Eye, label: "Virtual walkthroughs" },
        ],
        color: "#10b981",
        bgAccent: "rgba(16, 185, 129, 0.06)",
        borderAccent: "rgba(16, 185, 129, 0.15)",
      },
    ],
  },
  {
    id: "content",
    emoji: "🎥",
    label: "CONTENT SERVICES",
    title: "Cinematic property content",
    subtitle: "Professional video and drone content that makes properties unforgettable.",
    color: "#ec4899",
    services: [
      {
        number: "11",
        emoji: "🚁",
        badge: "AERIAL",
        title: "Drone Property Showcases",
        tagline: "Showcase surroundings, not just buildings.",
        description:
          "Professional drone footage, aerial mapping, and neighborhood overviews that give buyers the complete picture of location and connectivity.",
        includes: [
          { icon: Video, label: "Drone footage" },
          { icon: Map, label: "Aerial mapping" },
          { icon: MapPin, label: "Neighborhood overview" },
        ],
        color: "#06b6d4",
        bgAccent: "rgba(6, 182, 212, 0.06)",
        borderAccent: "rgba(6, 182, 212, 0.15)",
      },
      {
        number: "12",
        emoji: "🎬",
        badge: "CINEMATIC",
        title: "Cinematic Property Videos",
        tagline: "Premium marketing that converts.",
        description:
          "High-production marketing videos combining drone shots, interior walkthroughs, and motion graphics — crafted to sell lifestyle, not just square footage.",
        includes: [
          { icon: Clapperboard, label: "Drone shots" },
          { icon: Navigation, label: "Interior walkthroughs" },
          { icon: Sparkles, label: "Motion graphics" },
        ],
        color: "#ec4899",
        bgAccent: "rgba(236, 72, 153, 0.06)",
        borderAccent: "rgba(236, 72, 153, 0.15)",
      },
    ],
  },
  {
    id: "smart",
    emoji: "📊",
    label: "SMART TOOLS",
    title: "Data-driven real estate",
    subtitle: "Analytics and lead tools that turn views into verified buyers.",
    color: "#10b981",
    services: [
      {
        number: "13",
        emoji: "📊",
        badge: "ANALYTICS",
        title: "Property Analytics Dashboard",
        tagline: "Understand buyer behavior.",
        description:
          "A developer dashboard that tracks views, engagement time, hotspot clicks, and lead generation — giving you data-backed insights into what buyers want.",
        includes: [
          { icon: Eye, label: "View tracking" },
          { icon: Timer, label: "Engagement time" },
          { icon: MousePointerClick, label: "Hotspot clicks" },
          { icon: TrendingUp, label: "Lead generation metrics" },
        ],
        tracks: ["Views", "Engagement time", "Hotspot clicks", "Lead generation"],
        color: "#10b981",
        bgAccent: "rgba(16, 185, 129, 0.06)",
        borderAccent: "rgba(16, 185, 129, 0.15)",
      },
      {
        number: "14",
        emoji: "🎯",
        badge: "CONVERSION",
        title: "Lead Capture & Qualification",
        tagline: "Higher quality leads.",
        description:
          "Smart lead forms that appear inside the 3D tour at the right moment — after the buyer has explored key areas like kitchen, bedroom, and balcony.",
        includes: [
          { icon: Target, label: "Context-aware lead forms" },
          { icon: Navigation, label: "Exploration-triggered capture" },
          { icon: Users, label: "Qualified lead scoring" },
        ],
        color: "#F26522",
        bgAccent: "rgba(242, 101, 34, 0.06)",
        borderAccent: "rgba(242, 101, 34, 0.15)",
      },
    ],
  },
  {
    id: "future",
    emoji: "🌍",
    label: "FUTURE PREMIUM",
    title: "The future of property buying",
    subtitle: "Cutting-edge immersive technologies coming soon.",
    color: "#8b5cf6",
    services: [
      {
        number: "15",
        emoji: "🥽",
        badge: "COMING SOON",
        title: "VR Property Experiences",
        tagline: "Luxury project differentiation.",
        description:
          "Full virtual reality property tours using Meta Quest, Apple Vision Pro, and other VR headsets — the ultimate immersive experience for premium projects.",
        includes: [
          { icon: Glasses, label: "Meta Quest support" },
          { icon: Smartphone, label: "Apple Vision Pro" },
          { icon: Eye, label: "Full VR headset compatibility" },
        ],
        color: "#8b5cf6",
        bgAccent: "rgba(139, 92, 246, 0.06)",
        borderAccent: "rgba(139, 92, 246, 0.15)",
      },
      {
        number: "16",
        emoji: "📱",
        badge: "COMING SOON",
        title: "AR Property Visualization",
        tagline: "See it before it exists.",
        description:
          "View properties on your mobile or tablet with augmented reality — place furniture, customize interiors, and visualize spaces in real-time.",
        includes: [
          { icon: Smartphone, label: "Mobile AR viewing" },
          { icon: ScanLine, label: "Furniture placement" },
          { icon: PenTool, label: "Interior customization" },
        ],
        color: "#06b6d4",
        bgAccent: "rgba(6, 182, 212, 0.06)",
        borderAccent: "rgba(6, 182, 212, 0.15)",
      },
    ],
  },
];

/* ═══════════════════════════════════════
   PRICING PACKAGES
   ═══════════════════════════════════════ */

const packages = [
  {
    tier: "Starter",
    price: "₹10,000–15,000",
    icon: Package,
    color: "#06b6d4",
    bgAccent: "rgba(6, 182, 212, 0.06)",
    borderAccent: "rgba(6, 182, 212, 0.18)",
    features: ["360° Tour", "Basic Microsite", "Gallery"],
    recommended: false,
  },
  {
    tier: "Professional",
    price: "₹25,000–50,000",
    icon: Crown,
    color: "#F26522",
    bgAccent: "rgba(242, 101, 34, 0.06)",
    borderAccent: "rgba(242, 101, 34, 0.18)",
    features: ["3D Showcase", "Interactive Floor Plan", "Microsite", "Lead Capture"],
    recommended: true,
  },
  {
    tier: "Enterprise",
    price: "₹75,000–2,00,000+",
    icon: Rocket,
    color: "#8b5cf6",
    bgAccent: "rgba(139, 92, 246, 0.06)",
    borderAccent: "rgba(139, 92, 246, 0.18)",
    features: [
      "Full 3D Experience",
      "Virtual Staging",
      "Drone Content",
      "Analytics Dashboard",
      "Custom Branding",
    ],
    recommended: false,
  },
];

/* ═══════════════════════════════════════
   STATS & PROCESS
   ═══════════════════════════════════════ */

const stats = [
  { value: "500+", label: "Properties Digitized" },
  { value: "40%", label: "Faster Conversions" },
  { value: "3x", label: "More Qualified Leads" },
  { value: "85%", label: "Fewer Site Visits" },
];

const processSteps = [
  {
    step: "01",
    title: "Book a Consultation",
    description: "We assess your property and recommend the right package.",
  },
  {
    step: "02",
    title: "On-Site Capture",
    description: "Our team visits with professional-grade equipment.",
  },
  {
    step: "03",
    title: "Production & Delivery",
    description: "We deliver your digital assets within 5 business days.",
  },
  {
    step: "04",
    title: "Go Live",
    description: "Embed on your site, share via link, or list on our marketplace.",
  },
];

/* ═══════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 28 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════
   REUSABLE SERVICE CARD COMPONENT
   ═══════════════════════════════════════ */

function ServiceCard({
  service,
  isExpanded,
  onToggle,
}: {
  service: ServiceItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      onClick={onToggle}
      className="group relative bg-white rounded-[16px] border border-[#50372b]/8 shadow-[0px_1px_2px_#00000008,0px_4px_12px_#00000006] hover:shadow-[0px_2px_4px_#00000008,0px_8px_24px_#0000000a] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Accent top-line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: service.color }}
      />

      {/* Main Row */}
      <div className="p-5 sm:p-7 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
        {/* Left: Emoji */}
        <div className="flex items-center gap-4 shrink-0">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] flex items-center justify-center text-xl sm:text-2xl transition-transform duration-500 group-hover:scale-110"
            style={{
              background: service.bgAccent,
              border: `1px solid ${service.borderAccent}`,
            }}
          >
            {service.emoji}
          </div>
          <div className="lg:hidden">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: service.bgAccent, color: service.color }}
              >
                {service.badge}
              </span>
              <span className="text-[11px] font-mono text-[#50372b]/30">
                {service.number}
              </span>
            </div>
            <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#50372b] leading-tight tracking-[-0.01em]">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Center */}
        <div className="flex-1 min-w-0">
          <div className="hidden lg:flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-mono text-[#50372b]/30">
              {service.number}
            </span>
            <span
              className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ background: service.bgAccent, color: service.color }}
            >
              {service.badge}
            </span>
          </div>
          <h3 className="hidden lg:block text-[20px] xl:text-[22px] font-semibold text-[#50372b] leading-tight tracking-[-0.01em] mb-1.5">
            {service.title}
          </h3>
          <p className="text-[13px] sm:text-[14px] text-[#50372b]/50 leading-relaxed line-clamp-2 lg:line-clamp-none">
            {service.description}
          </p>
        </div>

        {/* Right: Expand */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-[12px] font-medium text-[#50372b]/35 group-hover:text-[#50372b]/60 transition-colors">
            {isExpanded ? "Less" : "Details"}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 rounded-full bg-[#faf5f0] border border-[#50372b]/8 flex items-center justify-center group-hover:bg-[#50372b] group-hover:text-white group-hover:border-transparent transition-all duration-300"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-7 lg:px-8 pb-7 sm:pb-8 pt-0">
              <div className="h-px bg-[#50372b]/6 mb-6" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                {/* Includes */}
                <div>
                  <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-4">
                    What&apos;s Included
                  </h4>
                  <div className="space-y-2.5">
                    {service.includes.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 group/item"
                        >
                          <div
                            className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
                            style={{ background: service.bgAccent }}
                          >
                            <Icon
                              className="w-3.5 h-3.5"
                              style={{ color: service.color }}
                            />
                          </div>
                          <span className="text-[13px] sm:text-[14px] font-medium text-[#50372b]/75">
                            {item.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  {/* Perfect For */}
                  {service.perfectFor && (
                    <div>
                      <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-3">
                        Perfect For
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.perfectFor.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium border border-[#50372b]/8 bg-[#faf5f0] text-[#50372b]/65"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show Flow */}
                  {service.showFlow && (
                    <div>
                      <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-3">
                        Transformation
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 rounded-lg text-[13px] font-medium bg-[#50372b]/5 text-[#50372b]/60">
                          {service.showFlow.from}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#50372b]/25" />
                        <span
                          className="px-3 py-1.5 rounded-lg text-[13px] font-semibold"
                          style={{ background: service.bgAccent, color: service.color }}
                        >
                          {service.showFlow.to}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Example URL */}
                  {service.example && (
                    <div>
                      <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-3">
                        Example
                      </h4>
                      <div className="rounded-[8px] bg-[#50372b] px-4 py-3 flex items-center justify-between">
                        <code className="text-[12px] sm:text-[13px] font-mono text-white/80">
                          {service.example}
                        </code>
                        <span className="text-[10px] font-mono uppercase text-white/25 hidden sm:inline">
                          URL
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Value */}
                  <div>
                    <h4 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-3">
                      Value
                    </h4>
                    <div
                      className="rounded-[10px] p-4 flex items-start gap-3"
                      style={{
                        background: service.bgAccent,
                        border: `1px solid ${service.borderAccent}`,
                      }}
                    >
                      <Sparkles
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: service.color }}
                      />
                      <p className="text-[13px] sm:text-[14px] leading-relaxed font-medium text-[#50372b]/75">
                        {service.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white transition-all duration-300 hover:opacity-90 hover:translate-y-[-1px] shadow-md"
                  style={{ background: service.color }}
                >
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-[#50372b]/65 border border-[#50372b]/10 hover:border-[#50372b]/20 transition-all duration-300 bg-white">
                  View Pricing
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════ */

export default function ServicesPage() {
  const [expandedCards, setExpandedCards] = useState<Record<string, number | null>>({
    core: 0,
    premium: null,
    builder: null,
    content: null,
    smart: null,
    future: null,
  });

  const toggleCard = (categoryId: string, idx: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === idx ? null : idx,
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf5f0]">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="pt-36 sm:pt-44 lg:pt-52 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8 sm:mb-10"
          >
            <div className="text-[12px] font-mono uppercase tracking-widest border border-[#50372b]/15 rounded-full px-4 py-1.5 text-[#50372b] bg-white shadow-[0px_1px_1px_#00000005]">
              OUR SERVICES
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-widest text-[#50372b]/50">
              <Star className="w-3 h-3" />
              <span>16 Services · 3 Packages</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-[900px]"
          >
            <h1 className="text-[#50372b] font-heading italic leading-[1.02] tracking-[-0.035em] text-[clamp(2.5rem,7vw,5rem)]">
              Everything you need to sell properties{" "}
              <span className="text-[#F26522]">faster.</span>
            </h1>
            <p className="text-[#50372b]/55 text-[17px] sm:text-[19px] leading-relaxed mt-6 sm:mt-8 max-w-[640px]">
              From 3D walkthroughs and drone content to AI visualization and VR
              experiences — the complete digital toolkit for modern real estate.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 max-w-[800px]"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="group">
                <div className="text-[28px] sm:text-[32px] font-heading italic text-[#50372b] tracking-tight group-hover:text-[#F26522] transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick Nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap gap-2 mt-12 sm:mt-14"
          >
            {serviceCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-medium border border-[#50372b]/8 bg-white text-[#50372b]/65 hover:border-[#50372b]/20 hover:text-[#50372b] transition-all duration-300"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </a>
            ))}
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-medium border border-[#F26522]/20 bg-[#F26522]/5 text-[#F26522] hover:bg-[#F26522]/10 transition-all duration-300"
            >
              <span>💰</span>
              <span>PRICING</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ SERVICE CATEGORY SECTIONS ═══ */}
      {serviceCategories.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-28">
          {/* Divider */}
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="h-px bg-[#50372b]/8" />
          </div>

          <div className="pt-14 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 lg:pb-24">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
              {/* Category Header */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mb-10 sm:mb-14"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{category.emoji}</span>
                  <div
                    className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-semibold"
                    style={{
                      background: `${category.color}10`,
                      color: category.color,
                    }}
                  >
                    {category.label}
                  </div>
                </div>
                <h2 className="text-[#50372b] font-heading italic leading-[1.08] tracking-[-0.025em] text-[clamp(1.75rem,4vw,2.8rem)] mb-2">
                  {category.title}
                </h2>
                <p className="text-[#50372b]/45 text-[14px] sm:text-[15px] max-w-[520px]">
                  {category.subtitle}
                </p>
              </motion.div>

              {/* Service Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-col gap-4 lg:gap-5"
              >
                {category.services.map((service, idx) => (
                  <ServiceCard
                    key={service.number}
                    service={service}
                    isExpanded={expandedCards[category.id] === idx}
                    onToggle={() => toggleCard(category.id, idx)}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ PRICING PACKAGES ═══ */}
      <section id="pricing" className="scroll-mt-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="h-px bg-[#50372b]/8" />
        </div>

        <div className="pt-14 sm:pt-20 lg:pt-28 pb-14 sm:pb-20 lg:pb-28">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            {/* Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest border border-[#50372b]/15 rounded-full px-4 py-1.5 text-[#50372b] bg-white shadow-[0px_1px_1px_#00000005] mb-6">
                💰 RECOMMENDED PACKAGES
              </div>
              <h2 className="text-[#50372b] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]">
                Simple pricing, powerful results.
              </h2>
              <p className="text-[#50372b]/45 text-[15px] mt-4 max-w-[480px] mx-auto">
                Choose a package that fits your project. Custom quotes available
                for enterprise needs.
              </p>
            </motion.div>

            {/* Package Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-[1100px] mx-auto"
            >
              {packages.map((pkg, idx) => {
                const Icon = pkg.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className={`relative rounded-[16px] p-7 sm:p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                      pkg.recommended
                        ? "bg-[#50372b] text-white shadow-xl shadow-[#50372b]/15 ring-2 ring-[#F26522]/30"
                        : "bg-white border border-[#50372b]/8 shadow-[0px_1px_2px_#00000008,0px_4px_12px_#00000006]"
                    }`}
                  >
                    {/* Recommended Badge */}
                    {pkg.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F26522] text-white text-[11px] font-mono font-semibold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
                        MOST POPULAR
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-[10px] flex items-center justify-center mb-6 ${
                        pkg.recommended ? "bg-white/10" : ""
                      }`}
                      style={
                        !pkg.recommended
                          ? {
                              background: pkg.bgAccent,
                              border: `1px solid ${pkg.borderAccent}`,
                            }
                          : undefined
                      }
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{
                          color: pkg.recommended ? "#F26522" : pkg.color,
                        }}
                      />
                    </div>

                    {/* Tier + Price */}
                    <h3
                      className={`text-[18px] font-semibold mb-1 ${
                        pkg.recommended ? "text-white" : "text-[#50372b]"
                      }`}
                    >
                      {pkg.tier}
                    </h3>
                    <div
                      className={`text-[24px] sm:text-[28px] font-heading italic tracking-tight mb-6 ${
                        pkg.recommended ? "text-[#F26522]" : "text-[#50372b]"
                      }`}
                    >
                      {pkg.price}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 flex-1 mb-8">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0"
                            style={{
                              color: pkg.recommended
                                ? "#F26522"
                                : pkg.color,
                            }}
                          />
                          <span
                            className={`text-[13px] sm:text-[14px] ${
                              pkg.recommended
                                ? "text-white/75"
                                : "text-[#50372b]/65"
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      className={`w-full py-3 rounded-full text-[14px] font-medium transition-all duration-300 hover:translate-y-[-1px] ${
                        pkg.recommended
                          ? "bg-[#F26522] text-white hover:bg-[#e05a1a] shadow-lg shadow-[#F26522]/20"
                          : "bg-[#50372b] text-white hover:bg-[#624334]"
                      }`}
                    >
                      Get Started
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="h-px bg-[#50372b]/8" />
      </div>

      <section className="pt-14 sm:pt-20 lg:pt-28 pb-14 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="text-[12px] font-mono uppercase tracking-widest border border-[#50372b]/15 rounded-full px-4 py-1.5 text-[#50372b] bg-white shadow-[0px_1px_1px_#00000005] w-fit mb-6">
              HOW IT WORKS
            </div>
            <h2 className="text-[#50372b] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(1.8rem,4.5vw,3rem)] max-w-[600px]">
              From site visit to go-live in{" "}
              <span className="text-[#F26522]">4 simple steps.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          >
            {processSteps.map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="relative bg-white rounded-[14px] border border-[#50372b]/8 p-6 shadow-[0px_1px_2px_#00000008,0px_4px_12px_#00000006] group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-9 h-9 rounded-full bg-[#50372b] text-white flex items-center justify-center text-[12px] font-mono font-semibold mb-5 group-hover:bg-[#F26522] transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-[15px] font-semibold text-[#50372b] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#50372b]/50 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="h-px bg-[#50372b]/8" />
      </div>

      <section className="pt-14 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 lg:pb-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#50372b] rounded-[20px] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#F26522]/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-[#8b5cf6]/8 blur-[60px] pointer-events-none" />

            <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              <div className="max-w-[580px]">
                <h2 className="text-white font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(1.8rem,4vw,2.8rem)] mb-4">
                  Ready to transform how you sell properties?
                </h2>
                <p className="text-white/45 text-[14px] sm:text-[15px] leading-relaxed">
                  Book a free consultation and discover which services are right
                  for your portfolio.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-5">
                  {[
                    "Free consultation",
                    "5-day delivery",
                    "Cancel anytime",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-[12px] text-white/35"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F26522]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F26522] text-white text-[14px] font-medium hover:bg-[#e05a1a] transition-all duration-300 hover:translate-y-[-1px] shadow-lg shadow-[#F26522]/20"
                >
                  <Phone className="w-4 h-4" />
                  Book a Call
                </Link>
                <Link
                  href="/builders"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 text-white text-[14px] font-medium hover:bg-white/15 transition-all duration-300 border border-white/10"
                >
                  <Zap className="w-4 h-4" />
                  See Examples
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
