import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Season4Promo from "@/components/Season4Promo";
import About from "@/components/About";
import SeasonsGrid from "@/components/SeasonsGrid";
import PatreonCTA from "@/components/PatreonCTA";
import Shop from "@/components/Shop";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TITOK - Horror Sorozat | Hivatalos Oldal",
  description:
    "A TITOK hivatalos oldala: epizódok, háttértartalmak, hírek és 4. évad frissítések egy helyen.",
  alternates: {
    canonical: "/",
  },
};

const seriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "TVSeries",
  name: "TITOK",
  genre: ["Horror", "Mystery", "Found Footage"],
  inLanguage: "hu",
  url: "https://titoksorozat.hu",
  image: "https://titoksorozat.hu/og-main.png",
  description:
    "Magyar horror sorozat ARG elemekkel. A TITOK univerzum hivatalos oldala epizódokkal és exkluzív tartalmakkal.",
  creator: {
    "@type": "Person",
    name: "Kornis Roland",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] relative cursor-none-custom">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesJsonLd) }} />

      <Header />
      <Hero />
      <Season4Promo />
      <About />
      <SeasonsGrid />
      <PatreonCTA />
      <Shop />

      <section className="py-20 px-4">
        <NewsletterSignup />
      </section>
      <Footer />
    </main>
  );
}
