"use client";

import { useEffect } from "react";

/**
 * Universal scroll-driven reveal observer.
 * Progressively enhances all elements with .reveal-on-scroll and .reveal-scale-on-scroll
 * using a high-performance IntersectionObserver with compositor-only transforms.
 * Honors prefers-reduced-motion.
 */
export default function ScrollAnimationProvider() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal-on-scroll, .reveal-scale-on-scroll"
    );

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Also observe any elements dynamically added or hydrated
    const mutationObserver = new MutationObserver(() => {
      const freshElements = document.querySelectorAll<HTMLElement>(
        ".reveal-on-scroll:not(.is-revealed), .reveal-scale-on-scroll:not(.is-revealed)"
      );
      freshElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
