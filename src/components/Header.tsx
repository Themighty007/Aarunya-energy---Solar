/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of compressed header
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
    <nav
      id="top-nav"
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 ${
        isScrolled
          ? "py-3 bg-[#0a0e1a]/95 backdrop-blur-2xl shadow-xl border-b border-[#d4a843]/20"
          : "py-6 bg-[#0a0e1a]/60 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-10 h-10 flex items-center justify-center relative">
            <svg
              viewBox="0 0 100 100"
              className="w-8 h-8 text-[#d4a843] animate-rotate-sun stroke-[1.5]"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="50" cy="50" r="18" className="fill-[#0a0e1a]" />
              <line x1="50" y1="12" x2="50" y2="24" strokeLinecap="round" />
              <line x1="50" y1="76" x2="50" y2="88" strokeLinecap="round" />
              <line x1="12" y1="50" x2="24" y2="50" strokeLinecap="round" />
              <line x1="76" y1="50" x2="88" y2="50" strokeLinecap="round" />
              <line x1="23.2" y1="23.2" x2="31.7" y2="31.7" strokeLinecap="round" />
              <line x1="68.3" y1="68.3" x2="76.8" y2="76.8" strokeLinecap="round" />
              <line x1="76.8" y1="23.2" x2="68.3" y2="31.7" strokeLinecap="round" />
              <line x1="31.7" y1="68.3" x2="23.2" y2="76.8" strokeLinecap="round" />
            </svg>
            {/* Soft gold halo pulse behind logo */}
            <div className="absolute inset-0 bg-[#d4a843]/10 blur-md rounded-full -z-10 scale-90 group-hover:scale-125 transition-transform" />
          </div>
          <span className="font-display font-bold tracking-[0.18em] text-lg text-white group-hover:text-[#d4a843] transition-colors">
            AURA SOLAR
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "About", target: "why-aura" },
            { label: "Solar Panels", target: "product-showcase" },
            { label: "Calculator", target: "savings-calculator" },
            { label: "Pricing", target: "order-tier-list" },
            { label: "FAQ", target: "faqs" },
            { label: "Contact", target: "quote" },
          ].map((link) => (
            <button
              key={link.target}
              onClick={() => handleScrollTo(link.target)}
              className="text-white/60 hover:text-[#d4a843] font-sans font-medium text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* GET STARTED CTA */}
        <div className="flex items-center">
          <button
            onClick={() => handleScrollTo("quote")}
            className="border border-[#d4a843] hover:bg-[#d4a843] text-[#d4a843] hover:text-[#0a0e1a] font-display font-semibold text-xs tracking-widest uppercase px-6 py-2.5 rounded-sm transition-all duration-300 shadow-md shadow-[#d4a843]/5 hover:shadow-[#d4a843]/20 cursor-pointer"
          >
            GET STARTED
          </button>
        </div>
      </div>
    </nav>
  );
}
