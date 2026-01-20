"use client";

import { useEffect, useState } from "react";

interface ImageGlitchProps {
    src: string;
    className?: string;
    stripCount?: number;
}

export default function ImageGlitch({ src, className = "", stripCount = 15 }: ImageGlitchProps) {
    const [strips, setStrips] = useState<any[]>([]);

    useEffect(() => {
        const newStrips = Array.from({ length: stripCount }).map((_, i) => ({
            id: i,
            top: `${(100 / stripCount) * i}%`,
            height: `${101 / stripCount}%`, // Overlap slightly to prevent gaps
            bgPos: `0 ${(100 / (stripCount - 1)) * i}%`,
            delay: Math.random() * 3 + "s",
            duration: 0.2 + Math.random() * 0.5 + "s", // Short, sharp jitters
            offset: (Math.random() - 0.5) * 40 + "px"
        }));
        setStrips(newStrips);
    }, [src, stripCount]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {strips.map((s) => (
                <div
                    key={s.id}
                    className="absolute left-0 w-full animate-glitch-strip"
                    style={{
                        top: s.top,
                        height: s.height,
                        backgroundImage: `url(${src})`,
                        backgroundSize: '100% auto',
                        backgroundPosition: s.bgPos,
                        backgroundRepeat: 'no-repeat',
                        "--glitch-offset": s.offset,
                        animationDelay: s.delay,
                        animationDuration: s.duration,
                        animationIterationCount: 'infinite'
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
