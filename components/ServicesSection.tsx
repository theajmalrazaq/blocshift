"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Sparkles,
  Box,
  Layers,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Zap,
  Terminal,
  ExternalLink,
} from "lucide-react";

interface ServicesSectionProps {
  onOpenContact?: () => void;
}

interface ServiceCategory {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ElementType;
  deliverables: string[];
  metrics: string;
  gradient: string;
  featured?: boolean;
}

const SERVICES: ServiceCategory[] = [
  {
    id: "web-engineering",
    number: "01",
    tag: "Core Engineering",
    title: "Web & Platform Engineering",
    description:
      "Full-stack web applications and platforms built with Next.js 16, React 19, TypeScript, and high-performance serverless architectures. Engineered for sub-second loading, SEO dominance, and fluid 60fps interactions.",
    icon: Code2,
    deliverables: [
      "Next.js 16 & React 19 Apps",
      "Headless CMS & E-Commerce",
      "API & Database Architecture",
      "Sub-50ms Edge Performance",
    ],
    metrics: "100/100 Core Web Vitals",
    gradient: "from-[#e8f4fc]/80 to-[#ffffff]",
    featured: true,
  },
  {
    id: "applied-ai",
    number: "02",
    tag: "AI & Intelligence",
    title: "Applied AI & Autonomous Agents",
    description:
      "Custom AI agents, intelligent scrapers, and background automation pipelines that connect directly into your CRM, database, and internal tools to eliminate repetitive manual work.",
    icon: Sparkles,
    deliverables: [
      "Custom Autonomous Agents",
      "Automated Scraping & Ingestion",
      "LLM & Decision Pipelines",
      "Tool & Webhook Integration",
    ],
    metrics: "24/7 Automated Execution",
    gradient: "from-[#ede9fe]/70 to-[#ffffff]",
    featured: true,
  },
  {
    id: "3d-interactive",
    number: "03",
    tag: "Interactive Web",
    title: "3D Product Visualizers & WebGL",
    description:
      "Real-time 3D configurators and interactive WebGL experiences that allow high-ticket buyers to inspect materials, rotate angles, and customize options in real time.",
    icon: Box,
    deliverables: [
      "Three.js & WebGL Visualizers",
      "Real-Time 3D Configurators",
      "Spatial & Physics Interactions",
      "Lightweight Mobile 3D Assets",
    ],
    metrics: "Fluid 60fps WebGL",
    gradient: "from-[#dbeafe]/70 to-[#ffffff]",
  },
  {
    id: "ui-ux-design",
    number: "04",
    tag: "Design Direction",
    title: "Product Design & Design Systems",
    description:
      "Tactile interfaces and multi-platform Figma design systems. Every token, squircle, and interaction state is engineered with extreme care to balance aesthetic elegance with usability.",
    icon: Layers,
    deliverables: [
      "Figma Design Systems",
      "High-Fidelity Wireframes",
      "Micro-Interaction Specs",
      "Design-to-Code Handoff",
    ],
    metrics: "Zero-Friction Handoff",
    gradient: "from-[#f1f5f9]/80 to-[#ffffff]",
  },
  {
    id: "conversion-pages",
    number: "05",
    tag: "Growth & CRO",
    title: "High-Converting Landing Pages",
    description:
      "Editorial storytelling paired with conversion architecture. Designed to establish immediate institutional credibility, communicate complex value propositions, and drive qualified pipeline.",
    icon: Zap,
    deliverables: [
      "Lead Generation Funnels",
      "Story-Driven Editorial Layouts",
      "Direct RFQ / Booking Paths",
      "A/B Tested Responsive UI",
    ],
    metrics: "Optimized for 3s Clarity",
    gradient: "from-[#fee2e2]/40 to-[#ffffff]",
  },
  {
    id: "data-analytics",
    number: "06",
    tag: "Data UX",
    title: "Executive Dashboards & Telemetry",
    description:
      "Transforming complex operational data into crisp, legible decision interfaces. Real-time telemetry, visual KPIs, and custom analytical portals tailored to how leadership works.",
    icon: BarChart3,
    deliverables: [
      "Real-Time KPI Dashboards",
      "Data Analytics & Telemetry",
      "Custom Reporting Tools",
      "Role-Based Access Control",
    ],
    metrics: "Real-Time Telemetry",
    gradient: "from-[#e0f2fe]/70 to-[#ffffff]",
  },
];

export default function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06] overflow-hidden"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-[760px] mx-auto mb-14 sm:mb-20">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[14px] bg-black text-white text-[11px] sm:text-xs font-medium tracking-wide mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d2fb95] animate-pulse" />
            <span>WHAT WE OFFER</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-[-0.035em] text-black m-0">
            One dedicated studio from concept to production code.
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[620px] m-0">
            No handoff friction, no junior delegations. We design, engineer, and
            automate complete digital products engineered for velocity and craft.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-[20px] border border-black/[0.08] bg-gradient-to-b ${service.gradient} transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.08)] hover:border-black/20 ${
                  service.featured && !isHovered ? "ring-1 ring-black/[0.05]" : ""
                }`}
                style={{
                  cornerShape: "squircle",
                  WebkitCornerShape: "squircle",
                } as React.CSSProperties}
              >
                {/* Card Top: Number + Tag + Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-black/40 tabular-nums">
                        {service.number}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-black/20" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/60">
                        {service.tag}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-[12px] bg-black text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="w-5 h-5 text-white/95 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-[22px] font-medium leading-[1.2] tracking-[-0.025em] text-black mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] leading-[1.65] text-black/65 font-normal m-0 mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Card Bottom: Deliverables checklist & Metric */}
                <div className="pt-5 border-t border-black/[0.07] mt-auto">
                  <div className="space-y-2 mb-5">
                    {service.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2 text-[12px] text-black/75"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-black/40 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Pill */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.07] text-[11px] font-medium text-black/80">
                      <Zap className="w-3 h-3 text-black/50" />
                      <span>{service.metrics}</span>
                    </span>

                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-1 text-[12px] font-semibold text-black/80 hover:text-black transition-colors cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner matching Hero/Showcase CTA style */}
        <div className="mt-14 sm:mt-18 p-8 sm:p-10 rounded-[24px] bg-gradient-to-r from-[#0d131a] via-[#161f2c] to-[#0d131a] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="max-w-[540px]">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#d2fb95] mb-2">
              Ready to ship
            </span>
            <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-tight m-0 text-white">
              Have a high-impact project in mind?
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/70 m-0">
              We take on a limited number of select builds every quarter. Talk directly with our engineering and design leads.
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
