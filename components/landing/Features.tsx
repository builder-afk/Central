"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, BarChart3, Layout, Images, Search, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: Globe,
    tags: ["Browser", "Mobile", "Tablet"],
    title: "Web-Based 3D Viewer.",
    description:
      "Buyers access immersive property tours from any browser — no app downloads, no plugins. Works seamlessly on desktop, mobile, and tablet.",
    image: "/capabilities/3d-viewer.png",
  },
  {
    icon: BarChart3,
    tags: ["Views", "Engagement", "Leads"],
    title: "Real-Time Analytics Dashboard.",
    description:
      "Track every view, hotspot click, and time-on-tour. Identify serious buyers and capture qualified leads at the moment of peak interest.",
    image: "/capabilities/analytics-dashboard.png",
  },
  {
    icon: Layout,
    tags: ["Branding", "Gallery", "Lead Forms"],
    title: "Instant Property Microsites.",
    description:
      "Auto-generated, branded landing pages for each property — 3D tour, gallery, brochure download, location map, and lead capture in one URL.",
    image: "/capabilities/property-microsite.png",
  },
  {
    icon: Images,
    tags: ["Portfolio", "Houses", "Interiors"],
    title: "Showcase Your Portfolio.",
    description:
      "Professionals can display their complete portfolio of houses and interiors, providing buyers with a comprehensive view of their past projects.",
    image: "/capabilities/portfolio-showcase.png",
  },
  {
    icon: Search,
    tags: ["Directory", "Leads", "Connect"],
    title: "List on Our Directory.",
    description:
      "Get listed on our exclusive site so users can easily discover your services and reach out directly with their requirements.",
    image: "/capabilities/directory-listing.png",
  },
  {
    icon: ShieldCheck,
    tags: ["Verified", "Trust", "Credibility"],
    title: "Verified Trust Badge.",
    description:
      "Gain instant credibility. Professionals receive a verified trust layer badge on our platform, letting users know they are working with the best.",
    image: "/capabilities/trust-badge.png",
  },
];

export default function Features() {
  return (
    <section
      className="bg-[#ffffff] pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden"
      id="features"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Badge Row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-[#fafafa] shadow-[0px_1px_1px_#00000005]">
            PLATFORM
          </div>
        </div>

        {/* Heading */}
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="text-[#171717] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,6vw,3.5rem)] mb-5 max-w-[900px]">
            Built for builders who sell smarter.
          </h2>
          <p className="text-[#4d4d4d] text-[16px] sm:text-[17px] leading-relaxed mb-12 sm:mb-16 lg:mb-20 max-w-[560px]">
            Our platform delivers the tools your buyers need to make confident
            decisions — and gives you the insights to close faster.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-[#fafafa] rounded-[12px] p-5 flex flex-col group cursor-pointer border border-[#ebebeb] shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a] hover:-translate-y-1 transition-transform duration-300 ease-out overflow-hidden"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-[6px] bg-[#ffffff] border border-[#ebebeb] flex items-center justify-center text-[#171717] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5 max-w-[65%]">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-2.5 py-0.5 text-[12px] text-[#4d4d4d] bg-[#ffffff] border border-[#ebebeb] font-mono uppercase tracking-wide whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Image */}
                  <div className="relative w-full aspect-[16/10] rounded-[8px] overflow-hidden mb-5 border border-[#ebebeb]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom */}
                  <div>
                    <h3 className="text-[20px] font-semibold text-[#171717] mb-3 leading-tight tracking-[-0.01em] group-hover:text-[#F26522] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[16px] text-[#4d4d4d] leading-[24px]">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
