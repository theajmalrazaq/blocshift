"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, AlertCircle, Lightbulb } from "lucide-react";
import { CaseStudy } from "@/data/portfolioData";

interface LightboxProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function ImageLightboxModal({ caseStudy, onClose }: LightboxProps) {
  useEffect(() => {
    if (!caseStudy) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[var(--surface)] border border-[var(--line)] rounded-3xl shadow-2xl p-5 sm:p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold uppercase tracking-wider">
              {caseStudy.tag}
            </span>
            <h2
              id="modal-case-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]"
            >
              {caseStudy.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            aria-label="Close case study details"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Full Image Preview */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--surface-2)] border border-[var(--line)] shadow-inner">
          <div className="relative w-full min-h-[300px] sm:min-h-[440px]">
            <Image
              src={caseStudy.image}
              alt={caseStudy.alt}
              width={1440}
              height={900}
              className="w-full h-auto object-contain max-h-[60vh] mx-auto block"
              priority
            />
          </div>
        </div>

        {/* Case Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[var(--page)] border border-[var(--line)]">
              <div className="flex items-center gap-2 mb-2 text-sm font-bold text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--page)] border border-[var(--line)]">
              <div className="flex items-center gap-2 mb-2 text-sm font-bold text-emerald-600">
                <Lightbulb className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 rounded-2xl bg-[var(--page)] border border-[var(--line)] gap-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
                Deliverables
              </h3>
              <p className="text-sm sm:text-base font-medium text-[var(--ink)]">
                {caseStudy.deliverables}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
                Project Highlights
              </h3>
              <p className="text-sm sm:text-base text-[var(--muted)]">
                {caseStudy.highlights}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between">
              <span className="text-xs text-[var(--muted)]">
                Crafted by Blocshift Studio
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-black text-white text-xs font-bold cursor-pointer hover:bg-neutral-900 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
