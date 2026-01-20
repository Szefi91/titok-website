"use client";

import { useEffect, useState } from "react";

export default function CrackEffect() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        // Random chance to trigger (e.g., 20% chance = 1 in 5)
        const shouldTrigger = Math.random() < 0.2;

        if (shouldTrigger) {
            setActive(true);
            const timer = setTimeout(() => setActive(false), 200); // Quick flash
            return () => clearTimeout(timer);
        }
    }, []);

    if (!active) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none mix-blend-difference opacity-80 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.5]" preserveAspectRatio="none">
                <path d="M0 0 L40 40 L30 60 L60 50 L80 80 L100 100" vectorEffect="non-scaling-stroke" />
                <path d="M40 40 L20 20" />
                <path d="M40 40 L60 20" />
                <path d="M60 50 L90 40" />
                <path d="M30 60 L10 80" />
                <path d="M50 50 L55 55" strokeWidth="2" />
            </svg>
            <div className="absolute inset-0 bg-red-500/10 translate-x-1 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-blue-500/10 -translate-x-1 mix-blend-overlay"></div>
        </div>
    );
}
