"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import SectionHeading from "./SectionHeading";
import Image from "next/image";

const projects = [
  {
    title: "Football Data Hub",
    category: "DATA ANALYSIS & DASHBOARD",
    description: "A comprehensive real-time football statistics platform. Built to demonstrate high-performance data handling and intuitive financial-grade UI for sports analytics.",
    link: "https://football-updates-sigma.vercel.app/",
    tags: ["React", "Tailwind", "API Integration"],
    image: "/project-football.jpg" // We can use a placeholder or generic image if needed, but I'll make it look premium with CSS if no image exists.
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-cream py-[140px] px-6 md:px-[48px] overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-20 reveal">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-[40px] h-[1.5px] bg-sage block" />
            <span className="font-syne text-[10px] tracking-[0.3em] text-forest">SELECTED WORKS</span>
          </div>
          <SectionHeading 
            text="Bridging Data & Experience." 
            className="font-cormorant font-bold text-[48px] md:text-[64px] text-trueblack leading-[0.95]"
          />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="group grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center"
            >
              {/* Left Side: Content */}
              <div className="order-2 lg:order-1 flex flex-col items-start">
                <span className="font-syne text-[10px] tracking-[0.2em] text-sage mb-4">{project.category}</span>
                <h3 className="font-cormorant italic font-bold text-[36px] md:text-[48px] text-trueblack mb-6">
                  {project.title}
                </h3>
                <p className="font-sans font-light text-[17px] text-mutedblack leading-[1.8] max-w-[480px] mb-8">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 border border-sage/30 rounded-full font-syne text-[9px] tracking-[0.1em] text-forest">
                      {tag}
                    </span>
                  ))}
                </div>

                <MagneticButton>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="interactive bg-forest text-cream font-syne text-[11px] tracking-[0.15em] px-[40px] py-[16px] transition-all duration-300 hover:bg-sage hover:text-forest hover:-translate-y-[2px] shadow-lg flex items-center gap-3"
                  >
                    VIEW LIVE PROJECT
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </MagneticButton>
              </div>

              {/* Right Side: Visual representation */}
              <div className="order-1 lg:order-2 relative aspect-[16/10] w-full group/image">
                {/* Neumorphic shadow container */}
                <div className="absolute inset-0 bg-[#EEEAE0] rounded-[4px] shadow-[6px_6px_20px_rgba(0,0,0,0.06),-4px_-4px_12px_rgba(255,255,255,0.8)] p-4 transition-transform duration-500 group-hover/image:scale-[1.02]">
                  <div className="relative w-full h-full bg-forest overflow-hidden flex items-center justify-center rounded-[2px]">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5DFA0_1px,transparent_1px)] [background-size:20px_20px]" />
                    
                    {/* Abstract Data Representation */}
                    <div className="relative z-10 flex flex-col items-center">
                       <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#C5DFA0" strokeWidth="0.5" className="opacity-40 animate-[pulse_4s_infinite]">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                       </svg>
                       <span className="font-syne text-[12px] tracking-[0.3em] text-sage/60 mt-4">REAL-TIME DATA PLATFORM</span>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover/image:opacity-20 transition-opacity duration-700 bg-gradient-to-tr from-sage to-transparent" />
                  </div>
                </div>

                {/* Floating badge inside visual */}
                <div className="absolute -bottom-4 -right-4 bg-cream border border-sage/30 px-6 py-4 shadow-xl z-20">
                  <div className="flex flex-col gap-1">
                    <span className="font-cormorant italic text-[14px] text-forest">Verified Deployment</span>
                    <span className="font-syne text-[8px] tracking-[0.2em] text-gold uppercase">Vercel 2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
