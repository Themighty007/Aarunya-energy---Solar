/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { TRUST_METRICS } from "../data";

export default function TrustBar() {
  const [counts, setCounts] = useState({
    installations: 0,
    warranty: 0,
    satisfaction: 0,
    savings: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animationStarted.current) {
          animationStarted.current = true;
          animateNumbers();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const animateNumbers = () => {
    const duration = 1500; // ms
    const startTime = performance.now();

    const updateValues = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out quadratic
      const easeProgress = progress * (2 - progress);

      setCounts({
        installations: Math.floor(easeProgress * 40000),
        warranty: Math.floor(easeProgress * 25),
        satisfaction: parseFloat((easeProgress * 98.7).toFixed(1)),
        savings: parseFloat((easeProgress * 2.4).toFixed(1)),
      });

      if (progress < 1) {
        requestAnimationFrame(updateValues);
      } else {
        // Guarantee precision final values
        setCounts({
          installations: 40000,
          warranty: 25,
          satisfaction: 98.7,
          savings: 2.4,
        });
      }
    };

    requestAnimationFrame(updateValues);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#0a0e1a] border-y border-white/5 relative z-20 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center divide-y lg:divide-y-0 lg:divide-x divide-white/5 md:divide-[#d4a843]/15">
          {/* INSTALS */}
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-0">
            <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4a843]">
              {counts.installations.toLocaleString()}+
            </span>
            <span className="font-sans text-xs md:text-xs text-[#a0aec0] uppercase tracking-widest mt-3 font-semibold">
              Installations Completed
            </span>
          </div>

          {/* WARRANTY */}
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-0 pt-8 lg:pt-0">
            <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4a843]">
              {counts.warranty} Years
            </span>
            <span className="font-sans text-xs md:text-xs text-[#a0aec0] uppercase tracking-widest mt-3 font-semibold">
              Panel Tech Performance Guarantee
            </span>
          </div>

          {/* SATISFACTION */}
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-0 pt-8 lg:pt-0 pb-3 sm:pb-0">
            <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4a843]">
              {counts.satisfaction}%
            </span>
            <span className="font-sans text-xs md:text-xs text-[#a0aec0] uppercase tracking-widest mt-3 font-semibold">
              Client Satisfaction Rating
            </span>
          </div>

          {/* SAVINGS */}
          <div className="flex flex-col items-center justify-center text-center p-3 sm:p-0 pt-8 lg:pt-0">
            <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4a843]">
              ${counts.savings}M
            </span>
            <span className="font-sans text-xs md:text-xs text-[#a0aec0] uppercase tracking-widest mt-3 font-semibold">
              Client Utilities Savings
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
