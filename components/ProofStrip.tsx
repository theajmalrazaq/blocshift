"use client";

import React from "react";

const METRICS = [
  {
    value: "25+",
    label: "Products Shipped",
    detail: "Platforms, flagships & AI tools",
  },
  {
    value: "2–6 wks",
    label: "Avg. Time to Launch",
    detail: "Weekly staging builds, zero drift",
  },
  {
    value: "99+",
    label: "Lighthouse Performance",
    detail: "Sub-second loads & clean CWV",
  },
  {
    value: "100%",
    label: "Senior Builders",
    detail: "Direct access to design & eng leads",
  },
];

const VERTICALS = [
  "SaaS & Developer Tools",
  "Applied AI & Agents",
  "Industrial & 3D Web",
  "Fintech & Telemetry",
  "Real Estate & Commerce",
];

export default function ProofStrip() {
  return (
    <section
      aria-label="Studio track record"
      className="relative bg-white pt-16 sm:pt-20 pb-10 sm:pb-12 border-b border-black/[0.06]"
    >
      <div className="wrap">
        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-10 lg:divide-x lg:divide-black/[0.07]">
          {METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`reveal-on-scroll ${
                idx > 0 ? "lg:pl-8" : ""
              } ${idx < METRICS.length - 1 ? "lg:pr-8" : ""}`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-medium tracking-[-0.04em] leading-none text-black">
                {metric.value}
              </div>
              <div className="mt-2 text-xs sm:text-[13px] font-medium text-black/85">
                {metric.label}
              </div>
              <div className="mt-0.5 text-[11px] sm:text-xs text-black/50">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Domains & Verticals Strip */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-[0.08em] text-black/45 flex-shrink-0">
            Shipped across
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {VERTICALS.map((vertical) => (
              <span
                key={vertical}
                className="inline-flex items-center px-3 py-1 rounded-full bg-black/[0.035] text-[12px] font-medium text-black/70"
              >
                {vertical}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
