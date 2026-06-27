"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the process work?",
    answer:
      "It's simple: you contact us with your property details, we schedule an on-site shoot with our professional team, and within 48–72 hours you receive a fully interactive 3D showcase, 360° virtual tour, or interactive floor plan — ready to share with buyers.",
  },
  {
    question: "How long does it take to create a tour?",
    answer:
      "Most properties are captured in a single on-site session (1–3 hours depending on size). Post-processing and delivery typically takes 48 hours for apartments and 72 hours for larger villas or commercial spaces.",
  },
  {
    question: "Can I embed tours on my own website?",
    answer:
      "Absolutely. Every tour comes with an embed code that you can drop into any website. We also provide direct links for sharing via WhatsApp, email, or social media. The tours are fully responsive and work on all devices.",
  },
  {
    question: "What file formats and deliverables do I receive?",
    answer:
      "You receive a hosted, web-based interactive tour (accessible via URL), embed codes for your website, high-resolution 360° images, and if applicable, interactive floor plan files. All hosted on our fast CDN infrastructure.",
  },
  {
    question: "Do you offer volume pricing for multiple properties?",
    answer:
      "Yes! Our Developer Portfolio plan offers custom pricing for builders with multiple properties. You get dedicated account management, priority scheduling, and significant per-property savings. Contact our sales team for a custom quote.",
  },
  {
    question: "What areas do you currently serve?",
    answer:
      "We currently operate across all major Indian metros and tier-1 cities. Our team can travel to your project site anywhere in India. For international projects, please contact us to discuss availability.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  toggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-[#ebebeb] last:border-0"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-[16px] font-medium transition-colors ${
            isOpen ? "text-[#171717]" : "text-[#171717] group-hover:text-[#4d4d4d]"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`ml-4 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all border ${
            isOpen
              ? "bg-[#171717] text-[#ffffff] border-[#171717]"
              : "bg-[#ffffff] text-[#4d4d4d] border-[#ebebeb] group-hover:border-[#a1a1a1] group-hover:text-[#171717] shadow-[0px_1px_1px_#00000005]"
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-[#4d4d4d] leading-[24px] pb-6 pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-[#fafafa] pt-16 sm:pt-20 lg:pt-32 pb-24 sm:pb-32 lg:pb-40 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Badge Row */}
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <div className="text-[12px] font-mono uppercase tracking-widest border border-[#ebebeb] rounded-full px-4 py-1.5 text-[#171717] bg-[#ffffff] shadow-[0px_1px_1px_#00000005]">
            FAQ
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#171717] font-heading italic leading-[1.05] tracking-[-0.03em] text-[clamp(2rem,6vw,3.5rem)] mb-4 max-w-[900px] mx-auto">
            Frequently asked questions.
          </h2>
          <p className="text-[18px] text-[#4d4d4d] max-w-md mx-auto font-normal">
            Everything you need to know about our services.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-[#ffffff] rounded-[12px] p-6 sm:p-10 border border-[#ebebeb] shadow-[0px_1px_1px_#00000005,0px_2px_2px_#0000000a]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              toggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
