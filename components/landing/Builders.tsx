"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Trophy,
  CheckCircle2
} from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";

const AnimatedButton = ({ text, className = "", iconColor = "text-white", iconBg = "bg-white/20", iconIcon = ArrowRight }: any) => {
  const Icon = iconIcon;
  return (
    <button className={`group flex items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full font-medium text-[14px] ${className}`}>
      <div className="h-[20px] overflow-hidden flex flex-col relative">
        <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">{text}</span>
        <span className="absolute top-full left-0 translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">{text}</span>
      </div>
      <div className={`w-7 h-7 sm:w-8 sm:h-8 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor} -rotate-45 group-hover:-rotate-[90deg] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`} />
      </div>
    </button>
  );
};

function PartnerCard({
  builder,
  index,
}: {
  builder: ReturnType<typeof useBuilderStore.getState>["builders"][0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Synthesize some mock data for the new metrics based on existing store data
  const yearsActive = Math.max(5, Math.floor(builder.totalViews / 1000));
  const expertise = index % 2 === 0 
    ? ["Luxury Villas", "High-rise Apartments"] 
    : ["Commercial Hubs", "Affordable Housing"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        className="rounded-[24px] p-8 overflow-hidden relative h-full flex flex-col transition-all duration-300 bg-white border border-[#171717]/10 hover:shadow-xl hover:shadow-[#171717]/10 hover:border-[#171717]/30 group"
      >
        <Link
          href={`/builders/${builder.id}`}
          className="relative z-10 flex-1 flex flex-col cursor-pointer"
        >
          {/* Header: Avatar, Name, Verification */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#171717]/5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 bg-[#171717] shadow-md">
              {builder.avatar}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-[#171717] tracking-tight truncate">
                  {builder.name}
                </h3>
                {builder.verified && (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </div>
              <p className="text-sm text-[#171717]/60 font-semibold uppercase tracking-wider">
                {builder.company}
              </p>
            </div>
          </div>

          {/* About / Tagline */}
          <p className="text-[#171717]/80 mb-8 line-clamp-3 leading-relaxed">
            {builder.tagline} Our commitment to quality and transparency ensures your peace of mind throughout the journey.
          </p>

          <div className="flex-1" />

          {/* Trust Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#faf5f0] rounded-xl p-3 border border-[#171717]/5">
              <div className="flex items-center gap-2 text-[#171717]/50 text-xs font-bold uppercase tracking-wider mb-1">
                <Trophy className="w-3.5 h-3.5" /> Years Active
              </div>
              <div className="text-lg font-semibold text-[#171717]">{yearsActive}+ Years</div>
            </div>
            <div className="bg-[#faf5f0] rounded-xl p-3 border border-[#171717]/5">
              <div className="flex items-center gap-2 text-[#171717]/50 text-xs font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5" /> Projects
              </div>
              <div className="text-lg font-semibold text-[#171717]">{builder.projectCount} Delivered</div>
            </div>
            <div className="col-span-2 bg-[#faf5f0] rounded-xl p-3 border border-[#171717]/5">
              <div className="flex items-center gap-2 text-[#171717]/50 text-xs font-bold uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5" /> Happy Families
              </div>
              <div className="text-lg font-semibold text-[#171717]">
                {Math.floor(builder.totalViews / 100).toLocaleString()}+ Housed
              </div>
            </div>
          </div>

          {/* Core Expertise Tags */}
          <div className="mb-8">
            <div className="text-xs font-bold text-[#171717]/50 uppercase tracking-wider mb-3">Core Expertise</div>
            <div className="flex flex-wrap gap-2">
              {expertise.map((exp, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-white border border-[#171717]/10 text-[#171717]/80 px-3 py-1.5 rounded-lg text-xs font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-5 border-t border-[#171717]/10 flex items-center justify-between text-sm text-[#171717]/60 font-semibold mb-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{builder.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-[#171717] font-bold">{builder.rating} / 5</span>
            </div>
          </div>
        </Link>
        
        {/* Book / Connect Action */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            alert(`Booking flow for ${builder.name} initiated!`);
          }}
          className="w-full bg-white hover:bg-[#171717] text-[#171717] hover:text-white transition-colors rounded-xl py-4 px-4 flex items-center justify-center gap-2 border border-[#171717]/20 font-bold text-sm shadow-sm"
        >
          View Full Portfolio
        </button>
      </div>
    </motion.div>
  );
}

export default function Builders() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const builders = useBuilderStore((s) => s.builders);
  const featured = builders.filter((b) => b.featured);

  return (
    <section
      ref={sectionRef}
      id="builders"
      className="relative bg-[#faf5f0] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Badge Row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="text-xs font-bold uppercase tracking-widest border border-[#171717]/10 rounded-full px-4 py-2 text-[#171717] bg-white shadow-sm">
            Our Professional Network
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-[#171717] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] mb-4">
              Partner with the finest professionals in the industry.
            </h2>
            <p className="text-xl text-[#171717]/70 leading-relaxed font-medium">
              Explore trusted builders, architects, interior designers, and landscape architects. Review their portfolios, verification status, and core expertise.
            </p>
          </div>
          <Link href="/builders">
            <AnimatedButton 
              text="Explore All Professionals" 
              className="bg-white text-[#171717] border border-[#171717]/10 hover:border-[#171717]/30 self-start shadow-sm" 
              iconBg="bg-[#faf5f0]"
              iconColor="text-[#171717]"
            />
          </Link>
        </motion.div>

        {/* Builder Cards */}
        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featured.map((builder, index) => (
            <PartnerCard key={builder.id} builder={builder} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
