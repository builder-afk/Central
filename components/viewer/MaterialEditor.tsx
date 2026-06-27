"use client";

import { useViewerStore } from "@/store/useViewerStore";
import {
  Paintbrush,
  X,
  Check,
} from "lucide-react";

const wallColors = [
  { name: "Warm Beige", color: "#e8e0d4" },
  { name: "Soft White", color: "#f5f0eb" },
  { name: "Light Gray", color: "#d4d4d8" },
  { name: "Sage Green", color: "#c5d5c0" },
  { name: "Sky Blue", color: "#bbd4e8" },
  { name: "Blush Pink", color: "#e8c8c4" },
  { name: "Lavender", color: "#d4c4e8" },
  { name: "Charcoal", color: "#3a3a4a" },
  { name: "Navy", color: "#1a2040" },
  { name: "Forest", color: "#2a3a2a" },
  { name: "Terracotta", color: "#c4806a" },
  { name: "Cream", color: "#f0e8d0" },
];

const floorMaterials = [
  { name: "Oak Wood", id: "wood", color: "#8B6914" },
  { name: "Marble", id: "marble", color: "#e8e0d4" },
  { name: "Ceramic Tile", id: "tile", color: "#c0bab0" },
  { name: "Concrete", id: "concrete", color: "#999999" },
];

export default function MaterialEditor() {
  const {
    showMaterialEditor,
    toggleMaterialEditor,
    wallColor,
    setWallColor,
    floorMaterial,
    setFloorMaterial,
  } = useViewerStore();

  if (!showMaterialEditor) return null;

  return (
    <div className="absolute right-4 top-4 bottom-4 w-72 glass-dark rounded-2xl p-5 overflow-y-auto z-20 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Paintbrush className="w-5 h-5 text-electric" />
          <h3 className="font-display text-base font-semibold text-white">
            Materials
          </h3>
        </div>
        <button
          onClick={toggleMaterialEditor}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Wall Colors */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-400 mb-3">Wall Color</h4>
        <div className="grid grid-cols-4 gap-2">
          {wallColors.map((wc) => (
            <button
              key={wc.name}
              onClick={() => setWallColor(wc.color)}
              className={`relative w-full aspect-square rounded-xl transition-all hover:scale-110 ${
                wallColor === wc.color ? "ring-2 ring-electric ring-offset-2 ring-offset-space-black" : ""
              }`}
              style={{ backgroundColor: wc.color }}
              title={wc.name}
            >
              {wallColor === wc.color && (
                <Check
                  className={`absolute inset-0 m-auto w-4 h-4 ${
                    wc.color === "#3a3a4a" || wc.color === "#1a2040" || wc.color === "#2a3a2a"
                      ? "text-white"
                      : "text-space-black"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <label className="text-xs text-slate-500 mb-1 block">Custom Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={wallColor}
              onChange={(e) => setWallColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={wallColor}
              onChange={(e) => setWallColor(e.target.value)}
              className="input-field text-xs !py-1.5 font-mono flex-1"
            />
          </div>
        </div>
      </div>

      {/* Floor Material */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-400 mb-3">
          Floor Material
        </h4>
        <div className="space-y-2">
          {floorMaterials.map((fm) => (
            <button
              key={fm.id}
              onClick={() => setFloorMaterial(fm.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                floorMaterial === fm.id
                  ? "bg-electric/10 text-electric"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg shadow-inner"
                style={{ backgroundColor: fm.color }}
              />
              <span className="font-medium">{fm.name}</span>
              {floorMaterial === fm.id && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="glass rounded-xl p-4">
        <p className="text-xs text-slate-400 mb-2">
          🤖 AI Suggestion
        </p>
        <p className="text-sm text-slate-300">
          Try <button onClick={() => { setWallColor("#f5f0eb"); setFloorMaterial("wood"); }} className="text-electric hover:underline">Scandinavian</button> style:
          soft white walls with oak wood floors for a warm, minimal look.
        </p>
      </div>
    </div>
  );
}
