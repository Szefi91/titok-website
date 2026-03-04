"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

function One({ children = "1" }: { children?: string }) {
  return <span className="font-bold text-zinc-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]">{children}</span>;
}

function Zero({ children = "0" }: { children?: string }) {
  return <span className="font-bold text-zinc-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]">{children}</span>;
}

export default function A017Page() {
  const [notes, setNotes] = useState("");

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200 cursor-none-custom relative overflow-hidden">
      <Header />

      {/* film grain + scanline */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.03) 0 1px, transparent 1px 3px), radial-gradient(circle at 18% 22%, rgba(255,255,255,.12), transparent 30%), radial-gradient(circle at 84% 75%, rgba(255,255,255,.08), transparent 25%)",
        }}
      />

      <section className="pt-28 px-4 pb-8 relative z-[2]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-heading tracking-[0.12em] text-white animate-glitch">
            AKTA #0-A-17 — ELNÉMÍTOTT CSENGŐ
          </h1>
          <p className="font-mono text-xs tracking-[0.22em] text-zinc-500 uppercase mt-2">
            archív dosszié / belső használatra
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 relative z-[2]">
        <div className="max-w-5xl mx-auto border border-zinc-700/50 bg-[linear-gradient(135deg,#131110,#0b0a09,#151311)] shadow-[0_12px_45px_rgba(0,0,0,.55)] p-6 md:p-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <article>
              <div className="relative aspect-[4/3] border border-zinc-700/60 mb-6 overflow-hidden bg-black/50">
                <Image
                  src="/assets/csengo-akta.jpg"
                  alt="Elnémított csengő"
                  fill
                  className="object-cover grayscale contrast-125 brightness-90"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {/* lens distortion / RGB split */}
                <Image
                  src="/assets/csengo-akta.jpg"
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover opacity-[0.12] mix-blend-screen translate-x-[1px] -translate-y-[1px] hue-rotate-[210deg] saturate-150"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <Image
                  src="/assets/csengo-akta.jpg"
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover opacity-[0.10] mix-blend-screen -translate-x-[1px] translate-y-[1px] hue-rotate-[330deg] saturate-150"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 50%, transparent 44%, rgba(0,0,0,0.40) 100%)" }}
                />
              </div>

              <h2 className="font-heading text-2xl tracking-[0.08em] text-white">Jegyzőkönyvi kivonat – B-01 szektor</h2>

              <p className="mt-4 leading-relaxed font-mono text-[15px] text-zinc-300">
                A tárgy begyűjtése Budapest XVIII. kerületében történt. A helyszínre érkező egységet a B-<Zero>0</Zero><Zero>0</Zero> jelű riasztás indította,
                az esetet pedig <One>1</One>-es szintű kivizsgálásra sorolták. A lakás az épület <One>1</One>. emeletén volt,
                az ajtón külső behatolásra utaló nyomot sem rögzítettek.
              </p>

              <p className="mt-4 leading-relaxed font-mono text-[15px] text-zinc-300">
                Bent egy férfi holttestét találták a nappali közepén, a halál idejét kb. <Zero>0</Zero><One>1</One>:45-re tehető.
                A csengőt a helyszínen <One>1</One> technikai egység vizsgálta át, sérülést nem találtak.
                Nappal 12:07-kor tesztelték, semmi reagálást nem tapasztaltak, majd az éjszakai megfigyelési naplóban 22:30-nál és 23:00-nál is
                esemény nélküli bejegyzés szerepelt.
              </p>

              <p className="mt-4 leading-relaxed font-mono text-[15px] text-zinc-300">
                Az első tényleges hangimpulzust 23:0<One>1</One>-kor rögzítették. A 23:1<Zero>0</Zero>-es kontrollmérésben továbbra sem volt
                azonosítható forrás, ennek ellenére 23:2<One>1</One>, 23:3<One>1</One> és 23:4<One>1</One> időbélyeggel további rezonanciák kerültek a logba.
                Az utolsó rendszerbejegyzés 00:0<Zero>0</Zero>, ezt követően a csengő néma maradt; az ügy vizsgálata folyamatban van.
              </p>
            </article>

            <aside className="space-y-5">
              <div className="border border-zinc-700/40 bg-black/40 p-4">
                <p className="font-mono text-xs tracking-[0.22em] uppercase text-zinc-500">jegyzetblokk</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Másold ide a kiemelt mintákat, számokat..."
                  className="mt-2 w-full h-44 bg-[#090909] border border-zinc-700/50 p-3 text-sm font-mono tracking-wide text-zinc-200 focus:outline-none focus:border-red-700/60"
                />
              </div>

              <div className="border border-zinc-700/40 bg-black/40 p-4">
                <p className="font-mono text-xs tracking-[0.22em] uppercase text-zinc-500">hanganyag</p>
                <audio
                  controls
                  className="w-full mt-2 [filter:invert(1)_hue-rotate(180deg)_saturate(.6)_contrast(1.1)] opacity-90"
                >
                  <source src="/silkade.wav" type="audio/wav" />
                </audio>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
