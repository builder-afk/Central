"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Zap, Building2, Crown, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Single Property",
    price: "₹15,000",
    usdPrice: "$199",
    period: "/property",
    description: "Perfect for a single flat or apartment listing.",
    icon: Zap,
    featured: false,
    features: [
      "Full 360° virtual tour capture",
      "High-res HDR photography",
      "Floor plan generation",
      "Listed on HouseVerse marketplace",
      "Basic lead generation",
      "Delivered in 48 hours",
      "6 months hosting included",
    ],
  },
  {
    name: "Villa Package",
    price: "₹35,000",
    usdPrice: "$499",
    period: "/property",
    description: "Comprehensive coverage for large villas and estates.",
    icon: Building2,
    featured: true,
    features: [
      "Multi-floor 360° virtual tour",
      "Drone aerial photography",
      "Twilight exterior shots",
      "Premium marketplace placement",
      "Advanced lead analytics",
      "Delivered in 72 hours",
      "12 months hosting included",
      "Dedicated property landing page",
    ],
  },
  {
    name: "Developer Portfolio",
    price: "Custom",
    usdPrice: "Custom",
    period: "",
    description: "Scale your entire pre-construction project.",
    icon: Crown,
    featured: false,
    features: [
      "Multiple property captures",
      "Pre-construction 3D renders",
      "White-labeled virtual tours",
      "Custom branding integration",
      "API access for your website",
      "Dedicated account manager",
      "Lifetime hosting",
      "Priority shoot scheduling",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [showUSD, setShowUSD] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-[#FAFAFA] pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Badge Row */}
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-semibold shadow-sm">
            5
          </div>
          <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-4 py-1.5 text-gray-900 bg-white shadow-sm tracking-wide">
            PRICING
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-gray-900 font-heading italic leading-[1.12] tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)] mb-4 max-w-[900px] mx-auto">
            Simple, transparent pricing.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-gray-500 max-w-lg mx-auto mb-10 font-normal leading-relaxed">
            Turn your properties into immersive digital experiences. We shoot, process, and host your listings with zero hidden fees.
          </p>

          {/* Animated Currency Toggle */}
          <div className="relative inline-flex items-center p-1.5 bg-gray-200/60 rounded-xl backdrop-blur-sm shadow-inner border border-gray-200">
            <div className="flex relative z-10">
              <button
                onClick={() => setShowUSD(false)}
                className={`relative w-24 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                  !showUSD ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setShowUSD(true)}
                className={`relative w-24 py-2 text-[14px] font-semibold transition-colors duration-300 ${
                  showUSD ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                $ USD
              </button>
            </div>
            {/* Sliding Highlight Background */}
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-24 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-0 border border-gray-100"
              initial={false}
              animate={{
                x: showUSD ? 96 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.name;
            const isFeatured = plan.featured;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHoveredPlan(plan.name)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative rounded-[2rem] p-8 sm:p-10 flex flex-col transition-all duration-500 ${
                  isFeatured 
                    ? "bg-gray-900 text-white shadow-2xl shadow-gray-900/20 md:-mt-4 md:mb-4" 
                    : "bg-white text-gray-900 border border-gray-100 shadow-xl shadow-gray-200/40"
                }`}
                style={{
                  transform: isHovered && !isFeatured ? "translateY(-8px)" : isHovered && isFeatured ? "translateY(-12px)" : "translateY(0)",
                }}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <motion.div 
                      className="px-5 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase bg-[#F26522] text-white shadow-[0_4px_12px_rgba(242,101,34,0.4)]"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Most Popular
                    </motion.div>
                  </div>
                )}

                {/* Subtle background gradient on hover for non-featured */}
                {!isFeatured && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] opacity-0 transition-opacity duration-500"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                  />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon & Title Area */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500 ${
                        isFeatured
                          ? "bg-white/10 text-white"
                          : "bg-gray-50 text-gray-900 border border-gray-100"
                      }`}
                      animate={isHovered ? { scale: 1.05, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <plan.icon className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-[22px] sm:text-[24px] font-semibold tracking-tight">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={`text-[15px] mb-8 leading-relaxed font-medium ${
                      isFeatured ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price Area */}
                  <div className="mb-10 flex items-baseline gap-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={showUSD ? 'usd' : 'inr'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-[40px] sm:text-[48px] font-bold tracking-tighter"
                      >
                        {plan.name === "Developer Portfolio"
                          ? "Custom"
                          : showUSD
                          ? plan.usdPrice
                          : plan.price}
                      </motion.span>
                    </AnimatePresence>
                    {plan.period && plan.name !== "Developer Portfolio" && (
                      <span
                        className={`text-[14px] font-semibold tracking-wide ${
                          isFeatured ? "text-white/50" : "text-gray-400"
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-[15px] mb-10 flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden relative group ${
                      isFeatured
                        ? "bg-white text-gray-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                    }`}
                  >
                    <span className="relative z-10">{plan.name === "Developer Portfolio" ? "Contact Sales" : "Get Started"}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  {/* Features List */}
                  <div className="flex-1">
                    <div className={`text-[12px] font-bold tracking-widest uppercase mb-6 ${
                      isFeatured ? "text-white/40" : "text-gray-400"
                    }`}>
                      What's included
                    </div>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={false}
                          animate={isHovered ? { x: 4 } : { x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className={`flex items-start gap-3 text-[14px] font-medium leading-snug ${
                            isFeatured ? "text-white/80" : "text-gray-600"
                          }`}
                        >
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            isFeatured ? "bg-[#F26522]/20 text-[#F26522]" : "bg-gray-100 text-gray-900"
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
