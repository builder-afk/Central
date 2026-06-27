"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  ArrowLeft,
  SlidersHorizontal,
  X,
  Building2,
  Heart,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useBuilderStore, ProfessionalCategory } from "@/store/useBuilderStore";
import BuilderCard from "@/components/builders/BuilderCard";
import PortfolioGrid from "@/components/builders/PortfolioGrid";
import CostEstimator from "@/components/builders/CostEstimator";
import SkeletonLoader from "@/components/builders/SkeletonLoader";
import Navbar from "@/components/landing/Navbar";

const budgetRanges = [
  { id: "any", label: "Any Budget" },
  { id: "under-30l", label: "Under ₹30L" },
  { id: "30-50l", label: "₹30L — ₹50L" },
  { id: "50l-1cr", label: "₹50L — ₹1Cr" },
  { id: "above-1cr", label: "Above ₹1Cr" },
];

const projectTypes = [
  "All",
  "Villas",
  "Apartments",
  "Commercial",
  "Interiors",
  "Renovation",
];

const locations = [
  "All Locations",
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Pune",
  "Ahmedabad",
  "Kochi",
];

const categoryTabs: (ProfessionalCategory | "All")[] = [
  "All",
  "Builder",
  "Architect",
  "Interior Designer",
  "Landscape Architect",
];

const categoryIcons: Record<string, string> = {
  All: "👥",
  Builder: "🏗️",
  Architect: "📐",
  "Interior Designer": "🎨",
  "Landscape Architect": "🌿",
};

const trendingCategories = ["All", "Villas", "Interiors", "Modern Facades"];

export default function BuildersPage() {
  const builders = useBuilderStore((s) => s.builders);
  const getFeaturedBuilders = useBuilderStore((s) => s.getFeaturedBuilders);
  const getByCategory = useBuilderStore((s) => s.getByCategory);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("All Locations");
  const [searchBudget, setSearchBudget] = useState("any");
  const [searchType, setSearchType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProfessionalCategory | "All">("All");
  const [trendingFilter, setTrendingFilter] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const featuredBuilders = useMemo(() => {
    const featured = getFeaturedBuilders();
    if (selectedCategory === "All") return featured;
    return featured.filter((b) => b.category === selectedCategory);
  }, [getFeaturedBuilders, selectedCategory]);

  const filteredBuilders = useMemo(() => {
    let result = getByCategory(selectedCategory);
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((b) => 
        b.name?.toLowerCase().includes(q) || 
        b.specializations?.some((s) => s.toLowerCase().includes(q))
      );
    }
    return result;
  }, [getByCategory, selectedCategory, searchQuery]);

  // Gather all projects for trending
  const allProjects = useMemo(() => {
    return filteredBuilders.flatMap((b) =>
      b.projects.map((p) => ({ ...p, builderName: b.name, builderId: b.id }))
    );
  }, [filteredBuilders]);

  const trendingProjects = useMemo(() => {
    let projects = [...allProjects].sort((a, b) => b.views - a.views);
    if (trendingFilter === "Villas") {
      projects = projects.filter((p) => p.type === "Villa");
    } else if (trendingFilter === "Interiors") {
      projects = projects.filter((p) => p.type === "Apartment");
    } else if (trendingFilter === "Modern Facades") {
      projects = projects.filter((p) => ["House", "Commercial", "Office"].includes(p.type));
    }
    return projects.slice(0, 12);
  }, [allProjects, trendingFilter]);

  const scrollCarousel = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getCategoryLabel = (count: number) => {
    if (selectedCategory === "All") return `${count} professionals available`;
    return `${count} ${selectedCategory.toLowerCase()}${count !== 1 ? "s" : ""} available`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-24">
        <div className="section-container">
          <div className="skeleton h-12 w-64 mb-4" />
          <div className="skeleton h-6 w-96 mb-12" />
          <div className="skeleton h-20 w-full rounded-[1.5rem] mb-16" />
          <SkeletonLoader variant="grid" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Navbar />
      {/* Hero Header */}
      <div className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
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

        <div className="relative z-10 section-container flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-gray-800 uppercase">
              Pro Directory
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading italic text-6xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-[-0.03em] text-gray-900 mb-6">
              Find Your Professional
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
              Discover top builders, architects, interior designers, and landscape architects.
              Explore their portfolios, compare costs, and find the perfect partner for your project.
            </p>
          </motion.div>

          {/* ── Category Filter Tabs ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex justify-center"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 translate-y-[-2px]"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px]"
                  }`}
                >
                  <span className="text-[16px] leading-none">{categoryIcons[cat]}</span>
                  {cat === "All" ? "All Professionals" : `${cat}s`}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Glassmorphism Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-search rounded-[1.5rem] p-4 sm:p-6"
          >
            {/* Search Input */}
            <div className="mb-5">
              <label className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 shadow-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Location */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-2 block">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 appearance-none cursor-pointer shadow-sm"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-2 block">
                  Budget
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 appearance-none cursor-pointer shadow-sm"
                >
                  {budgetRanges.map((b) => (
                    <option key={b.id} value={b.id}>{b.label}</option>
                  ))}
                </select>
              </div>

              {/* Project Type */}
              <div>
                <label className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-2 block">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.slice(0, 4).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSearchType(type)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        searchType === type
                          ? "bg-[#F26522] text-white shadow-md shadow-[#F26522]/20"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-container pb-24">
        {/* ─── FEATURED PROFESSIONALS ─── */}
        {featuredBuilders.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F26522]/10 border border-[#F26522]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#F26522]" />
                </div>
                <div>
                  <h2 className="font-heading italic text-[32px] sm:text-[40px] text-gray-900 leading-none mb-1 tracking-tight">
                    Featured {selectedCategory === "All" ? "Professionals" : `${selectedCategory}s`}
                  </h2>
                  <p className="text-[15px] text-gray-500 font-medium">Hand-picked top performers</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="horizontal-scroll flex gap-5 pb-4 -mx-1.5 px-1.5"
            >
              {featuredBuilders.map((builder, i) => (
                <BuilderCard key={builder.id} builder={builder} index={i} variant="horizontal" />
              ))}
            </div>
          </motion.section>
        )}

        {/* ─── TRENDING PROJECTS ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8 mt-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="font-heading italic text-[32px] sm:text-[40px] text-gray-900 leading-none mb-1 tracking-tight">Trending Projects</h2>
                <p className="text-[15px] text-gray-500 font-medium">Most popular designs right now</p>
              </div>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {trendingCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setTrendingFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 ${
                  trendingFilter === cat
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 translate-y-[-2px]"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md hover:translate-y-[-2px]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <PortfolioGrid projects={trendingProjects} variant="masonry" />
        </motion.section>

        {/* ─── COST ESTIMATOR ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <CostEstimator />
        </motion.section>

        {/* ─── ALL PROFESSIONALS GRID ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-10 mt-12">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="font-heading italic text-[32px] sm:text-[40px] text-gray-900 leading-none mb-1 tracking-tight">
                {selectedCategory === "All" ? "All Professionals" : `All ${selectedCategory}s`}
              </h2>
              <p className="text-[15px] text-gray-500 font-medium">{getCategoryLabel(filteredBuilders.length)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredBuilders.map((builder, i) => (
                <BuilderCard key={builder.id} builder={builder} index={i} variant="grid" />
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
