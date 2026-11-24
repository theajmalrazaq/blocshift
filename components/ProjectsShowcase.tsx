"use client";

import React, {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import { SHOWCASE_PROJECTS, ShowcaseProject } from "@/data/projects";

const TOTAL = SHOWCASE_PROJECTS.length;

export default function ProjectsShowcase() {
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  // Mouse & touch drag tracking
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTargetRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Enlarged lightbox state
  const [modalProject, setModalProject] = useState<ShowcaseProject | null>(null);

  // Continuous interpolation refs
  const targetFloatRef = useRef(0);
  const smoothFloatRef = useRef(0);
  const activeIndexRef = useRef(0);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const wakeRef = useRef<(() => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth, { passive: true });
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (prevIndex !== null) {
      const timer = setTimeout(() => setPrevIndex(null), 400);
      return () => clearTimeout(timer);
    }
  }, [prevIndex]);

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

  // Flat browser-card dimensions (no tilted arc, no gray 3D laptop slabs)
  const cardWidth = isMobile ? 286 : isTablet ? 400 : 480;
  const cardHeight = Math.round(cardWidth * 0.65);
  const spreadFactor = isMobile ? 1.08 : isTablet ? 1.12 : 1.12;

  const place = useCallback(
    (value: number) => {
      const cards = cardsRef.current;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (!card) continue;

        let delta = i - value;
        if (delta > TOTAL / 2) delta -= TOTAL;
        if (delta < -TOTAL / 2) delta += TOTAL;
        const dist = Math.abs(delta);

        if (dist > 2.6) {
          card.style.visibility = "hidden";
          card.style.pointerEvents = "none";
          continue;
        }

        const x = delta * (cardWidth * spreadFactor);
        const taper = Math.exp(-Math.pow(dist * 1.1, 2));
        const scale = 0.86 + 0.14 * taper;
        const y = (1 - taper) * 14;
        const opacity = Math.max(0, 1 - Math.max(0, dist - 1.1) * 0.65);

        card.style.visibility = "visible";
        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(Math.round(50 - dist * 10));
        card.style.pointerEvents = dist < 1.35 ? "auto" : "none";
      }
    },
    [cardWidth, spreadFactor]
  );

  useEffect(() => {
    function tick() {
      const diff = targetFloatRef.current - smoothFloatRef.current;

      if (Math.abs(diff) < 0.001) {
        smoothFloatRef.current = targetFloatRef.current;
        place(smoothFloatRef.current);
        rafRef.current = null;
        return;
      }

      smoothFloatRef.current += diff * 0.22;
      place(smoothFloatRef.current);

      if (isDraggingRef.current) {
        const centerIndex = Math.min(
          TOTAL - 1,
          Math.max(0, Math.round(smoothFloatRef.current))
        );

        if (centerIndex !== activeIndexRef.current) {
          const prev = activeIndexRef.current;
          activeIndexRef.current = centerIndex;
          startTransition(() => {
            setPrevIndex(prev);
            setActiveIndex(centerIndex);
          });
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    function wake() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    wakeRef.current = wake;
    wake();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [place]);

  const goToProject = useCallback((targetIndex: number) => {
    const clamped = Math.min(TOTAL - 1, Math.max(0, targetIndex));
    targetFloatRef.current = clamped;
    if (wakeRef.current) wakeRef.current();

    if (clamped === activeIndexRef.current) return;

    const prev = activeIndexRef.current;
    activeIndexRef.current = clamped;
    setPrevIndex(prev);
    setActiveIndex(clamped);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) {
        if (e.key === "Escape") {
          setModalProject(null);
        }
        return;
      }

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        goToProject(activeIndexRef.current - 1);
      } else if (e.key === "ArrowRight") {
        goToProject(activeIndexRef.current + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalProject, goToProject]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTargetRef.current = targetFloatRef.current;
    hasMovedRef.current = false;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (!hasMovedRef.current) {
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        hasMovedRef.current = true;
        setIsDragging(true);
      } else if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
        isDraggingRef.current = false;
        return;
      }
    }

    if (hasMovedRef.current) {
      const dragFactor = isMobile ? 160 : 240;
      const nextTarget = startTargetRef.current - dx / dragFactor;
      targetFloatRef.current = Math.min(TOTAL - 1, Math.max(0, nextTarget));
      if (wakeRef.current) wakeRef.current();
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

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

  const onPointerCancel = (e: React.PointerEvent) => {
    try {
      if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  };

  const handleCardClick = (idx: number) => {
    if (hasMovedRef.current) return;
    if (idx === activeIndexRef.current) {
      setModalProject(SHOWCASE_PROJECTS[idx]);
    } else {
      goToProject(idx);
    }
  };

  return (
    <section
      id="case-studies"
      className="relative bg-white py-20 sm:py-24 md:py-28 overflow-hidden select-none isolate border-b border-black/[0.06]"
    >
      {/* Subtle Brand Dot Grid matching site canvas */}
      <div
        className="pointer-events-none select-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 flex flex-col items-center">
        {/* Section Heading */}
        <div className="wrap flex-shrink-0 text-center mb-10 sm:mb-12">
          <span className="inline-block text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3 reveal-on-scroll">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0 reveal-on-scroll">
            Shipped so far.
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-[17px] leading-[1.6] text-black/55 font-normal mx-auto max-w-[560px] reveal-on-scroll reveal-delay-100">
            Built for real impact — selected platforms, digital products, and experiences.
          </p>
        </div>

        {/* Flat Interactive Project Carousel Stage */}
        <div className="relative w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
          {/* Horizontal Flat Image Rail */}
          <div
            ref={cardsContainerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            className={`relative w-full flex items-center justify-center flex-shrink-0 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              height: `${cardHeight + 16}px`,
              touchAction: "pan-y",
            }}
          >
            {SHOWCASE_PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  ref={(el) => {
                    if (el) cardsRef.current[idx] = el;
                  }}
                  type="button"
                  data-card-idx={idx}
                  onClick={() => handleCardClick(idx)}
                  aria-label={`View project ${proj.number}: ${proj.title}`}
                  className="group absolute top-2 left-1/2 overflow-hidden cursor-pointer hover:cursor-zoom-in focus-visible:outline-2 focus-visible:outline-black will-change-[transform,opacity] bg-transparent border-0 p-0"
                  style={{
                    width: `${cardWidth}px`,
                    height: `${cardHeight}px`,
                    marginLeft: `${-cardWidth / 2}px`,
                    borderRadius: "14px",
                  }}
                >
                  <Image
                    src={proj.image}
                    alt={`${proj.title} preview`}
                    fill
                    sizes="(max-width: 640px) 320px, 520px"
                    quality={75}
                    className="object-cover object-top pointer-events-none select-none"
                    priority={idx <= 2}
                  />

                  {/* Subtle Flat Enlarge Pill on Hover */}
                  <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 border border-black/[0.12] text-[#202124] text-[11px] font-medium whitespace-nowrap z-30">
                    <ZoomIn className="w-3 h-3 text-[#202124]" />
                    <span>Preview</span>
                  </div>
                </button>
            ))}
          </div>

          {/* Active Project Description */}
          <div className="relative z-30 w-full max-w-[540px] mt-7 sm:mt-9 text-center">
            <div className="grid-stack w-full">
              {SHOWCASE_PROJECTS.map((proj, idx) => {
                const isCurrent = idx === activeIndex;
                const isPrev = idx === prevIndex;
                if (!isCurrent && !isPrev) return null;

                const animClass = isCurrent
                  ? "animate-caption-in z-10 pointer-events-auto"
                  : "animate-caption-out z-0 pointer-events-none";

                return (
                  <div
                    key={proj.id}
                    className={`w-full will-change-[transform,opacity] ${animClass}`}
                  >
                    {/* Index & Category Pill */}
                    <div className="flex items-center justify-center mb-3">
                      <span
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tabular-nums border border-black/[0.08]"
                        style={{ background: "#f2f2f0", color: "#202124" }}
                      >
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{ background: "#d2fb95", color: "#202124" }}
                        >
                          {proj.number} / {String(TOTAL).padStart(2, "0")}
                        </span>
                        <span className="text-[#51565c]">{proj.category}</span>
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-[26px] font-medium leading-[1.12] tracking-[-0.03em] text-[#202124] m-0 text-center">
                      {proj.title}
                    </h3>

                    {/* Problem & Solution */}
                    <div className="mt-4 pt-3.5 border-t border-black/[0.07] space-y-2.5 text-center max-w-[460px] mx-auto">
                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] text-black/40 mb-0.5">
                          Problem
                        </span>
                        <p className="text-xs sm:text-[13px] leading-[1.6] text-black/60 font-normal m-0">
                          {proj.problem}
                        </p>
                      </div>

                      <div>
                        <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] text-[#202124] mb-0.5">
                          Solution
                        </span>
                        <p className="text-xs sm:text-[13px] leading-[1.6] text-black/85 font-normal m-0">
                          {proj.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Portfolio Button */}
            <div className="mt-5 sm:mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setModalProject(SHOWCASE_PROJECTS[activeIndex])}
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-[#202124] hover:bg-neutral-800 text-white font-semibold text-[14px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
                aria-label={`View portfolio for ${SHOWCASE_PROJECTS[activeIndex]?.title || "project"}`}
              >
                <span>Open full preview</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Unified Flat Navigation Pill & Progress Scrubber */}
        <div className="relative z-20 wrap mt-8 sm:mt-10 flex flex-col items-center gap-2.5">
          <div className="inline-flex items-center gap-3 rounded-full bg-[#f2f2f0] border border-black/[0.08] p-1.5">
            <button
              type="button"
              onClick={() => goToProject(activeIndexRef.current - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                activeIndex === 0
                  ? "bg-transparent text-black/25 cursor-default"
                  : "bg-white text-[#202124] border border-black/[0.09] hover:bg-[#202124] hover:text-white cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>

            <div className="flex items-center gap-3 px-1">
              {/* Interactive continuous progress track */}
              <div
                className="relative w-[140px] sm:w-[220px] h-[5px] rounded-full bg-black/[0.08] overflow-hidden flex"
                role="tablist"
                aria-label="Project sequence"
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 rounded-full transition-[width] duration-300 ease-out"
                  style={{
                    width: `${Math.round(((activeIndex + 1) / TOTAL) * 100)}%`,
                    background: "#62abe0",
                  }}
                />
                {SHOWCASE_PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Go to project ${proj.number}: ${proj.title}`}
                    onClick={() => goToProject(idx)}
                    className="relative z-10 flex-1 h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
                  />
                ))}
              </div>

              <span className="text-[11px] font-medium text-[#51565c] tabular-nums pr-0.5 select-none">
                {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => goToProject(activeIndexRef.current + 1)}
              disabled={activeIndex === TOTAL - 1}
              aria-label="Next project"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                activeIndex === TOTAL - 1
                  ? "bg-transparent text-black/25 cursor-default"
                  : "bg-white text-[#202124] border border-black/[0.09] hover:bg-[#202124] hover:text-white cursor-pointer"
              }`}
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          <div className="text-[11px] text-black/40 text-center select-none">
            Drag, click cards, or use arrows to browse
          </div>
        </div>
      </div>

      {/* Pure Image Lightbox Preview */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-black/80 cursor-zoom-out select-none"
          onClick={() => setModalProject(null)}
        >
          <button
            type="button"
            onClick={() => setModalProject(null)}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full bg-white text-[#202124] hover:bg-[#f2f2f0] flex items-center justify-center transition-colors cursor-pointer z-50 focus:outline-none"
            aria-label="Close enlarged preview"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-5xl max-h-[84vh] aspect-[16/10] rounded-[14px] overflow-hidden pointer-events-none">
            <Image
              src={modalProject.image}
              alt={modalProject.title}
              fill
              sizes="(max-width: 1024px) 96vw, 1200px"
              className="object-cover object-top select-none"
              priority
              unoptimized
            />
          </div>
        </div>
      )}
    </section>
  );
}
