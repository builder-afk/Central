import { create } from "zustand";

export interface BuilderProject {
  id: string;
  name: string;
  type: string;
  location: string;
  thumbnail: string;
  gradient: string;
  views: number;
  floors: number;
  rooms: number;
  status: "completed" | "in-progress";
  tourAvailable: boolean;
}

export interface BuilderReview {
  id: string;
  userName: string;
  userInitials: string;
  userGradient: string;
  rating: number;
  review: string;
  projectType: string;
  date: string;
}

export interface BuilderService {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
}

export type ProfessionalCategory = "Builder" | "Architect" | "Interior Designer" | "Landscape Architect";

export interface Builder {
  id: string;
  name: string;
  company: string;
  category: ProfessionalCategory;
  avatar: string;
  coverGradient: string;
  tagline: string;
  bio: string;
  location: string;
  specializations: string[];
  rating: number;
  reviewCount: number;
  projectCount: number;
  experience: string;
  verified: boolean;
  featured: boolean;
  contactEmail: string;
  website: string;
  completedProjects: number;
  activeTours: number;
  totalViews: number;
  startingPrice: string;
  avgPricePerSqft: string;
  responseTime: string;
  services: BuilderService[];
  reviews: BuilderReview[];
  projects: BuilderProject[];
}

const builders: Builder[] = [
  {
    id: "builder-1",
    name: "Arjun Kapoor",
    company: "Kapoor & Associates",
    category: "Builder",
    avatar: "AK",
    coverGradient: "from-blue-600 to-indigo-700",
    tagline: "Crafting luxury residences that redefine modern living",
    bio: "Award-winning architect with 15+ years of experience in luxury residential design. Specializing in villas and contemporary homes that blend seamlessly with their natural surroundings. Featured in Architectural Digest India and recognized with the IIID Award for Excellence.",
    location: "Mumbai, India",
    specializations: ["Luxury Villas", "Contemporary Homes", "Sustainable Design", "Interior Architecture"],
    rating: 4.9,
    reviewCount: 127,
    projectCount: 48,
    experience: "15+ years",
    verified: true,
    featured: true,
    contactEmail: "arjun@kapoor-associates.com",
    website: "kapoor-associates.com",
    completedProjects: 48,
    activeTours: 12,
    totalViews: 34500,
    startingPrice: "₹45L",
    avgPricePerSqft: "₹3,200",
    responseTime: "< 2 hours",
    services: [
      { id: "s1", name: "Turnkey Construction", description: "End-to-end construction from foundation to finishing with premium materials", icon: "🏗️" },
      { id: "s2", name: "Interior Design", description: "Luxury interior design with curated furniture and decor selection", icon: "🎨" },
      { id: "s3", name: "Renovation", description: "Transform existing spaces with modern design sensibilities", icon: "🔨" },
      { id: "s4", name: "Architecture", description: "Custom architectural design with 3D visualization and walkthroughs", icon: "📐" },
    ],
    reviews: [
      { id: "r1", userName: "Priya Sharma", userInitials: "PS", userGradient: "from-rose-400 to-pink-500", rating: 5, review: "Arjun transformed our vision into reality. The attention to detail in our villa is extraordinary. Every corner tells a story.", projectType: "Villa", date: "2 weeks ago" },
      { id: "r2", userName: "Rohit Mehta", userInitials: "RM", userGradient: "from-blue-400 to-cyan-500", rating: 5, review: "Professional, creative, and always on time. Our penthouse looks like it belongs in a magazine. Highly recommend!", projectType: "Apartment", date: "1 month ago" },
      { id: "r3", userName: "Anita Desai", userInitials: "AD", userGradient: "from-amber-400 to-orange-500", rating: 4, review: "Great design sensibility. The forest retreat exceeded our expectations. Minor delays but the result was worth the wait.", projectType: "Villa", date: "2 months ago" },
      { id: "r4", userName: "Vikash Kumar", userInitials: "VK", userGradient: "from-emerald-400 to-teal-500", rating: 5, review: "The Glass House is a masterpiece. Arjun understood exactly what we wanted — minimalism with warmth.", projectType: "House", date: "3 months ago" },
    ],
    projects: [
      { id: "bp-1", name: "Ocean Crest Villa", type: "Villa", location: "Goa", thumbnail: "", gradient: "from-cyan-500 to-blue-600", views: 8400, floors: 3, rooms: 14, status: "completed", tourAvailable: true },
      { id: "bp-2", name: "Skyline Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-purple-500 to-indigo-600", views: 6200, floors: 2, rooms: 8, status: "completed", tourAvailable: true },
      { id: "bp-3", name: "Forest Retreat", type: "Villa", location: "Lonavala", thumbnail: "", gradient: "from-emerald-500 to-green-600", views: 5100, floors: 2, rooms: 10, status: "completed", tourAvailable: true },
      { id: "bp-4", name: "The Glass House", type: "House", location: "Pune", thumbnail: "", gradient: "from-sky-400 to-cyan-500", views: 3800, floors: 1, rooms: 6, status: "completed", tourAvailable: true },
      { id: "bp-5", name: "Coral Bay Residence", type: "Villa", location: "Alibaug", thumbnail: "", gradient: "from-orange-400 to-rose-500", views: 2900, floors: 2, rooms: 11, status: "in-progress", tourAvailable: false },
      { id: "bp-6", name: "Urban Loft", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-slate-500 to-zinc-600", views: 4200, floors: 1, rooms: 5, status: "completed", tourAvailable: true },
    ],
  },
  {
    id: "builder-2",
    name: "Meera Patel",
    company: "Studio Meera",
    category: "Architect",
    avatar: "MP",
    coverGradient: "from-rose-500 to-pink-600",
    tagline: "Sustainable architecture rooted in Indian heritage",
    bio: "Passionate about creating eco-conscious living spaces that honor traditional Indian architectural principles while embracing modern technology. Pioneer in bamboo construction and passive cooling systems. TEDx speaker on 'The Future of Sustainable Housing in India'.",
    location: "Ahmedabad, India",
    specializations: ["Sustainable Architecture", "Heritage Restoration", "Eco-Homes", "Bamboo Construction"],
    rating: 4.8,
    reviewCount: 93,
    projectCount: 35,
    experience: "12+ years",
    verified: true,
    featured: true,
    contactEmail: "meera@studiomeera.in",
    website: "studiomeera.in",
    completedProjects: 35,
    activeTours: 8,
    totalViews: 21200,
    startingPrice: "₹28L",
    avgPricePerSqft: "₹2,100",
    responseTime: "< 4 hours",
    services: [
      { id: "s5", name: "Turnkey Construction", description: "Eco-friendly construction using sustainable materials and methods", icon: "🏗️" },
      { id: "s6", name: "Interior Design", description: "Heritage-inspired interiors with modern sustainable materials", icon: "🎨" },
      { id: "s7", name: "Renovation", description: "Green renovation with energy-efficient upgrades", icon: "🔨" },
      { id: "s8", name: "Architecture", description: "Biophilic and passive design architecture", icon: "📐" },
    ],
    reviews: [
      { id: "r5", userName: "Deepak Joshi", userInitials: "DJ", userGradient: "from-green-400 to-emerald-500", rating: 5, review: "Meera's bamboo construction is genius. Our home stays cool naturally even in Ahmedabad summers. Truly innovative.", projectType: "House", date: "1 week ago" },
      { id: "r6", userName: "Kavita Reddy", userInitials: "KR", userGradient: "from-violet-400 to-purple-500", rating: 5, review: "The Heritage Courtyard Home is a dream. She perfectly blended traditional Rajasthani elements with modern living.", projectType: "House", date: "3 weeks ago" },
      { id: "r7", userName: "Suresh Nair", userInitials: "SN", userGradient: "from-cyan-400 to-blue-500", rating: 4, review: "Great sustainable approach. The solar integration works seamlessly. Would love to work with her again.", projectType: "House", date: "2 months ago" },
    ],
    projects: [
      { id: "bp-7", name: "Bamboo Haven", type: "House", location: "Ahmedabad", thumbnail: "", gradient: "from-lime-500 to-emerald-600", views: 5600, floors: 2, rooms: 8, status: "completed", tourAvailable: true },
      { id: "bp-8", name: "Heritage Courtyard Home", type: "House", location: "Jaipur", thumbnail: "", gradient: "from-amber-500 to-orange-600", views: 4200, floors: 2, rooms: 12, status: "completed", tourAvailable: true },
      { id: "bp-9", name: "Earth House", type: "Villa", location: "Udaipur", thumbnail: "", gradient: "from-stone-400 to-amber-600", views: 3800, floors: 1, rooms: 7, status: "completed", tourAvailable: true },
      { id: "bp-10", name: "Solar Residence", type: "House", location: "Vadodara", thumbnail: "", gradient: "from-yellow-400 to-orange-500", views: 2100, floors: 2, rooms: 9, status: "completed", tourAvailable: true },
    ],
  },
  {
    id: "builder-3",
    name: "Vikram Singh",
    company: "VS Architects",
    category: "Architect",
    avatar: "VS",
    coverGradient: "from-amber-500 to-orange-600",
    tagline: "Transforming commercial spaces into iconic landmarks",
    bio: "Leading commercial architect known for designing some of India's most iconic office complexes and retail spaces. With a team of 40+ architects, VS Architects has delivered projects across 8 cities. Winner of the A+D Architecture Award 2024.",
    location: "Delhi NCR, India",
    specializations: ["Commercial Architecture", "Office Design", "Retail Spaces", "Urban Planning"],
    rating: 4.7,
    reviewCount: 156,
    projectCount: 72,
    experience: "20+ years",
    verified: true,
    featured: true,
    contactEmail: "vikram@vsarchitects.in",
    website: "vsarchitects.in",
    completedProjects: 72,
    activeTours: 18,
    totalViews: 52800,
    startingPrice: "₹1.2Cr",
    avgPricePerSqft: "₹4,500",
    responseTime: "< 6 hours",
    services: [
      { id: "s9", name: "Turnkey Construction", description: "Large-scale commercial construction with project management", icon: "🏗️" },
      { id: "s10", name: "Interior Design", description: "Corporate and retail interior design at scale", icon: "🎨" },
      { id: "s11", name: "Renovation", description: "Office space modernization and commercial upgrades", icon: "🔨" },
      { id: "s12", name: "Architecture", description: "Iconic commercial architecture and urban planning", icon: "📐" },
    ],
    reviews: [
      { id: "r8", userName: "Amit Gupta", userInitials: "AG", userGradient: "from-blue-400 to-indigo-500", rating: 5, review: "TechPark Alpha is the crown jewel of our portfolio. Vikram's team delivered a world-class facility on time and on budget.", projectType: "Commercial", date: "1 month ago" },
      { id: "r9", userName: "Neha Kapoor", userInitials: "NK", userGradient: "from-pink-400 to-rose-500", rating: 4, review: "The Innovation Hub is stunning. Great attention to employee wellbeing in the design. A few minor revisions needed but overall excellent.", projectType: "Office", date: "2 months ago" },
      { id: "r10", userName: "Rajesh Agarwal", userInitials: "RA", userGradient: "from-amber-400 to-yellow-500", rating: 5, review: "Nexus Mall has become a landmark. Vikram understood the retail experience perfectly. Footfall exceeded projections by 40%.", projectType: "Commercial", date: "3 months ago" },
    ],
    projects: [
      { id: "bp-11", name: "TechPark Alpha", type: "Commercial", location: "Gurugram", thumbnail: "", gradient: "from-blue-500 to-violet-600", views: 12400, floors: 8, rooms: 45, status: "completed", tourAvailable: true },
      { id: "bp-12", name: "Nexus Mall", type: "Commercial", location: "Noida", thumbnail: "", gradient: "from-pink-500 to-rose-600", views: 9800, floors: 4, rooms: 60, status: "completed", tourAvailable: true },
      { id: "bp-13", name: "Innovation Hub", type: "Office", location: "Delhi", thumbnail: "", gradient: "from-teal-500 to-cyan-600", views: 7600, floors: 6, rooms: 32, status: "completed", tourAvailable: true },
      { id: "bp-14", name: "Skyway Tower", type: "Commercial", location: "Chandigarh", thumbnail: "", gradient: "from-indigo-500 to-purple-600", views: 5200, floors: 12, rooms: 80, status: "in-progress", tourAvailable: false },
      { id: "bp-15", name: "Co-Work Central", type: "Office", location: "Gurugram", thumbnail: "", gradient: "from-emerald-500 to-teal-600", views: 3400, floors: 3, rooms: 20, status: "completed", tourAvailable: true },
    ],
  },
  {
    id: "builder-4",
    name: "Priya Deshmukh",
    company: "PD Interiors & Architecture",
    category: "Interior Designer",
    avatar: "PD",
    coverGradient: "from-violet-500 to-purple-600",
    tagline: "Where interior artistry meets architectural precision",
    bio: "Interior-focused architect who believes every room tells a story. Known for creating luxurious yet livable spaces with meticulous attention to detail. Has worked with top real estate developers including Lodha, Godrej, and Oberoi.",
    location: "Pune, India",
    specializations: ["Interior Architecture", "Luxury Apartments", "Penthouse Design", "Space Planning"],
    rating: 4.9,
    reviewCount: 84,
    projectCount: 41,
    experience: "10+ years",
    verified: true,
    featured: false,
    contactEmail: "priya@pd-interiors.com",
    website: "pd-interiors.com",
    completedProjects: 41,
    activeTours: 9,
    totalViews: 18700,
    startingPrice: "₹18L",
    avgPricePerSqft: "₹2,800",
    responseTime: "< 1 hour",
    services: [
      { id: "s13", name: "Turnkey Construction", description: "Complete apartment and penthouse fit-outs from scratch", icon: "🏗️" },
      { id: "s14", name: "Interior Design", description: "Bespoke luxury interiors with custom furniture design", icon: "🎨" },
      { id: "s15", name: "Renovation", description: "Apartment makeovers and space optimization", icon: "🔨" },
      { id: "s16", name: "Architecture", description: "Residential architectural design with interior integration", icon: "📐" },
    ],
    reviews: [
      { id: "r11", userName: "Meghna Shah", userInitials: "MS", userGradient: "from-fuchsia-400 to-pink-500", rating: 5, review: "Priya's eye for detail is unmatched. Our 3BHK feels like a boutique hotel. She thought of things we never even considered.", projectType: "Apartment", date: "2 weeks ago" },
      { id: "r12", userName: "Arjun Bhatia", userInitials: "AB", userGradient: "from-slate-400 to-gray-500", rating: 5, review: "The Royal Penthouse is beyond our wildest dreams. Every material, every light fixture — perfection.", projectType: "Apartment", date: "1 month ago" },
    ],
    projects: [
      { id: "bp-16", name: "Luxe Living 3BHK", type: "Apartment", location: "Pune", thumbnail: "", gradient: "from-fuchsia-500 to-pink-600", views: 4800, floors: 1, rooms: 6, status: "completed", tourAvailable: true },
      { id: "bp-17", name: "Royal Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-amber-400 to-yellow-500", views: 6200, floors: 2, rooms: 9, status: "completed", tourAvailable: true },
      { id: "bp-18", name: "Minimalist Studio", type: "Apartment", location: "Bangalore", thumbnail: "", gradient: "from-gray-400 to-slate-500", views: 2400, floors: 1, rooms: 3, status: "completed", tourAvailable: true },
    ],
  },
  {
    id: "builder-5",
    name: "Rahul Menon",
    company: "Menon Builders",
    category: "Builder",
    avatar: "RM",
    coverGradient: "from-emerald-500 to-teal-600",
    tagline: "Building dream homes across South India",
    bio: "Third-generation builder with deep roots in Kerala's construction industry. Specializes in tropical architecture that maximizes ventilation and natural light. Known for on-time delivery and transparent pricing.",
    location: "Kochi, India",
    specializations: ["Tropical Architecture", "Residential Construction", "Farm Houses", "Resort Design"],
    rating: 4.6,
    reviewCount: 198,
    projectCount: 95,
    experience: "18+ years",
    verified: true,
    featured: true,
    contactEmail: "rahul@menonbuilders.in",
    website: "menonbuilders.in",
    completedProjects: 95,
    activeTours: 22,
    totalViews: 67300,
    startingPrice: "₹22L",
    avgPricePerSqft: "₹1,800",
    responseTime: "< 3 hours",
    services: [
      { id: "s17", name: "Turnkey Construction", description: "Complete residential construction with Kerala craftsmanship", icon: "🏗️" },
      { id: "s18", name: "Interior Design", description: "Tropical and traditional Kerala interior design", icon: "🎨" },
      { id: "s19", name: "Renovation", description: "Heritage home restoration and modernization", icon: "🔨" },
      { id: "s20", name: "Architecture", description: "Climate-responsive tropical architecture design", icon: "📐" },
    ],
    reviews: [
      { id: "r13", userName: "Thomas George", userInitials: "TG", userGradient: "from-teal-400 to-green-500", rating: 5, review: "The Kerala Lake House is paradise. Rahul's understanding of tropical living is unmatched. The natural ventilation is incredible.", projectType: "House", date: "1 week ago" },
      { id: "r14", userName: "Lakshmi Nair", userInitials: "LN", userGradient: "from-orange-400 to-red-500", rating: 4, review: "Great value for money. The Spice Plantation Villa was delivered on time. Minor finishing issues resolved quickly.", projectType: "Villa", date: "1 month ago" },
      { id: "r15", userName: "Samuel Mathew", userInitials: "SM", userGradient: "from-sky-400 to-blue-500", rating: 5, review: "Riverside Resort is a masterpiece. The blend of Kerala architecture with modern amenities is perfect. Guests love it.", projectType: "Commercial", date: "2 months ago" },
    ],
    projects: [
      { id: "bp-19", name: "Kerala Lake House", type: "House", location: "Alleppey", thumbnail: "", gradient: "from-teal-400 to-emerald-500", views: 9200, floors: 2, rooms: 8, status: "completed", tourAvailable: true },
      { id: "bp-20", name: "Spice Plantation Villa", type: "Villa", location: "Munnar", thumbnail: "", gradient: "from-green-600 to-emerald-700", views: 7800, floors: 2, rooms: 12, status: "completed", tourAvailable: true },
      { id: "bp-21", name: "Coastal Breeze Homes", type: "House", location: "Kochi", thumbnail: "", gradient: "from-sky-400 to-blue-500", views: 5400, floors: 2, rooms: 10, status: "completed", tourAvailable: true },
      { id: "bp-22", name: "Riverside Resort", type: "Commercial", location: "Wayanad", thumbnail: "", gradient: "from-lime-500 to-green-600", views: 11200, floors: 3, rooms: 24, status: "completed", tourAvailable: true },
      { id: "bp-23", name: "Heritage Nalukettu", type: "House", location: "Thrissur", thumbnail: "", gradient: "from-amber-600 to-red-700", views: 8400, floors: 1, rooms: 15, status: "in-progress", tourAvailable: false },
    ],
  },
  {
    id: "builder-6",
    name: "Nisha Agarwal",
    company: "NexGen Architects",
    category: "Architect",
    avatar: "NA",
    coverGradient: "from-cyan-500 to-blue-600",
    tagline: "Futuristic designs for the next generation of living",
    bio: "Young, dynamic architect pushing the boundaries of parametric design and computational architecture. Her firm combines AI-assisted design with human creativity to deliver spaces that feel ahead of their time.",
    location: "Bangalore, India",
    specializations: ["Parametric Design", "Smart Homes", "Futuristic Architecture", "Mixed-Use Developments"],
    rating: 4.8,
    reviewCount: 62,
    projectCount: 24,
    experience: "7+ years",
    verified: true,
    featured: false,
    contactEmail: "nisha@nexgenarch.com",
    website: "nexgenarch.com",
    completedProjects: 24,
    activeTours: 7,
    totalViews: 15400,
    startingPrice: "₹35L",
    avgPricePerSqft: "₹3,600",
    responseTime: "< 2 hours",
    services: [
      { id: "s21", name: "Turnkey Construction", description: "Smart home construction with IoT and automation integration", icon: "🏗️" },
      { id: "s22", name: "Interior Design", description: "Futuristic interior design with smart material selection", icon: "🎨" },
      { id: "s23", name: "Renovation", description: "Smart home conversion and technology retrofitting", icon: "🔨" },
      { id: "s24", name: "Architecture", description: "Parametric and computational architectural design", icon: "📐" },
    ],
    reviews: [
      { id: "r16", userName: "Kiran Rao", userInitials: "KR", userGradient: "from-violet-400 to-indigo-500", rating: 5, review: "The Curve House is unlike anything I've seen. Nisha's parametric design creates spaces that feel alive. Truly next-gen.", projectType: "House", date: "2 weeks ago" },
      { id: "r17", userName: "Anand Sharma", userInitials: "AS", userGradient: "from-cyan-400 to-teal-500", rating: 5, review: "Smart Living Pod is the future. Everything is automated, the design is minimal yet functional. Nisha is a visionary.", projectType: "Apartment", date: "1 month ago" },
    ],
    projects: [
      { id: "bp-24", name: "The Curve House", type: "House", location: "Bangalore", thumbnail: "", gradient: "from-violet-500 to-blue-600", views: 4600, floors: 2, rooms: 7, status: "completed", tourAvailable: true },
      { id: "bp-25", name: "Smart Living Pod", type: "Apartment", location: "Hyderabad", thumbnail: "", gradient: "from-cyan-400 to-teal-500", views: 3200, floors: 1, rooms: 4, status: "completed", tourAvailable: true },
      { id: "bp-26", name: "Parametric Office", type: "Office", location: "Bangalore", thumbnail: "", gradient: "from-indigo-400 to-violet-500", views: 5800, floors: 4, rooms: 18, status: "completed", tourAvailable: true },
    ],
  },
  // ── New: Interior Designer ──
  {
    id: "builder-7",
    name: "Aanya Sharma",
    company: "Aanya Studio",
    category: "Interior Designer",
    avatar: "AS",
    coverGradient: "from-pink-500 to-fuchsia-600",
    tagline: "Curating spaces that inspire everyday living",
    bio: "Award-winning interior designer with a signature style blending Scandinavian minimalism with warm Indian textures. Known for transforming compact urban apartments into luxurious, functional spaces. Featured in Elle Decor India and Beautiful Homes.",
    location: "Bangalore, India",
    specializations: ["Modern Minimalism", "Compact Spaces", "Luxury Apartments", "Home Staging"],
    rating: 4.9,
    reviewCount: 76,
    projectCount: 38,
    experience: "9+ years",
    verified: true,
    featured: true,
    contactEmail: "aanya@aanyastudio.in",
    website: "aanyastudio.in",
    completedProjects: 38,
    activeTours: 6,
    totalViews: 19800,
    startingPrice: "₹12L",
    avgPricePerSqft: "₹1,600",
    responseTime: "< 1 hour",
    services: [
      { id: "s25", name: "Full Home Interiors", description: "End-to-end interior design from concept to execution", icon: "🏠" },
      { id: "s26", name: "Kitchen & Bath Design", description: "Modular kitchen and luxury bathroom design", icon: "🍳" },
      { id: "s27", name: "Home Staging", description: "Professional staging for property sales and rentals", icon: "✨" },
      { id: "s28", name: "Furniture Curation", description: "Custom furniture design and sourcing from artisan workshops", icon: "🪑" },
    ],
    reviews: [
      { id: "r18", userName: "Ritika Jain", userInitials: "RJ", userGradient: "from-pink-400 to-rose-500", rating: 5, review: "Aanya transformed our 2BHK into something out of a magazine. Her sense of color and proportion is extraordinary.", projectType: "Apartment", date: "1 week ago" },
      { id: "r19", userName: "Siddharth Roy", userInitials: "SR", userGradient: "from-blue-400 to-indigo-500", rating: 5, review: "The Japandi Living Room is a masterpiece. Minimal yet warm. Aanya understood our lifestyle perfectly.", projectType: "Apartment", date: "3 weeks ago" },
    ],
    projects: [
      { id: "bp-27", name: "Japandi Living Room", type: "Apartment", location: "Bangalore", thumbnail: "", gradient: "from-stone-400 to-neutral-500", views: 5200, floors: 1, rooms: 4, status: "completed", tourAvailable: true },
      { id: "bp-28", name: "Terracotta Penthouse", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-orange-400 to-amber-500", views: 4100, floors: 2, rooms: 7, status: "completed", tourAvailable: true },
      { id: "bp-29", name: "Cloud White Studio", type: "Apartment", location: "Pune", thumbnail: "", gradient: "from-slate-200 to-gray-300", views: 3400, floors: 1, rooms: 3, status: "completed", tourAvailable: true },
      { id: "bp-30", name: "Bohemian Farmhouse", type: "House", location: "Goa", thumbnail: "", gradient: "from-yellow-400 to-lime-500", views: 6800, floors: 1, rooms: 6, status: "completed", tourAvailable: true },
    ],
  },
  // ── New: Landscape Architect ──
  {
    id: "builder-8",
    name: "Kabir Thakur",
    company: "GreenScape Design",
    category: "Landscape Architect",
    avatar: "KT",
    coverGradient: "from-lime-500 to-green-600",
    tagline: "Designing living landscapes that breathe with nature",
    bio: "Landscape architect specializing in creating immersive outdoor environments for residential estates, resort campuses, and commercial complexes. Pioneer in rooftop gardens and vertical green walls in Indian urban settings. Member of the Indian Society of Landscape Architects.",
    location: "Pune, India",
    specializations: ["Garden Design", "Rooftop Gardens", "Vertical Green Walls", "Resort Landscaping"],
    rating: 4.7,
    reviewCount: 54,
    projectCount: 29,
    experience: "11+ years",
    verified: true,
    featured: false,
    contactEmail: "kabir@greenscapedesign.in",
    website: "greenscapedesign.in",
    completedProjects: 29,
    activeTours: 5,
    totalViews: 12600,
    startingPrice: "₹8L",
    avgPricePerSqft: "₹900",
    responseTime: "< 4 hours",
    services: [
      { id: "s29", name: "Garden Design", description: "Custom garden layouts with native and exotic plants", icon: "🌿" },
      { id: "s30", name: "Rooftop Gardens", description: "Urban rooftop oases with irrigation and drainage systems", icon: "🌱" },
      { id: "s31", name: "Vertical Green Walls", description: "Living green walls for interiors and building facades", icon: "🌳" },
      { id: "s32", name: "Hardscape Design", description: "Pathways, water features, outdoor seating, and pergolas", icon: "⛲" },
    ],
    reviews: [
      { id: "r20", userName: "Devika Patil", userInitials: "DP", userGradient: "from-green-400 to-emerald-500", rating: 5, review: "Kabir created an oasis on our terrace. The rooftop garden is now our favourite spot in the house. Plants are thriving!", projectType: "House", date: "2 weeks ago" },
      { id: "r21", userName: "Manish Kulkarni", userInitials: "MK", userGradient: "from-lime-400 to-green-500", rating: 4, review: "The resort landscaping at our Lonavala property is stunning. Guests constantly compliment the gardens. Great work.", projectType: "Commercial", date: "1 month ago" },
    ],
    projects: [
      { id: "bp-31", name: "Zen Courtyard Garden", type: "House", location: "Pune", thumbnail: "", gradient: "from-emerald-400 to-green-500", views: 3800, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
      { id: "bp-32", name: "Sky Garden Terrace", type: "Apartment", location: "Mumbai", thumbnail: "", gradient: "from-lime-400 to-emerald-500", views: 4500, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
      { id: "bp-33", name: "Hillside Resort Landscape", type: "Commercial", location: "Lonavala", thumbnail: "", gradient: "from-green-500 to-teal-600", views: 5200, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
      { id: "bp-34", name: "Villa Green Wall", type: "Villa", location: "Bangalore", thumbnail: "", gradient: "from-teal-400 to-cyan-500", views: 2900, floors: 1, rooms: 1, status: "completed", tourAvailable: true },
    ],
  },
];

interface BuilderState {
  builders: Builder[];
  selectedBuilder: Builder | null;
  setSelectedBuilder: (builder: Builder | null) => void;
  getBuilderById: (id: string) => Builder | undefined;
  getFeaturedBuilders: () => Builder[];
  getByCategory: (category: ProfessionalCategory | "All") => Builder[];
  getCategories: () => ProfessionalCategory[];
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  builders,
  selectedBuilder: null,
  setSelectedBuilder: (builder) => set({ selectedBuilder: builder }),
  getBuilderById: (id) => get().builders.find((b) => b.id === id),
  getFeaturedBuilders: () => get().builders.filter((b) => b.featured),
  getByCategory: (category) =>
    category === "All"
      ? get().builders
      : get().builders.filter((b) => b.category === category),
  getCategories: () => {
    const cats = new Set(get().builders.map((b) => b.category));
    return Array.from(cats);
  },
}));
