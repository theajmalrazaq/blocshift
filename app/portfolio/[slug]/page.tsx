import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetailClient from "@/components/PortfolioDetailClient";
import {
  getAllPortfolioItems,
  getNextPortfolioItem,
  getPortfolioBySlug,
  getRelatedPortfolioItems,
} from "@/data/portfolioItems";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPortfolioItems().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);
  if (!item) {
    return {
      title: "Project Not Found | Blocshift",
    };
  }
  return {
    title: `${item.title} | Blocshift Portfolio`,
    description: item.summary,
  };
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedItems = getRelatedPortfolioItems(item.slug, item.categoryId, 3);
  const nextItem = getNextPortfolioItem(item.slug);

  return (
    <PortfolioDetailClient
      item={item}
      relatedItems={relatedItems}
      nextItem={nextItem}
    />
  );
}
