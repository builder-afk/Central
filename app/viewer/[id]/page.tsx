"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import ViewerToolbar from "@/components/viewer/ViewerToolbar";
import MaterialEditor from "@/components/viewer/MaterialEditor";
import { useViewerStore } from "@/store/useViewerStore";

const Scene = dynamic(() => import("@/components/viewer/Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-space-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-electric to-purple flex items-center justify-center animate-pulse-glow">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <p className="text-slate-500 text-sm font-display">Loading 3D Engine...</p>
      </div>
    </div>
  ),
});

export default function ViewerPage() {
  const params = useParams();
  const activeRoom = useViewerStore((s) => s.activeRoom);
  const mode = useViewerStore((s) => s.mode);

  return (
    <div className="fixed inset-0 bg-space-black">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="glass-dark rounded-xl px-4 py-2">
            <h2 className="text-sm font-semibold text-white">
              Project Viewer
            </h2>
            <p className="text-xs text-slate-500">ID: {params.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode indicator */}
          <div className="glass-dark rounded-xl px-4 py-2">
            <span className="text-xs text-slate-500">Mode:</span>{" "}
            <span className="text-xs text-electric font-medium capitalize">
              {mode === "firstPerson" ? "First Person" : mode}
            </span>
          </div>

          {/* Active room */}
          {activeRoom && (
            <div className="glass-dark rounded-xl px-4 py-2 animate-scale-in">
              <span className="text-xs text-slate-500">Selected:</span>{" "}
              <span className="text-xs text-white font-medium">
                {activeRoom}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3D Scene */}
      <Scene />

      {/* Material Editor */}
      <MaterialEditor />

      {/* Toolbar */}
      <ViewerToolbar />

      {/* Room Labels Overlay */}
      <div className="absolute left-4 bottom-20 z-20">
        <div className="glass-dark rounded-xl p-3 space-y-1.5">
          <p className="text-xs text-slate-500 font-medium mb-2">Rooms</p>
          {[
            "Living Room",
            "Kitchen",
            "Bedroom 1",
            "Bedroom 2",
            "Bathroom",
          ].map((room) => (
            <button
              key={room}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${
                activeRoom === room
                  ? "bg-electric/10 text-electric"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute right-4 bottom-20 z-20">
        <div className="glass-dark rounded-xl p-3">
          <p className="text-xs text-slate-500 font-medium mb-2">Controls</p>
          <div className="space-y-1 text-xs text-slate-400">
            <p>🖱 Left click + drag to rotate</p>
            <p>🖱 Right click + drag to pan</p>
            <p>⚙️ Scroll to zoom</p>
            <p>🎨 Click objects to select</p>
          </div>
        </div>
      </div>
    </div>
  );
}
