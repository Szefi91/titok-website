"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    onComplete?: () => void;
    showCursor?: boolean;
    cursorColor?: string;
}

export default function TypingText({
    text,
    className = "",
    speed = 100,
    delay = 0,
    onComplete,
    showCursor = true,
    cursorColor = "bg-accent"
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            if (onComplete) onComplete();
        }
    }, [started, displayedText, text, speed, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && (
                <span className={`animate-pulse inline-block w-[0.5em] h-[1em] align-middle ml-1 ${cursorColor}`} />
            )}
        </span>
    );
}
