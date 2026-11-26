"use client";

import React from "react";
import Image from "next/image";

const VIOLET = "#C97DFF"; // Primary Split Violet (from Complete logo.svg)
const OBSIDIAN = "#130D1C"; // Deep Obsidian Plum
const AUBERGINE = "#261C38"; // Dark Violet Slate
const CLOUD = "#F6F1FC"; // Soft Lilac Canvas
const LINE = "rgba(19, 13, 28, 0.11)";

const PALETTE = [
  {
    name: "Split Violet",
    hex: "#C97DFF",
    rgb: "201, 125, 255",
    cmyk: "21 · 51 · 0 · 0",
    role: "Stepped E mark, split pills & transfer CTA",
    darkText: true,
  },
  {
    name: "Obsidian Plum",
    hex: "#130D1C",
    rgb: "19, 13, 28",
    cmyk: "78 · 84 · 58 · 82",
    role: "Dark wallet ground & Split Card body",
    darkText: false,
  },
  {
    name: "Indigo Slate",
    hex: "#261C38",
    rgb: "38, 28, 56",
    cmyk: "75 · 83 · 45 · 56",
    role: "Elevated dark surfaces & ledger headings",
    darkText: false,
  },
  {
    name: "Lilac Cloud",
    hex: "#F6F1FC",
    rgb: "246, 241, 252",
    cmyk: "4 · 6 · 0 · 0",
    role: "Light ledger backdrop & receipt cards",
    darkText: true,
  },
];

const VENLY_WORDMARK_PATH =
  "M226.673 110.109H259.998L219.788 200.197H204.92L164.856 110.109H197.522L212.244 150.612L226.673 110.109ZM353.821 150.539C353.821 155.227 353.016 160.134 351.771 163.503V164.089H291.565C294.788 171.779 301.453 177.053 310.022 177.053C314.271 177.053 319.764 175.808 326.136 170.095L348.182 182.912C336.683 197.78 320.057 200.93 309.437 200.93C282.703 200.93 261.829 181.081 261.829 154.055C261.829 126.662 283.289 107.18 309.51 107.18C337.415 107.18 353.821 129.152 353.821 150.539ZM309.07 130.983C299.476 130.983 292.957 137.502 290.54 146.071H325.55C323.792 137.429 318.665 130.983 309.07 130.983ZM423.621 107.399C440.027 107.399 456.287 115.31 456.287 150.466V198H426.697V150.466C426.697 138.674 421.644 133.84 412.708 133.84C403.113 133.84 397.693 140.651 397.693 150.466V198H368.104V110.109H395.496L396.668 117.8C403.333 111.354 412.488 107.399 423.621 107.399ZM475.33 198V77.1504H504.92V198H475.33ZM588.562 110.109H620.496L565.418 230.959H534.656L552.82 190.31L517.298 110.109H550.184L567.103 158.303L588.562 110.109Z";

const EVENLY_MARK_MERGED_PATH =
  "M54 0H135V13H174V81H147V135H54V146H135V202H0V54H54V0ZM54 54V81H119V54H54Z";

/**
 * Single merged seamless vector path for Evenly's stepped E monogram (no internal seams).
 */
function EvenlyMarkPaths({ fill }: { fill: string }) {
  return <path d={EVENLY_MARK_MERGED_PATH} fill={fill} />;
}

/**
 * Standalone geometric stepped-block "E" monogram from Evenly's Vector.svg.
 */
function EvenlyMarkVector({
  fill = VIOLET,
  className = "w-[68px] h-auto",
}: {
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 174 202"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Evenly stepped E monogram"
    >
      <EvenlyMarkPaths fill={fill} />
    </svg>
  );
}

/**
 * Full Evenly horizontal lockup pairing the stepped E monogram with the geometric "venly" wordmark.
 */
function EvenlyFullLockup({
  markColor = VIOLET,
  textColor = "#FFFFFF",
  className = "w-[220px] h-auto",
}: {
  markColor?: string;
  textColor?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 624 235"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Evenly brand logotype"
    >
      <EvenlyMarkPaths fill={markColor} />
      <path d={VENLY_WORDMARK_PATH} fill={textColor} />
    </svg>
  );
}

/**
 * Compact 16:10 Portfolio Card Visual for the Brand Design grid.
 */
export function EvenlyBrandCard() {
  return (
    <div
      className="relative w-full aspect-[16/10] overflow-hidden rounded-[12px] grid grid-cols-2"
      style={{
        background: CLOUD,
        border: `1px solid ${LINE}`,
      }}
    >
      {/* Left 50%: Atmospheric Friends Dinner Split Photo with Crisp Evenly Lockup */}
      <div className="relative h-full overflow-hidden bg-[#130D1C] flex items-center justify-center p-4">
        <Image
          src="/images/brands/evenly/hero-photo.webp"
          alt="Friends splitting a dinner bill around a dark table with Evenly"
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#130D1C]/52"
        />
        <div className="relative z-10 flex items-center justify-center w-full">
          <EvenlyFullLockup
            markColor={VIOLET}
            textColor="#FFFFFF"
            className="w-[82%] max-w-[155px] h-auto drop-shadow-[0_4px_16px_rgba(19,13,28,0.65)] transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Right 50%: Split Violet Brand Field with Bold Stepped E */}
      <div
        className="h-full flex flex-col items-center justify-center p-4 gap-3"
        style={{ background: VIOLET, color: OBSIDIAN }}
      >
        <EvenlyMarkVector
          fill={OBSIDIAN}
          className="w-[46%] max-w-[80px] h-auto transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <span className="text-[11px] font-semibold tracking-[-0.01em] opacity-80">
          Split · Send · Settle
        </span>
      </div>
    </div>
  );
}

/**
 * Plate 01 (Hero): Obsidian Full Lockup + Split Violet Identity Card
 */
export function EvenlyBrandHero() {
  return (
    <div
      className="w-full overflow-hidden rounded-[22px] grid grid-cols-1 lg:grid-cols-12"
      style={{ border: `1px solid ${LINE}` }}
    >
      {/* Left 6 cols: Full-Bleed Atmospheric Photography Hero with Centered Evenly Lockup */}
      <div
        className="lg:col-span-6 relative min-h-[340px] lg:min-h-[480px] p-8 sm:p-12 flex flex-col justify-between overflow-hidden"
        style={{ background: OBSIDIAN, color: "#FFFFFF" }}
      >
        <Image
          src="/images/brands/evenly/hero-photo.webp"
          alt="Friends sharing a meal and splitting bills with Evenly"
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(19,13,28,0.62) 0%, rgba(19,13,28,0.44) 50%, rgba(19,13,28,0.72) 100%)",
          }}
        />

        <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-white/65">
          <span>01 · Brand Identity System</span>
          <span>Peer-to-Peer Finance</span>
        </div>

        <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
          <EvenlyFullLockup
            markColor={VIOLET}
            textColor="#FFFFFF"
            className="w-[260px] sm:w-[340px] h-auto drop-shadow-[0_6px_28px_rgba(19,13,28,0.75)]"
          />
        </div>

        <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[12px] text-white/75">
          <span>Modular Block-E Logotype</span>
          <span style={{ color: VIOLET }}>Splits · Transfers · Wallets</span>
        </div>
      </div>

      {/* Right 6 cols: Split Violet Summary Plate */}
      <div
        className="lg:col-span-6 min-h-[340px] lg:min-h-[480px] p-8 sm:p-12 flex flex-col justify-between"
        style={{ background: VIOLET, color: OBSIDIAN }}
      >
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-black/55">
          <span>Primary Brand Field</span>
          <span>#C97DFF</span>
        </div>

        <div className="my-auto py-8 flex flex-col items-center justify-center gap-6 text-center">
          <EvenlyMarkVector
            fill={OBSIDIAN}
            className="w-[100px] sm:w-[116px] h-auto"
          />
          <EvenlyFullLockup
            markColor={OBSIDIAN}
            textColor={OBSIDIAN}
            className="w-[210px] sm:w-[250px] h-auto"
          />
          <p className="text-[13px] sm:text-[14px] text-black/80 max-w-[340px] leading-[1.55]">
            A social finance brand built for friends splitting dinners, shared trips, and rent, with direct money transfers and clean balance tracking.
          </p>
        </div>

        <div className="pt-4 border-t border-black/15 flex items-center justify-between text-[12px] text-black/75">
          <span>Consumer Fintech Identity</span>
          <span className="font-semibold">App · Card · Web</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Extended Brand Case Study Plates for Evenly:
 * - Plate 02: Stepped-Ledger Mark Construction & Responsive Lockup Hierarchy
 * - Plate 03: Three-Up Obsidian / Split Violet / Lilac Cloud Colorway Proof
 * - Plate 04: 4-Color System Pillars & Geometric Tabular Typography Specimen
 * - Plate 05: Live Group Split & Transfer Ledger UI + Virtual Split Card & App Icon
 */
export function EvenlyBrandGuidelinesBoard() {
  return (
    <section className="wrap mb-12 sm:mb-16 space-y-6 sm:space-y-8">
      {/* ─── PLATE 02: CONSTRUCTION GRID & LOCKUP HIERARCHY ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Block-Ledger Construction Diagram */}
        <div
          className="lg:col-span-7 rounded-[20px] p-6 sm:p-9 relative overflow-hidden flex flex-col justify-between min-h-[340px]"
          style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}
        >
          <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            <span>02 · Mark Construction</span>
            <span>54u Modular Block Bars</span>
          </div>

          <div className="relative my-6 flex items-center justify-center py-6">
            <svg
              viewBox="-40 -32 254 266"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[270px] h-auto"
              role="img"
              aria-label="Evenly stepped E construction proportions"
            >
              {/* Subtle drafting grid */}
              {Array.from({ length: 13 }).map((_, i) => (
                <line
                  key={`vx-${i}`}
                  x1={i * 18 - 22}
                  y1="-28"
                  x2={i * 18 - 22}
                  y2="230"
                  stroke="rgba(19,13,28,0.06)"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <line
                  key={`hz-${i}`}
                  x1="-36"
                  y1={i * 18 - 10}
                  x2="210"
                  y2={i * 18 - 10}
                  stroke="rgba(19,13,28,0.06)"
                  strokeWidth="1"
                />
              ))}

              {/* Outer bounding guides */}
              <rect
                x="0"
                y="0"
                width="174"
                height="202"
                stroke="#9B4CE0"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              {/* 27px channel dividers */}
              <line
                x1="0"
                y1="54"
                x2="188"
                y2="54"
                stroke="#C97DFF"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="146"
                x2="188"
                y2="146"
                stroke="#C97DFF"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1="54"
                y1="-14"
                x2="54"
                y2="216"
                stroke="#9B4CE0"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Exact flattened stepped-E paths from Vector.svg */}
              <path d="M0 54H54V146H0V54Z" fill={VIOLET} />
              <path d="M54 54V0L135 0V54H54Z" fill={OBSIDIAN} fillOpacity="0.92" />
              <path
                d="M119.015 13.0808L173.353 12.865L173.624 80.9576L119.286 81.1735L119.015 13.0808Z"
                fill={VIOLET}
              />
              <path d="M54 135V81H147V135H54Z" fill={OBSIDIAN} fillOpacity="0.92" />
              <path d="M0 202V146H135V202H0Z" fill={VIOLET} />

              {/* Dimension labels */}
              <text
                x="180"
                y="30"
                fontSize="8.5"
                fontFamily="sans-serif"
                fontWeight="600"
                fill="#51565c"
              >
                54u Bar
              </text>
              <text
                x="180"
                y="112"
                fontSize="8.5"
                fontFamily="sans-serif"
                fontWeight="600"
                fill="#51565c"
              >
                54u Mid
              </text>
              <text
                x="24"
                y="218"
                fontSize="8.5"
                fontFamily="sans-serif"
                fontWeight="600"
                fill="#51565c"
                textAnchor="middle"
              >
                54u
              </text>
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[12px] text-[#51565c]">
            <span>Stacked bars evoke equal bill splits &amp; ledger rows</span>
            <span className="font-medium text-[#130D1C]">174 × 202 Unit Grid</span>
          </div>
        </div>

        {/* Right: Lockup & Micro-Scale Hierarchy */}
        <div
          className="lg:col-span-5 rounded-[20px] p-6 sm:p-9 flex flex-col justify-between min-h-[340px]"
          style={{ background: CLOUD, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            <span>Scale &amp; Application</span>
            <span>Clearspace Rules</span>
          </div>

          <div className="my-auto py-6 space-y-5">
            {/* Row 1: Primary Horizontal Lockup */}
            <div
              className="rounded-[14px] px-5 py-4 flex items-center justify-between"
              style={{ background: OBSIDIAN }}
            >
              <EvenlyFullLockup
                markColor={VIOLET}
                textColor="#FFFFFF"
                className="w-[155px] h-auto"
              />
              <span className="text-[11px] font-medium text-white/55">Primary</span>
            </div>

            {/* Row 2: Mobile App Tile */}
            <div
              className="rounded-[14px] bg-white px-5 py-4 flex items-center justify-between"
              style={{ border: `1px solid ${LINE}` }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-[12px] flex items-center justify-center p-2.5"
                  style={{ background: OBSIDIAN }}
                >
                  <EvenlyMarkVector fill={VIOLET} className="w-full h-auto" />
                </div>
                <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#130D1C]">
                  iOS &amp; Android Launcher
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#51565c]">App Icon</span>
            </div>

            {/* Row 3: Compact Badge */}
            <div className="flex items-center justify-between px-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 border border-black/[0.08]">
                <EvenlyMarkVector fill={VIOLET} className="w-[16px] h-auto" />
                <span className="text-[12px] font-semibold text-[#130D1C]">
                  Split with Evenly
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#51565c]">Payment Pill</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px] text-[#51565c]">
            <span>Solid fills stay legible down to 16px</span>
            <span className="font-medium text-[#130D1C]">App Icons &amp; Badges</span>
          </div>
        </div>
      </div>

      {/* ─── PLATE 03: THREE-UP COLORWAY PROOF ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Swatch 1: Signature Obsidian */}
        <div
          className="rounded-[20px] min-h-[240px] sm:min-h-[270px] p-8 flex flex-col justify-between"
          style={{ background: OBSIDIAN, color: "#FFFFFF" }}
        >
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">
            Primary · Obsidian
          </span>
          <div className="my-auto flex flex-col items-center justify-center py-4">
            <EvenlyFullLockup
              markColor={VIOLET}
              textColor="#FFFFFF"
              className="w-[205px] h-auto"
            />
          </div>
          <span className="text-[12px] text-white/65">Dark Wallet &amp; Header</span>
        </div>

        {/* Swatch 2: Split Violet Surface */}
        <div
          className="rounded-[20px] min-h-[240px] sm:min-h-[270px] p-8 flex flex-col justify-between"
          style={{ background: VIOLET, color: OBSIDIAN }}
        >
          <span className="text-[11px] uppercase tracking-[0.12em] text-black/60">
            Signature · Split Violet
          </span>
          <div className="my-auto flex flex-col items-center justify-center py-4">
            <EvenlyFullLockup
              markColor={OBSIDIAN}
              textColor={OBSIDIAN}
              className="w-[205px] h-auto"
            />
          </div>
          <span className="text-[12px] text-black/80">Split Pill &amp; Transfer CTA</span>
        </div>

        {/* Swatch 3: Lilac Cloud Light Mode */}
        <div
          className="rounded-[20px] min-h-[240px] sm:min-h-[270px] p-8 flex flex-col justify-between"
          style={{ background: CLOUD, border: `1px solid ${LINE}`, color: OBSIDIAN }}
        >
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#51565c]">
            Ledger · Lilac Cloud
          </span>
          <div className="my-auto flex flex-col items-center justify-center py-4">
            <EvenlyFullLockup
              markColor={VIOLET}
              textColor={OBSIDIAN}
              className="w-[205px] h-auto"
            />
          </div>
          <span className="text-[12px] text-[#51565c]">Receipts &amp; Statements</span>
        </div>
      </div>

      {/* ─── PLATE 04: COLOR ARCHITECTURE PILLARS & TABULAR TYPOGRAPHY ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {PALETTE.map((swatch) => (
            <div
              key={swatch.hex}
              className="rounded-[20px] p-5 min-h-[250px] sm:min-h-[300px] flex flex-col justify-between"
              style={{
                background: swatch.hex,
                color: swatch.darkText ? OBSIDIAN : "#FFFFFF",
                border:
                  swatch.hex === "#F6F1FC" ? `1px solid ${LINE}` : "none",
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

        <div
          className="lg:col-span-5 rounded-[20px] p-7 sm:p-9 flex flex-col justify-between gap-6"
          style={{ background: CLOUD, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            <span>04 · Typography</span>
            <span>Heavy Geometric + Tabular UI</span>
          </div>

          <div className="my-auto">
            <div
              className="text-[54px] sm:text-[66px] font-bold tracking-[-0.04em] leading-none mb-4 tabular-nums"
              style={{ color: OBSIDIAN }}
            >
              Aa 4.00
            </div>
            <div className="text-[18px] sm:text-[20px] font-medium tracking-[-0.02em] text-[#130D1C] mb-2">
              Split even. Transfer right away.
            </div>
            <p className="text-[13px] leading-[1.6] text-[#51565c]">
              Tight display weights pair with tabular currency columns so group totals, per-person shares, and wallet settlements stay aligned.
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between text-[12px] text-[#51565c]">
            <span>Built for clear ledgers &amp; fast scans</span>
            <span className="font-medium text-[#130D1C]">iOS · Android · Web</span>
          </div>
        </div>
      </div>

      {/* ─── PLATE 05: GROUP SPLIT LEDGER UI & VIRTUAL SPLIT CARD ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Friend Group Split & Instant Transfer Flow UI */}
        <div
          className="lg:col-span-7 rounded-[22px] p-6 sm:p-9 bg-[#FFFFFF] flex flex-col justify-between min-h-[400px]"
          style={{ border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            <span>05 · Group Split &amp; Transfer UI</span>
            <span>Product Screen</span>
          </div>

          <div
            className="my-auto rounded-[18px] p-5 sm:p-6"
            style={{ background: CLOUD, border: `1px solid ${LINE}` }}
          >
            {/* Active Group Trip Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/[0.08]">
              <div>
                <div className="text-[11px] uppercase tracking-[0.08em] text-[#51565c]">
                  Active Group · 4 Friends
                </div>
                <div className="text-[18px] font-semibold tracking-[-0.02em] text-[#130D1C] mt-0.5">
                  Weekend Dinner &amp; Ride Split
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-[#51565c]">Your Share (Paid)</div>
                <div className="text-[18px] font-bold tracking-[-0.02em] text-[#130D1C] tabular-nums">
                  Rs. 3,450 / person
                </div>
              </div>
            </div>

            {/* Friend Settlement Rows */}
            <div className="py-4 space-y-2.5">
              {[
                {
                  initials: "AR",
                  name: "Ayesha Raza",
                  status: "Owes you Rs. 3,450",
                  action: "Remind",
                  highlight: false,
                },
                {
                  initials: "ZH",
                  name: "Zain Hassan",
                  status: "Owes you Rs. 3,450",
                  action: "Transfer Request",
                  highlight: true,
                },
                {
                  initials: "MK",
                  name: "Mariam Khan",
                  status: "Settled via Evenly Wallet",
                  action: "Paid",
                  highlight: false,
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="rounded-[12px] bg-white px-4 py-3 flex items-center justify-between gap-3"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                      style={{
                        background: member.highlight ? VIOLET : OBSIDIAN,
                        color: member.highlight ? OBSIDIAN : "#FFFFFF",
                      }}
                    >
                      {member.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#130D1C] truncate">
                        {member.name}
                      </div>
                      <div className="text-[11.5px] text-[#51565c] truncate">
                        {member.status}
                      </div>
                    </div>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-semibold flex-shrink-0"
                    style={{
                      background: member.highlight ? VIOLET : "#EFEAF6",
                      color: OBSIDIAN,
                    }}
                  >
                    {member.action}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Action Bar */}
            <div className="pt-3 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-3">
              <span className="text-[12px] text-[#51565c]">
                Total Group Spend: <strong className="text-[#130D1C] tabular-nums">Rs. 13,800</strong>
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold"
                style={{ background: OBSIDIAN, color: VIOLET }}
              >
                Send Instant Transfer →
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px] text-[#51565c]">
            <span>Real-time friend balances, reminders &amp; wallet transfers</span>
            <span className="font-medium text-[#130D1C]">Ledger Flow</span>
          </div>
        </div>

        {/* Right: Evenly Virtual Debit Card + Shared Pool Card */}
        <div
          className="lg:col-span-5 rounded-[22px] p-6 sm:p-9 flex flex-col justify-between min-h-[400px]"
          style={{ background: CLOUD, border: `1px solid ${LINE}` }}
        >
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#51565c]">
            <span>06 · Virtual Card &amp; App Tile</span>
            <span>Wallet System</span>
          </div>

          <div className="my-auto py-4 space-y-4">
            {/* Virtual Card Mockup */}
            <div
              className="rounded-[18px] p-6 text-white relative overflow-hidden min-h-[200px] flex flex-col justify-between"
              style={{ background: OBSIDIAN }}
            >
              <div className="flex items-center justify-between">
                <EvenlyFullLockup
                  markColor={VIOLET}
                  textColor="#FFFFFF"
                  className="w-[115px] h-auto"
                />
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ background: AUBERGINE, color: VIOLET }}
                >
                  Shared Card
                </span>
              </div>

              <div className="my-4">
                <div className="text-[11px] text-white/50">Shared Pool Balance</div>
                <div className="text-[24px] font-semibold tracking-[-0.02em] tabular-nums mt-0.5">
                  Rs. 42,600.00
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-white/65 tabular-nums">
                <span>•••• 4819</span>
                <span>4 Active Contributors</span>
              </div>
            </div>

            {/* Bottom Split Summary Pill */}
            <div
              className="rounded-[14px] p-4 flex items-center justify-between gap-3"
              style={{ background: VIOLET, color: OBSIDIAN }}
            >
              <div>
                <div className="text-[10px] uppercase tracking-[0.08em] text-black/60 font-medium">
                  Auto-Split Rule
                </div>
                <div className="text-[13px] font-semibold mt-0.5">
                  Equal 25% share per card tap
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center p-2 flex-shrink-0"
                style={{ background: OBSIDIAN }}
              >
                <EvenlyMarkVector fill={VIOLET} className="w-full h-auto" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[12px] text-[#51565c]">
            <span>Instant shared pool &amp; friend-to-friend payouts</span>
            <span className="font-medium text-[#130D1C]">Card &amp; Wallet</span>
          </div>
        </div>
      </div>
    </section>
  );
}
