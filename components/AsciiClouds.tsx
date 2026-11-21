"use client";

import React, { useEffect, useRef } from "react";

interface CloudCluster {
  x: number; // 0..1 normalized
  y: number; // 0..1 normalized
  scale: number;
  speed: number;
  seed: number;
}

const GLYPHS_DENSE = ["@", "8", "Z", "0", "%"];
const GLYPHS_MID = ["o", "*", "z", "+", "x"];
const GLYPHS_EDGE = ["·", "•", ":", "~", "+"];

export default function AsciiClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;

    const clouds: CloudCluster[] = [
      { x: 0.12, y: 0.22, scale: 1.15, speed: 0.00035, seed: 1 },
      { x: 0.78, y: 0.18, scale: 0.95, speed: 0.00028, seed: 42 },
      { x: 0.45, y: 0.38, scale: 0.8, speed: 0.00022, seed: 99 },
      { x: -0.15, y: 0.3, scale: 1.05, speed: 0.0003, seed: 17 },
      { x: 0.95, y: 0.45, scale: 0.7, speed: 0.00025, seed: 55 },
    ];

    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = "600 9px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    const start = performance.now();

    // Grid spacing for ASCII characters
    const stepX = 17;
    const stepY = 15;

    const drawFrame = (now: number) => {
      const elapsed = now - start;
      const t = elapsed * 0.001;

      ctx.clearRect(0, 0, width, height);

      // Advance clouds drifting slowly to the right
      clouds.forEach((c) => {
        c.x += c.speed;
        if (c.x > 1.25) c.x = -0.25;
      });

      // Sample ASCII characters across the upper region of the canvas
      const maxRows = Math.min(Math.floor(height / stepY), 28);
      const cols = Math.floor(width / stepX);

      for (let r = 1; r < maxRows; r++) {
        const py = r * stepY;

        for (let c = 0; c < cols; c++) {
          const px = c * stepX + (r % 2 === 0 ? stepX * 0.5 : 0);

          // Calculate cloud density at (px, py) with fast bounding box cull
          let totalDensity = 0;

          for (let i = 0; i < clouds.length; i++) {
            const cloud = clouds[i];
            const cx = cloud.x * width;
            const cy = cloud.y * height;
            const radX = 110 * cloud.scale;
            const radY = 48 * cloud.scale;

            // Fast cull: skip calculation if outside cloud bounds
            if (Math.abs(px - cx) > radX * 1.6 || Math.abs(py - cy) > radY * 1.6) {
              continue;
            }

            // Fast distance check without heavy Math.exp
            const dx1 = (px - cx) / radX;
            const dy1 = (py - cy) / radY;
            const d1 = dx1 * dx1 + dy1 * dy1;
            if (d1 < 1.0) {
              totalDensity += 1 - d1;
            }

            const dx2 = (px - (cx + radX * 0.45)) / (radX * 0.75);
            const dy2 = (py - (cy - radY * 0.2)) / (radY * 0.85);
            const d2 = dx2 * dx2 + dy2 * dy2;
            if (d2 < 1.0) {
              totalDensity += (1 - d2) * 0.8;
            }

            const dx3 = (px - (cx - radX * 0.4)) / (radX * 0.7);
            const dy3 = (py - (cy + radY * 0.1)) / (radY * 0.75);
            const d3 = dx3 * dx3 + dy3 * dy3;
            if (d3 < 1.0) {
              totalDensity += (1 - d3) * 0.7;
            }
          }

          if (totalDensity < 0.25) continue;

          // Pointer interaction: push characters slightly
          let drawX = px;
          let drawY = py;

          if (pointer.active) {
            const pdx = px - pointer.x;
            const pdy = py - pointer.y;
            const pDistSq = pdx * pdx + pdy * pdy;
            const interactRad = 85;
            if (pDistSq < interactRad * interactRad && pDistSq > 0.01) {
              const pDist = Math.sqrt(pDistSq);
              const force = (1 - pDist / interactRad) * 16;
              drawX += (pdx / pDist) * force;
              drawY += (pdy / pDist) * force;
            }
          }

          // Gentle breathing undulating effect
          const wave = Math.sin(px * 0.03 + py * 0.02 + t * 1.6);
          const effectiveDensity = totalDensity + wave * 0.08;

          // Character selection based on density
          let ch: string;
          let alpha: number;

          if (effectiveDensity > 0.95) {
            const idx = Math.abs(Math.floor(px * 3 + py * 7 + t * 2)) % GLYPHS_DENSE.length;
            ch = GLYPHS_DENSE[idx];
            alpha = 0.38;
          } else if (effectiveDensity > 0.55) {
            const idx = Math.abs(Math.floor(px * 5 + py * 11 + t * 3)) % GLYPHS_MID.length;
            ch = GLYPHS_MID[idx];
            alpha = 0.24;
          } else {
            const idx = Math.abs(Math.floor(px * 2 + py * 5)) % GLYPHS_EDGE.length;
            ch = GLYPHS_EDGE[idx];
            alpha = 0.14;
          }

          // Subtle architectural ink on pure white background
          ctx.fillStyle = `rgba(15, 23, 42, ${(alpha * 0.32).toFixed(3)})`;
          ctx.fillText(ch, drawX, drawY);
        }
      }

      rafId = requestAnimationFrame(drawFrame);
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
      className="pointer-events-none absolute inset-0 z-0 w-full h-full block select-none"
      aria-hidden="true"
    />
  );
}
