'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted
        const consent = localStorage.getItem('titok_cookie_consent');
        if (!consent) {
            // Show with a slight delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('titok_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 animate-in slide-in-from-bottom duration-700">
            <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-xl border border-white/5 border-t-red-900/50 p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-red-900/10 blur-3xl rounded-full pointer-events-none" />

                <div className="flex-1 relative z-10">
                    <h4 className="text-white font-heading tracking-widest text-sm mb-2 uppercase flex items-center gap-2">
                        <span className="w-1 h-4 bg-red-900 block" />
                        ADATVÉDELEM ÉS SÜTIK
                    </h4>
                    <p className="text-muted font-mono text-[10px] md:text-xs leading-relaxed opacity-70">
                        Az oldal sütiket használ a látogatói élmény javítása, a hírlevél állapotának mentése és a haladásod követése érdekében. A böngészés folytatásával elfogadod a sütik használatát.
                        Részletekért olvasd el az <a href="/adatkezeles" className="text-red-800 hover:text-red-500 underline transition-colors">Adatkezelési Tájékoztatónkat</a>.
                    </p>
                </div>

                <div className="relative z-10 w-full md:w-auto">
                    <button
                        onClick={handleAccept}
                        className="w-full md:w-auto px-10 py-3 bg-red-900/10 border border-red-900/40 text-red-700 font-heading text-xs tracking-[0.3em] hover:bg-red-900/30 hover:text-red-500 hover:border-red-600 transition-all duration-300 uppercase"
                    >
                        ELFOGADOM
                    </button>
                </div>

                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-red-900/20 shadow-[0_0_10px_#991b1b] opacity-30" />
            </div>
        </div>
    );
}
