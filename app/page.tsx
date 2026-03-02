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
    "A TITOK hivatalos oldala: epizódok, háttértartalmak, AKTÁK, hírek és 4. évad frissítések egy helyen.",
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

      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto border border-white/10 bg-black/30 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-heading tracking-[0.08em] text-white mb-4">Mi a TITOK sorozat?</h2>
          <p className="text-zinc-300 leading-relaxed">
            A TITOK egy magyar horror sorozat, amely found-footage és ARG elemeket használ. A történet évadokon át
            épül, visszatérő karakterekkel, rejtett nyomokkal és közösségi megfejtésekkel.
          </p>
          <p className="text-zinc-400 leading-relaxed mt-3">
            Az oldalon epizódok, háttéranyagok, AKTÁK, hírek és 4. évad frissítések találhatók. Ha szereted a sötét,
            nyomozós, rejtélyes univerzumokat, itt jó helyen vagy.
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <NewsletterSignup />
      </section>
      <Footer />
    </main>
  );
}
