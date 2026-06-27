"use client";

import Link from "next/link";
import { Project } from "@/store/useProjectStore";
import {
  Eye,
  MoreVertical,
  Building2,
  Home,
  Building,
  Store,
  Layers,
} from "lucide-react";

const typeIcons: Record<string, typeof Building2> = {
  house: Home,
  villa: Building2,
  apartment: Building,
  office: Layers,
  commercial: Store,
};

const typeGradients: Record<string, string> = {
  house: "from-blue-500 to-cyan-500",
  villa: "from-purple-500 to-pink-500",
  apartment: "from-amber-500 to-orange-500",
  office: "from-emerald to-teal-500",
  commercial: "from-rose-500 to-red-500",
};

const statusColors: Record<string, string> = {
  draft: "bg-slate-500/10 text-slate-400",
  "in-progress": "bg-amber-500/10 text-amber-400",
  review: "bg-purple/10 text-purple-light",
  published: "bg-emerald/10 text-emerald",
};

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = typeIcons[project.type] || Building2;
  const gradient = typeGradients[project.type] || "from-electric to-purple";

  return (
    <Link
      href={`/viewer/${project.id}`}
      className="glass-card rounded-2xl overflow-hidden interactive-card group block"
    >
      {/* Thumbnail Area */}
      <div
        className={`relative h-40 bg-gradient-to-br ${gradient} bg-opacity-10 flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 bg-space-black/40" />
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <Icon className="relative w-12 h-12 text-white/30 group-hover:text-white/50 transition-colors group-hover:scale-110 duration-300" />

        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/70 hover:text-white"
            onClick={(e) => e.preventDefault()}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[project.status]}`}
          >
            {project.status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
        </div>

        {/* Views */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-white/60">
          <Eye className="w-3.5 h-3.5" />
          {project.views.toLocaleString()}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-white group-hover:text-electric transition-colors truncate">
            {project.name}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{project.floors} floors</span>
            <span>·</span>
            <span>{project.rooms} rooms</span>
          </div>

          {/* Team Avatars */}
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-electric/50 to-purple/50 border border-space-black flex items-center justify-center text-[9px] font-semibold text-white"
                title={member.name}
              >
                {member.avatar}
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-white/10 border border-space-black flex items-center justify-center text-[9px] text-slate-400">
                +{project.team.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
