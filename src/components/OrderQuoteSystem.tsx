/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { ORDER_TIERS } from "../data";
import { QuoteFormInput, OrderState } from "../types";

export default function OrderQuoteSystem() {
  // Quote form state
  const [quoteInput, setQuoteInput] = useState<QuoteFormInput>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    monthlyBill: "200-300",
    roofType: "Asphalt Shingle",
    preferredContact: "Email",
    message: "",
  });

  const [quoteError, setQuoteError] = useState("");
  const [isQuoteSent, setIsQuoteSent] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Direct system order state
  const [order, setOrder] = useState<OrderState>({
    selectedTierId: "professional", // default highlight Professional autonomy grid
    financingType: "loan", // default green energy low APR loan financing
  });

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  // Quote form handlers
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, phone, address } = quoteInput;

    if (!fullName || !email || !phone || !address) {
      setQuoteError("All required metadata fields must be supplied.");
      return;
    }

    setQuoteError("");
    setIsQuoteSent(true);
    setShowQuoteModal(true);
  };

  // Pricing calculations
  const orderAddonsAndPrices = useMemo(() => {
    const tier = ORDER_TIERS.find((t) => t.id === order.selectedTierId);
    if (!tier) return { totalPrice: 0, paymentLabel: "" };

    const baselinePrice = tier.price;

    if (order.selectedTierId === "enterprise") {
      return {
        totalPrice: "Custom Pricing",
        paymentLabel: "Subject to structural drafting consultation",
        deposit: "$0 Down",
      };
    }

    let calculatedPrice = baselinePrice;
    let paymentLabel = "";
    let deposit = "$0 Down";

    if (order.financingType === "cash") {
      // 30% Federal Investment Tax Credit instant rebate rebate applied virtually
      const taxCreditRebate = baselinePrice * 0.3;
      calculatedPrice = baselinePrice - taxCreditRebate;
      paymentLabel = `One-time payment (saves ${taxCreditRebate.toLocaleString()} via Federal Clean Energy ITC)`;
    } else if (order.financingType === "loan") {
      // 20-year low interest green loan monthly payments index
      const monthlyRate = Math.round((baselinePrice * 0.0062));
      paymentLabel = `$${monthlyRate}/mo at 4.2% low APR (Est. cashflow positive Month 1)`;
    } else {
      // Lease agreement monthly utility replacement
      const monthlyRate = Math.round((baselinePrice * 0.005));
      paymentLabel = `$${monthlyRate}/mo fixed power purchase agreement (Full-term AURA technical maintenance)`;
    }

    return {
      totalPrice: `$${calculatedPrice.toLocaleString()}`,
      paymentLabel,
      deposit,
    };
  }, [order]);

  const handleOrderSubmit = () => {
    setIsOrdered(true);
    setShowOrderModal(true);
  };

  return (
    <section className="bg-gradient-to-b from-[#1a2332] to-[#0a0e1a] py-24 md:py-32 relative z-20">
      
      {/* Background Dots Grid decoration */}
      <div className="absolute inset-0 grid-dots opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* =================================_________ ================================= */}
        {/* ORDER PRODUCT SECTOR */}
        <div id="order-tier-list" className="mb-32">
          
          {/* SECTION HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#d4a843]/20 rounded-full mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4a843]">Reserve System</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-6">
              Order Your Solar System
            </h2>
            <p className="font-sans text-[#a0aec0] text-base md:text-lg font-light leading-relaxed">
              Select an engineered structural model suited for your residential energy footprint. Configure rates instantly before drafting.
            </p>
          </div>

          {/* TIERS GRID ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            {ORDER_TIERS.map((tier) => {
              const isSelected = order.selectedTierId === tier.id;
              const isPremium = tier.id === "professional"; // Highlight Aura Home Autonomy

              return (
                <div
                  key={tier.id}
                  onClick={() => setOrder((prev) => ({ ...prev, selectedTierId: tier.id as any }))}
                  className={`bg-[#0a0e1a]/80 border rounded-2xl p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${
                    isSelected
                      ? "border-[#d4a843] scale-[1.03] shadow-xl shadow-[#d4a843]/10 z-10"
                      : "border-white/5 hover:border-white/15 opacity-80"
                  } ${isPremium && !isSelected ? "ring-1 ring-white/10" : ""}`}
                >
                  {isPremium && (
                    <div className="absolute top-[-14px] left-[50%] -translate-x-[50%] bg-gradient-to-r from-[#d4a843] to-[#ffcc33] text-[#0a0e1a] font-mono text-[9px] uppercase tracking-[0.2em] font-semibold py-1 px-4 rounded-full shadow-md">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    {/* Header info */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-white mb-2">{tier.name}</h3>
                        <p className="font-mono text-[10px] uppercase text-[#d4a843] tracking-widest">{tier.capacity}</p>
                      </div>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-[#d4a843] text-[#d4a843]" : "border-white/20"
                      }`}>
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#d4a843]" />}
                      </span>
                    </div>

                    {/* Pricing baseline */}
                    <div className="flex items-baseline gap-2 mb-6 border-b border-white/5 pb-6">
                      <span className="font-serif text-3xl md:text-4xl font-bold text-white">{tier.priceRaw}</span>
                      {tier.id !== "enterprise" && (
                        <span className="font-sans text-xs text-[#a0aec0] font-light">nominal retail price</span>
                      )}
                    </div>

                    <p className="font-sans text-white/70 text-sm leading-relaxed mb-8 font-light">
                      {tier.tagline}
                    </p>

                    {/* Features checklist */}
                    <ul className="space-y-4 mb-10">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex gap-3 text-xs text-[#a0aec0]">
                          <svg className="w-4.5 h-4.5 text-[#d4a843] shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-light">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className={`w-full py-3.5 rounded-xl font-display font-semibold text-xs tracking-widest uppercase transition-all ${
                      isSelected
                        ? "bg-[#d4a843] hover:bg-[#ffcc33] text-[#0a0e1a] shadow-lg shadow-[#d4a843]/10"
                        : "border border-white/10 text-white/50 hover:border-[#d4a843] hover:text-[#d4a843] bg-white/[0.01]"
                    }`}
                  >
                    {isSelected ? "SYSTEM SELECTED" : "SELECT GRID"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC ESTIMATORS & CONFIGURATION CONFIG BAR */}
          <div className="max-w-4xl mx-auto bg-[#1a2332]/45 border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md">
            <h4 className="font-display font-medium text-xs tracking-widest text-[#f5e6c8] uppercase mb-6 text-center">
              Configure Financing &amp; Payments options
            </h4>
            
            {/* Toggle row */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
              {[
                { val: "cash", label: "Cash Purchase" },
                { val: "loan", label: "Smart Loan" },
                { val: "lease", label: "Power Lease PPA" },
              ].map((m) => (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => setOrder((prev) => ({ ...prev, financingType: m.val as any }))}
                  className={`py-3 px-1 rounded-xl text-center border transition-all text-xs font-semibold cursor-pointer ${
                    order.financingType === m.val
                      ? "border-[#d4a843] bg-[#d4a843]/15 text-white shadow-md"
                      : "border-white/5 bg-[#0a0e1a]/40 text-white/40 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Price estimations display card */}
            <div className="bg-[#0a0e1a]/50 border border-white/5 p-6 rounded-xl text-center">
              <span className="font-mono text-[10px] uppercase text-[#a0aec0] tracking-widest block mb-1">
                Custom Estimator Pricing
              </span>
              <span className="font-serif text-3xl font-bold text-[#ffcc33] block mb-2 transition-all">
                {orderAddonsAndPrices.totalPrice}
              </span>
              <span className="font-sans text-xs text-white/70 block font-light">
                {orderAddonsAndPrices.paymentLabel}
              </span>
              
              <div className="flex justify-center items-center gap-6 mt-4 pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
                <span>RESERVE DEPOSIT: <strong className="text-emerald-400"> {orderAddonsAndPrices.deposit} </strong></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <span>RISK: <strong className="text-white">Cancel Anytime</strong></span>
              </div>
            </div>

            <button
              onClick={handleOrderSubmit}
              className="max-w-xs mx-auto block w-full py-4 rounded-xl font-display font-bold text-xs tracking-widest uppercase bg-gradient-to-r from-[#d4a843] to-[#ffcc33] text-[#0a0e1a] shadow-lg shadow-[#d4a843]/15 hover:shadow-[#d4a843]/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all mt-8 cursor-pointer"
            >
              PLACE DIRECT ORDER
            </button>
          </div>

        </div>

        {/* =================================_________ ================================= */}
        {/* QUOTE FORM REQUEST SYSTEM */}
        <div id="quote" className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a2332]/80 to-[#0a0e1a]/95 border border-white/5 rounded-3xl p-8 sm:p-12 relative overflow-hidden backdrop-blur-2xl">
          
          {/* Subtle line decorations */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#d4a843]/5 rotate-45 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-2xl mx-auto">
            
            {/* Header Content */}
            <div className="text-center mb-12">
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-[#d4a843] mb-4" />
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4">
                Start Your Solar Journey
              </h2>
              <p className="font-sans text-[#a0aec0] text-sm font-light">
                Our in-house design engineering desk handles complete physical mappings, local HOA clearances, grid net metering synchronization, and permits. Request is absolutely non-obligatory.
              </p>
            </div>

            {/* Error banner */}
            {quoteError && (
              <div className="bg-red-400/10 border border-red-400/20 text-red-300 py-3.5 px-5 rounded-xl text-xs mb-8 text-center font-light">
                {quoteError}
              </div>
            )}

            {/* Form tags */}
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full name */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                    Full Name <span className="text-[#d4a843]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteInput.fullName}
                    onChange={(e) => setQuoteInput((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="EX: Theodore Vance"
                    className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-all font-sans text-sm"
                  />
                </div>

                {/* Email address */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                    Email Address <span className="text-[#d4a843]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={quoteInput.email}
                    onChange={(e) => setQuoteInput((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="EX: theodore.vance@mail.com"
                    className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                    Phone Number <span className="text-[#d4a843]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={quoteInput.phone}
                    onChange={(e) => setQuoteInput((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="EX: (512) 555-8290"
                    className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-all font-sans text-sm"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                    Installation Street Address <span className="text-[#d4a843]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteInput.address}
                    onChange={(e) => setQuoteInput((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder="EX: 802 Peak Vista Court"
                    className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Monthly Electrc Bill select dropdown */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                    Average Monthly Electricity Bill
                  </label>
                  <select
                    id="quote-monthly-bill"
                    value={quoteInput.monthlyBill}
                    onChange={(e) => setQuoteInput((prev) => ({ ...prev, monthlyBill: e.target.value }))}
                    className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-all font-sans text-sm"
                  >
                    <option value="<$100">Less than $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200-300">$200 - $300</option>
                    <option value="300-400">$300 - $400</option>
                    <option value="400+">More than $400</option>
                  </select>
                </div>

                {/* Roof type select dropdown */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                    Residential Roof Type
                  </label>
                  <select
                    value={quoteInput.roofType}
                    onChange={(e) => setQuoteInput((prev) => ({ ...prev, roofType: e.target.value }))}
                    className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-all font-sans text-sm"
                  >
                    <option value="Asphalt Shingle">Asphalt Shingle</option>
                    <option value="Metal">Framed Metal Seam</option>
                    <option value="Tile">Spanish clay Tile</option>
                    <option value="Flat">Concrete Structural Flat deck</option>
                    <option value="Other">Slate / Other Architectural</option>
                  </select>
                </div>
              </div>

              {/* Preferred Contact method */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-3">
                  Preferred Contact Method
                </label>
                <div className="flex gap-6">
                  {["Phone", "Email", "Text"].map((method) => (
                    <label key={method} className="flex items-center gap-2 text-sm text-white/70 hover:text-white cursor-pointer select-none">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={quoteInput.preferredContact === method}
                        onChange={() => setQuoteInput((prev) => ({ ...prev, preferredContact: method as any }))}
                        className="w-4 h-4 bg-[#0a0e1a] border border-white/20 accent-[#d4a843]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message text */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Anomalous Structural Details or Comments (Optional)
                </label>
                <textarea
                  rows={4}
                  value={quoteInput.message}
                  onChange={(e) => setQuoteInput((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="EX: Tree shadow on SW gable, dual EV chargers planned..."
                  className="w-full bg-[#0a0e1a] border border-white/10 text-white/80 py-3.5 px-4 rounded-xl focus:border-[#d4a843] focus:outline-none transition-all font-sans text-sm resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className={`w-full py-4.5 rounded-xl font-display font-semibold text-xs tracking-widest uppercase transition-all ${
                  isQuoteSent
                    ? "bg-[#22c55e] text-[#0a0e1a] shadow-lg shadow-green-500/10 cursor-default"
                    : "bg-[#d4a843] hover:bg-[#ffcc33] text-[#0a0e1a] shadow-lg shadow-[#d4a843]/10 hover:shadow-[#d4a843]/20 cursor-pointer"
                }`}
              >
                {isQuoteSent ? "Quote Requested" : "Request Free Consultation"}
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* =================================_________ ================================= */}
      {/* 1. COMPREHENSIVE QUOTE MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-[#1a2332] border border-[#d4a843]/30 max-w-xl w-full rounded-2xl p-8 relative shadow-2xl shadow-black/80">
            {/* Close */}
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-[#d4a843] transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] mx-auto mb-4">
                <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Simulation Received</h3>
              <p className="font-sans text-white/60 text-xs font-light">
                Thank you! Our structural solar planning consultant is routing this through local zip code maps.
              </p>
            </div>

            {/* Custom formatted summary representation */}
            <div className="bg-[#0a0e1a]/70 border border-white/5 p-5 rounded-xl mb-6">
              <h4 className="font-mono text-[10px] tracking-widest text-[#d4a843] uppercase mb-3 font-semibold pb-2 border-b border-white/5">
                Summary of Parameters
              </h4>
              <div className="space-y-2 font-mono text-[11px] text-white/80">
                <p><span className="text-[#a0aec0]">NAME:</span> {quoteInput.fullName}</p>
                <p><span className="text-[#a0aec0]">EMAIL:</span> {quoteInput.email}</p>
                <p><span className="text-[#a0aec0]">PHONE:</span> {quoteInput.phone}</p>
                <p><span className="text-[#a0aec0]">INSTALS ADDR:</span> {quoteInput.address}</p>
                <p><span className="text-[#a0aec0]">BILL RANGE:</span> ${quoteInput.monthlyBill}/mo average</p>
                <p><span className="text-[#a0aec0]">ROOF FRAME:</span> {quoteInput.roofType}</p>
                <p><span className="text-[#a0aec0]">CONTACT VIA:</span> {quoteInput.preferredContact}</p>
              </div>
            </div>

            <div className="text-center font-sans text-xs text-white/50 leading-relaxed font-light mb-2">
              We will contact you within <strong>24 business hours</strong> to deliver high-resolution irradiance overlays for your review.
            </div>

            <button
              onClick={() => setShowQuoteModal(false)}
              className="w-full mt-6 py-3 rounded-lg font-display text-xs tracking-wider uppercase font-semibold border border-white/10 hover:border-[#d4a843] text-[#d4a843] hover:bg-[#d4a843]/5 transition-all cursor-pointer"
            >
              Back to Portal
            </button>
          </div>
        </div>
      )}

      {/* =================================_________ ================================= */}
      {/* 2. ORDER CONFIRMATION MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-[#1a2332] border border-[#d4a843] max-w-xl w-full rounded-2xl p-8 relative shadow-2xl shadow-black/90">
            {/* Close */}
            <button
              onClick={() => setShowOrderModal(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-[#d4a843] transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto mb-4 animate-bounce">
                <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Order Reservation Initialized</h3>
              <p className="font-sans text-white/60 text-xs font-light">
                Your high-density smart microgrid hardware allocation lock has been configured.
              </p>
            </div>

            {/* Configured system breakdown summary */}
            <div className="bg-[#0a0e1a]/80 border border-white/5 p-5 rounded-xl mb-6">
              <h4 className="font-mono text-[10px] tracking-widest text-[#ffcc33] uppercase mb-3 font-semibold pb-1.5 border-b border-white/5">
                Hardware Configuration Summary
              </h4>
              <div className="space-y-2.5 font-mono text-[11px] text-white/80">
                <p>
                  <span className="text-[#a0aec0]">SYSTEM TIER:</span>{" "}
                  <strong>
                    {ORDER_TIERS.find((t) => t.id === order.selectedTierId)?.name}
                  </strong>
                </p>
                <p>
                  <span className="text-[#a0aec0]">CAPACITY RATE:</span>{" "}
                  {ORDER_TIERS.find((t) => t.id === order.selectedTierId)?.capacity}
                </p>
                <p>
                  <span className="text-[#a0aec0]">FINANCE FLOW:</span>{" "}
                  <span className="uppercase font-bold">{order.financingType}</span>
                </p>
                <p>
                  <span className="text-[#a0aec0]">RECALCULATED PRICE:</span>{" "}
                  <span className="text-emerald-400 font-bold">{orderAddonsAndPrices.totalPrice}</span>
                </p>
                <p>
                  <span className="text-[#a0aec0]">PROJECTION DETAILS:</span>{" "}
                  <span className="text-white font-light">{orderAddonsAndPrices.paymentLabel}</span>
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#d4a843]/10 border border-[#d4a843]/20 rounded-lg text-[11px] font-sans text-white/70 leading-relaxed text-center font-light mb-4">
              <strong>Reserve Terms:</strong> $0 down payment. A certified AURA solar draft engineer will call you directly to perform the thermal satellite site drafting and arrange matching permits.
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-1/2 py-3 rounded-lg font-display text-xs tracking-wider uppercase font-semibold border border-white/10 hover:border-white/20 text-[#a0aec0] bg-white/[0.01] transition-all cursor-pointer"
              >
                PRINT RESERVATION
              </button>
              <button
                onClick={() => setShowOrderModal(false)}
                className="w-1/2 py-3 rounded-lg font-display text-xs tracking-wider uppercase font-semibold bg-[#d4a843] hover:bg-[#ffcc33] text-[#0a0e1a] transition-all cursor-pointer"
              >
                CONFIRM GRID ALLOCATION
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
