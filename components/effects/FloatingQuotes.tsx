"use client";

import { useEffect, useState } from "react";

const quotes = [
    "kos ami kussol",
    "ez egy hang fal",
    "olyan dolgokat állitasz amit nem tudsz",
    "Silkáde...",
    "ez már nem az a szefi akit én ismerek",
    "A Slenderman addig létezik, amíg beszélnek róla.",
    "remegés...",
    "Megfigyelő...",
    "valóság repedés",
    "Máté... vagy Castiel?",
    "1998",
    "AZ ERDŐ EGY KAPU"
];

interface FloatingQuote {
    id: number;
    text: string;
    top: number;
    left: number;
    duration: number;
    delay: number;
    size: number;
}

export default function FloatingQuotes() {
    const [activeQuotes, setActiveQuotes] = useState<FloatingQuote[]>([]);

    useEffect(() => {
        // Initial generation
        const generateQuotes = () => {
            const newQuotes: FloatingQuote[] = [];
            for (let i = 0; i < 8; i++) {
                newQuotes.push({
                    id: i,
                    text: quotes[Math.floor(Math.random() * quotes.length)],
                    top: Math.random() * 100,
                    left: Math.random() * 100,
                    duration: 10 + Math.random() * 20,
                    delay: Math.random() * 10,
                    size: 0.8 + Math.random() * 1.5
                });
            }
            setActiveQuotes(newQuotes);
        };

        generateQuotes();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {activeQuotes.map((q) => (
                <div
                    key={q.id}
                    className="absolute text-white/5 font-heading uppercase whitespace-nowrap animate-float"
                    style={{
                        top: `${q.top}%`,
                        left: `${q.left}%`,
                        fontSize: `${q.size}rem`,
                        animationDuration: `${q.duration}s`,
                        animationDelay: `${q.delay}s`,
                    }}
                >
                    {q.text}
                </div>
            ))}
        </div>
    );
}
