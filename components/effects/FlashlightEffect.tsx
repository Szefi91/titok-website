"use client";

import { useEffect, useState } from "react";

export default function FlashlightEffect() {
    const [pos, setPos] = useState({ x: -1000, y: -1000 });
    const [opacity, setOpacity] = useState(0.25); // Increased base intensity

    useEffect(() => {
        const handleMove = (clientX: number, clientY: number) => {
            setPos({ x: clientX, y: clientY });
            document.documentElement.style.setProperty("--flashlight-opacity", "1");
        };

        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const flickerTimeoutRef = { current: null as NodeJS.Timeout | null };
        const flicker = () => {
            const randomFlicker = Math.random();

            if (randomFlicker > 0.95) {
                // Big flicker (almost out)
                setOpacity(0.05);
                document.documentElement.style.setProperty("--flashlight-mask-opacity", "0.1");
                setTimeout(() => {
                    setOpacity(0.25);
                    document.documentElement.style.setProperty("--flashlight-mask-opacity", "1");
                }, 50 + Math.random() * 150);
            } else if (randomFlicker > 0.85) {
                // Subtle jitter
                setOpacity(0.2 + Math.random() * 0.1);
                document.documentElement.style.setProperty("--flashlight-mask-opacity", "0.8");
                setTimeout(() => {
                    setOpacity(0.25);
                    document.documentElement.style.setProperty("--flashlight-mask-opacity", "1");
                }, 30);
            }

            // Schedule next potential flicker at sub-second intervals
            flickerTimeoutRef.current = setTimeout(flicker, 100 + Math.random() * 2000);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchMove, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        flickerTimeoutRef.current = setTimeout(flicker, 1000);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchstart", handleTouchMove);
            window.removeEventListener("touchmove", handleTouchMove);
            if (flickerTimeoutRef.current) clearTimeout(flickerTimeoutRef.current);
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[60] pointer-events-none mix-blend-soft-light transition-opacity duration-75"
            style={{
                background: `radial-gradient(circle 280px at ${pos.x}px ${pos.y}px, rgba(255, 255, 255, ${opacity}), transparent 80%)`
            }}
        />
    );
}
