export interface CaseStudy {
  id: string;
  title: string;
  category: "email" | "landing" | "social" | "data" | "ai";
  tag: string;
  image: string;
  alt: string;
  problem: string;
  solution: string;
  deliverables: string;
  highlights: string;
}

export interface StageData {
  id: "social" | "data" | "ai";
  kicker: string;
  iconName: "images" | "chart" | "bot";
  title: string;
  description: string;
  deliverables: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: "pen-tool" | "code-2" | "workflow";
}

export const CASE_STUDY_CATEGORIES = [
  { id: "email", label: "Email Newsletters" },
  { id: "landing", label: "Landing Pages" },
  { id: "social", label: "Social Media Post" },
  { id: "data", label: "Data Analytics" },
  { id: "ai", label: "AI Agents" },
] as const;

export type CategoryId = (typeof CASE_STUDY_CATEGORIES)[number]["id"];

export const EMAIL_CASE_STUDIES: CaseStudy[] = [
  {
    id: "snack-brand-cart-recovery",
    title: "Snack Brand — Cart Recovery Emails",
    category: "email",
    tag: "Email Design",
    image: "/images/case-cart-recovery.png",
    alt: "Cropped preview of a bold cart recovery email design",
    problem:
      "Shoppers were abandoning carts, and the brand’s bold, playful identity was getting lost in plain transactional recovery emails.",
    solution:
      "A high-urgency recovery email leading with an expiry warning, recapping the abandoned items, reinforcing the ingredient and flavor story, adding social proof, and driving to a single “Return to Your Cart” CTA. Built in two colorways.",
    deliverables: "Cart recovery email, 2 color variants",
    highlights:
      "Urgency-led header; cart item recap; benefit storytelling; social proof block",
  },
  {
    id: "wellness-brand-launch",
    title: "Wellness Brand — Product Launch Emails",
    category: "email",
    tag: "Email Design",
    image: "/images/case-wellness-launch.png",
    alt: "Cropped preview of a wellness product launch email design",
    problem:
      "Launching a functional nighttime blend needed ingredient education and first-order conversion — not just a pretty announcement.",
    solution:
      "Benefit-led storytelling explaining the formula (clean, zero-sugar, low-FODMAP), backed by customer reviews, pushing bundle and subscribe offers with a clear bestsellers CTA.",
    deliverables: "Product launch email series",
    highlights:
      "Formula education; review integration; bundle/subscribe offers",
  },
  {
    id: "fragrance-brand-campaign",
    title: "Fragrance Brand — Campaign Email",
    category: "email",
    tag: "Email Design",
    image: "/images/case-fragrance-campaign.png",
    alt: "Cropped preview of a minimal fragrance campaign email design",
    problem:
      "A premium perfume launch could not look like a generic template — it needed to feel luxurious and minimal.",
    solution:
      "A restrained campaign built around product imagery and sustainability storytelling (zero-waste bottling, wild-harvested ingredients) with a single focused CTA.",
    deliverables: "Campaign email",
    highlights:
      "Minimal luxury aesthetic; sustainability narrative; product-focused layout",
  },
];

export const LANDING_CASE_STUDIES: CaseStudy[] = [
  {
    id: "lawyer-marketplace",
    title: "Lawyer Marketplace",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-lawyer-marketplace.png",
    alt: "Cropped preview of a lawyer marketplace landing page",
    problem:
      "People searching for legal help needed to trust an online marketplace with something as sensitive as finding a lawyer.",
    solution:
      "A trust-first landing page built around verified client testimonials, clear lawyer profiles, and a prominent “Find a Lawyer” CTA that reduces friction.",
    deliverables: "Landing page design",
    highlights: "Testimonial-driven trust; clear CTA hierarchy",
  },
  {
    id: "vehicle-manufacturing",
    title: "Vehicle Manufacturing",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-vehicle-manufacturing.png",
    alt: "Cropped preview of an industrial vehicle manufacturing landing page",
    problem:
      "An industrial vehicle manufacturer needed to communicate a complex multi-step build process — engineering, manufacturing, quality testing — to non-technical buyers.",
    solution:
      "A process-driven page walking through each stage, from reinforced sub-frames to performance validation, with factory photography and clear step markers.",
    deliverables: "Landing page design",
    highlights: "Process visualization; industrial photography",
  },
  {
    id: "seo-service",
    title: "SEO Service",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-seo-service.png",
    alt: "Cropped preview of an AI-powered SEO service landing page",
    problem:
      "An AI-powered SEO tool needed to explain its 3-step setup and justify its value proposition quickly.",
    solution:
      "A conversion-focused page with a clear 3-step onboarding flow, a feature grid (AI keyword research, auto-publishing, backlinks), stat blocks, and a single launch CTA.",
    deliverables: "Landing page design",
    highlights: "3-step onboarding flow; stat-driven credibility",
  },
  {
    id: "coworking-space",
    title: "Co-working Space",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-coworking-space.png",
    alt: "Cropped preview of a co-working space landing page",
    problem:
      "A co-working brand offered multiple space types — hot desks, meeting rooms, private offices, dedicated desks — and visitors needed to find their fit fast.",
    solution:
      "A clean, scannable page presenting each space type with imagery and clear differentiation so visitors can self-select.",
    deliverables: "Landing page design",
    highlights: "Space-type comparison; visual differentiation",
  },
  {
    id: "child-safety-nonprofit",
    title: "Child-Safety Nonprofit",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-child-safety-nonprofit.png",
    alt: "Cropped preview of a child-safety nonprofit landing page",
    problem:
      "A nonprofit tackling child-safety education needed to communicate impact, debunk myths, and drive engagement without feeling institutional.",
    solution:
      "An impact-led page with stat blocks, myth-vs-fact education sections, and clear pathways to get involved.",
    deliverables: "Landing page design",
    highlights: "Impact statistics; educational myth/fact format",
  },
  {
    id: "haircare-brand",
    title: "Haircare Brand",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-haircare-brand.png",
    alt: "Cropped preview of a haircare product landing page",
    problem:
      "A haircare product needed to educate on benefits — strength, scalp nourishment, reduced hair fall — while driving to purchase.",
    solution:
      "A benefit-led page with ritual-focused storytelling, benefit cards, and multiple shop/explore CTAs.",
    deliverables: "Landing page design",
    highlights: "Benefit storytelling; ritual framing",
  },
  {
    id: "kids-education",
    title: "Kids Education Platform",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-kids-education.png",
    alt: "Cropped preview of a kids education platform landing page",
    problem:
      "An educational platform for kids needed to appeal to parents with curriculum credibility while feeling playful and engaging.",
    solution:
      "A page balancing proven-curriculum authority with gamified discovery elements and vibrant visuals.",
    deliverables: "Landing page design",
    highlights: "Curriculum credibility; playful visual language",
  },
  {
    id: "loan-service",
    title: "Loan Service",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-loan-service.png",
    alt: "Cropped preview of a loan service landing page",
    problem:
      "A short-term loan service needed to build trust around a sensitive financial product while clearly communicating eligibility.",
    solution:
      "A dark, premium page leading with clear eligibility criteria, emphasizing bank-level encryption and data protection, guiding through a secure application flow.",
    deliverables: "Landing page design",
    highlights: "Trust and privacy messaging; clear eligibility criteria",
  },
  {
    id: "dental-equipment-repair",
    title: "Dental Equipment Repair",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-dental-repair.png",
    alt: "Cropped preview of a dental equipment repair landing page",
    problem:
      "A specialized repair service for dental sensors needed to communicate expertise and reduce perceived risk for expensive equipment.",
    solution:
      "A service page built around risk-reversal (if we can’t fix it, you don’t pay), technician credentials, and compatibility with major sensor brands.",
    deliverables: "Landing page design",
    highlights: "Risk-reversal guarantee; brand compatibility",
  },
  {
    id: "artisan-kitchenware",
    title: "Kitchenware Brand",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-artisan-kitchenware.png",
    alt: "Cropped preview of an artisan kitchenware product page",
    problem:
      "An artisan kitchenware brand needed product pages that felt craft-focused while driving quick purchases.",
    solution:
      "Product cards with rich food photography, ratings, clear pricing, and prominent Quick Buy CTAs, supported by shipping and returns trust badges.",
    deliverables: "Landing/product page design",
    highlights: "Quick-buy conversion; artisan photography",
  },
  {
    id: "luxury-perfume",
    title: "Perfume Brand",
    category: "landing",
    tag: "Landing Page",
    image: "/images/case-luxury-perfume.png",
    alt: "Cropped preview of a luxury perfume storefront landing page",
    problem:
      "A luxury perfume brand needed an e-commerce experience that felt premium and editorial, not like a generic store.",
    solution:
      "A minimal, editorial page with dramatic product photography, restrained typography, and a focused product grid.",
    deliverables: "Landing page design",
    highlights: "Editorial luxury aesthetic; dramatic product photography",
  },
];

export const STAGES: Record<"social" | "data" | "ai", StageData> = {
  social: {
    id: "social",
    kicker: "Social systems",
    iconName: "images",
    title: "Content with a recognizable pulse.",
    description:
      "Flexible social templates and campaign visuals that keep brands consistent without making every post feel the same.",
    deliverables: ["Creative direction", "Templates", "Campaign assets"],
  },
  data: {
    id: "data",
    kicker: "Data clarity",
    iconName: "chart",
    title: "Make the signal easy to see.",
    description:
      "Dashboards and decision tools that turn complex operational data into concise, useful interfaces.",
    deliverables: ["Dashboards", "Data UX", "Reporting"],
  },
  ai: {
    id: "ai",
    kicker: "Applied AI",
    iconName: "bot",
    title: "Agents built around real workflows.",
    description:
      "Thoughtful tools that connect interfaces, data and automation — designed for the way a team actually works.",
    deliverables: ["Workflow design", "Agent UX", "Implementation"],
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: "design-direction",
    title: "Design direction",
    description:
      "Identity, interface and campaign systems with a clear visual point of view.",
    iconName: "pen-tool",
  },
  {
    id: "web-development",
    title: "Web development",
    description:
      "Responsive, accessible front ends with the polish of the design that shaped them.",
    iconName: "code-2",
  },
  {
    id: "automation-ai",
    title: "Automation & AI",
    description:
      "Useful automations and agent experiences that remove repetitive work.",
    iconName: "workflow",
  },
];
