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
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "industrial-3d",
    metric: "2.4× Qualified RFQs",
    quote:
      "Blocshift turned a dense, PDF-heavy catalog into an interactive web app our enterprise buyers understood right away. Every week brought a working staging link we could click through.",
    author: "Marcus Vance",
    role: "VP of Product",
    company: "Industrial 3D Platform",
    initials: "MV",
  },
  {
    id: "ai-workflows",
    metric: "40+ Hrs/Wk Saved",
    quote:
      "Most studios pitch decks about AI. Blocshift wired live ingestion workflows straight into our CRM and ops dashboard, and it has run quietly in production since day one.",
    author: "Elena Rostova",
    role: "Co-Founder & COO",
    company: "B2B Operations SaaS",
    initials: "ER",
  },
  {
    id: "design-engineering",
    metric: "99+ Lighthouse",
    quote:
      "Having the same dedicated team own both our Figma system and production Next.js repo wiped out handoff friction completely. We launched fast and hit 99 on Lighthouse out of the gate.",
    author: "Daniel Okafor",
    role: "Head of Engineering",
    company: "Fintech Telemetry Suite",
    initials: "DO",
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
        <div data-aos="fade-up" className="flex flex-col items-center text-center max-w-[720px] mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            Client Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
            Trusted by teams that ship.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-[17px] leading-[1.65] text-black/60 font-normal max-w-[540px] m-0">
            Founders and product leaders bring us in when craft, speed, and reliability all have to land together.
          </p>
        </div>

        {/* 3-Column Flat Testimonial Tray matching Service & Engagement UI */}
        <div
          data-aos="fade-up"
          data-aos-offset="20"
          data-aos-delay="80"
          className="rounded-[22px] bg-[#f2f2f0] border border-black/[0.08] p-4 sm:p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((item) => (
              <figure
                key={item.id}
                className="m-0 flex flex-col justify-between p-6 sm:p-7 rounded-[16px] bg-white border border-black/[0.07]"
              >
                <div>
                  {/* Outcome Badge */}
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-5"
                    style={{ background: "#d2fb95", color: "#202124" }}
                  >
                    {item.metric}
                  </span>

                  {/* Quote */}
                  <blockquote className="m-0 text-sm sm:text-[15px] leading-[1.65] text-[#202124]/85 font-normal mb-7">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Block */}
                <figcaption className="flex items-center gap-3 pt-4 border-t border-black/[0.07] mt-auto">
                  <div
                    className="w-9 h-9 rounded-full bg-[#202124] text-white flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-[#202124] leading-snug">
                      {item.author}
                    </div>
                    <div className="text-[12px] text-[#51565c] leading-snug truncate">
                      {item.role} · {item.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
