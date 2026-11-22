"use client";

import React, { startTransition, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, X, ZoomIn } from "lucide-react";
import { SHOWCASE_PROJECTS, ShowcaseProject } from "@/data/projects";
import AsciiClouds from "./AsciiClouds";

const TOTAL = SHOWCASE_PROJECTS.length;
// Calibrated scroll runway for super smooth, responsive rotation with Lenis
const VH_PER_PROJECT = 16;

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const programmaticScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  // Mouse drag rotation tracking
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startTargetRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Big preview modal state
  const [modalProject, setModalProject] = useState<ShowcaseProject | null>(null);

  // High-performance continuous interpolation refs
  const targetFloatRef = useRef(0);
  const smoothFloatRef = useRef(0);
  const activeIndexRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [viewportWidth, setViewportWidth] = useState(1440);

  // Track viewport width
  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth, { passive: true });
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Clear previous index after caption exit transition
  useEffect(() => {
    if (prevIndex !== null) {
      const timer = setTimeout(() => setPrevIndex(null), 400);
      return () => clearTimeout(timer);
    }
  }, [prevIndex]);

  // Handle Escape key to close big preview modal
  useEffect(() => {
    if (!modalProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalProject]);

  // Responsive geometry
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  const cardWidth = isMobile ? 200 : isTablet ? 250 : 290;
  const cardHeight = Math.round(cardWidth * 0.73);
  const angleStepDeg = isMobile ? 15 : 13.5;
  const spreadFactor = isMobile ? 1.2 : isTablet ? 1.25 : 1.3;
  const dropFactor = isMobile ? 30 : 38;

  // Apply card transforms directly on DOM elements for 60-120fps buttery motion
  const applyCardTransforms = useCallback(
    (floatIdx: number) => {
      const cardsEl = cardsContainerRef.current;
      if (!cardsEl) return;

      const cards = cardsEl.querySelectorAll<HTMLElement>("[data-card-idx]");
      cards.forEach((card) => {
        const idx = Number(card.dataset.cardIdx);

        // Circular delta
        let delta = idx - floatIdx;
        if (delta > TOTAL / 2) delta -= TOTAL;
        if (delta < -TOTAL / 2) delta += TOTAL;

        const dist = Math.abs(delta);

        const thetaDeg = delta * angleStepDeg;
        const x = delta * (cardWidth * spreadFactor);
        const y = Math.pow(dist, 1.7) * dropFactor;
        const rotateZ = thetaDeg;

        // Far-away cards remain positioned along arc offscreen so they don't pop when entering
        if (dist > 3.8) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.visibility = "hidden";
          card.style.filter = "blur(8px)";
          card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotateZ(${rotateZ.toFixed(2)}deg) scale(0.65)`;
          return;
        }

        card.style.visibility = "visible";

        // Perfectly continuous Gaussian scale curve (zero cliffs, zero snap, 100% fluid)
        // Center card peaks at 1.20, smoothly tapering down to 0.83 at dist=1 and 0.72 at sides
        const centerTaper = Math.exp(-Math.pow(dist * 1.15, 2));
        const scale = 0.73 + 0.47 * centerTaper - Math.min(dist * 0.025, 0.06);

        const opacity = Math.max(0, 1 - Math.max(0, dist - 1.8) * 0.55);
        const zIndex = Math.round(50 - dist * 10);

        // Smooth continuous depth blur that hits 0 smoothly at center with zero abrupt steps
        const rawBlur = Math.max(0, (dist - 0.3) * 2.5);
        const blurPx = Math.min(4.5, rawBlur);
        card.style.filter = blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px)` : "none";

        // Clean flat arc transform without 3D depth tilt
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(zIndex);
        card.style.pointerEvents = dist < 1.4 ? "auto" : "none";

        // Completely removed shadow and border
        card.style.boxShadow = "none";
      });
    },
    [cardWidth, spreadFactor, dropFactor, angleStepDeg, isMobile]
  );

  // rAF loop: continuous smooth motion follower with non-blocking React transitions
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;

      const target = targetFloatRef.current;
      const current = smoothFloatRef.current;
      const diff = target - current;

      // Pure continuous exponential follower — silky, uninterrupted motion
      smoothFloatRef.current += diff * 0.22;

      applyCardTransforms(smoothFloatRef.current);

      // Synchronize description text to center card concurrently without blocking animation frames
      const centerIndex = Math.min(
        TOTAL - 1,
        Math.max(0, Math.round(smoothFloatRef.current))
      );

      if (centerIndex !== activeIndexRef.current) {
        const prev = activeIndexRef.current;
        activeIndexRef.current = centerIndex;
        const dir = centerIndex >= prev ? "next" : "prev";
        // Non-blocking concurrent transition in React 19 keeps rAF running at uninterrupted 60/120fps
        startTransition(() => {
          setDirection(dir);
          setPrevIndex(prev);
          setActiveIndex(centerIndex);
        });
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [applyCardTransforms]);

  // Navigate to any project index
  const goToProject = useCallback(
    (targetIndex: number) => {
      const clamped = Math.min(TOTAL - 1, Math.max(0, targetIndex));
      targetFloatRef.current = clamped;

      const dir = clamped >= activeIndexRef.current ? "next" : "prev";
      setDirection(dir);
      setPrevIndex(activeIndexRef.current);
      setActiveIndex(clamped);
      activeIndexRef.current = clamped;

      // Lock scroll listener temporarily during programmatic jump
      isProgrammaticScrollRef.current = true;
      if (programmaticScrollTimerRef.current) {
        clearTimeout(programmaticScrollTimerRef.current);
      }
      programmaticScrollTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 450);

      // Sync window scrollbar position
      const section = sectionRef.current;
      if (section) {
        const scrollableDistance = section.offsetHeight - window.innerHeight;
        const targetProgress = TOTAL > 1 ? clamped / (TOTAL - 1) : 0;
        const targetY = section.offsetTop + targetProgress * scrollableDistance;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      }
    },
    []
  );

  // Mouse drag handlers on carousel stage
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startTargetRef.current = targetFloatRef.current;
    hasMovedRef.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 5) {
      hasMovedRef.current = true;
      setIsDragging(true);
      const dragFactor = isMobile ? 150 : 230;
      const nextTarget = startTargetRef.current - dx / dragFactor;
      targetFloatRef.current = Math.min(TOTAL - 1, Math.max(0, nextTarget));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (hasMovedRef.current) {
      const nearest = Math.min(
        TOTAL - 1,
        Math.max(0, Math.round(targetFloatRef.current))
      );
      goToProject(nearest);
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 120);
    } else {
      // It was a direct click on a card!
      const targetCard = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-card-idx]"
      );
      if (targetCard) {
        const idx = Number(targetCard.dataset.cardIdx);
        if (!isNaN(idx)) {
          if (idx === activeIndexRef.current) {
            setModalProject(SHOWCASE_PROJECTS[idx]);
          } else {
            goToProject(idx);
          }
        }
      }
    }
  };

  const onPointerCancel = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  };

  // Card click fallback
  const handleCardClick = (idx: number) => {
    if (hasMovedRef.current) return;
    if (idx === activeIndex) {
      setModalProject(SHOWCASE_PROJECTS[idx]);
    } else {
      goToProject(idx);
    }
  };

  // Continuous, robust document scroll listener driven by Lenis
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      if (rect.top > 0) {
        targetFloatRef.current = 0;
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollableDistance);
      const progress = scrolled / scrollableDistance;
      const continuousTarget = progress * (TOTAL - 1);

      targetFloatRef.current = Math.min(
        TOTAL - 1,
        Math.max(0, continuousTarget)
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollProgress = TOTAL > 1 ? activeIndex / (TOTAL - 1) : 0;

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative bg-white"
      style={{ height: `${TOTAL * VH_PER_PROJECT + 60}vh` }}
    >
      {/* Pinned Sticky Stage with Clean White Background */}
      <div
        ref={containerRef}
        className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden select-none isolate bg-white"
      >
        {/* Interactive Floating ASCII Clouds Canvas */}
        <AsciiClouds />

        {/* Top Scroll Progress Hairline */}
        <div className="relative z-10 w-full h-[2px] bg-black/[0.05] flex-shrink-0">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{
              width: `${Math.max(100 / TOTAL, scrollProgress * 100)}%`,
            }}
          />
        </div>

        {/* Section Heading */}
        <div className="relative z-20 wrap pt-5 sm:pt-7 flex-shrink-0 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.1] tracking-[-0.03em] text-black m-0 reveal-on-scroll">
            Shipped so far
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm leading-[1.55] text-black/55 font-normal mx-auto reveal-on-scroll reveal-delay-100">
            Selected platforms, digital products, and experiences engineered for impact.
          </p>
        </div>

        {/* 3D Arc Carousel + Center-Aligned Description */}
        <div className="relative z-20 flex-1 min-h-0 w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
          {/* 3D Circular Arc Carousel with Mouse Drag Rotation */}
          <div
            ref={cardsContainerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            className={`relative w-full flex items-center justify-center flex-shrink-0 touch-none select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              height: `${cardHeight + (isMobile ? 32 : 52)}px`,
            }}
          >
            {SHOWCASE_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                data-card-idx={idx}
                onClick={() => handleCardClick(idx)}
                aria-label={`View project ${proj.number}: ${proj.title}`}
                className="group absolute top-0 left-1/2 overflow-hidden cursor-pointer hover:cursor-zoom-in focus-visible:outline-2 focus-visible:outline-black will-change-[transform,filter,opacity] bg-transparent border-0 shadow-none"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `${-cardWidth / 2}px`,
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "none",
                } as React.CSSProperties}
              >
                <Image
                  src={proj.mockup}
                  alt={`${proj.title} MacBook Pro mockup`}
                  fill
                  sizes="(max-width: 640px) 240px, 340px"
                  className="object-cover pointer-events-none select-none transition-transform duration-300 group-hover:scale-[1.02]"
                  priority={idx <= 2}
                  unoptimized
                />

                {/* Click to enlarge floating badge */}
                <div className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-black/80 backdrop-blur-md text-white text-[11px] font-medium shadow-md whitespace-nowrap z-30">
                  <ZoomIn className="w-3.5 h-3.5 text-white/90" />
                  <span>Click to enlarge</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Project Description — directional optical blur & slide transition */}
          <div className="relative z-30 w-full max-w-[540px] mt-5 sm:mt-7 text-center">
            <div className="grid-stack w-full">
              {SHOWCASE_PROJECTS.map((proj, idx) => {
                const isCurrent = idx === activeIndex;
                const isPrev = idx === prevIndex;
                if (!isCurrent && !isPrev) return null;

                const animClass = isCurrent
                  ? direction === "next"
                    ? "animate-caption-in-next z-10 pointer-events-auto"
                    : "animate-caption-in-prev z-10 pointer-events-auto"
                  : direction === "next"
                  ? "animate-caption-out-next z-0 pointer-events-none"
                  : "animate-caption-out-prev z-0 pointer-events-none";

                return (
                  <div
                    key={proj.id}
                    className={`w-full will-change-[transform,opacity,filter] ${animClass}`}
                  >
                    {/* Index Pill — centered */}
                    <div className="flex items-center justify-center mb-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[14px] bg-black text-white text-[11px] sm:text-xs font-medium tabular-nums shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
                        <span>{proj.number}</span>
                        <span className="text-white/35">/</span>
                        <span className="text-white/65">
                          {String(TOTAL).padStart(2, "0")}
                        </span>
                      </span>
                    </div>

                    {/* Project Title */}
                    <h2 className="text-xl sm:text-[26px] font-medium leading-[1.12] tracking-[-0.03em] text-black m-0 text-center">
                      {proj.title}
                    </h2>

                    {/* Problem & Solution */}
                    <div className="mt-3 sm:mt-3.5 pt-3 border-t border-black/[0.07] space-y-2.5 text-center max-w-[460px] mx-auto">
                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40 mb-0.5">
                          Problem
                        </span>
                        <p className="text-xs sm:text-[13px] leading-[1.6] text-black/60 font-normal m-0">
                          {proj.problem}
                        </p>
                      </div>

                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-black/85 mb-0.5">
                          Solution
                        </span>
                        <p className="text-xs sm:text-[13px] leading-[1.6] text-black/90 font-normal m-0">
                          {proj.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Portfolio Button — exact match to Hero CTA button styling */}
            <div className="mt-4 sm:mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setModalProject(SHOWCASE_PROJECTS[activeIndex])}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[14px] bg-black hover:bg-neutral-900 text-white font-semibold text-[15px] transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-black"
                aria-label={`View portfolio for ${SHOWCASE_PROJECTS[activeIndex]?.title || "project"}`}
              >
                <span>View portfolio</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Project Sequence Dot Rail */}
        <div className="relative z-20 wrap pb-3 sm:pb-5 flex-shrink-0">
          <div
            className="w-full max-w-2xl mx-auto flex items-center gap-1.5"
            role="tablist"
            aria-label="Project sequence"
          >
            {SHOWCASE_PROJECTS.map((proj, idx) => {
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to project ${proj.number}: ${proj.title}`}
                  onClick={() => goToProject(idx)}
                  className="group/dot flex-1 py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
                >
                  <span
                    className={`block h-[3px] rounded-full transition-colors duration-300 ease-out ${
                      isActive
                        ? "bg-black"
                        : isPast
                        ? "bg-black/25 group-hover/dot:bg-black/50"
                        : "bg-black/8 group-hover/dot:bg-black/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pure Image Enlarged Lightbox — Zero Card Containers */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/85 backdrop-blur-md cursor-zoom-out select-none transition-opacity duration-200 animate-in fade-in"
          onClick={() => setModalProject(null)}
        >
          {/* Subtle Close Button in Top-Right */}
          <button
            type="button"
            onClick={() => setModalProject(null)}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50 focus:outline-none"
            aria-label="Close enlarged preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Pure Image Only — Less Rounded, Zero Shadow & Zero Border */}
          <div
            className="relative w-full max-w-5xl max-h-[86vh] aspect-[4/3] rounded-[12px] sm:rounded-[14px] overflow-hidden flex items-center justify-center pointer-events-none"
          >
            <Image
              src={modalProject.mockup}
              alt={modalProject.title}
              fill
              sizes="(max-width: 1024px) 96vw, 1300px"
              className="object-cover select-none"
              priority
              unoptimized
            />
          </div>
        </div>
      )}
    </section>
  );
}
