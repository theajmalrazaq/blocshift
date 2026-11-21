"use client";

import React from "react";
import Image from "next/image";
import { AlertCircle, Lightbulb, Maximize2 } from "lucide-react";
import { CaseStudy } from "@/data/portfolioData";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onPreview: (study: CaseStudy) => void;
}

export default function CaseStudyCard({
  caseStudy,
  onPreview,
}: CaseStudyCardProps) {
  return (
    <article className="group min-w-0 bg-[var(--surface)] border border-[var(--line)] rounded-[22px] p-2.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(31,38,45,0.12)] flex flex-col justify-between">
      <div>
        {/* Preview image with hover zoom trigger */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => onPreview(caseStudy)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPreview(caseStudy);
            }
          }}
          className="relative w-full aspect-[16/10] overflow-hidden rounded-[14px] bg-[var(--surface-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] block"
          aria-label={`View full preview of ${caseStudy.title}`}
        >
          <Image
            src={caseStudy.image}
            alt={caseStudy.alt}
            fill
            sizes="(max-width: 650px) 100vw, (max-width: 980px) 50vw, 380px"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Quick Zoom Pill Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-sm">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Preview</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="pt-3.5 px-2.5 pb-2.5">
          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-[11px] font-bold leading-none">
            {caseStudy.tag}
          </span>

          <h3 className="my-3 text-[22px] font-semibold leading-[1.16] tracking-[-0.035em] text-[var(--ink)]">
            {caseStudy.title}
          </h3>

          {/* Problem */}
          <div className="mt-3.5">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-[var(--ink)]">
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              <span>Problem</span>
            </div>
            <p className="m-0 text-[var(--muted)] text-[14px] leading-[1.55]">
              {caseStudy.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="mt-3.5">
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-[var(--ink)]">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
              <span>Solution</span>
            </div>
            <p className="m-0 text-[var(--muted)] text-[14px] leading-[1.55]">
              {caseStudy.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Meta Definition List */}
      <dl className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3.5 mt-4 pt-4 border-t border-[var(--line)] px-2.5 pb-1">
        <div className="min-w-0">
          <dt className="mb-1 text-[11px] font-bold text-[var(--ink)]">
            Deliverables
          </dt>
          <dd className="m-0 text-[var(--muted)] text-[12px] leading-[1.45]">
            {caseStudy.deliverables}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="mb-1 text-[11px] font-bold text-[var(--ink)]">
            Highlights
          </dt>
          <dd className="m-0 text-[var(--muted)] text-[12px] leading-[1.45]">
            {caseStudy.highlights}
          </dd>
        </div>
      </dl>
    </article>
  );
}
