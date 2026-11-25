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
  const [selectedService, setSelectedService] = useState<string>("Web & Platform Engineering");

  const openContact = (service?: string) => {
    if (service) setSelectedService(service);
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--ink)] antialiased transition-colors">
      <ScrollAnimationProvider />
      <Navbar onOpenContact={() => openContact()} />

      <main className="flex-grow">
        <Hero onOpenContact={() => openContact()} />
        <ProofStrip />
        <ProjectsShowcase />
        <div id="services">
          <AiAgentsSection onOpenContact={() => openContact("AI Agents & Automation")} />
          <WebEngineeringSection onOpenContact={() => openContact("Web & Platform Engineering")} />
          <DesignSystemsSection onOpenContact={() => openContact("Product Design & Design Systems")} />
          <LandingPagesSection onOpenContact={() => openContact("High-Converting Landing Pages")} />
          <TelemetrySection onOpenContact={() => openContact("Executive Dashboards & Telemetry")} />
        </div>
        <ProcessSection onOpenContact={() => openContact()} />
        <EngagementSection onOpenContact={(service) => openContact(service)} />
        <TestimonialsSection />
        <FaqSection onOpenContact={() => openContact()} />
      </main>

      <Footer onOpenContact={() => openContact()} />

      <ContactModal
        key={selectedService}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
