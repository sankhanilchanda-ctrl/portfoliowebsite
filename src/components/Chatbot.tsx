"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

type Message = { role: "user" | "model"; text: string };

const SYSTEM_PROMPT = `You are an AI assistant for Sankhanil Chanda's personal portfolio website. Here is everything you know about him:

PERSONAL: Sankhanil Chanda is a Chartered Accountant Aspirant based in Siliguri, West Bengal, India.

EDUCATION: He is currently pursuing B.Com Honours in Accounting and Finance. He passed his CA Foundation exam in 2025. He completed Class 12 Commerce between 2022–2024.

EXPERTISE: Accounting, Taxation, Financial Analysis, Auditing, Financial Consulting, and Strategic Financial Planning.

HOBBIES: Photography, Reading, Stock Market Analysis, Travelling, and Music & Podcasts.

CONTACT: Email — sankhanilchanda@gmail.com | Instagram — https://www.instagram.com/cool__n__stuff | LinkedIn — https://www.linkedin.com/in/sankhanil-chanda-b4441b331

INSTRUCTIONS: Answer questions about his background, skills, services, and contact information helpfully and concisely. Keep responses under 120 words. If asked about something completely unrelated to Sankhanil, politely redirect to how you can help the visitor learn about him or connect with him.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUnread, setShowUnread] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [history, setHistory] = useState<Message[]>([
    { role: "model", text: "Hello! I'm Sankhanil's AI assistant. Ask me anything about his skills, academic journey, services, or how to connect with him." }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowUnread(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    const newHistory: Message[] = [...history, { role: "user", text: userMessage }];
    setHistory(newHistory);
    setIsLoading(true);

    try {
      const apiHistory = newHistory.slice(-10).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: apiHistory
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "API Error");

      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that.";
      setHistory([...newHistory, { role: "model", text: botReply }]);
    } catch (err) {
      console.error(err);
      setHistory([...newHistory, { role: "model", text: "I'm having a moment — please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[36px] right-[36px] z-[5000] flex flex-col items-end pointer-events-none">
      
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="pointer-events-auto absolute bottom-[76px] right-0 w-[380px] h-[540px] bg-[rgba(248,245,236,0.95)] backdrop-blur-[24px] border border-[rgba(197,223,160,0.4)] rounded-[12px_12px_4px_4px] shadow-[0_32px_80px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-[64px] bg-forest flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-[6px] h-[6px]">
                  <div className="absolute w-full h-full bg-sage rounded-full" />
                  <div className="absolute w-full h-full bg-sage rounded-full animate-[pulse-ring_2s_infinite]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-syne text-[11px] text-cream tracking-[0.1em]">AI ASSISTANT</span>
                  <span className="font-syne text-[9px] text-sage">Ask about Sankhanil</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="interactive text-cream font-syne text-[18px] hover:text-sage">×</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-[20px_16px] flex flex-col gap-4 scrollbar-hide">
              {history.map((msg, i) => (
                <div key={i} className={cn("flex flex-col w-full", msg.role === "user" ? "items-end" : "items-start")}>
                  {msg.role === "model" && i === 0 && (
                    <span className="font-syne text-[9px] text-forest tracking-[0.1em] mb-1">SANKHANIL'S AI</span>
                  )}
                  <div className={cn(
                    "max-w-[80%] p-[12px_16px]",
                    msg.role === "user" 
                      ? "bg-forest text-cream border border-forest rounded-[12px_2px_12px_12px]" 
                      : "bg-[rgba(197,223,160,0.2)] text-trueblack border border-[rgba(197,223,160,0.35)] rounded-[2px_12px_12px_12px]"
                  )}>
                    <p className="font-sans text-[14px] whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex flex-col items-start w-full">
                  <div className="max-w-[80%] p-[12px_16px] bg-[rgba(197,223,160,0.2)] border border-[rgba(197,223,160,0.35)] rounded-[2px_12px_12px_12px] flex items-center gap-1.5 h-[45px]">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0 }} className="w-[6px] h-[6px] bg-sage rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }} className="w-[6px] h-[6px] bg-sage rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.6 }} className="w-[6px] h-[6px] bg-sage rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Row */}
            <form onSubmit={handleSend} className="h-[56px] border-t border-[rgba(197,223,160,0.3)] flex items-center px-4 shrink-0">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none outline-none font-sans text-[14px] text-trueblack placeholder:text-mutedblack/50"
              />
              <button type="submit" disabled={!input.trim() || isLoading} className="interactive w-[32px] h-[32px] flex items-center justify-center text-sage disabled:opacity-50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <div className="relative group pointer-events-auto">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-syne text-[8px] tracking-[0.15em] text-sage whitespace-nowrap">AI CHAT</span>
        </div>
        
        <button 
          onClick={() => { setIsOpen(!isOpen); setShowUnread(false); }}
          className="interactive w-[60px] h-[60px] rounded-full bg-forest flex items-center justify-center transition-transform duration-300 hover:scale-108 relative z-10"
          style={{ animation: "pulse-glow 2s infinite" }}
        >
          {isOpen ? (
            <span className="text-cream font-syne text-[24px]">×</span>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F8F5EC" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
        
        {/* Unread indicator */}
        <AnimatePresence>
          {showUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 w-[8px] h-[8px] bg-[#C4694A] rounded-full z-20"
            />
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}
