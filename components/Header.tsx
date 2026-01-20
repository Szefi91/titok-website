import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-sm border-b border-white/5">
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

                {/* Mobile Menu Button (Placeholder) */}
                <button className="md:hidden text-white">
                    <span className="sr-only">Menü</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
