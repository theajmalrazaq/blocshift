import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

interface ContactSectionProps {
  onOpenContact?: () => void;
}

export default function ContactSection({ onOpenContact }: ContactSectionProps) {
  return (
    <section className="bg-[var(--lime)] text-[var(--lime-ink)] py-14 sm:py-20 transition-colors" id="contact">
      <div className="wrap flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
        <div className="max-w-[760px] reveal-on-scroll">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-black/60 mb-2">
            Let&apos;s Build Together
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-[-0.05em] m-0 text-[#202124]">
            Have a problem worth solving?
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-shrink-0 reveal-scale-on-scroll reveal-delay-200">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2.5 bg-black text-white hover:bg-neutral-900 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg whitespace-nowrap transition-colors cursor-pointer"
          >
            <Mail className="w-5 h-5 text-[#d2fb95]" />
            <span>Start a Project</span>
          </button>

          <Link
            href="#case-studies"
            className="inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white text-black px-5 sm:px-6 py-3.5 sm:py-4 rounded-full font-bold text-base whitespace-nowrap transition-colors"
          >
            <span>Explore Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
