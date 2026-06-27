"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Home,
  Building2,
  Building,
  Layers,
  Store,
  Upload,
  ArrowRight,
  ArrowLeft,
  MapPin,
  User,
  FileText,
  Check,
} from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";

const types = [
  { id: "house", label: "House", icon: Home, gradient: "from-blue-500 to-cyan-500" },
  { id: "villa", label: "Villa", icon: Building2, gradient: "from-purple-500 to-pink-500" },
  { id: "apartment", label: "Apartment", icon: Building, gradient: "from-amber-500 to-orange-500" },
  { id: "office", label: "Office", icon: Layers, gradient: "from-emerald to-teal-500" },
  { id: "commercial", label: "Commercial", icon: Store, gradient: "from-rose-500 to-red-500" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const addProject = useProjectStore((s) => s.addProject);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: "",
    name: "",
    description: "",
    location: "",
    client: "",
  });
  const [isDragging, setIsDragging] = useState(false);

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleCreate = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: form.name || "Untitled Project",
      type: (form.type || "house") as "house" | "villa" | "apartment" | "office" | "commercial",
      description: form.description || "",
      location: form.location || "",
      client: form.client || "",
      status: "draft" as const,
      thumbnail: "",
      team: [{ name: "Kunal V.", avatar: "KV" }],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      views: 0,
      floors: 1,
      rooms: 0,
    };
    addProject(newProject);
    router.push(`/viewer/${newProject.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white mb-1">
          Create New Project
        </h1>
        <p className="text-slate-500 text-sm">
          Set up your property project and start building 3D walkthroughs.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {["Type", "Details", "Upload"].map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                i < step
                  ? "bg-electric text-white"
                  : i === step
                  ? "bg-electric/10 text-electric border border-electric/30"
                  : "bg-white/5 text-slate-500"
              }`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium ${
                i <= step ? "text-white" : "text-slate-500"
              }`}
            >
              {label}
            </span>
            {i < 2 && (
              <div
                className={`flex-1 h-px ${
                  i < step ? "bg-electric" : "bg-white/5"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Project Type */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-display text-lg font-semibold text-white mb-4">
            Select project type
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => update("type", type.id)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all ${
                  form.type === type.id
                    ? "glass-card gradient-border shadow-glow"
                    : "glass-card hover:bg-white/5"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-lg ${
                    form.type === type.id ? "scale-110" : ""
                  } transition-transform`}
                >
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    form.type === type.id ? "text-white" : "text-slate-400"
                  }`}
                >
                  {type.label}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            disabled={!form.type}
            className="btn-primary !py-3 w-full group disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      )}

      {/* Step 1: Details */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="project-name" className="text-sm text-slate-400 mb-1.5 block">
              Project Name *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                id="project-name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g., Sunrise Villa"
                className="input-field !pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="project-desc" className="text-sm text-slate-400 mb-1.5 block">
              Description
            </label>
            <textarea
              id="project-desc"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Brief description of the project..."
              className="input-field min-h-[100px] resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="project-location" className="text-sm text-slate-400 mb-1.5 block">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="project-location"
                  type="text"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="City, Country"
                  className="input-field !pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="project-client" className="text-sm text-slate-400 mb-1.5 block">
                Client
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  id="project-client"
                  type="text"
                  value={form.client}
                  onChange={(e) => update("client", e.target.value)}
                  placeholder="Client name"
                  className="input-field !pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={() => setStep(0)} className="btn-secondary flex-1 !py-3">
              <span className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </span>
            </button>
            <button
              onClick={() => setStep(2)}
              className="btn-primary flex-1 !py-3 group"
            >
              <span className="flex items-center justify-center gap-2">
                Continue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Upload */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
              isDragging
                ? "border-electric bg-electric/5"
                : "border-white/10 hover:border-white/20"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
          >
            <div className="w-16 h-16 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-electric" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Upload floor plans or 3D models
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              Drag and drop files here, or click to browse. Supports PDF, PNG,
              JPG, DWG, DXF, OBJ, FBX, GLTF, GLB, SKP, and more.
            </p>
            <button className="btn-secondary text-sm">Browse Files</button>
          </div>

          {/* Format support badges */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {["PDF", "PNG", "DWG", "OBJ", "GLTF", "FBX", "SKP", "LiDAR"].map(
              (format) => (
                <span
                  key={format}
                  className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-slate-500 font-mono"
                >
                  .{format.toLowerCase()}
                </span>
              )
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1 !py-3">
              <span className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </span>
            </button>
            <button onClick={handleCreate} className="btn-primary flex-1 !py-3 group">
              <span className="flex items-center justify-center gap-2">
                Create Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <p className="text-center text-xs text-slate-600 mt-4">
            You can also skip this step and upload files later from the project
            editor.
          </p>
        </motion.div>
      )}
    </div>
  );
}
