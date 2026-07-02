/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";

// Tamil Nadu District average Peak Sun Hours (PSH) data
const DISTRICT_PSH: Record<string, number> = {
  'Ariyalur': 5.40, 'Chengalpattu': 5.25, 'Chennai': 5.30, 'Coimbatore': 5.20,
  'Cuddalore': 5.30, 'Dharmapuri': 5.50, 'Dindigul': 5.49, 'Erode': 5.63,
  'Kallakurichi': 5.35, 'Kanchipuram': 5.25, 'Kanyakumari': 5.20, 'Karur': 5.45,
  'Krishnagiri': 5.45, 'Madurai': 5.35, 'Mayiladuthurai': 5.35, 'Nagapattinam': 5.35,
  'Namakkal': 5.50, 'Nilgiris': 4.90, 'Perambalur': 5.40, 'Pudukkottai': 5.40,
  'Ramanathapuram': 5.40, 'Ranipet': 5.50, 'Salem': 5.40, 'Sivaganga': 5.40,
  'Tenkasi': 5.45, 'Thanjavur': 5.41, 'Theni': 5.45, 'Thoothukudi': 5.55,
  'Tiruchirappalli': 5.40, 'Tirunelveli': 5.51, 'Tirupattur': 5.50, 'Tiruppur': 5.30,
  'Tiruvallur': 5.25, 'Tiruvannamalai': 5.40, 'Tiruvarur': 5.35, 'Vellore': 5.58,
  'Viluppuram': 5.35, 'Virudhunagar': 5.45
};

const MONTHLY_PSH_FACTORS = [0.92, 0.98, 1.08, 1.12, 1.08, 0.94, 0.86, 0.89, 0.95, 0.85, 0.80, 0.85];

const TANGEDCO_DOMESTIC_SLABS = [
  { max: 100, rate: 0.00 },
  { max: 200, rate: 2.35 },
  { max: 400, rate: 4.70 },
  { max: 500, rate: 6.30 },
  { max: 600, rate: 8.40 },
  { max: 800, rate: 9.45 },
  { max: 1000, rate: 10.50 },
  { max: Infinity, rate: 11.55 }
];

export default function SavingsCalculator() {
  // Inputs State
  const [consumerType, setConsumerType] = useState<"domestic" | "commercial" | "industrial">("domestic");
  const [district, setDistrict] = useState("Chennai");
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const [panelType, setPanelType] = useState<"mono_perc" | "topcon" | "hjt">("topcon");
  const [shadowPercent, setShadowPercent] = useState(10);
  const [roofDirection, setRoofDirection] = useState("south");
  const [daytimePercent, setDaytimePercent] = useState(40);
  const [installationType, setInstallationType] = useState<"on_grid" | "hybrid">("on_grid");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Helper: format number as Indian Currency (₹)
  const formatINR = (amt: number) => {
    return "₹" + Math.round(amt).toLocaleString("en-IN");
  };

  // Helper: compact format (e.g. ₹9.5L, ₹1.2Cr)
  const formatINRCompact = (amt: number) => {
    if (amt >= 10000000) return "₹" + (amt / 10000000).toFixed(2) + " Cr";
    if (amt >= 100000) return "₹" + (amt / 100000).toFixed(1) + " L";
    return "₹" + Math.round(amt).toLocaleString("en-IN");
  };

  // Reverse engineer units from monthly bill based on TANGEDCO rates
  const calculateUnitsFromBill = (bill: number, category: string) => {
    if (bill <= 0) return 0;
    if (category === "commercial") {
      const assumedKVA = Math.max(2, Math.min(10, Math.floor(bill / 1500)));
      const fee = assumedKVA * 608.00;
      return Math.round(Math.max(0, bill - fee) / 9.40);
    }
    if (category === "industrial") {
      const assumedKVA = Math.max(10, Math.min(100, Math.floor(bill / 2000)));
      const fee = assumedKVA * 608.00;
      return Math.round(Math.max(0, bill - fee) / 7.50);
    }
    
    // Domestic bi-monthly logic
    const bimonthlyBill = bill * 2;
    let low = 0, high = 5000, units = 0;
    
    const checkDomesticBill = (u: number) => {
      if (u <= 0) return 0;
      const freeLimit = u <= 500 ? 200 : 100;
      let remaining = Math.max(0, u - freeLimit);
      let total = 0, prev = 0;
      for (const slab of TANGEDCO_DOMESTIC_SLABS) {
        const unitsInSlab = Math.min(remaining, slab.max - prev);
        if (unitsInSlab <= 0) break;
        total += unitsInSlab * slab.rate;
        remaining -= unitsInSlab;
        prev = slab.max;
        if (remaining <= 0) break;
      }
      const fixed = u <= 500 ? 50 : 150;
      return Math.round((total + fixed) * 1.05);
    };

    for (let i = 0; i < 20; i++) {
      const mid = (low + high) / 2;
      const cb = checkDomesticBill(mid);
      if (Math.abs(cb - bimonthlyBill) < 1) { units = mid; break; }
      if (cb > bimonthlyBill) high = mid; else low = mid;
    }
    return Math.round(units / 2);
  };

  // Perform Calculations
  const results = useMemo(() => {
    const monthlyUnits = calculateUnitsFromBill(monthlyBill, consumerType);

    // Sizing
    const psh = DISTRICT_PSH[district] || 5.30;
    const panelWattages = { mono_perc: 545, topcon: 580, hjt: 600 };
    const tempCoeffs = { mono_perc: -0.0037, topcon: -0.0029, hjt: -0.0025 };
    const dirMap: Record<string, number> = { south: 1.0, south_east: 0.95, south_west: 0.95, east: 0.87, west: 0.87, north: 0.70 };
    
    const directionFactor = dirMap[roofDirection] || 1.0;
    const shadowLoss = shadowPercent / 100;
    const pr = 0.96 * 0.98 * 0.96 * (1 + (tempCoeffs[panelType] * 20));
    
    const annualGenPerKW = psh * 365 * pr * (1 - shadowLoss) * directionFactor;
    let systemKW = annualGenPerKW > 0 ? (monthlyUnits * 12) / annualGenPerKW : 3.0;
    systemKW = Math.round(systemKW * 2) / 2;
    systemKW = Math.max(1.0, Math.min(100.0, systemKW));

    // Panel count
    const panelCount = Math.ceil((systemKW * 1000) / panelWattages[panelType]);

    // Costing
    let kwCost = 70000;
    if (systemKW <= 1) kwCost = 75000;
    else if (systemKW <= 2) kwCost = 73000;
    else if (systemKW <= 3) kwCost = 71000;

    let markup = panelType === "hjt" ? 1.15 : (panelType === "topcon" ? 1.05 : 1.0);
    const grossCost = systemKW * kwCost * markup;
    const batteryKWh = installationType === "hybrid" ? Math.ceil(systemKW * 2) : 0;
    const batteryCost = batteryKWh * 10000;
    const totalCost = grossCost + batteryCost;

    // Subsidy
    let subsidy = 0;
    if (consumerType === "domestic") {
      if (systemKW >= 1) subsidy += Math.min(systemKW, 2) * 30000;
      if (systemKW > 2) subsidy += Math.min(systemKW - 2, 1) * 18000;
      subsidy = Math.min(subsidy, 78000);
    }
    const netCost = totalCost - subsidy;

    // Monthly & Annual yields
    const monthlyGen = MONTHLY_PSH_FACTORS.map(f => {
      const annualBase = systemKW * psh * 365 * pr * (1 - shadowLoss) * directionFactor;
      return Math.round((annualBase * f) / MONTHLY_PSH_FACTORS.reduce((a, b) => a + b, 0));
    });
    const annualGen = monthlyGen.reduce((a, b) => a + b, 0);
    const avgMonthlyGen = annualGen / 12;

    // Savings
    let newBill = 0;
    if (consumerType === "commercial" || consumerType === "industrial") {
      const rate = consumerType === "commercial" ? 9.40 : 7.50;
      const fee = (consumerType === "commercial" ? 4 : 40) * 608.00;
      const netUnits = Math.max(0, Math.round((monthlyBill - fee) / rate) - avgMonthlyGen);
      newBill = Math.round((netUnits * rate) + fee);
    } else {
      const netBimonthly = Math.max(0, (monthlyUnits * 2) - (avgMonthlyGen * 2));
      
      const checkDomesticBill = (u: number) => {
        if (u <= 0) return 0;
        const freeLimit = u <= 500 ? 200 : 100;
        let remaining = Math.max(0, u - freeLimit);
        let total = 0, prev = 0;
        for (const slab of TANGEDCO_DOMESTIC_SLABS) {
          const unitsInSlab = Math.min(remaining, slab.max - prev);
          if (unitsInSlab <= 0) break;
          total += unitsInSlab * slab.rate;
          remaining -= unitsInSlab;
          prev = slab.max;
          if (remaining <= 0) break;
        }
        const fixed = u <= 500 ? 50 : 150;
        return Math.round((total + fixed) * 1.05);
      };

      newBill = Math.round(checkDomesticBill(netBimonthly) / 2);
    }
    const monthlySavings = Math.max(0, monthlyBill - newBill);
    const annualSavings = monthlySavings * 12;

    // Financial Analysis (25 years)
    let cum = -netCost, totalSav = 0, payback = 25, pbFound = false;
    const initialMaint = systemKW * 1000;
    const initialCost = systemKW * kwCost;
    for (let yr = 1; yr <= 25; yr++) {
      const genDeg = annualGen * (1 - (panelType === "hjt" ? 0.005 + 0.003 * (yr - 1) : 0.01 + 0.004 * (yr - 1)));
      const sav = annualSavings * Math.pow(1.05, yr - 1) * (genDeg / annualGen);
      let opex = initialMaint * Math.pow(1.03, yr - 1);
      if (yr === 13) opex += initialCost * 0.15;
      const netBenefit = sav - opex;
      cum += netBenefit;
      totalSav += sav;
      if (cum >= 0 && !pbFound) {
        payback = (yr - 1) + (Math.abs(cum - netBenefit) / netBenefit);
        pbFound = true;
      }
    }

    // Recommendations
    const recos = [];
    if (psh >= 5.5) {
      recos.push({ type: "success", text: `${district} is in a high solar irradiation zone (PSH: ${psh.toFixed(2)}). Generates outstanding yields.` });
    }
    if (panelType === "topcon") {
      recos.push({ type: "success", text: "TOPCon technology offers peak value and excellent thermal resilience in Tamil Nadu." });
    }
    if (shadowPercent >= 20) {
      recos.push({ type: "warning", text: `A ${shadowPercent}% roof shadow decreases panel performance. Prune trees if possible.` });
    }
    if (roofDirection === "north") {
      recos.push({ type: "warning", text: "North tilt drops outputs by 30%. Consider framing structures to tilt South." });
    }
    if (consumerType === "domestic" && systemKW <= 10) {
      recos.push({ type: "success", text: `Eligible for ₹${subsidy.toLocaleString("en-IN")} direct PM Surya Ghar subsidy.` });
    }

    return {
      systemKW,
      panelCount,
      totalCost,
      subsidy,
      netCost,
      annualGen,
      avgMonthlyGen,
      newBill,
      annualSavings,
      paybackPeriod: pbFound ? payback : 25,
      roi: netCost > 0 ? (totalSav / netCost) * 100 : 0,
      lifetimeSavings: totalSav,
      carbonOffset: annualGen * 25 * 0.82,
      monthlyGen,
      recos
    };
  }, [consumerType, district, monthlyBill, panelType, shadowPercent, roofDirection, daytimePercent, installationType]);

  const handleScrollToQuote = () => {
    const quoteSection = document.getElementById("quote");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="savings-calculator" className="py-24 md:py-32 bg-[#0a0e1a] relative z-20 overflow-hidden text-left">
      <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
      <div className="absolute left-[10%] top-[30%] w-[35vw] h-[35vw] bg-[#d4a843]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#d4a843]/20 rounded-full mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">◆ Precision Solar Engine</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
            Solar Savings Calculator
          </h2>
          <p className="font-sans text-[#a0aec0] text-base md:text-lg font-light leading-relaxed">
            Estimate government subsidies, yields, and long-term financial returns using accurate Tamil Nadu regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Inputs Panel - Left */}
          <div className="lg:col-span-5 bg-[#1a2332]/40 border border-white/5 p-8 rounded-2xl backdrop-blur-xl flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-lg text-white mb-2">Usage Parameters</h3>

              {/* Consumer Category */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">Consumer Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["domestic", "commercial", "industrial"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setConsumerType(t)}
                      className={`py-3 px-1 rounded-xl text-center border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        consumerType === t
                          ? "border-[#d4a843] bg-[#d4a843]/10 text-white"
                          : "border-white/5 bg-[#0a0e1a]/40 text-white/50 hover:border-white/20"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamil Nadu District */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">Tamil Nadu District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-colors font-sans text-sm cursor-pointer"
                >
                  {Object.keys(DISTRICT_PSH).sort().map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Monthly Bill Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-sans text-xs uppercase tracking-wider text-white/70 font-semibold">Monthly Electricity Bill</label>
                  <span className="font-mono text-base font-bold text-[#d4a843] bg-[#d4a843]/10 px-3.5 py-1 rounded">
                    {formatINR(monthlyBill)}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4a843] focus:outline-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                  <span>₹500</span>
                  <span>₹25,000</span>
                </div>
              </div>

              {/* Panel Technology */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">Panel Technology</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["mono_perc", "topcon", "hjt"] as const).map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => setPanelType(tech)}
                      className={`py-3 px-1 rounded-xl text-center border text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        panelType === tech
                          ? "border-[#d4a843] bg-[#d4a843]/10 text-white"
                          : "border-white/5 bg-[#0a0e1a]/40 text-white/50 hover:border-white/20"
                      }`}
                    >
                      {tech.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Options Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex justify-between items-center py-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors border-t border-white/5 mt-4 cursor-pointer"
                >
                  <span>Advanced Parameters</span>
                  <span>{showAdvanced ? "▲" : "▼"}</span>
                </button>

                {showAdvanced && (
                  <div className="space-y-4 pt-4 border-t border-white/5 animate-fadeIn">
                    {/* Shadow Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-sans text-[10px] uppercase text-white/60">Roof Shadow</label>
                        <span className="font-mono text-xs text-[#d4a843]">{shadowPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="5"
                        value={shadowPercent}
                        onChange={(e) => setShadowPercent(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4a843]"
                      />
                    </div>

                    {/* Daytime Usage */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-sans text-[10px] uppercase text-white/60">Daytime Load Split</label>
                        <span className="font-mono text-xs text-[#d4a843]">{daytimePercent}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        step="5"
                        value={daytimePercent}
                        onChange={(e) => setDaytimePercent(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4a843]"
                      />
                    </div>

                    {/* Roof Orientation */}
                    <div>
                      <label className="block font-sans text-[10px] uppercase text-white/60 mb-2">Roof Direction</label>
                      <select
                        value={roofDirection}
                        onChange={(e) => setRoofDirection(e.target.value)}
                        className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-2.5 px-3 rounded-lg focus:border-[#d4a843] focus:outline-none text-xs"
                      >
                        <option value="south">South (Optimal)</option>
                        <option value="south_east">South-East</option>
                        <option value="south_west">South-West</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                        <option value="north">North</option>
                      </select>
                    </div>

                    {/* Installation Type */}
                    <div>
                      <label className="block font-sans text-[10px] uppercase text-white/60 mb-2">Installation Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["on_grid", "hybrid"] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setInstallationType(t)}
                            className={`py-2 px-1 rounded-lg text-center border text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              installationType === t
                                ? "border-[#d4a843] bg-[#d4a843]/10 text-white"
                                : "border-white/5 bg-[#0a0e1a]/40 text-white/50"
                            }`}
                          >
                            {t.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="font-mono text-[9px] text-white/30 tracking-wide leading-relaxed mt-6">
              *Estimates are calculated using exact tariff orders and PM Surya Ghar central rules. Actual savings vary based on layout shading.
            </p>
          </div>

          {/* Outputs Panel - Right */}
          <div className="lg:col-span-7 bg-[#1a2332]/20 border border-white/5 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-lg text-white mb-2">Estimated Yields &amp; Savings</h3>

              {/* Annual Savings Block */}
              <div className="bg-[#0a0e1a]/50 border border-white/5 py-6 px-4 rounded-xl text-center relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#d4a843] to-[#ffcc33]" />
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 mb-1">Estimated Annual Savings</span>
                <span className="block font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#ffcc33] text-glow">
                  {formatINR(results.annualSavings)}
                </span>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#1a2332]/40 border border-white/5 p-3 rounded-lg text-center">
                  <span className="block text-[9px] text-white/50 uppercase tracking-widest font-semibold">Recommended size</span>
                  <span className="block font-mono text-lg font-bold text-white mt-1">{results.systemKW.toFixed(1)} kW</span>
                </div>
                <div className="bg-[#1a2332]/40 border border-white/5 p-3 rounded-lg text-center">
                  <span className="block text-[9px] text-white/50 uppercase tracking-widest font-semibold">Payback period</span>
                  <span className="block font-mono text-lg font-bold text-[#d4a843] mt-1">{results.paybackPeriod.toFixed(1)} Yrs</span>
                </div>
                <div className="bg-[#1a2332]/40 border border-white/5 p-3 rounded-lg text-center">
                  <span className="block text-[9px] text-white/50 uppercase tracking-widest font-semibold">25Y ROI</span>
                  <span className="block font-mono text-lg font-bold text-white mt-1">{Math.round(results.roi)}%</span>
                </div>
                <div className="bg-[#1a2332]/40 border border-white/5 p-3 rounded-lg text-center">
                  <span className="block text-[9px] text-white/50 uppercase tracking-widest font-semibold">25Y Net Savings</span>
                  <span className="block font-mono text-lg font-bold text-emerald-400 mt-1">{formatINRCompact(results.lifetimeSavings)}</span>
                </div>
              </div>

              {/* Subsidy Breakdown block */}
              <div className="bg-[#111111] border border-white/5 rounded-xl p-4 text-sm space-y-2">
                <div className="flex justify-between text-white/70">
                  <span>Gross System Cost</span>
                  <span className="font-mono font-bold text-white">{formatINR(results.totalCost)}</span>
                </div>
                {consumerType === "domestic" && (
                  <div className="flex justify-between text-[#d4a843]">
                    <span>Govt. Approved Subsidy</span>
                    <span className="font-mono font-bold">- {formatINR(results.subsidy)}</span>
                  </div>
                )}
                <div className="border-t border-white/5 pt-2 flex justify-between text-white font-semibold">
                  <span>Your Net Investment</span>
                  <span className="font-mono text-[#d4a843] font-bold">{formatINR(results.netCost)}</span>
                </div>
              </div>

              {/* Monthly Yield Visualizer (Horizontal bars) */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/60">Seasonal Generation Profile (kWh)</h4>
                <div className="flex items-end justify-between gap-1 h-[70px] pt-4">
                  {results.monthlyGen.map((g, i) => {
                    const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
                    const max = Math.max(...results.monthlyGen);
                    const pct = max > 0 ? (g / max) * 100 : 0;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                        <div
                          className="w-full bg-gradient-to-t from-rgba(200,245,0,0.2) to-[#d4a843] rounded-t min-h-[4px]"
                          style={{ height: `${pct}%` }}
                          title={`${g} kWh`}
                        />
                        <span className="text-[8px] font-mono text-white/40 mt-1">{months[i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[#111111] border border-white/5 rounded-xl p-4 text-xs space-y-2 text-left">
                <span className="font-mono uppercase text-white/50 tracking-wider block mb-1">Smart Advisor Recommendations</span>
                <ul className="space-y-1.5 list-none pl-0">
                  {results.recos.map((r, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-white/70">
                      <span className="shrink-0">{r.type === "success" ? "✅" : "⚠️"}</span>
                      <span>{r.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <button
              onClick={handleScrollToQuote}
              className="w-full py-4 rounded-xl font-display font-semibold text-xs tracking-widest uppercase bg-[#d4a843] hover:bg-[#ffcc33] text-[#0a0e1a] shadow-lg shadow-[#d4a843]/10 hover:shadow-[#d4a843]/20 transition-all cursor-pointer mt-6"
            >
              Secure Comprehensive Proposal
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
