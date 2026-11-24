"use client";

import React, { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

interface FaqSectionProps {
  onOpenContact?: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How quickly can we kick off and see working progress?",
    answer:
      "We typically start within 5–7 business days of scope alignment. You get your first interactive designs or live staging deployment within Week 1, followed by weekly Friday releases so you can test real builds as we go.",
  },
  {
    question: "Who actually designs and builds our product?",
    answer:
      "The same senior design and engineering leads you meet on the intro call. We don't hand projects off to junior teams or outsource layers—everyone touching your Figma files and repository is a senior builder.",
  },
  {
    question: "How do pricing and engagement timelines work?",
    answer:
      "Focused sprints (landing pages, design systems, or AI workflows) are fixed-scope and run 2–4 weeks. Full 0→1 platforms run 4–8 weeks with milestone billing, and embedded product pods operate on a flexible monthly retainer you can pause anytime.",
  },
  {
    question: "Do we own 100% of the code, designs, and IP?",
    answer:
      "Yes—always. Upon delivery, you own 100% of the Git repository, Figma design system, prompts, automation workflows, and infrastructure configs with zero proprietary lock-in.",
  },
  {
    question: "Can you integrate with our existing engineering team or stack?",
    answer:
      "Absolutely. We regularly ship inside existing Next.js, React, TypeScript, Python, and Node repositories via standard pull requests, CI/CD checks, and your team's Slack or Linear workspace.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Every build includes a post-launch stabilization window for polish, analytics verification, and team handoff documentation. Many clients also stay on a lightweight monthly pod for ongoing features, CRO experiments, and new automations.",
  },
];

export default function FaqSection({ onOpenContact }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 md:py-32 bg-white border-t border-black/[0.06]"
    >
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 reveal-on-scroll">
            <span className="inline-block text-[11px] uppercase tracking-[0.08em] text-black/45 mb-3">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-medium leading-[1.08] tracking-[-0.035em] text-[#202124] m-0">
              Questions, answered.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-[1.65] text-black/60 font-normal max-w-[420px] m-0">
              Everything founders usually ask before we kick off a sprint or
              product build — answered directly.
            </p>

            <button
              type="button"
              onClick={onOpenContact}
              className="group mt-7 inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-[14px] bg-black hover:bg-neutral-900 text-white font-semibold text-[14px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
            >
              <span>Ask Us Directly</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 divide-y divide-black/[0.08] border-t border-b border-black/[0.08] reveal-on-scroll">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={item.question} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-black rounded-[6px]"
                  >
                    <span className="text-base sm:text-[17px] font-medium tracking-[-0.02em] text-black group-hover:text-black/75 transition-colors">
                      {item.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full bg-black/[0.04] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-45 bg-black text-white" : "text-black/70"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2]" />
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-[14px] leading-[1.7] text-black/65 font-normal m-0 pr-8">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
