"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Eye,
  Clock,
  MousePointer,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";

const overviewStats = [
  {
    label: "Total Views",
    value: "12,847",
    change: "+24.5%",
    trending: "up",
    icon: Eye,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    label: "Avg. Duration",
    value: "4m 32s",
    change: "+12.1%",
    trending: "up",
    icon: Clock,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    label: "Click Events",
    value: "3,456",
    change: "-3.2%",
    trending: "down",
    icon: MousePointer,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    label: "Unique Visitors",
    value: "8,234",
    change: "+18.7%",
    trending: "up",
    icon: Globe,
    gradient: "from-emerald to-teal-500",
  },
];

const topProjects = [
  { name: "Sunrise Villa", views: 3450, duration: "5m 12s", engagement: 92 },
  { name: "Heritage Commercial Center", views: 2100, duration: "4m 45s", engagement: 87 },
  { name: "Metro Heights", views: 856, duration: "3m 22s", engagement: 78 },
  { name: "Lakeside Villa", views: 3450, duration: "6m 01s", engagement: 95 },
  { name: "TechHub Office", views: 432, duration: "2m 58s", engagement: 72 },
];

const deviceBreakdown = [
  { device: "Desktop", icon: Monitor, percentage: 54, color: "bg-electric" },
  { device: "Mobile", icon: Smartphone, percentage: 34, color: "bg-purple" },
  { device: "Tablet", icon: Tablet, percentage: 12, color: "bg-cyan-500" },
];

const topRooms = [
  { name: "Living Room", views: 4320, percentage: 34 },
  { name: "Master Bedroom", views: 2890, percentage: 22 },
  { name: "Kitchen", views: 2145, percentage: 17 },
  { name: "Bathroom", views: 1780, percentage: 14 },
  { name: "Balcony", views: 1712, percentage: 13 },
];

const geoData = [
  { country: "India", visitors: 4520, percentage: 55 },
  { country: "United States", visitors: 1640, percentage: 20 },
  { country: "UAE", visitors: 820, percentage: 10 },
  { country: "United Kingdom", visitors: 574, percentage: 7 },
  { country: "Singapore", visitors: 410, percentage: 5 },
  { country: "Others", visitors: 270, percentage: 3 },
];

// Simple bar chart visualization using CSS
function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((val, i) => (
        <div
          key={i}
          className="flex-1 bg-electric/30 rounded-t hover:bg-electric/50 transition-colors"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Analytics
          </h1>
          <p className="text-slate-500 text-sm">
            Track engagement, views, and user behavior across your tours.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["7d", "30d", "90d", "1y"].map((period, i) => (
            <button
              key={period}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                i === 1
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {overviewStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trending === "up" ? "text-emerald" : "text-red-400"
                }`}
              >
                {stat.trending === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-white mb-0.5">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Views Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-base font-semibold text-white">
              Views Over Time
            </h2>
            <BarChart3 className="w-4 h-4 text-slate-500" />
          </div>
          <MiniBarChart
            data={[320, 450, 380, 520, 480, 610, 550, 720, 680, 890, 780, 950, 1020, 880, 1100, 960, 1200, 1050, 1340, 1180, 1420, 1290, 1500, 1380, 1600, 1450, 1720, 1580, 1800, 1650]}
          />
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
            <span>May 1</span>
            <span>May 15</span>
            <span>May 30</span>
          </div>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-6">
            Devices
          </h2>
          <div className="space-y-4">
            {deviceBreakdown.map((d) => (
              <div key={d.device}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <d.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{d.device}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {d.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${d.color} rounded-full transition-all duration-700`}
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-4">
            Top Projects
          </h2>
          <div className="space-y-3">
            {topProjects.map((project, i) => (
              <div
                key={project.name}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
              >
                <span className="text-xs text-slate-600 font-mono w-5">
                  #{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                    {project.name}
                  </p>
                  <p className="text-xs text-slate-600">
                    {project.views.toLocaleString()} views · {project.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald">
                    {project.engagement}%
                  </p>
                  <p className="text-[10px] text-slate-600">engagement</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Room Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-4">
            Room Engagement
          </h2>
          <div className="space-y-3">
            {topRooms.map((room) => (
              <div key={room.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-300">{room.name}</span>
                  <span className="text-xs text-slate-500">
                    {room.views.toLocaleString()} views
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-electric to-purple rounded-full"
                    style={{ width: `${room.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-4">
            Visitor Locations
          </h2>
          <div className="space-y-3">
            {geoData.map((geo) => (
              <div
                key={geo.country}
                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-sm text-slate-300">{geo.country}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {geo.visitors.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-white w-10 text-right">
                    {geo.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
