"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  CASE_STUDY_CATEGORIES,
  CategoryId,
  EMAIL_CASE_STUDIES,
  LANDING_CASE_STUDIES,
  STAGES,
  CaseStudy,
} from "@/data/portfolioData";
import CaseStudyCard from "./CaseStudyCard";
import StageCard from "./StageCard";
import ImageLightboxModal from "./ImageLightboxModal";
import { Search, X } from "lucide-react";

export default function CaseStudiesSection() {
  const [activeTab, setActiveTab] = useState<CategoryId>("email");
  const [previewCase, setPreviewCase] = useState<CaseStudy | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Count items for each category
  const counts: Record<CategoryId, number> = {
    email: EMAIL_CASE_STUDIES.length,
    landing: LANDING_CASE_STUDIES.length,
    social: 1,
    data: 1,
    ai: 1,
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = CASE_STUDY_CATEGORIES.length;
    let nextIndex = index;

    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % total;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = total - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(CASE_STUDY_CATEGORIES[nextIndex].id);
    tabsRef.current[nextIndex]?.focus();
  };

  // Filter case studies if search query is present
  const filteredStudies = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const all = [...EMAIL_CASE_STUDIES, ...LANDING_CASE_STUDIES];
    return all.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.problem.toLowerCase().includes(query) ||
        c.solution.toLowerCase().includes(query) ||
        c.deliverables.toLowerCase().includes(query) ||
        c.tag.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section className="section py-14 sm:py-20" id="case-studies">
      <div className="wrap">
        {/* Section Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-[-0.05em] text-[var(--ink)]">
              Shipped so far
            </h2>
          </div>
          <p className="max-w-[500px] text-[var(--muted)] text-base sm:text-[17px] leading-relaxed m-0">
            Focused work across brand, product and automation — designed as one
            connected system rather than a pile of disconnected deliverables.
          </p>
        </div>

        {/* Filter and Search Bar Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6 sm:my-8">
          {/* Accessible Tabs */}
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-2.5"
            role="tablist"
            aria-label="Case study categories"
          >
            {CASE_STUDY_CATEGORIES.map((cat, idx) => {
              const isSelected = activeTab === cat.id && !searchQuery;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabsRef.current[idx] = el;
                  }}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setSearchQuery("");
                  }}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-[13px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--ink)] ${
                    isSelected
                      ? "bg-[var(--lime)] text-[var(--lime-ink)]"
                      : "bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--ink)]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-black/10 text-[var(--lime-ink)]"
                        : "bg-[var(--line)] text-[var(--muted)]"
                    }`}
                  >
                    {counts[cat.id]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ink)] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)] p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content Panels */}
        <div id="panels" className="mt-6">
          {/* If Search is Active */}
          {searchQuery ? (
            <div>
              <div className="mb-4 text-sm text-[var(--muted)]">
                Found {filteredStudies?.length || 0} result
                {filteredStudies?.length === 1 ? "" : "s"} for &ldquo;{searchQuery}&rdquo;:
              </div>
              {filteredStudies && filteredStudies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredStudies.map((study) => (
                    <CaseStudyCard
                      key={study.id}
                      caseStudy={study}
                      onPreview={(s) => setPreviewCase(s)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-[var(--surface)] border border-[var(--line)] rounded-3xl">
                  <p className="text-[var(--muted)] text-base mb-3">
                    No case studies matched your search query.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Email Newsletters Panel */}
              <div
                id="panel-email"
                role="tabpanel"
                aria-labelledby="tab-email"
                hidden={activeTab !== "email"}
                className={activeTab === "email" ? "block" : "hidden"}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {EMAIL_CASE_STUDIES.map((study) => (
                    <CaseStudyCard
                      key={study.id}
                      caseStudy={study}
                      onPreview={(s) => setPreviewCase(s)}
                    />
                  ))}
                </div>
              </div>

              {/* Landing Pages Panel */}
              <div
                id="panel-landing"
                role="tabpanel"
                aria-labelledby="tab-landing"
                hidden={activeTab !== "landing"}
                className={activeTab === "landing" ? "block" : "hidden"}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {LANDING_CASE_STUDIES.map((study) => (
                    <CaseStudyCard
                      key={study.id}
                      caseStudy={study}
                      onPreview={(s) => setPreviewCase(s)}
                    />
                  ))}
                </div>
              </div>

              {/* Social Media Post Panel */}
              <div
                id="panel-social"
                role="tabpanel"
                aria-labelledby="tab-social"
                hidden={activeTab !== "social"}
                className={activeTab === "social" ? "block" : "hidden"}
              >
                <StageCard stage={STAGES.social} />
              </div>

              {/* Data Analytics Panel */}
              <div
                id="panel-data"
                role="tabpanel"
                aria-labelledby="tab-data"
                hidden={activeTab !== "data"}
                className={activeTab === "data" ? "block" : "hidden"}
              >
                <StageCard stage={STAGES.data} />
              </div>

              {/* AI Agents Panel */}
              <div
                id="panel-ai"
                role="tabpanel"
                aria-labelledby="tab-ai"
                hidden={activeTab !== "ai"}
                className={activeTab === "ai" ? "block" : "hidden"}
              >
                <StageCard stage={STAGES.ai} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        caseStudy={previewCase}
        onClose={() => setPreviewCase(null)}
      />
    </section>
  );
}
