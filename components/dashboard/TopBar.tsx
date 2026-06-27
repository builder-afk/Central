"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, Command, Plus } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const user = useAuthStore((s) => s.user);

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-space-black/50 backdrop-blur-sm sticky top-0 z-30">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl flex-1 transition-all ${searchFocused
              ? "bg-white/5 border border-white/10"
              : "bg-white/[0.02] border border-transparent hover:bg-white/5"
            }`}
        >
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects, rooms, or assets..."
            className="bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none flex-1"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-slate-500 font-mono">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/projects/new"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-electric/10 text-electric text-sm font-medium hover:bg-electric/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-electric" />
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl hover:bg-white/5 transition-all">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-electric to-purple flex items-center justify-center text-xs font-bold text-white">
            {user?.avatar || "U"}
          </div>
          <span className="hidden sm:block text-sm text-slate-300 font-medium">
            {user?.name?.split(" ")[0] || "User"}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </header>
  );
}
