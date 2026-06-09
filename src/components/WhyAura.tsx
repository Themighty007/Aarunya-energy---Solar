/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { STEP_PROCESSES } from "../data";

export default function WhyAura() {
  return (
    <section id="why-aura" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a0e1a] to-[#1a2332] z-20">
      
      {/* Decorative Grid Spot */}
      <div className="absolute inset-0 grid-dots opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#d4a843]/20 rounded-full mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">How It Operates</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Three Steps to Energy Freedom
          </h2>
          <p className="font-sans text-[#a0aec0] text-base md:text-lg font-light leading-relaxed">
            Transitioning off the public coal-fired power grid shouldn't feel complex. We engineered a highly systematized structural and electrical onboarding flow.
          </p>
        </div>

        {/* 3-STEP GRID ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STEP_PROCESSES.map((item, index) => (
            <div
              key={item.step}
              className="relative p-8 md:p-10 bg-[#1a2332]/45 border border-white/5 rounded-2xl glow-on-hover hover:-translate-y-2 transition-all duration-300 backdrop-blur-md flex flex-col group"
            >
              {/* Step number backdrop */}
              <div className="font-serif text-7xl font-bold text-[#d4a843]/10 absolute top-6 right-6 select-none group-hover:text-[#d4a843]/20 group-hover:scale-110 transition-all duration-300">
                {item.step}
              </div>

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-[#0a0e1a] border border-white/5 flex items-center justify-center text-[#d4a843] mb-8 relative shadow-lg">
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d4a843]/40 rounded-full cursor-default" />
                
                {item.iconName === "chat" && (
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                )}

                {item.iconName === "draft" && (
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2H3m2 0h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
                  </svg>
                )}

                {item.iconName === "wrench" && (
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>

              {/* Title & Copy */}
              <h3 className="font-display font-semibold text-lg text-white mb-4 group-hover:text-[#d4a843] transition-colors">
                {item.title}
              </h3>
              <p className="font-sans text-white/60 text-sm leading-relaxed font-light">
                {item.description}
              </p>
              
              {/* Progress Connector (Visible on wide screens between items) */}
              {index < 2 && (
                <div className="hidden md:block absolute top-[55px] right-[-50px] w-[50px] h-[1px] border-t border-[dashed] border-[#d4a843]/15 z-10 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
