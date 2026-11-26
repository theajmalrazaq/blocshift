import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#62abe0",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blocshift.com"),
  title: "Blocshift: Design and code for software that solves real problems",
  description:
    "Web apps, design systems, AI agents, and internal dashboards, built by one small team from sketch to launch.",
  keywords: [
    "Blocshift",
    "Digital Product Studio",
    "Web Engineering",
    "Design Systems",
    "Landing Pages",
    "Executive Dashboards",
    "AI Agents",
  ],
  authors: [{ name: "Blocshift" }],
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "Blocshift: Design and code for software that solves real problems",
    description:
      "Web apps, design systems, AI agents, and internal dashboards, built by one small team from sketch to launch.",
    url: "https://blocshift.com",
    siteName: "Blocshift",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1440,
        height: 804,
        alt: "Blocshift Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blocshift: Design and code for software that solves real problems",
    description:
      "Web apps, design systems, AI agents, and internal dashboards, built by one small team from sketch to launch.",
    images: ["/images/hero-bg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${googleSansFlex.variable} ${googleSansFlex.className}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stripBis = (root) => {
                  if (!root || root.nodeType !== 1) return;
                  if (root.hasAttribute('bis_skin_checked')) {
                    root.removeAttribute('bis_skin_checked');
                  }
                  const els = root.querySelectorAll('[bis_skin_checked]');
                  for (let i = 0; i < els.length; i++) {
                    els[i].removeAttribute('bis_skin_checked');
                  }
                };
                stripBis(document.documentElement);
                const observer = new MutationObserver((mutations) => {
                  for (let i = 0; i < mutations.length; i++) {
                    const m = mutations[i];
                    if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                      m.target.removeAttribute('bis_skin_checked');
                    } else if (m.type === 'childList') {
                      for (let j = 0; j < m.addedNodes.length; j++) {
                        stripBis(m.addedNodes[j]);
                      }
                    }
                  }
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  childList: true,
                  subtree: true,
                  attributeFilter: ['bis_skin_checked'],
                });
                window.addEventListener('load', () => {
                  setTimeout(() => observer.disconnect(), 1000);
                }, { once: true });
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${googleSansFlex.className} font-sans min-h-screen flex flex-col`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
