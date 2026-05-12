"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MILESTONES = [
  {
    side: "left",
    year: "2022 — 2024",
    title: "Commerce — Higher Secondary",
    desc: "Completed Class 12 with Commerce stream, building the academic base for a career in finance and accounting.",
    pill: { text: "SCHOOL", type: "outline" }
  },
  {
    side: "right",
    year: "2025",
    title: "CA Foundation — Cleared",
    desc: "Successfully passed the ICAI CA Foundation examination — the first critical milestone toward becoming a Chartered Accountant.",
    pill: { text: "CA FOUNDATION", type: "solid" },
    icon: "checkmark"
  },
  {
    side: "left",
    year: "2025 — PRESENT",
    title: "B.Com Honours (Accounting & Finance)",
    desc: "Currently pursuing B.Com Honours with specialization in Accounting and Finance — deepening theoretical and applied knowledge.",
    pill: { text: "ONGOING", type: "pulsing" },
    badge: "PURSUING"
  },
  {
    side: "right",
    year: "FUTURE",
    title: "Chartered Accountant — ICAI",
    desc: "The ultimate milestone — becoming a fully qualified Chartered Accountant and finance professional.",
    isFuture: true
  }
];

const Marker = () => (
  <div className="relative flex items-center justify-center w-[12px] h-[12px] z-20">
    <div className="absolute w-[12px] h-[12px] rounded-full border-[1.5px] border-sage" />
    <div className="absolute w-[6px] h-[6px] rounded-full bg-sage" />
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      whileInView={{ scale: 2.5, opacity: 0 }}
      viewport={{ once: false, amount: "all" }}
      transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
      className="absolute w-[6px] h-[6px] rounded-full bg-sage"
    />
  </div>
);

const Card = ({ content }: { content: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: content.side === 'left' ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative w-full max-w-[360px] bg-[rgba(197,223,160,0.07)] backdrop-blur-[12px] p-[32px] md:p-[36px] rounded-[4px]",
        content.isFuture ? "border border-dashed border-[rgba(197,223,160,0.2)]" : "border border-[rgba(197,223,160,0.2)]"
      )}
    >
      {content.badge && (
        <div className="absolute -top-3 -right-3 px-3 py-1 bg-forest border border-sage/30 rounded-[2px] shadow-lg">
          <span className="font-syne text-[9px] text-gold">{content.badge}</span>
        </div>
      )}

      <span className={cn("font-syne text-[10px] tracking-[0.2em] mb-4 block", content.isFuture ? "text-cream/40" : "text-gold")}>
        {content.year}
      </span>
      
      <h3 className={cn(
        "mb-4 flex items-center gap-3",
        content.isFuture ? "font-cormorant italic font-light text-[26px] text-cream/50 leading-[1.2]" : "font-cormorant font-semibold text-[26px] text-cream leading-[1.2]"
      )}>
        {content.title}
        {content.icon === 'checkmark' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5DFA0" strokeWidth="1.5">
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              d="M20 6L9 17l-5-5" 
            />
          </svg>
        )}
      </h3>

      <p className={cn("font-sans font-light text-[14px] leading-[1.6]", content.isFuture ? "text-cream/40" : "text-cream/70")}>
        {content.desc}
      </p>

      {content.pill && (
        <div className="mt-6">
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px]",
            content.pill.type === 'solid' && "bg-sage",
            (content.pill.type === 'outline' || content.pill.type === 'pulsing') && "border border-sage/50 bg-[rgba(197,223,160,0.05)]"
          )}>
            {content.pill.type === 'pulsing' && (
              <span className="w-[3px] h-[3px] rounded-full bg-sage animate-[pulse_1s_ease-in-out_infinite]" />
            )}
            <span className={cn(
              "font-syne text-[9px] tracking-[0.1em]",
              content.pill.type === 'solid' ? "text-forest" : "text-sage"
            )}>
              {content.pill.text}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
};

export default function Journey() {
  return (
    <section id="journey" className="w-full bg-forest py-[140px] px-6 md:px-[48px] flex flex-col items-center overflow-hidden">
      {/* Section Label */}
      <div className="flex flex-col items-center gap-4 mb-6 reveal">
        <span className="w-[40px] h-[1.5px] bg-sage block" />
        <span className="font-syne text-[10px] tracking-[0.3em] text-sage">MY JOURNEY</span>
      </div>

      <h2 className="font-cormorant italic font-light text-[48px] md:text-[64px] text-cream leading-tight mb-24 reveal text-center">
        A disciplined path forward.
      </h2>

      <div className="w-full max-w-[1000px] relative py-12">
        {/* The solid spine */}
        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-[120px] w-[1px] bg-sage -translate-x-1/2 z-0 opacity-50" />
        
        {/* The dotted spine for future */}
        <div className="absolute left-[24px] md:left-1/2 bottom-0 h-[120px] w-[1px] border-l border-dashed border-sage/40 -translate-x-1/2 z-0" />

        <div className="flex flex-col w-full gap-16 md:gap-24 relative z-10">
          {MILESTONES.map((m, i) => {
            const isLeft = m.side === "left";
            return (
              <div key={i} className="flex w-full justify-start md:justify-between items-center relative">
                
                {/* Mobile Marker */}
                <div className="absolute left-[24px] md:hidden -translate-x-1/2 flex items-center justify-center">
                   <Marker />
                </div>

                {/* Left Desktop spacer / content */}
                <div className={cn("hidden md:flex w-[calc(50%-48px)]", isLeft ? "justify-end" : "justify-end opacity-0 pointer-events-none")}>
                  {isLeft && <Card content={m} />}
                </div>

                {/* Desktop Marker */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                   <Marker />
                </div>

                {/* Right Desktop spacer / content */}
                <div className={cn("hidden md:flex w-[calc(50%-48px)]", !isLeft ? "justify-start" : "justify-start opacity-0 pointer-events-none")}>
                  {!isLeft && <Card content={m} />}
                </div>

                {/* Mobile Content */}
                <div className="flex md:hidden w-full pl-[64px]">
                   <Card content={m} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
