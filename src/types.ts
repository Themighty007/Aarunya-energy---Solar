/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Particle {
  id: number;
  left: number;
  delay: string;
  duration: string;
  size: number;
  opacity: number;
  drift: string;
}

export interface MetricItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  targetValue: number;
}

export interface StepProcess {
  step: string;
  title: string;
  description: string;
  iconName: "chat" | "draft" | "wrench";
}

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  badge?: string;
  ctaText: string;
  type: "stories" | "battery" | "intelligent";
}

export interface CalculatorState {
  monthlyBill: number;
  homeSize: "small" | "medium" | "large" | "estate";
  sunExposure: "full" | "partial" | "shaded";
  zipCode: string;
}

export interface CalculatorResult {
  annualSavings: number;
  systemSize: number;
  paybackPeriod: number;
  savings25Years: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatarUrl: string;
  rating: number;
  systemDetails: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface QuoteFormInput {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  monthlyBill: string;
  roofType: string;
  preferredContact: "Phone" | "Email" | "Text";
  message: string;
}

export interface OrderTier {
  id: "starter" | "professional" | "enterprise";
  name: string;
  capacity: string;
  price: number;
  priceRaw: string;
  tagline: string;
  features: string[];
}

export interface OrderState {
  selectedTierId: "starter" | "professional" | "enterprise" | null;
  financingType: "cash" | "loan" | "lease";
}
