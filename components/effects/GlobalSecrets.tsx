"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TypingText from "./TypingText";
import { usePathname } from "next/navigation";

export default function GlobalSecrets() {
    const [showTerminal, setShowTerminal] = useState(false);
    const [mobileInput, setMobileInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();

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

            if (!e.key || e.key.length !== 1) return;
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

    const [isDecoding, setIsDecoding] = useState(false);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
    const [decodeResult, setDecodeResult] = useState<string | null>(null);

    // Handle Terminal Submit
    const handleTerminalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const input = mobileInput.trim();
        if (!input) return;

        // Legacy scare trigger
        if (input.toUpperCase() === "TITOK") {
            setScareActive(true);
            setShowTerminal(false);
            setMobileInput("");
            setTimeout(() => setScareActive(false), 3500);
            return;
        }

        // Decoder Logic
        setIsDecoding(true);
        setDecodeResult(null);
        setTerminalLogs(["INITIATING DECODER V.4.0...", "SCANNING BITSTREAM..."]);

        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const runSimulation = async () => {
            await sleep(800);

            let format = "UNKNOWN";
            // Check Binary first since any binary string is technically also a valid Hex string
            if (/^[01\s]{8,}$/.test(input)) {
                format = "BINARY";
            } else if (/^[0-9A-Fa-f\s]{8,}$/.test(input)) {
                format = "HEXADECIMAL";
            }

            setTerminalLogs(prev => [...prev, `FORMAT DETECTED: ${format}`]);
            await sleep(600);
            setTerminalLogs(prev => [...prev, "DECRYPTING RSA-4096..."]);
            await sleep(1000);
            setTerminalLogs(prev => [...prev, "ACCESSING DATA BLOCK..."]);
            await sleep(800);

            try {
                let decoded = "";
                if (format === "HEXADECIMAL") {
                    const cleanHex = input.replace(/\s/g, '');
                    const matches = cleanHex.match(/.{1,2}/g);
                    if (!matches) throw new Error("INVALID_HEX");
                    const bytes = new Uint8Array(matches.map(byte => parseInt(byte, 16)));
                    decoded = new TextDecoder().decode(bytes);
                } else if (format === "BINARY") {
                    const cleanBin = input.replace(/\s/g, '');
                    const matches = cleanBin.match(/.{8}/g);
                    if (!matches) throw new Error("INVALID_BINARY");
                    const bytes = new Uint8Array(matches.map(byte => parseInt(byte, 2)));
                    decoded = new TextDecoder().decode(bytes);
                } else {
                    decoded = "HIBA: ÉRVÉNYTELEN ADATFORMÁTUM";
                }

                setTerminalLogs(prev => [...prev, "DECODING COMPLETE.", "---"]);
                setDecodeResult(decoded);
            } catch (err) {
                setTerminalLogs(prev => [...prev, "CRITICAL ERROR: DATA CORRUPTION"]);
            }
            setIsDecoding(false);
        };

        runSimulation();
    };

    // 2. Ghost Scroll Logic - Idle Triggered Multi-stage
    const isAutoScrolling = useRef(false);
    useEffect(() => {
        // ONLY active on the homepage
        if (pathname !== '/') return;

        let ghostTimer1: NodeJS.Timeout;
        let ghostTimer2: NodeJS.Timeout;
        let idleTimer: NodeJS.Timeout;

        const clearAllTimers = () => {
            clearTimeout(idleTimer);
            clearTimeout(ghostTimer1);
            clearTimeout(ghostTimer2);
        };

        const startGhostSequence = () => {
            // Stage 1: First jump at 20s idle
            isAutoScrolling.current = true;
            window.scrollBy({ top: 500, behavior: 'smooth' });

            // Allow interactions to "take over" after a short delay (scroll duration)
            setTimeout(() => { isAutoScrolling.current = false; }, 1000);

            // Stage 2: Second jump after 5s more (25s total)
            ghostTimer1 = setTimeout(() => {
                isAutoScrolling.current = true;
                window.scrollBy({ top: 800, behavior: 'smooth' });
                setTimeout(() => { isAutoScrolling.current = false; }, 1000);

                // Stage 3: Final scroll after 5s more (30s total)
                ghostTimer2 = setTimeout(() => {
                    const footer = document.querySelector('footer');
                    if (footer) {
                        isAutoScrolling.current = true;
                        // Scroll to the absolute bottom
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

                        setTimeout(() => {
                            isAutoScrolling.current = false;
                            window.dispatchEvent(new CustomEvent("ghost-scroll-complete"));
                        }, 2000);
                    }
                }, 5000);
            }, 5000);
        };

        const resetIdleTimer = (e?: Event) => {
            // If it's a scroll event and we are auto-scrolling, ignore it
            if (e?.type === 'scroll' && isAutoScrolling.current) return;

            // Otherwise, any interaction (including manual scroll) resets everything
            isAutoScrolling.current = false;
            clearAllTimers();
            idleTimer = setTimeout(() => {
                startGhostSequence();
            }, 20000); // 20s of total inactivity
        };

        // Listen for activity
        const activities = ['mousemove', 'scroll', 'keydown', 'touchstart', 'click'];
        activities.forEach(event => {
            window.addEventListener(event, resetIdleTimer, { passive: true });
        });

        // Initial start
        resetIdleTimer();

        return () => {
            activities.forEach(event => {
                window.removeEventListener(event, resetIdleTimer);
            });
            clearAllTimers();
        };
    }, []);

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
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-xl bg-black border border-green-900/50 p-4 md:p-6 font-mono relative shadow-[0_0_50px_rgba(0,255,0,0.1)] flex flex-col max-h-[90vh]">
                <button
                    onClick={() => {
                        setShowTerminal(false);
                        setMobileInput("");
                        setDecodeResult(null);
                        setTerminalLogs([]);
                    }}
                    className="absolute top-3 right-3 text-green-900 hover:text-green-500 w-8 h-8 flex items-center justify-center z-10"
                    aria-label="Close"
                >
                    X
                </button>
                <div className="mb-4 text-green-800 text-[9px] md:text-[10px] tracking-widest uppercase border-b border-green-900/20 pb-2 pr-8">
                    &gt; BIZTONSÁGI RENDSZER DEKODOLÓ V.4.0 <br />
                    &gt; ÍRJA BE A KÓDOT:
                </div>

                <div className="terminal-scroll flex flex-col gap-4 overflow-y-auto pr-1">
                    <form onSubmit={handleTerminalSubmit} className="flex flex-col gap-2">
                        <textarea
                            ref={inputRef as any}
                            value={mobileInput}
                            onChange={(e) => setMobileInput(e.target.value)}
                            className="terminal-scroll bg-green-900/5 border border-green-900/30 text-green-500 font-mono text-xs md:text-sm outline-none p-3 w-full h-24 md:h-32 resize-none placeholder-green-900/20"
                            placeholder="Szöveg beillesztése..."
                            autoComplete="off"
                            disabled={isDecoding}
                        />
                        <button
                            type="submit"
                            disabled={isDecoding}
                            className={`py-3 md:py-4 border tracking-widest text-[10px] md:text-xs uppercase transition-all font-bold ${isDecoding
                                ? 'bg-green-900/10 border-green-900/20 text-green-900 cursor-not-allowed'
                                : 'bg-green-900/20 border-green-900 text-green-700 hover:bg-green-900/40 hover:text-green-400'
                                }`}
                        >
                            {isDecoding ? 'FELDOLGOZÁS...' : 'DEKODOLÁS'}
                        </button>
                    </form>

                    {/* Console Output */}
                    {(terminalLogs.length > 0) && (
                        <div className="bg-green-900/5 border border-green-900/20 p-3 md:p-4 font-mono">
                            {terminalLogs.map((log, i) => (
                                <div key={i} className="text-[9px] md:text-[10px] text-green-700 leading-relaxed">
                                    <span className="opacity-40 mr-2">[{new Date().toLocaleTimeString(undefined, { hour12: false })}]</span>
                                    {log}
                                </div>
                            ))}

                            {decodeResult && (
                                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 animate-in zoom-in duration-300">
                                    <div className="text-green-400 text-xs md:text-sm font-bold break-words whitespace-pre-wrap uppercase tracking-tighter flex flex-col sm:flex-row">
                                        <span className="mr-2 shrink-0 opacity-70 font-mono text-[10px]">&gt; EREDMÉNY:</span>
                                        <div className="mt-1 sm:mt-0">
                                            {decodeResult && <TypingText text={decodeResult} speed={60} showCursor={true} cursorColor="bg-green-500" />}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    return null;
}
