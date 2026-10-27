/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  title: string;
  label: string;
  desc: string;
}

interface PastProject {
  id: string;
  areaName: string;
  location: string;
  shortLocation: string;
  capacity: string;
  type: string;
  description: string;
  media: MediaItem[];
}

const PAST_PROJECTS: PastProject[] = [
  {
    id: "natesan-nagar",
    areaName: "Natesan Nagar",
    location: "Virugambakkam, Chennai, Tamil Nadu",
    shortLocation: "Virugambakkam, Chennai",
    capacity: "3.3 kW System",
    type: "On-Grid Solar Installation",
    description: "Custom-engineered elevated gazebo pergola structure preserving complete terrace garden space underneath, mounted with high-efficiency tier-1 bifacial panels.",
    media: [
      {
        type: "image",
        url: "/projects/site2-1.png",
        title: "Solar Module Rooftop Installation",
        label: "Angle 1 / 2",
        desc: "Full rooftop solar matrix engineered with optimal tilt and zero-shade orientation overlooking Virugambakkam.",
      },
      {
        type: "image",
        url: "/projects/site2-2.png",
        title: "Elevated Terrace Garden Canopy",
        label: "Angle 2 / 2",
        desc: "Tall elevated steel canopy providing weather protection while retaining the entire terrace garden below.",
      },
    ],
  },
  {
    id: "madambakkam",
    areaName: "Madambakkam",
    location: "Tambaram, Chennai, Tamil Nadu",
    shortLocation: "Tambaram, Chennai",
    capacity: "3.3 kW System",
    type: "On-Grid Solar Installation",
    description: "Turnkey rooftop solar installation featuring high-efficiency panels and a Growatt smart cloud-monitored inverter with dual surge protection breakers.",
    media: [
      {
        type: "image",
        url: "/projects/site1-1.png",
        title: "Rooftop Solar Module Installation",
        label: "Angle 1 / 2",
        desc: "Precision-mounted solar panels receiving unobstructed south-facing sun exposure in Madambakkam, Tambaram.",
      },
      {
        type: "image",
        url: "/projects/site1-2.png",
        title: "Growatt Smart Inverter & Protection Hub",
        label: "Angle 2 / 2",
        desc: "Neatly routed cabling, Growatt IoT wireless inverter with IP65 AC/DC distribution boxes and surge protection.",
      },
    ],
  },
  {
    id: "thiruverkadu",
    areaName: "Thiruverkadu",
    location: "Maduravoyal, Chennai, Tamil Nadu",
    shortLocation: "Maduravoyal, Chennai",
    capacity: "3.3 kW System",
    type: "On-Grid Solar Installation",
    description: "Turnkey rooftop solar installation with heavy-duty structural terrace mounts and zero-shade exposure for maximum annual clean generation.",
    media: [
      {
        type: "image",
        url: "/projects/site3-1.png",
        title: "Rooftop Solar Module Installation",
        label: "Photo 1 / 3",
        desc: "Precision-mounted tier-1 solar panel modules with zero-shade orientation and heavy-duty galvanized mounts.",
      },
      {
        type: "image",
        url: "/projects/site3-2.png",
        title: "Terrace Rooftop Solar Matrix",
        label: "Photo 2 / 3",
        desc: "Full panoramic terrace layout engineered for maximum solar harvesting and optimal angle tilt.",
      },
      {
        type: "video",
        url: "/projects/site3-vid1.mp4",
        title: "Live Site Walkthrough Video",
        label: "Video 3 / 3",
        desc: "On-site video walkthrough capturing the complete rooftop solar installation, structural finish, and clear sun path.",
      },
    ],
  },
];

export default function PastProjects() {
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [currentMediaIdx, setCurrentMediaIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeProject = PAST_PROJECTS[currentProjectIdx];
  const activeMedia = activeProject.media[currentMediaIdx] || activeProject.media[0];

  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through projects
  useEffect(() => {
    if (isPaused) return;

    const intervalMs = 50;
    const totalDuration = 6000;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (intervalMs / totalDuration) * 100;
        if (next >= 100) {
          setCurrentProjectIdx((p) => (p + 1) % PAST_PROJECTS.length);
          setCurrentMediaIdx(0);
          return 0;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isPaused, currentProjectIdx]);

  const handleSelectSite = (idx: number) => {
    setCurrentProjectIdx(idx);
    setCurrentMediaIdx(0);
    setProgress(0);
  };

  const handleNextAngle = () => {
    setCurrentMediaIdx((prev) => (prev + 1) % activeProject.media.length);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
  };

  const handleTouchEnd = () => {
    touchTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-white text-[#0f172a] relative z-20 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-full text-xs font-mono uppercase tracking-widest font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#84cc16] shadow-[0_0_10px_#84cc16] animate-pulse" />
            TOP THREE SIGNATURE PROJECTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0a0e1a] mb-4">
            Past Completed Projects
          </h2>
          <p className="text-[#475569] text-base md:text-lg max-w-2xl leading-relaxed">
            Explore our top three signature on-grid solar installations engineered with precision elevated mounting and zero-shade orientation across Tamil Nadu.
          </p>
        </div>

        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: SELECTABLE SITES LIST */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#64748b] px-1">
              <span>Select Site to Inspect</span>
              <span className="text-[#0f172a] font-bold">Top Three Projects</span>
            </div>

            {PAST_PROJECTS.map((proj, idx) => {
              const isActive = idx === currentProjectIdx;
              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelectSite(idx)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden ${
                    isActive
                      ? "bg-white border-[#0f172a] shadow-xl translate-y-[-2px]"
                      : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                  }`}
                >
                  {/* Progress Bar for Active Card */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#f1f5f9]">
                    <div
                      className="h-full bg-[#0f172a] transition-all duration-75"
                      style={{ width: isActive ? `${progress}%` : "0%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#0f172a]">{proj.areaName}</h3>
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded font-semibold ${
                        isActive ? "bg-[#0f172a] text-[#c8f500]" : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {proj.capacity}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#64748b] mb-3 font-medium">
                    <svg className="w-3.5 h-3.5 text-[#64748b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{proj.shortLocation}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[#475569]">
                      {proj.type}
                    </span>
                  </div>

                  <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT: PHOTO / VIDEO VIEWER */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              
              {/* TOP BAR WITH AREA NAME & FULLSCREEN ICON */}
              <div className="p-5 md:p-6 bg-white border-b border-gray-200 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-[#0f172a] tracking-tight">{activeProject.areaName}</h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#0f172a] text-[#c8f500]">
                      {activeProject.capacity}
                    </span>
                    <span className="hidden sm:inline-block text-xs font-mono px-2.5 py-1 rounded bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">
                      {activeProject.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748b] mt-1 font-medium">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{activeProject.location}</span>
                  </div>
                </div>

                {/* FULLSCREEN ICON-ONLY BUTTON */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="w-10 h-10 rounded-xl border border-slate-300 hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-[#c8f500] text-[#0f172a] flex items-center justify-center transition shadow-sm"
                  title="Fullscreen View"
                  aria-label="Fullscreen"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>

              {/* STAGE AREA (PHOTO OR VIDEO) */}
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative w-full h-[460px] md:h-[520px] bg-[#090d16] flex items-center justify-center overflow-hidden group"
              >
                {/* Ambient Blurred Background for photos */}
                {activeMedia.type === "image" && (
                  <img
                    src={activeMedia.url}
                    alt="Ambient"
                    className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] object-cover filter blur-2xl brightness-50 opacity-40 pointer-events-none scale-110"
                  />
                )}

                {/* Main Sharp Photo or Video */}
                {activeMedia.type === "video" ? (
                  <video
                    src={activeMedia.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="relative z-10 w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={`${activeProject.areaName} - ${activeMedia.title}`}
                    className="relative z-10 max-w-full max-h-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                )}

                {/* BOTTOM CAPTION BAR */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between gap-4 z-20 pointer-events-none">
                  <div className="pointer-events-auto max-w-[65%]">
                    <div className="text-sm font-bold text-white mb-0.5">
                      {activeMedia.title}
                    </div>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                      {activeMedia.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 pointer-events-auto">
                    <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/60 text-white border border-white/20 whitespace-nowrap">
                      {activeMedia.label}
                    </span>
                    <button
                      onClick={handleNextAngle}
                      className="px-3.5 py-1.5 bg-[#0f172a] hover:bg-[#c8f500] hover:text-[#0f172a] text-white rounded-lg border border-white/20 text-xs font-mono font-semibold transition flex items-center gap-1.5 whitespace-nowrap shadow-md"
                    >
                      <span>Switch to Next Angle</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl hover:text-[#c8f500] transition"
          >
            &times;
          </button>
          {activeMedia.type === "video" ? (
            <video
              src={activeMedia.url}
              autoPlay
              controls
              playsInline
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          ) : (
            <img
              src={activeMedia.url}
              alt={activeMedia.title}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
          )}
          <div className="mt-4 text-center text-white">
            <h4 className="text-lg font-bold">{activeProject.areaName} — {activeMedia.title}</h4>
            <p className="text-sm text-slate-300 mt-1">{activeProject.location}</p>
          </div>
        </div>
      )}
    </section>
  );
}
