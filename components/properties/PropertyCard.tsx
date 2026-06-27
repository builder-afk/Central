"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck, ArrowRight, Maximize, Compass, Building2, Sofa, KeyRound, CheckCircle2 } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white rounded-3xl overflow-hidden border border-[#171717]/10 shadow-sm hover:shadow-xl hover:shadow-[#171717]/10 transition-all duration-300 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.isVerified && (
            <div className="bg-white/90 backdrop-blur-sm text-[#171717] px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <div className="bg-[#171717]/90 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-lg shadow-lg inline-block w-fit">
              {property.price}
            </div>
            {property.pricePerSqft && (
              <div className="text-white text-xs font-medium px-2 drop-shadow-md">
                {property.pricePerSqft}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#171717] mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[#171717]/60 text-sm mb-4">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.specs.split("•").map((spec, idx) => (
            <span key={idx} className="bg-[#faf5f0] text-[#171717]/80 px-3 py-1 rounded-lg text-xs font-semibold tracking-wide border border-[#171717]/5">
              {spec.trim()}
            </span>
          ))}
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4 text-xs text-[#171717]/70">
          {property.carpetArea && (
            <div className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5" /><span className="truncate">{property.carpetArea}</span></div>
          )}
          {property.status && (
            <div className="flex items-center gap-1.5"><KeyRound className="w-3.5 h-3.5" /><span className="truncate">{property.status}</span></div>
          )}
          {property.facing && (
            <div className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" /><span className="truncate">{property.facing}</span></div>
          )}
          {property.floor && (
            <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /><span className="truncate">Floor: {property.floor}</span></div>
          )}
          {property.furnishing && (
            <div className="flex items-center gap-1.5"><Sofa className="w-3.5 h-3.5" /><span className="truncate">{property.furnishing}</span></div>
          )}
        </div>

        <p className="text-[#171717]/70 text-sm line-clamp-2 mb-4 flex-grow">
          {property.description}
        </p>

        {/* Amenities Section */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-semibold text-[#171717]/50 mb-2 uppercase tracking-wider">Top Amenities</div>
            <div className="flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 3).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-white border border-[#171717]/10 text-[#171717]/70 px-2 py-1 rounded text-[11px] font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {amenity}
                </div>
              ))}
              {property.amenities.length > 3 && (
                <div className="bg-[#faf5f0] text-[#171717]/60 px-2 py-1 rounded text-[11px] font-medium">
                  +{property.amenities.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#171717]/10 flex items-center justify-between mt-auto">
          {property.builder ? (
            <div className="text-xs font-semibold text-[#171717]/60 uppercase tracking-wider">
              By {property.builder}
            </div>
          ) : (
            <div />
          )}

          <Link href={`/property/${property.id}`} className="flex items-center gap-1.5 text-[#171717] font-semibold text-sm group/btn hover:text-[#3a2518] transition-colors">
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
