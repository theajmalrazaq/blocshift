"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";

interface EngagementSectionProps {
  onOpenContact?: (service?: string) => void;
}

interface ServicePricingTier {
  id: string;
  tag: string;
  title: string;
  priceRange: string;
  cadence: string;
  description: string;
  includes: string[];
  ctaLabel: string;
  modalService: string;
  featured?: boolean;
}

const SERVICE_TIERS: ServicePricingTier[] = [
  {
    id: "ai-agents",
    tag: "01 · AI Agents",
    title: "AI Agents & Automation",
    priceRange: "$400 – $1,200",
    cadence: "Scoped per workflow",
    description:
      "Lead follow-ups, support triage, and CRM sync agents built around your exact tools.",
    includes: [
      "Custom agent logic & tool integrations",
      "Human-in-the-loop approval queues",
      "Retries, guardrails & full code ownership",
    ],
    ctaLabel: "Scope AI Agent",
    modalService: "AI Agents & Automation",
  },
  {
    id: "web-engineering",
    tag: "02 · Web Engineering",
    title: "Web & Platform Engineering",
    priceRange: "$1,500 – $4,500",
    cadence: "Scoped per platform",
    description:
      "Full-stack Next.js and React platforms built for fast loads, auth, and real traffic.",
    includes: [
      "Full-stack web app, API & Postgres DB",
      "Role-based auth, billing & customer portals",
      "Automated CI/CD & 100% repo handover",
    ],
    ctaLabel: "Scope Web Build",
    modalService: "Web & Platform Engineering",
  },
  {
    id: "design-systems",
    tag: "03 · Design Systems",
    title: "Product Design & Systems",
    priceRange: "$600 – $1,800",
    cadence: "Scoped per system",
    description:
      "Product interfaces and shared Figma component libraries matched directly to code.",
    includes: [
      "Interactive Figma flows & edge states",
      "Semantic tokens & component library",
      "Desktop, tablet & mobile parity",
    ],
    ctaLabel: "Scope Design System",
    modalService: "Product Design & Design Systems",
  },
  {
    id: "landing-pages",
    tag: "04 · Landing Pages",
    title: "High-Converting Pages",
    priceRange: "$300 – $800",
    cadence: "Fixed scope",
    description:
      "Clear positioning, custom copy, and fast Next.js builds engineered to book calls.",
    includes: [
      "ICP messaging rewrite & page hierarchy",
      "Custom UI visuals & mobile polish",
      "Analytics, events & 99+ Core Web Vitals",
    ],
    ctaLabel: "Scope Landing Page",
    modalService: "High-Converting Landing Pages",
  },
  {
    id: "telemetry",
    tag: "05 · Telemetry",
    title: "Dashboards & Telemetry",
    priceRange: "$900 – $2,500",
    cadence: "Scoped per suite",
    description:
      "Live revenue pacing, operational health, and custom reporting in one clean view.",
    includes: [
      "Real-time KPIs & custom chart views",
      "Multi-source data sync & permissions",
      "Automated alerts & scheduled exports",
    ],
    ctaLabel: "Scope Dashboard",
    modalService: "Executive Dashboards & Telemetry",
  },
  {
    id: "custom-pod",
    tag: "Custom · Multi-Service",
    title: "Custom Build or Retainer",
    priceRange: "$1,500 – $3,000 / mo",
    cadence: "Or custom fixed quote",
    description:
      "Combine multiple services or keep a dedicated designer and developer shipping weekly.",
    includes: [
      "Combine design, web engineering & AI",
      "Weekly staging builds & direct Slack",
      "Pause monthly retainer or lock fixed scope",
    ],
    ctaLabel: "Scope Custom Plan",
    modalService: "Full Product / Other",
    featured: true,
  },
];

export default function EngagementSection({
  onOpenContact,
}: EngagementSectionProps) {
  return (
    <section
      id="engagement"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06]"
    >
      <div className="wrap relative z-10">
        {/* Section Heading */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center max-w-[740px] mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            Ways to Work Together
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
            Simple pricing by service.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[560px] m-0">
            Pick one service with upfront price ranges, or combine multiple
            services into a custom scope.
          </p>
        </div>

        {/* Flat Brand-Matched Tray matching Service Showcase Sections */}
        <div
          data-aos="fade-up"
          data-aos-offset="20"
          data-aos-delay="80"
          className="rounded-[22px] bg-[#f2f2f0] border border-black/[0.08] p-4 sm:p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {SERVICE_TIERS.map((tier) => {
              const isFeatured = Boolean(tier.featured);
              return (
                <div
                  key={tier.id}
                  className={`flex flex-col justify-between p-6 rounded-[16px] bg-white ${
                    isFeatured
                      ? "border border-[#202124]/25"
                      : "border border-black/[0.07]"
                  }`}
                >
                  <div>
                    {/* Top Pill Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                        style={{
                          background: isFeatured ? "#d2fb95" : "#f2f2f0",
                          color: "#202124",
                        }}
                      >
                        {isFeatured && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#202124]" />
                        )}
                        {tier.tag}
                      </span>
                      <span className="text-[11px] font-medium text-[#51565c]">
                        {tier.cadence}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-[19px] sm:text-[21px] font-medium leading-[1.2] tracking-[-0.025em] text-[#202124] mb-2">
                      {tier.title}
                    </h3>

                    {/* Pricing Range */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[24px] sm:text-[26px] font-semibold tracking-[-0.03em] text-[#202124]">
                        {tier.priceRange}
                      </span>
                      <span className="text-[11px] text-[#51565c]">
                        typical range
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] leading-[1.6] text-[#51565c] font-normal m-0 mb-5">
                      {tier.description}
                    </p>
                  </div>

                  {/* Deliverables + CTA */}
                  <div className="pt-4 mt-auto border-t border-black/[0.07]">
                    <div className="space-y-2 mb-5 text-[12px] text-[#202124]/85">
                      {tier.includes.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <span
                            className="w-4 h-4 rounded-full inline-flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              background: isFeatured ? "#d2fb95" : "#eaf4fc",
                            }}
                          >
                            <Check className="w-2.5 h-2.5 text-[#202124] stroke-[2.2]" />
                          </span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenContact?.(tier.modalService)}
                      className={`group/btn w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-[13px] transition-colors cursor-pointer ${
                        isFeatured
                          ? "bg-[#202124] hover:bg-neutral-800 text-white focus-visible:outline-2 focus-visible:outline-[#202124]"
                          : "bg-[#f2f2f0] hover:bg-[#202124] text-[#202124] hover:text-white focus-visible:outline-2 focus-visible:outline-[#202124]"
                      }`}
                    >
                      <span>{tier.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
