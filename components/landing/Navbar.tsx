"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Clock, Menu, X, ArrowRight, User, LayoutDashboard, LogOut, MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/constants";
import { getCurrentUser } from "@/lib/api/auth";

interface AnimatedButtonProps {
  text: string;
  className?: string;
  iconColor?: string;
  iconBg?: string;
  iconIcon?: React.ComponentType<{ className?: string }>;
}

const AnimatedButton = ({ text, className = "", iconColor = "text-black", iconBg = "bg-white", iconIcon = ArrowRight }: AnimatedButtonProps) => {
  const Icon = iconIcon;
  return (
    <button className={`group flex items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full font-medium text-[13px] ${className}`}>
      <div className="h-[20px] overflow-hidden flex flex-col relative">
        <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">{text}</span>
        <span className="absolute top-full left-0 translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">{text}</span>
      </div>
      <div className={`w-6 h-6 sm:w-8 sm:h-8 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${iconColor} -rotate-45 group-hover:-rotate-[90deg] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]`} />
      </div>
    </button>
  );
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ full_name?: string; email: string; role?: string } | null>(null);
  const [time, setTime] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("houseverse_token");
    if (token) {
      getCurrentUser(token)
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("houseverse_token");
          setUser(null);
        });
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false } as const;
      setTime(now.toLocaleTimeString('en-GB', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("houseverse_token");
    setUser(null);
    setIsAccountDropdownOpen(false);
  };

  const navLinks = [
    { label: "Professionals", href: "/" },
    { label: "Our Services", href: "/how-it-works#services" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/how-it-works#pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 pointer-events-none flex items-center justify-between px-4 sm:px-8">
        
        {/* LEFT - Logo */}
        <div className="pointer-events-auto">
          <Link href="/" className="flex items-center">
            <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] drop-shadow-sm">Builder&apos;s Central</span>
          </Link>
        </div>

        {/* CENTER - Floating Nav Pill (Desktop Only) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-[#faf5f0] border border-[#171717]/10 rounded-full items-center p-[5px] pointer-events-auto shadow-sm">
          <nav className="flex items-center gap-6 px-6">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} className="text-[14px] text-[#171717] hover:text-[#936850] transition-colors duration-300 font-medium whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 lg:gap-6 border-l border-[#171717]/10 pl-6 pr-1 py-1">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#171717]/60" />
              <span className="text-[13px] text-[#171717]/70 font-medium hidden lg:inline">{time} in London</span>
              <span className="text-[13px] text-[#171717]/70 font-medium lg:hidden">{time}</span>
            </div>
            {!user && (
              <Link href="/auth/signup">
                <AnimatedButton text="Get Started" className="bg-[#171717] text-white hidden lg:flex hover:bg-[#624334]" iconColor="text-[#171717]" />
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT - Account & Mobile Toggle */}
        <div className="pointer-events-auto flex items-center gap-4">
          
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#171717] hover:bg-[#fdf8f5] transition-colors border border-[#171717]/10 shadow-sm"
              >
                <User className="w-4.5 h-4.5" />
              </button>
              
              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden font-body">
                  <div className="px-5 py-4 border-b border-slate-100 mb-2 bg-slate-50/50">
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">{user.full_name || user.email}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role || 'user'} Account</p>
                  </div>
                  
                  <Link href="/dashboard" onClick={() => setIsAccountDropdownOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    My Dashboard
                  </Link>
                  
                  <div className="h-px bg-slate-100 my-2 mx-4" />
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="hidden md:flex text-[14px] font-medium text-[#171717] hover:text-[#936850] transition-colors bg-white px-5 py-2 rounded-full shadow-sm border border-slate-200">
              Log In
            </Link>
          )}

          <button 
            className="md:hidden w-10 h-10 bg-[#171717] rounded-full flex items-center justify-center text-white shadow-sm"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute bottom-0 left-0 right-0 mx-3 mb-3 bg-white rounded-2xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col gap-8 ${isMenuOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}>
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <Clock className="w-4 h-4" />
                <span>{time} in London</span>
             </div>
             <button onClick={() => setIsMenuOpen(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"><X className="w-5 h-5"/></button>
          </div>
          <nav className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} className="text-[28px] leading-[32px] font-medium text-gray-900" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <Link href="/dashboard" className="text-center font-medium text-gray-600 hover:text-gray-900 py-2">
                My Dashboard
              </Link>
            ) : (
              <Link href="/auth/login" className="text-center font-medium text-gray-600 hover:text-gray-900 py-2">
                Log In
              </Link>
            )}
            <a
              href={WHATSAPP.getUrl(WHATSAPP.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-[14px] font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <AnimatedButton text="Get Started" className="bg-[#F26522] text-white w-full py-3 pl-6" iconColor="text-[#F26522]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
