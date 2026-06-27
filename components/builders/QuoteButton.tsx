"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, FileText } from "lucide-react";

interface QuoteButtonProps {
  builderId: string;
  builderName: string;
  onChatClick?: () => void;
}

export default function QuoteButton({ builderId, builderName, onChatClick }: QuoteButtonProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.5 }}
      className="sticky-cta"
    >
      <div className="section-container flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500 hidden sm:block">
          Interested in working with <span className="font-semibold text-slate-800">{builderName}</span>?
        </p>
        <div className="flex items-center gap-3 ml-auto">
          {onChatClick ? (
            <button
              onClick={onChatClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-700 border border-slate-200 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Chat Now
            </button>
          ) : (
            <Link
              href={`/builders/${builderId}/chat`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-700 border border-slate-200 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Chat Now
            </Link>
          )}
          <Link
            href={`/builders/${builderId}/quote`}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
          >
            <FileText className="w-4 h-4" />
            Request Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
