"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  ArrowRight,
  Sofa,
  Lamp,
  BedDouble,
  UtensilsCrossed,
  Palette,
  Image,
  RotateCcw,
  Check,
  Loader2,
} from "lucide-react";

const stylePresets = [
  {
    name: "Scandinavian",
    description: "Minimal, warm tones, natural materials",
    gradient: "from-amber-100 to-orange-100",
    textColor: "text-amber-900",
  },
  {
    name: "Modern Luxury",
    description: "Sleek finishes, dark tones, gold accents",
    gradient: "from-slate-800 to-zinc-900",
    textColor: "text-white",
  },
  {
    name: "Industrial",
    description: "Exposed brick, metal, raw wood",
    gradient: "from-stone-400 to-stone-600",
    textColor: "text-white",
  },
  {
    name: "Japandi",
    description: "Japanese minimalism meets Nordic",
    gradient: "from-stone-200 to-neutral-300",
    textColor: "text-stone-800",
  },
  {
    name: "Art Deco",
    description: "Bold patterns, geometric, luxurious",
    gradient: "from-yellow-600 to-amber-700",
    textColor: "text-white",
  },
  {
    name: "Coastal",
    description: "Soft blues, whites, natural textures",
    gradient: "from-sky-200 to-blue-300",
    textColor: "text-sky-900",
  },
  {
    name: "Bohemian",
    description: "Eclectic, colorful, layered textures",
    gradient: "from-rose-400 to-purple-400",
    textColor: "text-white",
  },
  {
    name: "Contemporary",
    description: "Clean lines, neutral palette, open space",
    gradient: "from-gray-200 to-gray-400",
    textColor: "text-gray-900",
  },
];

const furnitureCategories = [
  { icon: Sofa, label: "Living Room", count: 42 },
  { icon: BedDouble, label: "Bedroom", count: 36 },
  { icon: UtensilsCrossed, label: "Kitchen", count: 28 },
  { icon: Lamp, label: "Lighting", count: 54 },
  { icon: Palette, label: "Decor", count: 67 },
  { icon: Image, label: "Wall Art", count: 31 },
];

const recentPrompts = [
  "Make the living room feel warm and cozy with earthy tones",
  "Add a king-size bed with tufted headboard",
  "Change all walls to a soft sage green",
  "Style the kitchen as modern farmhouse",
  "Add pendant lights over the kitchen island",
];

export default function AIDesignerPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  const handleGenerate = () => {
    if (!prompt && !selectedStyle) return;
    setIsGenerating(true);
    setGenerationComplete(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-pink-500 flex items-center justify-center shadow-glow-purple">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              AI Interior Designer
            </h1>
            <p className="text-slate-500 text-sm">
              Describe a mood, pick a style, and let AI transform your space.
            </p>
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl p-6 mb-6"
      >
        <label htmlFor="ai-prompt" className="text-sm font-medium text-slate-300 mb-3 block">
          Describe your vision
        </label>
        <div className="relative">
          <textarea
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Make this room Scandinavian with warm lighting and a cozy reading nook..."
            className="input-field min-h-[120px] resize-none text-base !pr-14"
            rows={4}
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || (!prompt && !selectedStyle)}
            className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-purple flex items-center justify-center text-white shadow-lg hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Recent Prompts */}
        <div className="mt-4">
          <p className="text-xs text-slate-500 mb-2">Recent prompts</p>
          <div className="flex flex-wrap gap-2">
            {recentPrompts.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all truncate max-w-[250px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Generation Result */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 mb-6 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple to-electric flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <Wand2 className="w-8 h-8 text-white animate-spin-slow" />
          </div>
          <h3 className="font-display text-lg font-semibold text-white mb-2">
            AI is designing your space...
          </h3>
          <p className="text-sm text-slate-400">
            Analyzing room layout, selecting furniture, and applying materials.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald" /> Room detected
            </span>
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-electric" /> Placing furniture
            </span>
            <span className="flex items-center gap-1.5 opacity-40">
              <span className="w-3.5 h-3.5 rounded-full border border-slate-600" /> Applying materials
            </span>
          </div>
        </motion.div>
      )}

      {generationComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-6 mb-6 gradient-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center">
              <Check className="w-4 h-4 text-emerald" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Design complete!</h3>
              <p className="text-xs text-slate-400">
                AI applied {selectedStyle || "custom"} styling with 12 furniture items and 4 material changes.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary text-sm !py-2 !px-4 flex-1">
              <span className="flex items-center justify-center gap-2">
                View in 3D
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
            <button
              onClick={() => { setGenerationComplete(false); setPrompt(""); setSelectedStyle(null); }}
              className="btn-secondary text-sm !py-2 !px-4 flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Style Presets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-4">
            Style Presets
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {stylePresets.map((style) => (
              <button
                key={style.name}
                onClick={() => {
                  setSelectedStyle(style.name);
                  setPrompt(`Apply ${style.name} style to the selected room`);
                }}
                className={`relative rounded-xl p-4 text-left transition-all overflow-hidden group ${
                  selectedStyle === style.name
                    ? "ring-2 ring-electric ring-offset-2 ring-offset-space-black"
                    : "hover:scale-[1.02]"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <p className={`text-sm font-semibold ${style.textColor}`}>
                    {style.name}
                  </p>
                  <p className={`text-xs mt-0.5 opacity-70 ${style.textColor}`}>
                    {style.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Furniture Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="font-display text-base font-semibold text-white mb-4">
            Furniture Catalog
          </h2>
          <div className="space-y-2">
            {furnitureCategories.map((cat) => (
              <button
                key={cat.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-electric/10 transition-colors">
                  <cat.icon className="w-5 h-5 text-slate-400 group-hover:text-electric transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-xs text-slate-600">{cat.count} items</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
