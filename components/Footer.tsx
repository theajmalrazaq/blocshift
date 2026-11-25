"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import FooterAsciiWordmark from "./FooterAsciiWordmark";

interface FooterProps {
  onOpenContact?: () => void;
}

const NAV_LINKS = [
  { label: "Projects", href: "#case-studies" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Engagement", href: "#engagement" },
  { label: "FAQ", href: "#faq" },
];

const CAPABILITY_LINKS = [
  { label: "AI Agents & Automation", href: "#ai-agents" },
  { label: "Web & Platform Engineering", href: "#web-engineering" },
  { label: "Product Design & Systems", href: "#design-systems" },
  { label: "Landing Pages & Telemetry", href: "#landing-pages" },
];

export default function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden text-white pt-24 sm:pt-32 pb-20 sm:pb-28"
    >
      {/* Hero-Matched Sky Gradient & Clouds */}
      <div className="footer-sky-bg" aria-hidden="true" />

      {/* Grass Foreground Bookend matching Hero */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-[44%] z-10 w-full opacity-95"
        aria-hidden="true"
      >
        <Image
          src="/images/grass.png"
          alt=""
          width={6000}
          height={2000}
          sizes="100vw"
          className="w-full h-auto block"
        />
      </div>

      <div className="wrap relative z-20">
        {/* Top Structured Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 sm:pb-16 border-b border-white/20">
          {/* Brand Column */}
          <div data-aos="fade-up" className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-white font-bold text-lg tracking-tight"
              aria-label="Blocshift home"
            >
              <Image
                src="/images/logo.svg"
                alt="Blocshift logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span>Blocshift</span>
            </Link>

            <p className="mt-3.5 text-sm sm:text-[15px] leading-[1.65] text-white/85 max-w-[360px] m-0">
              We design and build web platforms, design systems, and custom AI agents that hold up in production.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-[14px] bg-black hover:bg-neutral-900 text-white font-semibold text-[14px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <Link
                href="#case-studies"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-white hover:bg-neutral-100 text-black font-semibold text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <span>Explore Work</span>
              </Link>
            </div>
          </div>

          {/* Navigation Column */}
          <div data-aos="fade-up" data-aos-delay="80" className="lg:col-span-3 lg:col-start-7">
            <div className="text-[11px] uppercase tracking-[0.08em] text-white/65 mb-4">
              Explore
            </div>
            <ul className="list-none p-0 m-0 space-y-2.5 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities Column */}
          <div data-aos="fade-up" data-aos-delay="140" className="lg:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.08em] text-white/65 mb-4">
              Capabilities
            </div>
            <ul className="list-none p-0 m-0 space-y-2.5 text-sm font-medium">
              {CAPABILITY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big Interactive ASCII "BLOCSHIFT" Wordmark */}
        <div data-aos="fade-up" data-aos-delay="100" className="py-10 sm:py-14">
          <FooterAsciiWordmark />
        </div>

        {/* Bottom Copyright & Back-to-Top Row */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-white/85">
          <div>
            &copy; {new Date().getFullYear()} Blocshift. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-white/75 hidden sm:inline">
              Engineered for speed. Built for craft.
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
