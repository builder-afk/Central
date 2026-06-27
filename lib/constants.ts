// ═══════════════════════════════════════
// BUSINESS CONSTANTS
// Central place for all business info,
// contact details, and WhatsApp config.
// ═══════════════════════════════════════

export const BUSINESS = {
  name: "Builder's Central",
  tagline: "Property Marketing Infrastructure for Builders & Real Estate Developers",
  email: "hello@builderscentral.com",
  phone: "+91 98765 43210",
  address: "Mumbai, India",
  website: "https://builderscentral.com",
} as const;

export const WHATSAPP = {
  // Replace with actual WhatsApp Business number
  number: "919876543210",
  defaultMessage: "Hi, I'm interested in Builder's Central property marketing services. Can you share more details?",
  serviceMessage: (service: string) =>
    `Hi, I'd like to learn more about your "${service}" service. Can we discuss?`,
  bookingMessage: (property: string) =>
    `Hi, I'd like to book a visit for "${property}". What slots are available?`,
  getUrl: (message: string) =>
    `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`,
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/builderscentral",
  linkedin: "https://linkedin.com/company/builderscentral",
  youtube: "https://youtube.com/@builderscentral",
  twitter: "https://x.com/builderscentral",
} as const;
