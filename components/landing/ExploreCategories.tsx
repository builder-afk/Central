"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building, Home, Key, TrendingUp, Tag, TreePine, BedDouble } from "lucide-react";

import buyHomeImg from "./images/buy-home.png";
import rentHomeImg from "./images/rent-home.png";
import investImg from "./images/invest.png";
import sellImg from "./images/sell.png";
import plotsImg from "./images/plots.png";
import pgImg from "./images/pg.png";
import commercialImg from "./images/commercial.png";

export const categories = [
  { id: "buy", label: "Buy a Home", query: "buy", icon: Home, gradient: "from-[#F26522]/20 to-[#171717]/5", tagline: "Find your dream property", image: buyHomeImg },
  { id: "rent", label: "Rent a Home", query: "rent", icon: Key, gradient: "from-blue-500/20 to-[#171717]/5", tagline: "Flexible living options", image: rentHomeImg },
  { id: "invest", label: "Invest", query: "invest", icon: TrendingUp, gradient: "from-purple-500/20 to-[#171717]/5", tagline: "Smart property investments", image: investImg },
  { id: "sell", label: "Sell / Rent Out", query: "sell", icon: Tag, gradient: "from-rose-500/20 to-[#171717]/5", tagline: "Reach thousands of buyers", image: sellImg },
  { id: "plots", label: "Plots & Land", query: "plots", icon: TreePine, gradient: "from-emerald-500/20 to-[#171717]/5", tagline: "Build from the ground up", image: plotsImg },
  { id: "pg", label: "PG & Co-living", query: "pg", icon: BedDouble, gradient: "from-yellow-500/20 to-[#171717]/5", tagline: "Affordable shared spaces", image: pgImg },
  { id: "commercial", label: "Commercial", query: "commercial", icon: Building, gradient: "from-cyan-500/20 to-[#171717]/5", tagline: "Office & retail spaces", image: commercialImg }
];

export default function ExploreCategories() {
  return (
    <section id="explore-categories" className="py-20 lg:py-32 bg-[#faf5f0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading italic text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-[#171717] mb-4"
            >
              What are you looking for?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#171717]/70 font-medium"
            >
              Explore our comprehensive marketplace for all your real estate needs.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/category/${cat.query}`}>
                  <div className="group relative overflow-hidden rounded-2xl cursor-pointer border border-[#171717]/8 bg-white hover:shadow-xl hover:shadow-[#171717]/8 transition-all duration-500 hover:-translate-y-1">
                    
                    {/* Image Section */}
                    <div className="relative h-40 sm:h-44 overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.label}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      
                      {/* Icon badge on image */}
                      <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-5 h-5 text-[#171717]" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 relative">
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.gradient} rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2`} />
                      
                      <h3 className="text-lg font-semibold text-[#171717] mb-1 relative z-10">{cat.label}</h3>
                      <p className="text-sm text-[#171717]/60 font-medium relative z-10">{cat.tagline}</p>

                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#171717]/40 group-hover:text-[#171717] transition-colors relative z-10">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
