"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";
import { signup } from "@/lib/api/auth";

const steps = [
  { label: "Account", description: "Email & password" },
  { label: "Profile", description: "Your details" },
  { label: "Workspace", description: "Get started" },
];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    role: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setError(null);
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const signupData = {
        email: form.email,
        password: form.password,
        full_name: form.name,
        company: form.company || undefined,
        role: form.role || undefined,
      };

      await signup(signupData);
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Something went wrong during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 relative bg-[#fdf8f5] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-purple/10 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-electric/10 blur-[100px]" />

        <div className="relative z-10 max-w-md px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple to-electric flex items-center justify-center mb-8 shadow-glow-purple">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
              Start building
              <span className="gradient-text"> stunning 3D tours</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Join thousands of architects, developers, and designers creating
              immersive property experiences.
            </p>

            {/* Feature list */}
            <ul className="space-y-3">
              {[
                "Free forever plan — no credit card",
                "AI-powered floor plan to 3D",
                "Share tours with anyone",
                "Real-time collaboration",
              ].map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <div className="w-5 h-5 rounded-full bg-electric/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-electric" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric to-purple flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900">
              HouseVerse<span className="text-electric"> AI</span>
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
            Create your account
          </h1>
          <p className="text-slate-600 mb-8">
            Get started free — upgrade anytime.
          </p>

          {/* Progress Steps */}
          <div className="flex items-center gap-3 mb-8">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3 flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${i < step
                        ? "bg-electric text-white"
                        : i === step
                          ? "bg-electric/10 text-electric border border-electric/30"
                          : "bg-slate-900/5 text-slate-500"
                      }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="hidden sm:block">
                    <p
                      className={`text-xs font-medium ${i <= step ? "text-slate-900" : "text-slate-500"
                        }`}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px ${i < step ? "bg-electric" : "bg-slate-900/10"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Social Signup (Step 0) */}
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["Google", "Microsoft", "GitHub"].map((provider) => (
                  <button
                    key={provider}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all text-sm text-slate-700 font-medium"
                  >
                    {provider}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-500 uppercase tracking-wider">
                  or with email
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="signup-email" className="text-sm text-slate-600 mb-1.5 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="signup-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      placeholder="you@company.com"
                      className="input-field !pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-password" className="text-sm text-slate-600 mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => updateForm("password", e.target.value)}
                      placeholder="Min 8 characters"
                      className="input-field !pl-10 !pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {/* Password strength */}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${form.password.length >= i * 3
                            ? i <= 2
                              ? "bg-amber-500"
                              : "bg-emerald"
                            : "bg-slate-200"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="btn-primary w-full !py-3 text-base group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Profile (Step 1) */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="signup-name" className="text-sm text-slate-600 mb-1.5 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id="signup-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Your full name"
                    className="input-field !pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-company" className="text-sm text-slate-600 mb-1.5 block">
                  Company (Optional)
                </label>
                <input
                  id="signup-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => updateForm("company", e.target.value)}
                  placeholder="Your company name"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="signup-role" className="text-sm text-slate-600 mb-1.5 block">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Architect",
                    "Developer",
                    "Interior Designer",
                    "Homeowner",
                    "Construction",
                    "Other",
                  ].map((role) => (
                    <button
                      key={role}
                      onClick={() => updateForm("role", role)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${form.role === role
                          ? "bg-electric/10 text-electric border border-electric/30"
                          : "bg-white border border-slate-200 shadow-sm text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(0)}
                    disabled={loading}
                    className="btn-secondary flex-1 !py-3 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="btn-primary flex-1 !py-3 group disabled:opacity-50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Workspace (Step 2) */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric to-purple flex items-center justify-center mx-auto mb-6 shadow-glow animate-pulse-glow">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                You&apos;re all set!
              </h3>
              <p className="text-slate-600 mb-8">
                Your workspace is ready. Start creating your first 3D
                walkthrough.
              </p>

              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="btn-primary w-full !py-3 text-base group block"
                >
                  <span className="flex items-center justify-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/dashboard/projects/new"
                  className="btn-secondary w-full !py-3 text-base block text-center"
                >
                  Create First Project
                </Link>
              </div>
            </motion.div>
          )}

          {/* Terms */}
          {step < 2 && (
            <p className="text-center text-xs text-slate-600 mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-slate-900 hover:text-electric transition-colors underline decoration-slate-300 underline-offset-2">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-slate-900 hover:text-electric transition-colors underline decoration-slate-300 underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
          )}

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-electric hover:text-electric-light transition-colors font-medium"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
