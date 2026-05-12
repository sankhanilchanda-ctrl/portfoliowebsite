"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 h-[2px] bg-sage z-[9998] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
