"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function GlobalSecrets() {
    const [scareActive, setScareActive] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const inputBuffer = useRef("");
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const scrollCount = useRef(0);

    // 1. Secret Code Listener: "TITOK"
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.length !== 1) return;
            inputBuffer.current = (inputBuffer.current + e.key.toUpperCase()).slice(-5);

            if (inputBuffer.current === "TITOK") {
                triggerEyeScare();
                inputBuffer.current = "";
            }
        };

        const triggerEyeScare = () => {
            setScareActive(true);
            setTimeout(() => setScareActive(false), 3500);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // 2. Ghost Scroll Logic
    useEffect(() => {
        const resetIdle = () => {
            setIsIdle(false);
            scrollCount.current = 0;
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => setIsIdle(true), 20000); // 20s idle
        };

        window.addEventListener("mousemove", resetIdle);
        window.addEventListener("mousedown", resetIdle);
        window.addEventListener("touchstart", resetIdle);
        window.addEventListener("keydown", resetIdle);

        resetIdle();

        return () => {
            window.removeEventListener("mousemove", resetIdle);
            window.removeEventListener("mousedown", resetIdle);
            window.removeEventListener("touchstart", resetIdle);
            window.removeEventListener("keydown", resetIdle);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isIdle) {
                scrollCount.current += 1;

                if (scrollCount.current >= 3) {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth"
                    });
                    scrollCount.current = 0;
                    // Trigger the hint event in Shop.tsx
                    window.dispatchEvent(new CustomEvent("ghost-scroll-complete"));
                } else {
                    window.scrollBy({
                        top: 250,
                        behavior: "smooth"
                    });
                }
            }
        }, 5000); // Check every 5s when idle
        return () => clearInterval(interval);
    }, [isIdle]);

    if (!scareActive) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center animate-in fade-in duration-500">
            <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                <Image
                    src="/eye.gif"
                    alt="WATCHING"
                    fill
                    className="object-contain"
                    unoptimized
                />
            </div>
            <div className="absolute inset-0 bg-red-900/10 pointer-events-none animate-pulse z-[201]" />
            <div className="absolute inset-0 bg-black/40 pointer-events-none z-[199]" />
        </div>
    );
}
