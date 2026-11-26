"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import { PortfolioVisual } from "@/components/PortfolioVisual";
import {
  PORTFOLIO_CATEGORIES,
  getAllPortfolioItems,
  getPortfolioByCategory,
  type PortfolioCategoryId,
} from "@/data/portfolioItems";

const VALID_CATEGORY_IDS = new Set<PortfolioCategoryId>(
  PORTFOLIO_CATEGORIES.map((c) => c.id)
);

export default function PortfolioClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category") as PortfolioCategoryId | null;

  const selectedCategory: PortfolioCategoryId | "all" =
    paramCategory && VALID_CATEGORY_IDS.has(paramCategory)
      ? paramCategory
      : "all";

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );

  const allItems = useMemo(() => getAllPortfolioItems(), []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allItems.length };
    for (const cat of PORTFOLIO_CATEGORIES) {
      counts[cat.id] = allItems.filter((item) => item.categoryId === cat.id).length;
    }
    return counts;
  }, [allItems]);

  const visibleItems = useMemo(
    () => getPortfolioByCategory(selectedCategory),
    [selectedCategory]
  );

  const activeCategoryMeta = useMemo(
    () => PORTFOLIO_CATEGORIES.find((c) => c.id === selectedCategory),
    [selectedCategory]
  );

  const handleSelectCategory = (id: PortfolioCategoryId | "all") => {
    const nextUrl =
      id === "all" ? "/portfolio" : `/portfolio?category=${encodeURIComponent(id)}`;
    router.replace(nextUrl, { scroll: false });
  };

  const handleOpenContact = (service?: string) => {
    setSelectedService(service);
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      <ScrollAnimationProvider />
      <Navbar onOpenContact={() => handleOpenContact()} />

      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        {/* Header & Category Filters */}
        <section className="wrap mb-10 sm:mb-12" data-aos="fade-up">
          <div className="max-w-[780px] mb-8">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium mb-4"
              style={{
                background: "#f2f2f0",
                border: "1px solid rgba(32, 33, 36, 0.09)",
                color: "#202124",
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "#d2fb95", border: "1px solid #202124" }}
              />
              <span>Portfolio Archive · {allItems.length} Projects</span>
            </div>

            <h1 className="text-[36px] sm:text-[52px] font-medium tracking-[-0.03em] leading-[1.05] text-[#202124] mb-4">
              Selected work across brand, UI/UX, web, Klaviyo emails, and AI.
            </h1>

            <p className="text-[16px] sm:text-[18px] leading-[1.55] text-[#51565c] max-w-[640px]">
              Recent client sprints and internal builds. Open any project to see
              what was broken, what we made, and how it works.
            </p>
          </div>

          {/* Horizontal scrollable category pills */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
            <div
              role="tablist"
              aria-label="Portfolio categories"
              className="inline-flex sm:flex flex-nowrap sm:flex-wrap items-center gap-2 pb-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === "all"}
                onClick={() => handleSelectCategory("all")}
                className="whitespace-nowrap inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer"
                style={{
                  background: selectedCategory === "all" ? "#202124" : "#f2f2f0",
                  color: selectedCategory === "all" ? "#ffffff" : "#202124",
                  border:
                    selectedCategory === "all"
                      ? "1px solid #202124"
                      : "1px solid rgba(32, 33, 36, 0.1)",
                }}
              >
                <span>All</span>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[11px] font-semibold"
                  style={{
                    background:
                      selectedCategory === "all"
                        ? "#d2fb95"
                        : "rgba(32, 33, 36, 0.08)",
                    color: "#202124",
                  }}
                >
                  {categoryCounts.all}
                </span>
              </button>

              {PORTFOLIO_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="whitespace-nowrap inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer"
                    style={{
                      background: active ? "#202124" : "#f2f2f0",
                      color: active ? "#ffffff" : "#202124",
                      border: active
                        ? "1px solid #202124"
                        : "1px solid rgba(32, 33, 36, 0.1)",
                    }}
                  >
                    <span>{cat.label}</span>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[11px] font-semibold"
                      style={{
                        background: active
                          ? "#d2fb95"
                          : "rgba(32, 33, 36, 0.08)",
                        color: "#202124",
                      }}
                    >
                      {categoryCounts[cat.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {activeCategoryMeta && (
            <p className="mt-4 text-[14px] text-[#51565c]">
              <strong className="font-medium text-[#202124]">
                {activeCategoryMeta.label}:
              </strong>{" "}
              {activeCategoryMeta.shortDescription}
            </p>
          )}
        </section>

        {/* Portfolio Grid */}
        <section className="wrap">
          {visibleItems.length === 0 ? (
            <div
              className="rounded-[20px] p-10 sm:p-14 text-center bg-[#f2f2f0]"
              style={{ border: "1px solid rgba(32, 33, 36, 0.09)" }}
            >
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold mb-3"
                style={{ background: "#d2fb95", color: "#202124" }}
              >
                {activeCategoryMeta?.label || "Category"}
              </span>
              <h2 className="text-[20px] sm:text-[24px] font-medium tracking-[-0.02em] text-[#202124] mb-2">
                Projects being added here
              </h2>
              <p className="text-[14.5px] text-[#51565c] max-w-[440px] mx-auto">
                We&apos;re curating our latest{" "}
                {activeCategoryMeta?.label.toLowerCase() || "selected"} projects for
                this archive. Check back shortly or ask us to share recent samples on a
                call.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {visibleItems.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="group flex flex-col justify-between rounded-[20px] p-3.5 sm:p-4 bg-[#f2f2f0] transition-colors duration-200 hover:bg-[#eaeae7]"
                style={{ border: "1px solid rgba(32, 33, 36, 0.1)" }}
              >
                <div>
                  <PortfolioVisual visual={item.visual} variant="card" />

                  <div className="mt-4 px-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                        style={{
                          background:
                            item.categoryId === "ai-agents"
                              ? "#d2fb95"
                              : item.categoryId === "experiments"
                              ? "#eaf4fc"
                              : "#ffffff",
                          color: "#202124",
                          border: "1px solid rgba(32, 33, 36, 0.08)",
                        }}
                      >
                        {item.categoryLabel}
                      </span>
                      <span className="text-[11px] font-medium text-[#51565c]">
                        #{item.number}
                      </span>
                    </div>

                    <h2 className="text-[17px] sm:text-[18px] font-medium tracking-[-0.02em] leading-[1.3] text-[#202124] mb-1.5 group-hover:underline decoration-1 underline-offset-4">
                      {item.title}
                    </h2>

                    <p className="text-[13.5px] leading-[1.5] text-[#51565c] line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-4 pt-3 px-1 flex items-center justify-between gap-2 text-[12px]"
                  style={{ borderTop: "1px solid rgba(32, 33, 36, 0.08)" }}
                >
                  <span className="text-[#51565c] truncate">{item.discipline}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-[#202124] flex-shrink-0">
                    Open case
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
              ))}
            </div>
          )}
        </section>

        {/* Bottom Studio CTA */}
        <section className="wrap mt-16 sm:mt-24" data-aos="fade-up">
          <div
            className="rounded-[24px] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            style={{
              background: "#202124",
              color: "#ffffff",
            }}
          >
            <div className="max-w-[540px]">
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold mb-3"
                style={{ background: "#d2fb95", color: "#202124" }}
              >
                Open for sprints
              </div>
              <h2 className="text-[26px] sm:text-[32px] font-medium tracking-[-0.03em] leading-[1.15] mb-2">
                Want us to build something similar?
              </h2>
              <p className="text-[15px] leading-[1.55] text-zinc-300">
                Tell us what you are building and we will send back a scope breakdown,
                estimated timeline, and quote within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleOpenContact("Product Design & Design Systems")}
                className="btn-pill btn-pill-lime cursor-pointer"
              >
                Book a Discovery Call
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenContact={() => handleOpenContact()} />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
