export interface ShowcaseProject {
  id: string;
  number: string;
  title: string;
  category: string;
  domain: string;
  problem: string;
  solution: string;
  mockup: string;
  image: string;
  width: number;
  height: number;
  mobileImage?: string;
  backdrop: string;
  darkChrome: boolean;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "industrial-3d",
    number: "01",
    title: "3D Product Visualization Platform",
    category: "3D & Interactive Web",
    domain: "3d-configurator.app",
    problem:
      "High-ticket buyers were forced to make $50K–$500K purchasing decisions from static PDFs without seeing configurations or materials up close.",
    solution:
      "Designed a dark, high-contrast showcase hero highlighting real-time 3D configurators across automotive, luxury, and architectural verticals.",
    mockup: "/images/macbook-mockups/01-industrial-3d.webp",
    image: "/images/projects-v3/proj-01.webp",
    width: 1435,
    height: 1319,
    backdrop: "linear-gradient(135deg, #0b1026 0%, #172554 55%, #1e1b4b 100%)",
    darkChrome: true,
  },
  {
    id: "child-abuse-prevention",
    number: "02",
    title: "Child Protection Awareness Platform",
    category: "Nonprofit & Awareness",
    domain: "child-protection.org",
    problem:
      "Critical prevention statistics and training programs were buried in dense text, making it hard for parents and educators to take action.",
    solution:
      "Structured a compassionate, scannable visual narrative pairing key prevention data with clear pathways for teacher, child, and parent training.",
    mockup: "/images/macbook-mockups/04-child-abuse-prevention.webp",
    image: "/images/projects-v3/proj-02.webp",
    width: 1440,
    height: 1756,
    backdrop: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 55%, #e2e8f0 100%)",
    darkChrome: false,
  },
  {
    id: "big-idea-studio",
    number: "03",
    title: "Digital Product Agency Website",
    category: "Digital Agency",
    domain: "product-agency.co",
    problem:
      "A full-service digital agency blended in with generic templates and failed to convey speed, craft, and modern AI-ready capabilities.",
    solution:
      "Created a bold dark-mode hero with neon accent typography, dynamic capability ribbons, and clear social proof right above the fold.",
    mockup: "/images/macbook-mockups/05-big-idea-studio.webp",
    image: "/images/projects-v3/proj-03.webp",
    width: 1439,
    height: 1476,
    backdrop: "linear-gradient(135deg, #180824 0%, #2e1065 55%, #09090b 100%)",
    darkChrome: true,
  },
  {
    id: "digital-products-agency",
    number: "04",
    title: "Software Studio Growth Platform",
    category: "Product Studio",
    domain: "software-growth.dev",
    problem:
      "Startup founders visiting the site couldn't immediately tell the studio's tech stack or how quickly they ship production web and mobile apps.",
    solution:
      "Engineered an airy, high-clarity hero framed by floating platform badges, a visible technology strip, and a focused strategy-call CTA.",
    mockup: "/images/macbook-mockups/07-digital-products-agency.webp",
    image: "/images/projects-v3/proj-04.webp",
    width: 1440,
    height: 1095,
    backdrop: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 55%, #e0f2fe 100%)",
    darkChrome: false,
  },
  {
    id: "kids-interactive-learning",
    number: "05",
    title: "Interactive Kids Learning Platform",
    category: "EdTech & Workshops",
    domain: "kids-learning.app",
    problem:
      "Parents and young learners felt uninspired by rigid educational portals, leading to low inquiries and workshop sign-ups.",
    solution:
      "Crafted a warm, illustrated forest-scene experience with multilingual support, frictionless parent inquiry forms, and instant workshop registration.",
    mockup: "/images/macbook-mockups/08-kids-interactive-learning.webp",
    image: "/images/projects-v3/proj-05.webp",
    width: 1440,
    height: 1035,
    backdrop: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 55%, #e2e8f0 100%)",
    darkChrome: false,
  },
  {
    id: "personal-finance-app",
    number: "06",
    title: "Personal Finance Dashboard App",
    category: "Fintech & Dashboard",
    domain: "finance-dashboard.app",
    problem:
      "Everyday users felt overwhelmed by cluttered budgeting spreadsheets and distrusted complex financial interfaces.",
    solution:
      "Designed a calm, luminous fintech hero that previews real spending insights and financial health scores directly beneath a crisp value pitch.",
    mockup: "/images/macbook-mockups/09-personal-finance-app.webp",
    image: "/images/projects-v3/proj-06.webp",
    width: 1440,
    height: 939,
    backdrop: "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 55%, #f3e8ff 100%)",
    darkChrome: false,
  },
  {
    id: "unforgettable-brands",
    number: "07",
    title: "Brand Design Studio Portfolio",
    category: "Creative Agency",
    domain: "brand-design.studio",
    problem:
      "A boutique branding studio needed a portfolio entrance that proved design maturity and immediate client credibility within three seconds.",
    solution:
      "Built an editorial bento-grid hero pairing punchy warm-orange accents, 5-star founder reviews, and live work previews in one unified frame.",
    mockup: "/images/macbook-mockups/10-unforgettable-brands.webp",
    image: "/images/projects-v3/proj-07.webp",
    width: 1440,
    height: 920,
    backdrop: "linear-gradient(135deg, #1c1917 0%, #292524 55%, #431407 100%)",
    darkChrome: true,
  },
  {
    id: "lawggle-legal-saas",
    number: "08",
    title: "Legal Network & Directory SaaS",
    category: "LegalTech SaaS",
    domain: "legal-directory.com",
    problem:
      "Attorneys were wasting budget on cold lead brokers instead of building authentic authority and organic client trust online.",
    solution:
      "Crafted a refined midnight-indigo SaaS hero showcasing the live lawyer profile platform with instant claim-profile and demo flows.",
    mockup: "/images/macbook-mockups/11-lawggle-legal-saas.webp",
    image: "/images/projects-v3/proj-08.webp",
    width: 1440,
    height: 1179,
    backdrop: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
    darkChrome: true,
  },
  {
    id: "invoico-ai-invoicing",
    number: "09",
    title: "AI Invoicing & Billing SaaS",
    category: "AI & Fintech SaaS",
    domain: "ai-invoicing.app",
    problem:
      "Freelancers and small businesses spent hours manually drafting, tracking, and chasing unpaid invoices across disconnected tools.",
    solution:
      "Designed a crisp sky-blue product hero featuring layered mobile UI cards that immediately demonstrate one-tap AI invoice generation.",
    mockup: "/images/macbook-mockups/12-invoico-ai-invoicing.webp",
    image: "/images/projects-v3/proj-09.webp",
    width: 1420,
    height: 1151,
    backdrop: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 55%, #eff6ff 100%)",
    darkChrome: false,
  },
  {
    id: "utah-accident-lawyers",
    number: "10",
    title: "Injury Law Intake Platform",
    category: "Legal Lead Generation",
    domain: "injury-law.com",
    problem:
      "Accident victims visiting legal sites bounced quickly when forced to navigate multiple pages before getting a free case evaluation.",
    solution:
      "Paired high-trust settlement metrics and verified reviews with an above-the-fold Free Case Review form built for immediate conversion.",
    mockup: "/images/macbook-mockups/13-utah-accident-lawyers.webp",
    image: "/images/projects-v3/proj-10.webp",
    width: 1440,
    height: 1105,
    backdrop: "linear-gradient(135deg, #0c192c 0%, #1e293b 55%, #334155 100%)",
    darkChrome: true,
  },
  {
    id: "fog-bandit-security",
    number: "11",
    title: "Security Hardware Deployment Portal",
    category: "Hardware & Security",
    domain: "security-hardware.com",
    problem:
      "Commercial property owners didn't realize traditional alarms only record break-ins rather than physically stopping intruders in seconds.",
    solution:
      "Created a cinematic, high-urgency hardware hero illustrating dense security fog deployment alongside certified European security credentials.",
    mockup: "/images/macbook-mockups/14-fog-bandit-security.webp",
    image: "/images/projects-v3/proj-11.webp",
    width: 1440,
    height: 1452,
    backdrop: "linear-gradient(135deg, #090d16 0%, #1e293b 55%, #450a0a 100%)",
    darkChrome: true,
  },
  {
    id: "vortex-3d-printing",
    number: "12",
    title: "On-Demand 3D Printing Marketplace",
    category: "3D Marketplace",
    domain: "3d-marketplace.io",
    problem:
      "Creators wanted custom physical 3D figurines and models without investing in expensive printers, slicing software, or calibration.",
    solution:
      "Designed a tactile dark-studio marketplace hero showcasing vibrant character prints with instant photo-to-3D upload and explore CTAs.",
    mockup: "/images/macbook-mockups/15-vortex-3d-printing.webp",
    image: "/images/projects-v3/proj-12.webp",
    width: 1440,
    height: 1023,
    backdrop: "linear-gradient(135deg, #09090b 0%, #18181b 55%, #27272a 100%)",
    darkChrome: true,
  },
  {
    id: "high-yield-property",
    number: "13",
    title: "Luxury Property Management Platform",
    category: "Real Estate & Hospitality",
    domain: "property-management.co",
    problem:
      "Luxury property owners wanted short-term rental yields without dealing with guest logistics, pricing optimization, or maintenance.",
    solution:
      "Built an architectural, hospitality-grade landing page highlighting revenue optimization and hands-free end-to-end property care.",
    mockup: "/images/macbook-mockups/16-high-yield-property.webp",
    image: "/images/projects-v3/proj-13.webp",
    width: 1440,
    height: 1777,
    backdrop: "linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 55%, #d6d3d1 100%)",
    darkChrome: false,
  },
  {
    id: "iphone-power-store",
    number: "14",
    title: "Consumer Tech Hardware Store",
    category: "Consumer Tech Store",
    domain: "tech-hardware.store",
    problem:
      "Online shoppers were hesitant to buy phone chargers due to counterfeit accessories and unclear battery-safety guarantees.",
    solution:
      "Crafted a clean, Apple-inspired hardware hero foregrounding authentic adapters, battery-health badges, and one-click compatibility checks.",
    mockup: "/images/macbook-mockups/17-iphone-power-store.webp",
    image: "/images/projects-v3/proj-14.webp",
    width: 1440,
    height: 966,
    backdrop: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 55%, #f1f5f9 100%)",
    darkChrome: false,
  },
  {
    id: "instant-cash-fintech",
    number: "15",
    title: "Instant Cash Lending Platform",
    category: "Fintech & Lending",
    domain: "cash-lending.io",
    problem:
      "Borrowers needed fast, transparent eligibility checks without invasive paperwork or predatory-looking payday loan websites.",
    solution:
      "Designed an institutional-grade dark fintech hero with a live transparent approval preview and a clean Check Eligibility call to action.",
    mockup: "/images/macbook-mockups/18-instant-cash-fintech.webp",
    image: "/images/projects-v3/proj-15.webp",
    width: 1440,
    height: 1237,
    backdrop: "linear-gradient(135deg, #09090b 0%, #172554 55%, #0f172a 100%)",
    darkChrome: true,
  },
  {
    id: "perfect-fit-fashion",
    number: "16",
    title: "Modern Apparel E-Commerce Store",
    category: "Fashion E-Commerce",
    domain: "apparel-store.shop",
    problem:
      "Apparel shoppers faced flat, repetitive catalog grids that failed to capture seasonal styling energy or drive collection discovery.",
    solution:
      "Composed a dynamic editorial hero with angled lookbook cards, effortless collection filtering, and crisp Shop Now pathways.",
    mockup: "/images/macbook-mockups/19-perfect-fit-fashion.webp",
    image: "/images/projects-v3/proj-16.webp",
    width: 1438,
    height: 1008,
    backdrop: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 55%, #fff7ed 100%)",
    darkChrome: false,
  },
  {
    id: "conscience-cookware",
    number: "17",
    title: "Sustainable Cookware Brand Store",
    category: "Sustainable E-Commerce",
    domain: "cookware-brand.com",
    problem:
      "Health-conscious home chefs struggled to find non-toxic, plastic-free cookware brands that also felt design-forward.",
    solution:
      "Created a warm, moody kitchen hero combining live product search with clear eco-credentials like PFAS-free and carbon-neutral delivery.",
    mockup: "/images/macbook-mockups/21-conscience-cookware.webp",
    image: "/images/projects-v3/proj-17.webp",
    width: 1440,
    height: 935,
    backdrop: "linear-gradient(135deg, #18181b 0%, #27272a 55%, #431407 100%)",
    darkChrome: true,
  },
  {
    id: "industrial-procurement",
    number: "18",
    title: "B2B Industrial Procurement SaaS",
    category: "B2B Supply Chain SaaS",
    domain: "industrial-procurement.io",
    problem:
      "Procurement teams wasted weeks vetting suppliers across fragmented directories and slow email chains for custom manufacturing.",
    solution:
      "Designed a crisp B2B SaaS hero featuring an instant multi-filter supplier search bar right below the headline for immediate utility.",
    mockup: "/images/macbook-mockups/23-industrial-procurement.webp",
    image: "/images/projects-v3/proj-18.webp",
    width: 1440,
    height: 797,
    backdrop: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 55%, #f8fafc 100%)",
    darkChrome: false,
  },
  {
    id: "mystic-summer-perfume",
    number: "19",
    title: "Luxury Fragrance E-Commerce Store",
    category: "Luxury E-Commerce",
    domain: "luxury-fragrance.com",
    problem:
      "A boutique perfumery needed a digital campaign launch that conveyed sensory elegance and boosted sample-set discovery.",
    solution:
      "Crafted a full-bleed botanical fragrance hero framing the signature bottle against soft cherry blossoms with refined typography.",
    mockup: "/images/macbook-mockups/24-mystic-summer-perfume.webp",
    image: "/images/projects-v3/proj-19.webp",
    width: 1440,
    height: 900,
    backdrop: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 55%, #fef2f2 100%)",
    darkChrome: false,
  },
  {
    id: "youth-sports-app",
    number: "20",
    title: "Sports Social Media App",
    category: "Sports & Mobile App",
    domain: "sports-social.app",
    problem:
      "Parents, coaches, and young athletes lacked a unified place to discover local sports programs, gear drops, and training providers.",
    solution:
      "Built an energetic pre-launch hero blending dynamic court photography with a live mobile app preview and high-converting waitlist CTA.",
    mockup: "/images/macbook-mockups/22-youth-sports-app.webp",
    image: "/images/projects-v3/proj-20.webp",
    width: 1437,
    height: 922,
    backdrop: "linear-gradient(135deg, #f1f5f9 0%, #fee2e2 55%, #e2e8f0 100%)",
    darkChrome: false,
  },
  {
    id: "dental-xray-repair",
    number: "21",
    title: "Medical Hardware Repair Service",
    category: "Medical Hardware Service",
    domain: "medical-repair.com",
    problem:
      "Dental clinics facing broken X-ray sensors needed rapid, trustworthy repair quotes rather than costly OEM replacements.",
    solution:
      "Delivered a clinical, distraction-free hero highlighting free shipping diagnostics and an unmistakable Get Free Estimate CTA.",
    mockup: "/images/macbook-mockups/20-dental-xray-repair.webp",
    image: "/images/projects-v3/proj-21.webp",
    width: 1440,
    height: 943,
    backdrop: "linear-gradient(135deg, #fff7ed 0%, #f8fafc 55%, #ffedd5 100%)",
    darkChrome: false,
  },
  {
    id: "kanu-hair-wellness",
    number: "22",
    title: "Hair Wellness E-Commerce Store",
    category: "E-Commerce & Beauty",
    domain: "hair-wellness.com",
    problem:
      "A heritage botanical hair-oil brand needed an elevated e-commerce first impression that balanced clinical trust with warm editorial luxury.",
    solution:
      "Designed a tactile, sunlit product hero with serif storytelling, transparent shipping perks, and frictionless Add-to-Cart and Quick Buy actions.",
    mockup: "/images/macbook-mockups/06-kanu-hair-wellness.webp",
    image: "/images/projects-v3/proj-22.webp",
    width: 1440,
    height: 1584,
    backdrop: "linear-gradient(135deg, #f5ebe0 0%, #ede0d4 55%, #e6ccb2 100%)",
    darkChrome: false,
  },
  {
    id: "marlton-coworking",
    number: "23",
    title: "Coworking Space Booking Platform",
    category: "Real Estate & Workspace",
    domain: "coworking-booking.com",
    problem:
      "Local founders and remote teams struggled to visualize available private offices and book tours seamlessly across desktop and mobile.",
    solution:
      "Built an inviting editorial hero with live location cards, instant tour booking CTAs, and an interactive office showcase grid.",
    mockup: "/images/macbook-mockups/03-marlton-coworking.webp",
    image: "/images/projects-v3/proj-23.webp",
    width: 1438,
    height: 1704,
    mobileImage: "/images/projects/03-marlton-coworking-mobile.webp",
    backdrop: "linear-gradient(135deg, #ede9fe 0%, #f5f3ff 55%, #e2e8f0 100%)",
    darkChrome: false,
  },
  {
    id: "specialized-vehicles",
    number: "24",
    title: "Specialized Vehicle Engineering Portal",
    category: "Industrial & Defense",
    domain: "specialized-vehicles.com",
    problem:
      "An established specialized vehicle manufacturer lacked a credible digital storefront to communicate ISO-certified engineering to institutional buyers.",
    solution:
      "Crafted a commanding, field-tested hero experience spotlighting mission-ready ambulances and defense vehicles with direct RFQ conversion paths.",
    mockup: "/images/macbook-mockups/02-specialized-vehicles.webp",
    image: "/images/projects-v3/proj-24.webp",
    width: 1439,
    height: 1405,
    backdrop: "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 50%, #f1f5f9 100%)",
    darkChrome: false,
  },
];
