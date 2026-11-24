"use client";

import React from "react";

interface Testimonial {
  id: string;
  metric: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  gradient: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "industrial-3d",
    metric: "2.4× Qualified RFQs",
    quote:
      "Blocshift turned a dense, PDF-heavy catalog into an interactive web experience our enterprise buyers immediately understood. Every Friday there was a working staging build we could click through.",
    author: "Marcus Vance",
    role: "VP of Product",
    company: "Industrial 3D Platform",
    initials: "MV",
    gradient: "from-[#e8f4fc]/85 via-[#f4f9fd]/55 to-white",
  },
  {
    id: "ai-workflows",
    metric: "40+ Hrs/Wk Automated",
    quote:
      "Most agencies pitch slide decks about AI. Blocshift wired autonomous ingestion pipelines straight into our CRM and internal dashboard in under three weeks—and it has run quietly 24/7 since launch.",
    author: "Elena Rostova",
    role: "Co-Founder & COO",
    company: "B2B Operations SaaS",
    initials: "ER",
    gradient: "from-[#f2f2f0]/90 via-[#f8f8f7]/60 to-white",
  },
  {
    id: "design-engineering",
    metric: "Shipped in 3 Weeks",
    quote:
      "Having the same senior team own both our Figma design system and the production Next.js codebase eliminated the usual handoff friction. Performance hit 99 on Lighthouse out of the gate.",
    author: "Daniel Okafor",
    role: "Head of Engineering",
    company: "Fintech Telemetry Suite",
    initials: "DO",
    gradient: "from-[#f1f5f9] via-[#f8fafc]/70 to-white",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06] overflow-hidden"
    >
      {/* Subtle Dot Grid */}
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
        <div className="flex flex-col items-center text-center max-w-[720px] mx-auto mb-14 sm:mb-20 reveal-on-scroll">
          <span className="text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            Client Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] m-0">
            <span className="text-[#202124]">Trusted by teams that ship. </span>
            <span className="text-black/45">Proof in every release.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[560px] m-0">
            Founders and product leaders bring us in when craft, speed, and
            reliability all have to land at once.
          </p>
        </div>

        {/* 3-Column Editorial Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <figure
              key={item.id}
              className={`reveal-on-scroll m-0 flex flex-col justify-between p-6 sm:p-7 rounded-[22px] bg-gradient-to-b ${item.gradient}`}
              style={{
                cornerShape: "squircle",
                WebkitCornerShape: "squircle",
                transitionDelay: `${idx * 70}ms`,
              } as React.CSSProperties}
            >
              <div>
                {/* Outcome Badge */}
                <span className="inline-flex items-center px-2.5 py-1 rounded-[8px] bg-black/[0.04] border border-black/[0.06] text-[11px] font-medium text-black/75 mb-5">
                  {item.metric}
                </span>

                {/* Quote */}
                <blockquote className="m-0 text-sm sm:text-[15px] leading-[1.65] text-black/85 font-normal mb-7">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Block */}
              <figcaption className="flex items-center gap-3 pt-4 border-t border-black/[0.07] mt-auto">
                <div
                  className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-black leading-snug">
                    {item.author}
                  </div>
                  <div className="text-[12px] text-black/55 leading-snug truncate">
                    {item.role} · {item.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
