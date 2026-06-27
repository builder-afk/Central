"use client";

interface SkeletonLoaderProps {
  variant?: "card" | "profile" | "line" | "circle" | "grid";
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[1.25rem] overflow-hidden border border-slate-100 shadow-sm">
      <div className="skeleton h-48 rounded-none" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-7 w-20 rounded-full" />
          <div className="skeleton h-7 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function SkeletonProfile() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="skeleton h-64 rounded-2xl" />
      {/* Avatar + Name */}
      <div className="flex items-center gap-4 -mt-12 ml-6 relative z-10">
        <div className="skeleton w-24 h-24 rounded-[1.5rem] border-4 border-white" />
        <div className="space-y-2 pt-8">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-32" />
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-[1.25rem]" />
        ))}
      </div>
    </div>
  );
}

function SkeletonLine() {
  return <div className="skeleton h-4 w-full" />;
}

function SkeletonCircle() {
  return <div className="skeleton w-12 h-12 rounded-full" />;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function SkeletonLoader({ variant = "card", count = 1 }: SkeletonLoaderProps) {
  if (variant === "grid") return <SkeletonGrid />;
  if (variant === "profile") return <SkeletonProfile />;

  const Component = {
    card: SkeletonCard,
    line: SkeletonLine,
    circle: SkeletonCircle,
  }[variant];

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Component key={i} />
      ))}
    </>
  );
}
