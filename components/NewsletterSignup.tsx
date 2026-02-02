'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const { error } = await supabase
                .from('newsletter_subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') {
                    setStatus('error');
                    setMessage('Ez az email cím már fel van iratkozva!');
                } else {
                    throw error;
                }
            } else {
                setStatus('success');
                setMessage('Sikeres feliratkozás!');
                setEmail('');
            }
        } catch (err) {
            console.error('Newsletter error:', err);
            setStatus('error');
            setMessage('Hiba történt a feliratkozás során. Kérlek próbáld újra később.');
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 md:p-8 bg-black/40 backdrop-blur-md border border-white/5 hover:border-red-900/40 transition-colors duration-500 shadow-2xl relative overflow-hidden group">
            <style jsx>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus {
                    -webkit-text-fill-color: white !important;
                    -webkit-box-shadow: 0 0 0px 1000px #0a0a0a inset !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
            {/* Background Accent */}
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
                            &gt; Itt értesítünk majd a <span className="font-bold text-white">közösségi felhívásokról</span> és az esetleges <span className="font-bold text-white">CASTING</span> lehetőségekről is, ha szeretnél közvetlenül is részt venni a történetben.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            disabled={status === 'loading' || status === 'success'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
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
