"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  Store,
  Paintbrush,
  Hammer,
  Upload,
  ImagePlus,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";

const projectTypes = [
  { id: "villa", label: "Villa / Independent House", icon: Home, emoji: "🏡" },
  { id: "apartment", label: "Apartment / Flat", icon: Building2, emoji: "🏢" },
  { id: "commercial", label: "Commercial Space", icon: Store, emoji: "🏪" },
  { id: "interior", label: "Interior Design", icon: Paintbrush, emoji: "🎨" },
  { id: "renovation", label: "Renovation", icon: Hammer, emoji: "🔨" },
];

const timelines = [
  { id: "1-3", label: "1 – 3 Months", sublabel: "Urgent", icon: "⚡" },
  { id: "3-6", label: "3 – 6 Months", sublabel: "Standard", icon: "📅" },
  { id: "6-12", label: "6 – 12 Months", sublabel: "Flexible", icon: "🕐" },
  { id: "12+", label: "12+ Months", sublabel: "Long-term", icon: "📋" },
];

export default function QuoteRequestPage() {
  const params = useParams();
  const getBuilderById = useBuilderStore((s) => s.getBuilderById);
  const builder = getBuilderById(params.id as string);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [budget, setBudget] = useState(50);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const budgetLabel = budget < 25 ? "Under ₹25L" : budget < 50 ? `₹${budget}L` : budget < 75 ? `₹${budget}L` : budget < 100 ? `₹${budget}L – ₹1Cr` : "₹1Cr+";
  const budgetValue = budget < 10 ? "Under ₹10L" : budget >= 100 ? "₹1 Cr+" : `₹${budget}L`;

  const canNext = () => {
    if (step === 1) return selectedType !== "";
    if (step === 2) return true;
    if (step === 3) return true;
    if (step === 4) return timeline !== "";
    return true;
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (!builder) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Builder not found</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-body">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <h1 className="font-heading italic text-4xl text-slate-900 mb-3">Quote Requested!</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Your quote request has been sent to {builder.name}. They typically respond within {builder.responseTime.replace("< ", "")}.
          </p>
          <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm mb-8">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-slate-400 text-xs mb-1">Project Type</p>
                <p className="text-slate-800 font-medium">{projectTypes.find(t => t.id === selectedType)?.label}</p>
              </div>
              <div className="text-left">
                <p className="text-slate-400 text-xs mb-1">Budget</p>
                <p className="text-slate-800 font-medium">{budgetValue}</p>
              </div>
              <div className="text-left">
                <p className="text-slate-400 text-xs mb-1">Timeline</p>
                <p className="text-slate-800 font-medium">{timelines.find(t => t.id === timeline)?.label}</p>
              </div>
              <div className="text-left">
                <p className="text-slate-400 text-xs mb-1">Inspiration</p>
                <p className="text-slate-800 font-medium">{uploadedImages.length} images</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Link
              href={`/builders/${builder.id}`}
              className="px-6 py-3 rounded-full bg-white text-slate-700 border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-all shadow-sm"
            >
              View Profile
            </Link>
            <Link
              href={`/builders/${builder.id}/chat`}
              className="px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-md"
            >
              Chat with {builder.name.split(" ")[0]}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="section-container flex items-center justify-between h-14">
          <Link
            href={`/builders/${builder.id}`}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{builder.name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">Request Quote</span>
          </div>
          <span className="text-xs text-slate-400">Step {step} of {totalSteps}</span>
        </div>
        {/* Progress Bar */}
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step Content */}
      <div className="section-container py-12 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* STEP 1: Project Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-heading italic text-4xl text-slate-900 mb-2">What are you building?</h2>
              <p className="text-slate-500 mb-8">Select the type of project you need help with.</p>

              <div className="space-y-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`quote-step-card w-full flex items-center gap-4 text-left ${selectedType === type.id ? "selected" : ""}`}
                  >
                    <span className="text-2xl">{type.emoji}</span>
                    <span className="text-sm font-medium text-slate-800">{type.label}</span>
                    {selectedType === type.id && (
                      <CheckCircle2 className="w-5 h-5 text-slate-900 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Budget */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-heading italic text-4xl text-slate-900 mb-2">What&apos;s your budget?</h2>
              <p className="text-slate-500 mb-10">Drag the slider to set your approximate budget range.</p>

              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <div className="text-center mb-10">
                  <motion.p
                    key={budget}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-heading italic text-6xl text-slate-900 tracking-[-3px]"
                  >
                    {budgetValue}
                  </motion.p>
                </div>

                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="slider-modern w-full"
                  style={{
                    background: `linear-gradient(90deg, #0f172a ${((budget - 5) / 145) * 100}%, #e2e8f0 ${((budget - 5) / 145) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>₹5L</span>
                  <span>₹1 Cr+</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Upload Inspiration */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-heading italic text-4xl text-slate-900 mb-2">Share your inspiration</h2>
              <p className="text-slate-500 mb-8">Upload images that inspire your dream project. (Optional)</p>

              {/* Upload Zone */}
              <div
                onClick={() => {
                  // Simulate adding an image
                  setUploadedImages([...uploadedImages, `inspiration-${uploadedImages.length + 1}`]);
                }}
                className="border-2 border-dashed border-slate-200 rounded-[1.5rem] p-12 text-center cursor-pointer hover:border-slate-400 hover:bg-slate-50/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-200 transition-colors">
                  <ImagePlus className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-700 mb-1">Click to add inspiration images</p>
                <p className="text-xs text-slate-400">PNG, JPG up to 10MB each</p>
              </div>

              {/* Uploaded preview */}
              {uploadedImages.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {uploadedImages.map((img, i) => (
                    <motion.div
                      key={img}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs text-slate-500 shadow-sm"
                    >
                      📷 {i + 1}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: Timeline */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-heading italic text-4xl text-slate-900 mb-2">When do you want to start?</h2>
              <p className="text-slate-500 mb-8">Select your preferred project timeline.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timelines.map((tl) => (
                  <button
                    key={tl.id}
                    onClick={() => setTimeline(tl.id)}
                    className={`quote-step-card flex items-center gap-4 text-left ${timeline === tl.id ? "selected" : ""}`}
                  >
                    <span className="text-2xl">{tl.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{tl.label}</p>
                      <p className="text-xs text-slate-400">{tl.sublabel}</p>
                    </div>
                    {timeline === tl.id && (
                      <CheckCircle2 className="w-5 h-5 text-slate-900 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Review & Submit */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-heading italic text-4xl text-slate-900 mb-2">Review your request</h2>
              <p className="text-slate-500 mb-8">Make sure everything looks good before submitting.</p>

              <div className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className={`w-14 h-14 rounded-[1rem] bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-xl font-heading italic text-white shadow-md`}>
                    {builder.avatar}
                  </div>
                  <div>
                    <p className="font-heading italic text-xl text-slate-900">{builder.name}</p>
                    <p className="text-sm text-slate-500">{builder.company}</p>
                  </div>
                </div>

                {[
                  { label: "Project Type", value: projectTypes.find(t => t.id === selectedType)?.label || "—" },
                  { label: "Budget", value: budgetValue },
                  { label: "Inspiration Images", value: `${uploadedImages.length} images uploaded` },
                  { label: "Timeline", value: timelines.find(t => t.id === timeline)?.label || "—" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <span className="text-sm font-medium text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
              step === 1
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm"
            }`}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canNext()}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all shadow-md ${
              canNext()
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
            }`}
          >
            {step === totalSteps ? "Submit Request" : "Continue"}
            {step < totalSteps && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
