'use client';

import { useState, useEffect } from 'react';
import { sendContactAction } from '@/app/actions/contact';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [typedText, setTypedText] = useState('');
    const fullText = "Hagyj nyomot nálunk";

    useEffect(() => {
        setIsLoaded(true);
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const result = await sendContactAction({ name, email, message });
            if (result.success) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Hiba történt.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Váratlan hiba történt.');
        }
    };

    return (
        <section id="kapcsolat" className={`py-24 px-4 relative overflow-hidden bg-[#050505] min-h-[80vh] flex items-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Subtle radial gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,17,17,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Corner Metadata - Low opacity ARG Style */}
            <div className="absolute top-10 left-10 font-mono text-[8px] text-red-900/20 uppercase tracking-[0.2em] hidden md:block">
                [LOC_ID: TITOK_S01] <br />
                [STATUS: OK]
            </div>
            <div className="absolute top-10 right-10 font-mono text-[8px] text-red-900/20 uppercase tracking-[0.2em] text-right hidden md:block">
                ORD: 47.4979° N <br />
                LON: 19.0402° E
            </div>

            <div className="max-w-3xl mx-auto relative z-10 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-7xl font-heading tracking-[0.2em] text-white mb-6 animate-glitch">
                        KAPCSOLAT<span className="animate-[pulse_1s_infinite] text-red-900">_</span>
                    </h2>
                    <div className="w-24 h-1 bg-red-900 mx-auto mb-8 shadow-[0_0_20px_#7A1111]" />
                    <p className="font-mono text-sm md:text-base uppercase tracking-[0.4em] text-zinc-400 min-h-[1.5em]">
                        {typedText}<span className="inline-block w-1 h-4 ml-1 bg-zinc-600 animate-pulse" />
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Name Input */}
                        <div className="group relative">
                            <div className="flex justify-between items-end mb-3">
                                <label className="block font-heading text-xs tracking-[0.2em] text-red-800 transition-colors group-focus-within:text-red-500 animate-flicker">
                                    Név
                                </label>
                                <span className="font-mono text-[7px] text-zinc-800 uppercase tracking-tighter">
                                    [USER_RECOG]
                                </span>
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="KI VAGY TE?"
                                className="w-full bg-black/40 border border-white/5 border-b-red-900/30 p-5 text-zinc-100 font-mono text-sm tracking-widest focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900/10 transition-all duration-300 placeholder:text-zinc-900"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="group relative">
                            <div className="flex justify-between items-end mb-3">
                                <label className="block font-heading text-xs tracking-[0.2em] text-red-800 transition-colors group-focus-within:text-red-500 animate-flicker">
                                    Email
                                </label>
                                <span className="font-mono text-[7px] text-zinc-800 uppercase tracking-tighter">
                                    [CHAN_STABL]
                                </span>
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="HOL ÉRÜNK EL?"
                                className="w-full bg-black/40 border border-white/5 border-b-red-900/30 p-5 text-zinc-100 font-mono text-sm tracking-widest focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900/10 transition-all duration-300 placeholder:text-zinc-900"
                            />
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="group relative">
                        <div className="flex justify-between items-end mb-3">
                            <label className="block font-heading text-xs tracking-[0.2em] text-red-800 transition-colors group-focus-within:text-red-500 animate-flicker">
                                Üzenet
                            </label>
                            <span className="font-mono text-[7px] text-zinc-800 uppercase tracking-tighter">
                                [DATA_PKT_ENC]
                            </span>
                        </div>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={6}
                            placeholder="ÍRJ VALAMIT.."
                            className="w-full bg-black/40 border border-white/5 border-b-red-900/30 p-5 text-zinc-100 font-mono text-sm tracking-widest focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900/10 transition-all duration-300 placeholder:text-zinc-900 resize-none"
                        />
                    </div>

                    <div className="relative pt-6">
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-red-950/5 border border-red-900/20 p-6 text-red-800 font-heading tracking-[0.6em] hover:bg-black hover:text-red-500 hover:border-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {status === 'sending' ? (
                                    <span className="flex items-center gap-1 group-hover:animate-glitch">
                                        <span className="animate-[pulse_0.1s_infinite]">DECODING</span>
                                        <span className="animate-bounce">...</span>
                                    </span>
                                ) : (
                                    'KÜLDÉS'
                                )}
                            </span>
                        </button>
                    </div>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <div className="text-emerald-500 font-mono text-xs tracking-widest text-center animate-glitch py-4 bg-emerald-500/5 border border-emerald-500/20">
                            {'>'} ÜZENET ELKÜLDVE. KAPCSOLAT LÉTREHOZVA.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="text-red-600 font-mono text-xs tracking-widest text-center animate-glitch text-glow-red py-4 bg-red-600/5 border border-red-600/20">
                            {'>'} HIBA: ÜZENET MEGSZAKÉTHA. PRÓBÁLD ÚJRA.
                        </div>
                    )}
                </form>
            </div>

            {/* Global scanline effect overlay */}
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.02] animate-scanline bg-gradient-to-b from-white via-transparent to-transparent h-px w-full" />
        </section>
    );
}
