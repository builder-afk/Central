"use client";

import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function VerifiedBadge({ size = "md", showLabel = true }: VerifiedBadgeProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const containerClasses = {
    sm: "px-2 py-1 text-[10px] gap-1",
    md: "px-2.5 py-1.5 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-1.5",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-semibold animate-verified-pulse ${containerClasses[size]}`}
    >
      <BadgeCheck className={`${sizeClasses[size]} animate-verified-shimmer`} />
      {showLabel && <span>Verified</span>}
    </div>
  );
}
