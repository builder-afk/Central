"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Menu, X } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-space-black">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <Sidebar />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-[-44px] w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <Menu className="w-4 h-4" />
          </button>
          <span className="font-display text-base font-bold text-white">
            HouseVerse<span className="text-electric"> AI</span>
          </span>
        </div>

        <TopBar />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
    </AuthGuard>
  );
}
