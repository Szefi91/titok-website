"use client";

import { useState, useEffect } from "react";

interface RGBSplitTextProps {
    text: string;
    className?: string;
    autoTrigger?: boolean;
}

export default function RGBSplitText({ text, className = "", autoTrigger = true }: RGBSplitTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        if (!autoTrigger) return;

        const trigger = () => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 300 + Math.random() * 500);

            const nextTime = 4000 + Math.random() * 8000;
            setTimeout(trigger, nextTime);
        };

        const timer = setTimeout(trigger, 2000);
        return () => clearTimeout(timer);
    }, [autoTrigger]);

    return (
        <span
            className={`relative inline-block cursor-default group ${className}`}
            onMouseEnter={() => !autoTrigger && setIsGlitching(true)}
            onMouseLeave={() => !autoTrigger && setIsGlitching(false)}
        >
            {/* Main Text */}
            <span className="relative z-10">{text}</span>

            {/* Glitch Layers */}
            {isGlitching && (
                <>
                    {/* Cyan Layer */}
                    <span
                        className="absolute inset-0 text-[#00ffff] opacity-70 z-0 animate-rgb-reverse pointer-events-none select-none"
                    >
                        {text}
                    </span>
                    {/* Red Layer */}
                    <span
                        className="absolute inset-0 text-[#ff0000] opacity-70 z-0 animate-rgb-forward pointer-events-none select-none"
                    >
                        {text}
                    </span>
                    {/* Lines / Decals - Using spans to avoid <p> nesting errors */}
                    <span className="absolute inset-0 pointer-events-none z-20">
                        <span className="absolute top-[40%] left-[-10px] w-8 h-[2px] bg-white border-b border-black animate-glitch-lines block" />
                        <span className="absolute bottom-[30%] right-[-10px] w-12 h-[2px] bg-white border-b border-black animate-glitch-lines block" />
                    </span>
                </>
            )}
        </span>
    );
}
