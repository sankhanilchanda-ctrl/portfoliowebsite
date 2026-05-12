"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }

      // Also dynamically check element under cursor for dark background using elementsFromPoint
      // This ensures if we scroll without moving mouse, it updates
      const elements = document.elementsFromPoint(mouseX, mouseY);
      const hasDarkBg = elements.some(el => el.classList?.contains('bg-forest'));
      setIsDarkBg(hasDarkBg);
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[100001] rounded-full flex items-center justify-center transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0",
        isHovering
          ? (isDarkBg ? "w-[40px] h-[40px] bg-cream/20 border-[1.5px] border-cream" : "w-[40px] h-[40px] bg-sage/30 border-[1.5px] border-forest")
          : (isDarkBg ? "w-[10px] h-[10px] bg-sage border-0" : "w-[10px] h-[10px] bg-forest border-0")
      )}
      style={{ willChange: "transform, width, height" }}
    />
  );
}
