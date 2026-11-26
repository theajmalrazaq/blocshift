"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { PortfolioComponentVisualId, PortfolioVisualSpec } from "@/data/portfolioItems";
import {
  Visual02AIAgents,
  Visual03DesignSystems,
  Visual05Telemetry,
} from "@/components/ServicesVisuals";
import {
  ProcessVisual01Scope,
  ProcessVisual02Design,
  ProcessVisual03Sprints,
  ProcessVisual04Launch,
} from "@/components/ProcessVisuals";
import {
  MealCircleBrandCard,
  MealCircleBrandHero,
} from "@/components/MealCircleBrandShowcase";
import {
  EvenlyBrandCard,
  EvenlyBrandHero,
} from "@/components/EvenlyBrandShowcase";

const INK = "#202124";
const MUTED = "#51565c";
const SURFACE = "#f2f2f0";
const LIME = "#d2fb95";
const SKY_SOFT = "#eaf4fc";
const WHITE = "#ffffff";
const LINE = "rgba(32, 33, 36, 0.09)";

function SupportTriageVisual() {
  const tickets = [
    {
      id: "#4821",
      subject: "Order shipment delay check",
      action: "Verified tracking · Auto-drafted",
      status: "Ready",
      bg: LIME,
    },
    {
      id: "#4822",
      subject: "Enterprise seat refund request",
      action: "Outside 14d window · Escalated",
      status: "Human Review",
      bg: SKY_SOFT,
    },
    {
      id: "#4823",
      subject: "Invoice PDF resend · Acme Corp",
      action: "Matched Stripe charge · Sent",
      status: "Resolved",
      bg: SURFACE,
    },
  ];

  return (
    <div className="w-full max-w-[440px] flex flex-col gap-2.5 select-none">
      <div
        className="rounded-xl px-4 py-3 flex items-center justify-between"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        <div>
          <div className="text-[12px] sm:text-[13px] font-medium" style={{ color: INK }}>
            Policy-Grounded Support Queue
          </div>
          <div className="text-[11px]" style={{ color: MUTED }}>
            Read-only DB lookup · Strict refund guards
          </div>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold flex-shrink-0"
          style={{ background: LIME, color: INK }}
        >
          70% Faster
        </span>
      </div>

      {tickets.map((t) => (
        <div
          key={t.id}
          className="rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="min-w-0">
            <div className="text-[12px] font-medium truncate" style={{ color: INK }}>
              <span style={{ color: MUTED }}>{t.id}</span> · {t.subject}
            </div>
            <div className="text-[11px] truncate" style={{ color: MUTED }}>
              {t.action}
            </div>
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-medium flex-shrink-0"
            style={{ background: t.bg, color: INK }}
          >
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function InteractiveTokenPlayground({ interactive }: { interactive: boolean }) {
  const [accentMode, setAccentMode] = useState<"lime" | "sky" | "ink">("lime");

  const badgeBg =
    accentMode === "lime" ? LIME : accentMode === "sky" ? SKY_SOFT : INK;
  const badgeInk = accentMode === "ink" ? WHITE : INK;

  if (!interactive) {
    return <Visual03DesignSystems />;
  }

  return (
    <div className="w-full max-w-[520px] flex flex-col gap-3 select-none">
      <div
        className="rounded-2xl p-4 sm:p-5"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4" style={{ borderBottom: `1px solid ${LINE}` }}>
          <div>
            <div className="text-[13px] font-medium" style={{ color: INK }}>
              Token Contrast Lab
            </div>
            <div className="text-[11px]" style={{ color: MUTED }}>
              Click an accent token to test live UI state
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {(["lime", "sky", "ink"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAccentMode(mode)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium capitalize transition-colors cursor-pointer"
                style={{
                  background: accentMode === mode ? INK : SURFACE,
                  color: accentMode === mode ? WHITE : INK,
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span
              className="rounded-full px-3.5 py-1.5 text-[12px] font-medium inline-flex items-center gap-1.5 transition-colors"
              style={{ background: badgeBg, color: badgeInk }}
            >
              <span>Ship Release</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: badgeInk }} />
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ background: SURFACE, color: MUTED }}
            >
              AA Contrast Passed
            </span>
          </div>

          <div className="text-[11px]" style={{ color: MUTED }}>
            Token: <strong style={{ color: INK }}>--accent-{accentMode}</strong>
          </div>
        </div>
      </div>

      <Visual03DesignSystems />
    </div>
  );
}

function InteractiveProcessRailVisual({ interactive }: { interactive: boolean }) {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  if (!interactive) {
    return (
      <div className="w-full max-w-[420px] scale-[0.9] origin-center">
        <ProcessVisual01Scope />
      </div>
    );
  }

  const labels = ["01 Scope", "02 Design", "03 Sprints", "04 Launch"];

  return (
    <div className="w-full max-w-[540px] flex flex-col gap-3">
      <div
        className="rounded-full p-1 inline-flex items-center gap-1 self-center flex-wrap justify-center"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        {labels.map((label, idx) => {
          const active = stage === idx;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setStage(idx as 0 | 1 | 2 | 3)}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer"
              style={{
                background: active ? INK : "transparent",
                color: active ? WHITE : MUTED,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {stage === 0 && <ProcessVisual01Scope />}
      {stage === 1 && <ProcessVisual02Design />}
      {stage === 2 && <ProcessVisual03Sprints />}
      {stage === 3 && <ProcessVisual04Launch />}
    </div>
  );
}

function MatrixWordmarkExperiment({ interactive }: { interactive: boolean }) {
  const [highlightCol, setHighlightCol] = useState<number | null>(null);
  const cols = 12;
  const rows = 4;

  return (
    <div className="w-full max-w-[560px] rounded-2xl p-5 sm:p-6 select-none" style={{ background: WHITE, border: `1px solid ${LINE}` }}>
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="text-[12px] font-medium" style={{ color: INK }}>
          BLOCSHIFT · MATRIX-03
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
          style={{ background: LIME, color: INK }}
        >
          {interactive ? "Hover grid cells" : "Vector Grid"}
        </span>
      </div>

      <div
        className="grid gap-1.5 sm:gap-2 p-3 rounded-xl"
        style={{
          background: SURFACE,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
        onMouseLeave={() => setHighlightCol(null)}
      >
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const isChecker = (row + col) % 2 === 0;
          const isHoveredCol = highlightCol === col;
          const bg = isHoveredCol ? LIME : isChecker ? INK : WHITE;
          return (
            <div
              key={idx}
              onMouseEnter={() => interactive && setHighlightCol(col)}
              className="aspect-square rounded-[4px] transition-colors duration-150"
              style={{
                background: bg,
                border: isChecker ? "none" : `1px solid ${LINE}`,
              }}
            />
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px]" style={{ color: MUTED }}>
        <span>48 procedural tiles</span>
        <span>Zero raster assets</span>
      </div>
    </div>
  );
}

function renderComponentVisual(visualId: PortfolioComponentVisualId, variant: "card" | "hero") {
  const interactive = variant === "hero";

  switch (visualId) {
    case "ai-lead-followup":
      return <Visual02AIAgents />;
    case "ai-support-triage":
      return <SupportTriageVisual />;
    case "ai-pipeline-telemetry":
      return <Visual05Telemetry />;
    case "exp-token-playground":
      return <InteractiveTokenPlayground interactive={interactive} />;
    case "exp-process-rail":
      return <InteractiveProcessRailVisual interactive={interactive} />;
    case "exp-ascii-canvas":
      return <MatrixWordmarkExperiment interactive={interactive} />;
    default:
      return <Visual02AIAgents />;
  }
}

export function PortfolioVisual({
  visual,
  variant = "card",
  priority = false,
}: {
  visual: PortfolioVisualSpec;
  variant?: "card" | "hero";
  priority?: boolean;
}) {
  if (visual.kind === "component" && visual.visualId === "brand-meal-circle") {
    return variant === "hero" ? (
      <MealCircleBrandHero />
    ) : (
      <MealCircleBrandCard />
    );
  }

  if (visual.kind === "component" && visual.visualId === "brand-evenly") {
    return variant === "hero" ? (
      <EvenlyBrandHero />
    ) : (
      <EvenlyBrandCard />
    );
  }

  if (visual.kind === "image") {
    if (variant === "hero") {
      return (
        <div
          className="relative w-full overflow-hidden rounded-[20px]"
          style={{
            background: SURFACE,
            border: "1px solid rgba(32, 33, 36, 0.11)",
          }}
        >
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 1120px"
            className="w-full h-auto max-h-[760px] object-cover object-top block"
          />
        </div>
      );
    }

    return (
      <div
        className="relative w-full aspect-[16/10] overflow-hidden rounded-[12px]"
        style={{
          background: SURFACE,
          border: "1px solid rgba(32, 33, 36, 0.08)",
        }}
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={
        variant === "hero"
          ? "w-full min-h-[320px] sm:min-h-[420px] rounded-[20px] px-5 py-8 sm:px-10 sm:py-12 flex items-center justify-center"
          : "w-full aspect-[16/10] rounded-[12px] px-3 py-3 sm:px-4 sm:py-4 flex items-center justify-center overflow-hidden"
      }
      style={{
        background: "linear-gradient(180deg, #f2f2f0 0%, #eaf4fc 100%)",
        border:
          variant === "hero"
            ? "1px solid rgba(32, 33, 36, 0.11)"
            : "1px solid rgba(32, 33, 36, 0.08)",
      }}
    >
      {renderComponentVisual(visual.visualId, variant)}
    </div>
  );
}
