import { SHOWCASE_PROJECTS, type ShowcaseProject } from "@/data/projects";

export type PortfolioCategoryId =
  | "brand-design"
  | "social-media-post"
  | "klaviyo-emails"
  | "ui-ux"
  | "web"
  | "ai-agents"
  | "experiments";

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
  shortDescription: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "brand-design",
    label: "Brand Design",
    shortDescription: "Visual identities, typography systems, and art direction.",
  },
  {
    id: "social-media-post",
    label: "Social Media Post",
    shortDescription: "Scroll-stopping campaign creatives and feed assets.",
  },
  {
    id: "klaviyo-emails",
    label: "Klaviyo & Email Marketing",
    shortDescription: "Automated Klaviyo lifecycle flows and high-converting email campaigns.",
  },
  {
    id: "ui-ux",
    label: "UI/UX",
    shortDescription: "Product interfaces, design systems, and flagship UX work.",
  },
  {
    id: "web",
    label: "Web",
    shortDescription: "Production web apps, SaaS platforms, and conversion sites.",
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    shortDescription: "Workflow automation, triage agents, and CRM pipelines.",
  },
  {
    id: "experiments",
    label: "Experiments",
    shortDescription: "Interactive UI studies, motion probes, and micro-tools.",
  },
];

export type PortfolioComponentVisualId =
  | "brand-meal-circle"
  | "brand-evenly"
  | "ai-lead-followup"
  | "ai-support-triage"
  | "ai-pipeline-telemetry"
  | "exp-token-playground"
  | "exp-process-rail"
  | "exp-ascii-canvas";

export type PortfolioVisualSpec =
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      kind: "component";
      visualId: PortfolioComponentVisualId;
    };

export interface PortfolioItem {
  slug: string;
  number: string;
  title: string;
  categoryId: PortfolioCategoryId;
  categoryLabel: string;
  discipline: string;
  summary: string;
  about: string;
  problem: string;
  whatWeDid: string;
  highlights: string[];
  deliverables: string[];
  serviceMatch: string;
  domain: string;
  timeline: string;
  visual: PortfolioVisualSpec;
}

const UI_UX_CATEGORY_LABEL = "UI/UX";

function inferUiUxAbout(proj: ShowcaseProject): string {
  return `${proj.title} is a ${proj.category.toLowerCase()} interface for ${proj.domain}. We reorganized the layout and page hierarchy so visitors grasp what the product offers and reach the main call to action quickly.`;
}

function inferUiUxHighlights(proj: ShowcaseProject): string[] {
  return [
    `Reviewed the existing flow on ${proj.domain} to cut extra clicks and clarify copy`,
    `Redesigned the ${proj.category.toLowerCase()} interface across desktop and mobile sizes`,
    `Set clear heading hierarchy, contrast ratios, and primary button states`,
    `Handed off responsive Figma frames and spacing tokens for build`,
  ];
}

function mapShowcaseToUiUx(proj: ShowcaseProject): PortfolioItem {
  return {
    slug: proj.id,
    number: proj.number,
    title: proj.title,
    categoryId: "ui-ux",
    categoryLabel: UI_UX_CATEGORY_LABEL,
    discipline: proj.category,
    summary: proj.solution,
    about: inferUiUxAbout(proj),
    problem: proj.problem,
    whatWeDid: `${proj.solution} We simplified the flow from first screen to primary button, tuned type scale and surface contrast, and checked every layout across mobile and desktop viewports.`,
    highlights: inferUiUxHighlights(proj),
    deliverables: ["UI/UX Direction", "Responsive Screens", "Design System", "Copy & Hierarchy"],
    serviceMatch: "Product Design & Design Systems",
    domain: proj.domain,
    timeline: "2–4 weeks",
    visual: {
      kind: "image",
      src: proj.image,
      alt: `${proj.title} UI/UX project preview`,
      width: proj.width,
      height: proj.height,
    },
  };
}

const CURATED_NON_UIUX_ITEMS: PortfolioItem[] = [
  /* ─── BRAND DESIGN ─── */
  {
    slug: "meal-circle-brand-identity",
    number: "B1",
    title: "MealCircle: Clinical Nutrition & Dietitian Platform Identity",
    categoryId: "brand-design",
    categoryLabel: "Brand Design",
    discipline: "SaaS Brand Identity, Logo & Product Direction",
    summary:
      "Brand identity for MealCircle (mealcircle.co), a clinical nutrition platform helping dietitians spot which patients need support each morning.",
    about:
      "MealCircle (mealcircle.co) gives nutrition clinics, solo dietitians, and coaching programs one morning briefing. It reads patients' meal logs and check-ins, lists who slipped with a one-sentence reason, and suggests what to send next, paired with a free two-tap patient logging app.",
    problem:
      "Clinical software often feels cold for patients, while consumer diet apps feel too casual for practicing clinicians. MealCircle needed a visual identity friendly enough for daily patient check-ins and credible for clinic owners.",
    whatWeDid:
      "We built the visual system around the smiling-bowl monogram and rounded lowercase 'meal circle' logotype, grounded in Deep Pine (#102116), Sprout Lime (#98CD4E), Charcoal Ink (#333131), and Soft Oat (#F5F8EE). Alongside optical grid geometry and colorway lockups, we extended the look into dark produce imagery tiles, the daily coach briefing interface, and the patient app.",
    highlights: [
      "Designed the smiling-bowl 'm' monogram, standalone app emblem, and lowercase horizontal wordmark",
      "Defined the Deep Pine (#102116), Sprout Lime (#98CD4E), Charcoal Ink (#333131), and Soft Oat (#F5F8EE) palette",
      "Paired moody fresh-produce imagery tiles with bright lime accents across icons and brand headers",
      "Applied the system across the web coach briefing dashboard ('Who needs you today') and patient logging app",
    ],
    deliverables: [
      "Brand Identity",
      "Logo & Monogram",
      "Color & Type System",
      "Coach Dashboard UI",
      "Patient App Icon",
    ],
    serviceMatch: "Product Design & Design Systems",
    domain: "mealcircle.co",
    timeline: "3 weeks",
    visual: {
      kind: "component",
      visualId: "brand-meal-circle",
    },
  },
  {
    slug: "evenly-brand-identity",
    number: "B2",
    title: "Evenly: Peer-to-Peer Money Split & Finance App Identity",
    categoryId: "brand-design",
    categoryLabel: "Brand Design",
    discipline: "Fintech Brand Identity, Logotype & App Direction",
    summary:
      "Brand system for Evenly, a social finance app where friends split shared expenses, send instant transfers, and keep balances straight.",
    about:
      "Evenly helps groups of friends split dinner checks, trip costs, and shared household bills, transfer money back right away, and see every person's running balance in one place.",
    problem:
      "Group expense trackers often feel like dry spreadsheets, while payment apps lack group memory, leaving people to chase screenshots across chat threads to figure out who paid what.",
    whatWeDid:
      "We paired Evenly's modular stepped-block 'E' monogram with the heavy geometric 'venly' wordmark, built on Split Violet (#C97DFF), Obsidian Plum (#130D1C), Indigo Slate (#261C38), and Lilac Cloud (#F6F1FC). We extended the system across construction guidelines, mobile app icons, friend settlement screens, and a shared virtual split card.",
    highlights: [
      "Framed the modular 54-unit stepped 'E' monogram alongside the custom geometric Evenly horizontal wordmark",
      "Built the Split Violet (#C97DFF), Obsidian Plum (#130D1C), Indigo Slate (#261C38), and Lilac Cloud (#F6F1FC) palette",
      "Applied the system to group bill-split ledgers, one-tap friend transfer buttons, and settlement reminders",
      "Designed a shared group pool card and iOS/Android launcher tiles legible down to 16px payment badges",
    ],
    deliverables: [
      "Logotype & Block-E Mark",
      "Fintech Color System",
      "Split Ledger UI Screens",
      "Shared Virtual Card",
      "App Icon & Brand Guidelines",
    ],
    serviceMatch: "Product Design & Design Systems",
    domain: "evenly.money",
    timeline: "2 weeks",
    visual: {
      kind: "component",
      visualId: "brand-evenly",
    },
  },

  /* ─── KLAVIYO & EMAIL MARKETING ─── */
  {
    slug: "cart-recovery-klaviyo-flow",
    number: "K1",
    title: "Your Cart's About to Expire: Klaviyo Recovery Flow",
    categoryId: "klaviyo-emails",
    categoryLabel: "Klaviyo & Email Marketing",
    discipline: "Klaviyo Retention Flow",
    summary:
      "Multi-step abandoned cart email flow in Klaviyo pairing direct urgency headers with dynamic checkout links.",
    about:
      "An automated Klaviyo abandoned-cart sequence built for D2C e-commerce stores to bring back shoppers who dropped off at checkout.",
    problem:
      "Default plain Klaviyo cart reminder templates were easy to skim past in mobile inboxes and buried saved cart items.",
    whatWeDid:
      "We designed modular email blocks in Figma and coded them inside Klaviyo with high-contrast navy and warm ochre sections, clear product reminders, and direct return-to-checkout buttons.",
    highlights: [
      "Dark-mode resilient Klaviyo email template modules",
      "Dynamic cart block integration and clear above-the-fold CTA button",
      "2-hour, 24-hour, and final-reminder timing splits",
    ],
    deliverables: ["Klaviyo Flow", "Responsive Email Design", "Copywriting"],
    serviceMatch: "High-Converting Landing Pages",
    domain: "klaviyo-flow-01.blocshift.studio",
    timeline: "1 week",
    visual: {
      kind: "image",
      src: "/images/case-cart-recovery.png",
      alt: "Klaviyo abandoned cart recovery marketing email",
      width: 1200,
      height: 900,
    },
  },
  {
    slug: "functional-sleep-blend-email-campaign",
    number: "K2",
    title: "Deep Rest & Recovery: Product Launch Email",
    categoryId: "klaviyo-emails",
    categoryLabel: "Klaviyo & Email Marketing",
    discipline: "Product Launch Email Campaign",
    summary:
      "High-contrast forest green and lime Klaviyo launch email showing evening wellness benefits at a glance.",
    about:
      "A product drop email designed for a night-time wellness blend aimed at founders and athletes.",
    problem:
      "Previous launch newsletters buried active ingredients inside long paragraphs that readers skipped before reaching the shop button.",
    whatWeDid:
      "We structured a scannable email layout pairing dark green imagery with sharp lime callouts, short benefit pills, and direct collection links.",
    highlights: [
      "Scannable launch hero tested in iOS Mail and Gmail",
      "Short benefit breakdown readable on mobile screens",
      "Reusable Klaviyo campaign blocks for future product drops",
    ],
    deliverables: ["Launch Campaign", "Klaviyo Blocks", "Mobile Email QA"],
    serviceMatch: "High-Converting Landing Pages",
    domain: "sleepblend.studio",
    timeline: "1 week",
    visual: {
      kind: "image",
      src: "/images/case-wellness-launch.png",
      alt: "Night-time wellness product launch marketing email",
      width: 1200,
      height: 900,
    },
  },
  {
    slug: "inner-circle-welcome-klaviyo-sequence",
    number: "K3",
    title: "Welcome to the Inner Circle: Klaviyo Welcome Sequence",
    categoryId: "klaviyo-emails",
    categoryLabel: "Klaviyo & Email Marketing",
    discipline: "Welcome Series & Segmentation",
    summary:
      "Warm welcome sequence designed in Klaviyo to greet new email subscribers and drive first-order conversion.",
    about:
      "A brand-first Klaviyo welcome flow transforming popup signups into first-time buyers with warm storytelling and clean offer framing.",
    problem:
      "Automated discount codes were sent in dry text-heavy emails that gave first-time subscribers no real feel for the brand.",
    whatWeDid:
      "We built a multi-email welcome arc pairing rich editorial framing with clear subscriber perk callouts and friction-free shop CTAs.",
    highlights: [
      "Welcome Email #1–#3 flow timing tailored around signup intent",
      "Editorial header layout matching storefront typography cleanly",
      "Tested rendering across desktop Outlook, Gmail, and Apple Mail",
    ],
    deliverables: ["Klaviyo Welcome Flow", "Email Copy & UI", "Inbox QA"],
    serviceMatch: "High-Converting Landing Pages",
    domain: "innercircle.studio",
    timeline: "1 week",
    visual: {
      kind: "image",
      src: "/images/case-fragrance-campaign.png",
      alt: "Klaviyo welcome sequence marketing email",
      width: 1200,
      height: 900,
    },
  },

  /* ─── WEB ─── */
  {
    slug: "seo-autopilot-platform",
    number: "W1",
    title: "AI Search & Citation SaaS Platform",
    categoryId: "web",
    categoryLabel: "Web",
    discipline: "SaaS Marketing & Onboarding Web App",
    summary:
      "Three-step SaaS onboarding site showing AI search citation workflows, live plan breakdowns, and signup.",
    about:
      "A fast marketing and onboarding site for an AI SEO product that helps software companies show up in AI search answers and organic results without manual agency retainers.",
    problem:
      "Visitors struggled to see how automated content briefs and citation tracking actually worked, causing drop-offs right before signup.",
    whatWeDid:
      "We built an interactive 'Get Started in 3 Steps' walkthrough, paired it with clear included-item checklists and proof metrics (82% first-page AI citations), and wired fast responsive pages.",
    highlights: [
      "Three-step onboarding walkthrough showing setup in under 30 seconds",
      "Clear pricing and included-item breakdown before checkout",
      "Fast Next.js rendering with clean markup and Core Web Vitals checks",
    ],
    deliverables: ["Next.js Web App", "3-Step Onboarding UI", "Pricing Architecture", "Copywriting"],
    serviceMatch: "Web & Platform Engineering",
    domain: "aiseo.blocshift.studio",
    timeline: "3 weeks",
    visual: {
      kind: "image",
      src: "/images/case-seo-service.png",
      alt: "AI SEO SaaS web platform preview",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "legal-visibility-marketplace",
    number: "W2",
    title: "Social Visibility Platform for Lawyers",
    categoryId: "web",
    categoryLabel: "Web",
    discipline: "B2B SaaS Web Platform",
    summary:
      "Dark-mode directory platform helping solo attorneys and law firms grow verified client referrals.",
    about:
      "A social visibility platform built for legal professionals to turn compliance-safe practice pages into clear client referral profiles.",
    problem:
      "Law firm sites often look dated and crowded. Solo practitioners needed a sharper web presence that communicated trust quickly.",
    whatWeDid:
      "We designed and built a dark-surface web app with clean geometric type, fast directory filtering, and straightforward onboarding for legal teams.",
    highlights: [
      "High-contrast dark UI built around scannable legal practice categories",
      "Attorney directory and visibility profile flows tuned for mobile",
      "Custom React frontend built for fast navigation",
    ],
    deliverables: ["Web Platform UI", "Frontend Engineering", "Directory UX"],
    serviceMatch: "Web & Platform Engineering",
    domain: "legalvisibility.app",
    timeline: "3 weeks",
    visual: {
      kind: "image",
      src: "/images/case-lawyer-marketplace.png",
      alt: "Social visibility web platform for lawyers",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "specialized-vehicle-manufacturing",
    number: "W3",
    title: "Specialized Fleet & Ambulance Engineering Site",
    categoryId: "web",
    categoryLabel: "Web",
    discipline: "Industrial B2B Web Experience",
    summary:
      "Engineering site documenting CNC fabrication, medical gas integration, and terrain road testing.",
    about:
      "An industrial manufacturing site presenting custom ambulances, armored utility vehicles, and field units built to operate in harsh weather and terrain across Pakistan.",
    problem:
      "Government and institutional buyers needed concrete visual proof of CNC fabrication, medical integration, and QA trials before sending fleet RFPs.",
    whatWeDid:
      "We structured the flagship site around a 4-step engineering timeline, pairing shop-floor photos with technical specs for fabrication, system integration, and road validation.",
    highlights: [
      "Alternating technical step layout linking shop-floor photos to specs",
      "Fast image loading for high-resolution industrial photography",
      "Direct institutional quote and specification request form",
    ],
    deliverables: ["Corporate Web Build", "Technical Timeline UI", "RFQ Lead Funnel"],
    serviceMatch: "Web & Platform Engineering",
    domain: "fleetengineering.pk",
    timeline: "2 weeks",
    visual: {
      kind: "image",
      src: "/images/case-vehicle-manufacturing.png",
      alt: "Specialized vehicle manufacturing web platform preview",
      width: 1440,
      height: 900,
    },
  },
  {
    slug: "florida-direct-lender-portal",
    number: "W4",
    title: "Licensed Direct Lender: Fast Eligibility Portal",
    categoryId: "web",
    categoryLabel: "Web",
    discipline: "Fintech Web Application",
    summary:
      "Trust-anchored fintech web application pairing clear regulatory badging with a fast eligibility checker.",
    about:
      "A licensed Florida financial portal built to help residents verify borrowing eligibility online in minutes, backed by clean visual hierarchy and straightforward disclosure clarity.",
    problem:
      "Lending sites routinely look spammy or hide eligibility terms behind heavy forms, killing trust before users start.",
    whatWeDid:
      "We led with an explicit OFR-licensed regulatory badge, clear two-step eligibility triggers ('Check My Eligibility' vs 'Learn More'), and a dark, calm dashboard preview right below the fold.",
    highlights: [
      "Accessible contrast across dark slate surfaces and interactive application cards",
      "Regulatory trust badge anchored above the primary headline",
      "Mobile-first application flow minimizing field friction",
    ],
    deliverables: ["Fintech Web UI", "Eligibility Flow", "Dashboard Preview"],
    serviceMatch: "Web & Platform Engineering",
    domain: "lendingportal.app",
    timeline: "3 weeks",
    visual: {
      kind: "image",
      src: "/images/case-loan-service.png",
      alt: "Licensed direct lender eligibility web portal",
      width: 1440,
      height: 900,
    },
  },

  /* ─── AI AGENTS ─── */
  {
    slug: "lead-followup-agent",
    number: "A1",
    title: "Lead Enrich & Instant Follow-Up Agent",
    categoryId: "ai-agents",
    categoryLabel: "AI Agents",
    discipline: "Autonomous Sales & CRM Workflow",
    summary:
      "Webhook-triggered AI agent that enriches inbound leads, scores intent, updates CRM fields, and drafts tailored replies in 0.8s.",
    about:
      "Built for B2B service teams and SaaS founders losing warm leads to slow manual follow-ups. The agent listens on form submissions and Stripe/Cal webhooks, enriches company context, and prepares an accurate first response.",
    problem:
      "Inbound prospects waited 6 to 24 hours for a manual reply while founders dug through LinkedIn, emails, and spreadsheets just to prepare one discovery message.",
    whatWeDid:
      "We wired an event-driven agent pipeline with deterministic validation schemas, CRM field syncing (HubSpot / Notion), confidence-gated auto-sends, and Slack human-approval escalation for enterprise inquiries.",
    highlights: [
      "0.8s median webhook-to-enrichment turnaround with structured JSON outputs",
      "Zero duplicate CRM records via idempotent contact matching",
      "Human-in-the-loop Slack draft approval before sensitive outbound replies",
      "Full audit log of every model prompt, source citation, and CRM write",
    ],
    deliverables: ["Webhook Orchestration", "CRM Sync", "Prompt Guardrails", "Slack Approvals"],
    serviceMatch: "AI Agents & Automation",
    domain: "agents.blocshift.studio/lead-sync",
    timeline: "2 weeks",
    visual: {
      kind: "component",
      visualId: "ai-lead-followup",
    },
  },
  {
    slug: "support-triage-agent",
    number: "A2",
    title: "Support Triage & Order Lookup Agent",
    categoryId: "ai-agents",
    categoryLabel: "AI Agents",
    discipline: "Customer Ops Automation",
    summary:
      "Policy-grounded triage agent classifying tickets, verifying order status, and drafting verified replies for support reps.",
    about:
      "Designed for growing e-commerce and SaaS operations teams overwhelmed by repetitive status checks, billing questions, and routing mistakes across shared inboxes.",
    problem:
      "Generic chatbots frustrated customers with vague boilerplate answers or risked promising unapproved refunds outside company policy.",
    whatWeDid:
      "We built a tool-calling triage agent that reads real database order status, cites exact refund rules, answers tracking requests directly, and routes edge cases with a 3-bullet summary.",
    highlights: [
      "Read-only verified database lookups preventing fabricated dates or tracking numbers",
      "Strict policy boundary guards before any refund or account mutation",
      "70% faster first-response time while keeping final edge decisions with humans",
    ],
    deliverables: ["Tool-Calling Agent", "Policy Guardrails", "Helpdesk Integration"],
    serviceMatch: "AI Agents & Automation",
    domain: "agents.blocshift.studio/triage",
    timeline: "2 weeks",
    visual: {
      kind: "component",
      visualId: "ai-support-triage",
    },
  },
  {
    slug: "pipeline-telemetry-agent",
    number: "A3",
    title: "Executive Pipeline & Telemetry Digest Agent",
    categoryId: "ai-agents",
    categoryLabel: "AI Agents",
    discipline: "Revenue & Ops Intelligence",
    summary:
      "Scheduled telemetry agent synthesizing Stripe MRR, latency SLAs, and conversion drops into one calm daily founder digest.",
    about:
      "An internal founder co-pilot connecting billing webhooks, application logs, and conversion funnels into a structured daily brief without dashboard hopping.",
    problem:
      "Early teams had metrics scattered across Stripe, Vercel, PostHog, and Postgres, so regressions or churn spikes went unnoticed until month-end.",
    whatWeDid:
      "We built a scheduled aggregation worker and anomaly agent that tracks ARR pacing, 99.98% uptime checks, and funnel drop-offs, sending plain bullet summaries each morning.",
    highlights: [
      "Unified telemetry collector reading billing, funnel conversion, and p95 latency",
      "Threshold alerts flagging unusual churn or API latency spikes early",
      "Clean executive summary UI + daily Slack digest delivery",
    ],
    deliverables: ["Telemetry Pipeline", "Anomaly Alerts", "Executive Digest UI"],
    serviceMatch: "Executive Dashboards & Telemetry",
    domain: "agents.blocshift.studio/telemetry",
    timeline: "2 weeks",
    visual: {
      kind: "component",
      visualId: "ai-pipeline-telemetry",
    },
  },

  /* ─── EXPERIMENTS ─── */
  {
    slug: "token-component-playground",
    number: "E1",
    title: "Live Token & Component Spec Playground",
    categoryId: "experiments",
    categoryLabel: "Experiments",
    discipline: "Design Engineering Probe",
    summary:
      "Interactive Figma-to-Code design token switcher testing AA contrast pairs, pill radii, and live surface states in real time.",
    about:
      "Built in our lab to connect Figma variable changes directly with React UI previews, letting designers and developers test surface, ink, and lime accent pairings side by side.",
    problem:
      "Static style guides hide how button labels, contrast ratios, and nested borders actually behave when themes or surface tones shift.",
    whatWeDid:
      "We coded a lightweight interactive playground right in React where surface tokens, state badges, and typography density update immediately across sample components with AA contrast checks baked in.",
    highlights: [
      "Zero-dependency token state preview using CSS variables and strict AA pairings",
      "Interactive swatch & button state toggle right inside the browser",
      "Direct inspiration for the Blocshift unified surface & lime accent system",
    ],
    deliverables: ["Interactive UI Probe", "Token Contrasts", "React Component"],
    serviceMatch: "Product Design & Design Systems",
    domain: "lab.blocshift.studio/tokens",
    timeline: "4 days",
    visual: {
      kind: "component",
      visualId: "exp-token-playground",
    },
  },
  {
    slug: "scroll-synced-process-rail",
    number: "E2",
    title: "Scroll-Synced 4-Stage Process Rail",
    categoryId: "experiments",
    categoryLabel: "Experiments",
    discipline: "Motion & Layout Study",
    summary:
      "Sticky stage progression experiment pairing a clean vertical rail with deterministic state previews across Scope, Design, Sprint, and Launch.",
    about:
      "A study in calm B2B storytelling where each scroll milestone swaps a sticky architectural panel alongside the four work phases.",
    problem:
      "Many agency process sections are either dry bullet lists or heavy animations that break on phones.",
    whatWeDid:
      "We built a step state machine using CSS sticky positioning and subtle opacity transitions that collapses cleanly into tap buttons on narrow mobile screens.",
    highlights: [
      "Sticky rail paired with aligned SVG connector nodes",
      "Four interactive stage cards built without heavy canvas libraries",
      "Live in production on our homepage",
    ],
    deliverables: ["Interaction Study", "Sticky Rail UI", "Responsive State Cards"],
    serviceMatch: "High-Converting Landing Pages",
    domain: "lab.blocshift.studio/process-rail",
    timeline: "5 days",
    visual: {
      kind: "component",
      visualId: "exp-process-rail",
    },
  },
  {
    slug: "ascii-wordmark-shader-canvas",
    number: "E3",
    title: "Interactive Halftone & Wordmark Matrix",
    categoryId: "experiments",
    categoryLabel: "Experiments",
    discipline: "Generative Brand Surface",
    summary:
      "Responsive typographic dot-matrix experiment rendering crisp monochrome brand wordmarks cleanly across every viewport width.",
    about:
      "A playful typography & grid experiment exploring how monumental studio wordmarks can stay ultra-lightweight, sharp at any DPI, and tactile without shipping heavy raster sprite sheets.",
    problem:
      "Massive decorative display headers often look blurry when scaled or bloat page weight with oversized PNG exports.",
    whatWeDid:
      "We prototyped a grid-aligned geometric matrix component combining crisp rounded square marks with high-contrast monochrome letterforms, achieving sub-millisecond paint times.",
    highlights: [
      "Sub-5KB footprint compared to multi-megabyte hero display images",
      "Razor-sharp rendering across retina displays and mobile screens",
      "Hover-responsive matrix cell states explored in the studio lab",
    ],
    deliverables: ["Typographic Grid", "Lightweight Matrix UI", "Zero-Bloat Header"],
    serviceMatch: "Product Design & Design Systems",
    domain: "lab.blocshift.studio/matrix",
    timeline: "3 days",
    visual: {
      kind: "component",
      visualId: "exp-ascii-canvas",
    },
  },
];

const UI_UX_ITEMS: PortfolioItem[] = SHOWCASE_PROJECTS.map(mapShowcaseToUiUx);

const ALL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  ...UI_UX_ITEMS,
  ...CURATED_NON_UIUX_ITEMS,
];

export function getAllPortfolioItems(): PortfolioItem[] {
  return ALL_PORTFOLIO_ITEMS;
}

export function getPortfolioByCategory(
  categoryId: PortfolioCategoryId | "all"
): PortfolioItem[] {
  if (categoryId === "all") return ALL_PORTFOLIO_ITEMS;
  return ALL_PORTFOLIO_ITEMS.filter((item) => item.categoryId === categoryId);
}

export function getPortfolioBySlug(slug: string): PortfolioItem | undefined {
  return ALL_PORTFOLIO_ITEMS.find((item) => item.slug === slug);
}

export function getNextPortfolioItem(currentSlug: string): PortfolioItem {
  const index = ALL_PORTFOLIO_ITEMS.findIndex((item) => item.slug === currentSlug);
  if (index === -1 || index === ALL_PORTFOLIO_ITEMS.length - 1) {
    return ALL_PORTFOLIO_ITEMS[0];
  }
  return ALL_PORTFOLIO_ITEMS[index + 1];
}

export function getRelatedPortfolioItems(
  currentSlug: string,
  categoryId: PortfolioCategoryId,
  limit = 3
): PortfolioItem[] {
  const sameCategory = ALL_PORTFOLIO_ITEMS.filter(
    (item) => item.categoryId === categoryId && item.slug !== currentSlug
  );
  return sameCategory.slice(0, limit);
}
