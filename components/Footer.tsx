"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Footer() {
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
        <footer ref={containerRef} className="relative py-12 bg-black border-t border-white/10 text-center overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex justify-center space-x-8 mb-8">
                    <a href="https://youtube.com/@Szefistudio" target="_blank" className="text-muted hover:text-white transition-colors">Szefistudio</a>
                    <a href="https://www.patreon.com/c/Titoksorozat" target="_blank" className="text-muted hover:text-white transition-colors">Patreon</a>
                </div>

                <p className="text-white font-heading text-2xl tracking-widest mb-4">TITOK</p>

                <p className="text-xs text-zinc-600">
                    &copy; {new Date().getFullYear()} Minden jog fenntartva.
                    <br />
                    Az oldal cookie-kat használ (csak a rettegés fokozására).
                </p>
            </div>

            {/* Hidden Clue Layer for Footer */}
            <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                    maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`,
                    WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`
                }}
            >
                <div className="absolute top-1/2 left-10 md:left-40 -translate-y-1/2 opacity-30 grayscale w-32 h-32">
                    <Image src="/maszk.png" alt="HIDDEN_MASK" fill className="object-contain" />
                </div>

                <div className="absolute top-1/2 right-10 md:right-40 -translate-y-1/2 text-white/10 font-mono text-[10px] text-right hidden lg:block">
                    [HIBÁS EMLÉK] <br />
                    MOND KI <br />
                    A NEVÉT
                </div>
            </div>
        </footer>
    );
}
