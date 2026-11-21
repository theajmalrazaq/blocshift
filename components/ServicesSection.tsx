import React from "react";
import { PenTool, Code2, Workflow, CheckCircle } from "lucide-react";
import { SERVICES } from "@/data/portfolioData";

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "pen-tool":
        return (
          <PenTool className="w-6 h-6 stroke-[1.8] text-[var(--ink)] mt-1 flex-shrink-0" />
        );
      case "code-2":
        return (
          <Code2 className="w-6 h-6 stroke-[1.8] text-[var(--ink)] mt-1 flex-shrink-0" />
        );
      case "workflow":
        return (
          <Workflow className="w-6 h-6 stroke-[1.8] text-[var(--ink)] mt-1 flex-shrink-0" />
        );
      default:
        return (
          <CheckCircle className="w-6 h-6 stroke-[1.8] text-[var(--ink)] mt-1 flex-shrink-0" />
        );
    }
  };

  return (
    <section
      className="py-16 sm:py-24 border-t border-[var(--line)]"
      id="services"
    >
      <div className="wrap grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <div className="reveal-on-scroll">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.045em] text-[var(--ink)] m-0">
            One studio from idea to shipped product.
          </h2>
          <p className="mt-5 text-[var(--muted)] text-base sm:text-lg max-w-[420px] leading-relaxed">
            Eliminate handoff friction. We combine strategy, pixel-perfect visual
            craft, and battle-tested code under one unified workflow.
          </p>
        </div>

        <div className="border-t border-[var(--line)]">
          {SERVICES.map((service, idx) => {
            const delayClasses = [
              "reveal-on-scroll",
              "reveal-on-scroll reveal-delay-100",
              "reveal-on-scroll reveal-delay-200",
              "reveal-on-scroll reveal-delay-300",
            ];
            const delayClass = delayClasses[idx % delayClasses.length];

            return (
              <article
                key={service.id}
                className={`grid grid-cols-[38px_1fr] sm:grid-cols-[44px_1fr] gap-4 sm:gap-5 py-6 sm:py-7 border-b border-[var(--line)] group hover:bg-[var(--surface)]/40 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-2xl transition-colors ${delayClass}`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] flex items-center justify-center group-hover:bg-[var(--lime)] group-hover:text-[var(--lime-ink)] transition-colors">
                  {getIcon(service.iconName)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold m-0 mb-1.5 text-[var(--ink)]">
                    {service.title}
                  </h3>
                  <p className="m-0 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
