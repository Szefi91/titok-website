"use client";

import { useEffect, useState } from "react";
import TypingText from "./effects/TypingText";

export default function Shop() {
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const handleHint = () => setShowHint(true);
        window.addEventListener("ghost-scroll-complete", handleHint);
        return () => window.removeEventListener("ghost-scroll-complete", handleHint);
    }, []);

    const items = [
        { id: 1, name: "VHS Kazetta (Törölt jelenetek)", price: "TITOK", status: "ELFOGYOTT" },
        { id: 2, name: "A Maszk (Replika)", price: "---", status: "TILTOTT" },
        { id: 3, name: "Megfigyelő Napló", price: "---", status: "HIÁNYCIKK" }
    ];

    return (
        <section id="shop" className="py-24 px-4 bg-[#080808] border-y border-white/5">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading text-white mb-4 tracking-widest text-shadow-glow">SHOP</h2>
                    <div className="inline-block px-4 py-1 bg-accent/10 border border-accent/20 text-accent text-xs tracking-[0.3em] font-bold uppercase">
                        Hamarosan Nyit
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {items.map(item => (
                        <div
                            key={item.id}
                            className="group relative bg-black/40 border border-white/5 p-10 hover:border-red-900/50 active:border-red-600 transition-all duration-300 overflow-hidden cursor-not-allowed min-h-[300px] flex flex-col justify-center"
                            onClick={(e) => {
                                // On mobile, a click can trigger the hover state
                                // We don't need extra JS necessarily if we use active: classes
                            }}
                        >
                            {/* Hidden "Not Available" overlay - Hungarian */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none z-10 bg-black/90">
                                <span className="text-red-600 font-heading text-xl tracking-[0.1em] text-center px-6 leading-tight">
                                    A TARTALOM <br /> NEM ELÉRHETŐ
                                </span>
                            </div>

                            <div className="relative z-0 group-hover:blur-md transition-all duration-500">
                                <p className="text-accent text-xs font-mono mb-2">ID: 00{item.id}_ERR</p>
                                <h3 className="text-white font-heading text-2xl md:text-3xl mb-6 leading-tight underline decoration-red-900/30 underline-offset-8 decoration-1">{item.name}</h3>
                                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                    <span className="text-muted text-sm font-mono">{item.price}</span>
                                    <span className="text-red-900 font-bold text-xs tracking-widest border border-red-900/30 px-3 py-1 bg-red-900/5">
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 border border-dashed border-white/5 text-center min-h-[120px] flex flex-col items-center justify-center">
                    <p className="text-muted font-mono text-xs uppercase tracking-[0.5em] opacity-20">
                        &gt; AZ ADATOK TITKOSÍTÁS ALATT ÁLLNAK...
                    </p>
                    {showHint && (
                        <div className="mt-4 text-red-600 font-mono text-sm tracking-widest uppercase">
                            <TypingText text="csak pötyögd be hogy T-I-T-O-K" speed={50} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
