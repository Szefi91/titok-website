export default function PatreonCTA() {
    return (
        <section id="patreon" className="py-20 px-4 bg-[#050505] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 opacity-10 blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-7xl text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
                    CSATLAKOZZ A BELSŐ KÖRHÖZ
                </h2>

                <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
                    Ha tetszik a sorozat és szeretnéd, hogy még durvább legyen a 4. évad, a Patreon tartja életben a rémálmot.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 items-stretch">

                    {/* Tier 1 - Támogató */}
                    <a 
                        href="https://www.patreon.com/checkout/Titoksorozat?rid=27735252&vanity=7843843" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#0b0b0b] border border-green-900/30 p-6 rounded-sm hover:border-green-500/50 transition-all hover:scale-[1.02] flex flex-col text-left no-underline group"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <h3 className="text-xl font-heading text-white font-medium uppercase tracking-tight">TIER 1 – „Támogató”</h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$6.50 <span className="text-sm font-normal text-muted">/ hó (+ÁFA)</span></p>
                        <p className="text-sm text-gray-400 mb-6 italic">Ez az alap, stabil réteg.</p>

                        <div className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                            <p><strong className="text-white">Mit kap:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-1 marker:text-green-800">
                                <li>Patreon-exkluzív képek</li>
                                <li>Szavazásokban részvétel</li>
                                <li>Korai értesítés fázisokról</li>
                                <li>Patreon-exkluzív posztok</li>
                            </ul>
                        </div>
                        <div className="w-full py-3 bg-white/5 group-hover:bg-green-600/20 text-white text-center font-heading uppercase transition-colors rounded border border-white/5">Csatlakozás</div>
                    </a>

                    {/* Tier 2 - Bennfentes */}
                    <a 
                        href="https://www.patreon.com/checkout/Titoksorozat?rid=27735292&vanity=7843843" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#0b0b0b] border border-blue-900/30 p-6 rounded-sm hover:border-blue-500/50 transition-all hover:scale-[1.02] flex flex-col text-left no-underline group relative"
                    >
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-sm z-20">
                            Népszerű
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                            <h3 className="text-xl font-heading text-white font-medium uppercase tracking-tight">TIER 2 – „Bennfentes”</h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$11 <span className="text-sm font-normal text-muted">/ hó (+ÁFA)</span></p>
                        <p className="text-sm text-gray-400 mb-6 italic">Látnod kell, amit más nem lát!</p>

                        <div className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                            <p><strong className="text-white">Mit kap:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-1 marker:text-blue-800">
                                <li><strong className="text-white">Minden az előzőből</strong></li>
                                <li>Epizódok <strong className="text-white text-blue-400">24-48 órával hamarabb</strong></li>
                                <li>Extra képek / snittek</li>
                                <li>Patreon-exkluzív magyarázók</li>
                                <li>Szavazásoknál nagyobb súly</li>
                            </ul>
                        </div>
                        <div className="w-full py-3 bg-blue-600 group-hover:bg-blue-500 text-white text-center font-heading uppercase transition-colors rounded shadow-lg shadow-blue-900/20">Csatlakozás</div>
                    </a>

                    {/* Tier 3 - Kredites */}
                    <a 
                        href="https://www.patreon.com/checkout/Titoksorozat?rid=27735356&vanity=7843843" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#0b0b0b] border border-purple-900/30 p-6 rounded-sm hover:border-purple-500/50 transition-all hover:scale-[1.02] flex flex-col text-left no-underline group"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            <h3 className="text-xl font-heading text-white font-medium uppercase tracking-tight">TIER 3 – „Kredites”</h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$16 <span className="text-sm font-normal text-muted">/ hó (+ÁFA)</span></p>
                        <p className="text-sm text-gray-400 mb-6 italic">Neved legyen a stáblistában!</p>

                        <div className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                            <p><strong className="text-white">Mit kap:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-1 marker:text-purple-800">
                                <li><strong className="text-white">Minden fentebb</strong></li>
                                <li><strong className="text-white text-purple-400">Név a stáblistában</strong></li>
                                <li>Patreon-exkluzív képcsomagok</li>
                                <li>Infók jövőbeli projektekről</li>
                                <li>Hosszabb, személyesebb posztok</li>
                            </ul>
                        </div>
                        <div className="w-full py-3 bg-white/5 group-hover:bg-purple-600/20 text-white text-center font-heading uppercase transition-colors rounded border border-white/5">Csatlakozás</div>
                    </a>

                    {/* Tier 4 - Őrző */}
                    <a 
                        href="https://www.patreon.com/checkout/Titoksorozat?rid=27735440&vanity=7843843" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-[#0b0b0b] border border-red-900/40 p-6 rounded-sm hover:border-red-500/60 transition-all hover:scale-[1.05] flex flex-col text-left no-underline group shadow-[0_0_30px_rgba(220,38,38,0.05)] border-t-red-600/40"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                            <h3 className="text-xl font-heading text-white flex items-center gap-2">
                                TIER 4 – 🔒 Őrző
                            </h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$31.50 <span className="text-sm font-normal text-muted">/ hó (+ÁFA)</span></p>
                        <p className="text-sm text-red-500/80 mb-6 font-medium tracking-tight italic">Te tartod életben a TITKOT.</p>

                        <div className="space-y-3 text-sm text-gray-300 mb-6 flex-grow">
                            <p><strong className="text-white">Mit kap:</strong></p>
                            <ul className="list-disc list-inside space-y-1 pl-1 marker:text-red-700">
                                <li className="font-bold text-white">Minden az összes tierből</li>
                                <li className="text-red-400 font-medium">Kiemelt név a kreditekben</li>
                                <li>Kérdések megválaszolása közvetlen</li>
                                <li>Elsőbbség fizikai termékekre</li>
                                <li className="text-red-500 font-bold">Ajándék TITOK feliratos póló</li>
                            </ul>
                        </div>
                        <div className="w-full py-3 bg-red-600/20 group-hover:bg-red-600 text-white text-center font-heading uppercase transition-all rounded border border-red-600/50 shadow-lg shadow-red-900/40">Csatlakozás</div>
                    </a>

                </div>

                <p className="text-sm text-muted">
                    Ha szeretnél többel támogatni, a Patreonon lehetőséged van az összeg szabad megadására.
                </p>
            </div>
        </section>
    );
}
