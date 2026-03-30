"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [pageLoadCount, setPageLoadCount] = useState(0);
    const [showSecretBtn, setShowSecretBtn] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

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

    // Scroll Lock
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    // Close menu when pathname changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    if (!mounted) return null;

    // Helper to determine the correct link path based on the current page
    const getPath = (anchor: string) => {
        return pathname === '/' ? anchor : `/${anchor}`;
    };

    const navLinks = [
        { name: "Évadok", href: getPath("#seasons") },
        { name: "A Sorozatról", href: getPath("#about") },
        { name: "Roadmap", href: "/roadmap", isExternal: false },
        { name: "Jelentkezés", href: "/jelentkezes", isExternal: false },
        { name: "Shop", href: getPath("#shop"), accent: true, badge: "Hamarosan" },
        { name: "Kapcsolat", href: "/kapcsolat" },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${isMenuOpen ? 'z-[9999] h-screen' : 'z-[100] h-16'}`}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-[1001]">
                {/* Logo */}
                <Link 
                    href="/" 
                    className="text-xl md:text-2xl font-heading tracking-[0.2em] text-white hover:text-accent transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                >
                    TITOK
                </Link>

                {/* Hamburger / Close Button - Mobile Only */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex flex-col items-center justify-center w-10 h-10 md:hidden p-2 z-[1002] relative focus:outline-none"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >
                    <div className="relative w-6 h-5">
                        <span className={`absolute left-0 block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'top-2 rotate-45 bg-accent' : 'top-0'}`} />
                        <span className={`absolute left-0 top-2 block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                        <span className={`absolute left-0 block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'top-2 -rotate-45 bg-accent' : 'top-4'}`} />
                    </div>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm uppercase tracking-wider transition-colors ${
                                link.accent ? 'text-accent font-bold hover:text-white' : 
                                (pathname === link.href ? 'text-white' : 'text-muted hover:text-white')
                            } flex items-center gap-1`}
                        >
                            {link.name}
                            {link.badge && (
                                <span className="text-[9px] px-1.5 py-0.5 bg-accent/10 border border-accent/20 rounded text-accent animate-pulse">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    ))}

                    {showSecretBtn && (
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent("open-secret-terminal"))}
                            className="text-[10px] font-mono text-red-500 border border-red-900/50 px-2 py-1 animate-pulse bg-red-900/10 hover:bg-red-900/30 transition-colors uppercase"
                        >
                            CMD
                        </button>
                    )}
                </nav>
            </div>

            {/* Mobile Navigation Overlay */}
            <div 
                className={`fixed inset-0 flex flex-col md:hidden transition-all duration-500 ${isMenuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'}`}
                style={{ backgroundColor: '#050505', zIndex: 1000 }}
            >
                {/* Background noise/effect */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/noise.png')] bg-repeat" />
                
                <nav className="flex-grow flex flex-col items-center justify-center gap-6 text-center px-6 relative z-10 pt-16">
                    <p className="text-[9px] font-mono text-accent tracking-[0.4em] mb-4 uppercase opacity-40">TITOK_RECOVERY_MODE</p>
                    
                    {navLinks.map((link, idx) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-2xl font-heading uppercase tracking-[0.15em] leading-tight transition-all transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${idx * 40}ms` }}
                        >
                            <span className={link.accent ? 'text-accent font-bold animate-pulse' : (pathname === link.href ? 'text-white' : 'text-zinc-600 hover:text-white')}>
                                {link.name}
                            </span>
                        </Link>
                    ))}
                    
                    {showSecretBtn && (
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                window.dispatchEvent(new CustomEvent("open-secret-terminal"));
                            }}
                            className={`mt-8 text-xs font-mono text-red-500 border border-red-900/50 px-8 py-3 bg-red-900/10 uppercase transition-all active:scale-95 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: `${navLinks.length * 40}ms` }}
                        >
                            TERMINÁL (CMD)
                        </button>
                    )}
                </nav>
                
                <div className="pb-12 text-[8px] font-mono text-muted/30 uppercase tracking-[0.2em] px-8 text-center relative z-10">
                    ID: {pageLoadCount} // SYSTEM_OS_V4.0 // FIGYELÜNK
                </div>
            </div>
        </header>
    );
}
