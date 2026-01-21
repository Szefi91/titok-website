import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TITOK - Horror Sorozat | 4. Évad",
  description: "A TITOK horror sorozat hivatalos oldala. 4. évad hamarosan. Nézd vissza az előző évadokat, és csatlakozz a rejtélyhez.",
  openGraph: {
    title: "TITOK - Horror Sorozat | 4. Évad",
    description: "A hivatalos oldal, ahol megtalálsz mindent az eddigi és készülő projektről",
    url: "https://titoksorozat.hu",
    siteName: "TITOK",
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TITOK - Horror Sorozat | 4. Évad",
    description: "A hivatalos oldal, ahol megtalálsz mindent az eddigi és készülő projektről",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-[#050505] text-[#E6E6E6]`}
      >
        {/* te meg mit nézelödsz itt? */}
        {children}
      </body>
    </html>
  );
}
