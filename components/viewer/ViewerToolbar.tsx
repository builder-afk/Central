"use client";

import { useViewerStore, NavigationMode } from "@/store/useViewerStore";
import {
  RotateCcw,
  Move,
  Eye,
  Navigation,
  Paintbrush,
  Maximize,
  Camera,
  Share2,
  Map,
} from "lucide-react";

const modes: { id: NavigationMode; icon: typeof Eye; label: string }[] = [
  { id: "orbit", icon: RotateCcw, label: "Orbit" },
  { id: "firstPerson", icon: Eye, label: "First Person" },
  { id: "fly", icon: Navigation, label: "Fly" },
  { id: "guided", icon: Move, label: "Guided Tour" },
];

export default function ViewerToolbar() {
  const {
    mode,
    setMode,
    toggleMaterialEditor,
    showMaterialEditor,
    toggleFullscreen,
    toggleMinimap,
    showMinimap,
  } = useViewerStore();

  return (
    <div className="viewer-toolbar">
      <div className="flex items-center gap-2 glass-dark rounded-2xl px-2 py-2">
        {/* Navigation Modes */}
        <div className="flex items-center gap-1 pr-2 border-r border-white/10">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                mode === m.id
                  ? "bg-electric/10 text-electric"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              title={m.label}
            >
              <m.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Tools */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleMaterialEditor}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              showMaterialEditor
                ? "bg-electric/10 text-electric"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Material Editor"
          >
            <Paintbrush className="w-4 h-4" />
          </button>

          <button
            onClick={toggleMinimap}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              showMinimap
                ? "bg-electric/10 text-electric"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
            title="Minimap"
          >
            <Map className="w-4 h-4" />
          </button>

          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            title="Screenshot"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
