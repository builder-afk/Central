"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronDown } from "lucide-react";

const finishOptions = [
  { id: "basic", label: "Basic", multiplier: 1, color: "bg-slate-200" },
  { id: "standard", label: "Standard", multiplier: 1.4, color: "bg-blue-200" },
  { id: "premium", label: "Premium", multiplier: 2, color: "bg-amber-200" },
  { id: "luxury", label: "Luxury", multiplier: 3, color: "bg-purple-200" },
];

export default function CostEstimator() {
  const [plotSize, setPlotSize] = useState(1500);
  const [floors, setFloors] = useState(2);
  const [finishQuality, setFinishQuality] = useState("standard");

  const estimatedCost = useMemo(() => {
    const baseCostPerSqft = 1800;
    const finish = finishOptions.find((f) => f.id === finishQuality);
    const multiplier = finish?.multiplier || 1;
    const totalSqft = plotSize * floors * 0.65; // 65% coverage
    return Math.round(totalSqft * baseCostPerSqft * multiplier);
  }, [plotSize, floors, finishQuality]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(1)} L`;
  };

  return (
    <div className="glass-search rounded-[2rem] p-8 sm:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-heading italic text-2xl text-slate-900">Cost Estimator</h3>
          <p className="text-sm text-slate-500">Get an instant estimate for your project</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-8">
          {/* Plot Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-700">Plot Size</label>
              <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">{plotSize.toLocaleString()} sq.ft</span>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={plotSize}
              onChange={(e) => setPlotSize(Number(e.target.value))}
              className="slider-modern w-full"
              style={{
                background: `linear-gradient(90deg, #0f172a ${((plotSize - 500) / 9500) * 100}%, #e2e8f0 ${((plotSize - 500) / 9500) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
              <span>500 sq.ft</span>
              <span>10,000 sq.ft</span>
            </div>
          </div>

          {/* Floors */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-700">Number of Floors</label>
              <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">{floors} Floor{floors > 1 ? "s" : ""}</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              className="slider-modern w-full"
              style={{
                background: `linear-gradient(90deg, #0f172a ${((floors - 1) / 4) * 100}%, #e2e8f0 ${((floors - 1) / 4) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
              <span>1 Floor</span>
              <span>5 Floors</span>
            </div>
          </div>

          {/* Finish Quality */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-3 block">Finish Quality</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {finishOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFinishQuality(option.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    finishQuality === option.id
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col items-center justify-center bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">Estimated Cost</p>
          <motion.div
            key={estimatedCost}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <p className="font-heading italic text-5xl sm:text-6xl text-slate-900 tracking-[-2px] mb-2">
              {formatCurrency(estimatedCost)}
            </p>
          </motion.div>
          <p className="text-sm text-slate-500 mb-6">
            {(plotSize * floors * 0.65).toLocaleString()} sq.ft built-up area
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-[11px] text-slate-400">
            <span className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              ₹{Math.round(estimatedCost / (plotSize * floors * 0.65)).toLocaleString()}/sq.ft
            </span>
            <span className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              {finishOptions.find(f => f.id === finishQuality)?.label} finish
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
