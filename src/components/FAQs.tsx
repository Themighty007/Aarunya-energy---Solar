/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FAQS } from "../data";

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>("faq1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-24 md:py-32 bg-[#0a0e1a] relative z-20">
      
      {/* Grid overlay */}
      <div className="absolute inset-x-0 bottom-0 h-96 grid-dots opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#d4a843]/20 rounded-full mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">Support Intelligence</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Common Questions
          </h2>
          <p className="font-sans text-[#a0aec0] text-sm md:text-base font-light leading-relaxed">
            Detailed, objective answers addressing high-tensile structural mappings, electrical grid coupling constraints, and financing variables.
          </p>
        </div>

        {/* ACCORDION WRAPPER */}
        <div className="space-y-4">
          {FAQS.map((item) => {
            const isOpen = item.id === openId;
            return (
              <div
                key={item.id}
                className={`bg-[#1a2332]/30 border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-[#d4a843]/40 shadow-lg shadow-[#d4a843]/5" : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center gap-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-semibold text-white text-sm sm:text-base tracking-wide hover:text-[#d4a843] transition-colors">
                    {item.question}
                  </span>
                  
                  {/* Plus/Minus Rotating Indicator */}
                  <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#d4a843] transition-transform duration-300 transform shrink-0">
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </span>
                </button>

                {/* Accordion Panel Content */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="font-sans text-[#a0aec0] text-xs sm:text-sm leading-relaxed p-6 font-light bg-[#0a0e1a]/25">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
