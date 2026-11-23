"use client";

import React, { useEffect, useRef } from "react";

// ============================================================================
// 1. CodeMatrixVisualizer (Web & Platform Engineering)
// ============================================================================
export function CodeMatrixVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const CODE_SNIPPETS = [
      "const app = next({ turbo: true });",
      "export default async function Page()",
      "> git commit -m 'ship v2.0'",
      "[ 200 OK ] edge-region: iad1 (12ms)",
      "bun run build --minify",
      "interface Platform<T = unknown>",
      "return <Hydrate state={dehydrated} />",
      "const { latency } = await ping();",
      "export const runtime = 'edge';",
      "import { motion } from 'framer-motion';",
    ];

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
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let offset = 0;
    let visible = true;

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Subtle background grid dots
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      for (let x = 12; x < width; x += 24) {
        for (let y = 12; y < height; y += 18) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      const lineHeight = 17;
      offset += 0.25;

      ctx.textBaseline = "middle";

      for (let i = 0; i < CODE_SNIPPETS.length; i++) {
        const text = CODE_SNIPPETS[i];
        const baseY = ((i * lineHeight + offset) % (height + 20)) - 10;

        for (let c = 0; c < text.length; c++) {
          const char = text[c];
          let charX = 14 + c * 6.5;
          let charY = baseY;

          if (charX > width - 10) break;

          // Mouse disturbance
          const dx = charX - pointer.x;
          const dy = charY - pointer.y;
          const distSq = dx * dx + dy * dy;

          let color = "rgba(0, 0, 0, 0.35)";
          if (distSq < 2500) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 50) * 12;
            charX += (dx / dist) * force;
            charY += (dy / dist) * force;
            color = "rgba(0, 0, 0, 0.95)";
          }

          ctx.fillStyle = color;
          ctx.fillText(char, charX, charY);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ============================================================================
// 2. NeuralAgentVisualizer (Applied AI & Autonomous Agents)
// ============================================================================
export function NeuralAgentVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      label: string;
    }

    const GLYPHS = ["@", "8", "*", "+", "z", "0", "1"];
    const nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = "600 8.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (nodes.length === 0) {
        for (let i = 0; i < 16; i++) {
          nodes.push({
            x: 20 + Math.random() * (width - 40),
            y: 15 + Math.random() * (height - 30),
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            label: GLYPHS[i % GLYPHS.length],
          });
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let tick = 0;
    let visible = true;

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      tick += 0.03;

      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 15 || n.x > width - 15) n.vx *= -1;
        if (n.y < 15 || n.y > height - 15) n.vy *= -1;

        // Pointer attraction
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 4900 && distSq > 4) {
            const dist = Math.sqrt(distSq);
            n.x += (dx / dist) * 0.8;
            n.y += (dy / dist) * 0.8;
          }
        }
      }

      // Draw connections
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Pulse traveling packet
            const progress = (tick + i * 0.5) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * progress;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * progress;
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            ctx.fillText("·", px, py);
          }
        }
      }

      ctx.setLineDash([]);

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isNearPointer =
          pointer.active &&
          Math.hypot(n.x - pointer.x, n.y - pointer.y) < 55;

        // Node background ring
        ctx.fillStyle = isNearPointer ? "#000000" : "rgba(0, 0, 0, 0.06)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, isNearPointer ? 9 : 7, 0, Math.PI * 2);
        ctx.fill();

        // Node text
        ctx.fillStyle = isNearPointer ? "#ffffff" : "rgba(0, 0, 0, 0.75)";
        ctx.fillText(n.label, n.x, n.y);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ============================================================================
// 3. Wireframe3DVisualizer (3D Product Visualizers & WebGL)
// ============================================================================
export function Wireframe3DVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0, y: 0, active: false };

    // 8 vertices of a 3D cube
    const vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];

    // 12 edges
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
    ];

    let rotX = 0.4;
    let rotY = 0.6;
    let targetRotX = 0.4;
    let targetRotY = 0.6;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = "600 8px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Auto rotation + pointer inertia
      targetRotX += 0.008;
      targetRotY += 0.012;

      rotX += (targetRotX - rotX) * 0.1;
      rotY += (targetRotY - rotY) * 0.1;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Project vertices
      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 3.2;
        const scale = (fov / (fov + z2)) * 34;
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          z: z2,
        };
      });

      // Draw edges with ASCII dots
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];
        const steps = 7;

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const px = p1.x + (p2.x - p1.x) * t;
          const py = p1.y + (p2.y - p1.y) * t;
          ctx.fillText("·", px, py);
        }
      }

      // Draw vertices with prominent ASCII glyphs
      const GLYPHS_VERT = ["+", "*", "#", "0", "Z", "%", "8", "@"];
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.fillStyle = p.z > 0 ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.35)";
        ctx.fillText(GLYPHS_VERT[i], p.x, p.y);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / width - 0.5;
      const ny = (e.clientY - rect.top) / height - 0.5;
      targetRotY += nx * 0.08;
      targetRotX += ny * 0.08;
    };

    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ============================================================================
// 4. DesignGridVisualizer (Product Design & Design Systems)
// ============================================================================
export function DesignGridVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 120, y: 55, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = "600 8px ui-monospace, SFMono-Regular, Menlo, monospace";
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let smoothX = 120;
    let smoothY = 55;
    let visible = true;

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Smooth follower
      smoothX += (pointer.x - smoothX) * 0.15;
      smoothY += (pointer.y - smoothY) * 0.15;

      // Draw dotted pixel grid
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      for (let x = 16; x < width; x += 18) {
        for (let y = 14; y < height; y += 16) {
          ctx.fillText("+", x, y);
        }
      }

      // Draw crosshairs
      ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      ctx.moveTo(0, smoothY);
      ctx.lineTo(width, smoothY);
      ctx.moveTo(smoothX, 0);
      ctx.lineTo(smoothX, height);
      ctx.stroke();

      ctx.setLineDash([]);

      // Draw squircle bounding box around cursor
      const boxW = 86;
      const boxH = 46;
      const bx = smoothX - boxW / 2;
      const by = smoothY - boxH / 2;

      ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(bx, by, boxW, boxH);

      // Corner markers
      ctx.fillStyle = "#000000";
      ctx.fillRect(bx - 2, by - 2, 4, 4);
      ctx.fillRect(bx + boxW - 2, by - 2, 4, 4);
      ctx.fillRect(bx - 2, by + boxH - 2, 4, 4);
      ctx.fillRect(bx + boxW - 2, by + boxH - 2, 4, 4);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = Math.max(20, Math.min(width - 20, e.clientX - rect.left));
      pointer.y = Math.max(20, Math.min(height - 20, e.clientY - rect.top));
      pointer.active = true;
    };

    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ============================================================================
// 5. WaveformVisualizer (High-Converting Landing Pages & CRO)
// ============================================================================
export function WaveformVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
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
      ctx.font = "600 8px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let phase = 0;
    let visible = true;

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      phase += 0.05;

      const cols = 28;
      const colWidth = (width - 24) / cols;

      for (let i = 0; i < cols; i++) {
        const x = 12 + i * colWidth;
        const normX = i / cols;

        // Base sine wave
        let wave = Math.sin(normX * 8 + phase) * 0.4 + Math.sin(normX * 14 - phase * 0.7) * 0.25;

        // Mouse modulation
        const dist = Math.abs(x - pointer.x);
        if (pointer.active && dist < 60) {
          const boost = (1 - dist / 60) * 0.6;
          wave += boost;
        }

        const barHeight = Math.max(8, Math.min(height - 24, (wave + 0.8) * 28));
        const yTop = height / 2 - barHeight / 2;
        const yBot = height / 2 + barHeight / 2;

        const glyphSteps = Math.max(3, Math.round(barHeight / 7));
        for (let g = 0; g < glyphSteps; g++) {
          const gy = yTop + (g / (glyphSteps - 1)) * (yBot - yTop);
          const isPeak = g === 0 || g === glyphSteps - 1;

          ctx.fillStyle = isPeak
            ? "rgba(0, 0, 0, 0.9)"
            : "rgba(0, 0, 0, 0.25)";
          ctx.fillText(isPeak ? "•" : "|", x, gy);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ============================================================================
// 6. TelemetryVisualizer (Executive Dashboards & Telemetry)
// ============================================================================
export function TelemetryVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;
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
      ctx.font = "600 8.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const bars = [65, 82, 48, 91, 74, 88, 96, 62, 85, 78];
    let tick = 0;
    let visible = true;

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      ctx.clearRect(0, 0, width, height);
      tick += 0.04;

      const barWidth = 14;
      const spacing = (width - 24 - bars.length * barWidth) / (bars.length - 1);

      for (let i = 0; i < bars.length; i++) {
        const x = 12 + i * (barWidth + spacing) + barWidth / 2;
        const baseVal = bars[i] + Math.sin(tick + i) * 6;

        // Pointer boost
        const dist = Math.abs(x - pointer.x);
        const boost = pointer.active && dist < 30 ? (1 - dist / 30) * 15 : 0;
        const val = Math.min(100, baseVal + boost);

        const maxH = height - 34;
        const h = (val / 100) * maxH;
        const yBase = height - 16;

        // Render stacked ASCII block bars
        const blocks = Math.round(h / 7);
        for (let b = 0; b < blocks; b++) {
          const by = yBase - b * 7;
          const isTop = b === blocks - 1;

          ctx.fillStyle =
            boost > 5
              ? "#000000"
              : isTop
              ? "rgba(0, 0, 0, 0.85)"
              : "rgba(0, 0, 0, 0.25)";

          ctx.fillText(isTop ? "█" : "▓", x, by);
        }

        // Mini percentage at top when hovered
        if (boost > 5) {
          ctx.fillStyle = "#000000";
          ctx.fillText(`${Math.round(val)}%`, x, yBase - blocks * 7 - 6);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
