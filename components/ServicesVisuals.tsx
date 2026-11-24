"use client";

import React from "react";

/* ─── Blocshift Brand Tokens ─── */
const INK = "#202124";
const MUTED = "#51565c";
const SURFACE = "#f2f2f0";
const LIME = "#d2fb95";
const SKY = "#62abe0";
const SKY_SOFT = "#eaf4fc";
const WHITE = "#ffffff";
const LINE = "rgba(32, 33, 36, 0.09)";

/* ═══════════════════════════════════════════════════════════════════════
   01 — Web & Platform Engineering
   Flat deployment SLA card + Lighthouse 100 & edge region pills
   ═══════════════════════════════════════════════════════════════════════ */
export function Visual01WebEngineering() {
  return (
    <div className="w-full h-full flex items-center justify-center px-3 py-3 sm:px-5 sm:py-4 select-none">
      <div className="flex flex-col gap-2 w-full max-w-[420px]">
        {/* Main deployment card */}
        <div
          className="rounded-xl px-3.5 py-2.5"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] sm:text-[13px] font-medium tracking-[-0.01em]" style={{ color: INK }}>
              Edge Deployment · v2.4
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: LIME, color: INK }}
            >
              Live
            </span>
          </div>

          <div
            className="w-full h-[5px] rounded-full mb-2 overflow-hidden"
            style={{ background: SURFACE }}
          >
            <div
              className="h-full rounded-full"
              style={{ background: SKY, width: "78%" }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]" style={{ color: MUTED }}>
            <span>12ms p95</span>
            <span>50ms SLA</span>
          </div>
        </div>

        {/* Bottom flat status pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: WHITE, border: `1px solid ${LINE}` }}
          >
            <span
              className="w-3.5 h-3.5 rounded-full inline-flex items-center justify-center flex-shrink-0"
              style={{ background: LIME }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.2 5.2L4.1 7L7.8 3.2" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[11px] font-semibold" style={{ color: INK }}>
              100/100
            </span>
            <span className="text-[11px]" style={{ color: MUTED }}>
              Lighthouse
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{ background: WHITE, border: `1px solid ${LINE}` }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: SKY }}
            />
            <span className="text-[11px]" style={{ color: MUTED }}>
              iad1 · 11ms
            </span>
            <span className="text-[11px] hidden sm:inline" style={{ color: MUTED }}>
              · lhr1 · 14ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   02 — AI Agents & Workflow Automation
   Brex-style stacked flat automation rows (zero clipping)
   ═══════════════════════════════════════════════════════════════════════ */
export function Visual02AIAgents() {
  return (
    <div className="w-full h-full flex items-center justify-center px-3 py-3 sm:px-5 sm:py-4 select-none">
      <div className="flex flex-col gap-2 w-full max-w-[320px]">
        {/* Row 1: Autonomous workflow */}
        <div
          className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: INK }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="4.5" cy="4.5" r="1.5" stroke={WHITE} strokeWidth="1.2" />
                <circle cx="9.5" cy="9.5" r="1.5" stroke={LIME} strokeWidth="1.2" />
                <path d="M6 4.5H8.5C9.05 4.5 9.5 4.95 9.5 5.5V8" stroke={WHITE} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-medium truncate" style={{ color: INK }}>
                Lead Enrich &amp; Sync
              </div>
              <div className="text-[10px] uppercase tracking-[0.04em]" style={{ color: MUTED }}>
                CRM · Webhook
              </div>
            </div>
          </div>

          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium flex-shrink-0"
            style={{ background: LIME, color: INK }}
          >
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M2 5.2L4 7.2L8 3" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            0.8s Done
          </span>
        </div>

        {/* Row 2: Data ingestion */}
        <div
          className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: SKY_SOFT }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2.5" y="3" width="9" height="8" rx="1.5" stroke={INK} strokeWidth="1.2" />
                <path d="M4.8 6H9.2M4.8 8.2H7.6" stroke={SKY} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-medium truncate" style={{ color: INK }}>
                Pipeline Ingestion
              </div>
              <div className="text-[10px] uppercase tracking-[0.04em]" style={{ color: MUTED }}>
                Agent · 24/7 Queue
              </div>
            </div>
          </div>

          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium flex-shrink-0"
            style={{ background: SKY_SOFT, color: INK }}
          >
            Active
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   03 — Product Design & Design Systems
   Compact flat component slice + color token swatches + status chip
   ═══════════════════════════════════════════════════════════════════════ */
export function Visual03DesignSystems() {
  return (
    <div className="w-full h-full flex items-center justify-center px-3 py-3 sm:px-5 sm:py-4 select-none">
      <div className="flex flex-col gap-2 w-full max-w-[360px]">
        {/* Component preview card */}
        <div
          className="rounded-xl px-3.5 py-3"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[12px] sm:text-[13px] font-medium tracking-[-0.01em]" style={{ color: INK }}>
              Button · Core
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: SURFACE, color: MUTED }}
            >
              Figma → Code
            </span>
          </div>

          {/* Button specimen + token swatches side by side so card stays compact */}
          <div className="flex items-center justify-between gap-3">
            <div
              className="rounded-full px-3.5 py-1.5 text-[11px] font-medium inline-flex items-center gap-1.5 flex-shrink-0"
              style={{ background: INK, color: WHITE }}
            >
              <span>Book a Call</span>
              <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                <path d="M3 5.5H8M8 5.5L5.8 3.3M8 5.5L5.8 7.7" stroke={WHITE} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full" style={{ background: INK }} />
              <span className="w-4 h-4 rounded-full" style={{ background: SKY }} />
              <span className="w-4 h-4 rounded-full" style={{ background: LIME }} />
              <span
                className="w-4 h-4 rounded-full"
                style={{ background: WHITE, border: `1px solid ${LINE}` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom tokens pill row */}
        <div className="flex items-center justify-between gap-2">
          <div
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1"
            style={{ background: WHITE, border: `1px solid ${LINE}` }}
          >
            <span
              className="w-3.5 h-3.5 rounded-full inline-flex items-center justify-center"
              style={{ background: LIME }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path d="M2.2 5.2L4.1 7L7.8 3.2" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[11px] font-medium" style={{ color: INK }}>
              48 Tokens Synced
            </span>
          </div>

          <div
            className="rounded-lg px-2.5 py-1 text-[11px]"
            style={{ background: WHITE, border: `1px solid ${LINE}`, color: MUTED }}
          >
            AA Contrast
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   04 — High-Converting Landing Pages
   Brex-style crisp conversion bar + metrics slice
   ═══════════════════════════════════════════════════════════════════════ */
export function Visual04LandingPages() {
  return (
    <div className="w-full h-full flex items-center justify-center px-3 py-3 sm:px-5 sm:py-4 select-none">
      <div className="flex flex-col gap-2 w-full max-w-[360px]">
        {/* Slim confirmation pill */}
        <div
          className="flex items-center justify-between gap-2 rounded-xl px-3 py-2"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full inline-flex items-center justify-center flex-shrink-0"
              style={{ background: LIME }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2.2 5.2L4.1 7L7.8 3.2" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[11px] font-medium" style={{ color: INK }}>
              Funnel conversion verified
            </span>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: LIME, color: INK }}
          >
            +142% Lift
          </span>
        </div>

        {/* Funnel metrics card */}
        <div
          className="rounded-xl px-3.5 py-2.5"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium" style={{ color: INK }}>
              Inbound Demo Funnel
            </span>
            <span className="text-[11px]" style={{ color: MUTED }}>
              30d
            </span>
          </div>

          <div
            className="w-full h-[5px] rounded-full mb-2.5 overflow-hidden"
            style={{ background: SURFACE }}
          >
            <div
              className="h-full rounded-full"
              style={{ background: SKY, width: "84%" }}
            />
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <div>
                <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
                  8.4%
                </span>
                <span className="text-[10px] ml-1" style={{ color: MUTED }}>
                  Conv.
                </span>
              </div>
              <div>
                <span className="text-[13px] font-medium" style={{ color: MUTED }}>
                  2.1%
                </span>
                <span className="text-[10px] ml-1" style={{ color: MUTED }}>
                  Avg
                </span>
              </div>
            </div>

            <div className="flex -space-x-1.5">
              <span className="w-4 h-4 rounded-full border border-white" style={{ background: SKY }} />
              <span className="w-4 h-4 rounded-full border border-white" style={{ background: LIME }} />
              <span className="w-4 h-4 rounded-full border border-white" style={{ background: INK }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   05 — Executive Dashboards & Telemetry (Full-width panoramic)
   Flat ARR area chart + Uptime & p95 Latency cards
   ═══════════════════════════════════════════════════════════════════════ */
export function Visual05Telemetry() {
  return (
    <div className="w-full h-full flex items-center justify-center px-3 py-3 sm:px-5 sm:py-4 select-none">
      <div className="flex gap-2.5 w-full max-w-[460px] items-stretch">
        {/* Revenue chart card */}
        <div
          className="flex-1 rounded-xl px-3.5 py-3 flex flex-col justify-between min-w-0"
          style={{ background: WHITE, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px]" style={{ color: MUTED }}>
              ARR
            </span>
            <span className="text-[14px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              $2.4M
            </span>
          </div>

          {/* Flat area chart */}
          <svg
            viewBox="0 0 180 56"
            className="w-full h-[52px] sm:h-[64px]"
            fill="none"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,46 22,43 45,38 68,35 90,28 112,24 135,16 158,11 180,5 180,56 0,56"
              fill={SKY_SOFT}
            />
            <polyline
              points="0,46 22,43 45,38 68,35 90,28 112,24 135,16 158,11 180,5"
              stroke={SKY}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex items-center justify-between mt-1.5">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ background: LIME, color: INK }}
            >
              +34% QoQ
            </span>
            <span className="text-[10px]" style={{ color: MUTED }}>
              Live sync
            </span>
          </div>
        </div>

        {/* Right KPI stack */}
        <div className="flex flex-col justify-between gap-2 w-[118px] sm:w-[132px] flex-shrink-0">
          <div
            className="rounded-xl px-3 py-2"
            style={{ background: WHITE, border: `1px solid ${LINE}` }}
          >
            <span className="text-[10px] block" style={{ color: MUTED }}>
              Uptime
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              99.98%
            </span>
          </div>

          <div
            className="rounded-xl px-3 py-2"
            style={{ background: WHITE, border: `1px solid ${LINE}` }}
          >
            <span className="text-[10px] block" style={{ color: MUTED }}>
              p95 Latency
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              18ms
            </span>
          </div>

          <div
            className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5"
            style={{ background: LIME }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: INK }} />
            <span className="text-[10px] font-medium truncate" style={{ color: INK }}>
              All systems go
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
