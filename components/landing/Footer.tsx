"use client";

import Link from "next/link";
import { Globe, Code2, Briefcase, Play, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "3D Viewer", href: "/viewer/demo" },
    { label: "AI Designer", href: "#features" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Help Center", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
  { icon: Play, href: "#", label: "YouTube" },
];

const AnimatedButton = ({ text, className = "", iconColor = "text-black", iconBg = "bg-white", iconIcon = ArrowRight }: any) => {
  const Icon = iconIcon;
  return (
    <button className={`group flex items-center justify-between gap-3 pl-6 pr-2.5 py-2.5 rounded-full font-semibold text-[15px] ${className}`}>
      <div className="h-[22px] overflow-hidden flex flex-col relative">
        <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">{text}</span>
        <span className="absolute top-full left-0 translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">{text}</span>
      </div>
      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} -rotate-45 group-hover:-rotate-[90deg] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`} />
      </div>
    </button>
  );
};

export default function Footer() {
  return (
    <footer className="relative bg-white pt-0 pb-8 overflow-hidden border-t border-gray-200">
      
      {/* CTA Band */}
      <div className="relative py-24 sm:py-32 mb-8 bg-[#F5F5F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h3 className="text-gray-900 font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,6vw,3.8rem)] mb-6">
            Ready to transform how <br className="hidden sm:block" />you sell properties?
          </h3>
          <p className="text-[16px] sm:text-[18px] text-gray-600 mb-10 max-w-xl mx-auto font-medium">
            Let us create stunning 3D showcases, 360° virtual tours, and interactive floor plans that help you close deals faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
               <AnimatedButton 
                 text="Start Free Today" 
                 className="bg-[#F26522] hover:bg-[#e05a1a] text-white w-full sm:w-auto" 
                 iconColor="text-[#F26522]" 
               />
            </Link>
            <Link href="#">
               <AnimatedButton 
                 text="Schedule Demo" 
                 className="bg-white border border-gray-200 text-gray-900 hover:border-gray-400 w-full sm:w-auto" 
                 iconBg="bg-gray-100"
               />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12 py-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="font-heading italic text-white text-[15px] font-bold leading-none mt-0.5">
                  h
                </span>
              </div>
              <span className="font-heading italic font-bold text-[18px] text-gray-900 tracking-tight">
                HouseVerse
              </span>
            </Link>
            <p className="text-[14px] text-gray-500 mb-8 leading-relaxed max-w-[240px] font-medium">
              Property visualization services for builders and developers.
              3D tours, 360° showcases, and interactive floor plans.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all font-medium shadow-sm"
              />
              <button
                className="rounded-lg px-4 py-2.5 text-white hover:bg-[#e05a1a] transition-colors bg-[#F26522] shadow-sm flex items-center justify-center"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wide">
            © {new Date().getFullYear()} HOUSEVERSE AI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
