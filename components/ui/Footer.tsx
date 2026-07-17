import Link from "next/link";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-slate-50 border-t border-gray-200 font-body relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-b from-[#F26522]/5 to-transparent blur-[60px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 text-gray-900 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-[#F26522]/30 group-hover:shadow-[#F26522]/10 transition-all">
                <Building2 className="w-5 h-5 text-[#F26522]" />
              </div>
              <span className="font-heading italic font-bold tracking-tight text-2xl">Builder's Central</span>
            </Link>
            <p className="text-[15px] text-gray-500 leading-relaxed max-w-sm">
              The complete property marketing infrastructure for builders and developers. We build 3D tours, virtual staging, drone content, and interactive floor plans.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#F26522]/40 hover:text-[#F26522] hover:shadow-sm transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#F26522]/40 hover:text-[#F26522] hover:shadow-sm transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#F26522]/40 hover:text-[#F26522] hover:shadow-sm transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-gray-900 font-bold mb-6 tracking-tight">Solutions</h3>
            <ul className="flex flex-col gap-3 text-[15px] text-gray-500">
              <li>
                <Link href="/services" className="hover:text-[#F26522] transition-colors">3D Property Tours</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F26522] transition-colors">Virtual Staging</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F26522] transition-colors">Drone Content</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#F26522] transition-colors">Interactive Floor Plans</Link>
              </li>
              <li>
                <Link href="/architecture-builder" className="hover:text-[#F26522] transition-colors flex items-center gap-1.5">
                  AI Architecture
                  <span className="px-1.5 py-0.5 rounded-md bg-[#F26522]/10 text-[#F26522] text-[10px] font-bold uppercase tracking-wider">New</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="text-gray-900 font-bold mb-6 tracking-tight">Company</h3>
            <ul className="flex flex-col gap-3 text-[15px] text-gray-500">
              <li>
                <Link href="/explore" className="hover:text-[#F26522] transition-colors">Portfolio Showcase</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#F26522] transition-colors">How it Works</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#F26522] transition-colors">Pricing Options</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F26522] transition-colors">Contact Sales</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-gray-900 font-bold mb-6 tracking-tight">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-[15px] text-gray-500">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:hello@builderscentral.com" className="hover:text-[#F26522] transition-colors">hello@builderscentral.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+18001234567" className="hover:text-[#F26522] transition-colors">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="leading-snug">
                  100 Innovation Way<br />
                  Suite 400<br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-gray-500">
          <p>© {currentYear} Builder's Central. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <a href="#" className="hover:text-[#F26522] transition-colors flex items-center gap-1 group">
              Partner Portal <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
