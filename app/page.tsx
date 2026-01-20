import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Season4Promo from "@/components/Season4Promo";
import About from "@/components/About";
import SeasonsGrid from "@/components/SeasonsGrid";
import PatreonCTA from "@/components/PatreonCTA";
import Shop from "@/components/Shop";
import Footer from "@/components/Footer";
import CrackEffect from "@/components/effects/CrackEffect";
import FloatingQuotes from "@/components/effects/FloatingQuotes";
import FlashlightEffect from "@/components/effects/FlashlightEffect";
import GlobalSecrets from "@/components/effects/GlobalSecrets";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] relative cursor-none-custom">
      <CrackEffect />
      <FlashlightEffect />
      <GlobalSecrets />
      <FloatingQuotes />
      <Header />
      <Hero />
      <Season4Promo />
      <About />
      <SeasonsGrid />
      <PatreonCTA />
      <Shop />
      <Footer />
    </main>
  );
}
