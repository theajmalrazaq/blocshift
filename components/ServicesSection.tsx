"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Sparkles,
  Layers,
  BarChart3,
  Zap,
  CheckCircle2,
} from "lucide-react";
import {
  CodeMatrixVisualizer,
  NeuralAgentVisualizer,
  DesignGridVisualizer,
  WaveformVisualizer,
  TelemetryVisualizer,
} from "./ServicesCanvases";

interface ServicesSectionProps {
  onOpenContact?: () => void;
}

interface ServiceCardData {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  visualizer: React.ComponentType;
  specs: string[];
  benefit: string;
  gradient: string;
  colSpan: string;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "web-engineering",
    number: "01",
    category: "Web Development",
    title: "Web & Platform Engineering",
    description:
      "Fast, responsive web apps and platforms built to handle scale and deliver flawless user experiences on any device.",
    icon: Terminal,
    visualizer: CodeMatrixVisualizer,
    specs: [
      "Custom web applications & portals",
      "Headless e-commerce & APIs",
      "Smooth 60fps animations & transitions",
      "Fast load times & SEO optimization",
    ],
    benefit: "Fast & Scalable",
    gradient: "from-[#e8f4fc]/90 via-[#f4f9fd]/60 to-white",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-7",
  },
  {
    id: "applied-ai",
    number: "02",
    category: "AI & Automation",
    title: "AI & Workflow Automation",
    description:
      "Custom AI assistants and background automations that connect your tools, handle repetitive tasks, and save hours every week.",
    icon: Sparkles,
    visualizer: NeuralAgentVisualizer,
    specs: [
      "Custom AI agents & assistants",
      "Automated data extraction & sync",
      "CRM & internal tool integrations",
      "Reliable 24/7 background workflows",
    ],
    benefit: "24/7 Automated",
    gradient: "from-[#ede9fe]/80 via-[#f7f5ff]/60 to-white",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-5",
  },
  {
    id: "design-systems",
    number: "03",
    category: "Product Design",
    title: "Product Design & Design Systems",
    description:
      "Thoughtful interface design and cohesive Figma design systems that make complex products intuitive, modern, and easy to use.",
    icon: Layers,
    visualizer: DesignGridVisualizer,
    specs: [
      "Complete Figma component systems",
      "User journey & wireframe design",
      "Tactile, interactive prototypes",
      "Pixel-clean developer handoff",
    ],
    benefit: "Cohesive Design",
    gradient: "from-[#f1f5f9] via-[#f8fafc]/70 to-white",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-6",
  },
  {
    id: "conversion-funnels",
    number: "04",
    category: "Growth & CRO",
    title: "High-Converting Landing Pages",
    description:
      "High-impact landing pages structured to clearly communicate your value, build instant credibility, and convert visitors into clients.",
    icon: Zap,
    visualizer: WaveformVisualizer,
    specs: [
      "Clear, persuasive value messaging",
      "Frictionless lead capture & booking",
      "Story-driven editorial layout",
      "Built-in conversion tracking",
    ],
    benefit: "Higher Conversion",
    gradient: "from-[#fee2e2]/60 via-[#fef6f6]/60 to-white",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-6",
  },
  {
    id: "telemetry-dashboards",
    number: "05",
    category: "Data & Analytics",
    title: "Dashboards & Analytics",
    description:
      "Clean visual dashboards that transform complex company data into clear, easy-to-read insights for faster decision-making.",
    icon: BarChart3,
    visualizer: TelemetryVisualizer,
    specs: [
      "Live KPI & performance dashboards",
      "Intuitive operational data views",
      "Role-based views for your team",
      "Automated reporting & data sync",
    ],
    benefit: "Real-Time Insights",
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
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-black m-0">
            Engineered for speed. Built for craft.
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[620px] m-0">
            From high-performance web platforms and autonomous AI systems to intuitive
            product design and high-converting funnels — we turn complex challenges into shipped reality.
          </p>
        </div>

        {/* Pixel-Infused Bento Grid with Soft Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {SERVICES_DATA.map((service) => {
            const VisualizerComponent = service.visualizer;
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

                    {/* Right Panoramic Visualizer */}
                    <div className="w-full lg:w-[48%] h-[150px] sm:h-[180px] lg:h-[220px] rounded-[16px] overflow-hidden relative flex-shrink-0">
                      <VisualizerComponent />
                    </div>
                  </div>
                ) : (
                  /* Standard Bento Card Layout */
                  <div className="flex flex-col justify-between p-5 sm:p-6 h-full">
                    <div>
                      {/* Interactive Canvas Visualizer */}
                      <div
                        className={`relative w-full rounded-[14px] overflow-hidden mb-5 ${
                          service.id === "web-engineering"
                            ? "h-[135px] sm:h-[150px]"
                            : "h-[125px] sm:h-[135px]"
                        }`}
                      >
                        <VisualizerComponent />
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

        {/* Bottom Command-Center Banner matching Hero/Showcase CTA style */}
        <div className="mt-14 sm:mt-18 p-8 sm:p-10 rounded-[24px] bg-gradient-to-r from-[#0d131a] via-[#161f2c] to-[#0d131a] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="max-w-[540px]">
            {/* Terminal prompt pill */}
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#d2fb95] mb-2.5">
              <span>$</span>
              <span>blocshift --deploy-project</span>
              <span className="w-1.5 h-3 bg-[#d2fb95] animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-tight m-0 text-white">
              Have a problem worth solving?
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/70 m-0">
              We take on a limited number of select builds every quarter. Talk directly
              with our engineering and design leads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 flex-shrink-0">
            <button
              type="button"
              onClick={onOpenContact}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[14px] bg-white hover:bg-neutral-100 text-black font-semibold text-[15px] transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-white"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <Link
              href="#case-studies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] bg-white/10 hover:bg-white/15 text-white font-semibold text-[15px] transition-colors focus-visible:outline-3 focus-visible:outline-white"
            >
              <span>Explore Shipped Work</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
