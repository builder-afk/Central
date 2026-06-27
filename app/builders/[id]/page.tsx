"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  BadgeCheck,
  Eye,
  FolderOpen,
  Globe,
  Mail,
  Calendar,
  Building2,
  Play,
  MessageSquare,
  Clock,
  IndianRupee,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import VerifiedBadge from "@/components/builders/VerifiedBadge";
import ProjectCarousel from "@/components/builders/ProjectCarousel";
import PortfolioGrid from "@/components/builders/PortfolioGrid";
import ReviewCard from "@/components/builders/ReviewCard";
import QuoteButton from "@/components/builders/QuoteButton";
import SkeletonLoader from "@/components/builders/SkeletonLoader";
import ChatPanel from "@/components/builders/ChatPanel";

export default function BuilderProfilePage() {
  const params = useParams();
  const getBuilderById = useBuilderStore((s) => s.getBuilderById);
  const builder = getBuilderById(params.id as string);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-8">
        <div className="section-container">
          <SkeletonLoader variant="profile" />
        </div>
      </div>
    );
  }

  if (!builder) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-body">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="font-heading italic text-3xl text-slate-900 mb-2">Builder not found</h2>
          <p className="text-slate-500 text-sm mb-6">The builder profile you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/builders" className="bg-slate-900 text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors">
            Browse All Builders
          </Link>
        </div>
      </div>
    );
  }

  const toursAvailable = builder.projects.filter((p) => p.tourAvailable).length;

  return (
    <div className="min-h-screen bg-slate-50 font-body pb-24">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="section-container flex items-center justify-between h-14">
          <Link
            href="/builders"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Builders</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-700 border border-slate-200 text-xs font-medium hover:bg-slate-50 transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Chat
            </button>
            <Link
              href={`/builders/${builder.id}/quote`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all shadow-sm"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ─── HERO: Fullscreen Carousel ─── */}
      <div className="pt-14">
        <div className="section-container pt-6">
          <ProjectCarousel projects={builder.projects.filter((p) => p.tourAvailable)} />
        </div>
      </div>

      {/* ─── BUILDER INFO + QUICK INFO BAR ─── */}
      <div className="section-container mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start gap-6 mb-8"
        >
          {/* Avatar */}
          <div className={`w-24 h-24 rounded-[1.5rem] bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-3xl font-heading italic text-white shadow-xl border-4 border-white shrink-0`}>
            {builder.avatar}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h1 className="font-heading italic text-4xl sm:text-5xl text-slate-900">{builder.name}</h1>
              {builder.verified && <VerifiedBadge size="md" />}
            </div>
            <p className="text-slate-600 text-lg mb-2 font-medium">{builder.company}</p>
            <p className="text-slate-500 text-base leading-relaxed max-w-2xl">{builder.tagline}</p>
          </div>
        </motion.div>

        {/* 📊 QUICK INFO BAR — Horizontal info pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {[
            { icon: Calendar, label: builder.experience, sublabel: "Experience" },
            { icon: FolderOpen, label: `${builder.completedProjects} Projects`, sublabel: "Completed" },
            { icon: IndianRupee, label: builder.avgPricePerSqft + "/sq.ft", sublabel: "Avg Price" },
            { icon: Clock, label: builder.responseTime, sublabel: "Response Time" },
            { icon: Star, label: `${builder.rating} ★`, sublabel: `${builder.reviewCount} reviews` },
            { icon: Eye, label: `${(builder.totalViews / 1000).toFixed(1)}k`, sublabel: "Profile Views" },
          ].map((pill) => (
            <div key={pill.sublabel} className="info-pill flex items-center gap-2.5">
              <pill.icon className="w-4 h-4 text-slate-400" />
              <div>
                <span className="font-semibold text-slate-800 text-sm">{pill.label}</span>
                <span className="text-slate-400 text-xs ml-1.5">{pill.sublabel}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ─── BIO ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-100 mb-12"
        >
          <h2 className="font-heading italic text-3xl text-slate-900 mb-4">About</h2>
          <p className="text-slate-600 text-base leading-relaxed mb-6">{builder.bio}</p>
          <div className="flex flex-wrap gap-2.5">
            {builder.specializations.map((spec) => (
              <span key={spec} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-sm text-slate-600 font-medium">
                {spec}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─── PORTFOLIO GRID ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading italic text-3xl text-slate-900 mb-1">Portfolio</h2>
              <p className="text-sm text-slate-500">
                {builder.projects.length} projects · {toursAvailable} interactive 3D tours
              </p>
            </div>
          </div>
          <PortfolioGrid projects={builder.projects} variant="masonry" />
        </motion.section>

        {/* ─── SERVICES SECTION ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-heading italic text-3xl text-slate-900 mb-2">Services</h2>
          <p className="text-sm text-slate-500 mb-8">What {builder.name} offers</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {builder.services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="service-card group"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="font-heading italic text-xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ─── REVIEWS ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading italic text-3xl text-slate-900 mb-1">Reviews</h2>
              <p className="text-sm text-slate-500">
                {builder.rating} ★ average from {builder.reviewCount} reviews
              </p>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="font-heading italic text-6xl text-slate-900 tracking-[-3px]">{builder.rating}</div>
              <div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(builder.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">{builder.reviewCount} verified reviews</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Quality", pct: 96 },
                { label: "Communication", pct: 94 },
                { label: "On-time", pct: 91 },
                { label: "Value", pct: 89 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-500">{m.label}</span>
                    <span className="text-slate-700">{m.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-slate-900 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${m.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {builder.reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ─── CONTACT CTA ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 sm:p-10 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-heading italic text-3xl mb-2">Ready to build your dream?</h3>
                <p className="text-slate-300 max-w-xl">
                  {builder.name} typically responds within {builder.responseTime.replace("< ", "")}. Start your project with a free consultation.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat Now
                </button>
                <Link
                  href={`/builders/${builder.id}/quote`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-medium hover:bg-slate-50 transition-all shadow-lg"
                >
                  Get a Quote
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── CONTACT DETAILS ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-slate-100"
        >
          <h3 className="font-heading italic text-2xl text-slate-900 mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3.5 text-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-slate-600">{builder.location}</span>
            </div>
            <div className="flex items-center gap-3.5 text-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Globe className="w-4 h-4 text-slate-400" />
              </div>
              <a href={`https://${builder.website}`} className="text-blue-600 font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                {builder.website}
              </a>
            </div>
            <div className="flex items-center gap-3.5 text-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-slate-600">{builder.contactEmail}</span>
            </div>
            <div className="flex items-center gap-3.5 text-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-slate-600">{builder.experience} experience</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── STICKY CTA ─── */}
      <QuoteButton builderId={builder.id} builderName={builder.name} onChatClick={() => setChatOpen(true)} />

      {/* ─── CHAT PANEL (Right Sidebar) ─── */}
      <ChatPanel builder={builder} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
