export default function PatreonCTA() {
    return (
        <section id="patreon" className="py-20 px-4 bg-[#050505] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 opacity-10 blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-6xl text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
                    CSATLAKOZZ A BELSŐ KÖRHÖZ
                </h2>

                <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
                    Ha tetszik a sorozat és szeretnéd, hogy még durvább legyen a 4. évad, a Patreon tartja életben a rémálmot.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12 items-stretch">

                    {/* Tier 1 - Támogató */}
                    <div className="bg-[#0b0b0b] border border-green-900/30 p-6 rounded-sm hover:border-green-500/50 transition-colors flex flex-col text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <h3 className="text-xl font-heading text-white">TIER 1 – „Támogató”</h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$6.50 <span className="text-sm font-normal text-muted">/ month (+VAT)</span></p>
                        <p className="text-sm text-gray-400 mb-6 italic">Ez az alap, stabil réteg.</p>

                        <div className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                            <p><strong className="text-white">Mit kap:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-1">
                                <li>Patreon-only képek (hangulatképek, backstage)</li>
                                <li>Szavazásokban részvétel</li>
                                <li>Korai értesítés, mikor jön új rész</li>
                                <li>Patreon-only posztok (rövid gondolatok)</li>
                            </ul>
                        </div>
                        <a href="https://www.patreon.com/c/Titoksorozat" target="_blank" className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-center font-heading uppercase transition-colors rounded">Join</a>
                    </div>

                    {/* Tier 2 - Bennfentes */}
                    <div className="bg-[#0b0b0b] border border-blue-900/30 p-6 rounded-sm hover:border-blue-500/50 transition-colors flex flex-col text-left relative transform md:-translate-y-2 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        <div className="absolute top-0 center left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                            Népszerű
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <h3 className="text-xl font-heading text-white">TIER 2 – „Bennfentes”</h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$11 <span className="text-sm font-normal text-muted">/ month (+VAT)</span></p>
                        <p className="text-sm text-gray-400 mb-6 italic">Látnod kell, amit más nem láthat!</p>

                        <div className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                            <p><strong className="text-white">Mit kap:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-1">
                                <li><strong className="text-white">Minden az előzőből</strong></li>
                                <li>Epizódok <strong className="text-white">24-48 órával hamarabb</strong></li>
                                <li>Extra képek / snittek, amik máshol nem jelennek meg</li>
                                <li>Patreon-only magyarázós posztok</li>
                                <li>Szavazásoknál <strong className="text-white">nagyobb súly</strong></li>
                            </ul>
                        </div>
                        <a href="https://www.patreon.com/c/Titoksorozat" target="_blank" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-center font-heading uppercase transition-colors rounded shadow-lg shadow-blue-900/20">Join</a>
                    </div>

                    {/* Tier 3 - Kredites */}
                    <div className="bg-[#0b0b0b] border border-purple-900/30 p-6 rounded-sm hover:border-purple-500/50 transition-colors flex flex-col text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <h3 className="text-xl font-heading text-white">TIER 3 – „Kredites”</h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$16 <span className="text-sm font-normal text-muted">/ month (+VAT)</span></p>
                        <p className="text-sm text-gray-400 mb-6 italic">Neved legyen a stáblistában!</p>

                        <div className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                            <p><strong className="text-white">Mit kap:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-1">
                                <li><strong className="text-white">Minden fentebb</strong></li>
                                <li><strong className="text-white">Név megjelenik a videók kreditjeiben</strong></li>
                                <li>Patreon-only képcsomagok (letölthető)</li>
                                <li>Előzetes infók jövőbeli projektekről</li>
                                <li>Hosszabb, személyesebb posztok (nem publikus)</li>
                            </ul>
                        </div>
                        <a href="https://www.patreon.com/c/Titoksorozat" target="_blank" className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-center font-heading uppercase transition-colors rounded">Join</a>
                    </div>

                </div>

                <p className="text-sm text-muted">
                    Ha szeretnél többel támogatni, a Patreonon lehetőséged van az összeg szabad megadására.
                </p>
            </div>
        </section>
    );
}
