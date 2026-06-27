"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { BUSINESS, WHATSAPP, SOCIAL_LINKS } from "@/lib/constants";
import {
  ArrowLeft,
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  Clock,
  Sparkles,
  Building2,
  Camera,
  BarChart3,
  Wand2,
  Video,
  Globe,
} from "lucide-react";

const services = [
  { id: "3d-tours", label: "3D Property Tours", icon: Building2 },
  { id: "360-tours", label: "360° Virtual Tours", icon: Camera },
  { id: "microsites", label: "Property Microsites", icon: Globe },
  { id: "ai-staging", label: "AI Staging & Visualization", icon: Wand2 },
  { id: "drone-video", label: "Drone & Video Content", icon: Video },
  { id: "analytics", label: "Analytics & Lead Gen", icon: BarChart3 },
  { id: "full-suite", label: "Full Marketing Suite", icon: Sparkles },
  { id: "other", label: "Something Else", icon: MessageCircle },
];

const faqs = [
  {
    q: "How long does a 3D tour take to produce?",
    a: "From on-site capture to delivery, most projects take 5-7 business days. Rush delivery available for an additional fee.",
  },
  {
    q: "Do you travel to different cities?",
    a: "Yes! We serve all major Indian cities including Mumbai, Bangalore, Pune, Delhi NCR, Goa, and more. Travel costs may apply for Tier 2/3 cities.",
  },
  {
    q: "Can I try a demo before committing?",
    a: "Absolutely. We offer a free consultation where we assess your property and show relevant examples from our portfolio.",
  },
  {
    q: "What's included in the Starter package?",
    a: "A 360° tour, basic microsite with gallery, and a shareable link. Perfect for individual properties looking for a digital presence.",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [refNumber, setRefNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: selectedService,
      message: formData.get("message"),
      source: "Contact Page",
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setFormState("success");
        setRefNumber(result.refNumber);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5f0] font-body">
      <Navbar />

      {/* Hero Header */}
      <div className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#50372b]/50 hover:text-[#50372b] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading italic text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-[#50372b] mb-4">
              Let&apos;s create something{" "}
              <span className="text-[#F26522]">stunning.</span>
            </h1>
            <p className="text-[#50372b]/55 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl">
              Tell us about your project. We&apos;ll get back within 24 hours with a
              tailored proposal — or chat with us instantly on WhatsApp.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ─── LEFT: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {formState === "success" ? (
              /* ── Success State ── */
              <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-8 sm:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <h2 className="font-heading italic text-3xl sm:text-4xl text-[#50372b] mb-3">
                  Message Received!
                </h2>
                <p className="text-[#50372b]/55 text-[15px] mb-2 max-w-md mx-auto">
                  We&apos;ve got your inquiry and will get back to you within 24 hours
                  with a tailored proposal.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#50372b]/5 text-[13px] font-mono text-[#50372b]/60 mt-4 mb-8">
                  Reference: {refNumber}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={WHATSAPP.getUrl("Hi, I just submitted an inquiry (Ref: " + refNumber + "). Looking forward to your response!")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-[14px] font-medium hover:bg-[#20BD5A] transition-colors shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Follow up on WhatsApp
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#50372b]/10 text-[#50372b]/70 text-[14px] font-medium hover:border-[#50372b]/25 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              /* ── Contact Form ── */
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6 sm:p-8 lg:p-10 space-y-6"
              >
                {/* Service Selection */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-3">
                    What are you interested in?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const isSelected = selectedService === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setSelectedService(isSelected ? "" : service.id)}
                          className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-center transition-all duration-300 ${
                            isSelected
                              ? "bg-[#F26522]/10 border-[#F26522]/30 border text-[#F26522] shadow-sm"
                              : "bg-[#faf5f0] border border-transparent text-[#50372b]/60 hover:bg-[#50372b]/5"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[11px] font-medium leading-tight">
                            {service.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-2">
                      Your Name *
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Rajesh Kumar"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="rajesh@company.com"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-2">
                      Company / Builder Name
                    </label>
                    <input
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Prestige Group"
                      className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none placeholder:text-[#50372b]/30"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Describe your property, what you're looking for, and any specific requirements..."
                    className="w-full bg-[#faf5f0] border border-[#50372b]/8 focus:border-[#50372b]/25 focus:bg-white focus:ring-1 focus:ring-[#50372b]/10 transition-all rounded-xl px-4 py-3 text-[14px] text-[#50372b] outline-none resize-none placeholder:text-[#50372b]/30"
                  />
                </div>

                {formState === "error" && (
                  <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-[13px] text-red-600 font-medium">
                    Something went wrong. Please try again or contact us on WhatsApp.
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#50372b] text-white text-[14px] font-medium hover:bg-[#624334] transition-all duration-300 hover:translate-y-[-1px] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </>
                    )}
                  </button>

                  <span className="text-[12px] text-[#50372b]/35 font-medium text-center sm:text-left">
                    or{" "}
                    <a
                      href={WHATSAPP.getUrl(WHATSAPP.defaultMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline font-semibold"
                    >
                      chat on WhatsApp
                    </a>{" "}
                    for instant response
                  </span>
                </div>
              </form>
            )}
          </motion.div>

          {/* ─── RIGHT: Contact Info + FAQ ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quick Contact Cards */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6 space-y-4">
              <h3 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-2">
                Quick Connect
              </h3>

              {/* WhatsApp */}
              <a
                href={WHATSAPP.getUrl(WHATSAPP.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/8 hover:bg-[#25D366]/15 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">
                    WhatsApp
                  </p>
                  <p className="text-[12px] text-[#50372b]/50">
                    Instant response • {BUSINESS.phone}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/60 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">
                    Email
                  </p>
                  <p className="text-[12px] text-[#50372b]/50">
                    {BUSINESS.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-amber-50/60 hover:bg-amber-50 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">
                    Call Us
                  </p>
                  <p className="text-[12px] text-[#50372b]/50">
                    {BUSINESS.phone}
                  </p>
                </div>
              </a>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#F26522]/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#F26522]" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#50372b]">
                  Response Time
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#50372b]/60">WhatsApp</span>
                  <span className="text-[12px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ~5 min
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#50372b]/60">Email</span>
                  <span className="text-[12px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    &lt; 24 hrs
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[#50372b]/60">Phone</span>
                  <span className="text-[12px] font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    Mon–Sat 10–7
                  </span>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#50372b]">{BUSINESS.address}</p>
                  <p className="text-[12px] text-[#50372b]/50">We serve all major Indian cities</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-[20px] border border-[#50372b]/8 shadow-sm p-6">
              <h3 className="text-[12px] font-mono uppercase tracking-widest text-[#50372b]/40 mb-4">
                Common Questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full text-left flex items-start gap-3 py-3 text-[13px] font-medium text-[#50372b]/80 hover:text-[#50372b] transition-colors"
                    >
                      <span className="text-[#F26522] shrink-0 mt-0.5">
                        {expandedFaq === i ? "−" : "+"}
                      </span>
                      {faq.q}
                    </button>
                    {expandedFaq === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[13px] text-[#50372b]/50 leading-relaxed pl-6 pb-3"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white border border-[#50372b]/8 flex items-center justify-center text-[#50372b]/40 hover:text-[#50372b] hover:border-[#50372b]/20 transition-all shadow-sm text-[12px] font-mono uppercase"
                  aria-label={platform}
                >
                  {platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
