"use client";

import { useEffect } from "react";
import AOS from "aos";

/**
 * Global AOS (Animate On Scroll) initializer with fade-up blur support.
 * Honors prefers-reduced-motion.
 */
export default function ScrollAnimationProvider() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 32,
      disable: prefersReducedMotion,
    });

    const refreshTimer = window.setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      window.clearTimeout(refreshTimer);
    };
  }, []);

  return null;
}
