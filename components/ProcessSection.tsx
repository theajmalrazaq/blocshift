"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ProcessVisual01Scope,
  ProcessVisual02Design,
  ProcessVisual03Sprints,
  ProcessVisual04Launch,
} from "./ProcessVisuals";

interface ProcessSectionProps {
  onOpenContact?: () => void;
}

interface ProcessStep {
  number: string;
  shortLabel: string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  milestone: string;
  renderVisual: () => React.ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    shortLabel: "Scope",
    phase: "Phase 01",
    title: "Scope & Architecture",
    description:
      "We lock in project goals, user flows, and database structure before writing code.",
    deliverables: ["Stack spec", "API & schema", "Direct Slack"],
    milestone: "Scope & Architecture Lock",
    renderVisual: () => <ProcessVisual01Scope />,
  },
  {
    number: "02",
    shortLabel: "Design",
    phase: "Phase 02",
    title: "Design & Prototypes",
    description:
      "You get clickable Figma flows and shared color and spacing tokens before build begins.",
    deliverables: ["Figma prototypes", "Design tokens", "Responsive states"],
    milestone: "Figma Component System",
    renderVisual: () => <ProcessVisual02Design />,
  },
  {
    number: "03",
    shortLabel: "Sprints",
    phase: "Phase 03",
    title: "Production Sprints",
    description:
      "We push live staging links and short walkthrough videos each week so you test real builds early.",
    deliverables: ["Live staging URL", "Async Looms", "Automated CI/CD"],
    milestone: "Continuous Staging Builds",
    renderVisual: () => <ProcessVisual03Sprints />,
  },
  {
    number: "04",
    shortLabel: "Launch",
    phase: "Phase 04",
    title: "QA & Handover",
    description:
      "We run speed checks, wire analytics, and transfer 100% of the repo and Figma files to you.",
    deliverables: ["99+ Lighthouse", "Live telemetry", "100% IP transfer"],
    milestone: "100/100 Core Web Vitals",
    renderVisual: () => <ProcessVisual04Launch />,
  },
];

export default function ProcessSection({ onOpenContact }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [railGeometry, setRailGeometry] = useState<{ top: number; height: number } | null>(null);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const manualLockUntilRef = useRef<number>(0);

  const updateFromScroll = useCallback(() => {
    rafRef.current = null;
    const now = performance.now();
    const els = stepRefs.current;
    const firstEl = els[0];
    const lastEl = els[els.length - 1];
    if (!firstEl || !lastEl) return;

    // Keep the vertical rail spanning strictly from Node 01 center to Node 04 center
    const NODE_CENTER_OFFSET = 44; // top-7 (28px) + half of w-8/h-8 (16px)
    const nextTop = firstEl.offsetTop + NODE_CENTER_OFFSET;
    const nextHeight = Math.max(0, lastEl.offsetTop - firstEl.offsetTop);
    setRailGeometry((prev) =>
      prev && prev.top === nextTop && prev.height === nextHeight
        ? prev
        : { top: nextTop, height: nextHeight }
    );

    const focalY = window.innerHeight * 0.44;
    const firstCenter = firstEl.getBoundingClientRect().top + NODE_CENTER_OFFSET;
    const lastCenter = lastEl.getBoundingClientRect().top + NODE_CENTER_OFFSET;
    const span = Math.max(1, lastCenter - firstCenter);
    const rawProgress = (focalY - firstCenter) / span;
    const clampedProgress = Math.min(1, Math.max(0, rawProgress));
    setScrollProgress(clampedProgress);

    if (now < manualLockUntilRef.current) return;

    let closestIdx = 0;
    let minDistance = Infinity;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const elFocal = rect.top + rect.height * 0.42;
      const dist = Math.abs(elFocal - focalY);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = i;
      }
    }

    setActiveStep((prev) => (prev === closestIdx ? prev : closestIdx));
  }, []);

  useEffect(() => {
    const scheduleUpdate = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateFromScroll);
      }
    };

    updateFromScroll();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    const containerEl = stepRefs.current[0]?.parentElement;
    if (containerEl && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(containerEl);
    }

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateFromScroll]);

  const selectStep = useCallback((idx: number, shouldScrollToCard: boolean) => {
    const clamped = Math.min(PROCESS_STEPS.length - 1, Math.max(0, idx));
    setActiveStep(clamped);
    setScrollProgress(clamped / (PROCESS_STEPS.length - 1));

    if (shouldScrollToCard && typeof window !== "undefined") {
      const el = stepRefs.current[clamped];
      if (el) {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        manualLockUntilRef.current = performance.now() + (prefersReduced ? 120 : 750);
        el.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "center",
        });
      }
    }
  }, []);

  const current = PROCESS_STEPS[activeStep];

  return (
    <section
      id="process"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06] overflow-x-clip"
    >
      {/* Background Pixel Matrix Grid */}
      <div
        className="pointer-events-none select-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Section Heading */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
            How a project runs.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[540px] m-0">
            Four clear steps from scoping to launch, with weekly staging links and direct Slack access.
          </p>
        </div>

        {/* Interactive Split Scroll Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Scroll-Synced Vertical Progress Rail + Phase Steps */}
          <div className="lg:col-span-6 relative">
            {/* Continuous vertical progress rail strictly from 01 center to 04 center */}
            <div
              className="hidden sm:block absolute left-[15px] w-[2px] bg-black/[0.07] rounded-full overflow-hidden pointer-events-none"
              style={{
                top: railGeometry ? `${railGeometry.top}px` : "44px",
                height: railGeometry ? `${railGeometry.height}px` : "calc(100% - 280px)",
              }}
              aria-hidden="true"
            >
              <div
                className="w-full rounded-full transition-[height] duration-150 ease-out"
                style={{
                  height: `${Math.round(scrollProgress * 100)}%`,
                  background: "#62abe0",
                }}
              />
            </div>

            <div className="flex flex-col gap-5 sm:gap-7">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                const isPast = idx < activeStep;

                return (
                  <div
                    key={step.number}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    className="relative sm:pl-12"
                  >
                    {/* Rail node marker */}
                    <button
                      type="button"
                      onClick={() => selectStep(idx, true)}
                      aria-label={`Jump to ${step.phase}: ${step.title}`}
                      className="hidden sm:inline-flex absolute left-0 top-7 w-8 h-8 rounded-full items-center justify-center text-[11px] font-semibold transition-all duration-300 cursor-pointer z-10"
                      style={{
                        background: isActive
                          ? "#d2fb95"
                          : isPast
                          ? "#202124"
                          : "#ffffff",
                        color: isPast && !isActive ? "#ffffff" : "#202124",
                        border: isActive
                          ? "1px solid rgba(32,33,36,0.22)"
                          : isPast
                          ? "1px solid #202124"
                          : "1px solid rgba(32,33,36,0.16)",
                      }}
                    >
                      {step.number}
                    </button>

                    {/* Phase Step Card */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => selectStep(idx, false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectStep(idx, true);
                        }
                      }}
                      className={`group rounded-[20px] p-5 sm:p-7 transition-all duration-300 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-black ${
                        isActive
                          ? "bg-white border border-black/[0.15] opacity-100"
                          : "bg-[#fafaf9] border border-black/[0.06] opacity-65 hover:opacity-95 hover:bg-white"
                      }`}
                      style={{
                        cornerShape: "squircle",
                        WebkitCornerShape: "squircle",
                      } as React.CSSProperties}
                    >
                      {/* Top bar */}
                      <div className="flex items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="sm:hidden inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-semibold"
                            style={{
                              background: isActive ? "#d2fb95" : "#f2f2f0",
                              color: "#202124",
                            }}
                          >
                            {step.number}
                          </span>
                          <span className="text-[11px] uppercase tracking-[0.06em] font-medium text-black/50">
                            {step.phase}
                          </span>
                          {isActive && (
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                              style={{ background: "#d2fb95", color: "#202124" }}
                            >
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-[22px] font-medium leading-[1.2] tracking-[-0.025em] text-[#202124] mb-2">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] leading-[1.6] text-black/60 font-normal m-0 mb-3.5">
                        {step.description}
                      </p>

                      {/* Compact Deliverable Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {step.deliverables.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#f2f2f0] text-[#51565c]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Mobile/Tablet inline flat visual (desktop shows sticky visual panel) */}
                      <div className="lg:hidden mt-5 rounded-[16px] bg-[#f2f2f0] border border-black/[0.06] p-3.5">
                        {step.renderVisual()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (Desktop): Sticky Interactive Visual Stage */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-24">
            <div
              className="rounded-[22px] bg-[#f2f2f0] border border-black/[0.08] p-6"
              style={{
                cornerShape: "squircle",
                WebkitCornerShape: "squircle",
              } as React.CSSProperties}
            >
              {/* Top Interactive Step Tabs + Prev/Next */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div
                  className="flex items-center gap-1 rounded-xl p-1 bg-white border border-black/[0.07]"
                  role="tablist"
                  aria-label="Process phases"
                >
                  {PROCESS_STEPS.map((step, idx) => {
                    const isActive = idx === activeStep;
                    return (
                      <button
                        key={step.number}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => selectStep(idx, true)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[#202124] text-white"
                            : "text-[#51565c] hover:text-[#202124] hover:bg-[#f2f2f0]/70"
                        }`}
                      >
                        <span className={isActive ? "text-[#d2fb95]" : "text-black/40"}>
                          {step.number}
                        </span>
                        <span>{step.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => selectStep(activeStep - 1, true)}
                    disabled={activeStep === 0}
                    aria-label="Previous phase"
                    className="w-8 h-8 rounded-full bg-white border border-black/[0.08] text-[#202124] hover:bg-[#202124] hover:text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => selectStep(activeStep + 1, true)}
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    aria-label="Next phase"
                    className="w-8 h-8 rounded-full bg-white border border-black/[0.08] text-[#202124] hover:bg-[#202124] hover:text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Smooth Scroll Progress Bar */}
              <div className="w-full h-[3px] rounded-full bg-black/[0.07] overflow-hidden mb-5">
                <div
                  className="h-full rounded-full transition-[width] duration-150 ease-out"
                  style={{
                    width: `${Math.round(25 + scrollProgress * 75)}%`,
                    background: "#62abe0",
                  }}
                />
              </div>

              {/* Animated Visual Stage (scroll-driven crossfade + directional glide) */}
              <div className="grid items-center min-h-[310px] overflow-hidden">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = idx === activeStep;
                  const isBefore = idx < activeStep;
                  return (
                    <div
                      key={step.number}
                      aria-hidden={!isActive}
                      className={`[grid-area:1/1] w-full transition-all duration-300 ease-out ${
                        isActive
                          ? "opacity-100 translate-y-0 z-10 pointer-events-auto"
                          : isBefore
                          ? "opacity-0 -translate-y-4 z-0 pointer-events-none"
                          : "opacity-0 translate-y-4 z-0 pointer-events-none"
                      }`}
                    >
                      {step.renderVisual()}
                    </div>
                  );
                })}
              </div>

              {/* Stage Footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-black/[0.07]">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
                  style={{ background: "#d2fb95", color: "#202124" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                  <span>{current.milestone}</span>
                </span>

                <span className="text-[12px] font-medium text-[#51565c] tabular-nums">
                  {current.number} / 0{PROCESS_STEPS.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Consultation Link */}
        <div data-aos="fade-up" className="mt-12 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm text-black/55 m-0 inline-flex flex-wrap items-center justify-center gap-2">
            <span>Working with a tight deadline or tricky stack?</span>
            <button
              type="button"
              onClick={onOpenContact}
              className="group inline-flex items-center gap-1 text-black font-semibold underline underline-offset-4 hover:text-black/75 transition-colors cursor-pointer"
            >
              <span>Talk directly with our leads</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
