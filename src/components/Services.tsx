"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    title: "Accounting",
    desc: "Systematic recording, classification, and reporting of financial transactions with precision and regulatory compliance.",
    tag: "CORE SERVICE",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h6M8 11h6M8 15h2" />
      </svg>
    )
  },
  {
    title: "Taxation",
    desc: "Strategic tax planning, computation, and filing to ensure full compliance while optimizing tax positions for individuals and businesses.",
    tag: "SPECIALIZATION",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8M10 9H8" />
      </svg>
    )
  },
  {
    title: "Financial Analysis",
    desc: "Deep-dive financial statement analysis, ratio analysis, and performance benchmarking to support informed business decisions.",
    tag: "ANALYTICS",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-4-4-4 4" />
        <path d="M18 9h-4M18 9v4" />
      </svg>
    )
  },
  {
    title: "Auditing",
    desc: "Systematic examination of financial records and internal controls to verify accuracy, detect irregularities, and ensure transparency.",
    tag: "ASSURANCE",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    )
  },
  {
    title: "Financial Consulting",
    desc: "Strategic financial advisory to help businesses understand their numbers, plan for growth, and navigate complex financial decisions.",
    tag: "ADVISORY",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    title: "Market & Investment Analysis",
    desc: "Technical and fundamental analysis of equity markets, trend identification, and investment research with a data-driven approach.",
    tag: "RESEARCH",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }
];

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-cream py-[140px] px-6 md:px-[48px] overflow-hidden">
      {/* Decorative Diagonal Line */}
      <div className="absolute top-24 right-24 w-[120px] h-[1px] bg-sage rotate-45 transform origin-top-right z-0 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16 reveal">
          <span className="w-[40px] h-[1.5px] bg-sage block" />
          <span className="font-syne text-[10px] tracking-[0.3em] text-forest">SERVICES</span>
        </div>

        <h2 className="font-cormorant font-bold text-[48px] md:text-[64px] text-trueblack leading-tight mb-20 reveal">
          What I Offer.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              className="group interactive relative bg-[#EEEAE0] rounded-[4px] p-[40px_36px] flex flex-col items-start gap-6 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[8px_8px_20px_rgba(0,0,0,0.07),-5px_-5px_16px_rgba(255,255,255,0.85)] hover:shadow-[0_20px_60px_rgba(30,58,38,0.3)] hover:-translate-y-[8px] hover:bg-forest border border-transparent hover:border-sage"
            >
              <div className="text-forest transition-colors duration-400 group-hover:text-sage">
                {service.icon}
              </div>

              <h3 className="font-cormorant font-bold text-[24px] text-trueblack transition-colors duration-400 group-hover:text-cream leading-snug">
                {service.title}
              </h3>

              <p className="font-sans font-light text-[14px] text-mutedblack leading-relaxed transition-colors duration-400 group-hover:text-cream/80 flex-1">
                {service.desc}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="w-[4px] h-[4px] rounded-full bg-sage" />
                <span className="font-syne text-[9px] tracking-[0.15em] text-mutedblack transition-colors duration-400 group-hover:text-cream/60">
                  {service.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
