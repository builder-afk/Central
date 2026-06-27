"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Mic,
  FileText,
  Image as ImageIcon,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
} from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import VerifiedBadge from "@/components/builders/VerifiedBadge";

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
    text: "Absolutely! I can create a 3D visualization for you within a week so you can walk through the design virtually before we finalize anything. Would you like to schedule a site visit first?",
    time: "10:38 AM",
    type: "text",
    read: true,
  },
];

export default function ChatPage() {
  const params = useParams();
  const getBuilderById = useBuilderStore((s) => s.getBuilderById);
  const builder = getBuilderById(params.id as string);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    // Simulate builder typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `m${prev.length + 1}`,
          sender: "builder",
          text: "That's great to hear! Let me put together a preliminary design concept and share it with you by tomorrow. In the meantime, feel free to send any reference images you like.",
          time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }),
          type: "text",
          read: true,
        },
      ]);
    }, 2000);
  };

  if (!builder) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Builder not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f0] font-body">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-100 shrink-0 z-10">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-3">
            <Link
              href={`/builders/${builder.id}`}
              className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
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
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <Video className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-3">
        {/* Date separator */}
        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[11px] text-slate-400 font-medium shadow-sm border border-slate-100">
            Today
          </span>
        </div>

        {messages.map((message, i) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={message.sender === "user" ? "message-bubble-sent" : "message-bubble-received"}>
              {message.type === "pdf" ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{message.text.replace("📎 ", "")}</p>
                    <p className={`text-xs ${message.sender === "user" ? "text-white/50" : "text-slate-400"}`}>PDF · 2.4 MB</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{message.text}</p>
              )}

              <div className={`flex items-center gap-1 mt-1.5 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span className={`text-[10px] ${message.sender === "user" ? "text-white/40" : "text-slate-400"}`}>
                  {message.time}
                </span>
                {message.sender === "user" && (
                  message.read
                    ? <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                    : <Check className="w-3.5 h-3.5 text-white/40" />
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="message-bubble-received">
              <div className="flex items-center gap-1.5 py-1">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="shrink-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 sm:px-6 py-3">
        <div className="flex items-end gap-2.5">
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <Paperclip className="w-4.5 h-4.5" />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <ImageIcon className="w-4.5 h-4.5" />
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

          <div className="flex items-center gap-1">
            {input.trim() ? (
              <button
                onClick={sendMessage}
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-colors shadow-md"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            ) : (
              <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                <Mic className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
