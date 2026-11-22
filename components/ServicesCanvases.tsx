"use client";

import React, { useEffect, useRef } from "react";

// ============================================================================
// Shared 3D Point & Dither Geometry Types
// ============================================================================
interface DitherPoint3D {
  x: number;
  y: number;
  z: number;
  nx: number;
  ny: number;
  nz: number;
  type: "surface" | "groove" | "ring" | "halo" | "core";
  ringPhase?: number;
  ringRadius?: number;
}

// Fast 3D vector rotation
function rotatePoint(
  p: { x: number; y: number; z: number },
  rx: number,
  ry: number,
  rz: number
) {
  // Rotate around Y
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  // Rotate around X
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  // Rotate around Z
  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  const x3 = x1 * cosZ - y2 * sinZ;
  const y3 = x1 * sinZ + y2 * cosZ;

  return { x: x3, y: y3, z: z2 };
}

// ============================================================================
// 1. Wireframe3DVisualizer (Interactive 3D Product Visualizers — Card 3)
// EXACT MATCH to user reference image: 3D Dithered Cylinder/Can with Orbital Rings
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
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    let smoothRotX = 0.32;
    let smoothRotY = 0;

    // Build the 3D cylinder point cloud
    const points: DitherPoint3D[] = [];
    const R = 34; // cylinder radius
    const H = 54; // cylinder height

    // 1. Cylinder Wall Surface Points
    const vSteps = 24;
    const uSteps = 42;
    for (let v = 0; v <= vSteps; v++) {
      const y = -H / 2 + (v / vSteps) * H;
      const isGroove = Math.abs(v - vSteps * 0.33) < 0.6 || Math.abs(v - vSteps * 0.66) < 0.6;

      for (let u = 0; u < uSteps; u++) {
        const theta = (u / uSteps) * Math.PI * 2;
        const nx = Math.cos(theta);
        const nz = Math.sin(theta);
        const radius = isGroove ? R * 0.94 : R;

        points.push({
          x: radius * nx,
          y,
          z: radius * nz,
          nx,
          ny: 0,
          nz,
          type: isGroove ? "groove" : "surface",
        });
      }
    }

    // 2. Top Cap Concentric Rings
    for (let ring = 1; ring <= 6; ring++) {
      const r = (ring / 6) * R;
      const capSteps = Math.max(10, ring * 7);
      for (let i = 0; i < capSteps; i++) {
        const theta = (i / capSteps) * Math.PI * 2;
        points.push({
          x: r * Math.cos(theta),
          y: -H / 2,
          z: r * Math.sin(theta),
          nx: 0,
          ny: -1,
          nz: 0,
          type: "surface",
        });
      }
    }

    // 3. Dual Concentric Orbital Rings (exact match to reference image)
    const ring1Radius = R * 1.52;
    const ring1Count = 68;
    for (let i = 0; i < ring1Count; i++) {
      const phase = (i / ring1Count) * Math.PI * 2;
      const rx = ring1Radius * Math.cos(phase);
      const rz = ring1Radius * Math.sin(phase);
      // Tilt ring in 3D
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.42, 0.25, 0.18);
      points.push({
        x: tilted.x,
        y: tilted.y + 4,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
        ringRadius: ring1Radius,
      });
    }

    const ring2Radius = R * 1.95;
    const ring2Count = 84;
    for (let i = 0; i < ring2Count; i++) {
      const phase = (i / ring2Count) * Math.PI * 2;
      const rx = ring2Radius * Math.cos(phase);
      const rz = ring2Radius * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.45, 0.22, 0.16);
      points.push({
        x: tilted.x,
        y: tilted.y - 2,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
        ringRadius: ring2Radius,
      });
    }

    // 4. Outer Scattered Orbital Halo Stipples
    for (let i = 0; i < 90; i++) {
      const phase = Math.random() * Math.PI * 2;
      const spread = ring1Radius + Math.random() * (ring2Radius * 1.25 - ring1Radius);
      const rx = spread * Math.cos(phase);
      const rz = spread * Math.sin(phase);
      const randY = (Math.random() - 0.5) * 16;
      const tilted = rotatePoint({ x: rx, y: randY, z: rz }, 0.44, 0.24, 0.17);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 0,
        nz: 1,
        type: "halo",
        ringPhase: phase,
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.018;

      // Mouse interactive pitch/yaw interpolation
      const targetRotY = time * 0.95 + (pointer.active ? (pointer.x / width - 0.5) * 0.9 : 0);
      const targetRotX = 0.32 + (pointer.active ? (pointer.y / height - 0.5) * 0.5 : 0);
      smoothRotY += (targetRotY - smoothRotY) * 0.12;
      smoothRotX += (targetRotX - smoothRotX) * 0.12;

      const cx = width / 2;
      const cy = height / 2 + 2;
      const focal = 240;

      // Dynamic light source from top-left-front
      const lx = -0.55;
      const ly = -0.75;
      const lz = 0.85;

      // Transform and render points
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Apply 3D rotation
        const rotated = rotatePoint(pt, smoothRotX, smoothRotY, 0.08);
        const normRot = rotatePoint(
          { x: pt.nx, y: pt.ny, z: pt.nz },
          smoothRotX,
          smoothRotY,
          0.08
        );

        // Perspective projection
        const scale = focal / (focal + rotated.z);
        const sx = cx + rotated.x * scale;
        const sy = cy + rotated.y * scale;

        if (pt.type === "ring") {
          // Orbital halo ring points with circulating pulse
          const pulse = Math.pow(
            0.5 + 0.5 * Math.sin((pt.ringPhase || 0) * 2 - time * 3.5),
            3
          );
          const alpha = 0.22 + pulse * 0.65;
          const dotSize = pulse > 0.6 ? 2.2 : 1.4;

          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
        } else if (pt.type === "halo") {
          // Scattered stipple dust cloud
          const alpha = 0.12 + 0.35 * Math.sin(time * 2 + i);
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
        } else {
          // Cylinder surface points with diffuse + specular shading
          const dot = normRot.x * lx + normRot.y * ly + normRot.z * lz;
          const diffuse = Math.max(0, dot);
          const spec = Math.pow(Math.max(0, diffuse * normRot.z), 5);

          // Deep ink shading with dither density
          const intensity = Math.min(1, 0.15 + diffuse * 0.65 + spec * 0.45);
          const isGroove = pt.type === "groove";
          const alpha = isGroove ? 0.9 : Math.max(0.12, intensity * 0.9);
          const dotSize = intensity > 0.75 ? 2.2 : intensity > 0.4 ? 1.6 : 1.2;

          ctx.fillStyle = isGroove
            ? "rgba(15, 23, 42, 0.95)"
            : `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
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
// 2. TelemetryVisualizer (Dashboards & Analytics — Card 6)
// Panoramic 3D Database Cluster with Dual Orbiting Rings (Exact Match to Image)
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
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    let smoothRotX = 0.38;
    let smoothRotY = 0;

    const points: DitherPoint3D[] = [];
    const R = 38;
    const H = 64;

    // 1. Triple Segmented Database Cylinder Wall
    const vSteps = 26;
    const uSteps = 46;
    for (let v = 0; v <= vSteps; v++) {
      const y = -H / 2 + (v / vSteps) * H;
      const isGroove =
        Math.abs(v - vSteps * 0.33) < 0.7 || Math.abs(v - vSteps * 0.66) < 0.7;

      for (let u = 0; u < uSteps; u++) {
        const theta = (u / uSteps) * Math.PI * 2;
        const nx = Math.cos(theta);
        const nz = Math.sin(theta);
        const radius = isGroove ? R * 0.93 : R;

        points.push({
          x: radius * nx,
          y,
          z: radius * nz,
          nx,
          ny: 0,
          nz,
          type: isGroove ? "groove" : "surface",
        });
      }
    }

    // 2. Top Rim Disk
    for (let ring = 1; ring <= 7; ring++) {
      const r = (ring / 7) * R;
      const count = Math.max(12, ring * 7);
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        points.push({
          x: r * Math.cos(theta),
          y: -H / 2,
          z: r * Math.sin(theta),
          nx: 0,
          ny: -1,
          nz: 0,
          type: "surface",
        });
      }
    }

    // 3. Dual Concentric Tilted Orbital Rings
    const ring1R = R * 1.55;
    for (let i = 0; i < 72; i++) {
      const phase = (i / 72) * Math.PI * 2;
      const rx = ring1R * Math.cos(phase);
      const rz = ring1R * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.44, 0.28, 0.2);
      points.push({
        x: tilted.x,
        y: tilted.y + 6,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
        ringRadius: ring1R,
      });
    }

    const ring2R = R * 2.05;
    for (let i = 0; i < 90; i++) {
      const phase = (i / 90) * Math.PI * 2;
      const rx = ring2R * Math.cos(phase);
      const rz = ring2R * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.46, 0.26, 0.18);
      points.push({
        x: tilted.x,
        y: tilted.y - 4,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
        ringRadius: ring2R,
      });
    }

    // 4. Stipple Dust Halo Cloud
    for (let i = 0; i < 110; i++) {
      const phase = Math.random() * Math.PI * 2;
      const spread = ring1R + Math.random() * (ring2R * 1.25 - ring1R);
      const rx = spread * Math.cos(phase);
      const rz = spread * Math.sin(phase);
      const randY = (Math.random() - 0.5) * 20;
      const tilted = rotatePoint({ x: rx, y: randY, z: rz }, 0.44, 0.28, 0.2);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 0,
        nz: 1,
        type: "halo",
        ringPhase: phase,
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const targetRotY = time * 0.9 + (pointer.active ? (pointer.x / width - 0.5) * 0.8 : 0);
      const targetRotX = 0.38 + (pointer.active ? (pointer.y / height - 0.5) * 0.45 : 0);
      smoothRotY += (targetRotY - smoothRotY) * 0.12;
      smoothRotX += (targetRotX - smoothRotX) * 0.12;

      const cx = width / 2;
      const cy = height / 2 + 2;
      const focal = 250;

      const lx = -0.55;
      const ly = -0.7;
      const lz = 0.85;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const rotated = rotatePoint(pt, smoothRotX, smoothRotY, 0.08);
        const normRot = rotatePoint(
          { x: pt.nx, y: pt.ny, z: pt.nz },
          smoothRotX,
          smoothRotY,
          0.08
        );

        const scale = focal / (focal + rotated.z);
        const sx = cx + rotated.x * scale;
        const sy = cy + rotated.y * scale;

        if (pt.type === "ring") {
          const pulse = Math.pow(
            0.5 + 0.5 * Math.sin((pt.ringPhase || 0) * 2 - time * 3.2),
            3
          );
          const alpha = 0.2 + pulse * 0.65;
          const dotSize = pulse > 0.65 ? 2.2 : 1.4;

          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
        } else if (pt.type === "halo") {
          const alpha = 0.1 + 0.3 * Math.sin(time * 2.5 + i);
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
        } else {
          const dot = normRot.x * lx + normRot.y * ly + normRot.z * lz;
          const diffuse = Math.max(0, dot);
          const spec = Math.pow(Math.max(0, diffuse * normRot.z), 5);
          const intensity = Math.min(1, 0.15 + diffuse * 0.65 + spec * 0.45);
          const isGroove = pt.type === "groove";
          const alpha = isGroove ? 0.95 : Math.max(0.12, intensity * 0.9);
          const dotSize = intensity > 0.75 ? 2.2 : intensity > 0.4 ? 1.6 : 1.2;

          ctx.fillStyle = isGroove
            ? "rgba(15, 23, 42, 0.95)"
            : `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
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
// 3. CodeMatrixVisualizer (Web & Platform Engineering — Card 1)
// 3D Rotating Stacked Architectural Platform with Orbiting Halos
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
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    let smoothRotX = 0.35;
    let smoothRotY = 0;

    const points: DitherPoint3D[] = [];
    const layers = 3;
    const layerH = 12;
    const layerW = 44;

    // Tiered architectural platforms
    for (let l = 0; l < layers; l++) {
      const y = (l - 1) * (layerH + 6);
      const w = layerW - l * 4;

      // Perimeter dither
      const steps = 36;
      for (let i = 0; i < steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const nx = Math.cos(theta);
        const nz = Math.sin(theta);
        points.push({
          x: w * nx,
          y,
          z: w * nz,
          nx,
          ny: 0,
          nz,
          type: "surface",
        });
        points.push({
          x: w * nx,
          y: y + layerH,
          z: w * nz,
          nx,
          ny: 0,
          nz,
          type: "groove",
        });
      }

      // Top surface dither grid
      for (let rx = -w * 0.7; rx <= w * 0.7; rx += 8) {
        for (let rz = -w * 0.7; rz <= w * 0.7; rz += 8) {
          if (rx * rx + rz * rz < w * w * 0.6) {
            points.push({
              x: rx,
              y,
              z: rz,
              nx: 0,
              ny: -1,
              nz: 0,
              type: "surface",
            });
          }
        }
      }
    }

    // Orbiting circular halo
    const ringR = 64;
    for (let i = 0; i < 70; i++) {
      const phase = (i / 70) * Math.PI * 2;
      const rx = ringR * Math.cos(phase);
      const rz = ringR * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.42, 0.25, 0.16);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
      });
    }

    // Scattered stipple particles
    for (let i = 0; i < 80; i++) {
      const phase = Math.random() * Math.PI * 2;
      const spread = 50 + Math.random() * 45;
      const rx = spread * Math.cos(phase);
      const rz = spread * Math.sin(phase);
      const randY = (Math.random() - 0.5) * 20;
      const tilted = rotatePoint({ x: rx, y: randY, z: rz }, 0.42, 0.25, 0.16);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 0,
        nz: 1,
        type: "halo",
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.018;

      const targetRotY = time * 0.9 + (pointer.active ? (pointer.x / width - 0.5) * 0.8 : 0);
      const targetRotX = 0.35 + (pointer.active ? (pointer.y / height - 0.5) * 0.4 : 0);
      smoothRotY += (targetRotY - smoothRotY) * 0.12;
      smoothRotX += (targetRotX - smoothRotX) * 0.12;

      const cx = width / 2;
      const cy = height / 2 + 2;
      const focal = 240;

      const lx = -0.55;
      const ly = -0.75;
      const lz = 0.85;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const rotated = rotatePoint(pt, smoothRotX, smoothRotY, 0.08);
        const normRot = rotatePoint(
          { x: pt.nx, y: pt.ny, z: pt.nz },
          smoothRotX,
          smoothRotY,
          0.08
        );

        const scale = focal / (focal + rotated.z);
        const sx = cx + rotated.x * scale;
        const sy = cy + rotated.y * scale;

        if (pt.type === "ring") {
          const pulse = Math.pow(
            0.5 + 0.5 * Math.sin((pt.ringPhase || 0) * 2 - time * 3.5),
            3
          );
          const alpha = 0.2 + pulse * 0.65;
          const dotSize = pulse > 0.65 ? 2.2 : 1.4;
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
        } else if (pt.type === "halo") {
          const alpha = 0.1 + 0.3 * Math.sin(time * 2 + i);
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
        } else {
          const dot = normRot.x * lx + normRot.y * ly + normRot.z * lz;
          const diffuse = Math.max(0, dot);
          const intensity = Math.min(1, 0.15 + diffuse * 0.75);
          const isGroove = pt.type === "groove";
          const alpha = isGroove ? 0.95 : Math.max(0.12, intensity * 0.9);
          const dotSize = intensity > 0.75 ? 2.2 : 1.4;

          ctx.fillStyle = isGroove
            ? "rgba(15, 23, 42, 0.95)"
            : `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
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
// 4. NeuralAgentVisualizer (AI & Workflow Automation — Card 2)
// 3D Rotating Geodesic Sphere Core with Crossing Orbital Gyro Rings
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
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    let smoothRotX = 0.28;
    let smoothRotY = 0;

    const points: DitherPoint3D[] = [];
    const coreR = 26;

    // 1. Geodesic Sphere Core Points
    const latSteps = 16;
    for (let lat = 0; lat <= latSteps; lat++) {
      const theta = (lat / latSteps) * Math.PI;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const lonSteps = Math.max(6, Math.round(sinTheta * 28));

      for (let lon = 0; lon < lonSteps; lon++) {
        const phi = (lon / lonSteps) * Math.PI * 2;
        const nx = sinTheta * Math.cos(phi);
        const ny = cosTheta;
        const nz = sinTheta * Math.sin(phi);

        points.push({
          x: coreR * nx,
          y: coreR * ny,
          z: coreR * nz,
          nx,
          ny,
          nz,
          type: "surface",
        });
      }
    }

    // 2. Dual Crossing Orbital Gyro Rings
    const ring1R = 48;
    for (let i = 0; i < 64; i++) {
      const phase = (i / 64) * Math.PI * 2;
      const rx = ring1R * Math.cos(phase);
      const rz = ring1R * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.55, 0.35, 0.35);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
      });
    }

    const ring2R = 56;
    for (let i = 0; i < 76; i++) {
      const phase = (i / 76) * Math.PI * 2;
      const rx = ring2R * Math.cos(phase);
      const rz = ring2R * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, -0.45, 0.45, -0.28);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
      });
    }

    // 3. Floating Synapse Particles
    for (let i = 0; i < 75; i++) {
      const phase = Math.random() * Math.PI * 2;
      const spread = 35 + Math.random() * 35;
      const rx = spread * Math.cos(phase);
      const rz = spread * Math.sin(phase);
      const randY = (Math.random() - 0.5) * 24;
      const tilted = rotatePoint({ x: rx, y: randY, z: rz }, 0.4, 0.3, 0.2);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 0,
        nz: 1,
        type: "halo",
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.018;

      const targetRotY = time * 0.95 + (pointer.active ? (pointer.x / width - 0.5) * 0.8 : 0);
      const targetRotX = 0.28 + (pointer.active ? (pointer.y / height - 0.5) * 0.4 : 0);
      smoothRotY += (targetRotY - smoothRotY) * 0.12;
      smoothRotX += (targetRotX - smoothRotX) * 0.12;

      const cx = width / 2;
      const cy = height / 2;
      const focal = 240;

      const lx = -0.55;
      const ly = -0.7;
      const lz = 0.85;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const rotated = rotatePoint(pt, smoothRotX, smoothRotY, 0.05);
        const normRot = rotatePoint(
          { x: pt.nx, y: pt.ny, z: pt.nz },
          smoothRotX,
          smoothRotY,
          0.05
        );

        const scale = focal / (focal + rotated.z);
        const sx = cx + rotated.x * scale;
        const sy = cy + rotated.y * scale;

        if (pt.type === "ring") {
          const pulse = Math.pow(
            0.5 + 0.5 * Math.sin((pt.ringPhase || 0) * 2 - time * 3.4),
            3
          );
          const alpha = 0.2 + pulse * 0.65;
          const dotSize = pulse > 0.65 ? 2.2 : 1.4;
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
        } else if (pt.type === "halo") {
          const alpha = 0.12 + 0.3 * Math.sin(time * 2 + i);
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
        } else {
          const dot = normRot.x * lx + normRot.y * ly + normRot.z * lz;
          const diffuse = Math.max(0, dot);
          const intensity = Math.min(1, 0.15 + diffuse * 0.75);
          const alpha = Math.max(0.15, intensity * 0.95);
          const dotSize = intensity > 0.7 ? 2.2 : 1.5;

          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
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
// 5. DesignGridVisualizer (Product Design & Design Systems — Card 4)
// 3D Rotating Isometric Squircle Token Prism with Precision Alignment Rings
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
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    let smoothRotX = 0.36;
    let smoothRotY = 0;

    const points: DitherPoint3D[] = [];
    const size = 30;
    const depth = 22;

    // 3D Squircle / Rounded Cube Edge Points
    const steps = 48;
    for (let layer = -1; layer <= 1; layer++) {
      const y = layer * (depth / 2);
      for (let i = 0; i < steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        // Squircle equation
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const r = size / Math.pow(Math.pow(Math.abs(cosT), 4) + Math.pow(Math.abs(sinT), 4), 0.25);
        const x = r * cosT;
        const z = r * sinT;

        points.push({
          x,
          y,
          z,
          nx: cosT,
          ny: 0,
          nz: sinT,
          type: layer === 0 ? "groove" : "surface",
        });
      }
    }

    // Top face token grid
    for (let gx = -size * 0.7; gx <= size * 0.7; gx += 8) {
      for (let gz = -size * 0.7; gz <= size * 0.7; gz += 8) {
        points.push({
          x: gx,
          y: -depth / 2,
          z: gz,
          nx: 0,
          ny: -1,
          nz: 0,
          type: "surface",
        });
      }
    }

    // Orbiting alignment ring
    const ringR = 56;
    for (let i = 0; i < 70; i++) {
      const phase = (i / 70) * Math.PI * 2;
      const rx = ringR * Math.cos(phase);
      const rz = ringR * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.45, 0.25, 0.18);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
      });
    }

    // Floating corner precision tokens
    for (let i = 0; i < 60; i++) {
      const phase = Math.random() * Math.PI * 2;
      const spread = 45 + Math.random() * 30;
      const rx = spread * Math.cos(phase);
      const rz = spread * Math.sin(phase);
      const randY = (Math.random() - 0.5) * 16;
      const tilted = rotatePoint({ x: rx, y: randY, z: rz }, 0.45, 0.25, 0.18);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 0,
        nz: 1,
        type: "halo",
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const targetRotY = time * 0.92 + (pointer.active ? (pointer.x / width - 0.5) * 0.8 : 0);
      const targetRotX = 0.36 + (pointer.active ? (pointer.y / height - 0.5) * 0.4 : 0);
      smoothRotY += (targetRotY - smoothRotY) * 0.12;
      smoothRotX += (targetRotX - smoothRotX) * 0.12;

      const cx = width / 2;
      const cy = height / 2;
      const focal = 240;

      const lx = -0.55;
      const ly = -0.7;
      const lz = 0.85;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const rotated = rotatePoint(pt, smoothRotX, smoothRotY, 0.08);
        const normRot = rotatePoint(
          { x: pt.nx, y: pt.ny, z: pt.nz },
          smoothRotX,
          smoothRotY,
          0.08
        );

        const scale = focal / (focal + rotated.z);
        const sx = cx + rotated.x * scale;
        const sy = cy + rotated.y * scale;

        if (pt.type === "ring") {
          const pulse = Math.pow(
            0.5 + 0.5 * Math.sin((pt.ringPhase || 0) * 2 - time * 3.2),
            3
          );
          const alpha = 0.2 + pulse * 0.65;
          const dotSize = pulse > 0.65 ? 2.2 : 1.4;
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
        } else if (pt.type === "halo") {
          const alpha = 0.12 + 0.3 * Math.sin(time * 2 + i);
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
        } else {
          const dot = normRot.x * lx + normRot.y * ly + normRot.z * lz;
          const diffuse = Math.max(0, dot);
          const intensity = Math.min(1, 0.15 + diffuse * 0.75);
          const isGroove = pt.type === "groove";
          const alpha = isGroove ? 0.95 : Math.max(0.12, intensity * 0.9);
          const dotSize = intensity > 0.7 ? 2.2 : 1.5;

          ctx.fillStyle = isGroove
            ? "rgba(15, 23, 42, 0.95)"
            : `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
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
// 6. WaveformVisualizer (High-Converting Landing Pages — Card 5)
// 3D Rotating Conversion Spire Beacon with Concentric Expanding Pulse Rings
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
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    let smoothRotX = 0.34;
    let smoothRotY = 0;

    const points: DitherPoint3D[] = [];
    const H = 50;
    const baseR = 34;

    // Conical spire beacon
    const vSteps = 22;
    for (let v = 0; v <= vSteps; v++) {
      const y = -H / 2 + (v / vSteps) * H;
      const t = v / vSteps;
      const r = baseR * (0.2 + 0.8 * Math.pow(t, 0.85));
      const uSteps = Math.max(8, Math.round(r * 1.3));

      for (let u = 0; u < uSteps; u++) {
        const theta = (u / uSteps) * Math.PI * 2;
        const nx = Math.cos(theta);
        const nz = Math.sin(theta);
        points.push({
          x: r * nx,
          y,
          z: r * nz,
          nx,
          ny: -0.3,
          nz,
          type: "surface",
        });
      }
    }

    // Expanding concentric pulse rings
    const ring1R = baseR * 1.45;
    for (let i = 0; i < 68; i++) {
      const phase = (i / 68) * Math.PI * 2;
      const rx = ring1R * Math.cos(phase);
      const rz = ring1R * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.44, 0.25, 0.18);
      points.push({
        x: tilted.x,
        y: tilted.y + 4,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
      });
    }

    const ring2R = baseR * 1.85;
    for (let i = 0; i < 82; i++) {
      const phase = (i / 82) * Math.PI * 2;
      const rx = ring2R * Math.cos(phase);
      const rz = ring2R * Math.sin(phase);
      const tilted = rotatePoint({ x: rx, y: 0, z: rz }, 0.44, 0.25, 0.18);
      points.push({
        x: tilted.x,
        y: tilted.y - 2,
        z: tilted.z,
        nx: 0,
        ny: 1,
        nz: 0,
        type: "ring",
        ringPhase: phase,
      });
    }

    // Upward velocity particles
    for (let i = 0; i < 70; i++) {
      const phase = Math.random() * Math.PI * 2;
      const spread = baseR * (0.6 + Math.random() * 1.2);
      const rx = spread * Math.cos(phase);
      const rz = spread * Math.sin(phase);
      const randY = (Math.random() - 0.5) * 22;
      const tilted = rotatePoint({ x: rx, y: randY, z: rz }, 0.44, 0.25, 0.18);
      points.push({
        x: tilted.x,
        y: tilted.y,
        z: tilted.z,
        nx: 0,
        ny: 0,
        nz: 1,
        type: "halo",
      });
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible && rafId === 0) {
        rafId = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    let time = 0;

    const render = () => {
      if (!visible) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.018;

      const targetRotY = time * 0.92 + (pointer.active ? (pointer.x / width - 0.5) * 0.8 : 0);
      const targetRotX = 0.34 + (pointer.active ? (pointer.y / height - 0.5) * 0.4 : 0);
      smoothRotY += (targetRotY - smoothRotY) * 0.12;
      smoothRotX += (targetRotX - smoothRotX) * 0.12;

      const cx = width / 2;
      const cy = height / 2 + 2;
      const focal = 240;

      const lx = -0.55;
      const ly = -0.7;
      const lz = 0.85;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const rotated = rotatePoint(pt, smoothRotX, smoothRotY, 0.08);
        const normRot = rotatePoint(
          { x: pt.nx, y: pt.ny, z: pt.nz },
          smoothRotX,
          smoothRotY,
          0.08
        );

        const scale = focal / (focal + rotated.z);
        const sx = cx + rotated.x * scale;
        const sy = cy + rotated.y * scale;

        if (pt.type === "ring") {
          const pulse = Math.pow(
            0.5 + 0.5 * Math.sin((pt.ringPhase || 0) * 2 - time * 3.4),
            3
          );
          const alpha = 0.2 + pulse * 0.65;
          const dotSize = pulse > 0.65 ? 2.2 : 1.4;
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
        } else if (pt.type === "halo") {
          const alpha = 0.12 + 0.3 * Math.sin(time * 2 + i);
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
        } else {
          const dot = normRot.x * lx + normRot.y * ly + normRot.z * lz;
          const diffuse = Math.max(0, dot);
          const intensity = Math.min(1, 0.15 + diffuse * 0.75);
          const alpha = Math.max(0.14, intensity * 0.95);
          const dotSize = intensity > 0.7 ? 2.2 : 1.5;

          ctx.fillStyle = `rgba(15, 23, 42, ${alpha.toFixed(3)})`;
          ctx.fillRect(sx - dotSize / 2, sy - dotSize / 2, dotSize, dotSize);
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
