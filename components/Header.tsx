"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
    const [pageLoadCount, setPageLoadCount] = useState(0);
    const [showSecretBtn, setShowSecretBtn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Get load count from localStorage
        const count = parseInt(localStorage.getItem("pageLoadCount") || "0");
        const newCount = count + 1;
        localStorage.setItem("pageLoadCount", newCount.toString());
        setPageLoadCount(newCount);

        if (newCount > 5) {
            setShowSecretBtn(true);
        }
    }, []);

    if (!mounted) return null;

    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/95 backdrop-blur-sm border-b border-white/5">
            <div className="container mx-auto px-2 md:px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl md:text-2xl font-heading tracking-widest text-white hover:text-accent transition-colors duration-300">
                    TITOK
                </Link>

                {/* Navigation - Always visible, responsive sizing */}
                <nav className="flex items-center space-x-2 md:space-x-8">
                    <Link href="#seasons" className="text-[10px] md:text-sm uppercase tracking-wider text-muted hover:text-white transition-colors">
                        Évadok
                    </Link>
                    <Link href="#about" className="text-[10px] md:text-sm uppercase tracking-wider text-muted hover:text-white transition-colors">
                        A Sorozatról
                    </Link>
                    <Link href="#patreon" className="text-[10px] md:text-sm uppercase tracking-wider text-muted hover:text-white transition-colors">
                        Patreon
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href="#shop" className="group flex items-center gap-1.5 text-[10px] md:text-sm uppercase tracking-wider text-accent hover:text-white transition-colors font-bold">
                            Shop
                            <span className="text-[7px] md:text-[9px] px-1 md:px-1.5 py-0.5 bg-accent/10 border border-accent/20 rounded text-accent font-normal normal-case animate-pulse hidden xs:inline">
                                Hamarosan
                            </span>
                        </Link>

                        {/* Secret Terminal Button - Visble after 5 page loads */}
                        {showSecretBtn && (
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-secret-terminal"))}
                                className="text-[8px] md:text-[10px] font-mono text-red-500 border border-red-900/50 px-1.5 py-0.5 md:px-2 md:py-1 animate-pulse bg-red-900/10 hover:bg-red-900/30 transition-colors uppercase"
                            >
                                CMD
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
