import type { Metadata, Viewport } from "next";
import { Cinzel, Jost, Libre_Caslon_Text } from "next/font/google";
import "./globals.css";
import { brand, seo, faq } from "@/content/site";
import MotionProvider from "@/components/ui/MotionProvider";
import RemovalsCursor from "@/components/ui/RemovalsCursor";
import ButtonFX from "@/components/ui/ButtonFX";

/* Elegant serif headings, Trajan-style logo caps, clean modern body text */
const display = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const logoFont = Cinzel({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-logo", display: "swap" });
const sans = Jost({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  openGraph: { title: seo.title, description: seo.description, siteName: brand.name, locale: "en_GB", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0F2340", width: "device-width", initialScale: 1 };

/* TODO: add telephone, email, address and areaServed once confirmed */
const jsonLd = [
  { "@context": "https://schema.org", "@type": ["MovingCompany", "LocalBusiness"], name: brand.name, slogan: brand.tagline, url: seo.url },
  { "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${logoFont.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory">Skip to content</a>
        <MotionProvider>{children}<RemovalsCursor /><ButtonFX /></MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
