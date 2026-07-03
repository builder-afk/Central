"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  MapPin,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  DEFAULT_INPUTS,
  fetchEstimate,
  fetchCities,
  formatINR,
  formatINRFull,
  type QualityTier,
  type EstimatorInputs,
  type EstimateResponse,
  type CityRate,
} from "@/lib/api/costEngine";

const qualityOptions: {
  id: QualityTier;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "standard",
    label: "Standard",
    description: "Quality materials, functional design",
    icon: "🏠",
  },
  {
    id: "premium",
    label: "Premium",
    description: "Branded materials, modern finishes",
    icon: "✨",
  },
  {
    id: "luxury",
    label: "Luxury",
    description: "Imported materials, bespoke design",
    icon: "💎",
  },
];

const BREAKDOWN_ICONS: Record<string, string> = {
  foundation: "🏗️",
  structure: "🏢",
  brickwork: "🧱",
  roofing: "🏠",
  electrical: "⚡",
  plumbing: "🚰",
  flooring: "📏",
  doors_windows: "🚪",
  painting: "🎨",
  interior_finishing: "🛋️",
  miscellaneous: "📦",
};

export default function CostEstimator() {
  const [inputs, setInputs] = useState<EstimatorInputs>(DEFAULT_INPUTS);
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  // Data state
  const [estimate, setEstimate] = useState<EstimateResponse | null>(null);
  const [cities, setCities] = useState<CityRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch available cities on mount
  useEffect(() => {
    fetchCities()
      .then(setCities)
      .catch((err) => console.error("Failed to load cities:", err));
  }, []);

  // Debounced estimate fetching
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const data = await fetchEstimate(inputs, controller.signal);
        setEstimate(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Estimation failed:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [inputs]);

  const updateInput = <K extends keyof EstimatorInputs>(
    key: K,
    value: EstimatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const currentCityData = cities.find((c) => c.city === inputs.city);

  // Process breakdown array for rendering
  const breakdownArray = estimate
    ? Object.entries(estimate.breakdown).map(([key, value]) => ({
        id: key,
        label: value.category,
        icon: BREAKDOWN_ICONS[key] || "🔹",
        amount: value.amount,
        percent: value.percent,
      }))
    : [];

  const maxBreakdownAmount = breakdownArray.length > 0 
    ? Math.max(...breakdownArray.map((b) => b.amount)) 
    : 1;

  return (
    <div className="glass-search rounded-[2rem] p-6 sm:p-8 lg:p-10">
      {/* ─── HEADER ─── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-heading italic text-2xl text-slate-900">
            Cost Intelligence Engine
          </h3>
          <p className="text-sm text-slate-500">
            AI-powered, highly accurate construction estimates
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
        {/* ═══════════════════════════════════════
           LEFT — INPUTS
           ═══════════════════════════════════════ */}
        <div className="space-y-7">
          {/* ─── City Selector ─── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              <label className="text-sm font-medium text-slate-700">
                Project Location
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {cities.length > 0 ? (
                cities.map((city) => (
                  <button
                    key={city.city}
                    onClick={() => updateInput("city", city.city)}
                    className={`estimator-pill ${
                      inputs.city === city.city ? "active" : ""
                    }`}
                  >
                    <span>{city.city}</span>
                    <span className="ml-1.5 text-[11px] opacity-60">
                      ₹{city.effective_rates[inputs.quality]?.toLocaleString()}/sqft
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-sm text-slate-400 animate-pulse">Loading cities...</div>
              )}
            </div>
          </div>

          {/* ─── Built-up Area ─── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-700">
                Built-up Area
              </label>
              <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                {inputs.builtUpArea.toLocaleString()} sq.ft
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={50}
              value={inputs.builtUpArea}
              onChange={(e) =>
                updateInput("builtUpArea", Number(e.target.value))
              }
              className="slider-modern w-full"
              style={{
                background: `linear-gradient(90deg, #0f172a ${
                  ((inputs.builtUpArea - 500) / 9500) * 100
                }%, #e2e8f0 ${
                  ((inputs.builtUpArea - 500) / 9500) * 100
                }%)`,
              }}
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
              <span>500 sq.ft</span>
              <span>10,000 sq.ft</span>
            </div>
          </div>

          {/* ─── Construction Quality ─── */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-3 block">
              Construction Quality
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {qualityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => updateInput("quality", option.id)}
                  className={`quality-card text-left ${
                    inputs.quality === option.id ? "active" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {option.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mb-2">
                    {option.description}
                  </p>
                  <p className="text-xs font-semibold text-slate-700">
                    {currentCityData
                      ? `₹${currentCityData.effective_rates[option.id]?.toLocaleString()}/sq.ft`
                      : "..."}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* ─── Number of Floors ─── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" />
                <label className="text-sm font-medium text-slate-700">
                  Number of Floors
                </label>
              </div>
              <div className="segmented-control">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => updateInput("floors", n)}
                    className={inputs.floors === n ? "active" : ""}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Add-ons ─── */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-3 block">
              Add-ons
            </label>
            <div className="space-y-3">
              {/* Basement */}
              <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Basement
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Underground floor construction
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateInput("includeBasement", !inputs.includeBasement)
                  }
                  className={`estimator-toggle ${
                    inputs.includeBasement ? "active" : ""
                  }`}
                  aria-label="Toggle basement"
                />
              </div>

              {/* Basement area (conditional) */}
              <AnimatePresence>
                {inputs.includeBasement && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium text-slate-600">
                          Basement Area
                        </label>
                        <span className="text-xs font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-100">
                          {inputs.basementArea.toLocaleString()} sq.ft
                        </span>
                      </div>
                      <input
                        type="range"
                        min={200}
                        max={5000}
                        step={50}
                        value={inputs.basementArea}
                        onChange={(e) =>
                          updateInput("basementArea", Number(e.target.value))
                        }
                        className="slider-modern w-full"
                        style={{
                          background: `linear-gradient(90deg, #0f172a ${
                            ((inputs.basementArea - 200) / 4800) * 100
                          }%, #e2e8f0 ${
                            ((inputs.basementArea - 200) / 4800) * 100
                          }%)`,
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interior */}
              <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Interior Package
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Complete interior design & furnishing
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateInput("includeInterior", !inputs.includeInterior)
                  }
                  className={`estimator-toggle ${
                    inputs.includeInterior ? "active" : ""
                  }`}
                  aria-label="Toggle interior"
                />
              </div>

              {/* Landscaping */}
              <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Landscaping
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Garden, driveway & outdoor design
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateInput(
                      "includeLandscaping",
                      !inputs.includeLandscaping
                    )
                  }
                  className={`estimator-toggle ${
                    inputs.includeLandscaping ? "active" : ""
                  }`}
                  aria-label="Toggle landscaping"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
           RIGHT — LIVE ESTIMATE RESULT
           ═══════════════════════════════════════ */}
        <div className="flex flex-col gap-5 relative">
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 rounded-[1.5rem] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
          )}

          {/* Total cost card */}
          <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3 text-center">
              Estimated Construction Cost
            </p>
            <motion.div
              key={estimate?.cost_range.minimum || 0}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="mb-4"
            >
              <p className="font-heading italic text-3xl sm:text-4xl text-slate-900 tracking-[-1.5px] mb-1 text-center">
                {estimate ? `${formatINR(estimate.cost_range.minimum)} \u2013 ${formatINR(estimate.cost_range.maximum)}` : "\u20b9---"}
              </p>
            </motion.div>

            <div className="bg-slate-50/80 rounded-xl px-5 py-3 border border-slate-100 w-full mb-5 flex flex-col items-center">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                Most Likely
              </p>
              <p className="font-heading italic text-2xl text-slate-800 tracking-[-1px]">
                {estimate ? formatINR(estimate.cost_range.most_likely) : "\u20b9---"}
              </p>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              {(inputs.builtUpArea * inputs.floors).toLocaleString()} sq.ft
              built-up \u00b7 {inputs.floors} floor
              {inputs.floors > 1 ? "s" : ""}
            </p>

            {/* Info pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full border border-slate-100 text-[11px] font-medium">
                {estimate ? `₹${estimate.cost_per_sqft.toLocaleString()}/sq.ft` : "₹---/sq.ft"}
              </span>
              <span className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full border border-slate-100 text-[11px] font-medium">
                {qualityOptions.find((q) => q.id === inputs.quality)?.label}{" "}
                finish
              </span>
              <span className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full border border-slate-100 text-[11px] font-medium flex items-center gap-1">
                Confidence: {estimate?.confidence.level || "---"}
              </span>
            </div>
          </div>

          {/* Add-ons & Variables Summary */}
          {estimate && (
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-3">
                Included Add-ons & Allowances
              </p>
              <div className="space-y-2">
                {inputs.includeBasement && estimate.add_on_costs.basement.amount > 0 && (
                  <div className="formula-step">
                    <span className="formula-operator">+</span>
                    <span>Basement</span>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {formatINRFull(estimate.add_on_costs.basement.amount)}
                    </span>
                  </div>
                )}
                {inputs.includeInterior && estimate.add_on_costs.interior.amount > 0 && (
                  <div className="formula-step">
                    <span className="formula-operator">+</span>
                    <span>Interior Finishing</span>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {formatINRFull(estimate.add_on_costs.interior.amount)}
                    </span>
                  </div>
                )}
                {inputs.includeLandscaping && estimate.add_on_costs.landscaping.amount > 0 && (
                  <div className="formula-step">
                    <span className="formula-operator">+</span>
                    <span>Landscaping</span>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {formatINRFull(estimate.add_on_costs.landscaping.amount)}
                    </span>
                  </div>
                )}
                {estimate.add_on_costs.boundary_wall.amount > 0 && (
                  <div className="formula-step">
                    <span className="formula-operator">+</span>
                    <span>Boundary Wall & Gates</span>
                    <span className="text-[10px] text-slate-400 ml-auto">
                      {formatINRFull(estimate.add_on_costs.boundary_wall.amount)}
                    </span>
                  </div>
                )}
                <div className="formula-step border-t border-slate-100 pt-2">
                  <span className="formula-operator">+</span>
                  <span>Contingency Reserve</span>
                  <span className="text-[10px] text-slate-400 ml-auto">
                    {formatINRFull(estimate.contingency.amount)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Budget tiers */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="budget-tier-card">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
                Minimum
              </p>
              <p className="text-sm font-bold text-slate-700">
                {estimate ? formatINR(estimate.budget_tiers.minimum.amount) : "---"}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Bare essentials</p>
            </div>
            <div className="budget-tier-card recommended">
              <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1">
                Recommended
              </p>
              <p className="text-sm font-bold text-slate-900">
                {estimate ? formatINR(estimate.budget_tiers.recommended.amount) : "---"}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Most Likely</p>
            </div>
            <div className="budget-tier-card">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
                Premium
              </p>
              <p className="text-sm font-bold text-slate-700">
                {estimate ? formatINR(estimate.budget_tiers.premium.amount) : "---"}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">High-end</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         EXPANDABLE — Detailed Breakdown
         ═══════════════════════════════════════ */}
      <div className="mt-8 border-t border-slate-100 pt-6">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors w-full"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Detailed Cost Breakdown</span>
          <span className="text-[11px] text-slate-400 ml-1">
            ({breakdownArray.length} categories)
          </span>
          {showBreakdown ? (
            <ChevronUp className="w-4 h-4 ml-auto" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-auto" />
          )}
        </button>

        <AnimatePresence>
          {showBreakdown && estimate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-3">
                {breakdownArray.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-base w-7 text-center shrink-0">
                      {b.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-700 truncate">
                          {b.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 ml-2 shrink-0">
                          {formatINRFull(b.amount)}
                        </span>
                      </div>
                      <div className="breakdown-bar">
                        <motion.div
                          className="breakdown-bar-fill"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(b.amount / maxBreakdownAmount) * 100}%`,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: i * 0.04,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 w-8 text-right shrink-0">
                      {b.percent}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════
         INTELLIGENCE LAYER — AI Insights
         ═══════════════════════════════════════ */}
      {estimate && estimate.ai_insights.length > 0 && (
        <div className="mt-6 coming-soon-banner bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 mb-1">
                AI Construction Insights
              </p>
              <ul className="text-[11px] text-slate-600 leading-relaxed list-disc list-inside space-y-1">
                {estimate.ai_insights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
