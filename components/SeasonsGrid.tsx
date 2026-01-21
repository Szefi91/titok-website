"use client";

import { useState, useRef, useEffect } from "react";
import seasonsData from "@/data/seasons.json";

export default function SeasonsGrid() {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const containerRef = useRef<HTMLElement>(null);
    const silkadeRef = useRef<HTMLDivElement>(null);
    const [hasPlayedSound, setHasPlayedSound] = useState(false);
    const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [audioUnlocked, setAudioUnlocked] = useState(false);

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

    // Audio unlock system - detect first user interaction
    useEffect(() => {
        const unlockAudio = () => {
            if (!audioUnlocked) {
                setAudioUnlocked(true);
                localStorage.setItem('audioUnlocked', 'true');
            }
        };

        // Check if already unlocked
        if (localStorage.getItem('audioUnlocked') === 'true') {
            setAudioUnlocked(true);
        }

        // Listen for first interaction
        window.addEventListener('click', unlockAudio, { once: true });
        window.addEventListener('touchstart', unlockAudio, { once: true });
        window.addEventListener('keydown', unlockAudio, { once: true });

        return () => {
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };
    }, [audioUnlocked]);

    // Detect hover over silkade text
    useEffect(() => {
        const checkHover = () => {
            if (!silkadeRef.current || hasPlayedSound) return;

            const rect = silkadeRef.current.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();

            if (!containerRect) return;

            // Use viewport coordinates directly (mousePos is already relative to container)
            // Convert to viewport coordinates
            const viewportX = mousePos.x + (containerRect?.left || 0);
            const viewportY = mousePos.y + (containerRect?.top || 0);

            // Check if mouse is over the element (with padding for flashlight radius)
            const isHovering =
                viewportX >= rect.left - 100 &&
                viewportX <= rect.right + 100 &&
                viewportY >= rect.top - 100 &&
                viewportY <= rect.bottom + 100;

            if (isHovering) {
                // Start timer if not already started
                if (!hoverTimerRef.current) {
                    hoverTimerRef.current = setTimeout(() => {
                        if (audioUnlocked) {
                            playRandomSound();
                            setHasPlayedSound(true);
                        }
                    }, 1500); // 1.5 seconds hover
                }
            } else {
                // Clear timer if mouse moves away
                if (hoverTimerRef.current) {
                    clearTimeout(hoverTimerRef.current);
                    hoverTimerRef.current = null;
                }
            }
        };

        checkHover();
    }, [mousePos, hasPlayedSound]);

    const playRandomSound = () => {
        const sounds = ['/silkade.wav', '/silkade2.wav', '/silkade3.wav'];
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

        console.log('Attempting to play:', randomSound);
        const audio = new Audio(randomSound);
        audio.volume = 0.4; // Hangosabb
        audio.play().catch(err => console.log('Audio play failed:', err));
    };

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
                <div ref={silkadeRef} className="absolute bottom-10 left-10 text-accent/60 font-serif italic text-2xl">
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
