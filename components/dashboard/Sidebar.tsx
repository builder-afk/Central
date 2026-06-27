"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  FolderOpen,
  Sparkles,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  ChevronLeft,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const navItems = [
  { icon: FolderOpen, label: "Projects", href: "/dashboard" },
  { icon: Sparkles, label: "AI Designer", href: "/dashboard/ai-designer" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col glass-dark transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric to-purple flex items-center justify-center shrink-0 shadow-glow">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-display text-lg font-bold text-white truncate">
              HouseVerse<span className="text-electric"> AI</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" || pathname === "/dashboard/projects/new"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-electric/10 text-electric"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 ${
                  isActive
                    ? "text-electric"
                    : "text-slate-500 group-hover:text-white"
                }`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-electric" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all w-full">
          <HelpCircle className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Help & Support</span>}
        </button>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-purple flex items-center justify-center text-xs font-bold text-white shrink-0">
            {user?.avatar || "U"}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white font-medium truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.role || "Member"}
              </p>
            </div>
          )}
          {!collapsed && (
            <Link href="/" className="text-slate-500 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-lg"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={`w-3.5 h-3.5 transition-transform ${
            collapsed ? "rotate-180" : ""
          }`}
        />
      </button>
    </aside>
  );
}
