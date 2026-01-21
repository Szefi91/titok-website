"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function GlobalSecrets() {
    const [showTerminal, setShowTerminal] = useState(false);
    const [mobileInput, setMobileInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const [scareActive, setScareActive] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const inputBuffer = useRef("");
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const scrollCount = useRef(0);

    // 1. Secret Code Listener: "TITOK" & Mobile Tap Trigger
    useEffect(() => {
        let tapCount = 0;
        let lastTap = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            // If terminal is open, don't double count
            if (showTerminal) return;

            if (e.key.length !== 1) return;
            inputBuffer.current = (inputBuffer.current + e.key.toUpperCase()).slice(-5);

            if (inputBuffer.current === "TITOK") {
                triggerEyeScare();
                inputBuffer.current = "";
            }
        };

        const handleMobileTrigger = (e: MouseEvent | TouchEvent) => {
            // If user taps the top area...
            // (Existing logic kept for hidden generic tap access)
            if ('clientY' in e && e.clientY < 100) {
                // ... existing tap code ...
            }
        };

        const openTerminal = () => {
            setShowTerminal(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        };

        const triggerEyeScare = () => {
            setScareActive(true);
            setShowTerminal(false);
            setMobileInput("");
            setTimeout(() => setScareActive(false), 3500);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleMobileTrigger);
        window.addEventListener("open-secret-terminal", openTerminal);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleMobileTrigger);
            window.removeEventListener("open-secret-terminal", openTerminal);
        };
    }, [showTerminal]);

    // Handle Terminal Submit
    const handleTerminalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobileInput.toUpperCase() === "TITOK") {
            // Visual feedback then scare
            setScareActive(true);
            setShowTerminal(false);
            setMobileInput("");
            setTimeout(() => setScareActive(false), 3500);
        } else {
            // Shake effect or error? Just clear for now
            setMobileInput("");
            // Maybe close or just blink red border... let's keep it simple
            alert("ACCESS DENIED");
        }
    };

    // 2. Ghost Scroll Logic
    // ... (existing scroll logic unchanged)

    if (scareActive) return (
        // ... eye scare component
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

    if (showTerminal) return (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-black border border-green-900/50 p-6 font-mono relative shadow-[0_0_50px_rgba(0,255,0,0.1)]">
                <button
                    onClick={() => setShowTerminal(false)}
                    className="absolute top-2 right-4 text-green-900 hover:text-green-500"
                >
                    X
                </button>
                <div className="mb-8 text-green-800 text-xs tracking-widest uppercase">
                    &gt; SECURE TERM_INAL V.4.0 <br />
                    &gt; ENTER PASSKEY:
                </div>
                <form onSubmit={handleTerminalSubmit} className="flex flex-col gap-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={mobileInput}
                        onChange={(e) => setMobileInput(e.target.value)}
                        className="bg-transparent border-b-2 border-green-900 text-green-500 font-bold text-2xl outline-none py-2 text-center uppercase placeholder-green-900/30 font-heading tracking-[0.5em]"
                        placeholder="_____"
                        autoComplete="off"
                        maxLength={10}
                    />
                    <button type="submit" className="bg-green-900/20 border border-green-900 text-green-700 py-3 hover:bg-green-900/40 hover:text-green-400 transition-colors uppercase tracking-widest text-sm">
                        AUTHENTICATE
                    </button>
                </form>
            </div>
        </div>
    );

    return null;
}
