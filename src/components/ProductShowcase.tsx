/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function ProductShowcase() {
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
    <section id="product-showcase" className="py-24 md:py-32 bg-[#1a2332] relative z-20">
      
      {/* Decors */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#d4a843]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#d4a843]/20 rounded-full mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">Advanced Systems</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Complete Energy Solutions
          </h2>
          <p className="font-sans text-[#a0aec0] text-base md:text-lg font-light leading-relaxed">
            A unified suite of high-efficiency silicon capturing grids, solid-state modular energy cell storage, and predictive AI telemetry.
          </p>
        </div>

        {/* BENTO PRODUCT SHOWCASE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CARD A — "Client Stories" (Lg: col-span-4) */}
          <div className="lg:col-span-4 flex flex-col tilt-card group cursor-pointer" onClick={() => handleScrollTo("testimonials")}>
            <div className="tilt-card-inner h-full bg-[#0a0e1a]/65 border border-white/5 rounded-2xl flex flex-col justify-between overflow-hidden p-6 sm:p-8 relative glow-on-hover min-h-[440px]">
              
              {/* Image Underlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 -z-10"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/80 to-transparent -z-10" />

              {/* Top Badge bar */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#d4a843]/15 border border-[#d4a843]/30 text-[#d4a843] text-[9px] font-mono uppercase tracking-[0.15em] rounded-full">
                  Verified Proof
                </span>
                <span className="font-display font-bold text-xs text-[#f5e6c8] flex items-center gap-1 bg-black/45 py-1 px-2.5 rounded-full backdrop-blur-md">
                  4.9 / 5 RATING
                </span>
              </div>

              {/* Content & CTA */}
              <div className="mt-auto">
                <h3 className="font-serif text-3xl font-bold text-white mb-3">
                  Explorer Cases
                </h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed mb-6 font-light">
                  Read inspiring structural transformations and real electric grid billing reports from families who claimed total power freedom.
                </p>
                <span className="font-display font-semibold text-xs tracking-widest text-[#d4a843] group-hover:text-[#ffcc33] uppercase inline-flex items-center gap-1.5 transition-colors">
                  SEE ALL
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* CARD B — "Edge Battery" (Lg: col-span-4) */}
          <div className="lg:col-span-4 flex flex-col tilt-card group cursor-pointer" onClick={() => handleScrollTo("order-tier-list")}>
            <div className="tilt-card-inner h-full bg-[#0a0e1a]/85 border border-[#d4a843]/15 rounded-2xl flex flex-col justify-between overflow-hidden p-6 sm:p-8 relative glow-on-hover min-h-[440px]">
              
              {/* Product render underlay (Abstract dark power layers) */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700 -z-10 bg-blend-luminosity"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              {/* Deep inner glow gradient */}
              <div className="absolute inset-0 bg-radial-gradient(circle at bottom, rgba(212,168,67,0.06) 0%, transparent 60%) -z-10" />

              {/* Header Badge */}
              <div className="flex items-start">
                <span className="px-3 py-1 bg-white/[0.03] border border-white/10 text-white/70 text-[9px] font-mono uppercase tracking-[0.15em] rounded-full">
                  10-Year Warranty
                </span>
              </div>

              {/* Content & CTA */}
              <div className="mt-auto">
                <div className="w-12 h-1 bg-[#d4a843] mb-4" />
                <h3 className="font-serif text-3xl font-bold text-white mb-3">
                  Edge Battery
                </h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed mb-6 font-light">
                  Absolute residential grid-resilience. A solid-state modular framework configured to charge off low rates and bridge drops instantly.
                </p>
                <span className="font-display font-semibold text-xs tracking-widest text-[#d4a843] group-hover:text-[#ffcc33] uppercase inline-flex items-center gap-1.5 transition-colors">
                  EXPLORE SPECS
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* CARD C — "Intelligent System" (Lg: col-span-4) */}
          <div className="lg:col-span-4 flex flex-col tilt-card group cursor-pointer" onClick={() => handleScrollTo("savings-calculator")}>
            <div className="tilt-card-inner h-full bg-[#1a2332]/75 border border-white/5 rounded-2xl flex flex-col justify-between overflow-hidden p-6 sm:p-8 relative glow-on-hover min-h-[440px]">
              
              {/* Underlay app graphics */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:scale-105 group-hover:opacity-25 transition-all duration-700 -z-10"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80')`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/95 to-transparent -z-10" />

              {/* Top Row Badges */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white/[0.03] border border-white/10 text-white/70 text-[9px] font-mono uppercase tracking-[0.15em] rounded-full">
                  Telemetry Core
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#ffcc33] bg-[#d4a843]/10 border border-[#d4a843]/20 py-0.5 px-2.5 rounded">
                  IP68 CLASS
                </span>
              </div>

              {/* Content & CTA */}
              <div className="mt-auto">
                <h3 className="font-serif text-3xl font-bold text-white mb-3">
                  Intelligent App
                </h3>
                <p className="font-sans text-white/70 text-sm leading-relaxed mb-6 font-light">
                  Adaptive heat-mapping algorithms, predictive local weather tracking, and detailed carbon offset reports rendered cleanly on your devices.
                </p>
                <span className="font-display font-semibold text-xs tracking-widest text-[#d4a843] group-hover:text-[#ffcc33] uppercase inline-flex items-center gap-1.5 transition-colors">
                  OPTIMIZE NOW
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
