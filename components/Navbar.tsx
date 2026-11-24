"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenContact?: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full flex justify-center pointer-events-none">
      <div className="relative pointer-events-auto">
        <nav
          className="relative bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-b-[20px] flex items-center gap-4 sm:gap-7 md:gap-9 shadow-2xl"
          aria-label="Primary navigation"
        >
          {/* Inverted Concave Left Ear */}
          <svg
            className="absolute -left-5 top-0 w-5 h-5 text-black fill-current pointer-events-none"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M0 0 H20 V20 C20 8.9543 11.0457 0 0 0 Z" />
          </svg>

          {/* Inverted Concave Right Ear */}
          <svg
            className="absolute -right-5 top-0 w-5 h-5 text-black fill-current pointer-events-none"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M0 0 H20 C8.9543 0 0 8.9543 0 20 Z" />
          </svg>

          {/* Left: Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-2 text-white font-bold text-base sm:text-lg tracking-tight focus-visible:outline-2 focus-visible:outline-white focus-visible:rounded-full group"
            aria-label="Blocshift home"
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.svg"
                alt="Blocshift logo"
                width={28}
                height={28}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <span>Blocshift</span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-5 sm:gap-6">
            <Link
              href="#case-studies"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              Projects
            </Link>
            <Link
              href="#services"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              Services
            </Link>
            <Link
              href="#process"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              Process
            </Link>
            <Link
              href="#faq"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              FAQ
            </Link>
          </div>

          {/* Right: CTA Button */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={onOpenContact}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>Book a Call</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-1.5 text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[calc(100vw-32px)] max-w-[340px] pointer-events-auto">
            <div className="p-4 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-3">
              <Link
                href="#case-studies"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Services
              </Link>
              <Link
                href="#process"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Process
              </Link>
              <Link
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                FAQ
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact?.();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors"
              >
                <span>Book a Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
