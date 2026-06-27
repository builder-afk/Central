"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, CheckCircle2, ShieldCheck, Maximize, Compass, Building2, Sofa, KeyRound, Info, CalendarDays, Wallet, Building, UserCircle } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { properties } from "@/data/properties";

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const property = properties.find((p) => p.id === resolvedParams.id);

  if (!property) {
    return (
      <div className="bg-[#faf5f0] min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl text-[#50372b] font-bold">Property not found</h1>
        <Link href="/" className="mt-4 text-[#F26522] underline">Return Home</Link>
      </div>
    );
  }

  // Use gallery if available, otherwise just use the main image repeated
  const images = property.gallery && property.gallery.length >= 3 
    ? property.gallery 
    : [property.image, property.image, property.image];

  return (
    <div className="bg-[#faf5f0] min-h-screen flex flex-col font-sans">
      <Navbar />
      <div className="h-24 sm:h-32"></div>

      <main className="flex-grow px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto w-full pb-20">
        
        {/* Breadcrumb / Back */}
        <Link href={`/category/${property.categorySlug}`} className="inline-flex items-center gap-2 text-[#50372b]/70 hover:text-[#50372b] transition-colors mb-6 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to {property.categorySlug.toUpperCase()}
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#50372b] tracking-tight">
                {property.title}
              </h1>
              {property.isVerified && (
                <span className="hidden sm:flex bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[#50372b]/70 font-medium text-lg">
              <MapPin className="w-5 h-5" />
              {property.location}
            </div>
          </div>
          
          <div className="text-left md:text-right">
            <div className="text-4xl md:text-5xl font-bold text-[#50372b] mb-1">
              {property.price}
            </div>
            {property.pricePerSqft && (
              <div className="text-[#50372b]/60 font-medium">
                {property.pricePerSqft}
              </div>
            )}
          </div>
        </div>

        {/* Immersive Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
          <div className="md:col-span-3 relative h-full">
            <Image 
              src={images[0]} 
              alt="Property Hero" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="relative h-1/2 w-full">
              <Image 
                src={images[1]} 
                alt="Gallery 1" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              />
            </div>
            <div className="relative h-1/2 w-full">
              <Image 
                src={images[2]} 
                alt="Gallery 2" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
              />
              <div className="absolute inset-0 bg-[#50372b]/40 flex items-center justify-center cursor-pointer hover:bg-[#50372b]/50 transition-colors">
                <span className="text-white font-semibold text-lg drop-shadow-md">View All</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="flex-grow max-w-4xl">
            
            {/* Specs Bar */}
            <div className="flex flex-wrap gap-3 mb-10">
              {property.specs.split("•").map((spec, idx) => (
                <span key={idx} className="bg-white text-[#50372b] px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide border border-[#50372b]/10 shadow-sm">
                  {spec.trim()}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-[#50372b] mb-4">About the Property</h2>
              <p className="text-[#50372b]/80 text-lg leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Comprehensive Overview Grid (The "Own Words" implementation of Details) */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-[#50372b] mb-6">Comprehensive Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 bg-white p-8 rounded-3xl border border-[#50372b]/10 shadow-sm">
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <Maximize className="w-4 h-4" /> Spatial Metrics
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.carpetArea || "N/A"}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <CalendarDays className="w-4 h-4" /> Property Vintage
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.propertyVintage || "N/A"}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <Compass className="w-4 h-4" /> Orientation
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.facing || "N/A"}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <Building className="w-4 h-4" /> Legal Status
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.ownership || "N/A"}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <KeyRound className="w-4 h-4" /> Current State
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.status || "N/A"}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <Sofa className="w-4 h-4" /> Furnishing
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.furnishing || "N/A"}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <Building2 className="w-4 h-4" /> Floor Level
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.floor || "N/A"}</div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[#50372b]/50 text-sm font-semibold uppercase tracking-wider mb-1">
                    <Wallet className="w-4 h-4" /> Maintenance
                  </div>
                  <div className="text-lg font-medium text-[#50372b]">{property.maintenance || "N/A"}</div>
                </div>

              </div>
            </div>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-[#50372b] mb-6">Lifestyle & Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white border border-[#50372b]/10 text-[#50372b] px-4 py-2.5 rounded-xl font-medium shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landmarks Section */}
            {property.landmarks && property.landmarks.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-[#50372b] mb-6">The Neighborhood</h2>
                <ul className="space-y-3">
                  {property.landmarks.map((landmark, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[#50372b]/80 text-lg font-medium">
                      <MapPin className="w-5 h-5 text-[#50372b]/40 shrink-0 mt-0.5" />
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Sidebar: Sticky Contact Card */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-32 bg-white rounded-3xl border border-[#50372b]/10 p-8 shadow-xl shadow-[#50372b]/5">
              <h3 className="text-xl font-semibold text-[#50372b] mb-6 border-b border-[#50372b]/10 pb-4">
                Connect with Partner
              </h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#faf5f0] border border-[#50372b]/10 flex items-center justify-center">
                  <UserCircle className="w-10 h-10 text-[#50372b]/40" />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#50372b]">{property.sellerName || "Partner"}</div>
                  <div className="text-sm font-medium text-[#50372b]/60 bg-[#faf5f0] px-2 py-0.5 rounded-md inline-block mt-1">
                    {property.sellerType || "Agent"}
                  </div>
                </div>
              </div>

              {property.sellerSince && (
                <div className="flex items-center gap-2 text-sm text-[#50372b]/70 font-medium mb-8">
                  <Info className="w-4 h-4" />
                  Operating on platform since {property.sellerSince}
                </div>
              )}

              <div className="space-y-3">
                <button className="w-full bg-[#F26522] hover:bg-[#e05a1a] text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-md">
                  Request Callback
                </button>
                <button className="w-full bg-[#50372b] hover:bg-[#3a2518] text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-md">
                  Contact on WhatsApp
                </button>
              </div>

              <p className="text-center text-xs text-[#50372b]/50 font-medium mt-6">
                Your details are kept secure and only shared with the seller.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
