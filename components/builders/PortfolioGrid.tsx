"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MapPin, Eye, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { BuilderProject } from "@/store/useBuilderStore";

interface PortfolioGridProps {
  projects: BuilderProject[];
  variant?: "masonry" | "standard";
}

function ProjectItem({ project, index, onSelect }: { project: BuilderProject; index: number; onSelect: (project: BuilderProject) => void }) {
  const [liked, setLiked] = useState(false);
  // Vary heights for masonry effect
  const heights = ["h-56", "h-72", "h-64", "h-80", "h-56", "h-68"];
  const height = heights[index % heights.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div className={`relative ${height} bg-gradient-to-br ${project.gradient} rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300`}>
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay opacity-20 group-hover:opacity-40 transition-opacity" />

        {/* Icon */}
        <Building2 className="absolute inset-0 m-auto w-10 h-10 text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-300" />

        {/* Like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white hover:scale-110 transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "text-rose-500 fill-rose-500" : "text-slate-500"
            }`}
          />
        </button>

        {/* Bottom overlay info */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="text-white font-semibold text-sm mb-1">{project.name}</h4>
          <div className="flex items-center gap-3 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {project.views.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/85 backdrop-blur-md text-[11px] font-medium text-slate-700 shadow-sm">
          {project.type}
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({ project, onClose, onNext, onPrev }: { project: BuilderProject; onClose: () => void; onNext: () => void; onPrev: () => void; }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="lightbox-overlay flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all z-20"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Project Visual */}
        <div className={`h-72 sm:h-96 bg-gradient-to-br ${project.gradient} relative`}>
          <div className="absolute inset-0 bg-black/10" />
          <Building2 className="absolute inset-0 m-auto w-16 h-16 text-white/40" />
        </div>

        {/* Info */}
        <div className="p-8">
          <h2 className="font-heading italic text-3xl text-slate-900 mb-2">{project.name}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {project.location}
            </span>
            <span>{project.type}</span>
            <span>{project.floors} floor{project.floors > 1 ? "s" : ""}</span>
            <span>{project.rooms} rooms</span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {project.views.toLocaleString()} views
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              project.status === "completed"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}>
              {project.status === "completed" ? "✓ Completed" : "🔨 In Progress"}
            </span>
            {project.tourAvailable && (
              <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
                3D Tour Available
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioGrid({ projects, variant = "masonry" }: PortfolioGridProps) {
  const [selectedProject, setSelectedProject] = useState<BuilderProject | null>(null);

  const handleSelect = useCallback((project: BuilderProject) => {
    setSelectedProject(project);
  }, []);

  const selectedIndex = selectedProject ? projects.findIndex(p => p.id === selectedProject.id) : -1;

  const handleNext = useCallback(() => {
    if (selectedIndex >= 0) {
      const nextIndex = (selectedIndex + 1) % projects.length;
      setSelectedProject(projects[nextIndex]);
    }
  }, [selectedIndex, projects]);

  const handlePrev = useCallback(() => {
    if (selectedIndex >= 0) {
      const prevIndex = (selectedIndex - 1 + projects.length) % projects.length;
      setSelectedProject(projects[prevIndex]);
    }
  }, [selectedIndex, projects]);

  return (
    <>
      <div className={variant === "masonry" ? "masonry-grid" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
        {projects.map((project, i) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={i}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}
