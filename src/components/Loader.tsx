"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 3000;
    let rafId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 600); 
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 300;
    const pixelRatio = window.devicePixelRatio || 1;
    
    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    let rafId: number;
    const startFrame = performance.now();
    
    const lines = Array.from({ length: 12 }, (_, i) => ({
      angle: (i * 360) / 12,
      speed: (i + 1) * 0.8,
    }));

    const draw = (time: number) => {
      const elapsed = time - startFrame;
      const elapsedFrames = elapsed / (1000 / 60);

      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;

      lines.forEach((line) => {
        const currentAngle = line.angle + line.speed * elapsedFrames;
        const rad = (currentAngle * Math.PI) / 180;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * 80, cy + Math.sin(rad) * 80);
        ctx.strokeStyle = "rgba(197, 223, 160, 0.6)"; 
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-forest flex flex-col items-center justify-center overflow-hidden"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{ clipPath: isExiting ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center"
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-cormorant italic text-[140px] text-sage opacity-[0.08] tracking-[0.3em] select-none">
            S.C.
          </span>
        </div>

        <div className="relative w-[300px] h-[300px] flex items-center justify-center z-10">
          <canvas ref={canvasRef} className="absolute inset-0" />
          
          <motion.svg
            width="124"
            height="124"
            viewBox="0 0 124 124"
            className="absolute pointer-events-none"
            initial={{ scale: 1 }}
            animate={{ scale: progress >= 100 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.circle
              cx="62"
              cy="62"
              r="60"
              stroke="#C5DFA0"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="377" 
              initial={{ strokeDashoffset: 377 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.svg>
          
          <span className="font-syne text-[11px] text-sage tracking-[0.2em] absolute pointer-events-none">
            LOADING
          </span>
        </div>

        <div className="absolute bottom-16 flex flex-col items-center gap-4 z-10">
          <div className="w-[200px] h-[1px] bg-cream/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-sage"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0 }}
            />
          </div>
          <span className="font-syne text-[11px] text-sage tracking-[0.1em]">
            {Math.floor(progress).toString().padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
