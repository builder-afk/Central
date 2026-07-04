"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Minus, Home, Building, Crown, ArrowUpRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    subtitle: "Get on the map",
    priceMonthly: "1,999",
    priceAnnual: "1,499",
    billedAnnual: "17,991",
    icon: Home,
    bestFor: ["Individual builders", "New agents"],
    features: [
      { name: "Builder profile listing", included: true },
      { name: "Up to 5 project uploads", included: true },
      { name: "Basic analytics dashboard", included: true },
      { name: "Verified trust badge", included: true },
      { name: "Directory listing & search", included: true },
      { name: "3D property viewer", included: false },
      { name: "Property microsite", included: false },
      { name: "Lead management tools", included: false },
    ],
    buttonText: "Get started",
    buttonType: "outline",
    popular: false,
  },
  {
    name: "Professional",
    subtitle: "Built for serious growth",
    priceMonthly: "4,999",
    priceAnnual: "3,749",
    billedAnnual: "44,991",
    icon: Building,
    bestFor: ["Active builders", "Real estate agents"],
    features: [
      { name: "Everything in Starter", included: true },
      { name: "Up to 20 project uploads", included: true },
      { name: "Web-based 3D property viewer", included: true },
      { name: "1 property microsite", included: true },
      { name: "Interactive floor plans", included: true },
      { name: "Lead management & CRM", included: true },
      { name: "Real-time analytics + lead source", included: true },
      { name: "AI visualization tools", included: false },
    ],
    buttonText: "Get started",
    buttonType: "filled",
    popular: true,
  },
  {
    name: "Elite",
    subtitle: "Full platform access",
    priceMonthly: "9,999",
    priceAnnual: "7,499",
    billedAnnual: "89,991",
    icon: Crown,
    bestFor: ["Developers", "Large agencies"],
    features: [
      { name: "Everything in Professional", included: true },
      { name: "Unlimited project uploads", included: true },
      { name: "Unlimited property microsites", included: true },
      { name: "AI visualization & virtual staging", included: true },
      { name: "Priority listing in search", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "API access & integrations", included: true },
      { name: "Custom branding & white-label", included: true },
    ],
    buttonText: "Contact sales",
    buttonType: "outline",
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative bg-transparent pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden font-sans"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <h2 className="text-gray-900 font-heading italic leading-[1.12] tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)] mb-4 max-w-[900px] mx-auto">
            Simple, transparent pricing.
          </h2>
          <p className="text-[16px] sm:text-[18px] text-gray-500 max-w-lg mx-auto mb-10 font-normal leading-relaxed">
            Turn your properties into immersive digital experiences. We shoot, process, and host your listings with zero hidden fees.
          </p>

          {/* Animated Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <span className={`text-[15px] font-medium transition-colors ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 bg-gray-900 rounded-full p-1 relative flex items-center transition-colors border border-gray-800 focus:outline-none"
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-[15px] font-medium transition-colors ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>
                Annual
              </span>
              <AnimatePresence>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[12px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full"
                  >
                    Save 25%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const isHovered = hoveredPlan === plan.name;
            const isFeatured = plan.popular;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHoveredPlan(plan.name)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col transition-all duration-300 ${
                  isFeatured 
                    ? "bg-[#2c1b12] border-2 border-[#F26522]/60 shadow-[0_0_40px_rgba(242,101,34,0.15)]" 
                    : "bg-[#2c1b12] border border-neutral-800/50 shadow-lg"
                }`}
                style={{
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white bg-[#F26522] shadow-[0_4px_12px_rgba(242,101,34,0.4)]">
                      Most popular
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <plan.icon className="w-5 h-5 text-neutral-300" />
                      <h3 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-[14px] text-neutral-400 font-medium">
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Area */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[24px] font-semibold text-white">₹</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isAnnual ? 'annual' : 'monthly'}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.15 }}
                          className="text-[40px] sm:text-[44px] font-bold text-white tracking-tight"
                        >
                          {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[14px] font-medium text-neutral-400">/mo</span>
                    </div>
                    
                    <div className="h-6 mt-1">
                      <AnimatePresence>
                        {isAnnual && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[13px] text-neutral-500"
                          >
                            Billed as ₹{plan.billedAnnual}/yr
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Best For Section */}
                  <div className="mb-8">
                    <div className="text-[11px] font-bold tracking-widest uppercase text-[#c1a18c] mb-3">
                      BEST FOR
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.bestFor.map((item) => (
                        <div key={item} className="px-3 py-1.5 rounded-md bg-[#50372b]/40 border border-[#50372b] text-[12px] font-medium text-[#f5ece5]">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3.5">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3"
                        >
                          <div className={`mt-[2px] shrink-0`}>
                            {feature.included ? (
                              <Check className="w-[18px] h-[18px] text-[#10b981]" />
                            ) : (
                              <Minus className="w-[18px] h-[18px] text-[#785340]" />
                            )}
                          </div>
                          <span className={`text-[14px] leading-snug ${
                            feature.included ? "text-[#fdf8f5]" : "text-[#936850]"
                          }`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3.5 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-300 group ${
                      plan.buttonType === "filled"
                        ? "bg-[#F26522] hover:bg-[#e05a1a] text-white shadow-[0_4px_14px_rgba(242,101,34,0.3)]"
                        : "bg-[#50372b]/20 border border-[#50372b] hover:border-[#785340] hover:bg-[#50372b]/40 text-[#fdf8f5]"
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
