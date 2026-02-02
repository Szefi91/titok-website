"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdatkezelesPage() {
    return (
        <main className="min-h-screen bg-[#050505] relative cursor-none-custom">
            <Header />

            <section className="pt-32 pb-20 px-4 max-w-4xl mx-auto font-mono text-zinc-400 leading-relaxed">
                <h1 className="text-3xl md:text-5xl font-heading text-white mb-12 tracking-widest text-shadow-glow">
                    ADATKEZELÉSI TÁJÉKOZTATÓ
                </h1>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-heading text-red-900 mb-4 tracking-wider uppercase">1. AZ ADATKEZELŐ ADATAI</h2>
                        <div className="bg-white/5 p-6 border border-white/10 space-y-2">
                            <p><span className="text-white">Név / Adatkezelő:</span> Kornis Roland</p>
                            <p><span className="text-white">Adószám:</span> 48660798-1-30</p>
                            <p><span className="text-white">Kapcsolat / Email:</span> Szefi91@gmail.com</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-heading text-red-900 mb-4 tracking-wider uppercase">2. AZ ADATKEZELÉS CÉLJA ÉS JOGALAPJA</h2>
                        <p>
                            A weboldalon történő feliratkozás során megadott adatokat (Név, Email cím) hírlevél küldése, projektfrissítések megosztása, valamint közösségi felhívások és casting lehetőségek kommunikálása céljából kezeljük.
                        </p>
                        <p className="mt-4">
                            Az adatkezelés jogalapja az Ön önkéntes hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-heading text-red-900 mb-4 tracking-wider uppercase">3. AZ ADATKEZELÉS IDŐTARTAMA</h2>
                        <p>
                            Az adatokat a hozzájárulás visszavonásáig (leiratkozásig) tároljuk. Ön bármikor kérheti adatainak törlését a hírlevél alján található leiratkozás gombra kattintva, vagy az adatkezelőnek küldött emailben.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-heading text-red-900 mb-4 tracking-wider uppercase">4. AZ ÖN JOGAI</h2>
                        <p>
                            Ön bármikor kérhet tájékoztatást személyes adatai kezeléséről, kérheti azok helyesbítését, törlését vagy kezelésének korlátozását, valamint tiltakozhat az adatkezelés ellen.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-[10px] opacity-40">
                    UTOLSÓ FRISSÍTÉS: 2024. 02. 02.
                </div>
            </section>

            <Footer />
        </main>
    );
}
