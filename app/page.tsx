"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import AiAgentsSection from "@/components/AiAgentsSection";
import {
  WebEngineeringSection,
  DesignSystemsSection,
  LandingPagesSection,
  TelemetrySection,
} from "@/components/ServiceDeepDives";
import ProcessSection from "@/components/ProcessSection";
import EngagementSection from "@/components/EngagementSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--ink)] antialiased transition-colors">
      <ScrollAnimationProvider />
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      <main className="flex-grow">
        <Hero onOpenContact={() => setContactModalOpen(true)} />
        <ProofStrip />
        <ProjectsShowcase />
        <div id="services">
          <AiAgentsSection onOpenContact={() => setContactModalOpen(true)} />
          <WebEngineeringSection onOpenContact={() => setContactModalOpen(true)} />
          <DesignSystemsSection onOpenContact={() => setContactModalOpen(true)} />
          <LandingPagesSection onOpenContact={() => setContactModalOpen(true)} />
          <TelemetrySection onOpenContact={() => setContactModalOpen(true)} />
        </div>
        <ProcessSection onOpenContact={() => setContactModalOpen(true)} />
        <EngagementSection onOpenContact={() => setContactModalOpen(true)} />
        <TestimonialsSection />
        <FaqSection onOpenContact={() => setContactModalOpen(true)} />
      </main>

      <Footer onOpenContact={() => setContactModalOpen(true)} />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
