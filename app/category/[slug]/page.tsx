"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Building, Home, Key, TrendingUp, Tag, TreePine, BedDouble, Search } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/properties/PropertyCard";

// Mock data for categories
const categoryData: Record<string, any> = {
  buy: {
    title: "Buy a Home",
    icon: Home,
    tagline: "Find your dream property from verified builders",
    description: "Experience premium flats and villas through interactive virtual tours. Browse top builder portfolios and make smarter property decisions.",
    services: [
      "Immersive 360° Virtual Tours",
      "Verified Builder Portfolios",
      "Direct Booking for On-site Visits",
      "Legal Assistance & Property Valuation"
    ],
    subscriptions: [
      {
        name: "Standard Listing",
        price: "$49",
        features: ["Up to 5 Listings", "Basic Visibility", "Standard Support"]
      },
      {
        name: "Premium Virtual Tour",
        price: "$199",
        features: ["Unlimited Listings", "360° Virtual Tours Included", "Top Search Placement", "Dedicated Account Manager"],
        recommended: true
      }
    ]
  },
  rent: {
    title: "Rent a Home",
    icon: Key,
    tagline: "Flexible living options in top localities",
    description: "Browse thousands of verified rental properties. Filter by amenities, location, and budget to find the perfect place for you.",
    services: [
      "Verified Landlord Profiles",
      "Virtual Property Inspections",
      "Digital Rent Agreements",
      "Zero Brokerage Options"
    ],
    subscriptions: [
      {
        name: "Basic Rent List",
        price: "$29",
        features: ["List 2 Properties", "Contact 10 Tenants/month", "Standard Visibility"]
      },
      {
        name: "Pro Landlord",
        price: "$99",
        features: ["Unlimited Properties", "Unlimited Tenant Contacts", "Verified Badge", "Digital Agreements"],
        recommended: true
      }
    ]
  },
  invest: {
    title: "Invest in Real Estate",
    icon: TrendingUp,
    tagline: "Smart property investments with high ROI",
    description: "Discover high-yield real estate investment opportunities. Access detailed market data, ROI calculators, and expert insights.",
    services: [
      "Detailed Market Trend Analysis",
      "ROI & Yield Calculators",
      "Exclusive Pre-launch Offers",
      "Expert Investment Consultation"
    ],
    subscriptions: [
      {
        name: "Investor Basic",
        price: "$99",
        features: ["Access to Market Trends", "Basic ROI Calculators", "Email Alerts"]
      },
      {
        name: "Investor Pro",
        price: "$299",
        features: ["Exclusive Pre-launch Access", "Advanced Yield Analytics", "1-on-1 Expert Consultation", "Priority Support"],
        recommended: true
      }
    ]
  },
  sell: {
    title: "Sell / Rent Out Your Property",
    icon: Tag,
    tagline: "List your property and reach thousands of buyers",
    description: "Get the best value for your property. List with us to reach a wide audience of verified buyers and tenants quickly.",
    services: [
      "Professional Property Photography",
      "AI-driven Property Valuation",
      "Targeted Marketing Campaigns",
      "Dedicated Sales Assistance"
    ],
    subscriptions: [
      {
        name: "Self-Serve Listing",
        price: "$39",
        features: ["Standard Property Listing", "Direct Buyer Contact", "Basic Marketing"]
      },
      {
        name: "Managed Selling",
        price: "$149",
        features: ["Professional Photography", "AI Valuation Report", "Featured Listing", "Dedicated Sales Agent"],
        recommended: true
      }
    ]
  },
  plots: {
    title: "Plots & Land",
    icon: TreePine,
    tagline: "Build from the ground up on prime land",
    description: "Explore verified residential and commercial plots. Secure your land with complete legal transparency and clear titles.",
    services: [
      "Verified Land Titles & Legal Checks",
      "Drone Footage of Land Parcels",
      "Zoning & Permission Insights",
      "Architectural Consultation"
    ],
    subscriptions: [
      {
        name: "Land Owner Basic",
        price: "$59",
        features: ["List Up to 3 Plots", "Standard Visibility", "Buyer Inquiries"]
      },
      {
        name: "Premium Plot Promotor",
        price: "$199",
        features: ["Drone Footage Included", "Featured Placement", "Legal Verification Badge", "Priority Leads"],
        recommended: true
      }
    ]
  },
  pg: {
    title: "PG, Hostel & Co-living",
    icon: BedDouble,
    tagline: "Affordable shared spaces for students & professionals",
    description: "Find comfortable, safe, and fully-furnished co-living spaces. Perfect for students and working professionals looking for community.",
    services: [
      "Verified Amenities Checklist",
      "Roommate Matching Service",
      "Transparent Pricing & Rules",
      "Instant Booking"
    ],
    subscriptions: [
      {
        name: "PG Basic",
        price: "$19",
        features: ["List 1 Property", "Basic Room Details", "Standard Support"]
      },
      {
        name: "Co-living Pro",
        price: "$79",
        features: ["Multiple Properties", "Roommate Matching Integration", "Featured Placement", "Instant Booking Enablement"],
        recommended: true
      }
    ]
  },
  commercial: {
    title: "Lease Commercial Spaces",
    icon: Building,
    tagline: "Office, retail & warehouse spaces for business",
    description: "Find the perfect space for your business to thrive. From cozy cafes to large corporate offices and warehouses.",
    services: [
      "Commercial Lease Assistance",
      "Virtual Office Tours",
      "Compliance & Zoning Verification",
      "Custom Fit-out Consultation"
    ],
    subscriptions: [
      {
        name: "Commercial Standard",
        price: "$149",
        features: ["Standard Listing", "Basic Lead Gen", "Email Support"]
      },
      {
        name: "Commercial Premium",
        price: "$399",
        features: ["Virtual Tours Included", "Featured Corporate Listing", "Compliance Badge", "Dedicated Account Manager"],
        recommended: true
      }
    ]
  }
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const data = categoryData[slug as keyof typeof categoryData];
  
  // Filter properties matching this category slug
  const categoryProperties = properties.filter(p => p.categorySlug === slug);

  // If category is not found, fallback to buy
  const categoryInfo = data || categoryData.buy;
  const Icon = categoryInfo.icon;

  return (
    <div className="bg-[#faf5f0] min-h-screen flex flex-col">
      <Navbar />

      {/* Spacer for Navbar */}
      <div className="h-24 sm:h-32"></div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto pt-8 pb-12 lg:pt-12 lg:pb-16">
          <Link href="/#explore-categories" className="inline-flex items-center gap-2 text-[#50372b]/70 hover:text-[#50372b] transition-colors mb-8 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#50372b] flex items-center justify-center shadow-lg shadow-[#50372b]/20">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[#50372b] leading-tight tracking-tight">
              {categoryInfo.title}
            </h1>
          </div>

          <p className="text-xl sm:text-2xl text-[#50372b]/80 max-w-3xl font-medium mb-4">
            {categoryInfo.tagline}
          </p>
          <p className="text-lg text-[#50372b]/60 max-w-3xl">
            {categoryInfo.description}
          </p>
        </section>

        {/* Featured Listings Section */}
        <section className="px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto pb-16 lg:pb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#50372b] mb-3">Featured Listings</h2>
              <p className="text-[#50372b]/60 text-lg">
                Explore top-rated properties in this category from verified sellers and builders.
              </p>
            </div>
            
            {/* Search/Filter Mock button */}
            <button className="flex items-center gap-2 bg-white border border-[#50372b]/10 hover:border-[#50372b]/30 text-[#50372b] px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">
              <Search className="w-5 h-5 opacity-60" />
              Search & Filter
            </button>
          </div>

          {categoryProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProperties.map((property, idx) => (
                <PropertyCard key={property.id} property={property} index={idx} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#50372b]/10 p-12 text-center">
              <div className="w-16 h-16 bg-[#faf5f0] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#50372b]/40" />
              </div>
              <h3 className="text-xl font-semibold text-[#50372b] mb-2">No listings found</h3>
              <p className="text-[#50372b]/60">We couldn't find any properties in this category at the moment. Check back later!</p>
            </div>
          )}
        </section>

        {/* Detailed Services Section */}
        <section className="bg-white py-12 lg:py-20 border-y border-[#50372b]/5">
          <div className="px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
            <h2 className="text-3xl font-semibold text-[#50372b] mb-10">Services Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryInfo.services.map((service: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-[#faf5f0] p-6 rounded-2xl border border-[#50372b]/10 hover:shadow-lg transition-shadow"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#50372b] mb-4" />
                  <h3 className="text-lg font-medium text-[#50372b] leading-snug">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
