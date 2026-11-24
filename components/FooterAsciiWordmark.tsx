"use client";

import React, { useEffect, useRef } from "react";

const WORDMARK_W = 1200;
const WORDMARK_H = 196;
const STEP_X = 7;
const STEP_Y = 8;
const GLYPHS = ["B", "L", "0", "C", "S", "H", "1", "F", "T", "+", ":", "z"];
const INTERACT_RADIUS = 84;
const INTERACT_RADIUS_SQ = INTERACT_RADIUS * INTERACT_RADIUS;

/**
 * Samples the bold wordmark "BLOCSHIFT" onto an offscreen canvas so every
 * glyph sits on an exact, pixel-crisp uniform grid matching HeroAsciiLogo.
 */
function sampleWordmarkPoints(): Float32Array {
  const off = document.createElement("canvas");
  off.width = WORDMARK_W;
  off.height = WORDMARK_H;
  const octx = off.getContext("2d", { willReadFrequently: true });
  if (!octx) return new Float32Array(0);

  octx.clearRect(0, 0, WORDMARK_W, WORDMARK_H);
  octx.fillStyle = "#ffffff";
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.font =
    '800 182px "Google Sans Flex", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  // Fit tightly within WORDMARK_W with clean side margins
  const text = "BLOCSHIFT";
  const measured = octx.measureText(text).width;
  const targetWidth = WORDMARK_W - 24;
  const scaleX = measured > targetWidth ? targetWidth / measured : 1;

  octx.save();
  octx.translate(WORDMARK_W / 2, WORDMARK_H / 2 + 6);
  octx.scale(scaleX, 1);
  octx.fillText(text, 0, 0);
  octx.restore();

  const img = octx.getImageData(0, 0, WORDMARK_W, WORDMARK_H).data;
  const pts: number[] = [];

  for (let y = 4; y < WORDMARK_H - 4; y += STEP_Y) {
    for (let x = 4; x < WORDMARK_W - 4; x += STEP_X) {
      const alpha = img[(y * WORDMARK_W + x) * 4 + 3];
      if (alpha > 110) {
        pts.push(x, y);
      }
    }
  }

  return new Float32Array(pts);
}

export default function FooterAsciiWordmark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points = sampleWordmarkPoints();
    let count = points.length / 2;
    let ox = new Float32Array(count);
    let oy = new Float32Array(count);
    let vx = new Float32Array(count);
    let vy = new Float32Array(count);
    let heat = new Float32Array(count);

    // Re-sample once web fonts finish loading so glyph silhouette uses Google Sans Flex
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        const next = sampleWordmarkPoints();
        if (next.length > 0) {
          points = next;
          count = points.length / 2;
          ox = new Float32Array(count);
          oy = new Float32Array(count);
          vx = new Float32Array(count);
          vy = new Float32Array(count);
          heat = new Float32Array(count);
          drawStatic();
        }
      });
    }

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
        (rect.width * dpr) / WORDMARK_W,
        0,
        0,
        (rect.height * dpr) / WORDMARK_H,
        0,
        0
      );
      ctx.font = "700 7.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (reducedMotion) drawStatic();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, WORDMARK_W, WORDMARK_H);
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      for (let i = 0; i < count; i++) {
        const bx = points[i * 2];
        const by = points[i * 2 + 1];
        ctx.fillText(GLYPHS[i % GLYPHS.length], bx, by);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * WORDMARK_W;
      pointer.y = ((e.clientY - rect.top) / rect.height) * WORDMARK_H;
      pointer.active =
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40 &&
        e.clientY >= rect.top - 40 &&
        e.clientY <= rect.bottom + 40;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave);

    let rafId = 0;
    let visible = true;
    const start = performance.now();

    const drawFrame = (now: number) => {
      if (!visible) {
        rafId = 0;
        return;
      }

      const t = (now - start) * 0.001;
      ctx.clearRect(0, 0, WORDMARK_W, WORDMARK_H);

      for (let i = 0; i < count; i++) {
        const bx = points[i * 2];
        const by = points[i * 2 + 1];

        if (pointer.active) {
          const dx = bx + ox[i] - pointer.x;
          const dy = by + oy[i] - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < INTERACT_RADIUS_SQ && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / INTERACT_RADIUS) * 2.8;
            vx[i] += (dx / dist) * force;
            vy[i] += (dy / dist) * force;
            heat[i] = Math.min(1, heat[i] + 0.28);
          }
        }

        vx[i] = (vx[i] - ox[i] * 0.14) * 0.82;
        vy[i] = (vy[i] - oy[i] * 0.14) * 0.82;
        ox[i] += vx[i];
        oy[i] += vy[i];
        heat[i] *= 0.92;

        // Subtle horizontal wave shimmer across the wordmark
        const wave = Math.sin(t * 1.4 + bx * 0.012 + by * 0.02);
        const alpha = Math.min(1, 0.72 + wave * 0.14 + heat[i] * 0.28);
        const glyphIdx =
          heat[i] > 0.25
            ? (i + Math.floor(t * 12)) % GLYPHS.length
            : (i + (wave > 0.88 ? 1 : 0)) % GLYPHS.length;

        ctx.fillStyle =
          heat[i] > 0.3
            ? `rgba(210, 251, 149, ${alpha})`
            : `rgba(255, 255, 255, ${alpha})`;
        ctx.fillText(GLYPHS[glyphIdx], bx + ox[i], by + oy[i]);
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0 && !reducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    });
    observer.observe(canvas);

    if (reducedMotion) {
      drawStatic();
    } else {
      rafId = requestAnimationFrame(drawFrame);
    }

    return () => {
      observer.disconnect();
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="BLOCSHIFT"
      role="img"
      className="w-full aspect-[1200/196] block select-none cursor-crosshair"
    />
  );
}
