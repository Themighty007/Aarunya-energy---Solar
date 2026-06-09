/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { CalculatorState, CalculatorResult } from "../types";

export default function SavingsCalculator() {
  const [inputs, setInputs] = useState<CalculatorState>({
    monthlyBill: 220,
    homeSize: "medium",
    sunExposure: "full",
    zipCode: "78701",
  });

  const [zipError, setZipError] = useState("");

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 5);
    setInputs((prev) => ({ ...prev, zipCode: value }));
    if (value.length > 0 && value.length < 5) {
      setZipError("Please enter a valid 5-digit ZIP code.");
    } else {
      setZipError("");
    }
  };

  // Memoize calculations for instant response and efficiency
  const results = useMemo<CalculatorResult>(() => {
    const { monthlyBill, homeSize, sunExposure } = inputs;

    // Multipliers
    let exposureMult = 1.0;
    if (sunExposure === "full") exposureMult = 1.25;
    if (sunExposure === "shaded") exposureMult = 0.72;

    let sizeFactor = 1.0;
    if (homeSize === "small") sizeFactor = 0.9;
    if (homeSize === "large") sizeFactor = 1.1;
    if (homeSize === "estate") sizeFactor = 1.25;

    // Calculations
    const annualBill = monthlyBill * 12;
    // Premium AURA panels capture ~84% of baseline bills
    const annualSavings = Math.round(annualBill * 0.84 * exposureMult * sizeFactor);
    
    // Required KW is sized to supply the requested output
    const rawSize = (monthlyBill / 20) * (1 / (exposureMult || 1)) * sizeFactor;
    const systemSize = parseFloat(Math.max(4.0, Math.min(22.0, rawSize)).toFixed(1));

    // Payback scales inversely with monthly costs (higher baseline bill = faster payback)
    const rawPayback = 8.5 - (monthlyBill / 80) * exposureMult * (1 / sizeFactor);
    const paybackPeriod = parseFloat(Math.max(4.2, Math.min(9.5, rawPayback)).toFixed(1));

    // Cumulative savings over panel lifetime
    const savings25Years = annualSavings * 25;

    return {
      annualSavings,
      systemSize,
      paybackPeriod,
      savings25Years,
    };
  }, [inputs]);

  const handleScrollToQuote = () => {
    // Fill slider or select options automatically if they correspond or scroll down
    const quoteSection = document.getElementById("quote");
    if (quoteSection) {
      // Find quote select list representing electric bill and set it
      const selectElement = document.getElementById("quote-monthly-bill") as HTMLSelectElement;
      if (selectElement) {
        let dropdownVal = "<$100";
        if (inputs.monthlyBill >= 100 && inputs.monthlyBill < 200) dropdownVal = "100-200";
        if (inputs.monthlyBill >= 200 && inputs.monthlyBill < 300) dropdownVal = "200-300";
        if (inputs.monthlyBill >= 300 && inputs.monthlyBill < 400) dropdownVal = "300-400";
        if (inputs.monthlyBill >= 400) dropdownVal = "400+";
        selectElement.value = dropdownVal;
        
        // Trigger generic change event to sync parents if any
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      }

      // Smooth Scroll
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = quoteSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="savings-calculator" className="py-24 md:py-32 bg-[#0a0e1a] relative z-20 overflow-hidden">
      
      {/* Grid Background */}
      <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />

      {/* Decorative Blur */}
      <div className="absolute left-[10%] top-[30%] w-[35vw] h-[35vw] bg-[#d4a843]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#d4a843]/20 rounded-full mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">Conversion Science</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Calculate Your Solar Savings
          </h2>
          <p className="font-sans text-[#a0aec0] text-base md:text-lg font-light leading-relaxed">
            Enter your monthly usage metrics to evaluate estimated payback constraints, panel system ratings, and carbon reduction dividends.
          </p>
        </div>

        {/* INPUT/OUTPUT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* INPUT FORM - LEFT */}
          <div className="lg:col-span-5 bg-[#1a2332]/40 border border-white/5 p-8 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-8">
                Usage Parameters
              </h3>

              {/* Slider Input */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-sans text-xs uppercase tracking-wider text-white/70 font-semibold">
                    Current Monthly Bill
                  </label>
                  <span className="font-mono text-lg font-bold text-[#d4a843] bg-[#d4a843]/10 px-3.5 py-1 rounded">
                    ${inputs.monthlyBill}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={inputs.monthlyBill}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, monthlyBill: parseInt(e.target.value) }))
                  }
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4a843] focus:outline-none focus:ring-1 focus:ring-[#d4a843]"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40 mt-2">
                  <span>$50</span>
                  <span>$275</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Home Size Input */}
              <div className="mb-6">
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-3">
                  Interior Square Footage
                </label>
                <select
                  value={inputs.homeSize}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, homeSize: e.target.value as any }))
                  }
                  className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-colors font-sans text-sm"
                >
                  <option value="small">Small (~1,500 sq ft)</option>
                  <option value="medium">Medium (~2,500 sq ft)</option>
                  <option value="large">Large (~3,500 sq ft)</option>
                  <option value="estate">Estate (4,500+ sq ft)</option>
                </select>
              </div>

              {/* Sun Exposure Input */}
              <div className="mb-6">
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-3">
                  Solar Exposure Rating
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "full", label: "Full Sun", desc: "No shading" },
                    { val: "partial", label: "Partial", desc: "Light tree line" },
                    { val: "shaded", label: "Shaded", desc: "High canopy" },
                  ].map((x) => (
                    <button
                      key={x.val}
                      type="button"
                      onClick={() => setInputs((prev) => ({ ...prev, sunExposure: x.val as any }))}
                      className={`py-3 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                        inputs.sunExposure === x.val
                          ? "border-[#d4a843] bg-[#d4a843]/10 text-white"
                          : "border-white/5 bg-[#0a0e1a]/40 text-white/50 hover:border-white/20"
                      }`}
                    >
                      <span className="block font-sans text-xs font-semibold">{x.label}</span>
                      <span className="block font-mono text-[9px] text-[#a0aec0]/40 mt-1">{x.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ZIP Input */}
              <div className="mb-4">
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-3">
                  Local Grid Zip Code
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={inputs.zipCode}
                  onChange={handleZipChange}
                  placeholder="EX: 78701"
                  className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-colors font-sans text-sm"
                />
                {zipError && <p className="text-red-400 text-xs mt-2 font-light">{zipError}</p>}
              </div>
            </div>

            <p className="font-mono text-[9px] text-white/30 tracking-wide leading-relaxed mt-6">
              *Calculations are structural baselines governed by 2026 Solar Irradiance Models. Exact savings require on-site physical thermal engineering analysis.
            </p>
          </div>

          {/* OUTPUT RESULTS - RIGHT */}
          <div className="lg:col-span-7 bg-[#1a2332]/20 border border-white/5 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-8">
                Estimated Net Dividends
              </h3>

              {/* Savings Big Count */}
              <div className="bg-[#0a0e1a]/50 border border-white/5 py-8 px-6 rounded-2xl text-center mb-8 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#d4a843] to-[#ffcc33]" />
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#a0aec0] mb-2 font-bold">
                  Estimated First-Year Direct Savings
                </span>
                <span className="block font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-[#ffcc33] text-glow select-none">
                  ${results.annualSavings.toLocaleString()}
                </span>
              </div>

              {/* Split grids */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* System size */}
                <div className="bg-[#1a2332]/40 border border-white/5 p-4 rounded-xl text-center">
                  <span className="block font-sans text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                    Optimal System
                  </span>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                    {results.systemSize} <span className="text-sm font-sans font-normal text-white/70">kW</span>
                  </span>
                </div>

                {/* Payback period */}
                <div className="bg-[#1a2332]/40 border border-white/5 p-4 rounded-xl text-center">
                  <span className="block font-sans text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                    Breakeven Line
                  </span>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-[#d4a843] mt-1">
                    {results.paybackPeriod} <span className="text-sm font-sans font-normal text-white/70">Years</span>
                  </span>
                </div>

                {/* 25Y Savings */}
                <div className="bg-[#1a2332]/40 border border-white/5 p-4 rounded-xl text-center">
                  <span className="block font-sans text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                    Lifetime Saved
                  </span>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                    ${results.savings25Years.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bullets highlighting guarantees & risk inversion */}
              <div className="space-y-3 pt-4 border-t border-white/5 mb-8">
                <div className="flex gap-3 text-xs text-white/70">
                  <svg className="w-4 h-4 text-[#d4a843] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Federal Clean Energy ITC:</strong> Qualifies for up to <strong>30% direct tax credits</strong> ($3,600+ instant rebate offset).</span>
                </div>
                <div className="flex gap-3 text-xs text-white/70">
                  <svg className="w-4 h-4 text-[#d4a843] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>Value Dividend:</strong> Increases certified property equity by an average of 4.1% without taxing liabilities.</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleScrollToQuote}
              className="w-full py-4 rounded-xl font-display font-semibold text-xs tracking-widest uppercase bg-[#d4a843] hover:bg-[#ffcc33] text-[#0a0e1a] shadow-lg shadow-[#d4a843]/10 hover:shadow-[#d4a843]/20 transition-all cursor-pointer"
            >
              Secure Comprehensive Proposal
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
