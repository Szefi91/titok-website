export default function Season4Promo() {
    const features = [
        "Pszichológiai Horror",
        "Found Footage",
        "Alternate Reality Game (ARG)",
        "Interaktív Élménysorozat"
    ];

    return (
        <section className="py-20 px-4 bg-[#0b0b0b] relative overflow-hidden z-10">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-heading text-white mb-12 text-center text-glow-red">
                    MI AZ A TITOK?
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <p className="text-lg text-muted leading-relaxed">
                            A TITOK egy magyar found footage, pszichológiai horror, indie kézikamerás sorozat.
                            Rejtélyek, kódok és egy sötét történet, ami a valóság határait feszegeti.
                        </p>
                        <ul className="space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center text-lg text-white/90">
                                    <span className="w-2 h-2 bg-accent mr-3 rounded-full animate-pulse"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#050505] p-8 border border-white/10 relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-accent/50 animate-pulse" />
                        <h3 className="text-2xl font-heading text-white mb-4">STATUS: KRITIKUS HIBA</h3>
                        <div className="font-mono text-sm text-red-500/80 space-y-2">
                            <p>&gt; VALÓSÁG TÖRÉS ÉSZLELVE...</p>
                            <p>&gt; ENTITÁS: MEGFIGYELŐ JELEN VAN</p>
                            <p>&gt; FIGYELMEZTETÉS: NE MONDD KI A NEVET</p>
                            <p className="animate-pulse">&gt; IDŐVONAL TÖRLÉSE FOLYAMATBAN...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
