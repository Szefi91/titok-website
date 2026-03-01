"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const NIGHT_START_HOUR = 23;
const NIGHT_END_HOUR = 4;

function isNightHour(hour: number) {
  return hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR;
}

type NightCaseFileProps = {
  forceOpen?: boolean;
};

export default function NightCaseFile({ forceOpen = false }: NightCaseFileProps) {
  const [hour, setHour] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const updateHour = () => setHour(new Date().getHours());
    updateHour();
    const id = window.setInterval(updateHour, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const isNight = hour !== null && isNightHour(hour);
  const isUnlocked = forceOpen || isNight;

  const slides = useMemo(
    () => [
      {
        title: "AKTA #017",
        subtitle: "ELNÉMÍTOTT CSENGŐ",
        body: "A dokumentum kizárólag éjjeli hozzáférésben nyitható. A felvétel 03:17-kor készült.",
      },
      {
        title: "MEGFIGYELÉS",
        subtitle: "ARCHÍV KÉPKOCKA",
        body: "A tárgy nappal inaktív. Éjjel rövid, lokalizálhatatlan rezonancia jelentkezik.",
      },
      {
        title: "FIGYELMEZTETÉS",
        subtitle: "KULCS SZEGMENS",
        body: "A jelenség alatt bináris sor jelenik meg: 01000101 01001100 01010011 01001111",
      },
    ],
    []
  );

  useEffect(() => {
    if (!isUnlocked) return;
    const id = window.setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [isUnlocked, slides.length]);

  if (hour === null) return null;

  return (
    <section id="night-case" className="py-16 px-4 border-t border-white/10 bg-black/70">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <h3 className="text-2xl md:text-4xl tracking-[0.18em] font-heading text-white animate-glitch">
            ÉJSZAKAI AKTA
          </h3>
          <p className="text-xs md:text-sm font-mono text-zinc-500 mt-2 tracking-widest">
            ELÉRÉSI ABLAK: 23:00 – 04:00
          </p>
        </div>

        {!isUnlocked ? (
          <div className="border border-white/10 bg-[#050505] p-8 text-center">
            <p className="font-mono text-red-900/70 tracking-[0.2em] text-xs md:text-sm">
              AKTA ZÁROLVA // IDŐABLAKON KÍVÜL
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="relative border border-white/10 bg-[#0a0a0a] overflow-hidden min-h-[340px]">
              <Image
                src="/assets/csengo-akta.jpg"
                alt="Archív csengő felvétel"
                fill
                className="object-cover grayscale contrast-125 brightness-90"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 font-mono text-[10px] md:text-xs text-zinc-300 tracking-widest">
                FILE: CSENGO_ARCHIVE_FRAME
              </div>
            </div>

            <div className="relative border border-white/10 bg-[#090909] p-6 md:p-8 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                backgroundImage:
                  "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                backgroundSize: "100% 3px",
              }} />

              <div className="relative z-10 min-h-[240px] flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.3em] text-zinc-500">SLIDE {slide + 1}/{slides.length}</p>
                  <h4 className="mt-3 text-xl md:text-2xl font-heading tracking-[0.15em] text-white">
                    {slides[slide].title}
                  </h4>
                  <p className="text-red-700 tracking-[0.2em] text-xs mt-1">{slides[slide].subtitle}</p>
                  <p className="mt-5 text-sm md:text-base text-zinc-300 leading-relaxed">{slides[slide].body}</p>
                </div>

                <div className="mt-6 flex items-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlide(idx)}
                      className={`h-1.5 flex-1 transition-all ${idx === slide ? "bg-red-700" : "bg-zinc-700/40"}`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
