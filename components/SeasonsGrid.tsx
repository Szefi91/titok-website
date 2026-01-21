"use client";

import { useState, useRef, useEffect } from "react";
import seasonsData from "@/data/seasons.json";

export default function SeasonsGrid() {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMove = (x: number, y: number) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: x - rect.left,
                    y: y - rect.top,
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchstart", handleTouchMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <section id="seasons" ref={containerRef} className="py-20 px-4 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-heading text-white mb-12 text-center">
                    Eddigi Évadok
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {seasonsData.seasons.map((season) => (
                        <div key={season.number} className="group relative bg-[#0b0b0b] border border-white/5 overflow-hidden hover:border-accent/30 transition-colors duration-300 flex flex-col">
                            <div className="aspect-video bg-black/50 flex items-center justify-center relative cursor-pointer group-video">
                                <div className="text-6xl font-heading text-white/10 group-hover:text-white/20 transition-colors z-10">
                                    S{season.number}
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-heading text-white mb-2">{season.title}</h3>
                                <p className="text-muted text-sm mb-6 flex-grow">{season.description}</p>

                                <a
                                    href={season.youtubePlaylistUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-accent hover:text-white uppercase text-sm tracking-wider font-bold transition-colors mt-auto"
                                >
                                    Lejátszási lista &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hidden Clues Layer for Seasons - Revealed by Flashlight */}
            <div
                className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-75"
                style={{
                    maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`,
                    WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`,
                    opacity: 'var(--flashlight-mask-opacity, 1)'
                }}
            >
                <div className="absolute top-10 right-10 text-white/40 font-mono text-xs tracking-widest uppercase">
                    add vissza...
                </div>
                <div className="absolute bottom-10 left-10 text-accent/60 font-serif italic text-2xl">
                    "silkade...."
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 font-heading text-[15rem] leading-none opacity-20">
                    TITOK
                </div>
                <div className="absolute top-2/3 right-1/4 text-white/10 font-mono text-sm opacity-30 transform rotate-12">
                    VALÓSÁG_REPEDÉS.LOG
                </div>
            </div>
        </section>
    );
}
