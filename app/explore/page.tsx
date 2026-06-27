"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  X,
  Building2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Calendar,
  CheckCircle,
  Eye
} from "lucide-react";
import { useProjectStore, Project } from "@/store/useProjectStore";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";

const locations = [
  "All Locations",
  "Mumbai, India",
  "Bangalore, India",
  "Pune, India",
  "Goa, India",
  "Delhi NCR, India",
];

const budgetRanges = [
  { id: "any", label: "Any Budget" },
  { id: "under-1cr", label: "Under ₹1Cr" },
  { id: "1cr-3cr", label: "₹1Cr — ₹3Cr" },
  { id: "above-3cr", label: "Above ₹3Cr" },
];

const projectTypes = [
  "All",
  "House",
  "Villa",
  "Apartment",
  "Office",
  "Commercial",
];

export default function ExplorePage() {
  const projects = useProjectStore((s) => s.projects);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState("All Locations");
  const [searchBudget, setSearchBudget] = useState("any");
  const [searchType, setSearchType] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Booking Modal State
  const [bookingProject, setBookingProject] = useState<Project | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const featuredProjects = useMemo(() => {
    return [...projects].sort((a, b) => b.views - a.views).slice(0, 6);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        (searchType === "All" || project.type.toLowerCase() === searchType.toLowerCase()) &&
        (searchLocation === "All Locations" || project.location.includes(searchLocation.split(",")[0]))
    );
  }, [projects, searchType, searchLocation]);

  const scrollCarousel = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setBookingProject(null);
      setIsBooked(false);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-24">
        <div className="section-container">
          <div className="skeleton h-12 w-64 mb-4 bg-slate-200 animate-pulse rounded-md" />
          <div className="skeleton h-6 w-96 mb-12 bg-slate-200 animate-pulse rounded-md" />
          <div className="skeleton h-20 w-full rounded-[1.5rem] mb-16 bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Navbar />

      {/* Hero Header */}
      <div className="relative overflow-hidden pt-24 pb-16">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />

        <div className="relative section-container">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading italic text-6xl sm:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] text-slate-900 mb-4">
              Explore Properties
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mb-10 font-light leading-relaxed">
              Discover premium flats and villas. Take immersive 360° virtual tours, compare specs,
              and book an on-site visit for your dream property.
            </p>
          </motion.div>

          {/* Glassmorphism Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-search rounded-[1.5rem] p-4 sm:p-6"
          >
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
                  Property Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.slice(0, 4).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSearchType(type)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${searchType === type
                          ? "bg-slate-900 text-white shadow-md"
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
        {/* ─── FEATURED PROPERTIES ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h2 className="font-heading italic text-3xl text-slate-900">Featured Properties</h2>
                <p className="text-sm text-slate-500">Hand-picked top listings</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="horizontal-scroll flex gap-5 pb-4 -mx-1.5 px-1.5 overflow-x-auto no-scrollbar"
          >
            {featuredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                variant="horizontal"
                onBook={() => setBookingProject(project)}
              />
            ))}
          </div>
        </motion.section>

        {/* ─── ALL PROPERTIES GRID ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h2 className="font-heading italic text-3xl text-slate-900">All Properties</h2>
              <p className="text-sm text-slate-500">{filteredProjects.length} properties available</p>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    variant="grid"
                    onBook={() => setBookingProject(project)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[1.25rem] border border-slate-200/60 shadow-sm">
              <p className="text-slate-500 text-[16px] font-medium">
                No properties found matching your criteria.
              </p>
            </div>
          )}
        </motion.section>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setBookingProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[24px] p-6 sm:p-8 w-full max-w-md shadow-2xl overflow-hidden font-body"
            >
              <button
                onClick={() => setBookingProject(null)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {isBooked ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="font-heading italic text-3xl text-slate-900 mb-2">Visit Requested!</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-[260px]">
                    The builder will contact you shortly to confirm your on-site visit for {bookingProject.name}.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-heading italic text-3xl text-slate-900 mb-2 pr-8">Book On-Site Visit</h3>
                  <p className="text-[14px] text-slate-500 font-light mb-8">
                    Schedule a time to see {bookingProject.name} in person.
                  </p>

                  <form onSubmit={handleBookVisit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Your Name</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-400 transition-all rounded-xl px-4 py-3 text-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-400 transition-all rounded-xl px-4 py-3 text-sm text-slate-900 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Date</label>
                        <input
                          required
                          type="date"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-400 transition-all rounded-xl px-4 py-3 text-sm text-slate-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Time</label>
                        <input
                          required
                          type="time"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-400 transition-all rounded-xl px-4 py-3 text-sm text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-colors rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 shadow-md mt-4"
                    >
                      <span className="text-sm font-medium">Request Visit</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: "horizontal" | "grid";
  onBook: () => void;
}

function ProjectCard({ project, index = 0, variant = "horizontal", onBook }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="shrink-0 w-[320px] sm:w-[340px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="block bg-white rounded-[1.25rem] overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-xl transition-all duration-400 group h-full flex flex-col"
        >
          {/* Full-width Image */}
          <Link href={`/tour/${project.id}`} className="block relative h-44 bg-slate-100 overflow-hidden">
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            )}
            <div className="absolute inset-0 bg-black/5" />
            <motion.div
              className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"
              animate={{ opacity: isHovered ? 0.4 : 0.2 }}
              transition={{ duration: 0.3 }}
            />

            {/* Property Type Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-lg px-3 py-1.5 text-[10px] font-semibold text-slate-900 shadow-sm uppercase tracking-widest">
              {project.type}
            </div>

            {/* Book Visit Button Overlay */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onBook();
              }}
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-slate-900 hover:text-white backdrop-blur-md rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" /> Book
            </button>
          </Link>

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-1">
            <Link href={`/tour/${project.id}`} className="block mb-1.5">
              <h3 className="font-heading italic text-xl text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                {project.name}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {project.location}
            </p>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed flex-1">
              {project.description}
            </p>

            {/* Views Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                <Eye className="w-3.5 h-3.5" />
                <span>{project.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <div
        className="bg-white rounded-[1.25rem] p-6 overflow-hidden relative group block h-full flex flex-col hover:shadow-xl transition-all shadow-sm border border-slate-200/60"
      >
        <Link href={`/tour/${project.id}`} className="block relative aspect-[4/3] rounded-[16px] overflow-hidden bg-slate-100 mb-5 border border-slate-100">
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          )}

          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-lg px-3 py-1.5 text-[10px] font-semibold text-slate-900 shadow-sm uppercase tracking-widest">
            {project.type}
          </div>
        </Link>

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <Link href={`/tour/${project.id}`} className="block mb-2">
            <h3 className="font-heading italic text-2xl text-slate-900 truncate group-hover:text-blue-600 transition-colors">{project.name}</h3>
          </Link>

          <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {project.location}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-600 mb-5 line-clamp-2 leading-relaxed flex-1">{project.description}</p>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                <Eye className="w-3.5 h-3.5" />
                <span>{project.views} views</span>
              </div>
            </div>

            <button
              onClick={onBook}
              className="w-full bg-slate-50 hover:bg-slate-900 text-slate-900 hover:text-white transition-colors rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 border border-slate-200"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold">Book Visit</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
