"use client";

import React from "react";
import Image from "next/image";

const PINE = "#102116";
const LIME = "#98CD4E";
const INK = "#333131";
const OAT = "#F5F8EE";
const LINE = "rgba(16, 33, 22, 0.1)";

const PALETTE = [
  {
    name: "Sprout Lime",
    hex: "#98CD4E",
    rgb: "152, 205, 78",
    cmyk: "44 · 0 · 84 · 0",
    role: "Bowl emblem & positive state",
    darkText: true,
  },
  {
    name: "Deep Pine",
    hex: "#102116",
    rgb: "16, 33, 22",
    cmyk: "82 · 55 · 80 · 68",
    role: "Wordmark & dark ground",
    darkText: false,
  },
  {
    name: "Charcoal Ink",
    hex: "#333131",
    rgb: "51, 49, 49",
    cmyk: "68 · 62 · 61 · 58",
    role: "Clinical copy & UI lockups",
    darkText: false,
  },
  {
    name: "Soft Oat",
    hex: "#F5F8EE",
    rgb: "245, 248, 238",
    cmyk: "3 · 1 · 6 · 0",
    role: "Calm light surfaces",
    darkText: true,
  },
];

function MealCircleIconMark({
  maskId,
  arcColor = PINE,
  bowlColor = LIME,
  className = "w-[64px] h-auto",
}: {
  maskId: string;
  arcColor?: string;
  bowlColor?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="4 10 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Meal Circle bowl mark"
    >
      <mask
        id={maskId}
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="6"
        y="24"
        width="36"
        height="25"
      >
        <path
          d="M31.2108 26.4858C35.5686 23.7415 41.6437 25.1701 41.7904 30.3178C41.8792 33.4372 41.1214 36.5229 39.5956 39.2501C38.0702 41.9773 35.8335 44.2452 33.1215 45.8151C30.4094 47.385 27.3219 48.1989 24.1841 48.1711C21.0463 48.1433 17.9741 47.2749 15.2908 45.6572C12.6075 44.0395 10.4124 41.7323 8.93641 38.9786C7.46046 36.2248 6.75824 33.1262 6.90365 30.0089C7.14371 24.8639 13.2441 23.5443 17.5528 26.3661L18.6221 27.0664C22.1065 29.3483 26.6016 29.3883 30.126 27.1689L31.2108 26.4858Z"
          fill="white"
        />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          d="M41.7904 30.3178C41.8792 33.4372 41.1214 36.5229 39.5956 39.2501C38.0702 41.9773 35.8335 44.2452 33.1215 45.8151C30.4094 47.385 27.3219 48.1989 24.1841 48.1711C21.0463 48.1433 17.9741 47.2749 15.2908 45.6572C12.6075 44.0395 10.4124 41.7323 8.93641 38.9786C7.46046 36.2248 6.75824 33.1262 6.90365 30.0089C7.14371 24.8639 13.2441 23.5443 17.5528 26.3661L18.6221 27.0664C22.1065 29.3483 26.6016 29.3883 30.126 27.1689L31.2108 26.4858C35.5686 23.7415 41.6437 25.1701 41.7904 30.3178Z"
          strokeWidth="10"
          stroke={bowlColor}
        />
      </g>
      <path
        d="M13.5536 19.9467C12.5942 19.0049 12.5711 17.4477 13.6368 16.628C16.634 14.3229 20.3179 13.0364 24.1425 13.0008C27.967 12.9652 31.6742 14.1828 34.7139 16.4317C35.7946 17.2314 35.8006 18.7888 34.8588 19.7482C33.917 20.7077 32.3853 20.6982 31.2632 19.9576C29.1802 18.583 26.7197 17.8457 24.1878 17.8692C21.6559 17.8928 19.2095 18.6758 17.1525 20.0891C16.0444 20.8504 14.5131 20.8884 13.5536 19.9467Z"
        fill={arcColor}
      />
    </svg>
  );
}

/**
 * Exact vector paths from Meal Circle's Group 7.svg asset, parameterized with
 * unique mask IDs and colorway props so it scales sharply across dark/light plates.
 */
function MealCircleVectorLockup({
  maskId,
  inkColor = INK,
  bowlColor = LIME,
  className = "w-[220px] h-auto",
}: {
  maskId: string;
  inkColor?: string;
  bowlColor?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 105 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Meal Circle brand lockup"
    >
      <mask
        id={maskId}
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="6"
        y="24"
        width="36"
        height="25"
      >
        <path
          d="M31.2108 26.4858C35.5686 23.7415 41.6437 25.1701 41.7904 30.3178C41.8792 33.4372 41.1214 36.5229 39.5956 39.2501C38.0702 41.9773 35.8335 44.2452 33.1215 45.8151C30.4094 47.385 27.3219 48.1989 24.1841 48.1711C21.0463 48.1433 17.9741 47.2749 15.2908 45.6572C12.6075 44.0395 10.4124 41.7323 8.93641 38.9786C7.46046 36.2248 6.75824 33.1262 6.90365 30.0089C7.14371 24.8639 13.2441 23.5443 17.5528 26.3661L18.6221 27.0664C22.1065 29.3483 26.6016 29.3883 30.126 27.1689L31.2108 26.4858Z"
          fill="white"
        />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path
          d="M41.7904 30.3178C41.8792 33.4372 41.1214 36.5229 39.5956 39.2501C38.0702 41.9773 35.8335 44.2452 33.1215 45.8151C30.4094 47.385 27.3219 48.1989 24.1841 48.1711C21.0463 48.1433 17.9741 47.2749 15.2908 45.6572C12.6075 44.0395 10.4124 41.7323 8.93641 38.9786C7.46046 36.2248 6.75824 33.1262 6.90365 30.0089C7.14371 24.8639 13.2441 23.5443 17.5528 26.3661L18.6221 27.0664C22.1065 29.3483 26.6016 29.3883 30.126 27.1689L31.2108 26.4858C35.5686 23.7415 41.6437 25.1701 41.7904 30.3178Z"
          strokeWidth="10"
          stroke={bowlColor}
        />
      </g>
      <path
        d="M56.2954 46.46C53.7501 46.46 51.5421 45.9387 49.6714 44.896C47.8008 43.8227 46.3441 42.366 45.3014 40.526C44.2894 38.6553 43.7834 36.524 43.7834 34.132C43.7834 31.4333 44.3201 29.1333 45.3934 27.232C46.4974 25.3 47.9234 23.828 49.6714 22.816C51.4194 21.7733 53.2748 21.252 55.2374 21.252C56.7401 21.252 58.1661 21.5587 59.5154 22.172C60.8648 22.7547 62.0608 23.5827 63.1034 24.656C64.1768 25.6987 65.0201 26.9407 65.6334 28.382C66.2468 29.7927 66.5688 31.3413 66.5994 33.028C66.5688 33.6413 66.3234 34.1473 65.8634 34.546C65.4034 34.9447 64.8668 35.144 64.2534 35.144H46.3594L45.2554 31.234H62.5514L61.6774 32.062V30.912C61.6161 29.8387 61.2634 28.9033 60.6194 28.106C59.9754 27.278 59.1781 26.6493 58.2274 26.22C57.2768 25.76 56.2801 25.53 55.2374 25.53C54.3174 25.53 53.4281 25.6833 52.5694 25.99C51.7414 26.266 50.9901 26.726 50.3154 27.37C49.6714 28.014 49.1501 28.8727 48.7514 29.946C48.3834 30.9887 48.1994 32.292 48.1994 33.856C48.1994 35.5427 48.5521 37.0147 49.2574 38.272C49.9628 39.5293 50.9134 40.5107 52.1094 41.216C53.3054 41.8907 54.6241 42.228 56.0654 42.228C57.2001 42.228 58.1354 42.1207 58.8714 41.906C59.6074 41.6607 60.2208 41.3693 60.7114 41.032C61.2021 40.6947 61.6314 40.3727 61.9994 40.066C62.4594 39.79 62.9194 39.652 63.3794 39.652C63.9314 39.652 64.3914 39.8513 64.7594 40.25C65.1274 40.618 65.3114 41.0627 65.3114 41.584C65.3114 42.2587 64.9741 42.872 64.2994 43.424C63.4714 44.2213 62.3214 44.9267 60.8494 45.54C59.4081 46.1533 57.8901 46.46 56.2954 46.46ZM89.5045 21.436C90.1792 21.436 90.7312 21.666 91.1605 22.126C91.5899 22.5553 91.8045 23.1073 91.8045 23.782V43.654C91.8045 44.3287 91.5899 44.896 91.1605 45.356C90.7312 45.7853 90.1792 46 89.5045 46C88.8605 46 88.3085 45.7853 87.8485 45.356C87.4192 44.896 87.2045 44.3287 87.2045 43.654V40.342L88.1705 40.48C88.1705 41.032 87.9405 41.6453 87.4805 42.32C87.0512 42.9947 86.4532 43.654 85.6865 44.298C84.9199 44.9113 84.0152 45.4327 82.9725 45.862C81.9299 46.2607 80.8105 46.46 79.6145 46.46C77.4985 46.46 75.5972 45.9233 73.9105 44.85C72.2239 43.746 70.8899 42.2433 69.9085 40.342C68.9272 38.4407 68.4365 36.2787 68.4365 33.856C68.4365 31.372 68.9272 29.1947 69.9085 27.324C70.8899 25.4227 72.2085 23.9353 73.8645 22.862C75.5512 21.7887 77.4219 21.252 79.4765 21.252C80.7952 21.252 82.0065 21.4667 83.1105 21.896C84.2452 22.3253 85.2265 22.8773 86.0545 23.552C86.8825 24.2267 87.5112 24.9473 87.9405 25.714C88.4005 26.45 88.6305 27.1553 88.6305 27.83L87.2045 27.968V23.782C87.2045 23.138 87.4192 22.586 87.8485 22.126C88.3085 21.666 88.8605 21.436 89.5045 21.436ZM80.1205 42.228C81.5619 42.228 82.8345 41.86 83.9385 41.124C85.0425 40.388 85.9012 39.3913 86.5145 38.134C87.1279 36.846 87.4345 35.42 87.4345 33.856C87.4345 32.2613 87.1279 30.8353 86.5145 29.578C85.9012 28.3207 85.0425 27.324 83.9385 26.588C82.8345 25.852 81.5619 25.484 80.1205 25.484C78.7099 25.484 77.4525 25.852 76.3485 26.588C75.2752 27.324 74.4165 28.3207 73.7725 29.578C73.1592 30.8353 72.8525 32.2613 72.8525 33.856C72.8525 35.42 73.1592 36.846 73.7725 38.134C74.4165 39.3913 75.2752 40.388 76.3485 41.124C77.4525 41.86 78.7099 42.228 80.1205 42.228ZM100.917 43.654C100.917 44.3287 100.687 44.896 100.227 45.356C99.7975 45.7853 99.2609 46 98.6169 46C97.9729 46 97.4209 45.7853 96.9609 45.356C96.5315 44.896 96.3169 44.3287 96.3169 43.654V14.306C96.3169 13.6313 96.5469 13.0793 97.0069 12.65C97.4669 12.19 98.0189 11.96 98.6629 11.96C99.3375 11.96 99.8742 12.19 100.273 12.65C100.702 13.0793 100.917 13.6313 100.917 14.306V43.654Z"
        fill={inkColor}
      />
      <path
        d="M13.5536 19.9467C12.5942 19.0049 12.5711 17.4477 13.6368 16.628C16.634 14.3229 20.3179 13.0364 24.1425 13.0008C27.967 12.9652 31.6742 14.1828 34.7139 16.4317C35.7946 17.2314 35.8006 18.7888 34.8588 19.7482C33.917 20.7077 32.3853 20.6982 31.2632 19.9576C29.1802 18.583 26.7197 17.8457 24.1878 17.8692C21.6559 17.8928 19.2095 18.6758 17.1525 20.0891C16.0444 20.8504 14.5131 20.8884 13.5536 19.9467Z"
        fill={inkColor}
      />
    </svg>
  );
}

/**
 * Clean Dribbble-style card thumbnail for /portfolio grid (no tiny cluttered boxes)
 */
export function MealCircleBrandCard() {
  return (
    <div
      className="relative w-full aspect-[16/10] overflow-hidden rounded-[12px] grid grid-cols-2"
      style={{
        background: OAT,
        border: `1px solid ${LINE}`,
      }}
    >
      {/* Left 50%: Rich Dark Produce Tile */}
      <div className="relative h-full overflow-hidden bg-[#0b170f]">
        <Image
          src="/images/brands/meal-circle/hero-icon.png"
          alt="Meal Circle fresh produce photography lockup"
          fill
          sizes="(max-width: 768px) 50vw, 240px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Right 50%: Pure Deep Pine Monumental Mark Field */}
      <div
        className="h-full flex flex-col items-center justify-center p-5 gap-4"
        style={{ background: PINE }}
      >
        <MealCircleVectorLockup
          maskId="mc-card-mask"
          inkColor="#FFFFFF"
          bowlColor={LIME}
          className="w-[72%] max-w-[130px] h-auto"
        />
        <div className="w-8 h-[1px] bg-white/15" />
        <Image
          src="/images/brands/meal-circle/wordmark.png"
          alt="meal circle wordmark"
          width={681}
          height={113}
          unoptimized
          className="w-[76%] max-w-[138px] h-auto object-contain brightness-0 invert opacity-90"
        />
      </div>
    </div>
  );
}

/**
 * Plate 01 (Hero): Full-bleed Studio / Behance Split Opening Banner
 */
export function MealCircleBrandHero() {
  return (
    <div
      className="w-full overflow-hidden rounded-[22px] grid grid-cols-1 lg:grid-cols-12"
      style={{ border: `1px solid ${LINE}` }}
    >
      {/* Left 6 cols: Full-Bleed Atmospheric Photography Hero */}
      <div className="lg:col-span-6 relative aspect-square lg:aspect-auto lg:min-h-[480px] bg-[#0b170f] overflow-hidden">
        <Image
          src="/images/brands/meal-circle/hero-icon.png"
          alt="Meal Circle brand photography and icon lockup"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover"
        />
      </div>

      {/* Right 6 cols: Monumental Deep Pine Typography & Wordmark Plate */}
      <div
        className="lg:col-span-6 min-h-[340px] lg:min-h-[480px] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden"
        style={{ background: PINE, color: "#FFFFFF" }}
      >
        {/* Top subtle exhibition metadata */}
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-white/50">
          <span>01 · Brand Identity System</span>
          <span>Meal Circle</span>
        </div>

        {/* Centerpiece: Standalone Bowl Mark + Monumental Horizontal Logotype */}
        <div className="my-auto py-8 flex flex-col items-center justify-center gap-7 text-center">
          <MealCircleIconMark
            maskId="mc-hero-icon-reverse"
            arcColor="#FFFFFF"
            bowlColor={LIME}
            className="w-[74px] sm:w-[86px] h-auto"
          />
          <Image
            src="/images/brands/meal-circle/wordmark.png"
            alt="meal circle full logotype"
            width={681}
            height={113}
            unoptimized
            className="w-[230px] sm:w-[290px] h-auto object-contain brightness-0 invert opacity-95"
          />
          <p className="text-[13px] sm:text-[14px] text-white/65 max-w-[320px] leading-[1.5]">
            Know which patients need you today, and why. Built around a calm clinical identity.
          </p>
        </div>

        {/* Bottom quiet hairline caption */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[12px] text-white/60">
          <span>Clinical Nutrition SaaS</span>
          <span style={{ color: LIME }}>mealcircle.co</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Extended Behance-Style Editorial Brand Case Study Plates
 * Follows Koto / Pentagram exhibition cadence:
 * - Plate 02: Logo Construction Geometry + Responsive Lockup Scale
 * - Plate 03: Three-Up Full-Bleed Colorway Proof
 * - Plate 04: Tall Color Architecture Pillars + Expressive Type Specimen
 * - Plate 05: Real-World Physical Kraft Bowl Packaging & Mobile Experience
 */
export function MealCircleBrandGuidelinesBoard() {
  return (
    <section className="wrap mb-12 sm:mb-16 space-y-6 sm:space-y-8">
      {/* ─── PLATE 02: GEOMETRIC CONSTRUCTION & RESPONSIVE LOGO HIERARCHY ─── */}
      <div
        className="rounded-[22px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white"
        style={{ border: `1px solid ${LINE}` }}
      >
        {/* Left: Oversized Architectural Grid Construction */}
        <div
          className="lg:col-span-8 p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between min-h-[340px] sm:min-h-[420px] overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16,33,22,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,33,22,0.045) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c] relative z-10">
            <span>02 · Geometric Construction</span>
            <span>Optical Grid &amp; Balance</span>
          </div>

          <div className="my-auto py-6 flex items-center justify-center relative">
            {/* Shared 105×58 SVG Coordinate Space — guarantees 0.0px tangent precision */}
            <svg
              viewBox="-10 2 125 56"
              className="w-full max-w-[540px] h-auto"
              fill="none"
              role="img"
              aria-label="Meal Circle optical grid and geometric construction"
            >
              {/* Subtle outer 1× clear-space bounding frame */}
              <rect
                x="-2"
                y="6"
                width="110.8"
                height="48.1"
                stroke="rgba(16,33,22,0.16)"
                strokeWidth="0.35"
                strokeDasharray="1.4 1.4"
              />

              {/* Edge-to-edge Horizontal Typography & Optical Tangents */}
              {/* y=12.0: Ascender top of 'l' */}
              <line x1="-10" y1="12.0" x2="115" y2="12.0" stroke="rgba(16,33,22,0.13)" strokeWidth="0.28" />
              {/* y=13.0: Emblem crescent outer top */}
              <line x1="-10" y1="13.0" x2="54" y2="13.0" stroke="rgba(152,205,78,0.55)" strokeWidth="0.28" strokeDasharray="1.2 1.2" />
              {/* y=21.25: X-height of 'e' and 'a' */}
              <line x1="-10" y1="21.25" x2="115" y2="21.25" stroke="rgba(16,33,22,0.13)" strokeWidth="0.28" />
              {/* y=46.4: Letterform baseline of 'eal' */}
              <line x1="-10" y1="46.4" x2="115" y2="46.4" stroke="rgba(16,33,22,0.15)" strokeWidth="0.28" />
              {/* y=48.1: Curved bowl optical overshoot base */}
              <line x1="-10" y1="48.1" x2="54" y2="48.1" stroke="rgba(152,205,78,0.55)" strokeWidth="0.28" strokeDasharray="1.2 1.2" />

              {/* Vertical Alignment & Spacing Channels */}
              {/* x=6.9: Left tangent of bowl */}
              <line x1="6.9" y1="4" x2="6.9" y2="56" stroke="rgba(16,33,22,0.11)" strokeWidth="0.28" />
              {/* x=24.3: Exact vertical symmetry axis of emblem */}
              <line x1="24.3" y1="4" x2="24.3" y2="56" stroke="rgba(152,205,78,0.6)" strokeWidth="0.3" strokeDasharray="1.2 1.2" />
              {/* x=41.7: Right tangent of bowl */}
              <line x1="41.7" y1="4" x2="41.7" y2="56" stroke="rgba(16,33,22,0.11)" strokeWidth="0.28" />
              {/* x=43.8: Left tangent of 'e' (2.1u optical spacing channel) */}
              <line x1="43.8" y1="4" x2="43.8" y2="56" stroke="rgba(16,33,22,0.11)" strokeWidth="0.28" />
              {/* x=100.8: Right edge of 'l' */}
              <line x1="100.8" y1="4" x2="100.8" y2="56" stroke="rgba(16,33,22,0.11)" strokeWidth="0.28" />

              {/* Master Bounding Circle: tangent to top arc (13.0), left (6.9), right (41.7), bottom (48.1) */}
              <circle
                cx="24.3"
                cy="30.55"
                r="17.55"
                stroke="rgba(16,33,22,0.28)"
                strokeWidth="0.35"
                strokeDasharray="1.4 1.2"
              />

              {/* Bowl Inner Arc Radius Guide centered symmetrically on lower arc */}
              <circle
                cx="24.3"
                cy="30.55"
                r="12.5"
                stroke="rgba(16,33,22,0.16)"
                strokeWidth="0.3"
              />

              {/* Subtle Blueprint Labels */}
              <text x="103" y="11.2" fill="rgba(16,33,22,0.42)" fontSize="2.2" fontWeight="500">
                ascender
              </text>
              <text x="103" y="20.5" fill="rgba(16,33,22,0.42)" fontSize="2.2" fontWeight="500">
                x-height
              </text>
              <text x="103" y="45.6" fill="rgba(16,33,22,0.42)" fontSize="2.2" fontWeight="500">
                baseline
              </text>

              {/* Exact Original SVG Logo Paths (1:1 coordinates — zero manual transform drift) */}
              <mask
                id="mc-grid-mask"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="6"
                y="24"
                width="36"
                height="25"
              >
                <path
                  d="M31.2108 26.4858C35.5686 23.7415 41.6437 25.1701 41.7904 30.3178C41.8792 33.4372 41.1214 36.5229 39.5956 39.2501C38.0702 41.9773 35.8335 44.2452 33.1215 45.8151C30.4094 47.385 27.3219 48.1989 24.1841 48.1711C21.0463 48.1433 17.9741 47.2749 15.2908 45.6572C12.6075 44.0395 10.4124 41.7323 8.93641 38.9786C7.46046 36.2248 6.75824 33.1262 6.90365 30.0089C7.14371 24.8639 13.2441 23.5443 17.5528 26.3661L18.6221 27.0664C22.1065 29.3483 26.6016 29.3883 30.126 27.1689L31.2108 26.4858Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mc-grid-mask)">
                <path
                  d="M41.7904 30.3178C41.8792 33.4372 41.1214 36.5229 39.5956 39.2501C38.0702 41.9773 35.8335 44.2452 33.1215 45.8151C30.4094 47.385 27.3219 48.1989 24.1841 48.1711C21.0463 48.1433 17.9741 47.2749 15.2908 45.6572C12.6075 44.0395 10.4124 41.7323 8.93641 38.9786C7.46046 36.2248 6.75824 33.1262 6.90365 30.0089C7.14371 24.8639 13.2441 23.5443 17.5528 26.3661L18.6221 27.0664C22.1065 29.3483 26.6016 29.3883 30.126 27.1689L31.2108 26.4858C35.5686 23.7415 41.6437 25.1701 41.7904 30.3178Z"
                  strokeWidth="10"
                  stroke={LIME}
                />
              </g>
              <path
                d="M56.2954 46.46C53.7501 46.46 51.5421 45.9387 49.6714 44.896C47.8008 43.8227 46.3441 42.366 45.3014 40.526C44.2894 38.6553 43.7834 36.524 43.7834 34.132C43.7834 31.4333 44.3201 29.1333 45.3934 27.232C46.4974 25.3 47.9234 23.828 49.6714 22.816C51.4194 21.7733 53.2748 21.252 55.2374 21.252C56.7401 21.252 58.1661 21.5587 59.5154 22.172C60.8648 22.7547 62.0608 23.5827 63.1034 24.656C64.1768 25.6987 65.0201 26.9407 65.6334 28.382C66.2468 29.7927 66.5688 31.3413 66.5994 33.028C66.5688 33.6413 66.3234 34.1473 65.8634 34.546C65.4034 34.9447 64.8668 35.144 64.2534 35.144H46.3594L45.2554 31.234H62.5514L61.6774 32.062V30.912C61.6161 29.8387 61.2634 28.9033 60.6194 28.106C59.9754 27.278 59.1781 26.6493 58.2274 26.22C57.2768 25.76 56.2801 25.53 55.2374 25.53C54.3174 25.53 53.4281 25.6833 52.5694 25.99C51.7414 26.266 50.9901 26.726 50.3154 27.37C49.6714 28.014 49.1501 28.8727 48.7514 29.946C48.3834 30.9887 48.1994 32.292 48.1994 33.856C48.1994 35.5427 48.5521 37.0147 49.2574 38.272C49.9628 39.5293 50.9134 40.5107 52.1094 41.216C53.3054 41.8907 54.6241 42.228 56.0654 42.228C57.2001 42.228 58.1354 42.1207 58.8714 41.906C59.6074 41.6607 60.2208 41.3693 60.7114 41.032C61.2021 40.6947 61.6314 40.3727 61.9994 40.066C62.4594 39.79 62.9194 39.652 63.3794 39.652C63.9314 39.652 64.3914 39.8513 64.7594 40.25C65.1274 40.618 65.3114 41.0627 65.3114 41.584C65.3114 42.2587 64.9741 42.872 64.2994 43.424C63.4714 44.2213 62.3214 44.9267 60.8494 45.54C59.4081 46.1533 57.8901 46.46 56.2954 46.46ZM89.5045 21.436C90.1792 21.436 90.7312 21.666 91.1605 22.126C91.5899 22.5553 91.8045 23.1073 91.8045 23.782V43.654C91.8045 44.3287 91.5899 44.896 91.1605 45.356C90.7312 45.7853 90.1792 46 89.5045 46C88.8605 46 88.3085 45.7853 87.8485 45.356C87.4192 44.896 87.2045 44.3287 87.2045 43.654V40.342L88.1705 40.48C88.1705 41.032 87.9405 41.6453 87.4805 42.32C87.0512 42.9947 86.4532 43.654 85.6865 44.298C84.9199 44.9113 84.0152 45.4327 82.9725 45.862C81.9299 46.2607 80.8105 46.46 79.6145 46.46C77.4985 46.46 75.5972 45.9233 73.9105 44.85C72.2239 43.746 70.8899 42.2433 69.9085 40.342C68.9272 38.4407 68.4365 36.2787 68.4365 33.856C68.4365 31.372 68.9272 29.1947 69.9085 27.324C70.8899 25.4227 72.2085 23.9353 73.8645 22.862C75.5512 21.7887 77.4219 21.252 79.4765 21.252C80.7952 21.252 82.0065 21.4667 83.1105 21.896C84.2452 22.3253 85.2265 22.8773 86.0545 23.552C86.8825 24.2267 87.5112 24.9473 87.9405 25.714C88.4005 26.45 88.6305 27.1553 88.6305 27.83L87.2045 27.968V23.782C87.2045 23.138 87.4192 22.586 87.8485 22.126C88.3085 21.666 88.8605 21.436 89.5045 21.436ZM80.1205 42.228C81.5619 42.228 82.8345 41.86 83.9385 41.124C85.0425 40.388 85.9012 39.3913 86.5145 38.134C87.1279 36.846 87.4345 35.42 87.4345 33.856C87.4345 32.2613 87.1279 30.8353 86.5145 29.578C85.9012 28.3207 85.0425 27.324 83.9385 26.588C82.8345 25.852 81.5619 25.484 80.1205 25.484C78.7099 25.484 77.4525 25.852 76.3485 26.588C75.2752 27.324 74.4165 28.3207 73.7725 29.578C73.1592 30.8353 72.8525 32.2613 72.8525 33.856C72.8525 35.42 73.1592 36.846 73.7725 38.134C74.4165 39.3913 75.2752 40.388 76.3485 41.124C77.4525 41.86 78.7099 42.228 80.1205 42.228ZM100.917 43.654C100.917 44.3287 100.687 44.896 100.227 45.356C99.7975 45.7853 99.2609 46 98.6169 46C97.9729 46 97.4209 45.7853 96.9609 45.356C96.5315 44.896 96.3169 44.3287 96.3169 43.654V14.306C96.3169 13.6313 96.5469 13.0793 97.0069 12.65C97.4669 12.19 98.0189 11.96 98.6629 11.96C99.3375 11.96 99.8742 12.19 100.273 12.65C100.702 13.0793 100.917 13.6313 100.917 14.306V43.654Z"
                fill={PINE}
              />
              <path
                d="M13.5536 19.9467C12.5942 19.0049 12.5711 17.4477 13.6368 16.628C16.634 14.3229 20.3179 13.0364 24.1425 13.0008C27.967 12.9652 31.6742 14.1828 34.7139 16.4317C35.7946 17.2314 35.8006 18.7888 34.8588 19.7482C33.917 20.7077 32.3853 20.6982 31.2632 19.9576C29.1802 18.583 26.7197 17.8457 24.1878 17.8692C21.6559 17.8928 19.2095 18.6758 17.1525 20.0891C16.0444 20.8504 14.5131 20.8884 13.5536 19.9467Z"
                fill={PINE}
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[12px] text-[#51565c] relative z-10">
            <span>Smiling bowl monogram doubles as letterform &ldquo;m&rdquo;</span>
            <span className="font-medium text-[#202124]">1× Clear Space</span>
          </div>
        </div>

        {/* Right: Clean Responsive Logo Scale Ladder */}
        <div
          className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between gap-8"
          style={{ background: OAT }}
        >
          <div className="text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            Responsive Scale System
          </div>

          <div className="space-y-8 my-auto">
            <div>
              <span className="block text-[11px] text-[#51565c] mb-2.5">
                01 · Primary Wordmark
              </span>
              <Image
                src="/images/brands/meal-circle/wordmark.png"
                alt="meal circle wordmark"
                width={681}
                height={113}
                unoptimized
                className="w-[210px] h-auto object-contain"
              />
            </div>

            <div className="pt-6 border-t border-black/[0.08]">
              <span className="block text-[11px] text-[#51565c] mb-2.5">
                02 · Monogram Lockup
              </span>
              <MealCircleVectorLockup
                maskId="mc-scale-mask"
                inkColor={PINE}
                bowlColor={LIME}
                className="w-[140px] h-auto"
              />
            </div>

            <div className="pt-6 border-t border-black/[0.08]">
              <span className="block text-[11px] text-[#51565c] mb-2.5">
                03 · Favicon &amp; Seal Mark
              </span>
              <Image
                src="/images/brands/meal-circle/mark.png"
                alt="Meal Circle icon mark"
                width={201}
                height={202}
                unoptimized
                className="w-[54px] h-[54px] object-contain"
              />
            </div>
          </div>

          <div className="text-[12px] text-[#51565c]">
            Tested from 24px mobile UI up to signage
          </div>
        </div>
      </div>

      {/* ─── PLATE 03: KOTO-STYLE 3-UP COLORWAY PROOF ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Swatch 1: Deep Pine Ground */}
        <div
          className="rounded-[20px] min-h-[240px] sm:min-h-[270px] p-8 flex flex-col justify-between"
          style={{ background: PINE }}
        >
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">
            Dark · Reverse
          </span>
          <div className="my-auto flex items-center justify-center py-4">
            <MealCircleVectorLockup
              maskId="mc-proof-dark"
              inkColor="#FFFFFF"
              bowlColor={LIME}
              className="w-[175px] h-auto"
            />
          </div>
          <span className="text-[12px] text-white/60">Primary Dark Mode</span>
        </div>

        {/* Swatch 2: Sprout Lime Signature */}
        <div
          className="rounded-[20px] min-h-[240px] sm:min-h-[270px] p-8 flex flex-col justify-between"
          style={{ background: LIME }}
        >
          <span
            className="text-[11px] uppercase tracking-[0.12em]"
            style={{ color: "rgba(16,33,22,0.55)" }}
          >
            Signature · Lime
          </span>
          <div className="my-auto flex items-center justify-center py-4">
            <MealCircleVectorLockup
              maskId="mc-proof-lime"
              inkColor={PINE}
              bowlColor={PINE}
              className="w-[175px] h-auto"
            />
          </div>
          <span className="text-[12px]" style={{ color: PINE }}>
            High-Visibility Accent
          </span>
        </div>

        {/* Swatch 3: Monochrome Light */}
        <div
          className="rounded-[20px] min-h-[240px] sm:min-h-[270px] p-8 flex flex-col justify-between bg-[#F5F8EE]"
          style={{ border: `1px solid ${LINE}` }}
        >
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#51565c]">
            Daylight · Full Color
          </span>
          <div className="my-auto flex items-center justify-center py-4">
            <MealCircleVectorLockup
              maskId="mc-proof-light"
              inkColor={INK}
              bowlColor={LIME}
              className="w-[175px] h-auto"
            />
          </div>
          <span className="text-[12px] text-[#51565c]">Light Packaging &amp; UI</span>
        </div>
      </div>

      {/* ─── PLATE 04: COLOR PILLARS & TYPOGRAPHY SPECIMEN ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tall Color Pillars */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {PALETTE.map((swatch) => (
            <div
              key={swatch.hex}
              className="rounded-[20px] p-5 min-h-[250px] sm:min-h-[300px] flex flex-col justify-between"
              style={{
                background: swatch.hex,
                color: swatch.darkText ? PINE : "#FFFFFF",
                border:
                  swatch.hex === "#F5F8EE" ? `1px solid ${LINE}` : "none",
              }}
            >
              <div>
                <div className="text-[14px] font-semibold tracking-[-0.01em]">
                  {swatch.name}
                </div>
                <div className="text-[11px] opacity-70 mt-1 leading-snug">
                  {swatch.role}
                </div>
              </div>

              <div className="space-y-1 text-[11px] opacity-85">
                <div className="font-semibold text-[13px]">{swatch.hex}</div>
                <div>RGB {swatch.rgb}</div>
                <div>CMYK {swatch.cmyk}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expressive Typography Specimen */}
        <div
          className="lg:col-span-5 rounded-[20px] p-7 sm:p-9 bg-[#f2f2f0] flex flex-col justify-between gap-6"
          style={{ border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            <span>04 · Typography</span>
            <span>Soft Geometric Sans</span>
          </div>

          <div className="my-auto">
            <div
              className="text-[64px] sm:text-[78px] font-semibold tracking-[-0.04em] leading-none mb-4"
              style={{ color: PINE }}
            >
              Aa
            </div>
            <div className="text-[18px] sm:text-[20px] font-medium tracking-[-0.02em] text-[#202124] mb-2">
              know who needs you today, and why.
            </div>
            <p className="text-[13px] leading-[1.6] text-[#51565c]">
              abcdefghijklmnopqrstuvwxyz · 0123456789
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between text-[12px] text-[#51565c]">
            <span>Warm clarity for clinics &amp; patients</span>
            <span className="font-medium text-[#202124]">Display &amp; UI</span>
          </div>
        </div>
      </div>

      {/* ─── PLATE 05: COACH BRIEFING WEB PLATFORM & PATIENT APP ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Authentic Coach Morning Briefing SaaS Product Surface */}
        <div
          className="lg:col-span-7 rounded-[22px] p-7 sm:p-10 flex flex-col justify-between min-h-[360px]"
          style={{
            background: PINE,
            color: "#FFFFFF",
          }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-white/55">
            <span>05 · Product Application</span>
            <span>Coach Daily Briefing</span>
          </div>

          {/* SaaS Window Frame */}
          <div className="my-auto py-6 flex items-center justify-center">
            <div className="w-full max-w-[460px] rounded-[18px] overflow-hidden bg-white text-[#202124] border border-white/15">
              {/* Top App Chrome */}
              <div
                className="px-5 py-3.5 flex items-center justify-between"
                style={{ background: OAT, borderBottom: `1px solid ${LINE}` }}
              >
                <div className="flex items-center gap-2.5">
                  <MealCircleVectorLockup
                    maskId="mc-saas-mask"
                    inkColor={PINE}
                    bowlColor={LIME}
                    className="w-[62px] h-auto"
                  />
                  <span className="text-[11px] font-medium text-[#51565c]">
                    · Today
                  </span>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                  style={{ background: LIME, color: PINE }}
                >
                  2 min setup
                </span>
              </div>

              {/* Briefing Rows matching mealcircle.co */}
              <div className="p-4 sm:p-5 space-y-2.5">
                <div
                  className="rounded-xl p-3.5 flex items-center justify-between gap-3"
                  style={{ background: "#fafaf8", border: `1px solid ${LINE}` }}
                >
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-[#102116] truncate">
                      Hina Raza
                    </div>
                    <div className="text-[11px] text-[#51565c] truncate">
                      Quiet 3 days after 9 clean · Suggested exam-week swaps
                    </div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold flex-shrink-0"
                    style={{ background: "#FEF3C7", color: "#92400E" }}
                  >
                    At risk
                  </span>
                </div>

                <div
                  className="rounded-xl p-3.5 flex items-center justify-between gap-3"
                  style={{ background: "#fafaf8", border: `1px solid ${LINE}` }}
                >
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-semibold text-[#102116] truncate">
                      Omar Malik
                    </div>
                    <div className="text-[11px] text-[#51565c] truncate">
                      Dinner missed 5 of 7 · Offer 15-minute dinners
                    </div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold flex-shrink-0"
                    style={{ background: LIME, color: PINE }}
                  >
                    Message
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px] text-white/60">
            <span>Clinics · Solo dietitians · Coaching teams</span>
            <span style={{ color: LIME }}>One calm morning view</span>
          </div>
        </div>

        {/* Right: Free Patient Mobile Logging App */}
        <div
          className="lg:col-span-5 rounded-[22px] p-7 sm:p-9 flex flex-col justify-between min-h-[360px]"
          style={{ background: OAT, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            <span>Patient App</span>
            <span>Log in two taps</span>
          </div>

          {/* Mobile App Frame Preview */}
          <div className="my-auto py-4 flex justify-center">
            <div
              className="w-full max-w-[270px] rounded-[26px] p-4 bg-white"
              style={{ border: "5px solid #102116" }}
            >
              {/* App Header */}
              <div className="flex items-center justify-between mb-3.5">
                <Image
                  src="/images/brands/meal-circle/wordmark.png"
                  alt="meal circle app header"
                  width={681}
                  height={113}
                  unoptimized
                  className="w-[96px] h-auto object-contain"
                />
                <div className="w-7 h-7 rounded-full overflow-hidden relative">
                  <Image
                    src="/images/brands/meal-circle/hero-icon.png"
                    alt="User app tile"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Hero Card inside App */}
              <div
                className="relative h-[132px] rounded-xl overflow-hidden mb-3 p-3.5 flex flex-col justify-between"
                style={{
                  background: `radial-gradient(circle at 80% 25%, rgba(152,205,78,0.22) 0%, transparent 55%), ${PINE}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.05em]"
                    style={{ background: "rgba(255,255,255,0.12)", color: "#FFFFFF" }}
                  >
                    Today&apos;s Plan
                  </span>
                  <MealCircleIconMark
                    maskId="mc-app-card-reverse"
                    arcColor="#FFFFFF"
                    bowlColor={LIME}
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <div className="text-[12.5px] font-medium text-white leading-tight">
                      Fri Dinner · Daal Bowl
                    </div>
                    <div className="text-[10px] text-white/60">
                      Coach live swap ready
                    </div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold flex-shrink-0"
                    style={{ background: LIME, color: PINE }}
                  >
                    Log
                  </span>
                </div>
              </div>

              {/* App Row */}
              <div
                className="rounded-xl p-2.5 flex items-center justify-between"
                style={{ background: OAT }}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/brands/meal-circle/mark.png"
                    alt="Meal Circle check-in icon"
                    width={201}
                    height={202}
                    unoptimized
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-[11px] font-medium text-[#102116]">
                    Check-in Synced
                  </span>
                </div>
                <span className="text-[10.5px] font-semibold text-[#51565c]">
                  9d clean
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px] text-[#51565c]">
            <span>Home icon, logs &amp; gentle check-ins</span>
            <span className="font-medium text-[#102116]">Free for patients</span>
          </div>
        </div>
      </div>
    </section>
  );
}
