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
                    <div className="space-y-4">
                        <p className="text-base text-muted leading-relaxed">
                            A <span className="text-white font-medium tracking-wider">TITOK</span> sorozat alapjait Szefi és Castiel fektették le még 2012-ben. A rejtélyes formátumot a Marble Hornets áldokumentarista stílusa és a Slenderman legendája ihlette. A legfőbb koncepció a kezdetektől az volt, hogy a rettegést a lehető legvalósághűbb formában adjuk át a nézőknek.
                        </p>
                        <p className="text-base text-muted leading-relaxed">
                            A sorozat az évek során sokat fejlődött és egyre kiforrottabbá vált. A kísérletező jellegű első szezont egy tudatosabban felépített második évad követte,  bár még mindig sok improvizációt tartalmazott. A <span className="text-red-400 font-medium tracking-wider">harmadik évad</span> egy sokkal történetközpontúbb és kidolgozottabb irányba vitte el a projektet.
                        </p>
                        <p className="text-base text-muted leading-relaxed border-l-2 border-accent pl-4">
                            Sikerült felépíteni egy különleges univerzumot, ahol a különböző évadok önálló történeteket ölelnek fel, látszólag nem is kötődnek egymáshoz szorosan... <span className="text-white/80 italic">A mélyben azonban konkrét pontokon utalnak vissza a korábbi évadokra.</span>
                        </p>
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
