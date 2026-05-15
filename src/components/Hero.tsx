"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect } from "react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const blobMouseX = useTransform(smoothX, (x) => x * 0.02);
  const blobMouseY = useTransform(smoothY, (y) => y * 0.02);

  const { scrollY } = useScroll();
  const blobScroll1Y = useTransform(scrollY, [0, 1000], [0, 300]);
  const blobScroll2Y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    // Only apply parallax if fine pointer is detected (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const headingLine1 = "Bridging Finance &".split(" ");
  const headingLine2 = "Strategic Vision.".split(" ");

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-cream flex items-center pt-[72px]">
      {/* Background Blobs (Scroll + Mouse Parallax Wrapper) */}
      <motion.div style={{ y: blobScroll1Y }} className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] pointer-events-none z-0">
        <motion.div
          className="w-full h-full bg-sage opacity-35 blur-[80px]"
          style={{ x: blobMouseX, y: blobMouseY, animation: "blob-morph-1 8s ease-in-out infinite" }}
        />
      </motion.div>
      <motion.div style={{ y: blobScroll2Y }} className="absolute bottom-[-5%] left-[-10%] w-[300px] h-[300px] pointer-events-none z-0">
        <motion.div
          className="w-full h-full bg-forest opacity-[0.08] blur-[60px]"
          style={{ x: blobMouseX, y: blobMouseY, animation: "blob-morph-2 11s ease-in-out infinite" }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-[48px] grid grid-cols-1 lg:grid-cols-[60%_40%] items-center gap-12">
        {/* Left Column */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-[40px] h-[1.5px] bg-sage block" />
            <span className="font-syne text-[10px] tracking-[0.3em] text-forest uppercase">
              Chartered Accountant Aspirant
            </span>
          </motion.div>

          <h1 className="font-cormorant font-bold text-[56px] md:text-[88px] leading-[0.9] text-trueblack flex flex-wrap gap-[0.25em] mb-8">
            <div className="w-full flex gap-x-[0.25em]">
              {headingLine1.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="w-full flex gap-x-[0.25em]">
              {headingLine2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (headingLine1.length + i) * 0.08, duration: 0.6, ease: "easeOut" }}
                  className="inline-block italic pr-[0.1em]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>

          <motion.p
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
            className="font-sans font-light text-[17px] text-mutedblack max-w-[420px] leading-[1.8] mb-10"
          >
            Precision. Compliance. Value Creation. A finance mind built for complex business challenges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-8"
          >
            <MagneticButton>
              <button className="interactive bg-forest text-cream font-syne text-[11px] tracking-[0.15em] px-[40px] py-[16px] rounded-none transition-all duration-300 hover:bg-sage hover:text-forest hover:-translate-y-[2px] hover:shadow-[0_8px_32px_rgba(30,58,38,0.2)]">
                VIEW PROJECTS
              </button>
            </MagneticButton>
            <MagneticButton>
              <a 
                href="/Sankhanil Chanda Cv.docx" 
                download="Sankhanil_Chanda_Cv.docx"
                className="interactive group flex flex-col items-start gap-1"
              >
                <span className="font-syne text-[11px] text-forest tracking-[0.1em] flex items-center gap-2">
                  DOWNLOAD CV
                  <span className="transition-transform duration-300 group-hover:translate-x-[4px]">→</span>
                </span>
                <span className="w-0 h-[1px] bg-forest transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column — Editorial Photo Frame */}
        <div className="relative w-full max-w-[420px] h-[520px] mx-auto lg:ml-auto mt-12 lg:mt-0">
          {/* Outer shadow frame */}
          <div className="absolute inset-0 rounded-[4px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.06),inset_0_-2px_8px_rgba(255,255,255,0.8)] z-10 overflow-hidden">
            {/* Real photo */}
            <Image
              src="/sankhanil-chanda-pic.jpeg"
              alt="Sankhanil Chanda — CA Aspirant"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-top"
              priority
            />
            {/* Subtle green overlay tint */}
            <div className="absolute inset-0 bg-forest/10 mix-blend-multiply pointer-events-none" />
            {/* Bottom gradient for name badge */}
            <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-forest/80 to-transparent pointer-events-none" />
            {/* Name badge inside photo */}
            <div className="absolute bottom-[20px] left-[20px] flex flex-col gap-[2px]">
              <span className="font-cormorant italic font-light text-[22px] text-cream leading-none">Sankhanil Chanda</span>
              <span className="font-syne text-[9px] tracking-[0.25em] text-sage">CA ASPIRANT</span>
            </div>
          </div>

          {/* Decorative nested border frames (sit on top of photo) */}
          <div className="absolute inset-4 border border-sage/40 pointer-events-none z-20 rounded-[2px]" />
          <div className="absolute inset-[18px] border border-sage/20 pointer-events-none z-20 rounded-[1px]" />

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            className="absolute -bottom-6 -left-6 md:-left-10 z-20 bg-[rgba(197,223,160,0.25)] backdrop-blur-[12px] border border-[rgba(197,223,160,0.4)] rounded-[2px] px-[20px] py-[16px] flex flex-col gap-1 shadow-sm"
          >
            <span className="font-cormorant italic font-medium text-[14px] text-forest leading-none">CA Foundation</span>
            <span className="font-syne text-[10px] tracking-[0.2em] text-gold leading-none">PASSED 2025</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 2 }} // 2s offset
            className="absolute -top-6 -right-6 md:-right-10 z-20 bg-[rgba(197,223,160,0.25)] backdrop-blur-[12px] border border-[rgba(197,223,160,0.4)] rounded-[2px] px-[20px] py-[16px] flex flex-col items-end gap-1 shadow-sm"
          >
            <span className="font-cormorant italic font-medium text-[14px] text-forest leading-none">B.Com (Hons)</span>
            <span className="font-syne text-[10px] tracking-[0.2em] text-gold leading-none">Accounting & Finance</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="font-syne text-[9px] tracking-[0.3em] text-mutedblack">SCROLL</span>
        <div className="w-[1px] h-[40px] bg-sage/30 overflow-hidden">
          <div className="w-full h-full bg-sage" style={{ animation: "scroll-line 2s cubic-bezier(0.76, 0, 0.24, 1) infinite" }} />
        </div>
      </div>

      {/* SVG Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none text-sage opacity-50">
        <svg className="relative block w-full h-[40px]" viewBox="0 0 1200 40" preserveAspectRatio="none">
          <path d="M0,20 C300,40 300,0 600,20 C900,40 900,0 1200,20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
