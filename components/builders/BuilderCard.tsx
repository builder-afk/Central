"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Builder } from "@/store/useBuilderStore";
import VerifiedBadge from "./VerifiedBadge";

interface BuilderCardProps {
  builder: Builder;
  index?: number;
  variant?: "horizontal" | "grid";
}

export default function BuilderCard({ builder, index = 0, variant = "horizontal" }: BuilderCardProps) {
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
        <Link
          href={`/builders/${builder.id}`}
          className="block bg-white rounded-[1.25rem] overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-xl transition-all duration-400 group"
        >
          {/* Full-width Portfolio Image (Gradient) */}
          <div className={`relative h-44 bg-gradient-to-br ${builder.coverGradient} overflow-hidden`}>
            <div className="absolute inset-0 bg-black/5" />
            <motion.div
              className="absolute inset-0 bg-white/10 mix-blend-overlay"
              animate={{ opacity: isHovered ? 0.4 : 0.2 }}
              transition={{ duration: 0.3 }}
            />
            {/* Starting Price Badge */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm">
              From {builder.startingPrice}
            </div>
            {/* Avatar */}
            <div className="absolute bottom-3 left-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-lg font-heading italic text-white shadow-lg border-2 border-white/80 group-hover:scale-110 transition-transform`}>
                {builder.avatar}
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-heading italic text-xl text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                {builder.name}
              </h3>
              {builder.verified && <VerifiedBadge size="sm" showLabel={false} />}
            </div>

            <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {builder.location}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(builder.rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700">{builder.rating}</span>
              <span className="text-xs text-slate-400">({builder.reviewCount})</span>
            </div>
          </div>
        </Link>
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
      <Link
        href={`/builders/${builder.id}`}
        className="bg-white rounded-[1.25rem] p-6 overflow-hidden relative group block h-full flex flex-col hover:shadow-xl transition-all shadow-sm border border-slate-200/60"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${builder.coverGradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`} />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-2xl font-heading italic text-white shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
              {builder.avatar}
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading italic text-2xl text-slate-900 truncate group-hover:text-blue-600 transition-colors">{builder.name}</h3>
                {builder.verified && <VerifiedBadge size="sm" showLabel={false} />}
              </div>
              <p className="text-sm text-slate-500">{builder.company}</p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{builder.tagline}</p>

          <div className="flex-1" />

          {/* Price + Rating Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-semibold text-slate-800">{builder.rating}</span>
              <span className="text-xs text-slate-400">({builder.reviewCount})</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">
              From {builder.startingPrice}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
