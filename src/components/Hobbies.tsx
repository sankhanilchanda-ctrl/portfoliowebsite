"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const MARQUEE_ITEMS = [
  "Photography", "Reading", "Stock Market", "Travelling", "Music & Podcasts",
  "Photography", "Reading", "Stock Market", "Travelling", "Music & Podcasts"
];

const HOBBIES = [
  {
    title: "PHOTOGRAPHY",
    desc: "Capturing moments with precision — both behind the lens and in financial data.",
    type: "A",
    icon: (
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="40" cy="40" r="25" />
        <circle cx="60" cy="40" r="25" />
        <circle cx="50" cy="60" r="25" />
      </svg>
    )
  },
  {
    title: "READING",
    desc: "Books on finance, strategy, psychology, and life. Continuous learning as a discipline.",
    type: "B",
    icon: (
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="20" y1="30" x2="80" y2="30" strokeWidth="3" />
        <line x1="20" y1="50" x2="60" y2="50" strokeWidth="2" />
        <line x1="20" y1="70" x2="70" y2="70" strokeWidth="1" />
      </svg>
    )
  },
  {
    title: "MARKET ANALYSIS",
    desc: "Tracking equities, reading charts, and studying macro-economic patterns as a passion.",
    type: "A",
    icon: (
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 70 L40 40 L60 50 L80 20" />
        <circle cx="80" cy="20" r="3" fill="currentColor" />
      </svg>
    )
  },
  {
    title: "TRAVELLING",
    desc: "New places sharpen perspective. Every journey is data for a more complete worldview.",
    type: "B",
    icon: (
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="20,60 50,20 80,60 50,45" />
        <line x1="50" y1="45" x2="50" y2="80" />
      </svg>
    )
  },
  {
    title: "MUSIC & PODCASTS",
    desc: "From finance deep-dives to ambient focus music — sound is the backdrop to every focused session.",
    type: "A",
    icon: (
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="30" y1="50" x2="30" y2="50" strokeWidth="6" strokeLinecap="round" className="animate-[pulse_1s_ease-in-out_infinite]" />
        <line x1="50" y1="30" x2="50" y2="70" strokeWidth="6" strokeLinecap="round" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
        <line x1="70" y1="40" x2="70" y2="60" strokeWidth="6" strokeLinecap="round" className="animate-[pulse_1.2s_ease-in-out_infinite]" />
      </svg>
    )
  }
];

function TiltCard({ hobby }: { hobby: typeof HOBBIES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Proportional rotation max 8 deg
    const rX = -((mouseY - centerY) / (height / 2)) * 8;
    const rY = ((mouseX - centerX) / (width / 2)) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isDark = hobby.type === 'B';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={cn(
        "interactive relative flex flex-col justify-between w-[240px] h-[300px] p-[32px] rounded-[4px] shrink-0",
        isDark 
          ? "bg-forest border border-transparent shadow-[4px_4px_16px_rgba(30,58,38,0.4)]" 
          : "bg-[#EEEAE0] border border-transparent shadow-[6px_6px_16px_rgba(0,0,0,0.07),-4px_-4px_12px_rgba(255,255,255,0.9)]"
      )}
    >
      <div 
        className={cn("transition-colors duration-300", isDark ? "text-cream opacity-90" : "text-sage")}
        style={{ transform: "translateZ(30px)" }}
      >
        {hobby.icon}
      </div>
      <div className="flex flex-col gap-3" style={{ transform: "translateZ(20px)" }}>
        <span className={cn("font-syne text-[11px] tracking-[0.2em]", isDark ? "text-cream" : "text-trueblack")}>
          {hobby.title}
        </span>
        <p className={cn("font-sans font-light text-[13px] leading-relaxed", isDark ? "text-cream/80" : "text-mutedblack")}>
          {hobby.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Hobbies() {
  return (
    <section id="hobbies" className="w-full bg-[#EEEAE0] py-[120px] overflow-hidden flex flex-col items-center">
      <div className="px-6 md:px-[48px] w-full max-w-[1440px] mx-auto flex flex-col items-center gap-6 mb-16 reveal">
        <span className="w-[40px] h-[1.5px] bg-sage block" />
        <span className="font-syne text-[10px] tracking-[0.3em] text-forest">BEYOND FINANCE</span>
        <h2 className="font-cormorant italic font-light text-[40px] md:text-[56px] text-trueblack text-center">
          Life outside the ledger.
        </h2>
      </div>

      {/* Marquee Strip */}
      <div className="w-full h-[64px] bg-forest flex items-center overflow-hidden mb-16 relative reveal group">
        <div className="animate-marquee interactive cursor-default">
          {/* We duplicate the array inside to make it seamlessly loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center whitespace-nowrap">
              <span className="font-cormorant italic text-[22px] text-cream mx-6">{item}</span>
              <span className="text-sage text-[10px]">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Card Wrap / Scroll */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[48px]">
        <div className="flex flex-row overflow-x-auto pb-12 gap-8 snap-x snap-mandatory scrollbar-hide md:flex-wrap md:justify-center md:overflow-visible reveal">
          {HOBBIES.map((hobby, i) => (
            <div key={i} className="snap-center">
              <TiltCard hobby={hobby} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
