"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        setCount(Math.floor(start + (value - start) * ease));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="flex-1 bg-[#EEEAE0] rounded-[4px] p-[24px] md:p-[32px] flex flex-col items-start gap-2 interactive transition-all duration-300 hover:-translate-y-[4px] shadow-[6px_6px_16px_rgba(0,0,0,0.07),-4px_-4px_12px_rgba(255,255,255,0.9)] hover:shadow-[8px_8px_20px_rgba(0,0,0,0.08),-6px_-6px_16px_rgba(255,255,255,1)]"
    >
      <span className="font-cormorant font-bold text-[40px] md:text-[52px] text-forest leading-none">
        {count.toString().padStart(2, "0")}{suffix}
      </span>
      <span className="font-syne text-[10px] tracking-[0.15em] text-mutedblack uppercase max-w-[80px]">
        {label}
      </span>
    </div>
  );
}

function SkillBar({ label, percentage }: { label: string; percentage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <span className="font-syne text-[11px] text-forest">{label}</span>
      </div>
      <div className="w-full h-[1px] bg-cream relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-sage transition-all duration-[1.5s] ease-out"
          style={{ width: isInView ? `${percentage}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="w-full bg-cream pt-[140px] pb-[140px] px-6 md:px-[48px] flex flex-col items-center">
      {/* Section Label */}
      <div className="flex flex-col items-center gap-4 mb-20 reveal">
        <span className="w-[40px] h-[1.5px] bg-sage block" />
        <span className="font-syne text-[10px] tracking-[0.3em] text-forest">ABOUT ME</span>
      </div>

      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 lg:gap-24">
        {/* Left Column */}
        <div className="flex flex-col items-start">
          <h2 className="font-cormorant italic font-light text-[36px] md:text-[48px] text-forest leading-[1.2] mb-10 reveal">
            "Bridging the gap between complex finance and strategic vision."
          </h2>

          <div className="w-[80px] h-[1px] bg-sage mb-10 reveal" />

          <div className="flex flex-wrap gap-4 mb-12 reveal">
            {["PRECISION", "COMPLIANCE", "VALUE CREATION"].map((keyword) => (
              <div
                key={keyword}
                className="interactive px-4 py-2 bg-[rgba(197,223,160,0.2)] border border-[rgba(197,223,160,0.6)] rounded-[2px] transition-all duration-300 hover:bg-sage hover:-translate-y-[2px]"
              >
                <span className="font-syne text-[10px] tracking-[0.15em] text-forest">
                  {keyword}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-col gap-6 reveal">
            <span className="font-syne text-[10px] tracking-[0.2em] text-mutedblack mb-2">SKILLS</span>
            <SkillBar label="Financial Advisory" percentage={80} />
            <SkillBar label="Communication" percentage={70} />
            <SkillBar label="Analytical Skills" percentage={90} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-start lg:pt-4">
          <div className="font-sans font-light text-[17px] text-mutedblack leading-[1.9] max-w-[520px] flex flex-col gap-6 mb-16 reveal">
            <p className="drop-cap">
              I am Sankhanil Chanda, a passionate Chartered Accountant Aspirant focused on building expertise in Financial Applications, Accounting, Taxation, and Strategic Financial Analysis. With a strong interest in finance and business management, I aim to transform financial knowledge into practical solutions that create real value.
            </p>
            <p>
              My journey is driven by discipline, continuous learning, and a vision to grow into a finance professional capable of solving complex business challenges with analytical thinking and precision. I believe finance is not only about numbers — it is about understanding businesses, creating strategies, and making informed decisions that drive growth.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-[16px] reveal">
            <StatCounter value={2} label="YEARS EXPERIENCE" />
            <StatCounter value={10} suffix="+" label="PROJECTS" />
            <StatCounter value={5} suffix="+" label="CLIENTS" />
          </div>
        </div>
      </div>
    </section>
  );
}
