"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "JOURNEY", href: "#journey" },
  { name: "SERVICES", href: "#services" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full h-[72px] z-[1000] transition-all duration-400 ease-in-out flex items-center justify-between px-6 md:px-[48px]",
          isScrolled
            ? "bg-[rgba(248,245,236,0.82)] backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-sage/25"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <a href="#" className="group flex flex-col items-start interactive">
          <div className="relative inline-block">
            <span className="font-cormorant font-semibold text-[22px] text-trueblack">
              Sankhanil Chanda
            </span>
            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-sage transition-all duration-300 ease-out group-hover:w-full" />
          </div>
          <span className="font-syne text-[9px] tracking-[0.25em] text-forest mt-0.5">
            CA ASPIRANT
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "interactive relative font-syne text-[11px] tracking-[0.15em] uppercase flex flex-col items-center group transition-colors duration-300",
                  isActive ? "text-forest" : "text-trueblack"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-3 w-[4px] h-[4px] rounded-full bg-sage transition-transform duration-300",
                    isActive ? "scale-100" : "scale-0 group-hover:scale-100"
                  )}
                />
              </a>
            );
          })}

          <button className="interactive group relative px-5 py-2.5 rounded-full border-[1.5px] border-sage text-forest flex items-center gap-2 overflow-hidden transition-colors duration-300 hover:bg-sage hover:text-cream">
            <span className="w-[4px] h-[4px] rounded-full bg-sage animate-pulse group-hover:bg-cream" />
            <span className="font-syne text-[11px] tracking-[0.15em] z-10 relative mt-[1px]">
              CHAT WITH AI
            </span>
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="interactive flex flex-col justify-center gap-[6px] md:hidden w-[24px] h-[24px]"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span className="w-[24px] h-[1.5px] bg-sage block" />
          <span className="w-[24px] h-[1.5px] bg-sage block" />
          <span className="w-[24px] h-[1.5px] bg-sage block" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[2000] bg-forest flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Watermark graphic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -rotate-12">
              <span className="font-cormorant italic text-[400px] text-sage opacity-[0.05] tracking-tighter select-none">
                SC
              </span>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-2 text-sage interactive"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Mobile Links */}
            <nav className="flex flex-col items-center gap-8 relative z-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-cormorant italic text-[52px] text-cream interactive hover:text-sage transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-6 py-3 rounded-full border border-sage text-sage font-syne tracking-[0.15em] text-sm flex items-center gap-3 interactive hover:bg-sage hover:text-forest transition-colors duration-300 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse group-hover:bg-forest" />
                CHAT WITH AI
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
