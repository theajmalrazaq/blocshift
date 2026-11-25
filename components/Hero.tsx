import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroAsciiLogo from "./HeroAsciiLogo";

interface HeroProps {
  onOpenContact?: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center isolate overflow-hidden">
      {/* Superflex Hero Sky Gradient & Clouds */}
      <div className="animated-bg" aria-hidden="true" />

      {/* Large Hero Code-B Watermark in Sky Background */}
      <div
        className="pointer-events-none select-none absolute inset-0 z-0 flex items-center justify-center translate-y-12 sm:translate-y-16"
        aria-hidden="true"
      >
        <div
          className="w-[340px] sm:w-[480px] md:w-[580px] max-w-[90vw]"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0) 70%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0) 70%)",
          }}
        >
          <HeroAsciiLogo />
        </div>
      </div>

      {/* Grass foreground at hero bottom */}
      <div
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 translate-y-[38%] z-10 w-full"
        aria-hidden="true"
      >
        <Image
          src="/images/grass.png"
          alt=""
          width={6000}
          height={2000}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />
      </div>

      <div className="wrap relative z-20 pt-20 pb-40 sm:pb-48 flex justify-center">
        <div className="relative w-full max-w-[780px] flex flex-col items-center justify-center text-center">
          {/* Hero Copy */}
          <div className="relative z-10 w-full flex flex-col items-center">
            <h1
              data-aos="fade-up"
              className="text-[42px] sm:text-[52px] md:text-[64px] leading-[1.05] tracking-[-0.03em] font-medium text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.12)]"
            >
              Design and code for software that solves real problems
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="max-w-[580px] mt-3 mb-5 text-sm sm:text-[15px] leading-[1.65] text-white/90 font-normal"
            >
              Web platforms, design systems, custom AI agents, and live dashboards.
              One focused team from first sketch to launch.
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="flex flex-wrap items-center justify-center gap-3.5 pt-1"
            >
              <button
                type="button"
                onClick={onOpenContact}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-[14px] bg-black hover:bg-neutral-900 text-white font-semibold text-[15px] transition-colors cursor-pointer focus-visible:outline-3 focus-visible:outline-black"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <Link
                href="#case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[14px] bg-white hover:bg-neutral-100 text-black font-semibold text-[15px] transition-colors focus-visible:outline-3 focus-visible:outline-white"
              >
                <span>Explore Work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
