'use client';

import { useEffect, useState, use } from 'react';
import { unsubscribeAction } from '@/app/actions/unsubscribe';
import Link from 'next/link';

export default function UnsubscribePage({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>;
}) {
    const { id } = use(searchParams);
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Leiratkozás feldolgozása...');

    useEffect(() => {
        const performUnsubscribe = async () => {
            if (!id) {
                setStatus('error');
                setMessage('Hiányzó azonosító. Nem sikerült a leiratkozás.');
                return;
            }

            const result = await unsubscribeAction(id);

            if (result.success) {
                setStatus('success');
                setMessage('Sikeresen leiratkoztál a TITOK hírleveléről. Sajnáljuk, hogy elmész.');
            } else {
                setStatus('error');
                setMessage(result.error || 'Hiba történt a leiratkozás során.');
            }
        };

        performUnsubscribe();
    }, [id]);

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-mono">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-300px); opacity: 0; }
                }
            `}} />
            <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-md border border-white/5 text-center shadow-2xl relative overflow-hidden group">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />

                <div className="relative z-10">
                    <h1 className="text-3xl font-heading text-white mb-8 tracking-[0.3em] uppercase">TITOK</h1>

                    <div className="space-y-6">
                        {status === 'loading' && (
                            <div className="animate-pulse text-muted text-sm tracking-widest uppercase">
                                <span className="inline-block w-2 h-2 bg-red-900 mr-2 animate-ping" />
                                {message}
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="animate-in fade-in zoom-in duration-500">
                                <div className="text-green-500 text-sm mb-6 leading-relaxed">
                                    &gt; {message}
                                </div>
                                <Link
                                    href="/"
                                    className="inline-block py-3 px-8 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-xs tracking-widest uppercase"
                                >
                                    Vissza a főoldalra
                                </Link>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="animate-in shake duration-500">
                                <div className="text-red-600 text-sm mb-6 leading-relaxed">
                                    &gt; {message}
                                </div>
                                <Link
                                    href="/"
                                    className="inline-block py-3 px-8 border border-red-900/20 text-red-900/50 hover:text-red-500 hover:border-red-900/50 transition-all text-xs tracking-widest uppercase"
                                >
                                    Vissza a főoldalra
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Decorative scanning line */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-red-900/20 shadow-[0_0_10px_#991b1b]"
                    style={{ animation: 'scan 3s linear infinite' }}
                />
            </div>
        </main>
    );
}
