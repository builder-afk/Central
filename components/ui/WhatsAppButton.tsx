"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP, BUSINESS } from "@/lib/constants";

export default function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickMessages = [
    {
      label: "General Inquiry",
      message: WHATSAPP.defaultMessage,
    },
    {
      label: "Get a 3D Tour Quote",
      message: WHATSAPP.serviceMessage("Immersive 3D Property Showcases"),
    },
    {
      label: "Schedule a Demo",
      message: `Hi, I'd like to schedule a demo of Builder's Central services. When would be a good time?`,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Menu */}
      {isExpanded && (
        <div
          className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[280px] sm:w-[320px] animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
          {/* Header */}
          <div className="bg-[#25D366] px-5 py-4">
            <p className="text-white text-[15px] font-semibold">
              {BUSINESS.name}
            </p>
            <p className="text-white/80 text-[12px] mt-0.5">
              Typically replies within minutes
            </p>
          </div>

          {/* Quick Messages */}
          <div className="p-3 space-y-1.5">
            {quickMessages.map((item) => (
              <a
                key={item.label}
                href={WHATSAPP.getUrl(item.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-[#25D366]/10 transition-colors group"
                onClick={() => setIsExpanded(false)}
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Direct link */}
          <div className="px-3 pb-3">
            <a
              href={WHATSAPP.getUrl(WHATSAPP.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-[13px] font-semibold hover:bg-[#20BD5A] transition-colors"
              onClick={() => setIsExpanded(false)}
            >
              <MessageCircle className="w-4 h-4" />
              Open WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isExpanded
            ? "bg-slate-900 text-white hover:bg-slate-800"
            : "bg-[#25D366] text-white hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)]"
        }`}
        aria-label={isExpanded ? "Close WhatsApp menu" : "Chat on WhatsApp"}
      >
        {isExpanded ? (
          <X className="w-5 h-5" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>

      {/* Pulse animation on initial load */}
      {!isExpanded && (
        <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      )}
    </div>
  );
}
