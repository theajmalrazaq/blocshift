"use client";

import React, { useEffect, useRef } from "react";
import {
  HERO_ASCII_HEIGHT,
  HERO_ASCII_POINTS,
  HERO_ASCII_WIDTH,
} from "@/data/heroAsciiGrid";

const GLYPHS = ["Z", "Z", "Z", "z", "+", "0", "1", ":"];
const INTERACT_RADIUS = 68;
const INTERACT_RADIUS_SQ = INTERACT_RADIUS * INTERACT_RADIUS;

export default function HeroAsciiLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const count = HERO_ASCII_POINTS.length / 2;
    const ox = new Float32Array(count);
    const oy = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);
    const heat = new Float32Array(count);

    const pointer = { x: -9999, y: -9999, active: false };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(
        (rect.width * dpr) / HERO_ASCII_WIDTH,
        0,
        0,
        (rect.height * dpr) / HERO_ASCII_HEIGHT,
        0,
        0
      );
      ctx.font = "600 7.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "alphabetic";
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * HERO_ASCII_WIDTH;
      pointer.y = ((e.clientY - rect.top) / rect.height) * HERO_ASCII_HEIGHT;
      pointer.active =
        e.clientX >= rect.left - 80 &&
        e.clientX <= rect.right + 80 &&
        e.clientY >= rect.top - 80 &&
        e.clientY <= rect.bottom + 80;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    let rafId = 0;
    const start = performance.now();

    const drawFrame = (now: number) => {
      const t = (now - start) * 0.001;
      ctx.clearRect(0, 0, HERO_ASCII_WIDTH, HERO_ASCII_HEIGHT);

      for (let i = 0; i < count; i++) {
        const bx = HERO_ASCII_POINTS[i * 2];
        const by = HERO_ASCII_POINTS[i * 2 + 1];

        if (!reducedMotion) {
          if (pointer.active) {
            const dx = bx + ox[i] - pointer.x;
            const dy = by + oy[i] - pointer.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < INTERACT_RADIUS_SQ && distSq > 0.01) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / INTERACT_RADIUS) * 2.4;
              vx[i] += (dx / dist) * force;
              vy[i] += (dy / dist) * force;
              heat[i] = Math.min(1, heat[i] + 0.25);
            }
          }

          // Spring back to original grid slot
          vx[i] = (vx[i] - ox[i] * 0.14) * 0.82;
          vy[i] = (vy[i] - oy[i] * 0.14) * 0.82;
          ox[i] += vx[i];
          oy[i] += vy[i];
          heat[i] *= 0.92;
        }

        const wave = reducedMotion
          ? 0.5
          : 0.5 + 0.5 * Math.sin(bx * 0.032 + by * 0.022 - t * 2.4);
        const alpha = Math.min(1, 0.45 + wave * 0.45 + heat[i] * 0.5);

        let ch = "Z";
        if (!reducedMotion) {
          if (heat[i] > 0.18) {
            const idx = Math.floor((t * 18 + i) % GLYPHS.length);
            ch = GLYPHS[idx];
          } else if (wave > 0.94) {
            ch = (i + Math.floor(t * 4)) % 2 === 0 ? "z" : "+";
          }
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.fillText(ch, bx + ox[i], by + oy[i]);
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    rafId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto block aspect-[395/426]"
      aria-hidden="true"
    />
  );
}
