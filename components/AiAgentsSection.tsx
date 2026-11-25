"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

interface AiAgentsSectionProps {
  onOpenContact?: () => void;
}

interface AgentScenario {
  id: string;
  tab: string;
  prompt: string;
  reply: string;
  actionLabel: string;
  approvedLabel: string;
  headline: string;
  subcopy: string;
  draftPreview: {
    target: string;
    detail: string;
    channel: string;
  }[];
}

const AGENT_SCENARIOS: AgentScenario[] = [
  {
    id: "leads",
    tab: "Lead Follow-Up",
    prompt: "Follow up everyone from Thursday's product demo",
    reply: "On it!",
    actionLabel: "Approve & send 3 drafts",
    approvedLabel: "Sent · 3/3 followed up",
    headline: "Every demo request followed up.",
    subcopy: "Written in your voice for each prospect. Nothing sends until you approve.",
    draftPreview: [
      { target: "Maya Lin · Veloce", detail: "Pricing tier + sandbox invite", channel: "Email" },
      { target: "David Park · Kestrel", detail: "SOC2 spec & rollout plan", channel: "Email" },
      { target: "Nadia Patel · Finrail", detail: "API webhook docs + call link", channel: "Slack" },
    ],
  },
  {
    id: "support",
    tab: "Support Triage",
    prompt: "Categorize overnight tickets and escalate billing bugs",
    reply: "On it!",
    actionLabel: "Approve & route 4 tickets",
    approvedLabel: "Routed · 4/4 triaged",
    headline: "Zero overnight backlog.",
    subcopy: "Tickets get tagged, routed to the right owner, and drafted before standup.",
    draftPreview: [
      { target: "#1402 · Invoice PDF timeout", detail: "Escalated to Billing owner", channel: "Linear" },
      { target: "#1405 · SSO callback mismatch", detail: "Drafted fix guide + patch link", channel: "Intercom" },
      { target: "#1409 · Seat upgrade inquiry", detail: "Prepared pro-rata quote", channel: "Email" },
    ],
  },
  {
    id: "ops",
    tab: "CRM & Ops Sync",
    prompt: "Enrich new signups and update our pipeline sheet",
    reply: "On it!",
    actionLabel: "Approve & sync 12 records",
    approvedLabel: "Synced · 12/12 updated",
    headline: "Every tool stays in sync.",
    subcopy: "New signups get enriched and logged in your CRM without manual spreadsheets.",
    draftPreview: [
      { target: "12 new workspace signups", detail: "Company size & stack enriched", channel: "HubSpot" },
      { target: "4 enterprise matches", detail: "Flagged to #revenue-alerts", channel: "Slack" },
      { target: "Weekly pipeline digest", detail: "Logged to Postgres warehouse", channel: "DB Sync" },
    ],
  },
];

const WAVE_BARS = [
  { h: 6, duration: "1.45s", delay: "-0.1s" },
  { h: 12, duration: "1.2s", delay: "-0.45s" },
  { h: 8, duration: "1.55s", delay: "-0.8s" },
  { h: 18, duration: "1.15s", delay: "-0.25s" },
  { h: 10, duration: "1.4s", delay: "-0.65s" },
  { h: 24, duration: "1.1s", delay: "-0.15s" },
  { h: 16, duration: "1.35s", delay: "-0.9s" },
  { h: 30, duration: "1.05s", delay: "-0.35s" },
  { h: 20, duration: "1.25s", delay: "-0.75s" },
  { h: 14, duration: "1.5s", delay: "-0.2s" },
  { h: 22, duration: "1.18s", delay: "-0.55s" },
  { h: 10, duration: "1.42s", delay: "-0.85s" },
  { h: 14, duration: "1.28s", delay: "-0.4s" },
  { h: 7, duration: "1.5s", delay: "-0.7s" },
];

export default function AiAgentsSection({ onOpenContact }: AiAgentsSectionProps) {
  const [activeId, setActiveId] = useState<string>(AGENT_SCENARIOS[0].id);
  const [approvedIds, setApprovedIds] = useState<Record<string, boolean>>({});
  const [showDrafts, setShowDrafts] = useState(false);

  const scenario =
    AGENT_SCENARIOS.find((item) => item.id === activeId) || AGENT_SCENARIOS[0];
  const isApproved = Boolean(approvedIds[scenario.id]);

  const handleSelectScenario = (id: string) => {
    setActiveId(id);
    setShowDrafts(false);
  };

  const handleToggleApprove = () => {
    setApprovedIds((prev) => ({
      ...prev,
      [scenario.id]: !prev[scenario.id],
    }));
  };

  return (
    <section
      id="ai-agents"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06]"
    >
      <div className="wrap">
        {/* Top Reference-Style Split-Contrast Headline */}
        <div data-aos="fade-up" className="max-w-[760px] mx-auto text-center mb-10 sm:mb-12">
          <span className="inline-block text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
            01 · AI Agents &amp; Workflow Automation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[48px] font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
            You run the business.
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-[17px] leading-[1.6] text-black/55 font-normal max-w-[560px] mx-auto m-0">
            Brief it like a new hire, and it handles the rest.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div data-aos="fade-up" data-aos-delay="80" className="flex justify-center mb-10 sm:mb-12">
          <div
            className="inline-flex items-center max-w-full overflow-x-auto gap-0.5 sm:gap-1 rounded-full p-1 bg-[#f2f2f0] border border-black/[0.06]"
            role="tablist"
            aria-label="AI Agent workflows"
          >
            {AGENT_SCENARIOS.map((item) => {
              const active = item.id === scenario.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectScenario(item.id)}
                  className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? "bg-[#202124] text-white"
                      : "text-[#51565c] hover:text-[#202124]"
                  }`}
                >
                  {item.tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Centered Prompt -> Agent Exchange Stage */}
        <div data-aos="fade-up" data-aos-delay="140" className="max-w-[540px] mx-auto flex flex-col items-center">
          {/* Animated Signal Waveform */}
          <div
            className="flex items-center justify-center gap-[5px] h-9 mb-6"
            aria-hidden="true"
          >
            {WAVE_BARS.map((bar, idx) => (
              <span
                key={idx}
                className="w-[3px] rounded-full animate-agent-wave"
                style={
                  {
                    height: `${bar.h}px`,
                    background:
                      idx >= 5 && idx <= 8
                        ? "#202124"
                        : "rgba(32, 33, 36, 0.24)",
                    "--wave-duration": bar.duration,
                    "--wave-delay": bar.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Conversation Exchange (Clean Flat Bubbles — Zero Shadows/Slop) */}
          <div className="w-full flex flex-col gap-3 mb-7">
            {/* User Brief Bubble (Right-aligned, Sky Blue) */}
            <div className="flex justify-end">
              <div
                className="max-w-[88%] sm:max-w-[78%] rounded-[18px] rounded-br-[6px] px-4 py-3 text-[14px] sm:text-[15px] leading-[1.45] font-normal text-white"
                style={{ background: "#62abe0" }}
              >
                {scenario.prompt}
              </div>
            </div>

            {/* Agent Reply + Interactive Approval Row (Left-aligned) */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className="rounded-[18px] rounded-bl-[6px] px-4 py-2.5 text-[14px] sm:text-[15px] font-medium text-[#202124] border border-black/[0.07]"
                style={{ background: "#f2f2f0" }}
              >
                {scenario.reply}
              </div>

              <button
                type="button"
                onClick={handleToggleApprove}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium transition-colors cursor-pointer border"
                style={{
                  background: isApproved ? "#202124" : "#d2fb95",
                  color: isApproved ? "#ffffff" : "#202124",
                  borderColor: isApproved
                    ? "#202124"
                    : "rgba(32, 33, 36, 0.12)",
                }}
              >
                <Check className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>
                  {isApproved ? scenario.approvedLabel : scenario.actionLabel}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowDrafts((prev) => !prev)}
                className="px-3 py-2 rounded-full text-[12px] font-medium text-[#51565c] hover:text-[#202124] bg-white border border-black/[0.09] transition-colors cursor-pointer"
              >
                {showDrafts ? "Hide queue" : "Inspect queue"}
              </button>
            </div>

            {/* Optional Expandable Flat Queue Preview */}
            {showDrafts && (
              <div className="mt-1 rounded-[16px] bg-[#f2f2f0] border border-black/[0.07] p-3 flex flex-col gap-2">
                {scenario.draftPreview.map((row) => (
                  <div
                    key={row.target}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white border border-black/[0.07] px-3.5 py-2.5"
                  >
                    <div className="min-w-0">
                      <div className="text-[12px] font-medium text-[#202124] truncate">
                        {row.target}
                      </div>
                      <div className="text-[11px] text-[#51565c] truncate">
                        {row.detail}
                      </div>
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium flex-shrink-0"
                      style={{
                        background: isApproved ? "#d2fb95" : "#eaf4fc",
                        color: "#202124",
                      }}
                    >
                      {isApproved ? "Sent" : row.channel}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reference-Style Outcome Payoff Copy */}
          <div className="text-center max-w-[440px]">
            <h3 className="text-lg sm:text-[21px] font-medium tracking-[-0.02em] text-[#202124] m-0 mb-2">
              {scenario.headline}
            </h3>
            <p className="text-xs sm:text-[14px] leading-[1.6] text-black/55 font-normal m-0">
              {scenario.subcopy}
            </p>

            <button
              type="button"
              onClick={onOpenContact}
              className="group mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#202124] hover:text-black/70 transition-colors cursor-pointer"
            >
              <span>Build your AI agent</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
