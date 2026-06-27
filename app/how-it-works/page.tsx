"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Services from "@/components/landing/Services";
import Pricing from "@/components/landing/Pricing";
import CustomerStories from "@/components/landing/CustomerStories";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Hero = dynamic(() => import("@/components/landing/Hero"), {
  ssr: false,
  loading: () => (
    <section
      className="min-h-screen flex items-center justify-center bg-[#F5F5F5]"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse"
        />
        <span
          className="text-[12px] font-mono text-gray-400 tracking-widest uppercase"
        >
          LOADING
        </span>
      </div>
    </section>
  ),
});

export default function LandingPage() {
  return (
    <main className="bg-[#F5F5F5]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Services />
      <Pricing />
      <CustomerStories />
      <FAQ />
      <Footer />
    </main>
  );
}
