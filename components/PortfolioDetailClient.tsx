"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import { PortfolioVisual } from "@/components/PortfolioVisual";
import { MealCircleBrandGuidelinesBoard } from "@/components/MealCircleBrandShowcase";
import { EvenlyBrandGuidelinesBoard } from "@/components/EvenlyBrandShowcase";
import type { PortfolioItem } from "@/data/portfolioItems";

interface PortfolioDetailClientProps {
  item: PortfolioItem;
  relatedItems: PortfolioItem[];
  nextItem: PortfolioItem;
}

export default function PortfolioDetailClient({
  item,
  relatedItems,
  nextItem,
}: PortfolioDetailClientProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      <ScrollAnimationProvider />
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        {/* Top breadcrumb + Header */}
        <section className="wrap mb-7 sm:mb-9">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <Link
              href={`/portfolio?category=${encodeURIComponent(item.categoryId)}`}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[#202124] bg-[#f2f2f0] hover:bg-[#e7e7e4] transition-colors"
              style={{ border: "1px solid rgba(32, 33, 36, 0.09)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {item.categoryLabel}</span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/portfolio?category=${encodeURIComponent(item.categoryId)}`}
                className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium"
                style={{
                  background: "#d2fb95",
                  color: "#202124",
                  border: "1px solid rgba(32, 33, 36, 0.1)",
                }}
              >
                {item.categoryLabel}
              </Link>
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium tabular-nums"
                style={{
                  background: "#f2f2f0",
                  color: "#51565c",
                  border: "1px solid rgba(32, 33, 36, 0.08)",
                }}
              >
                #{item.number}
              </span>
            </div>
          </div>

          <h1 className="text-[32px] sm:text-[48px] font-medium tracking-[-0.03em] leading-[1.06] text-[#202124] mb-3 max-w-[820px]">
            {item.title}
          </h1>
          <p className="text-[16px] sm:text-[18px] leading-[1.55] text-[#51565c] max-w-[700px]">
            {item.summary}
          </p>
        </section>

        {/* Big Hero Visual right at the start */}
        <section className="wrap mb-10 sm:mb-14">
          <PortfolioVisual visual={item.visual} variant="hero" priority />
        </section>

        {/* Extended Brand Showcase Board */}
        {item.visual.kind === "component" &&
          item.visual.visualId === "brand-meal-circle" && (
            <MealCircleBrandGuidelinesBoard />
          )}
        {item.visual.kind === "component" &&
          item.visual.visualId === "brand-evenly" && (
            <EvenlyBrandGuidelinesBoard />
          )}

        {/* Full Project Description: What it is about + What we did + Sidebar */}
        <section className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Editorial Breakdown */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* What it is about */}
              <div
                className="rounded-[20px] p-6 sm:p-8 bg-[#f2f2f0]"
                style={{ border: "1px solid rgba(32, 33, 36, 0.09)" }}
              >
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.09em] text-[#51565c] mb-2">
                  What this project is about
                </span>
                <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#202124]">
                  {item.about}
                </p>
              </div>

              {/* Problem */}
              <div
                className="rounded-[20px] p-6 sm:p-8 bg-white"
                style={{ border: "1px solid rgba(32, 33, 36, 0.1)" }}
              >
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.09em] text-[#51565c] mb-2">
                  The Challenge
                </span>
                <p className="text-[15.5px] sm:text-[16px] leading-[1.65] text-[#51565c]">
                  {item.problem}
                </p>
              </div>

              {/* What we did */}
              <div
                className="rounded-[20px] p-6 sm:p-8 bg-white"
                style={{ border: "1px solid rgba(32, 33, 36, 0.1)" }}
              >
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.09em] text-[#202124] mb-2">
                  What we did
                </span>
                <p className="text-[15.5px] sm:text-[16px] leading-[1.65] text-[#202124] mb-6">
                  {item.whatWeDid}
                </p>

                <div
                  className="pt-5"
                  style={{ borderTop: "1px solid rgba(32, 33, 36, 0.09)" }}
                >
                  <div className="text-[13px] font-medium text-[#202124] mb-3.5">
                    Key execution steps
                  </div>
                  <ul className="space-y-2.5">
                    {item.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[14.5px] leading-[1.55] text-[#51565c]"
                      >
                        <span
                          className="w-5 h-5 rounded-full inline-flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "#d2fb95", color: "#202124" }}
                        >
                          <Check className="w-3 h-3 stroke-[2.2]" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Project Metadata & Action Card */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4">
              <div
                className="rounded-[20px] p-6 bg-[#f2f2f0]"
                style={{ border: "1px solid rgba(32, 33, 36, 0.1)" }}
              >
                <h2 className="text-[15px] font-medium text-[#202124] pb-3.5 mb-4 border-b border-black/[0.08]">
                  Project Snapshot
                </h2>

                <dl className="space-y-3.5 text-[14px]">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[#51565c]">Category</dt>
                    <dd className="font-medium text-[#202124] text-right">
                      {item.categoryLabel}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[#51565c]">Discipline</dt>
                    <dd className="font-medium text-[#202124] text-right">
                      {item.discipline}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[#51565c]">Timeline</dt>
                    <dd className="font-medium text-[#202124] text-right">
                      {item.timeline}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-[#51565c]">Reference</dt>
                    <dd className="font-medium text-[#202124] text-right break-all">
                      {item.domain}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 pt-4 border-t border-black/[0.08]">
                  <div className="text-[12px] font-medium text-[#51565c] mb-2.5">
                    Deliverables
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.deliverables.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-[11.5px] font-medium bg-white text-[#202124]"
                        style={{ border: "1px solid rgba(32, 33, 36, 0.09)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-5 text-[14px] font-medium bg-[#202124] hover:bg-neutral-800 text-white transition-colors cursor-pointer"
                  >
                    <span>Start a similar project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Next Project Mini Card */}
              <Link
                href={`/portfolio/${nextItem.slug}`}
                className="group rounded-[18px] p-5 bg-white hover:bg-[#f2f2f0] transition-colors flex items-center justify-between gap-3"
                style={{ border: "1px solid rgba(32, 33, 36, 0.1)" }}
              >
                <div className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#51565c] mb-1">
                    Next Project · #{nextItem.number}
                  </span>
                  <span className="block text-[15px] font-medium text-[#202124] truncate">
                    {nextItem.title}
                  </span>
                </div>
                <span className="w-9 h-9 rounded-full bg-[#f2f2f0] group-hover:bg-[#d2fb95] transition-colors inline-flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-[#202124]" />
                </span>
              </Link>
            </aside>
          </div>
        </section>

        {/* Related Projects in Category */}
        {relatedItems.length > 0 && (
          <section className="wrap mt-14 sm:mt-20 pt-10 border-t border-black/[0.08]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h2 className="text-[22px] sm:text-[26px] font-medium tracking-[-0.02em] text-[#202124]">
                More in {item.categoryLabel}
              </h2>
              <Link
                href={`/portfolio?category=${encodeURIComponent(item.categoryId)}`}
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#202124] hover:underline underline-offset-4"
              >
                <span>View all {item.categoryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedItems.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/portfolio/${rel.slug}`}
                  className="group rounded-[18px] p-3.5 bg-[#f2f2f0] hover:bg-[#eaeae7] transition-colors flex flex-col justify-between"
                  style={{ border: "1px solid rgba(32, 33, 36, 0.09)" }}
                >
                  <div>
                    <PortfolioVisual visual={rel.visual} variant="card" />
                    <div className="mt-3 px-1">
                      <span className="text-[11px] font-medium text-[#51565c]">
                        #{rel.number} · {rel.discipline}
                      </span>
                      <h3 className="mt-1 text-[16px] font-medium text-[#202124] leading-[1.3] group-hover:underline underline-offset-4">
                        {rel.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer onOpenContact={() => setContactModalOpen(true)} />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialService={item.serviceMatch}
      />
    </div>
  );
}
