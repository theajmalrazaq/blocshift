import React from "react";
import { Images, ChartNoAxesCombined, Bot } from "lucide-react";
import { StageData } from "@/data/portfolioData";

interface StageCardProps {
  stage: StageData;
}

export default function StageCard({ stage }: StageCardProps) {
  const getIcon = () => {
    switch (stage.iconName) {
      case "images":
        return <Images className="w-5 h-5 text-[#d2fb95]" />;
      case "chart":
        return <ChartNoAxesCombined className="w-5 h-5 text-[#d2fb95]" />;
      case "bot":
        return <Bot className="w-5 h-5 text-[#d2fb95]" />;
    }
  };

  return (
    <div className="min-h-[400px] bg-[var(--dark)] text-[var(--dark-ink)] rounded-[26px] overflow-hidden relative grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] shadow-xl border border-white/5">
      {/* Stage Copy */}
      <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-between gap-8 md:gap-12">
        <div className="flex items-center gap-2.5 text-sm font-semibold tracking-wide">
          {getIcon()}
          <span>{stage.kicker}</span>
        </div>

        <div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold leading-[1.04] tracking-[-0.045em] mb-4 text-white">
            {stage.title}
          </h3>
          <p className="max-w-[580px] m-0 text-white/75 text-base sm:text-[17px] leading-[1.6]">
            {stage.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {stage.deliverables.map((item) => (
            <span
              key={item}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 text-white/90 bg-white/5"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Visual Glyph Stage */}
      <div
        className="relative min-h-[280px] lg:min-h-[400px] bg-[#c9f2ef] overflow-hidden grid place-items-center"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#d2fb95]/60" />
        <div className="glyph">
          <div className="transition-transform duration-300 hover:scale-105" />
          <div className="transition-transform duration-300 hover:scale-105" />
          <div className="transition-transform duration-300 hover:scale-105" />
          <div className="transition-transform duration-300 hover:scale-105" />
        </div>
      </div>
    </div>
  );
}
