"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-sm border-b border-white/5">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-heading tracking-widest text-white hover:text-accent transition-colors duration-300">
                    TITOK
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#seasons" className="text-sm uppercase tracking-wider text-muted hover:text-white transition-colors">
                        Évadok
                    </Link>
                    <Link href="#about" className="text-sm uppercase tracking-wider text-muted hover:text-white transition-colors">
                        A Sorozatról
                    </Link>
                    <Link href="#patreon" className="text-sm uppercase tracking-wider text-muted hover:text-white transition-colors">
                        Patreon
                    </Link>
                    {/* Shop Link */}
                    <div className="relative group">
                        <Link href="#shop" className="text-sm uppercase tracking-wider text-accent hover:text-white transition-colors font-bold">
                            Shop
                        </Link>
                        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-[9px] text-muted uppercase tracking-tighter whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                            Hamarosan
                        </span>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2 hover:bg-white/5 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="sr-only">Menü</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-8">
                    <Link href="#seasons" className="text-2xl font-heading text-white" onClick={() => setIsMenuOpen(false)}>Évadok</Link>
                    <Link href="#about" className="text-2xl font-heading text-white" onClick={() => setIsMenuOpen(false)}>A Sorozatról</Link>
                    <Link href="#patreon" className="text-2xl font-heading text-white" onClick={() => setIsMenuOpen(false)}>Patreon</Link>
                    <Link href="#shop" className="text-2xl font-heading text-accent" onClick={() => setIsMenuOpen(false)}>Shop (Hamarosan)</Link>
                </nav>
            </div>
        </header>
    );
}
