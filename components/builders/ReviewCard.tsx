"use client";

import { Star } from "lucide-react";
import { BuilderReview } from "@/store/useBuilderStore";

interface ReviewCardProps {
  review: BuilderReview;
  index?: number;
}

export default function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  return (
    <div
      className="bg-white/70 backdrop-blur-sm border border-slate-100 rounded-[1.25rem] p-6 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* User Info */}
      <div className="flex items-center gap-3.5 mb-4">
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.userGradient} flex items-center justify-center text-sm font-semibold text-white shadow-md`}
        >
          {review.userInitials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{review.userName}</p>
          <p className="text-xs text-slate-400">{review.date}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= review.rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
        {review.review}
      </p>

      {/* Project Type Pill */}
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-medium text-slate-500">
        {review.projectType}
      </div>
    </div>
  );
}
