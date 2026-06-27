"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { BuilderProject } from "@/store/useBuilderStore";

interface ProjectCarouselProps {
  projects: BuilderProject[];
  autoAdvance?: boolean;
  interval?: number;
}

export default function ProjectCarousel({
  projects,
  autoAdvance = true,
  interval = 5000,
}: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    if (!autoAdvance || projects.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoAdvance, interval, next, projects.length]);

  const project = projects[current];
  if (!project) return null;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[560px] rounded-[2rem] overflow-hidden group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={project.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay opacity-20" />
          <Building2 className="absolute inset-0 m-auto w-20 h-20 text-white/20" />
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Project info overlay */}
      <div className="absolute bottom-0 inset-x-0 p-8 sm:p-10 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-medium text-white">
                {project.type}
              </span>
              {project.tourAvailable && (
                <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-xs font-medium text-white">
                  3D Tour
                </span>
              )}
            </div>
            <h2 className="font-heading italic text-3xl sm:text-4xl text-white mb-1.5 drop-shadow-lg">
              {project.name}
            </h2>
            <p className="text-white/70 text-sm">
              {project.location} · {project.floors} floors · {project.rooms} rooms
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {projects.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/25 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/25 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {projects.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
