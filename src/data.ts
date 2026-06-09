/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StepProcess, ProductFeature, Testimonial, FAQItem, OrderTier } from "./types";

export const TRUST_METRICS = [
  { id: "installations", targetValue: 40000, suffix: "+", label: "Installations Completed" },
  { id: "warranty", targetValue: 25, suffix: " Years", label: "Panel Performance Warranty" },
  { id: "satisfaction", targetValue: 98.7, suffix: "%", label: "Customer Satisfaction Rate" },
  { id: "savings", targetValue: 2.4, suffix: "M", prefix: "$", label: "Cumulative Client Savings (2025)" }
];

export const STEP_PROCESSES: StepProcess[] = [
  {
    step: "01",
    title: "Thermal Mapping Consultation",
    description: "We analyze your roof utilizing high-resolution aerospace-grade thermal mapping and solar irradiance intelligence to engineer your peak-generation layout. Free of charge.",
    iconName: "chat"
  },
  {
    step: "02",
    title: "Precision Custom Engineering",
    description: "Every building has a distinct architectural footprint. Our licensed structural draftsmen model a custom, low-profile solar panel and battery grid integration tailored perfectly for your home.",
    iconName: "draft"
  },
  {
    step: "03",
    title: "Zero-Friction Clean Install",
    description: "Our certified in-house teams handle structural reinforcement, city permits, electric utility net-metering interconnection, and dynamic cloud commissioning within 48 hours.",
    iconName: "wrench"
  }
];

export const PRODUCT_SHOWCASE_ITEMS: ProductFeature[] = [
  {
    id: "stories",
    title: "Client Stories",
    description: "Explore the real stories, bills, and lifetime investment reports from real families who secured total energy independence.",
    badge: "4.9 / 5 Rated",
    ctaText: "EXPLORE CASES",
    type: "stories"
  },
  {
    id: "battery",
    title: "Smart Edge Battery Storage",
    description: "Secure absolute grid-resilience. Modularity ranges from 15kWh up to 60kWh, configured to auto-charge when rates are low and sustain peak loads seamlessly.",
    ctaText: "EXPLORE SPECS",
    type: "battery"
  },
  {
    id: "intelligent",
    title: "Intelligent Aura Dashboard",
    description: "Adaptive load balancing, AI-guided consumption forecasting, dynamic local weather adaptation, and full smart-home integration with Enphase intelligence.",
    badge: "IP68 Certified",
    ctaText: "MANAGE demo",
    type: "intelligent"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Reducing our electric bills from $340 to a flat $11 connection fee has been revolutionary. The Nova Array looks incredibly clean and integrated seamlessly with our flat glass-roof design. We are completely unaffected during local summer blackouts.",
    author: "Elena & Marcus Vance",
    location: "Aspen, Colorado",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    systemDetails: "Nova Array 12kW + 2x Edge Batteries (30kWh)"
  },
  {
    id: "t2",
    quote: "AURA SOLAR stands out. The engineering precision during the aerospace mapping consultation was outstanding, and their 25-year performance warranty made it an absolute zero-risk decision. Our payback calculation is currently matching their 5.8-year estimate perfectly.",
    author: "Dr. Jonathan Reyes",
    location: "Pasadena, California",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    systemDetails: "Nova Array 10kW + Edge Battery (15kWh)"
  },
  {
    id: "t3",
    quote: "The billing transparency and customer support are exceptional. We financed zero down, and our monthly loan installment is $150 lower than our old utility bill! Best architectural upgrade we have done in years. The AI dashboard is addictive.",
    author: "Sarah & David Albright",
    location: "Austin, Texas",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5,
    systemDetails: "Nova Array 8kW + Edge Battery (15kWh)"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Will solar integration work on my specific roof type and condition?",
    answer: "Yes, our engineers custom build high-tensile brackets and penetrations for asphalt shingles, slate tile, high-gabled flat-seam metal roofs, and architectural flat concrete decks. During our initial mapping phase, we verify that your structural load ratings are fully optimal, and handle any cosmetic re-shingling if matching is required."
  },
  {
    id: "faq2",
    question: "How long does the entire consultation to commission process take?",
    answer: "Typically under 21 business days. The actual physical solar mounting and battery wiring on your property is completed in just 24 to 48 hours. The remainder of the timeframe is allocated to municipal structural safety permits, HOA structural compliance boards, and utility grid interconnections."
  },
  {
    id: "faq3",
    question: "What financing and cash incentive options are available?",
    answer: "AURA systems qualify for the federal 30% Residential Clean Energy Credit (ITC), local state utility credit programs, and grid net-metering cash payouts. We offer $0-down cash-positive solar loans (with interest rates secured through green-bank partnerships), or structured power purchase lease agreements where we maintain the asset entirely."
  },
  {
    id: "faq4",
    question: "What happens during a localized power grid dropout or outage?",
    answer: "While traditional grid-tied systems must turn off for safety regulations during an outage, AURA's intelligent automated microgrid isolation instantly decouples your home from the falling grid within 8 milliseconds. Your Edge Battery bank steps of service in parallel, ensuring zero flickering of heavy climate appliances, servers, or critical lighting."
  },
  {
    id: "faq5",
    question: "How much active maintenance do these smart panels require?",
    answer: "AURA Solar panels are engineered with a durable self-shedding nanotech glass glaze that causes particulate matter, pollen, and light snow to wash away with simple dew cycles. The panels are Solid-State, containing zero moving components. Our telemetry dashboard monitors automated warning alerts 24/7/365, and dispatch engineers directly if any anomalous load drops are detected."
  }
];

export const ORDER_TIERS: OrderTier[] = [
  {
    id: "starter",
    name: "Nova Array 6kW System",
    capacity: "6 kW Premium Power Grid",
    price: 12000,
    priceRaw: "$12,000",
    tagline: "Ideal for high-density suburban homes and essential savings.",
    features: [
      "Aerospace mapping analysis",
      "NASA-grade high-efficiency silicon panels",
      "Low-profile structural rail integration",
      "Dynamic real-time cloud monitoring",
      "25-Year Performance & Structural Warranty"
    ]
  },
  {
    id: "professional",
    name: "Aura Home Autonomy Grid",
    capacity: "10 kW Nova Array + 15kWh Smart Edge Battery",
    price: 22000,
    priceRaw: "$22,000",
    tagline: "Our most requested solution for complete self-reliance & resilient backups.",
    features: [
      "Aerospace mapping analysis",
      "High-density low-profile solar roof layers",
      "15kWh Modular Smart Edge Battery unit",
      "Microgrid automatic blackout-switch",
      "Predictive AI billing & weather optimizing system",
      "Accelerated Net-Metering grid pairing",
      "25-Year Direct Warranty + 10-Year Battery Warranty"
    ]
  },
  {
    id: "enterprise",
    name: "Complete Architectural Custom Grid",
    capacity: "Custom Scale PV + Storage Array",
    price: 36000,
    priceRaw: "Custom Quote",
    tagline: "For estate residences, multi-structure grids, and net-zero goals.",
    features: [
      "Full site planning & architectural scale mockups",
      "Custom frameless solar panel integrations",
      "Multi-tier expandable battery systems (up to 60kWh)",
      "Dynamic building thermal adaptation profiles",
      "High-voltage vehicle charging integrations (Dual 48A)",
      "Direct VIP premium tech concierge support"
    ]
  }
];
