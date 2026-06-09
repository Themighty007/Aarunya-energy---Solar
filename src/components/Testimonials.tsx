/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000); // 6s rotation
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleNext = () => {
    stopAutoSlide();
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    startAutoSlide();
  };

  const handlePrev = () => {
    stopAutoSlide();
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    startAutoSlide();
  };

  const handleDotSelect = (idx: number) => {
    stopAutoSlide();
    setActiveIdx(idx);
    startAutoSlide();
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#1a2332] relative z-20">
      
      {/* Decors */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#d4a843]/20 rounded-full mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">Social Consensus</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Powered by Trust
          </h2>
          <p className="font-sans text-[#a0aec0] text-base md:text-lg font-light leading-relaxed">
            Real stories, architectural reviews, and physical load telemetry validated directly by our grid clients across the continent.
          </p>
        </div>

        {/* CAROUSEL SLIDER WRAPPER */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          {/* TESTIMONIAL CARD SELECTION */}
          <div className="relative min-h-[380px] sm:min-h-[300px] flex items-center justify-center">
            {TESTIMONIALS.map((t, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={t.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-between p-8 md:p-10 bg-[#0a0e1a]/60 border border-white/5 rounded-2xl backdrop-blur-md ${
                    isActive ? "opacity-100 pointer-events-auto z-10 scale-100" : "opacity-0 pointer-events-none z-0 scale-95"
                  }`}
                >
                  {/* Star row */}
                  <div className="flex items-center gap-1 mb-6 text-[#d4a843]">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="font-mono text-[10px] uppercase font-bold text-[#d4a843] ml-3 bg-[#d4a843]/10 py-0.5 px-2.5 rounded-full">
                      Verified Installation
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-white/90 italic leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Profile section split row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-white/5 pt-6 gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        className="w-12 h-12 rounded-full border border-[#d4a843]/30 object-cover"
                        src={t.avatarUrl}
                        alt={t.author}
                      />
                      <div>
                        <cite className="not-italic font-display font-bold text-sm text-white block">
                          {t.author}
                        </cite>
                        <span className="font-sans text-xs text-[#a0aec0] font-light">
                          {t.location}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2 font-mono text-[10px] text-[#f5e6c8] tracking-widest uppercase">
                      SYSTEM: {t.systemDetails}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTROLLER SIDE BUTTONS - Absolute Floating */}
          <button
            onClick={handlePrev}
            aria-label="Previous story"
            className="absolute left-[-20px] md:left-[-40px] top-[50%] -translate-y-[50%] w-10 h-10 rounded-full border border-white/10 hover:border-[#d4a843] text-white hover:text-[#d4a843] bg-[#0a0e1a]/85 hover:bg-[#d4a843]/10 flex items-center justify-center transition-all z-20 shadow-md cursor-pointer hidden sm:flex"
          >
            <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next story"
            className="absolute right-[-20px] md:right-[-40px] top-[50%] -translate-y-[50%] w-10 h-10 rounded-full border border-white/10 hover:border-[#d4a843] text-white hover:text-[#d4a843] bg-[#0a0e1a]/85 hover:bg-[#d4a843]/10 flex items-center justify-center transition-all z-20 shadow-md cursor-pointer hidden sm:flex"
          >
            <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* BOTTOM DOT NAVIGATOR */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotSelect(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeIdx
                    ? "bg-[#d4a843] scale-125 shadow-[0_0_10px_rgba(212,168,67,1)]"
                    : "bg-white/10 hover:bg-white/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
