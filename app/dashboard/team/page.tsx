"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  MoreVertical,
  Search,
  Crown,
  Eye,
  Edit3,
} from "lucide-react";

const teamMembers = [
  {
    id: "1",
    name: "Kunal Verma",
    email: "kunal@houseverse.ai",
    role: "Admin",
    avatar: "KV",
    gradient: "from-electric to-purple",
    status: "online",
    projects: 6,
    lastActive: "Active now",
  },
  {
    id: "2",
    name: "Ananya Mehta",
    email: "ananya@studio-am.com",
    role: "Editor",
    avatar: "AM",
    gradient: "from-purple-500 to-pink-500",
    status: "online",
    projects: 4,
    lastActive: "2 min ago",
  },
  {
    id: "3",
    name: "Rajesh Sharma",
    email: "rajesh@prestige.com",
    role: "Editor",
    avatar: "RS",
    gradient: "from-blue-500 to-cyan-500",
    status: "online",
    projects: 3,
    lastActive: "15 min ago",
  },
  {
    id: "4",
    name: "David Chen",
    email: "david@chen-interiors.com",
    role: "Viewer",
    avatar: "DC",
    gradient: "from-emerald to-teal-500",
    status: "offline",
    projects: 2,
    lastActive: "3 hours ago",
  },
  {
    id: "5",
    name: "Priya Nair",
    email: "priya@lt-construction.com",
    role: "Editor",
    avatar: "PN",
    gradient: "from-amber-500 to-orange-500",
    status: "offline",
    projects: 2,
    lastActive: "1 day ago",
  },
  {
    id: "6",
    name: "Michael Torres",
    email: "michael.t@gmail.com",
    role: "Client",
    avatar: "MT",
    gradient: "from-rose-500 to-pink-500",
    status: "offline",
    projects: 1,
    lastActive: "5 days ago",
  },
];

const roleIcons: Record<string, typeof Shield> = {
  Admin: Crown,
  Editor: Edit3,
  Viewer: Eye,
  Client: Users,
};

const roleBadgeColors: Record<string, string> = {
  Admin: "bg-electric/10 text-electric",
  Editor: "bg-purple/10 text-purple-light",
  Viewer: "bg-emerald/10 text-emerald",
  Client: "bg-amber-500/10 text-amber-400",
};

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);

  const filtered = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">
            Team
          </h1>
          <p className="text-slate-500 text-sm">
            Manage team members and permissions.
          </p>
        </div>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6 gradient-border"
        >
          <h3 className="font-display text-base font-semibold text-white mb-4">
            Invite team member
          </h3>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="colleague@company.com"
                className="input-field !pl-10"
              />
            </div>
            <select className="input-field !w-auto !px-4 appearance-none cursor-pointer">
              <option>Editor</option>
              <option>Viewer</option>
              <option>Client</option>
            </select>
            <button className="btn-primary text-sm !py-2.5 !px-5">
              <span>Send Invite</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Search & Stats */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="input-field !pl-10"
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>
            <span className="text-white font-semibold">{teamMembers.length}</span> members
          </span>
          <span>
            <span className="text-emerald font-semibold">
              {teamMembers.filter((m) => m.status === "online").length}
            </span>{" "}
            online
          </span>
        </div>
      </div>

      {/* Team Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                Member
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                Role
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                Projects
              </th>
              <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                Last Active
              </th>
              <th className="w-10 px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member, i) => {
              const RoleIcon = roleIcons[member.role] || Shield;
              return (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${member.gradient} flex items-center justify-center text-xs font-bold text-white`}
                        >
                          {member.avatar}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-space-black ${
                            member.status === "online"
                              ? "bg-emerald"
                              : "bg-slate-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${roleBadgeColors[member.role]}`}
                    >
                      <RoleIcon className="w-3 h-3" />
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 hidden sm:table-cell">
                    {member.projects}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
