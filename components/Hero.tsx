"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import TypingText from "./effects/TypingText";
import Image from "next/image";

export default function Hero() {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const containerRef = useRef<HTMLElement>(null);

    // Predifined positions for TEXT clues (Pushed to far edges, strictly below header)
    const textPositions = useMemo(() => [
        { top: '20%', left: '5%' },
        { top: '22%', right: '5%' },
        { top: '45%', left: '3%' },
        { top: '48%', right: '3%' },
        { top: '70%', left: '4%' },
        { top: '72%', right: '4%' }
    ], []);

    // Predifined positions for IMAGE clues (Pushed to corners/bottom edges)
    const imagePositions = useMemo(() => [
        { bottom: '10%', left: '5%' },
        { bottom: '12%', right: '5%' },
        { bottom: '25%', left: '3%' },
        { bottom: '28%', right: '3%' },
        { bottom: '5%', left: '15%' }, // Bottom-left-ish
        { bottom: '5%', right: '15%' } // Bottom-right-ish
    ], []);
    // State for the chosen random positions
    const [cluePositions, setCluePositions] = useState<{ timestamp: any, binary: any, image1: any, image2: any } | null>(null);

    useEffect(() => {
        // Randomly pick positions for everything
        const tIdx1 = Math.floor(Math.random() * textPositions.length);
        let tIdx2 = Math.floor(Math.random() * textPositions.length);
        while (tIdx2 === tIdx1) tIdx2 = Math.floor(Math.random() * textPositions.length);

        const iIdx1 = Math.floor(Math.random() * imagePositions.length);
        let iIdx2 = Math.floor(Math.random() * imagePositions.length);
        while (iIdx2 === iIdx1) iIdx2 = Math.floor(Math.random() * imagePositions.length);

        setCluePositions({
            timestamp: textPositions[tIdx1],
            binary: textPositions[tIdx2],
            image1: imagePositions[iIdx1],
            image2: imagePositions[iIdx2]
        });

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
    }, [textPositions, imagePositions]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
            {/* Background (Gradient + Noise) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0b0b0b] to-[#050505] z-0" />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Content Container */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading mb-4 text-white tracking-widest whitespace-normal md:whitespace-nowrap flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 leading-tight">
                    <TypingText text="TITOK" speed={150} showCursor={false} />
                    <span className="text-accent">
                        <TypingText text="4. ÉVAD HAMAROSAN" speed={100} delay={1000} showCursor={true} />
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-muted mb-2 font-heading tracking-widest uppercase animate-fade-in-up delay-100 mt-4 md:mt-2 opacity-80">
                    A VALÓSÁG REPEDÉSE
                </p>

                <div className="text-sm text-gray-600 max-w-lg mx-auto mb-8 animate-fade-in-up delay-200 mt-4 font-mono">
                    &gt; SYSTEM RESTORE INITIATED...
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                    <a
                        href="https://youtube.com/@Szefistudio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white text-black font-heading uppercase tracking-widest hover:bg-gray-200 transition-colors w-full sm:w-auto text-sm"
                    >
                        Nézd YouTube-on
                    </a>
                    <a
                        href="https://www.patreon.com/c/Titoksorozat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 border border-accent text-accent font-heading uppercase tracking-widest hover:bg-accent hover:text-white transition-colors w-full sm:w-auto text-sm"
                    >
                        Patreon
                    </a>
                </div>
            </div>

            {/* Hidden Clues Layer - Revealed by Mask */}
            <div
                className="absolute inset-0 pointer-events-none z-20 overflow-hidden transition-opacity duration-75"
                style={{
                    maskImage: `radial-gradient(circle 160px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`,
                    WebkitMaskImage: `radial-gradient(circle 160px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`,
                    opacity: 'var(--flashlight-mask-opacity, 1)'
                }}
            >
                {cluePositions && (
                    <>
                        {/* Hidden Text 1: Timestamp */}
                        <div className="absolute select-none" style={cluePositions.timestamp}>
                            <div className="text-right font-mono">
                                <p className="text-accent font-bold text-lg md:text-2xl tracking-tighter">S03x07</p>
                                <p className="text-xs md:text-sm text-white/90">16:30-40</p>
                            </div>
                        </div>

                        {/* Hidden Text 2: Binary */}
                        <div className="absolute select-none" style={cluePositions.binary}>
                            <div className="font-heading">
                                <p className="text-accent/60 text-xs md:text-base tracking-widest">01001101 01000001 01010100 01000101</p>
                                <p className="text-[8px] md:text-[10px] text-white/50 mt-1 uppercase tracking-widest">Figyellek téged...</p>
                            </div>
                        </div>

                        {/* Hidden Image 1: Kos ami kussol */}
                        <div className="absolute select-none opacity-40 grayscale" style={cluePositions.image1}>
                            <div className="relative w-24 h-24 md:w-56 md:h-56">
                                <Image src="/kos_ami_kussol.png" alt="CLUE_1" fill className="object-contain" />
                                <p className="absolute -bottom-3 left-0 text-[6px] md:text-[8px] font-mono text-white/20">FILE: KOS_AMI_KUSSOL.PNG</p>
                            </div>
                        </div>

                        {/* Hidden Image 2: Maszk */}
                        <div className="absolute select-none opacity-40 grayscale" style={cluePositions.image2}>
                            <div className="relative w-24 h-24 md:w-56 md:h-56">
                                <Image src="/maszk.png" alt="CLUE_2" fill className="object-contain" />
                                <p className="absolute -bottom-3 right-0 text-[6px] md:text-[8px] font-mono text-white/20">FILE: MASZK.PNG</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-1" />
        </section>
    );
}
