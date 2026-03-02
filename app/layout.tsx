import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import GlobalSecrets from "@/components/effects/GlobalSecrets";
import VisibilityHandler from "@/components/effects/VisibilityHandler";
import CrackEffect from "@/components/effects/CrackEffect";
import FlashlightEffect from "@/components/effects/FlashlightEffect";
import FloatingQuotes from "@/components/effects/FloatingQuotes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const siteUrl = "https://titoksorozat.hu";
const siteTitle = "TITOK - Horror Sorozat | 4. Évad";
const siteDescription =
  "A TITOK horror sorozat hivatalos oldala. 4. évad hamarosan. Nézd vissza az előző évadokat, és csatlakozz a rejtélyhez.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "TITOK",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Titok sorozat",
    "magyar horror sorozat",
    "Titok 4. évad",
    "ARG horror",
    "found footage",
  ],
  openGraph: {
    title: siteTitle,
    description: "A hivatalos oldal, ahol megtalálsz mindent az eddigi és készülő projektről.",
    url: siteUrl,
    siteName: "TITOK",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "TITOK 4. ÉVAD HAMAROSAN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: "A hivatalos oldal, ahol megtalálsz mindent az eddigi és készülő projektről.",
    images: ["/og-main.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3063723181881847" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3063723181881847"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.variable} ${oswald.variable} antialiased bg-[#050505] text-[#E6E6E6] relative`}>
        <VisibilityHandler />
        <CrackEffect />
        <FlashlightEffect />
        <GlobalSecrets />
        <FloatingQuotes />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
