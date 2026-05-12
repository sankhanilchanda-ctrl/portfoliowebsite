"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import SectionHeading from "./SectionHeading";

export default function Footer() {
  return (
    <section className="relative w-full bg-forest pt-[100px] px-6 md:px-[48px] pb-[60px] overflow-hidden">
      
      {/* Decorative Top Left lines */}
      <div className="absolute top-12 left-12 w-[200px] h-[200px] pointer-events-none opacity-20">
        <svg viewBox="0 0 100 100" fill="none" stroke="#C5DFA0" strokeWidth="0.5">
          <line x1="0" y1="10" x2="100" y2="90" />
          <line x1="0" y1="30" x2="100" y2="70" />
          <line x1="20" y1="0" x2="80" y2="100" />
          <line x1="40" y1="0" x2="60" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
        </svg>
      </div>

      {/* Top 120px Gradient Fade for entering from Contact (Cream) */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-cream to-transparent pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto flex flex-col relative z-10">
        
        {/* Top Section */}
        <div className="relative w-full flex flex-col items-center justify-center py-20">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full text-center"
          >
            <span className="font-cormorant italic font-light text-[80px] md:text-[140px] lg:text-[200px] text-cream leading-none tracking-tight">
              Finance.
            </span>
          </motion.div>
          
          <div className="relative z-10 flex flex-col items-center gap-12">
            <SectionHeading 
              text="Numbers don't lie. Let's talk." 
              className="font-cormorant italic font-bold text-[40px] md:text-[56px] text-cream text-center leading-tight" 
            />
            
            <MagneticButton>
              <button className="interactive bg-sage text-forest font-syne text-[11px] tracking-[0.15em] px-[40px] py-[16px] rounded-none transition-all duration-300 hover:bg-cream hover:-translate-y-[2px] shadow-lg">
                GET IN TOUCH
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Middle Info Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end mt-24 mb-10 gap-8 md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-cormorant font-bold text-[48px] text-cream leading-none">SC</span>
            <span className="font-sans font-light text-[13px] text-cream/60">Chartered Accountant Aspirant | Siliguri, West Bengal</span>
          </div>
          
          <nav className="flex items-center gap-6 md:gap-10">
            {["ABOUT", "JOURNEY", "SERVICES", "CONTACT"].map(link => (
              <a href={`#${link.toLowerCase()}`} key={link} className="interactive group relative font-syne text-[10px] tracking-[0.15em] text-cream/70 hover:text-sage transition-colors duration-300 flex flex-col items-center">
                {link}
                <span className="absolute -bottom-3 w-[4px] h-[4px] rounded-full bg-sage scale-0 group-hover:scale-100 transition-transform duration-300" />
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-sage opacity-25 mb-8" />

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <span className="font-sans font-light text-[13px] text-cream/40">© 2025 Sankhanil Chanda. All rights reserved.</span>
          
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/cool__n__stuff?igsh=cWMwM3Y1djBkbTM5" target="_blank" rel="noopener noreferrer" className="interactive text-cream/60 hover:text-sage hover:scale-115 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sankhanil-chanda-b4441b331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="interactive text-cream/60 hover:text-sage hover:scale-115 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          <span className="font-sans font-light text-[13px] text-cream/40">Crafted with precision.</span>
        </div>

      </div>
    </section>
  );
}
