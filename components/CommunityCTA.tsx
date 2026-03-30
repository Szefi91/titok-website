'use client';

import Link from 'next/link';

export default function CommunityCTA() {
    return (
        <section id="community" className="py-20 px-4 bg-[#0b0b0b] border-y border-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 blur-3xl rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-heading text-white mb-4 text-center">
                    LÉGY RÉSZESE
                </h2>
                <p className="text-center text-muted text-sm md:text-base mb-14 max-w-xl mx-auto">
                    Csatlakozz a közösséghez, támogasd a projektet, vagy iratkozz fel a hírlevélre az exkluzív infókért.
                </p>

                <div className="grid md:grid-cols-3 gap-6 items-stretch">

                    {/* Discord Card */}
                    <a
                        href="https://discord.com/invite/zKyNC2dvkh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-[#050505] border border-indigo-900/20 p-6 md:p-8 rounded-sm hover:border-indigo-500/40 transition-all duration-500 flex flex-col text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-indigo-500/30 group-hover:bg-indigo-500/60 transition-colors duration-500" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-900/5 blur-3xl rounded-full pointer-events-none group-hover:bg-indigo-900/10 transition-colors duration-500" />

                        {/* Discord Icon */}
                        <div className="w-12 h-12 bg-indigo-900/20 rounded-sm flex items-center justify-center mb-5 border border-indigo-500/20 group-hover:border-indigo-500/40 group-hover:scale-110 transition-all duration-300">
                            <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9461 2.4189-2.1569 2.4189z" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-heading text-white mb-2 tracking-wider">DISCORD</h3>
                        <p className="text-sm text-muted mb-6 flex-grow leading-relaxed">
                            Csatlakozz a közösséghez! Beszélgess más rajongókkal, oszd meg a teóriáidat, és keresd a rejtett nyomokat.
                        </p>

                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-heading uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                            Csatlakozás
                            <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                    </a>

                    {/* Statiszta Jelentkezes Card */}
                    <Link
                        href="/jelentkezes"
                        className="group bg-[#050505] border border-orange-900/20 p-6 md:p-8 rounded-sm hover:border-orange-500/40 transition-all duration-500 flex flex-col text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-orange-500/30 group-hover:bg-orange-500/60 transition-colors duration-500" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-900/5 blur-3xl rounded-full pointer-events-none group-hover:bg-orange-900/10 transition-colors duration-500" />

                        {/* Crew Icon */}
                        <div className="w-12 h-12 bg-orange-900/20 rounded-sm flex items-center justify-center mb-5 border border-orange-500/20 group-hover:border-orange-500/40 group-hover:scale-110 transition-all duration-300">
                            <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <line x1="19" y1="8" x2="19" y2="14" />
                                <line x1="22" y1="11" x2="16" y2="11" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-heading text-white mb-2 tracking-wider">JELENTKEZÉS</h3>
                        <p className="text-sm text-muted mb-6 flex-grow leading-relaxed">
                            Gyere el a forgatásra! Jelentkezz statisztának, vagy csatlakozz a stábhoz és vegyél részt a 4. évad elkészítésében.
                        </p>

                        <div className="flex items-center gap-2 text-orange-400 text-sm font-heading uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                            Részletek
                            <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                    </Link>

                    {/* Newsletter Card */}
                    <button
                        onClick={() => {
                            const el = document.querySelector('#newsletter');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group bg-[#050505] border border-red-900/20 p-6 md:p-8 rounded-sm hover:border-red-500/40 transition-all duration-500 flex flex-col text-left relative overflow-hidden cursor-pointer"
                    >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500/30 group-hover:bg-red-500/60 transition-colors duration-500" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-900/5 blur-3xl rounded-full pointer-events-none group-hover:bg-red-900/10 transition-colors duration-500" />

                        {/* Newsletter Icon */}
                        <div className="w-12 h-12 bg-red-900/20 rounded-sm flex items-center justify-center mb-5 border border-red-500/20 group-hover:border-red-500/40 group-hover:scale-110 transition-all duration-300">
                            <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </div>

                        <h3 className="text-xl font-heading text-white mb-2 tracking-wider">HÍRLEVÉL</h3>
                        <p className="text-sm text-muted mb-6 flex-grow leading-relaxed">
                            Iratkozz fel és elsőként értesülj a casting lehetőségekről, premierdátumokról és közösségi eseményekről.
                        </p>

                        <div className="flex items-center gap-2 text-red-400 text-sm font-heading uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                            Feliratkozás
                            <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">↓</span>
                        </div>
                    </button>

                </div>
            </div>
        </section>
    );
}
