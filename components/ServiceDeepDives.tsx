"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

interface SectionProps {
  onOpenContact?: () => void;
}

/* ═══════════════════════════════════════════════════════════════════════
   01 — Web & Platform Engineering
   Interactive Architecture Stack Explorer
   ═══════════════════════════════════════════════════════════════════════ */
interface StackLayer {
  id: string;
  label: string;
  summary: string;
  badge: string;
  rows: { name: string; spec: string; status: string; highlight?: "lime" | "sky" }[];
  metrics: { label: string; value: string }[];
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: "edge",
    label: "Edge Routing & SSR",
    summary: "Streaming server rendering, edge caching, and asset pipelines tuned for 99+ Core Web Vitals.",
    badge: "12ms Global p95",
    rows: [
      { name: "Next.js App Router", spec: "Streaming SSR · Partial Prerendering", status: "Active", highlight: "lime" },
      { name: "Edge Regions", spec: "iad1 (11ms) · lhr1 (14ms) · sin1 (19ms)", status: "Healthy", highlight: "sky" },
      { name: "Asset Compression", spec: "AVIF / WebP · Zero layout shift", status: "100 CLS" },
    ],
    metrics: [
      { label: "Lighthouse", value: "100/100" },
      { label: "First Contentful", value: "0.4s" },
      { label: "SLA Target", value: "99.98%" },
    ],
  },
  {
    id: "data",
    label: "Type-Safe API & Data",
    summary: "End-to-end typed endpoints, relational schemas, row-level access controls, and predictable latency.",
    badge: "Zero Schema Drift",
    rows: [
      { name: "Typed API Contracts", spec: "Validated payloads · Shared types", status: "Strict", highlight: "lime" },
      { name: "Postgres + Pooling", spec: "Indexed queries · Row-level security", status: "8ms Avg", highlight: "sky" },
      { name: "Webhook Ingestion", spec: "Idempotent queues · Retry policies", status: "Verified" },
    ],
    metrics: [
      { label: "Query p95", value: "8.4ms" },
      { label: "Type Coverage", value: "100%" },
      { label: "Error Rate", value: "0.01%" },
    ],
  },
  {
    id: "cicd",
    label: "CI/CD & Observability",
    summary: "Automated preview environments on every PR, strict quality gates, and instant rollback safety.",
    badge: "Zero Downtime",
    rows: [
      { name: "Automated Test Suite", spec: "Typecheck · Lint · Playwright E2E", status: "Passed", highlight: "lime" },
      { name: "PR Preview URLs", spec: "Isolated branch builds per commit", status: "Synced", highlight: "sky" },
      { name: "Telemetry & Alerts", spec: "Structured logs · Real-time traces", status: "Live" },
    ],
    metrics: [
      { label: "Deploy Time", value: "38s" },
      { label: "Checks", value: "24/24" },
      { label: "Rollback", value: "1-Click" },
    ],
  },
];

export function WebEngineeringSection({ onOpenContact }: SectionProps) {
  const [layerId, setLayerId] = useState(STACK_LAYERS[0].id);
  const current = STACK_LAYERS.find((l) => l.id === layerId) || STACK_LAYERS[0];

  return (
    <section
      id="web-engineering"
      className="relative py-20 sm:py-28 bg-white border-t border-black/[0.06]"
    >
      <div className="wrap">
        <div className="max-w-[760px] mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-block text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            02 · Web &amp; Platform Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
            Sub-second by default.
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-[17px] leading-[1.6] text-black/55 font-normal max-w-[560px] mx-auto m-0">
            Full-stack platforms built for real traffic, not fragile demos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Interactive Layer Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {STACK_LAYERS.map((layer) => {
              const active = layer.id === current.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setLayerId(layer.id)}
                  className={`text-left rounded-[18px] p-5 transition-colors cursor-pointer border ${
                    active
                      ? "bg-[#f2f2f0] border-black/[0.14]"
                      : "bg-white border-black/[0.07] hover:bg-[#fafaf9]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[16px] font-medium tracking-[-0.02em] text-[#202124]">
                      {layer.label}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{
                        background: active ? "#d2fb95" : "#f2f2f0",
                        color: "#202124",
                      }}
                    >
                      {layer.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] leading-[1.6] text-black/60 m-0">
                    {layer.summary}
                  </p>
                </button>
              );
            })}

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenContact}
                className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#202124] hover:text-black/70 transition-colors cursor-pointer"
              >
                <span>Scope a platform build</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Right Flat Architecture Inspector */}
          <div className="lg:col-span-7">
            <div className="rounded-[22px] bg-[#f2f2f0] border border-black/[0.08] p-5 sm:p-6">
              {/* Top Metric Strip */}
              <div className="grid grid-cols-3 gap-2.5 mb-3">
                {current.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl bg-white border border-black/[0.08] px-3.5 py-3"
                  >
                    <div className="text-[10px] sm:text-[11px] text-[#51565c] mb-0.5">
                      {m.label}
                    </div>
                    <div className="text-[17px] sm:text-[20px] font-semibold tracking-[-0.025em] text-[#202124]">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Layer Rows */}
              <div className="rounded-xl bg-white border border-black/[0.08] p-3.5 flex flex-col gap-2">
                {current.rows.map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between gap-3 rounded-lg bg-[#fafaf9] border border-black/[0.07] px-3.5 py-2.5"
                  >
                    <div className="min-w-0">
                      <div className="text-[12px] sm:text-[13px] font-medium text-[#202124] truncate">
                        {row.name}
                      </div>
                      <div className="text-[11px] text-[#51565c] truncate">
                        {row.spec}
                      </div>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium flex-shrink-0"
                      style={{
                        background:
                          row.highlight === "lime"
                            ? "#d2fb95"
                            : row.highlight === "sky"
                            ? "#eaf4fc"
                            : "#f2f2f0",
                        color: "#202124",
                      }}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   03 — Product Design & Design Systems
   Interactive Token & Component Playground
   ═══════════════════════════════════════════════════════════════════════ */
export function DesignSystemsSection({ onOpenContact }: SectionProps) {
  const [accent, setAccent] = useState<"lime" | "sky" | "ink">("lime");
  const [radius, setRadius] = useState<"8px" | "14px" | "999px">("14px");

  const accentConfig = {
    lime: { label: "Lime", bg: "#d2fb95", fg: "#202124", hex: "#D2FB95" },
    sky: { label: "Sky", bg: "#62abe0", fg: "#ffffff", hex: "#62ABE0" },
    ink: { label: "Ink", bg: "#202124", fg: "#ffffff", hex: "#202124" },
  }[accent];

  const radiusLabel = {
    "8px": "Sharp · 8px",
    "14px": "Balanced · 14px",
    "999px": "Pill · Full",
  }[radius];

  return (
    <section
      id="design-systems"
      className="relative py-20 sm:py-28 bg-white border-t border-black/[0.06]"
    >
      <div className="wrap">
        <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-block text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            03 · Product Design &amp; Design Systems
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
            Craft meets system.
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-[17px] leading-[1.6] text-black/55 font-normal max-w-[560px] mx-auto m-0">
            Component libraries engineered to ship clean from Figma to code.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {/* Accent selector */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f2f0] border border-black/[0.07] px-2.5 py-1">
            <span className="text-[11px] text-[#51565c] px-1">Token</span>
            {(["lime", "sky", "ink"] as const).map((key) => {
              const active = accent === key;
              const swatch =
                key === "lime" ? "#d2fb95" : key === "sky" ? "#62abe0" : "#202124";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAccent(key)}
                  aria-label={`Select ${key} accent`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    active ? "bg-white text-[#202124]" : "text-[#51565c] hover:text-[#202124]"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/15"
                    style={{ background: swatch }}
                  />
                  <span className="capitalize">{key}</span>
                </button>
              );
            })}
          </div>

          {/* Radius selector */}
          <div className="inline-flex items-center gap-1 rounded-full bg-[#f2f2f0] border border-black/[0.07] px-2.5 py-1">
            <span className="text-[11px] text-[#51565c] px-1">Radius</span>
            {(["8px", "14px", "999px"] as const).map((r) => {
              const active = radius === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRadius(r)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    active ? "bg-white text-[#202124]" : "text-[#51565c] hover:text-[#202124]"
                  }`}
                >
                  {r === "999px" ? "Pill" : r}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Flat Component Specimen Stage */}
        <div className="max-w-[780px] mx-auto rounded-[22px] bg-[#f2f2f0] border border-black/[0.08] p-5 sm:p-7">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Live Component Card */}
            <div
              className="md:col-span-7 bg-white border border-black/[0.08] p-5 flex flex-col justify-between transition-[border-radius] duration-200"
              style={{ borderRadius: radius === "999px" ? "24px" : radius }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[13px] font-medium text-[#202124]">
                    Workspace Access · Role Card
                  </span>
                  <span
                    className="px-2.5 py-0.5 text-[10px] font-semibold transition-colors duration-200"
                    style={{
                      background: accentConfig.bg,
                      color: accentConfig.fg,
                      borderRadius: radius,
                    }}
                  >
                    Verified
                  </span>
                </div>

                <p className="text-[12px] leading-[1.6] text-[#51565c] m-0 mb-4">
                  Every button, input, and surface inherits semantic tokens so
                  product teams ship consistent UI across web and mobile.
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-black/[0.07]">
                <span className="text-[11px] text-[#51565c]">
                  {radiusLabel}
                </span>

                <button
                  type="button"
                  onClick={onOpenContact}
                  className="px-4 py-2 text-[12px] font-semibold inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
                  style={{
                    background: accentConfig.bg,
                    color: accentConfig.fg,
                    borderRadius: radius,
                  }}
                >
                  <span>Deploy System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Token Inspector */}
            <div className="md:col-span-5 bg-white border border-black/[0.08] rounded-[16px] p-4 flex flex-col justify-between gap-2.5">
              <div className="text-[12px] font-medium text-[#202124] pb-2 border-b border-black/[0.07]">
                Synced Design Tokens
              </div>

              <div className="flex flex-col gap-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#51565c]">--accent-primary</span>
                  <span className="font-medium text-[#202124]">{accentConfig.hex}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#51565c]">--radius-control</span>
                  <span className="font-medium text-[#202124]">{radius}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#51565c]">--contrast-ratio</span>
                  <span className="font-medium text-[#202124]">AA / AAA Pass</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#51565c]">--figma-parity</span>
                  <span className="font-medium text-[#202124]">100% Mapped</span>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.07] flex items-center justify-between text-[11px] text-[#51565c]">
                <span>48 Components</span>
                <span>0 Handoff Drift</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   04 — High-Converting Landing Pages
   Interactive Before / After Conversion Architecture Compare
   ═══════════════════════════════════════════════════════════════════════ */
export function LandingPagesSection({ onOpenContact }: SectionProps) {
  const [mode, setMode] = useState<"after" | "before">("after");
  const isAfter = mode === "after";

  return (
    <section
      id="landing-pages"
      className="relative py-20 sm:py-28 bg-white border-t border-black/[0.06]"
    >
      <div className="wrap">
        <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-block text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            04 · High-Converting Landing Pages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium leading-[1.08] tracking-[-0.035em] m-0">
            <span className="text-[#202124]">Clarity that converts. </span>
            <span className="text-black/45">
              Editorial pages built to earn trust in five seconds and turn traffic into pipeline.
            </span>
          </h2>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 rounded-full p-1 bg-[#f2f2f0] border border-black/[0.07]">
            <button
              type="button"
              onClick={() => setMode("before")}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                !isAfter ? "bg-[#202124] text-white" : "text-[#51565c] hover:text-[#202124]"
              }`}
            >
              Generic Template
            </button>
            <button
              type="button"
              onClick={() => setMode("after")}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                isAfter ? "bg-[#202124] text-white" : "text-[#51565c] hover:text-[#202124]"
              }`}
            >
              Blocshift Architecture
            </button>
          </div>
        </div>

        {/* Comparison Canvas */}
        <div className="max-w-[820px] mx-auto rounded-[22px] bg-[#f2f2f0] border border-black/[0.08] p-5 sm:p-7">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Wireframe Slice */}
            <div className="md:col-span-7 rounded-xl bg-white border border-black/[0.08] p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-medium text-[#202124]">
                  {isAfter ? "Above-the-Fold Value Hierarchy" : "Cluttered Generic Hero"}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                  style={{
                    background: isAfter ? "#d2fb95" : "#f2f2f0",
                    color: "#202124",
                  }}
                >
                  {isAfter ? "8.4% Demo Conv." : "2.1% Demo Conv."}
                </span>
              </div>

              {isAfter ? (
                <div className="space-y-3">
                  <div className="rounded-lg bg-[#fafaf9] border border-black/[0.07] p-3">
                    <div className="text-[11px] text-[#51565c] mb-1">
                      01 · Sharp Outcome Headline
                    </div>
                    <div className="text-[13px] font-medium text-[#202124]">
                      Clear ICP promise + zero jargon in the first 3 seconds
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#fafaf9] border border-black/[0.07] p-3">
                    <div className="text-[11px] text-[#51565c] mb-1">
                      02 · Interactive Product Proof
                    </div>
                    <div className="text-[13px] font-medium text-[#202124]">
                      Real UI slices + quantified outcomes before the first scroll
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#eaf4fc] border border-black/[0.07] p-3 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#202124]">
                      03 · Single Frictionless CTA
                    </span>
                    <span className="rounded-full bg-[#202124] text-white px-3 py-1 text-[10px] font-medium">
                      Book a Call
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 opacity-75">
                  <div className="rounded-lg bg-[#f2f2f0] p-3">
                    <div className="text-[11px] text-[#51565c] mb-1">
                      Vague Headline
                    </div>
                    <div className="text-[13px] text-[#51565c]">
                      &ldquo;Next-Gen AI Synergy Platform for Modern Teams&rdquo;
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#f2f2f0] p-3">
                    <div className="text-[11px] text-[#51565c] mb-1">
                      Generic Stock Visuals
                    </div>
                    <div className="text-[13px] text-[#51565c]">
                      Heavy illustrations + 4 competing CTA buttons
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#f2f2f0] p-3">
                    <div className="text-[11px] text-[#51565c]">
                      High bounce rate · 68% exit before scroll
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Funnel Metrics Column */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="rounded-xl bg-white border border-black/[0.08] p-4">
                <div className="text-[11px] text-[#51565c] mb-1">
                  Qualified Pipeline Lift
                </div>
                <div className="text-[28px] font-semibold tracking-[-0.03em] text-[#202124] leading-none mb-2">
                  {isAfter ? "+142%" : "Baseline"}
                </div>
                <div className="w-full h-[5px] rounded-full bg-[#f2f2f0] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: isAfter ? "86%" : "26%",
                      background: isAfter ? "#62abe0" : "#51565c",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-white border border-black/[0.08] p-3.5">
                  <div className="text-[10px] text-[#51565c] mb-0.5">Time to Clarity</div>
                  <div className="text-[17px] font-semibold text-[#202124]">
                    {isAfter ? "3.5s" : "18s"}
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-black/[0.08] p-3.5">
                  <div className="text-[10px] text-[#51565c] mb-0.5">LCP Load</div>
                  <div className="text-[17px] font-semibold text-[#202124]">
                    {isAfter ? "0.7s" : "3.8s"}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenContact}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#202124] hover:bg-neutral-800 text-white px-4 py-3 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                <span>Upgrade your landing page</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   05 — Executive Dashboards & Telemetry
   Interactive Timeframe & Role Telemetry Console
   ═══════════════════════════════════════════════════════════════════════ */
type RangeKey = "7d" | "30d" | "90d";

const TELEMETRY_DATA: Record<
  RangeKey,
  {
    arr: string;
    delta: string;
    uptime: string;
    latency: string;
    points: string;
    polygon: string;
    events: { label: string; value: string; status: string }[];
  }
> = {
  "7d": {
    arr: "$2.42M",
    delta: "+6.8% WoW",
    uptime: "100.0%",
    latency: "14ms",
    points: "0,44 35,40 70,36 105,34 140,26 175,21 210,14 245,9",
    polygon: "0,44 35,40 70,36 105,34 140,26 175,21 210,14 245,9 245,56 0,56",
    events: [
      { label: "Enterprise demo bookings", value: "34", status: "Target hit" },
      { label: "Background agent jobs", value: "1,840", status: "0 failed" },
    ],
  },
  "30d": {
    arr: "$2.48M",
    delta: "+18.4% MoM",
    uptime: "99.98%",
    latency: "17ms",
    points: "0,48 35,45 70,39 105,32 140,29 175,22 210,13 245,7",
    polygon: "0,48 35,45 70,39 105,32 140,29 175,22 210,13 245,7 245,56 0,56",
    events: [
      { label: "Net revenue retention", value: "118%", status: "Healthy" },
      { label: "Webhook sync throughput", value: "99.99%", status: "Live" },
    ],
  },
  "90d": {
    arr: "$2.64M",
    delta: "+34.2% QoQ",
    uptime: "99.98%",
    latency: "18ms",
    points: "0,50 35,46 70,42 105,35 140,25 175,18 210,11 245,4",
    polygon: "0,50 35,46 70,42 105,35 140,25 175,18 210,11 245,4 245,56 0,56",
    events: [
      { label: "Quarterly pipeline growth", value: "2.4x", status: "Verified" },
      { label: "Automated reports sent", value: "14,200", status: "100% SLA" },
    ],
  },
};

export function TelemetrySection({ onOpenContact }: SectionProps) {
  const [range, setRange] = useState<RangeKey>("30d");
  const data = TELEMETRY_DATA[range];

  return (
    <section
      id="telemetry-dashboards"
      className="relative py-20 sm:py-28 bg-white border-t border-black/[0.06]"
    >
      <div className="wrap">
        <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-block text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            05 · Executive Dashboards &amp; Telemetry
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-medium leading-[1.08] tracking-[-0.035em] m-0">
            <span className="text-[#202124]">One source of truth. </span>
            <span className="text-black/45">
              Live revenue pacing, system health, and role-based KPIs in one calm view.
            </span>
          </h2>
        </div>

        {/* Interactive Telemetry Frame */}
        <div className="max-w-[820px] mx-auto rounded-[22px] bg-[#f2f2f0] border border-black/[0.08] p-5 sm:p-7">
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#62abe0]" />
              <span className="text-[12px] font-medium text-[#202124]">
                Operations &amp; Revenue Telemetry
              </span>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full p-1 bg-white border border-black/[0.07]">
              {(["7d", "30d", "90d"] as const).map((key) => {
                const active = range === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRange(key)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                      active ? "bg-[#202124] text-white" : "text-[#51565c] hover:text-[#202124]"
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Area Chart Card */}
            <div className="md:col-span-7 rounded-xl bg-white border border-black/[0.08] p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[11px] text-[#51565c]">
                    Annualized Run Rate ({range})
                  </div>
                  <div className="text-[24px] font-semibold tracking-[-0.03em] text-[#202124]">
                    {data.arr}
                  </div>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                  style={{ background: "#d2fb95", color: "#202124" }}
                >
                  {data.delta}
                </span>
              </div>

              <svg
                viewBox="0 0 245 56"
                className="w-full h-[76px]"
                fill="none"
                preserveAspectRatio="none"
              >
                <polygon points={data.polygon} fill="#eaf4fc" />
                <polyline
                  points={data.points}
                  stroke="#62abe0"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/[0.07] text-[11px] text-[#51565c]">
                <span>Role-based permissions enabled</span>
                <span>Live sync</span>
              </div>
            </div>

            {/* Right KPIs + Live Stream */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-white border border-black/[0.08] p-3.5">
                  <div className="text-[10px] text-[#51565c] mb-0.5">Uptime</div>
                  <div className="text-[18px] font-semibold text-[#202124]">
                    {data.uptime}
                  </div>
                </div>
                <div className="rounded-xl bg-white border border-black/[0.08] p-3.5">
                  <div className="text-[10px] text-[#51565c] mb-0.5">p95 Latency</div>
                  <div className="text-[18px] font-semibold text-[#202124]">
                    {data.latency}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-black/[0.08] p-3.5 flex flex-col gap-2">
                {data.events.map((ev) => (
                  <div
                    key={ev.label}
                    className="flex items-center justify-between gap-2 rounded-lg bg-[#fafaf9] border border-black/[0.07] px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] text-[#51565c] truncate">
                        {ev.label}
                      </div>
                      <div className="text-[13px] font-semibold text-[#202124]">
                        {ev.value}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#d2fb95] px-2 py-0.5 text-[10px] font-medium text-[#202124] flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[2.2]" />
                      {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Link */}
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={onOpenContact}
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#202124] hover:text-black/70 transition-colors cursor-pointer"
            >
              <span>Design your executive dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
