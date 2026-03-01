import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Season4Promo from "@/components/Season4Promo";
import About from "@/components/About";
import SeasonsGrid from "@/components/SeasonsGrid";
import PatreonCTA from "@/components/PatreonCTA";
import Shop from "@/components/Shop";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] relative cursor-none-custom">
      <Header />
      <Hero />
      <Season4Promo />
      <About />
      <SeasonsGrid />
      <PatreonCTA />
      <Shop />
      <section className="py-12 px-4 border-t border-white/10 bg-[#070707]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-xs tracking-[0.25em] text-zinc-500 uppercase">Rejtett dossziék</p>
          <a
            href="/aktak"
            className="inline-block mt-4 px-8 py-3 border border-red-900/40 text-red-700 hover:text-white hover:bg-red-900/20 transition-colors font-heading tracking-[0.15em] uppercase"
          >
            AKTÁK MEGNYITÁSA
          </a>
        </div>
      </section>
      <section className="py-20 px-4">
        <NewsletterSignup />
      </section>
      <Footer />
    </main>
  );
}
