"use client";

import { useEffect, useState } from "react";

export default function FlashlightEffect() {
    const [pos, setPos] = useState({ x: -1000, y: -1000 });
    const [opacity, setOpacity] = useState(0.25); // Increased base intensity

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            // Set CSS variables for masked elements to use the same opacity/flicker
            document.documentElement.style.setProperty("--flashlight-opacity", "1");
        };

        // Flickering logic
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
            setTimeout(flicker, 100 + Math.random() * 2000);
        };

        window.addEventListener("mousemove", handleMouseMove);
        const flickerTimeout = setTimeout(flicker, 1000);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(flickerTimeout);
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
