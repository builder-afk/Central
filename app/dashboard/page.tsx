"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  Eye,
  Users,
  TrendingUp,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useProjectStore } from "@/store/useProjectStore";
import ProjectCard from "@/components/dashboard/ProjectCard";

const stats = [
  {
    label: "Total Projects",
    value: "6",
    change: "+2 this month",
    icon: FolderOpen,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    label: "Active Tours",
    value: "4",
    change: "2 published",
    icon: Eye,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    label: "Total Views",
    value: "8,078",
    change: "+24% vs last month",
    icon: TrendingUp,
    gradient: "from-emerald to-teal-500",
  },
  {
    label: "Team Members",
    value: "5",
    change: "3 active now",
    icon: Users,
    gradient: "from-amber-500 to-orange-500",
  },
];

export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Welcome back — here&apos;s what&apos;s happening with your projects.
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card rounded-xl p-5 interactive-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </div>
            <p className="font-display text-2xl font-bold text-white mb-0.5">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Projects Section */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-lg font-semibold text-white">
          Recent Projects
        </h2>
        <button className="text-sm text-electric hover:text-electric-light transition-colors">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
