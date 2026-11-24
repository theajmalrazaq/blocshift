"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface EngagementSectionProps {
  onOpenContact?: () => void;
}

interface EngagementModel {
  id: string;
  badge: string;
  title: string;
  timeline: string;
  description: string;
  includes: string[];
  ctaLabel: string;
  featured?: boolean;
  gradient: string;
}

const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "focused-sprint",
    badge: "Fixed Scope",
    title: "Focused Sprint",
    timeline: "2–4 weeks",
    description:
      "Ideal for high-converting landing flagships, design systems, or targeted AI workflow automations with a clear deadline.",
    includes: [
      "Defined deliverables & fixed timeline",
      "End-to-end UX/UI design & engineering",
      "Core Web Vitals & conversion setup",
      "Full source code & Figma handoff",
    ],
    ctaLabel: "Scope a Sprint",
    gradient: "from-[#e8f4fc]/90 via-[#f4f9fd]/60 to-white",
  },
  {
    id: "product-partner",
    badge: "Most Popular",
    title: "Embedded Product Pod",
    timeline: "Monthly · Pause anytime",
    description:
      "Your dedicated senior design and engineering team shipping features, experiments, and AI capabilities continuously alongside leadership.",
    includes: [
      "Direct senior design & full-stack leads",
      "Weekly production releases & roadmap sync",
      "Priority Slack channel & async updates",
      "Design system, web app & AI coverage",
    ],
    ctaLabel: "Reserve a Pod",
    featured: true,
    gradient: "from-[#0d131a] via-[#151e2b] to-[#0d131a]",
  },
  {
    id: "platform-build",
    badge: "0 → 1 Build",
    title: "Full Platform & MVP",
    timeline: "4–8 weeks",
    description:
      "Complete architecture, product design, and full-stack build for new SaaS products, executive dashboards, and customer portals.",
    includes: [
      "Product strategy & technical architecture",
      "Custom web app, API & database layer",
      "Interactive dashboards & auth/roles",
      "Post-launch stabilization & support",
    ],
    ctaLabel: "Plan Your Build",
    gradient: "from-[#f2f2f0]/90 via-[#f8f8f7]/60 to-white",
  },
];

export default function EngagementSection({
  onOpenContact,
}: EngagementSectionProps) {
  return (
    <section
      id="engagement"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06] overflow-hidden"
    >
      <div className="wrap relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center max-w-[740px] mx-auto mb-14 sm:mb-20 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            Ways to Work Together
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
            Flexible models.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[580px] m-0">
            Built around your product momentum — whether you need a focused sprint or a long-term engineering partner.
          </p>
        </div>

        {/* 3-Column Engagement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {ENGAGEMENT_MODELS.map((model, idx) => {
            const isDark = Boolean(model.featured);
            return (
              <div
                key={model.id}
                className={`reveal-on-scroll flex flex-col justify-between p-6 sm:p-7 rounded-[22px] bg-gradient-to-b ${
                  model.gradient
                } ${isDark ? "text-white shadow-xl" : "text-black"}`}
                style={{
                  cornerShape: "squircle",
                  WebkitCornerShape: "squircle",
                  transitionDelay: `${idx * 70}ms`,
                } as React.CSSProperties}
              >
                <div>
                  {/* Top Pill Row */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-[8px] text-[11px] font-medium ${
                        isDark
                          ? "bg-[#d2fb95] text-black font-semibold"
                          : "bg-black/[0.04] border border-black/[0.06] text-black/70"
                      }`}
                    >
                      {model.badge}
                    </span>
                    <span
                      className={`text-[11px] ${
                        isDark ? "text-white/55" : "text-black/50"
                      }`}
                    >
                      {model.timeline}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl sm:text-[24px] font-medium leading-[1.2] tracking-[-0.025em] mb-2.5 ${
                      isDark ? "text-white" : "text-black"
                    }`}
                  >
                    {model.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-[1.65] font-normal m-0 mb-6 ${
                      isDark ? "text-white/70" : "text-black/65"
                    }`}
                  >
                    {model.description}
                  </p>
                </div>

                {/* Deliverables + CTA */}
                <div
                  className={`pt-5 mt-auto border-t ${
                    isDark ? "border-white/10" : "border-black/[0.07]"
                  }`}
                >
                  <div
                    className={`space-y-2.5 mb-7 text-[12px] sm:text-[13px] ${
                      isDark ? "text-white/80" : "text-black/75"
                    }`}
                  >
                    {model.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 flex-shrink-0 stroke-[1.8] ${
                            isDark ? "text-[#d2fb95]" : "text-black/50"
                          }`}
                        />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onOpenContact}
                    className={`group/btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[14px] font-semibold text-[14px] transition-colors cursor-pointer ${
                      isDark
                        ? "bg-white hover:bg-neutral-100 text-black focus-visible:outline-2 focus-visible:outline-white"
                        : "bg-black hover:bg-neutral-900 text-white focus-visible:outline-2 focus-visible:outline-black"
                    }`}
                  >
                    <span>{model.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
