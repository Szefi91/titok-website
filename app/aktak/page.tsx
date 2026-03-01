import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NightCaseFile from "@/components/NightCaseFile";

export const metadata = {
  title: "AKTÁK | TITOK",
  description: "Rejtett akták és anomália dossziék",
};

export default function AktakPage() {
  const devUnlock = process.env.NODE_ENV !== "production";

  return (
    <main className="min-h-screen bg-[#050505] cursor-none-custom">
      <Header />

      <section className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading tracking-[0.18em] text-white">AKTÁK</h1>
          <p className="text-zinc-500 font-mono text-xs tracking-[0.25em] mt-4 uppercase">
            Rejtett dossziék / anomália naplók
          </p>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="group relative bg-black/40 border border-white/5 p-10 hover:border-red-900/50 transition-all duration-300 overflow-hidden min-h-[260px] flex flex-col justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 bg-black/90">
              <div className="text-center px-6">
                <p className="text-red-600 font-heading text-2xl tracking-[0.1em] leading-tight">AKTA ZÁROLVA</p>
                <p className="text-zinc-400 font-mono text-[10px] md:text-xs tracking-[0.25em] mt-3 uppercase">
                  ELÉRÉSI ABLAK: 23:00 – 04:00
                </p>
              </div>
            </div>

            <div className="relative z-0 group-hover:blur-md transition-all duration-500">
              <p className="text-accent text-xs font-mono mb-2">ID: A-017</p>
              <h3 className="text-white font-heading text-2xl md:text-3xl mb-6 leading-tight underline decoration-red-900/30 underline-offset-8 decoration-1">
                ELNÉMÍTOTT CSENGŐ
              </h3>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-muted text-sm font-mono">ARCHÍV DOSSZIÉ</span>
                <span className="text-red-900 font-bold text-xs tracking-widest border border-red-900/30 px-3 py-1 bg-red-900/5">
                  ZÁROLT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NightCaseFile forceOpen={devUnlock} />
      <Footer />
    </main>
  );
}
