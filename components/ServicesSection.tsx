"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Visual01WebEngineering,
  Visual02AIAgents,
  Visual03DesignSystems,
  Visual04LandingPages,
  Visual05Telemetry,
} from "./ServicesVisuals";

interface ServicesSectionProps {
  onOpenContact?: () => void;
}

interface ServiceCardData {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  specs: string[];
  benefit: string;
  gradient: string;
  colSpan: string;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "web-engineering",
    number: "01",
    category: "Full-Stack Web",
    title: "Web & Platform Engineering",
    description:
      "Full-stack web applications and scalable platforms engineered for sub-second performance, high reliability, and seamless user experiences across every screen.",
    visual: <Visual01WebEngineering />,
    specs: [
      "Custom web applications & portals",
      "Headless e-commerce & APIs",
      "Scalable full-stack engineering",
      "Core Web Vitals & SEO standards",
    ],
    benefit: "Production-Ready",
    gradient: "from-[#e8f4fc]/90 via-[#f4f9fd]/60 to-white",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-7",
  },
  {
    id: "applied-ai",
    number: "02",
    category: "AI & Intelligence",
    title: "AI Agents & Workflow Automation",
    description:
      "Custom autonomous AI agents, intelligent scrapers, and background pipelines that connect directly into your tools to eliminate repetitive manual overhead.",
    visual: <Visual02AIAgents />,
    specs: [
      "Autonomous multi-agent workflows",
      "Automated scraping & data ingestion",
      "CRM, database & webhook integrations",
      "24/7 background task execution",
    ],
    benefit: "24/7 Autonomous",
    gradient: "from-[#f2f2f0]/90 via-[#f8f8f7]/60 to-white",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-5",
  },
  {
    id: "design-systems",
    number: "03",
    category: "Interface Craft",
    title: "Product Design & Design Systems",
    description:
      "Human-centered interface design and scalable Figma component libraries. We bridge the gap between creative visual craft and structured design-to-code execution.",
    visual: <Visual03DesignSystems />,
    specs: [
      "End-to-end UX/UI interface design",
      "Multi-platform Figma design systems",
      "Tactile interactive prototypes",
      "Pixel-clean developer handoff",
    ],
    benefit: "Design Systems",
    gradient: "from-[#f1f5f9] via-[#f8fafc]/70 to-white",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-6",
  },
  {
    id: "conversion-funnels",
    number: "04",
    category: "Growth & CRO",
    title: "High-Converting Landing Pages",
    description:
      "Editorial storytelling paired with conversion architecture. Engineered to establish instant credibility, communicate value within seconds, and turn visitors into pipeline.",
    visual: <Visual04LandingPages />,
    specs: [
      "High-impact value messaging & copy",
      "Frictionless lead generation funnels",
      "Story-driven editorial layouts",
      "Built-in conversion & event tracking",
    ],
    benefit: "High Conversion",
    gradient: "from-[#f2f2f0]/90 via-[#f8f8f7]/60 to-white",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-6",
  },
  {
    id: "telemetry-dashboards",
    number: "05",
    category: "Data UX",
    title: "Executive Dashboards & Telemetry",
    description:
      "Transforming complex, fragmented operational data into clear, actionable decision interfaces. Real-time telemetry, visual KPIs, and custom portals built for fast leadership decisions.",
    visual: <Visual05Telemetry />,
    specs: [
      "Live KPI & operational telemetry",
      "Intuitive business data visualization",
      "Role-based views & team permissions",
      "Automated reporting & live data sync",
    ],
    benefit: "Real-Time Telemetry",
    gradient: "from-[#e0f2fe]/80 via-[#f0f9ff]/60 to-white",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-12",
  },
];

export default function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06] overflow-hidden"
    >
      {/* Background Interactive Pixel Matrix Grid */}
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
        <div className="flex flex-col items-center text-center max-w-[780px] mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-black m-0">
            Engineered for speed. Built for craft.
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[620px] m-0">
            From high-performance web platforms and autonomous AI systems to intuitive
            product design and high-converting funnels — we turn complex challenges into shipped reality.
          </p>
        </div>

        {/* Pixel-Infused Bento Grid with Soft Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {SERVICES_DATA.map((service) => {
            const isFullWidthBento = service.id === "telemetry-dashboards";

            return (
              <div
                key={service.id}
                className={`group relative rounded-[22px] bg-gradient-to-b ${service.gradient} ${service.colSpan}`}
                style={{
                  cornerShape: "squircle",
                  WebkitCornerShape: "squircle",
                } as React.CSSProperties}
              >
                {isFullWidthBento ? (
                  /* Panoramic Bento Card Layout for Telemetry & Analytics */
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 justify-between p-6 sm:p-8 h-full">
                    {/* Left details */}
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        {/* Title */}
                        <h3 className="text-xl sm:text-[24px] font-medium leading-[1.2] tracking-[-0.025em] text-black mb-2.5">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-[13px] leading-[1.65] text-black/65 font-normal m-0 mb-5 max-w-[580px]">
                          {service.description}
                        </p>

                        {/* 2-Column Features Checklist on larger screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-[12px] sm:text-[13px] text-black/75">
                          {service.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-black/50 flex-shrink-0 stroke-[1.8]" />
                              <span className="leading-snug">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Benefit & Action Bar */}
                      <div className="flex items-center justify-between pt-4 border-t border-black/[0.07] mt-auto">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-[8px] bg-black/[0.04] border border-black/[0.06] text-[11px] font-medium text-black/70">
                          <span>{service.benefit}</span>
                        </span>

                        <button
                          type="button"
                          onClick={onOpenContact}
                          className="group/inq inline-flex items-center gap-1.5 text-[12px] font-semibold text-black hover:text-black transition-colors cursor-pointer"
                          aria-label={`Inquire about ${service.title}`}
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/inq:translate-x-0.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Panoramic Visual */}
                    <div className="w-full lg:w-[46%] h-[180px] sm:h-[215px] rounded-[16px] overflow-hidden relative flex-shrink-0">
                      {service.visual}
                    </div>
                  </div>
                ) : (
                  /* Standard Bento Card Layout */
                  <div className="flex flex-col justify-between p-5 sm:p-6 h-full">
                    <div>
                      {/* Visual Slot */}
                      <div className="relative w-full h-[155px] sm:h-[180px] rounded-[14px] overflow-hidden mb-5">
                        {service.visual}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-[22px] font-medium leading-[1.2] tracking-[-0.025em] text-black mb-2.5">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] leading-[1.65] text-black/65 font-normal m-0 mb-5">
                        {service.description}
                      </p>
                    </div>

                    {/* Service Features Checklist */}
                    <div className="pt-4 border-t border-black/[0.07] mt-auto">
                      <div className="space-y-2 mb-5 text-[12px] sm:text-[13px] text-black/75">
                        {service.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-black/50 flex-shrink-0 stroke-[1.8]" />
                            <span className="leading-snug">{spec}</span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Benefit & Action Bar */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-[8px] bg-black/[0.04] border border-black/[0.06] text-[11px] font-medium text-black/70">
                          <span>{service.benefit}</span>
                        </span>

                        <button
                          type="button"
                          onClick={onOpenContact}
                          className="group/inq inline-flex items-center gap-1.5 text-[12px] font-semibold text-black hover:text-black transition-colors cursor-pointer"
                          aria-label={`Inquire about ${service.title}`}
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/inq:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
