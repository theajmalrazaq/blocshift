"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollAnimationProvider from "@/components/ScrollAnimationProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--page)] text-[var(--ink)] antialiased transition-colors">
      <SmoothScrollProvider />
      <ScrollAnimationProvider />
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      <main className="flex-grow">
        <Hero onOpenContact={() => setContactModalOpen(true)} />
        <ProjectsShowcase />
        <ServicesSection />
        <ContactSection onOpenContact={() => setContactModalOpen(true)} />
      </main>

      <Footer />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
