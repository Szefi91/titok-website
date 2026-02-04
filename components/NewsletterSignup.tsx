'use client';

import { useState, useEffect } from 'react';
import { subscribeAction } from '@/app/actions/newsletter';

export default function NewsletterSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already_subscribed'>('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Only check for localStorage if we are NOT in development
        if (process.env.NODE_ENV !== 'development') {
            const isSubscribed = localStorage.getItem('titok_subscribed');
            if (isSubscribed) {
                setStatus('already_subscribed');
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreed) {
            setStatus('error');
            setMessage('Kérjük, fogadd el az adatkezelési tájékoztatót!');
            return;
        }
        setStatus('loading');
        setMessage('');

        try {
            const result = await subscribeAction({ name, email });

            if (result.error) {
                setStatus('error');
                setMessage(result.error);
                return;
            }

            setStatus('success');
            setMessage('Sikeres feliratkozás! Ellenőrizd a fiókodat az üdvözlő üzenetért.');
            setEmail('');
            setName('');
            localStorage.setItem('titok_subscribed', 'true');
        } catch (err) {
            console.error('Newsletter error:', err);
            setStatus('error');
            setMessage('Hiba történt a feliratkozás során. Kérlek próbáld újra később.');
        }
    };

    if (status === 'already_subscribed' && process.env.NODE_ENV !== 'development') {
        return (
            <div className="w-full max-w-lg mx-auto p-8 bg-black/40 backdrop-blur-md border border-green-900/20 text-center animate-in fade-in duration-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-900/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

                <div className="relative z-10 py-4">
                    <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                        <span className="text-green-500 text-2xl">✓</span>
                    </div>
                    <h3 className="text-2xl font-heading text-white mb-3 tracking-[0.3em] uppercase">MÁR FELIRATKOZTÁL</h3>
                    <p className="text-muted font-mono text-xs md:text-sm opacity-70 leading-relaxed px-4">
                        &gt; Köszönjük a bizalmadat. Hamarosan jelentkezünk a legfrissebb <span className="text-green-500/80">TITKOKKAL</span>.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto p-6 md:p-8 bg-black/40 backdrop-blur-md border border-white/5 hover:border-red-900/40 transition-colors duration-500 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-heading text-white mb-3 tracking-widest text-shadow-glow flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-900/50 block" />
                    HÍRLEVÉL
                </h3>

                <div className="space-y-4 mb-8 text-muted font-mono text-xs md:text-sm leading-relaxed opacity-80">
                    <p>
                        Íratkozz fel, hogy elsőként értesülj a legfontosabb információkról és a projektet érintő nagyobb változásokról.
                    </p>
                    <div className="p-3 bg-red-900/5 border-l-2 border-red-900/30 italic">
                        <p>
                            &gt; Itt értesítünk majd a <span className="font-bold text-white">közösségi felhívásokról</span> és az esetleges <span className="font-bold text-white">CASTING</span> lehetőségekről is.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-900/50 group-focus-within/input:text-red-500 transition-colors">
                            <span className="text-xs">&gt;</span>
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="FULL_NAME"
                            required
                            className="w-full pl-8 pr-4 py-3 bg-black/60 border border-white/10 text-white placeholder-white/20 font-mono text-sm outline-none focus:border-red-900/50 transition-all duration-300"
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-900/50 group-focus-within/input:text-red-500 transition-colors">
                            <span className="text-xs">&gt;</span>
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="EMAIL_ADDRESS"
                            required
                            className="w-full pl-8 pr-4 py-3 bg-black/60 border border-white/10 text-white placeholder-white/20 font-mono text-sm outline-none focus:border-red-900/50 transition-all duration-300"
                            disabled={status === 'loading'}
                        />
                    </div>

                    <div className="flex items-start gap-3 py-2 group/check cursor-pointer" onClick={() => setAgreed(!agreed)}>
                        <div className={`mt-0.5 w-4 h-4 border flex items-center justify-center transition-colors ${agreed ? 'bg-red-900/40 border-red-500' : 'bg-black border-white/10 ring-1 ring-white/5'}`}>
                            {agreed && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <p className="text-[10px] md:text-xs text-muted font-mono leading-tight">
                            Elolvastam és elfogadom az <a href="/adatkezeles" className="text-red-800 hover:text-red-500 underline uppercase tracking-tighter" onClick={(e) => e.stopPropagation()}>Adatkezelési Tájékoztatót</a>.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 px-6 border border-red-900/40 bg-red-900/10 text-red-700 font-heading tracking-[0.3em] hover:bg-red-900/30 hover:text-red-500 hover:border-red-600 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed uppercase group/btn overflow-hidden relative"
                    >
                        <span className="relative z-10">
                            {status === 'loading' ? 'FELDOLGOZÁS...' : 'FELIRATKOZÁS'}
                        </span>
                        <div className="absolute inset-0 bg-red-900/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>

                    {status === 'success' && (
                        <div className="mt-4 p-3 bg-green-900/10 border border-green-900/30 text-green-500 text-[10px] md:text-xs font-mono tracking-widest uppercase animate-in fade-in zoom-in duration-300">
                            &gt; {message}
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="mt-4 p-3 bg-red-900/10 border border-red-900/30 text-red-600 text-[10px] md:text-xs font-mono tracking-widest uppercase animate-in shake duration-300">
                            &gt; {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
