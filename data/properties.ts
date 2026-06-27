export interface Property {
  id: string;
  categorySlug: string;
  title: string;
  price: string;
  pricePerSqft?: string;
  location: string;
  specs: string; 
  description: string;
  image: string;
  gallery?: string[]; // Multiple images for the detail page gallery
  builder?: string;
  isVerified?: boolean;
  
  // Detailed features
  status?: string;
  carpetArea?: string;
  facing?: string;
  furnishing?: string;
  floor?: string;
  parking?: string;
  amenities?: string[];
  
  // Deep Dive Data
  ownership?: string;
  propertyVintage?: string;
  maintenance?: string;
  landmarks?: string[];
  sellerName?: string;
  sellerType?: "Owner" | "Builder" | "Agent";
  sellerSince?: string;
}

export const properties: Property[] = [
  // BUY
  {
    id: "buy-1",
    categorySlug: "buy",
    title: "2 BHK Flat in White Orchid Residency",
    price: "₹ 2.05 Cr",
    pricePerSqft: "₹ 25,000/sqft",
    location: "IC Colony, Mumbai",
    specs: "820 Sqft • 2 BHK • 2 Baths",
    description: "This move-in-ready, Vastu-compliant 2BHK residential apartment features a functional layout with spacious bedrooms, a bright living area, a modern modular kitchen, and thoughtfully designed interiors. Located in a premium gated community.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
    ],
    builder: "Mhatre and Goradia",
    isVerified: true,
    status: "Ready to Move",
    carpetArea: "650 sqft",
    facing: "East",
    furnishing: "Semi-Furnished",
    floor: "5 out of 10",
    parking: "1 Covered",
    amenities: ["Power Backup", "Lift", "Security", "Park", "Reserved Parking", "Visitor Parking", "Intercom Facility"],
    ownership: "Co-operative Society",
    propertyVintage: "5 to 10 years",
    maintenance: "₹ 4,500 / month",
    landmarks: ["Near IC Colony Metro", "Holy Cross School (0.5km)"],
    sellerName: "Divya D",
    sellerType: "Owner",
    sellerSince: "2018"
  },
  {
    id: "buy-2",
    categorySlug: "buy",
    title: "3 BHK Luxury Apartment in Lodha Bellissimo",
    price: "₹ 5.50 Cr",
    pricePerSqft: "₹ 29,729/sqft",
    location: "Mahalaxmi, Mumbai",
    specs: "1850 Sqft • 3 BHK • 4 Baths",
    description: "Sea-facing luxury apartment with panoramic views of the race course and ocean. Experience ultimate luxury living with world-class amenities right at your doorstep.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200"
    ],
    builder: "Lodha Group",
    isVerified: true,
    status: "Under Construction",
    carpetArea: "1450 sqft",
    facing: "North-East",
    furnishing: "Unfurnished",
    floor: "34 out of 45",
    parking: "2 Covered",
    amenities: ["Swimming Pool", "Gym", "Club House", "Jogging Track", "Tennis Court", "Kids Play Area"],
    ownership: "Freehold",
    propertyVintage: "New Launch",
    maintenance: "₹ 12,000 / month",
    landmarks: ["Mahalaxmi Race Course (1km)", "Palladium Mall (2km)"],
    sellerName: "Lodha Sales Team",
    sellerType: "Builder",
    sellerSince: "1980"
  },
  {
    id: "buy-3",
    categorySlug: "buy",
    title: "1 BHK Flat for Sale in Khira Nagar",
    price: "₹ 1.15 Cr",
    pricePerSqft: "₹ 25,555/sqft",
    location: "Santacruz West, Mumbai",
    specs: "450 Sqft • 1 BHK • 1 Bath",
    description: "Cozy apartment in a prime location. 5 mins walking distance from railway station and local markets. Marble flooring and recently painted.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200"
    ],
    isVerified: false,
    status: "Ready to Move",
    carpetArea: "380 sqft",
    facing: "West",
    furnishing: "Unfurnished",
    floor: "2 out of 4",
    parking: "None",
    amenities: ["Water Storage", "Waste Disposal"],
    ownership: "Co-operative Society",
    propertyVintage: "Above 20 years",
    maintenance: "₹ 1,500 / month",
    landmarks: ["Santacruz Station (0.5km)"],
    sellerName: "Rahul Sharma",
    sellerType: "Agent",
    sellerSince: "2015"
  },

  // RENT
  {
    id: "rent-1",
    categorySlug: "rent",
    title: "Fully Furnished 2 BHK Flat",
    price: "₹ 65,000 / mo",
    location: "Andheri West, Mumbai",
    specs: "900 Sqft • 2 BHK",
    description: "Spacious fully furnished apartment with AC, TV, Fridge, and Washing Machine. Expat friendly. No brokerage if closed this week.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1e5250ad11?auto=format&fit=crop&q=80&w=1200"
    ],
    isVerified: true,
    status: "Immediately Available",
    carpetArea: "750 sqft",
    facing: "South",
    furnishing: "Fully Furnished",
    floor: "8 out of 15",
    parking: "1 Open",
    amenities: ["AC", "TV", "Refrigerator", "Washing Machine", "Sofa", "Dining Table", "Bed"],
    ownership: "Freehold",
    propertyVintage: "1 to 5 years",
    maintenance: "Included in rent",
    landmarks: ["Infinity Mall (1km)", "Lokhandwala Complex (2km)"],
    sellerName: "Anita Desai",
    sellerType: "Owner",
    sellerSince: "2021"
  },
  {
    id: "rent-2",
    categorySlug: "rent",
    title: "1 BHK in Godrej Prime",
    price: "₹ 42,000 / mo",
    location: "Chembur, Mumbai",
    specs: "420 Sqft • 1 BHK",
    description: "Brand new complex with swimming pool, gym, and clubhouse. Ideal for bachelors or young couples.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200"
    ],
    builder: "Godrej Properties",
    status: "From Next Month",
    carpetArea: "350 sqft",
    facing: "North",
    furnishing: "Semi-Furnished",
    floor: "12 out of 22",
    parking: "1 Covered",
    amenities: ["Gym", "Pool", "Club House", "Modular Kitchen", "Wardrobes"],
    ownership: "Co-operative Society",
    propertyVintage: "Less than 1 year",
    maintenance: "₹ 3,000 / month",
    landmarks: ["Chembur Monorail (0.8km)"],
    sellerName: "Priya Singh",
    sellerType: "Agent",
    sellerSince: "2019"
  },

  // INVEST
  {
    id: "invest-1",
    categorySlug: "invest",
    title: "Pre-Launch: High Yield Studio Apartments",
    price: "₹ 85 Lacs",
    pricePerSqft: "₹ 24,285/sqft",
    location: "Kharadi, Pune",
    specs: "350 Sqft • Studio",
    description: "Invest in IT hub of Pune. Fully managed rental program with assured 8% rental yield for 5 years.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200"
    ],
    isVerified: true,
    status: "Pre-Launch",
    carpetArea: "280 sqft",
    facing: "East",
    furnishing: "Fully Furnished",
    floor: "Multiple Options",
    parking: "1 Covered",
    amenities: ["Concierge Service", "Housekeeping", "Cafeteria", "Lounge", "Business Center"],
    ownership: "Freehold",
    propertyVintage: "New Launch",
    landmarks: ["EON IT Park (0.5km)"],
    sellerName: "VTP Realty",
    sellerType: "Builder",
    sellerSince: "2005"
  },
  {
    id: "invest-2",
    categorySlug: "invest",
    title: "Upcoming Tech Park Retail Spaces",
    price: "₹ 2.2 Cr",
    pricePerSqft: "₹ 18,333/sqft",
    location: "Whitefield, Bangalore",
    specs: "1200 Sqft • Retail",
    description: "Prime retail spaces in upcoming Grade A IT tech park. Expected capital appreciation of 25% in 3 years.",
    image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80&w=1200"
    ],
    status: "Under Construction",
    carpetArea: "1000 sqft",
    facing: "Main Road",
    furnishing: "Bare Shell",
    floor: "Ground",
    parking: "Ample Visitor Parking",
    amenities: ["Central AC", "Power Backup", "High Footfall", "Anchor Stores Nearby"],
    ownership: "Leasehold",
    propertyVintage: "Under Construction",
    landmarks: ["ITPL (2km)"],
    sellerName: "Prestige Group",
    sellerType: "Builder",
    sellerSince: "1986"
  },

  // SELL
  {
    id: "sell-1",
    categorySlug: "sell",
    title: "Recently Sold: 3 BHK in Hiranandani",
    price: "₹ 4.2 Cr",
    pricePerSqft: "₹ 28,965/sqft",
    location: "Powai, Mumbai",
    specs: "1450 Sqft • 3 BHK",
    description: "Property listed and sold through our premium managed selling service in just 14 days above market rate.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200"
    ],
    status: "Sold out",
    carpetArea: "1150 sqft",
    facing: "North-West",
    furnishing: "Semi-Furnished",
    floor: "18 out of 25",
    parking: "2 Covered",
    amenities: ["Lake View", "Club House", "Gym", "Pool", "24/7 Security"],
    ownership: "Freehold",
    propertyVintage: "10 to 15 years",
    landmarks: ["Hiranandani Hospital (1km)", "Powai Lake (0.5km)"],
    sellerName: "Builder's Central",
    sellerType: "Agent",
    sellerSince: "2020"
  },

  // PLOTS
  {
    id: "plots-1",
    categorySlug: "plots",
    title: "Premium Villa Plot",
    price: "₹ 1.8 Cr",
    pricePerSqft: "₹ 6,000/sqft",
    location: "Lonavala, Maharashtra",
    specs: "3000 Sqft • NA Plot",
    description: "Scenic NA plot with clear title. Perfect for building a weekend holiday home or investment.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"
    ],
    isVerified: true,
    status: "Ready to Register",
    facing: "East",
    parking: "Open",
    amenities: ["Boundary Wall", "Gated Community", "Water Connection", "Electricity", "Internal Roads"],
    ownership: "Freehold",
    landmarks: ["Lonavala Market (4km)"],
    sellerName: "Kunal V",
    sellerType: "Owner",
    sellerSince: "2010"
  },
  {
    id: "plots-2",
    categorySlug: "plots",
    title: "Commercial Land Parcel",
    price: "₹ 12 Cr",
    location: "Navi Mumbai",
    specs: "1 Acre • Commercial Zone",
    description: "Prime land parcel near the upcoming international airport. Ideal for logistics park or warehousing.",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80&w=1200"
    ],
    status: "Clear Title",
    facing: "Highway Facing",
    amenities: ["Highway Access", "Fencing", "Industrial Zone"],
    ownership: "Freehold",
    landmarks: ["Navi Mumbai International Airport (10km)"],
    sellerName: "Cidco Allotee",
    sellerType: "Owner",
    sellerSince: "2015"
  },

  // PG
  {
    id: "pg-1",
    categorySlug: "pg",
    title: "Zolo Premium Co-living",
    price: "₹ 15,000 / mo",
    location: "Koramangala, Bangalore",
    specs: "Twin Sharing",
    description: "Premium co-living space for professionals. High-speed WiFi, housekeeping, and 3 meals a day included.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200"
    ],
    isVerified: true,
    status: "Immediately Available",
    furnishing: "Fully Furnished",
    parking: "Two-Wheeler",
    amenities: ["WiFi", "Meals Included", "Housekeeping", "Laundry", "Lounge Area", "AC"],
    sellerName: "Zolo Stays",
    sellerType: "Agent",
    sellerSince: "2016"
  },
  {
    id: "pg-2",
    categorySlug: "pg",
    title: "Student Hostel near North Campus",
    price: "₹ 12,000 / mo",
    location: "Kamla Nagar, Delhi",
    specs: "Single Room",
    description: "Safe and secure student accommodation with library, laundry, and close proximity to colleges.",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1200"
    ],
    status: "Available",
    furnishing: "Fully Furnished",
    amenities: ["Library", "Study Table", "WiFi", "Mess", "CCTV Security"],
    sellerName: "Sharma Hostels",
    sellerType: "Owner",
    sellerSince: "2000"
  },

  // COMMERCIAL
  {
    id: "commercial-1",
    categorySlug: "commercial",
    title: "Fully Fitted Office Space",
    price: "₹ 2.5 Lacs / mo",
    location: "BKC, Mumbai",
    specs: "1500 Sqft",
    description: "Plug and play office space in prime business district. Includes 2 meeting rooms and a cafeteria.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
    ],
    isVerified: true,
    status: "Immediately Available",
    carpetArea: "1200 sqft",
    facing: "North",
    furnishing: "Fully Furnished",
    floor: "4 out of 10",
    parking: "3 Covered",
    amenities: ["Central AC", "Cafeteria", "Meeting Rooms", "100% Power Backup", "High-speed Elevators"],
    ownership: "Leasehold",
    maintenance: "₹ 25,000 / month",
    landmarks: ["Jio World Drive (1km)"],
    sellerName: "Aditya R",
    sellerType: "Agent",
    sellerSince: "2012"
  },
  {
    id: "commercial-2",
    categorySlug: "commercial",
    title: "Retail Shop on Main Road",
    price: "₹ 80,000 / mo",
    location: "Linking Road, Bandra",
    specs: "600 Sqft",
    description: "High visibility retail space on the main shopping street. Heavy footfall area, perfect for fashion boutique.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1200"
    ],
    status: "From Next Month",
    carpetArea: "500 sqft",
    facing: "East (Main Road)",
    furnishing: "Unfurnished",
    floor: "Ground",
    parking: "Street Parking",
    amenities: ["Signage Space", "Washroom", "Water Connection"],
    ownership: "Freehold",
    landmarks: ["National College (0.5km)"],
    sellerName: "Mehra Properties",
    sellerType: "Owner",
    sellerSince: "1995"
  }
];
