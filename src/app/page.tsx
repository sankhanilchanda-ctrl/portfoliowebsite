"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Services from "@/components/Services";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <main
        className={`transition-opacity duration-400 ease-in-out ${
          isLoading ? "invisible opacity-0" : "visible opacity-100"
        }`}
      >
        <Navbar />
        <ScrollRevealProvider>
          <Hero />
          <About />
          <Journey />
          <Services />
          <Hobbies />
          <Contact />
        </ScrollRevealProvider>
        <Footer />
        <Chatbot />
      </main>
    </>
  );
}
