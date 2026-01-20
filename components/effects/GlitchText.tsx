"use client";

import { useState, useEffect, useMemo } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
}

export default function GlitchText({ text, className = "", as: Component = "span" }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    // Create random strip configurations
    const stripCount = 8;
    const strips = useMemo(() => {
        return Array.from({ length: stripCount }).map((_, i) => ({
            id: i,
            top: `${(100 / stripCount) * i}%`,
            height: `${100 / stripCount}%`,
            offset: (Math.random() - 0.5) * 15 + "px",
            delay: Math.random() * 2 + "s"
        }));
    }, []);

    useEffect(() => {
        let mounted = true;
        const triggerGlitch = () => {
            if (!mounted) return;
            setIsGlitching(true);
            setTimeout(() => {
                if (mounted) setIsGlitching(false);
            }, 200 + Math.random() * 300);

            const nextTime = 4000 + Math.random() * 8000;
            setTimeout(triggerGlitch, nextTime);
        };

        const timer = setTimeout(triggerGlitch, 3000);
        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, []);

    return (
        <Component className={`relative inline-block ${className} group`}>
            {/* Base Text */}
            <span className={isGlitching ? "opacity-20" : "opacity-100"}>{text}</span>

            {isGlitching && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {strips.map((s) => (
                        <div
                            key={s.id}
                            className="absolute left-0 w-full overflow-hidden"
                            style={{
                                top: s.top,
                                height: s.height,
                            }}
                        >
                            <div
                                className="w-full text-red-600 animate-pulse"
                                style={{
                                    transform: `translateX(${s.offset})`,
                                }}
                            >
                                {text}
                            </div>
                        </div>
                    ))}
                    {/* Secondary Ghost Layer */}
                    <div className="absolute inset-0 flex items-center justify-center translate-x-1 text-zinc-500 opacity-30 blur-[1px]">
                        {text}
                    </div>
                </div>
            )}
        </Component>
    );
}
