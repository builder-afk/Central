"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Eye,
  TrendingUp,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  BarChart3,
  Bell,
  Settings,
  Search,
} from "lucide-react";

const metrics = [
  {
    label: "Leads Received",
    value: "24",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    color: "from-blue-500 to-indigo-500",
  },
  {
    label: "Profile Views",
    value: "3,847",
    change: "+28%",
    trend: "up" as const,
    icon: Eye,
    color: "from-violet-500 to-purple-500",
  },
  {
    label: "Quote Conversion",
    value: "68%",
    change: "+5%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Revenue (MTD)",
    value: "₹18.4L",
    change: "-3%",
    trend: "down" as const,
    icon: IndianRupee,
    color: "from-amber-500 to-orange-500",
  },
];

const leads = [
  { id: 1, name: "Priya Sharma", project: "3BHK Villa", budget: "₹80L", status: "new", date: "Today" },
  { id: 2, name: "Rohit Mehta", project: "Penthouse Interior", budget: "₹45L", status: "responded", date: "Today" },
  { id: 3, name: "Anita Desai", project: "Farm House", budget: "₹1.2Cr", status: "quoted", date: "Yesterday" },
  { id: 4, name: "Vikash Kumar", project: "Office Renovation", budget: "₹25L", status: "won", date: "Yesterday" },
  { id: 5, name: "Sunita Patel", project: "Modern Villa", budget: "₹65L", status: "lost", date: "2 days ago" },
  { id: 6, name: "Arun Nair", project: "Apartment Interior", budget: "₹18L", status: "new", date: "2 days ago" },
];

const activity = [
  { id: 1, text: "New quote request from Priya Sharma for 3BHK Villa", time: "2 hours ago", icon: FileText },
  { id: 2, text: "Rohit Mehta viewed your portfolio", time: "4 hours ago", icon: Eye },
  { id: 3, text: "New message from Anita Desai", time: "5 hours ago", icon: MessageSquare },
  { id: 4, text: "Quote accepted by Vikash Kumar — ₹25L project", time: "1 day ago", icon: CheckCircle2 },
  { id: 5, text: "Your profile was featured in Top Builders", time: "2 days ago", icon: TrendingUp },
];

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: "bg-blue-50", text: "text-blue-700", label: "New" },
  responded: { bg: "bg-amber-50", text: "text-amber-700", label: "Responded" },
  quoted: { bg: "bg-violet-50", text: "text-violet-700", label: "Quoted" },
  won: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Won" },
  lost: { bg: "bg-red-50", text: "text-red-700", label: "Lost" },
};

export default function BuilderDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#fafafa] font-body">
      {/* Sidebar-like Top Nav */}
      <div className="bg-white border-b border-slate-100">
        <div className="section-container flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link
              href="/builders"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-900" />
              <h1 className="text-sm font-semibold text-slate-900">Builder Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-xs font-bold text-white ml-1">
              AK
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-heading italic text-3xl text-slate-900 mb-1">Good evening, Arjun</h2>
          <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening with your business today.</p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="dashboard-metric-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-sm`}>
                  <metric.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  metric.trend === "up" ? "text-emerald-600" : "text-red-500"
                }`}>
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="font-heading italic text-3xl text-slate-900 tracking-[-1px] mb-0.5">
                {metric.value}
              </p>
              <p className="text-xs text-slate-400">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leads Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                  <h3 className="font-heading italic text-xl text-slate-900">Recent Leads</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{leads.length} leads this week</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search leads..."
                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 w-48"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-50">
                      <th className="px-6 py-3 font-semibold">Client</th>
                      <th className="px-6 py-3 font-semibold">Project</th>
                      <th className="px-6 py-3 font-semibold">Budget</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads
                      .filter(
                        (l) =>
                          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.project.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((lead, i) => {
                        const status = statusStyles[lead.status];
                        return (
                          <motion.tr
                            key={lead.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors cursor-pointer"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                  {lead.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <span className="text-sm font-medium text-slate-800">{lead.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{lead.project}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-800">{lead.budget}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${status.bg} ${status.text}`}>
                                {status.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs text-slate-400">{lead.date}</td>
                          </motion.tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div>
            <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-6">
              <h3 className="font-heading italic text-xl text-slate-900 mb-1">Activity</h3>
              <p className="text-xs text-slate-400 mb-6">Recent events</p>

              <div className="space-y-5">
                {activity.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
