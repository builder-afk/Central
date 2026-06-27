"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, X, Star, TrendingUp, Users, Award, ArrowUpRight } from "lucide-react";

interface Story {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  metric: string;
  metricLabel: string;
  rating: number;
  accent: string;
  accentLight: string;
  accentBorder: string;
  gridArea: string;
}

const stories: Story[] = [
  {
    name: "Rajesh Sharma",
    role: "Real Estate Developer",
    company: "Prestige Group",
    quote:
      "HouseVerse AI transformed how we sell pre-construction projects. Buyers walk through properties before a single brick is laid. Conversion rate jumped 40%. The immersive experience makes buyers confident about their purchase decisions even before the project is completed.",
    avatar: "RS",
    metric: "+40%",
    metricLabel: "Conversion Rate",
    rating: 5,
    accent: "#171717",
    accentLight: "rgba(80, 55, 43, 0.06)",
    accentBorder: "rgba(80, 55, 43, 0.12)",
    gridArea: "1 / 1 / 3 / 3",
  },
  {
    name: "Ananya Mehta",
    role: "Principal Architect",
    company: "Studio AM Design",
    quote:
      "I used to spend weeks creating 3D renders. Now I upload a floor plan and have an immersive walkthrough in minutes. My clients are blown away every single time. It's revolutionized our design presentation workflow completely.",
    avatar: "AM",
    metric: "10x",
    metricLabel: "Faster Renders",
    rating: 5,
    accent: "#F26522",
    accentLight: "rgba(242, 101, 34, 0.06)",
    accentBorder: "rgba(242, 101, 34, 0.12)",
    gridArea: "1 / 3 / 2 / 5",
  },
  {
    name: "Priya Kapoor",
    role: "VP Sales",
    company: "Lodha Group",
    quote:
      "Our NRI clients can now tour properties from anywhere in the world. International sales increased by 65% within the first quarter of implementing HouseVerse. The ROI has been extraordinary.",
    avatar: "PK",
    metric: "+65%",
    metricLabel: "NRI Sales",
    rating: 5,
    accent: "#059669",
    accentLight: "rgba(5, 150, 105, 0.06)",
    accentBorder: "rgba(5, 150, 105, 0.12)",
    gridArea: "2 / 3 / 3 / 4",
  },
  {
    name: "David Chen",
    role: "Interior Designer",
    company: "Chen Interiors",
    quote:
      "The AI interior designer is magical. I describe a mood and it stages the entire room. The material editor lets me swap finishes in real-time during client presentations. Game changer for our studio.",
    avatar: "DC",
    metric: "95%",
    metricLabel: "Client Approval",
    rating: 4,
    accent: "#8b5cf6",
    accentLight: "rgba(139, 92, 246, 0.06)",
    accentBorder: "rgba(139, 92, 246, 0.12)",
    gridArea: "2 / 4 / 3 / 5",
  },
];

// Marquee testimonials — continuously scrolling
const marqueeTestimonials = [
  {
    name: "Vikram Patel",
    company: "PropTech Solutions",
    quote: "Integration was seamless. API documentation is excellent and rendering quality rivals dedicated CGI studios.",
    metric: "3 days",
    metricLabel: "to integrate",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    company: "DLF Luxury",
    quote: "Social media engagement tripled after sharing HouseVerse walkthrough clips. The visual quality drives incredible organic reach.",
    metric: "3x",
    metricLabel: "engagement",
    rating: 5,
  },
  {
    name: "Arjun Reddy",
    company: "RE/MAX India",
    quote: "Clients spend 4x more time on listings with virtual tours. It filters serious buyers and saves everyone time.",
    metric: "4x",
    metricLabel: "time on listing",
    rating: 4,
  },
  {
    name: "Meera Joshi",
    company: "Home Buyer, Mumbai",
    quote: "I bought my dream flat entirely through virtual tours. Saved weeks of site visits — I knew exactly what I was getting.",
    metric: "₹2.1Cr",
    metricLabel: "purchased via VR",
    rating: 5,
  },
  {
    name: "Karan Singh",
    company: "Godrej Properties",
    quote: "We've standardized HouseVerse across all our projects. The consistency and quality of tours is unmatched in the market.",
    metric: "12",
    metricLabel: "projects live",
    rating: 5,
  },
  {
    name: "Nisha Agrawal",
    company: "Century Real Estate",
    quote: "The analytics dashboard shows exactly which rooms buyers are most interested in. Data-driven selling at its finest.",
    metric: "87%",
    metricLabel: "data utilization",
    rating: 5,
  },
  {
    name: "Rohan Desai",
    company: "Sobha Developers",
    quote: "Pre-sales jumped significantly once buyers could tour unbuilt floors. The AI visualization is incredibly realistic.",
    metric: "+55%",
    metricLabel: "pre-sales lift",
    rating: 5,
  },
  {
    name: "Aditi Rao",
    company: "Architect, Bangalore",
    quote: "HouseVerse replaced our entire render farm. Faster, cheaper, and clients can walk through designs in real-time.",
    metric: "80%",
    metricLabel: "cost saved",
    rating: 4,
  },
];

const stats = [
  { icon: TrendingUp, value: "40%", label: "Avg. conversion lift" },
  { icon: Users, value: "200+", label: "Builders served" },
  { icon: Award, value: "4.9/5", label: "Average rating" },
];

function MarqueeCard({
  testimonial,
}: {
  testimonial: (typeof marqueeTestimonials)[0];
}) {
  return (
    <div className="shrink-0 w-[300px] sm:w-[340px] bg-white rounded-2xl p-5 sm:p-6 border border-[#171717]/8 shadow-[0px_1px_2px_#00000006] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default group">
      {/* Metric */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-[24px] font-bold text-[#171717] tracking-tight">
          {testimonial.metric}
        </span>
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#171717]/40">
          {testimonial.metricLabel}
        </span>
      </div>

      {/* Quote */}
      <p className="text-[13px] sm:text-[14px] text-[#171717]/60 leading-relaxed mb-4 line-clamp-3">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#faf5f0] border border-[#171717]/8 flex items-center justify-center text-[11px] font-bold text-[#171717]">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#171717]">
              {testimonial.name}
            </p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#171717]/35">
              {testimonial.company}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CustomerStories() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  // Pause marquee on hover
  const [paused, setPaused] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="relative bg-[#fafafa] pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden border-t border-[#ebebeb]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Badge Row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-white shadow-[0px_1px_1px_#00000005]">
            TESTIMONIALS
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14 px-5 sm:px-8 lg:px-12"
        >
          <h2 className="text-[#171717] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,6vw,3.5rem)] max-w-[900px] mx-auto mb-4">
            Trusted by industry leaders.
          </h2>
          <p className="text-[#4d4d4d] text-[16px] max-w-[480px] mx-auto">
            See how builders and developers are transforming
            real estate sales with our visualization platform.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10 sm:mb-14 px-5 sm:px-8 lg:px-12"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#ebebeb] flex items-center justify-center shadow-[0px_1px_1px_#00000005]">
                  <Icon className="w-4.5 h-4.5 text-[#171717]/60" />
                </div>
                <div>
                  <p className="text-[#171717] text-[20px] font-bold tracking-tight leading-none">
                    {stat.value}
                  </p>
                  <p className="text-[#4d4d4d]/50 text-[11px] font-mono uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Treemap Grid — blending with page theme */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16"
        >
          <div
            className="grid gap-3 sm:gap-4"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "200px 200px",
            }}
          >
            {stories.map((story, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSelectedStory(story)}
                className="relative rounded-2xl sm:rounded-[20px] overflow-hidden cursor-pointer text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]/30"
                style={{
                  gridArea: story.gridArea,
                  background: story.accentLight,
                  border: `1px solid ${story.accentBorder}`,
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/60 via-transparent to-white/30 pointer-events-none" />

                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: story.accent }}
                />

                {/* Content */}
                <div className="relative h-full p-5 sm:p-6 flex flex-col justify-between z-10">
                  {/* Top: Metric + Arrow */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-none tracking-tight"
                        style={{ color: story.accent }}
                      >
                        {story.metric}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider mt-1.5 text-[#4d4d4d]/50">
                        {story.metricLabel}
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 border"
                      style={{
                        background: story.accentLight,
                        borderColor: story.accentBorder,
                      }}
                    >
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        style={{ color: story.accent }}
                      />
                    </div>
                  </div>

                  {/* Quote preview — only on large block */}
                  {idx === 0 && (
                    <p className="text-[13px] text-[#171717]/45 leading-relaxed line-clamp-2 mt-3 hidden sm:block">
                      &ldquo;{story.quote.substring(0, 120)}...&rdquo;
                    </p>
                  )}

                  {/* Bottom: Name + Stars */}
                  <div>
                    <div className="flex gap-0.5 mb-1.5">
                      {Array.from({ length: story.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                        style={{ background: story.accent }}
                      >
                        {story.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] sm:text-[14px] font-semibold text-[#171717] truncate">
                          {story.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#4d4d4d]/40 truncate">
                          {story.role} · {story.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ─── Looping Marquee Rows ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="space-y-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Label */}
          <p className="text-center text-[#4d4d4d]/40 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 px-5">
            More success stories
          </p>

          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

            <div
              ref={marqueeRef1}
              className="flex gap-4"
              style={{
                animation: `marquee-left 45s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {[...marqueeTestimonials.slice(0, 4), ...marqueeTestimonials.slice(0, 4)].map(
                (t, i) => (
                  <MarqueeCard key={`r1-${i}`} testimonial={t} />
                )
              )}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />

            <div
              ref={marqueeRef2}
              className="flex gap-4"
              style={{
                animation: `marquee-right 50s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              {[...marqueeTestimonials.slice(4), ...marqueeTestimonials.slice(4)].map(
                (t, i) => (
                  <MarqueeCard key={`r2-${i}`} testimonial={t} />
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setSelectedStory(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white"
            >
              {/* Header */}
              <div
                className="relative px-6 sm:px-8 pt-7 sm:pt-8 pb-12"
                style={{ background: selectedStory.accentLight }}
              >
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 hover:bg-white backdrop-blur-sm flex items-center justify-center text-[#171717]/60 hover:text-[#171717] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: selectedStory.accent }}
                />

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-[16px] font-bold"
                    style={{ background: selectedStory.accent }}
                  >
                    {selectedStory.avatar}
                  </div>
                  <div>
                    <p className="text-[#171717] font-semibold text-[16px]">
                      {selectedStory.name}
                    </p>
                    <p className="text-[#4d4d4d]/50 text-[12px] font-mono uppercase tracking-wide">
                      {selectedStory.role} · {selectedStory.company}
                    </p>
                  </div>
                </div>

                {/* Big metric */}
                <div className="flex items-end gap-3">
                  <p
                    className="font-bold text-[48px] leading-none tracking-tight"
                    style={{ color: selectedStory.accent }}
                  >
                    {selectedStory.metric}
                  </p>
                  <p className="text-[#4d4d4d]/40 text-[13px] font-mono uppercase tracking-wider pb-2">
                    {selectedStory.metricLabel}
                  </p>
                </div>
              </div>

              {/* Quote body */}
              <div className="px-6 sm:px-8 pt-6 pb-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: selectedStory.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  {Array.from({ length: 5 - selectedStory.rating }).map(
                    (_, i) => (
                      <Star
                        key={`e-${i}`}
                        className="w-4 h-4 fill-gray-200 text-gray-200"
                      />
                    )
                  )}
                </div>

                <div className="flex gap-3">
                  <Quote className="w-5 h-5 text-[#ebebeb] shrink-0 mt-0.5" />
                  <blockquote className="text-[15px] sm:text-[16px] text-[#171717] leading-relaxed">
                    {selectedStory.quote}
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Keyframes for marquee */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
