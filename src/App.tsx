/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import WhyAura from "./components/WhyAura";
import ProductShowcase from "./components/ProductShowcase";
import SavingsCalculator from "./components/SavingsCalculator";
import Testimonials from "./components/Testimonials";
import FAQs from "./components/FAQs";
import OrderQuoteSystem from "./components/OrderQuoteSystem";
import Footer from "./components/Footer";

export default function App() {
  // Simple intersection observer to trigger active fade-runs on standard scroll reveals (if desired as fallback)
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", handleReveal);
    // Initial run to check visible areas on boot
    handleReveal();

    return () => {
      window.removeEventListener("scroll", handleReveal);
    };
  }, []);

  return (
    <div id="aura-solar-portal" className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden antialiased font-sans">
      
      {/* 1. Header component */}
      <Header />

      {/* 2. Hero viewport opening layout */}
      <Hero />

      {/* 3. Stats conversion trust bar metrics */}
      <TrustBar />

      {/* 4. Steps process 'How it works' segment */}
      <WhyAura />

      {/* 5. Product bento Grid items */}
      <ProductShowcase />

      {/* 6. Active calculation slider modelers */}
      <SavingsCalculator />

      {/* 7. Carousel client story validations */}
      <Testimonials />

      {/* 8. Collapsible structural Accordions FAQs */}
      <FAQs />

      {/* 9. Booking quote requests and direct order lockers */}
      <OrderQuoteSystem />

      {/* 10. Multi-column brand Footer */}
      <Footer />

    </div>
  );
}

