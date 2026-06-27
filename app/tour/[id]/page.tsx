"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Building2, Share2, Maximize, ExternalLink, Calendar, X, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Scene = dynamic(() => import("@/components/viewer/Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center animate-pulse">
          <Building2 className="w-6 h-6 text-gray-900" />
        </div>
        <p className="text-gray-400 text-[14px] font-medium tracking-wide uppercase">
          Loading 360° Tour...
        </p>
      </div>
    </div>
  ),
});

export default function TourPage() {
  const params = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBookingModalOpen(false);
      setIsBooked(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-gray-900">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg">
              <span className="text-gray-900 text-[14px] font-heading italic font-bold mt-0.5">h</span>
            </div>
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-[13px] text-white/80 font-medium tracking-wide uppercase">Interactive 360° Tour</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all shadow-sm"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all shadow-sm"
            title="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Scene */}
      <Scene />

      {/* Info Card */}
      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 z-20 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-5 max-w-[340px] shadow-2xl">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-[20px] font-semibold text-white leading-tight">
            Sunrise Villa
          </h2>
          <div className="px-2 py-1 bg-white/10 rounded-md text-[10px] text-white/80 font-bold tracking-wider uppercase">
            VILLA
          </div>
        </div>
        <p className="text-[14px] text-white/60 mb-4 font-medium leading-relaxed">
          Luxury 4-bedroom villa with panoramic ocean views and a private infinity pool.
        </p>
        <div className="flex items-center gap-4 text-[12px] text-white/50 font-medium mb-6">
          <span>📍 Goa, India</span>
          <span>🏠 2 Floors</span>
          <span>🚪 12 Rooms</span>
        </div>
        
        <button 
          onClick={() => setIsBookingModalOpen(true)}
          className="w-full bg-white text-gray-900 hover:bg-gray-100 transition-colors rounded-full py-3 px-4 flex items-center justify-center gap-2 shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[14px] font-semibold">Book an On-Site Visit</span>
        </button>
      </div>

      {/* Powered By Badge */}
      <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/5 rounded-full px-4 py-2 text-[11px] text-white/50 hover:text-white/80 transition-colors group"
          target="_blank"
        >
          POWERED BY{" "}
          <span className="font-bold text-white/80 group-hover:text-white transition-colors tracking-wide">
            HOUSEVERSE
          </span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
        </Link>
      </div>

      {/* Controls Guide */}
      <div className="absolute left-4 sm:left-6 top-24 z-20 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-lg">
        <p className="text-[11px] text-white/40 font-bold mb-3 tracking-widest uppercase">Navigation</p>
        <div className="space-y-2.5 text-[12px] text-white/70 font-medium">
          <p className="flex items-center gap-2"><span className="text-white/40">🖱</span> Drag to look around</p>
          <p className="flex items-center gap-2"><span className="text-white/40">⚙️</span> Scroll to zoom</p>
          <p className="flex items-center gap-2"><span className="text-white/40">👆</span> Pinch to zoom</p>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsBookingModalOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-[32px] p-6 sm:p-8 w-full max-w-md shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {isBooked ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-[24px] font-semibold text-gray-900 mb-2">Visit Requested!</h3>
                  <p className="text-[15px] text-gray-500 font-medium max-w-[260px]">
                    The builder will contact you shortly to confirm your on-site visit.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-[24px] font-semibold text-gray-900 mb-2 pr-8">Book On-Site Visit</h3>
                  <p className="text-[14px] text-gray-500 font-medium mb-8">
                    Schedule a time to see Sunrise Villa in person.
                  </p>
                  
                  <form onSubmit={handleBookVisit} className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Your Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 transition-all rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 transition-all rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Date</label>
                        <input 
                          required
                          type="date" 
                          className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 transition-all rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Time</label>
                        <input 
                          required
                          type="time" 
                          className="w-full bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 transition-all rounded-xl px-4 py-3 text-[15px] text-gray-900 font-medium outline-none"
                        />
                      </div>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 shadow-lg mt-4"
                    >
                      <span className="text-[15px] font-semibold">Request Visit</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
