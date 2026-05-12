"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function InputField({ 
  label, 
  type = "text", 
  isTextarea = false, 
  value, 
  onChange, 
  error, 
  onBlur, 
  maxLength 
}: any) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const inputClasses = cn(
    "w-full bg-transparent border-b outline-none font-sans text-[16px] pb-3 pt-4 transition-all duration-300",
    error ? "border-[#C4694A] animate-shake text-[#C4694A]" : (focused ? "border-forest text-trueblack shadow-[0_2px_8px_rgba(197,223,160,0.4)]" : "border-sage/50 text-trueblack hover:border-sage")
  );

  return (
    <div className="relative w-full mb-10 flex flex-col">
      <label className={cn(
        "absolute left-0 font-syne text-[10px] tracking-[0.15em] transition-all duration-300 pointer-events-none",
        active ? "-top-2 text-forest opacity-100" : "top-4 text-mutedblack opacity-70",
        error && "text-[#C4694A]"
      )}>
        {label}
      </label>
      
      {isTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          className={cn(inputClasses, "min-h-[120px] resize-none")}
          maxLength={maxLength}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur?.(e); }}
          className={inputClasses}
          maxLength={maxLength}
        />
      )}

      {isTextarea && maxLength && (
        <span className="absolute -bottom-6 right-0 font-syne text-[9px] text-mutedblack">
          {value.length} / {maxLength}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const [formFocused, setFormFocused] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [emailError, setEmailError] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const validateEmail = () => {
    if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      return false;
    }
    setEmailError(false);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail() || !name || !message) return;

    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name,
          email,
          subject: subject || `New message from ${name} via Portfolio`,
          message,
          from_name: "Sankhanil Portfolio",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setTimeout(() => {
          setStatus("idle");
          setName(""); setEmail(""); setSubject(""); setMessage("");
        }, 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="w-full bg-cream py-[140px] px-6 md:px-[48px] flex justify-center">
      <div className="w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-16 lg:gap-0">
        
        {/* Left Column */}
        <div className="flex flex-col items-start lg:pr-24 reveal">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-syne text-[10px] tracking-[0.3em] text-forest">GET IN TOUCH</span>
          </div>

          <h2 className="font-cormorant font-bold text-[48px] md:text-[64px] text-trueblack leading-[0.95] mb-8">
            Let's build<br />
            something<br />
            <span className="italic pr-4">precise.</span>
          </h2>

          <p className="font-sans font-light text-[16px] text-mutedblack leading-[1.8] max-w-[420px] mb-12">
            Whether you're looking for a sharp financial mind, a collaborative partner, or simply want to connect — reach out. Every number tells a story.
          </p>

          <div className="flex flex-col gap-5 mb-16">
            {[
              { label: "sankhanilchanda@gmail.com", href: "mailto:sankhanilchanda@gmail.com" },
              { label: "Instagram: cool__n__stuff", href: "https://www.instagram.com/cool__n__stuff?igsh=cWMwM3Y1djBkbTM5" },
              { label: "LinkedIn: Sankhanil Chanda", href: "https://www.linkedin.com/in/sankhanil-chanda-b4441b331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
            ].map((item, i) => (
              <a href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" key={i} className="group interactive flex items-center gap-4 relative overflow-hidden pr-4">
                <span className="w-[4px] h-[4px] rounded-full bg-sage shrink-0" />
                <span className="font-syne text-[11px] tracking-[0.1em] text-mutedblack relative pb-1">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sage -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </span>
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="https://www.instagram.com/cool__n__stuff?igsh=cWMwM3Y1djBkbTM5" target="_blank" rel="noopener noreferrer" className="interactive group px-5 py-3 border border-sage rounded-full flex items-center gap-3 transition-colors duration-300 hover:bg-sage">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forest">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="font-syne text-[11px] tracking-[0.1em] text-forest">INSTAGRAM</span>
            </a>
            <a href="https://www.linkedin.com/in/sankhanil-chanda-b4441b331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="interactive group px-5 py-3 border border-sage rounded-full flex items-center gap-3 transition-colors duration-300 hover:bg-sage">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-forest">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="font-syne text-[11px] tracking-[0.1em] text-forest">LINKEDIN</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-[1px] h-full bg-sage opacity-50 reveal" />

        {/* Right Column (Form) */}
        <div className="flex flex-col items-center lg:pl-24 w-full reveal">
          <form 
            onSubmit={handleSubmit}
            onFocusCapture={() => setFormFocused(true)} 
            onBlurCapture={() => setFormFocused(false)}
            className={cn(
              "w-full max-w-[480px] bg-[#EEEAE0] rounded-[4px] p-[48px_32px] md:p-[48px_40px] transition-all duration-400 ease-out",
              formFocused 
                ? "shadow-[inset_6px_6px_16px_rgba(0,0,0,0.08),inset_-4px_-4px_12px_rgba(255,255,255,0.9)]" 
                : "shadow-[inset_4px_4px_12px_rgba(0,0,0,0.06),inset_-3px_-3px_10px_rgba(255,255,255,0.8)]"
            )}
          >
            <InputField label="YOUR NAME" value={name} onChange={(e: any) => setName(e.target.value)} />
            <InputField label="YOUR EMAIL" type="email" value={email} onChange={(e: any) => { setEmail(e.target.value); setEmailError(false); }} onBlur={validateEmail} error={emailError} />
            <InputField label="SUBJECT MATTER" value={subject} onChange={(e: any) => setSubject(e.target.value)} />
            <InputField label="YOUR MESSAGE" isTextarea value={message} onChange={(e: any) => setMessage(e.target.value)} maxLength={500} />

            <button 
              type="submit"
              disabled={status !== "idle"}
              className={cn(
                "interactive w-full h-[52px] mt-4 rounded-[2px] flex items-center justify-center transition-all duration-300 group",
                status === "error" ? "bg-[#C4694A]" : "bg-forest hover:bg-sage hover:-translate-y-[2px]"
              )}
            >
              {status === "idle" && (
                <span className="font-syne text-[11px] tracking-[0.2em] text-cream group-hover:text-forest transition-colors">
                  SEND MESSAGE
                </span>
              )}
              {status === "loading" && (
                <div className="w-[18px] h-[18px] border-[2px] border-cream/30 border-t-cream rounded-full animate-spin" />
              )}
              {status === "sent" && (
                <span className="font-syne text-[11px] tracking-[0.2em] text-cream flex items-center gap-2">
                  MESSAGE SENT
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
              {status === "error" && (
                <span className="font-syne text-[11px] tracking-[0.2em] text-cream flex items-center gap-2">
                  FAILED — TRY AGAIN
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
