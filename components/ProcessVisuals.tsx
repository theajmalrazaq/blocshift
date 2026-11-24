"use client";

import React, { useState } from "react";

/* ─── Blocshift Brand Tokens ─── */
const INK = "#202124";
const MUTED = "#51565c";
const SURFACE = "#f2f2f0";
const LIME = "#d2fb95";
const SKY = "#62abe0";
const SKY_SOFT = "#eaf4fc";
const WHITE = "#ffffff";
const LINE = "rgba(32, 33, 36, 0.09)";

function CheckBadge({ bg = LIME }: { bg?: string }) {
  return (
    <span
      className="w-4 h-4 rounded-full inline-flex items-center justify-center flex-shrink-0"
      style={{ background: bg }}
    >
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path
          d="M2.2 5.2L4.1 7L7.8 3.2"
          stroke={INK}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   01 — Scope & Architecture Lock
   Architecture lock checklist + active team sync card
   ═══════════════════════════════════════════════════════════════════════ */
export function ProcessVisual01Scope() {
  const rows = [
    { label: "Stack & API Contracts", meta: "Next.js · Postgres · REST", status: "Locked", badgeBg: LIME },
    { label: "Database Schema", meta: "14 tables · RLS policies", status: "Approved", badgeBg: SKY_SOFT },
    { label: "Sprint Roadmap", meta: "Phased milestone plan", status: "Ready", badgeBg: SURFACE },
  ];

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* Main spec lock card */}
      <div
        className="rounded-xl p-4"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        <div className="flex items-center justify-between gap-2 pb-3 mb-3" style={{ borderBottom: `1px solid ${LINE}` }}>
          <div>
            <div className="text-[13px] font-medium tracking-[-0.01em]" style={{ color: INK }}>
              Architecture Specification
            </div>
            <div className="text-[11px]" style={{ color: MUTED }}>
              Tailored blueprint · Pre-build alignment
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
            style={{ background: LIME, color: INK }}
          >
            Scope Lock
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2"
              style={{ background: "#fafaf9", border: `1px solid ${LINE}` }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <CheckBadge bg={row.badgeBg === SURFACE ? SURFACE : row.badgeBg} />
                <div className="min-w-0">
                  <div className="text-[12px] font-medium truncate" style={{ color: INK }}>
                    {row.label}
                  </div>
                  <div className="text-[10px] truncate" style={{ color: MUTED }}>
                    {row.meta}
                  </div>
                </div>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium flex-shrink-0"
                style={{ background: row.badgeBg, color: INK }}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Slack & Lead alignment strip */}
      <div
        className="flex items-center justify-between gap-3 rounded-xl px-4 py-2.5"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex -space-x-1.5 flex-shrink-0">
            <span className="w-5 h-5 rounded-full border border-white inline-flex items-center justify-center text-[9px] font-semibold text-white" style={{ background: INK }}>
              AR
            </span>
            <span className="w-5 h-5 rounded-full border border-white inline-flex items-center justify-center text-[9px] font-semibold" style={{ background: SKY, color: WHITE }}>
              SL
            </span>
          </div>
          <span className="text-[11px] font-medium truncate" style={{ color: INK }}>
            #project-kickoff · Direct Slack Sync
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium flex-shrink-0" style={{ color: MUTED }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: SKY }} />
          Onboarded
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   02 — UI/UX Design & Interactive Prototypes
   Interactive viewport switcher + component & token parity slice
   ═══════════════════════════════════════════════════════════════════════ */
export function ProcessVisual02Design() {
  const [viewport, setViewport] = useState<"Desktop" | "Tablet" | "Mobile">("Desktop");

  const widthMap: Record<"Desktop" | "Tablet" | "Mobile", string> = {
    Desktop: "100%",
    Tablet: "74%",
    Mobile: "48%",
  };

  const labelMap: Record<"Desktop" | "Tablet" | "Mobile", string> = {
    Desktop: "1440px · 12-col Grid",
    Tablet: "768px · 8-col Grid",
    Mobile: "390px · 4-col Stack",
  };

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* Interactive Figma / Prototype slice */}
      <div
        className="rounded-xl p-4"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[13px] font-medium tracking-[-0.01em]" style={{ color: INK }}>
            Design System · Prototype
          </span>

          {/* Interactive viewport toggle */}
          <div
            className="inline-flex items-center rounded-lg p-0.5"
            style={{ background: SURFACE }}
          >
            {(["Desktop", "Tablet", "Mobile"] as const).map((mode) => {
              const active = viewport === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewport(mode)}
                  className="px-2 py-0.5 rounded-[6px] text-[10px] font-medium transition-colors cursor-pointer"
                  style={{
                    background: active ? WHITE : "transparent",
                    color: active ? INK : MUTED,
                    border: active ? `1px solid ${LINE}` : "1px solid transparent",
                  }}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive frame preview */}
        <div
          className="rounded-lg p-3 mb-3 flex flex-col items-center"
          style={{ background: SURFACE }}
        >
          <div
            className="rounded-lg p-3 transition-[width] duration-300 ease-out overflow-hidden"
            style={{
              width: widthMap[viewport],
              background: WHITE,
              border: `1px solid ${LINE}`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: INK }} />
                <span className="w-12 h-2 rounded-full" style={{ background: SURFACE }} />
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[9px] font-medium"
                style={{ background: LIME, color: INK }}
              >
                Live
              </span>
            </div>
            <div className="w-3/4 h-2.5 rounded-full mb-1.5" style={{ background: INK }} />
            <div className="w-1/2 h-2 rounded-full mb-2.5" style={{ background: "#dcdcd8" }} />
            <div className="flex items-center gap-1.5">
              <span className="h-5 px-2.5 rounded-full inline-flex items-center text-[9px] font-medium text-white" style={{ background: INK }}>
                Action
              </span>
              <span className="h-5 px-2.5 rounded-full inline-flex items-center text-[9px] font-medium" style={{ background: SKY_SOFT, color: INK }}>
                Secondary
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-2 text-[10px]" style={{ color: MUTED }}>
            <span>{labelMap[viewport]}</span>
            <span>Click tabs to preview</span>
          </div>
        </div>

        {/* Token row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full" style={{ background: INK }} />
            <span className="w-4 h-4 rounded-full" style={{ background: SKY }} />
            <span className="w-4 h-4 rounded-full" style={{ background: LIME }} />
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: WHITE, border: `1px solid ${LINE}` }}
            />
            <span className="text-[11px] ml-1" style={{ color: MUTED }}>
              48 Tokens
            </span>
          </div>

          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium"
            style={{ background: SKY_SOFT, color: INK }}
          >
            Token Parity
          </span>
        </div>
      </div>

      {/* Bottom status pills */}
      <div className="flex items-center justify-between gap-2">
        <div
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 flex-1"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <CheckBadge bg={LIME} />
          <span className="text-[11px] font-medium" style={{ color: INK }}>
            Interactive Figma Flow
          </span>
        </div>
        <div
          className="rounded-lg px-3 py-1.5 text-[11px]"
          style={{ background: WHITE, border: `1px solid ${LINE}`, color: MUTED }}
        >
          Edge States Covered
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   03 — Weekly Production Sprints & Staging
   Brex-style weekly release & CI check feed
   ═══════════════════════════════════════════════════════════════════════ */
export function ProcessVisual03Sprints() {
  const sprints = [
    {
      title: "PR #42 · Auth & Dashboard Core",
      sub: "CI / Typecheck · 24/24 passed",
      badge: "Merged",
      bg: LIME,
    },
    {
      title: "Staging Release · v0.3.2",
      sub: "staging.blocshift.app · Live URL",
      badge: "Deployed",
      bg: SKY_SOFT,
    },
    {
      title: "Async Loom Walkthrough",
      sub: "Feature & UX review",
      badge: "Ready",
      bg: SURFACE,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* Main staging card */}
      <div
        className="rounded-xl p-4"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <div className="text-[13px] font-medium tracking-[-0.01em]" style={{ color: INK }}>
              Sprint Cadence
            </div>
            <div className="text-[11px]" style={{ color: MUTED }}>
              Continuous · Verified browser build
            </div>
          </div>

          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
            style={{ background: LIME, color: INK }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: INK }} />
            Staging Live
          </span>
        </div>

        {/* Sprint log rows */}
        <div className="flex flex-col gap-2 mb-3">
          {sprints.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2"
              style={{ background: "#fafaf9", border: `1px solid ${LINE}` }}
            >
              <div className="min-w-0">
                <div className="text-[12px] font-medium truncate" style={{ color: INK }}>
                  {item.title}
                </div>
                <div className="text-[10px] truncate" style={{ color: MUTED }}>
                  {item.sub}
                </div>
              </div>

              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium flex-shrink-0"
                style={{ background: item.bg, color: INK }}
              >
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Velocity progress */}
        <div>
          <div className="flex items-center justify-between text-[10px] mb-1" style={{ color: MUTED }}>
            <span>Sprint 03 of 04</span>
            <span>75% Complete</span>
          </div>
          <div className="w-full h-[5px] rounded-full overflow-hidden" style={{ background: SURFACE }}>
            <div className="h-full rounded-full" style={{ background: SKY, width: "75%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   04 — QA, Launch & 100% IP Handover
   Core Web Vitals 100/100 + 100% Repo/IP handover confirmation
   ═══════════════════════════════════════════════════════════════════════ */
export function ProcessVisual04Launch() {
  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {/* Top 2 KPI cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div
          className="rounded-xl p-3.5"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px]" style={{ color: MUTED }}>
              Core Web Vitals
            </span>
            <CheckBadge bg={LIME} />
          </div>
          <div className="text-[22px] font-semibold tracking-[-0.03em] leading-none mb-1" style={{ color: INK }}>
            100/100
          </div>
          <div className="text-[10px]" style={{ color: MUTED }}>
            Perf · A11y · SEO
          </div>
        </div>

        <div
          className="rounded-xl p-3.5"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px]" style={{ color: MUTED }}>
              IP Ownership
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-medium"
              style={{ background: SKY_SOFT, color: INK }}
            >
              Zero Lock-in
            </span>
          </div>
          <div className="text-[22px] font-semibold tracking-[-0.03em] leading-none mb-1" style={{ color: INK }}>
            100%
          </div>
          <div className="text-[10px]" style={{ color: MUTED }}>
            Git · Figma · Docs
          </div>
        </div>
      </div>

      {/* Launch readiness checklist card */}
      <div
        className="rounded-xl p-3.5 flex flex-col gap-2"
        style={{ background: WHITE, border: `1px solid ${LINE}` }}
      >
        <div className="flex items-center justify-between gap-2 pb-2" style={{ borderBottom: `1px solid ${LINE}` }}>
          <span className="text-[12px] font-medium" style={{ color: INK }}>
            Production Handover Bundle
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: LIME, color: INK }}
          >
            Shipped
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <CheckBadge bg={LIME} />
            <span style={{ color: INK }}>Production cutover &amp; DNS verified</span>
          </div>
          <span style={{ color: MUTED }}>0 errors</span>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <CheckBadge bg={SKY_SOFT} />
            <span style={{ color: INK }}>Telemetry &amp; alerting instrumented</span>
          </div>
          <span style={{ color: MUTED }}>Live</span>
        </div>
      </div>
    </div>
  );
}
