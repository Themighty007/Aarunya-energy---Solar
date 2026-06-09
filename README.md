# ☀️ Aarunya Energy — Solar Portal

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

**Aarunya Energy** is a premium, high-contrast solar energy portal and interactive system modeler designed for tier-1 solar solutions in India. Built with a sleek dark aesthetic, glassmorphic surfaces, and responsive interactive modules, the application showcases next-generation clean energy arrays and empowers users to calculate real-world financial dividends from transitioning to solar power.

🚀 **Live Site:** [https://aarunyaenergy.netlify.app/](https://aarunyaenergy.netlify.app/)

---

## 📸 Interface Preview

<div align="center">
  <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80" alt="Aarunya Energy Solar Panels" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />
  <p><i>Premium tier-1 solar systems engineered for high conversion rates.</i></p>
</div>

<div align="center" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
  <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80" alt="Nova Array 3kW" width="48%" style="border-radius: 8px;" />
  <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80" alt="Nova Array 5kW" width="48%" style="border-radius: 8px;" />
</div>

---

## ✨ Core Features

*   **Interactive Savings Calculator**: Size your solar installation instantly. Calculate optimal system output (kW), breakeven lines (payback period), and 25-year lifetime savings based on monthly utility bills, home size, sun exposure rating, and ZIP code.
*   **Product Showcase**: An elegant grid illustrating Tier-1 Nova Array systems (ranging from 3kW residential layouts to 10kW high-yield commercial installations) with integrated backup storage specifications.
*   **Seamless Quote Booking**: A comprehensive quote requesting interface that auto-fills options based on calculator inputs to secure tailored solar proposals.
*   **Premium Visual Architecture**: Features dynamic dark mode styling, customized typography, clean borders, glassmorphic cards, smooth scroll-reveals, and responsive tactile hover feedback.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 6](https://vite.config.ts) for blazing-fast development and build cycles
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for a sleek, performant design system
- **Icons & Animation**: [Lucide React](https://lucide.dev) & [Motion](https://motion.dev/)

---

## 🚀 Running Locally

Follow these instructions to clone, install, and run the Aarunya Energy portal on your machine.

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### Installation

1. Install package dependencies:
   ```bash
   npm install
   ```

2. (Optional) Set up your environment variables if using the server-side integrations:
   ```bash
   cp .env.example .env
   # Add your specific API keys/credentials to .env
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Build & Deployment

To generate a static production build:
```bash
npm run build
```
The output will be placed in the `dist/` directory, optimized and ready to be deployed to static hosting solutions like Netlify, Vercel, or AWS S3.
