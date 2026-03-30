'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getStatisztaSignups, deleteStatisztaSignup, type StatisztaSignup, type StatisztaAdminData } from '@/app/actions/jelentkezes';

export default function StatisztakAdminPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = use(searchParams);
    const [data, setData] = useState<StatisztaAdminData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStatisztaSignups(token ?? null).then((result) => {
            setLoading(false);
            if ('error' in result) {
                setError(result.error);
            } else {
                setData(result);
                document.body.classList.add('statiszta-admin-print');
            }
        });
        return () => document.body.classList.remove('statiszta-admin-print');
    }, [token]);

    const handlePrint = () => {
        window.print();
    };

    const refreshData = () => {
        if (!token) return;
        getStatisztaSignups(token).then((result) => {
            if (!('error' in result)) setData(result);
        });
    };

    const handleDelete = async (id: string, name: string) => {
        if (!token) return;
        if (!confirm(`Törlöd a jelentkezést: ${name}? Ezzel felszabadul egy hely a 35-ből.`)) return;
        const result = await deleteStatisztaSignup(id, token);
        if (result.error) {
            alert(result.error);
            return;
        }
        refreshData();
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-mono">
                <p className="text-[11px] tracking-[0.4em] text-muted uppercase">
                    <span className="inline-block w-2 h-2 bg-red-900 mr-2 animate-ping" />
                    Betöltés…
                </p>
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-mono">
                <div className="text-center max-w-md">
                    <p className="text-red-500 text-sm mb-6">&gt; {error ?? 'Hozzáférés megtagadva.'}</p>
                    <Link
                        href="/s29"
                        className="inline-block py-3 px-6 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-xs tracking-widest uppercase"
                    >
                        Vissza a statiszta oldalra
                    </Link>
                </div>
            </main>
        );
    }

    const { signups, stats } = data;

    return (
        <main className="min-h-screen bg-[#050505] relative pt-12 pb-20 px-4 font-mono">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(122,17,17,.5),_transparent_60%)]" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-heading tracking-[0.3em] text-white uppercase">
                            Statiszta admin
                        </h1>
                        <p className="text-xs text-muted tracking-[0.3em] mt-1">Stáb & Statiszta Bázis</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="px-4 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/30 transition text-xs tracking-widest uppercase print:hidden"
                        >
                            Nyomtatás
                        </button>
                        <Link
                            href="/jelentkezes"
                            className="px-4 py-2 border border-white/10 text-white/80 hover:border-white/30 transition text-xs tracking-widest uppercase print:hidden"
                        >
                            Jelentkezési oldal
                        </Link>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-1 mb-8 print:mb-4">
                    <StatCard title="Összesen az adatbázisban" value={stats.total} />
                </div>

                <div className="border border-white/10 bg-black/50 overflow-hidden print:border-0 print:bg-transparent">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase">#</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase">Név</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase">Email</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase">Érdeklődés</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase hidden md:table-cell">Megjegyzés</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase hidden md:table-cell">Jelentkezés</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase print:hidden">Törlés</th>
                                </tr>
                            </thead>
                            <tbody>
                                {signups.map((s, i) => (
                                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-3 px-4 text-muted">{i + 1}</td>
                                        <td className="py-3 px-4 text-white font-medium">{s.full_name}</td>
                                        <td className="py-3 px-4 text-white/80">{s.email}</td>
                                        <td className="py-3 px-4 text-white/80">{s.preferred_role || 'Statiszta'}</td>
                                        <td className="py-3 px-4 text-muted text-xs max-w-[200px] truncate hidden md:table-cell">{s.notes || '—'}</td>
                                        <td className="py-3 px-4 text-muted text-xs hidden md:table-cell">
                                            {new Date(s.created_at).toLocaleString('hu-HU')}
                                        </td>
                                        <td className="py-3 px-4 print:hidden">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(s.id, s.full_name)}
                                                className="text-red-500 hover:text-red-400 text-xs tracking-wider uppercase border border-red-900/50 hover:border-red-700 px-2 py-1 transition"
                                            >
                                                Törlés
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {signups.length === 0 && (
                    <p className="text-center text-muted py-12 text-sm">Még nincs jelentkezés.</p>
                )}

                <div className="mt-8 print:hidden">
                    <h2 className="text-xs tracking-[0.3em] text-red-500 uppercase mb-4">Névsor nyomtatáshoz</h2>
                    <div className="border border-white/10 bg-black/40 p-4 text-xs text-muted leading-relaxed">
                        {signups.map((s, i) => (
                            <span key={s.id}>
                                {i + 1}. {s.full_name}
                                {i < signups.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                        {signups.length === 0 && <span>—</span>}
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="border border-white/10 bg-black/50 p-4">
            <p className="text-[10px] font-mono tracking-[0.3em] text-red-400 uppercase mb-1">{title}</p>
            <p className="text-2xl font-heading text-white">{value}</p>
        </div>
    );
}
