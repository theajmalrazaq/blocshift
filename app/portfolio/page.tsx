import React, { Suspense } from "react";
import type { Metadata } from "next";
import PortfolioClient from "@/components/PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio | Blocshift",
  description:
    "Selected projects across brand design, social posts, Klaviyo emails, UI/UX, web apps, AI agents, and experiments.",
};

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PortfolioClient />
    </Suspense>
  );
}
