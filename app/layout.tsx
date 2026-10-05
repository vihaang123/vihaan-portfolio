import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CaseStudyProvider } from "@/components/case-study/CaseStudyProvider";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/Motion";
import { Navbar } from "@/components/Navbar";
import { isFilled, links, site } from "@/lib/content";
import "./globals.css";

// Self-hosted variable fonts (SIL Open Font License, see app/fonts/).
// Keeps the site fast, private, and independent of any font CDN.
const geistSans = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

// Display face for headings. Variable on weight (200 to 800), width (75 to 100)
// and optical size (12 to 96). Bricolage Grotesque, SIL Open Font License.
const bricolage = localFont({
  src: "./fonts/Bricolage-Variable.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f6f1",
  width: "device-width",
  initialScale: 1,
};

const sameAs = [links.linkedin, links.github].filter(isFilled);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Founder & CEO",
  worksFor: { "@type": "Organization", name: site.company },
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  description: site.description,
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
    >
      <body>
        <a
          href="#main"
          className="label sr-only rounded-sm bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <MotionProvider>
          <CaseStudyProvider>
            {/* #site is made inert while a case study is open (see useDialogBehavior). */}
            <div id="site">
              <Navbar />
              <main id="main">{children}</main>
              <Footer />
            </div>
          </CaseStudyProvider>
        </MotionProvider>
        <Cursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
