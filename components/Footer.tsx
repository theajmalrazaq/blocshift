import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--line)] bg-[var(--page)] transition-colors">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 reveal-on-scroll">
          <Image
            src="/images/logo.svg"
            alt="Blocshift logo"
            width={26}
            height={26}
            className="w-6 h-6 object-contain"
          />
          <span className="font-bold text-base text-[var(--ink)]">
            Blocshift
          </span>
          <span className="text-xs text-[var(--muted)]">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-[var(--muted)] font-medium reveal-on-scroll reveal-delay-100">
          <Link
            href="#services"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Services
          </Link>
          <Link
            href="#case-studies"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 p-2 rounded-full hover:bg-[var(--surface)] text-[var(--ink)] transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
