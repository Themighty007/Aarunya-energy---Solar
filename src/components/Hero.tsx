/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";
import { Particle } from "../types";

export default function Hero() {
  // Generate stable particles for background energy flow
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 45 }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = `${(Math.random() * 10).toFixed(2)}s`;
      const duration = `${(12 + Math.random() * 18).toFixed(2)}s`;
      const size = Math.round(1 + Math.random() * 4);
      const opacity = parseFloat((0.15 + Math.random() * 0.45).toFixed(2));
      const drift = `${Math.round(-40 + Math.random() * 80)}px`;
      return { id: i, left, delay, duration, size, opacity, drift };
    });
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] overflow-hidden flex flex-col justify-center pt-24 pb-16 md:py-0">
      
      {/* ATMOSPHERIC BACKGROUND IMAGE */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40 -z-50 scale-105 transform transition-transform duration-10000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      {/* Gradients blending sky from dark navy of solar-dark at top to warm amber/gold horizon glow at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/85 to-[#0a0e1a]/95 -z-45" />
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, #0a0e1a 90%) -z-40" />

      {/* Decorative Aura Spot - top right horizon glow */}
      <div className="absolute right-[-10%] top-[15%] w-[50vw] h-[50vw] bg-[#d4a843]/10 rounded-full blur-[140px] -z-30 pointer-events-none" />
      <div className="absolute left-[-15%] bottom-[10%] w-[40vw] h-[40vw] bg-[#ffcc33]/5 rounded-full blur-[120px] -z-30 pointer-events-none" />

      {/* GOLDEN STAR ENERGY PARTICLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-[#d4a843] animate-rise"
            style={{
              left: `${p.left}%`,
              bottom: "-40px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              "--op": p.opacity,
              "--dur": p.duration,
              "--delay": p.delay,
              "--drift": p.drift,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* DECORATIVE SVG WAVE/AURA SYMBOL (pulsing opacity) */}
      <div className="absolute top-32 right-12 md:right-32 w-24 h-24 stroke-[#d4a843]/35 fill-none animate-pulse-glow -z-10 hidden sm:block">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[1]">
          <path d="M 10 50 Q 25 30 40 50 T 70 50 T 100 50" strokeDasharray="3,3" />
          <path d="M 10 60 Q 25 40 40 60 T 70 60 T 100 60" />
          <path d="M 10 40 Q 25 20 40 40 T 70 40 T 100 40" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* MAIN CONTENT STALWART */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* HERO COPY - LEFT column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-12 lg:pt-0">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a843] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#f5e6c8]">
              The Next Generation of Autonomy
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-[0.95] text-white select-none mb-6">
            Revolutionize
            <span className="block mt-2 bg-gradient-to-r from-[#d4a843] via-[#f5e6c8] to-white bg-clip-text text-transparent filter drop-shadow-[0_4px_12px_rgba(212,168,67,0.15)] leading-[1.1]">
              Your Power
            </span>
          </h1>

          <p className="font-sans text-white/70 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10">
            Intelligent building-grade solar networks engineered for absolute thermal efficiency. Save up to 80% on energy bills while securing structural defense.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => handleScrollTo("quote")}
              className="px-10 py-5 rounded-full font-display font-semibold text-sm tracking-widest uppercase bg-gradient-to-r from-[#d4a843] via-[#ffcc33] to-[#d4a843] text-[#0a0e1a] shadow-[0_4px_30px_rgba(212,168,67,0.35)] hover:shadow-[0_4px_40px_rgba(212,168,67,0.6)] transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer"
            >
              Get Your Free Quote
            </button>
            <button
              onClick={() => handleScrollTo("product-showcase")}
              className="px-8 py-5 rounded-full font-display font-semibold text-sm tracking-widest uppercase border border-white/20 hover:border-[#d4a843] text-white hover:text-[#d4a843] bg-white/[0.02] hover:bg-[#d4a843]/5 backdrop-blur-sm transition-all duration-300 cursor-pointer"
            >
              Explore Solutions
            </button>
          </div>

          {/* Social Proof badge above the fold */}
          <div className="flex items-center gap-4 mt-12 bg-[#1a2332]/40 border border-white/5 py-3 px-5 rounded-xl backdrop-blur-md">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border border-[#0a0e1a]" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80" alt="User 1" />
              <img className="w-8 h-8 rounded-full border border-[#0a0e1a]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80" alt="User 2" />
              <img className="w-8 h-8 rounded-full border border-[#0a0e1a]" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80" alt="User 3" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#d4a843] fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="font-display font-bold text-xs text-[#f5e6c8] ml-1">4.9 / 5</span>
              </div>
              <p className="font-mono text-[9px] tracking-wider text-white/50 uppercase">Trusted by 40,000+ Estates</p>
            </div>
          </div>
        </div>

        {/* FLOATING GLASSMOPRH PRODUCT CARDS - RIGHT COLUMN */}
        <div className="lg:col-span-5 relative h-[520px] w-full flex items-center justify-center lg:block mt-8 lg:mt-0">
          
          {/* Central Anchor Glow representing the system connector */}
          <div className="absolute top-[45%] left-[50%] lg:left-[10%] w-32 h-32 bg-[#d4a843]/15 rounded-full blur-2xl -translate-x-[50%] -translate-y-[50%] -z-10 shadow-[0_0_60px_rgba(212,168,67,0.15)] ring-1 ring-[#d4a843]/20" />

          {/* SVG Animated Connection Line from Core to Smart Edge Battery Card */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 hidden lg:block" fill="none">
            <defs>
              <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4a843" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#ffcc33" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f5e6c8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Connection path: circles from core to Upper Right Card */}
            <path
              d="M 50 240 Q 200 150 280 130"
              stroke="url(#glow-grad)"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              className="animate-pulse"
              style={{ animation: "pulse 3s infinite" }}
            />
            {/* Glow runner traveling along the line */}
            <path
              d="M 50 240 Q 200 150 280 130"
              stroke="#ffcc33"
              strokeWidth="2"
              strokeDasharray="4 40"
              strokeDashoffset="0"
              style={{
                animation: "dash 4s linear infinite"
              }}
            />
          </svg>

          {/* Floating Card 1: Left Card "Nova Array" */}
          <div className="absolute top-10 left-4 sm:left-12 lg:left-[-110px] w-[260px] md:w-[280px] bg-[#1a2332]/50 border border-[#d4a843]/25 p-5 rounded-2xl backdrop-blur-xl shadow-2xl shadow-black/40 animate-float-up hover:scale-[1.02] hover:border-[#d4a843]/60 transition-all duration-300 group z-10">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a843]/40 to-transparent" />
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-mono text-[#d4a843] tracking-wider uppercase font-semibold">Nova Array</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-4">
              Sleek, high-efficiency panel integration with autonomous structural load balance and modular custom roof framing.
            </p>
            <button
              onClick={() => handleScrollTo("product-showcase")}
              className="font-display font-bold text-[10px] tracking-widest text-[#d4a843] group-hover:text-[#ffcc33] uppercase inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              VIEW DETAILS 
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Floating Card 2: Right Top Card "Smart Edge Battery" */}
          <div className="absolute top-2 left-[50%] lg:left-auto lg:right-[-40px] translate-x-[-15%] lg:translate-x-0 w-[260px] md:w-[280px] bg-[#1a2332]/50 border border-[#d4a843]/20 p-5 rounded-2xl backdrop-blur-xl shadow-2xl shadow-black/40 animate-float-down hover:scale-[1.02] hover:border-[#d4a843]/50 transition-all duration-300 z-10 z-20">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffcc33]/40 to-transparent" />
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">SMART EDGE BATTERY</span>
                <span className="block text-[11px] text-[#f5e6c8] font-light mt-1">Modular &amp; cloud-monitored grid</span>
              </div>
              <span className="font-serif text-3xl font-bold text-[#ffcc33] tracking-tight">16<span className="text-sm font-sans font-normal text-white">kWh</span></span>
            </div>
            <p className="text-white/50 text-[11px] leading-relaxed">
              15kWh nominal capacity architecture configurable to parallel outputs for high-draw resilience.
            </p>
          </div>

          {/* Floating Card 3: Right Bottom Card "Never Lose Power" */}
          <div className="absolute bottom-16 right-4 sm:right-12 lg:right-[-60px] w-[260px] md:w-[280px] bg-[#1a2332]/65 border border-[#d4a843]/15 p-5 rounded-2xl backdrop-blur-xl shadow-2xl shadow-black/40 animate-float-delayed hover:scale-[1.02] hover:border-[#d4a843]/40 transition-all duration-300 z-10">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5e6c8]/30 to-transparent" />
            <div className="flex items-center gap-2 mb-2 text-xs">
              <svg className="w-4 h-4 text-[#ffcc33] stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="font-sans font-bold text-white text-xs">Never Lose Power</h4>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed mb-3">
              Automated backing microgrids decouple your estate in 8ms for peak electric load resilience.
            </p>
            <div className="font-mono text-[10px] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4a843] to-[#f5e6c8] tracking-widest">
              Total Coverage Guarantee
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
