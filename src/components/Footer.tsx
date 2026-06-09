/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export default function Footer() {
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
    <footer className="bg-[#0a0e1a] border-t border-[#d4a843]/15 text-white/50 relative z-20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* FOUR COLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-16 pb-16 md:pb-20 border-b border-white/5">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <svg
                viewBox="0 0 100 100"
                className="w-7 h-7 text-[#d4a843] stroke-[1.5] animate-rotate-sun"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="50" cy="50" r="18" className="fill-[#0a0e1a]" />
                <line x1="50" y1="12" x2="50" y2="24" strokeLinecap="round" />
                <line x1="50" y1="76" x2="50" y2="88" strokeLinecap="round" />
                <line x1="12" y1="50" x2="24" y2="50" strokeLinecap="round" />
                <line x1="76" y1="50" x2="88" y2="50" strokeLinecap="round" />
              </svg>
              <span className="font-display font-bold tracking-[0.16em] text-white text-md group-hover:text-[#d4a843] transition-colors">
                AURA SOLAR
              </span>
            </div>

            <p className="font-sans text-xs text-[#a0aec0]/70 leading-relaxed max-w-sm font-light">
              Designing, planning, and structural integration of intelligent building-grade clean energy networks. Enabling complete self-sufficiency for estate residences.
            </p>

            {/* Socials bar */}
            <div className="flex gap-4">
              {["Facebook", "Instagram", "LinkedIn", "XTwitter"].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-[#d4a843] text-white/40 hover:text-[#d4a843] flex items-center justify-center transition-all bg-white/[0.01]"
                  aria-label={`Visit our ${soc} page`}
                >
                  {soc === "Facebook" && (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  )}
                  {soc === "Instagram" && (
                    <svg className="w-4.5 h-4.5 stroke-[2] fill-none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {soc === "LinkedIn" && (
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {soc === "XTwitter" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>

          </div>

          {/* Services Col */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <h5 className="font-display text-white text-xs font-semibold uppercase tracking-wider">
              Integrated Services
            </h5>
            <ul className="space-y-3 font-sans text-xs">
              <li>
                <button onClick={() => handleScrollTo("product-showcase")} className="hover:text-[#d4a843] transition-colors cursor-pointer text-left">
                  Sleek Nova Solar Arrays
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("product-showcase")} className="hover:text-[#d4a843] transition-colors cursor-pointer text-left">
                  Smart Edge Battery banks
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("order-tier-list")} className="hover:text-[#d4a843] transition-colors cursor-pointer text-left">
                  Ultra EV Charging Stations
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("savings-calculator")} className="hover:text-[#d4a843] transition-colors cursor-pointer text-left">
                  Intelligent Telemetry App
                </button>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <h5 className="font-display text-white text-xs font-semibold uppercase tracking-wider">
              Our Company
            </h5>
            <ul className="space-y-3 font-sans text-xs">
              <li>
                <button onClick={() => handleScrollTo("why-aura")} className="hover:text-[#d4a843] transition-colors cursor-pointer">
                  About Aura Solar
                </button>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#d4a843] transition-colors">
                  Join structural Careers
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#d4a843] transition-colors">
                  Press Releases
                </a>
              </li>
              <li>
                <button onClick={() => handleScrollTo("quote")} className="hover:text-[#d4a843] transition-colors cursor-pointer">
                  Request Consultation Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <h5 className="font-display text-white text-xs font-semibold uppercase tracking-wider">
              Legal Framework
            </h5>
            <ul className="space-y-3 font-sans text-xs">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#d4a843] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#d4a843] transition-colors">
                  General Terms of Sale
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#d4a843] transition-colors">
                  25-Year Direct Warranty
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYS */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 text-xs font-mono select-none">
          <p>© 2026 Aura Solar, Corp. All rights reserved.</p>
          <p className="text-white/20 hover:text-[#d4a843] transition-colors">Designed for the future of clean energy.</p>
        </div>

      </div>
    </footer>
  );
}
