"use client";

import { useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { isAktaTimeWindow } from "@/lib/features";

export default function AktakPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isWindowOpen = process.env.NODE_ENV === "development" || isAktaTimeWindow();

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

      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {isWindowOpen ? (
            <Link href="/aktak/a-017" className="block">
              <div
                ref={cardRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={onMove}
                className="group relative bg-[#050505] border border-red-900/30 p-10 transition-all duration-300 overflow-hidden min-h-[260px] flex flex-col justify-center cursor-pointer hover:border-red-600/50"
              >
              {/* Overlay: fixen rajta van, nem lehet átlátni. Flashlight csak a szöveget fedi fel. */}
              <div className="absolute inset-0 z-20 bg-[#050505] flex flex-col items-center justify-center">
                <div className="absolute inset-0 border border-red-900/10 pointer-events-none" />
                
                <span className="text-red-600 font-heading text-2xl tracking-[0.1em] text-center px-6 leading-tight select-none drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse">
                  AKTA ZÁROLVA
                </span>

                {/* Reveal layer: Alapból invisible, flashlighttal visible */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
                  style={{
                    maskImage: `radial-gradient(circle 220px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 84%)`,
                    WebkitMaskImage: `radial-gradient(circle 220px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 84%)`,
                  }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-[60%] -translate-y-1/2 w-[320px] max-w-[90%]">
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400 whitespace-nowrap text-center bg-[#050505] px-2 py-1 border border-zinc-800">
                      ELÉRÉSI ABLAK: 23:00 – 04:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Mögöttes tartalom (elhomályosítva/takarva, de struktúra miatt itt van) */}
              <div className="relative z-0 opacity-10 blur-sm grayscale pointer-events-none select-none">
                <p className="text-accent text-xs font-mono mb-2">AKTA #0-A-17</p>
                <h3 className="text-zinc-600 font-heading text-2xl md:text-3xl mb-3 leading-tight underline decoration-red-900/30 underline-offset-8 decoration-1">
                  ELNÉMÍTOTT CSENGŐ
                </h3>
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/5">
                  <span className="text-muted text-sm font-mono">ARCHÍV DOSSZIÉ</span>
                  <span className="text-zinc-800 font-bold text-xs tracking-widest border border-zinc-800 px-3 py-1">
                    ZÁROLT
                  </span>
                </div>
              </div>
              </div>
            </Link>
          ) : (
            <div
              ref={cardRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onMouseMove={onMove}
              className="group relative bg-[#050505] border border-red-900/30 p-10 transition-all duration-300 overflow-hidden min-h-[260px] flex flex-col justify-center cursor-not-allowed"
              aria-disabled="true"
            >
              {/* Overlay: fixen rajta van, nem lehet átlátni. Flashlight csak a szöveget fedi fel. */}
              <div className="absolute inset-0 z-20 bg-[#050505] flex flex-col items-center justify-center">
                <div className="absolute inset-0 border border-red-900/10 pointer-events-none" />

                <span className="text-red-600 font-heading text-2xl tracking-[0.1em] text-center px-6 leading-tight select-none drop-shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse">
                  AKTA ZÁROLVA
                </span>

                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
                  style={{
                    maskImage: `radial-gradient(circle 220px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 84%)`,
                    WebkitMaskImage: `radial-gradient(circle 220px at ${mouse.x}px ${mouse.y}px, black 0%, transparent 84%)`,
                  }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 top-[60%] -translate-y-1/2 w-[320px] max-w-[90%]">
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-400 whitespace-nowrap text-center bg-[#050505] px-2 py-1 border border-zinc-800">
                      ELÉRÉSI ABLAK: 23:00 – 04:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-0 opacity-10 blur-sm grayscale pointer-events-none select-none">
                <p className="text-accent text-xs font-mono mb-2">AKTA #0-A-17</p>
                <h3 className="text-zinc-600 font-heading text-2xl md:text-3xl mb-3 leading-tight underline decoration-red-900/30 underline-offset-8 decoration-1">
                  ELNÉMÍTOTT CSENGŐ
                </h3>
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/5">
                  <span className="text-muted text-sm font-mono">ARCHÍV DOSSZIÉ</span>
                  <span className="text-zinc-800 font-bold text-xs tracking-widest border border-zinc-800 px-3 py-1">
                    ZÁROLT
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
