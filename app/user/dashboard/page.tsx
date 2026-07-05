"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  CalendarCheck, 
  MapPin, 
  Clock, 
  Video, 
  Building2, 
  ChevronRight, 
  Star, 
  FileText,
  Bookmark,
  Heart
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";

// Mock Data
const upcomingVisits = [
  {
    id: "v1",
    builderName: "Arjun Kapoor",
    company: "Kapoor & Associates",
    date: "Oct 24, 2026",
    time: "10:30 AM",
    type: "Site Visit",
    location: "The Glass House Site, Pune",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    id: "v2",
    builderName: "Meera Patel",
    company: "Studio Vastu",
    date: "Oct 28, 2026",
    time: "2:00 PM",
    type: "Virtual Consultation",
    location: "Google Meet",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
  }
];

const savedBuilders = [
  {
    id: "b3",
    name: "Vikram Singh",
    rating: 4.7,
    reviews: 156,
    projects: 42,
  }
];

const activeQuotes = [
  {
    id: "q1",
    builderName: "Arjun Kapoor",
    date: "Oct 20, 2026",
    status: "In Review",
    type: "Villa Construction"
  }
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"visits" | "quotes" | "saved">("visits");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body pb-24">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-12 bg-white border-b border-slate-200">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-heading text-slate-900 mb-3">My Dashboard</h1>
              <p className="text-slate-500">Manage your consultations, quotes, and saved properties.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/builders" className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-md">
                Find More Builders
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-container mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Tabs */}
          <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-full shadow-sm w-fit">
            {[
              { id: "visits", label: "My Visits", icon: CalendarCheck },
              { id: "quotes", label: "Quotes", icon: FileText },
              { id: "saved", label: "Saved", icon: Bookmark },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                  <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "visits" | "quotes" | "saved")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-slate-900 text-white shadow-md" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {activeTab === "visits" && (
              <>
                <h2 className="text-xl font-semibold text-slate-900">Upcoming Visits</h2>
                {upcomingVisits.map((visit) => (
                  <motion.div key={visit.id} variants={itemVariants} className="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative">
                      <Image src={visit.image} alt="Project" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              visit.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {visit.status}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                              {visit.type === 'Site Visit' ? <MapPin className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                              {visit.type}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900">{visit.builderName}</h3>
                          <p className="text-sm text-slate-500">{visit.company}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                            <CalendarCheck className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{visit.date}</p>
                            <p className="text-xs">{visit.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-slate-400" />
                          </div>
                          <div className="line-clamp-2 text-xs">
                            {visit.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <button className="px-4 py-2 w-full rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
                        {visit.type === 'Site Visit' ? 'Get Directions' : 'Join Call'}
                      </button>
                      <button className="px-4 py-2 w-full rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </motion.div>
                ))}
              </>
            )}

            {activeTab === "quotes" && (
              <>
                <h2 className="text-xl font-semibold text-slate-900">Active Quotes</h2>
                {activeQuotes.map((quote) => (
                  <motion.div key={quote.id} variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">{quote.type} Quote</h3>
                        <p className="text-sm text-slate-500">Requested from {quote.builderName} • {quote.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
                        {quote.status}
                      </span>
                      <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </>
            )}

            {activeTab === "saved" && (
              <>
                <h2 className="text-xl font-semibold text-slate-900">Saved Builders</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedBuilders.map((builder) => (
                    <motion.div key={builder.id} variants={itemVariants} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-heading text-xl">
                          {builder.name.charAt(0)}
                        </div>
                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <h3 className="font-medium text-slate-900 mb-1">{builder.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-medium text-slate-700">{builder.rating}</span>
                        </span>
                        <span>•</span>
                        <span>{builder.projects} Projects</span>
                      </div>
                      <Link href={`/builders/${builder.id}`} className="w-full py-2 flex items-center justify-center gap-2 rounded-xl bg-slate-50 text-slate-700 text-sm font-medium group-hover:bg-slate-100 transition-colors">
                        View Profile
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Sidebar / Quick Stats */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <h3 className="text-lg font-medium mb-6">Overview</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Upcoming Visits</span>
                <span className="text-2xl font-semibold">{upcomingVisits.length}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Active Quotes</span>
                <span className="text-2xl font-semibold">{activeQuotes.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Saved Builders</span>
                <span className="text-2xl font-semibold">{savedBuilders.length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm">
            <h3 className="font-medium text-slate-900 mb-2">Need Help?</h3>
            <p className="text-sm text-slate-500 mb-4">Have questions about your upcoming visits or quotes?</p>
            <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
