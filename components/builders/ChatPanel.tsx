"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Paperclip,
  Mic,
  FileText,
  Image as ImageIcon,
  Phone,
  Video,
  Check,
  CheckCheck,
} from "lucide-react";
import { Builder } from "@/store/useBuilderStore";
import VerifiedBadge from "./VerifiedBadge";

interface Message {
  id: string;
  sender: "user" | "builder";
  text: string;
  time: string;
  type: "text" | "image" | "pdf" | "voice";
  read: boolean;
}

const initialMessages: Message[] = [
  {
    id: "m1",
    sender: "builder",
    text: "Hi! Thanks for reaching out. I'd love to learn more about your project. Could you share some details about the kind of space you're envisioning?",
    time: "10:30 AM",
    type: "text",
    read: true,
  },
  {
    id: "m2",
    sender: "user",
    text: "Hi! I'm looking to build a modern villa in Goa with 4 bedrooms and an open-plan living area. Budget is around ₹80L.",
    time: "10:32 AM",
    type: "text",
    read: true,
  },
  {
    id: "m3",
    sender: "builder",
    text: "That sounds like a great project! I've done several villas in Goa. Let me share some of my past work that might align with your vision.",
    time: "10:33 AM",
    type: "text",
    read: true,
  },
  {
    id: "m4",
    sender: "builder",
    text: "📎 Ocean_Crest_Villa_Portfolio.pdf",
    time: "10:34 AM",
    type: "pdf",
    read: true,
  },
  {
    id: "m5",
    sender: "user",
    text: "This looks amazing! I love the open courtyard concept. Can we do something similar?",
    time: "10:36 AM",
    type: "text",
    read: true,
  },
  {
    id: "m6",
    sender: "builder",
    text: "Absolutely! I can create a 3D visualization for you within a week so you can walk through the design virtually before we finalize anything.",
    time: "10:38 AM",
    type: "text",
    read: true,
  },
];

interface ChatPanelProps {
  builder: Builder;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ builder, isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, [messages, isOpen]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
      type: "text",
      read: false,
    };

    setMessages([...messages, newMessage]);
    setInput("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `m${prev.length + 1}`,
          sender: "builder",
          text: "That's great to hear! Let me put together a preliminary design concept and share it with you by tomorrow. Feel free to send any reference images you like.",
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
          type: "text",
          read: true,
        },
      ]);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-[#f5f5f0] z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-xl border-b border-slate-100 shrink-0">
              <div className="flex items-center justify-between px-5 h-16">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${builder.coverGradient} flex items-center justify-center text-sm font-heading italic text-white shadow-md`}>
                    {builder.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{builder.name}</span>
                      {builder.verified && <VerifiedBadge size="sm" showLabel={false} />}
                    </div>
                    <p className="text-xs text-emerald-500 font-medium">Online</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
              {/* Date separator */}
              <div className="text-center mb-3">
                <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] text-slate-400 font-medium shadow-sm border border-slate-100">
                  Today
                </span>
              </div>

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={message.sender === "user" ? "message-bubble-sent" : "message-bubble-received"}>
                    {message.type === "pdf" ? (
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">{message.text.replace("📎 ", "")}</p>
                          <p className={`text-[10px] ${message.sender === "user" ? "text-white/50" : "text-slate-400"}`}>PDF · 2.4 MB</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] leading-relaxed">{message.text}</p>
                    )}

                    <div className={`flex items-center gap-1 mt-1 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <span className={`text-[9px] ${message.sender === "user" ? "text-white/40" : "text-slate-400"}`}>
                        {message.time}
                      </span>
                      {message.sender === "user" && (
                        message.read
                          ? <CheckCheck className="w-3 h-3 text-blue-400" />
                          : <Check className="w-3 h-3 text-white/40" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="message-bubble-received">
                    <div className="flex items-center gap-1.5 py-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div className="shrink-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-3">
              <div className="flex items-end gap-2">
                <div className="flex items-center gap-0.5">
                  <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
                  />
                </div>

                {input.trim() ? (
                  <button
                    onClick={sendMessage}
                    className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-colors shadow-md shrink-0"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                ) : (
                  <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors shrink-0">
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
