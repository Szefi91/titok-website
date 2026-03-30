'use client';

import { useState, useTransition } from 'react';
import type { ReactNode } from 'react';
import { submitExtrasSignup } from '@/app/actions/jelentkezes';

const conductPoints = [
    'Önkéntes részvétel – nincs díjazás, cserébe catering + stábtámogatás jár.',
    'A forgatási napok változóak, mindig előre egyeztetünk veled.',
    'A felvételre kerülésről és részletekről (helyszín, időpont, dress code) belső levelezésen keresztül értesítünk.',
];

const inputClass = 'w-full bg-black/70 border border-white/10 text-white placeholder-white/30 font-mono text-base sm:text-sm py-3 px-4 outline-none focus:border-red-900/50 transition-all duration-200 disabled:opacity-50 rec-input-focus min-h-[48px]';

export default function ExtrasForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [preferredRole, setPreferredRole] = useState('');
    const [notes, setNotes] = useState('');
    const [acceptsCode, setAcceptsCode] = useState(false);
    const [databaseCommit, setDatabaseCommit] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!acceptsCode) {
            setStatus('error');
            setMessage('A jelentkezéshez el kell fogadnod a szabályokat.');
            return;
        }

        if (!databaseCommit) {
            setStatus('error');
            setMessage('Kérjük, egyezz bele az adatbázisba kerülésbe.');
            return;
        }

        setStatus('idle');
        setMessage('');

        startTransition(async () => {
            const result = await submitExtrasSignup({
                fullName,
                email,
                availabilitySlot: 'general-database',
                preferredRole,
                notes,
                acceptsCode,
                // Passing a default for required legacy fields
                pizzaPreference: 'magyaros',
                confirmedAttendance: true,
                futureInterest: true,
            });

            if (result?.error) {
                setStatus('error');
                setMessage(result.error);
                return;
            }

            setStatus('success');
            setMessage('Jelentkezés sikeres! Bekerültél az adatbázisba, keresni fogunk.');
            setFullName('');
            setEmail('');
            setPreferredRole('');
            setNotes('');
            setDatabaseCommit(false);
            setAcceptsCode(false);
        });
    };

    return (
        <div className="relative w-full mx-auto border border-red-900/30 bg-black/80 backdrop-blur-md p-4 sm:p-8 md:p-10 overflow-hidden shadow-[0_0_30px_rgba(122,17,17,0.1)] rec-card max-w-5xl mt-6 lg:mt-10">
            {/* ARG Background Effects */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,0,0,.8),_transparent_70%)]" />
            
            {/* Camera Viewport / Recording HUD overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-4 right-4 flex items-center gap-2 md:gap-3">
                    <span className="font-mono text-[10px] md:text-xs text-red-600 tracking-[0.3em] uppercase opacity-80 animate-flicker">REC</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                </div>
                
                {/* Viewfinder crosshairs */}
                <div className="hidden md:block absolute top-[20%] left-[10%] w-4 h-4 border-t-2 border-l-2 border-white/10" />
                <div className="hidden md:block absolute top-[20%] right-[10%] w-4 h-4 border-t-2 border-r-2 border-white/10" />
                <div className="hidden md:block absolute bottom-[20%] left-[10%] w-4 h-4 border-b-2 border-l-2 border-white/10" />
                <div className="hidden md:block absolute bottom-[20%] right-[10%] w-4 h-4 border-b-2 border-r-2 border-white/10" />

                {/* Subtle moving scanline overlay specifically for the form */}
                <div className="absolute top-0 left-0 w-full h-[5%] bg-gradient-to-b from-transparent via-red-900/20 to-transparent opacity-40 animate-scanline z-10" />
            </div>

            <div className="relative z-10 space-y-6 sm:space-y-8">
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-end">
                        <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.5em] text-red-600 uppercase">
                            #CSATLAKOZZ A STÁBHOZ
                        </p>
                        <p className="hidden md:block text-[8px] font-mono text-red-500/40 uppercase tracking-widest animate-flicker">
                            SYS_LINK_SECURE
                        </p>
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading tracking-[0.2em] sm:tracking-[0.4em] relative inline-block group">
                        <span className="relative z-10 text-glow-red">STÁB ÉS STATISZTA JELENTKEZÉS</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-muted max-w-3xl leading-relaxed">
                        A TITOK produkció egy folyamatosan bővülő filmes közösség. Ha érdekel a filmkészítés világa,
                        legyen szó kamerák előtti (statiszta, mellékszereplő) vagy mögötti (világosító, csapó, kellékes, runner)
                        munkáról, töltsd ki az alábbi űrlapot. Jelentkezéseddel egy központi bázisba kerülsz, és ha az
                        adott forgatáshoz szükség van rád, a megadott e-mail címen felvesszük veled a kapcsolatot.
                    </p>
                </div>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 text-xs sm:text-sm text-muted">
                    <InfoCard title="Kik jelentkezhetnek?" highlighted="Bárki, előképzettség nélkül">
                        Hobbi filmesek vagy lelkes érdeklődők.
                    </InfoCard>
                    <InfoCard title="Mikor lesz forgatás?" highlighted="Változó (Hétvégék)">
                        Többnyire szombat/vasárnap zajlanak a napi 3-6 órás forgatási blokkok.
                    </InfoCard>
                    <InfoCard title="Díjazás & Ellátás" highlighted="Önkéntes, cserébe catering">
                        Nincs gázsi, viszont forgatásonként étkezést és italt biztosítunk az egész stábnak.
                    </InfoCard>
                </div>

                <section className="grid gap-8 sm:gap-6 md:grid-cols-[1.1fr_0.9fr]">
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <Field label="TELJES_NÉV" required>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="pl. Trencsényi Anna"
                                className={inputClass}
                                disabled={isPending}
                                required
                            />
                        </Field>

                        <Field label="EMAIL_CÍM" required>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="te@pelda.hu"
                                className={inputClass}
                                disabled={isPending}
                                required
                            />
                        </Field>

                        <Field label="Érdekel" required>
                            <div className="border border-white/10 bg-black/60 p-3 text-[11px] sm:text-xs text-muted">
                                <label className="flex items-start gap-3 cursor-pointer touch-manipulation">
                                    <input
                                        type="checkbox"
                                        checked={databaseCommit}
                                        onChange={(e) => setDatabaseCommit(e.target.checked)}
                                        className="mt-0.5 accent-red-800"
                                        disabled={isPending}
                                    />
                                    <span>Hozzájárulok, hogy adataim bekerüljenek a produkció szereplő-/stábbázisába, és értesítsenek jövőbeli forgatásokkal kapcsolatban.</span>
                                </label>
                            </div>
                        </Field>

                        <Field label="MIBEN TUDNÁL SEGÍTENI?" hint="Pl. statiszta, világító, kameraman, runner...">
                            <input
                                type="text"
                                value={preferredRole}
                                onChange={(e) => setPreferredRole(e.target.value)}
                                placeholder="pl. háttér statiszta / hangosítás érdekel"
                                className={inputClass}
                                disabled={isPending}
                            />
                        </Field>

                        <Field label="MEGJEGYZÉS" hint="Rendelkezésre állásod (pl. csak szombat jó), bármilyen extra infó">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                className={`${inputClass} resize-none`}
                                placeholder="pl. Hétvégente általában szabad vagyok. Hoztam már statiszta múltat...stb."
                                disabled={isPending}
                            />
                        </Field>

                        <div className="space-y-3">
                            <label className="flex items-start gap-3 text-[11px] sm:text-xs text-muted cursor-pointer touch-manipulation">
                                <input
                                    type="checkbox"
                                    checked={acceptsCode}
                                    onChange={(e) => setAcceptsCode(e.target.checked)}
                                    className="mt-1 accent-red-800"
                                    disabled={isPending}
                                />
                                <span>
                                    Elfogadom, hogy a részvétel önkéntes, nincs pénzbeli díjazás, és adott esetben a forgatások házirendjét betartom.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full min-h-[48px] py-3.5 sm:py-4 bg-red-900/20 border border-red-900/50 text-red-400 font-heading text-sm sm:text-base tracking-[0.3em] sm:tracking-[0.4em] uppercase hover:bg-red-900/40 transition-all duration-200 disabled:opacity-30 rec-btn touch-manipulation active:scale-[0.99]"
                        >
                            {isPending ? 'FELDOLGOZÁS…' : 'JELENTKEZEM A STÁBBA'}
                        </button>

                        {status === 'success' && (
                            <p className="text-xs text-green-500 font-mono bg-green-900/10 border border-green-900/30 p-3">
                                &gt; {message}
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="text-xs text-red-400 font-mono bg-red-900/10 border border-red-900/40 p-3">
                                &gt; {message}
                            </p>
                        )}
                    </form>

                    <aside className="space-y-4 sm:space-y-6 bg-black/40 border border-white/5 p-4 md:p-6">
                        <div className="space-y-2 sm:space-y-3">
                            <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-red-500 uppercase">ÁLTALÁNOS INFORMÁCIÓK</p>
                            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted">
                                {conductPoints.map((rule) => (
                                    <li key={rule} className="flex gap-3">
                                        <span className="text-red-700">✕</span>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm text-muted">
                            <p className="font-semibold text-white/80">Adatkezelés</p>
                            <p className="text-xs leading-relaxed">
                                A megadott adatokat szigorúan bizalmasan kezeljük, kizárólag a produkció stábbázisában tároljuk.
                                Kéretlen reklámlevelet nem küldünk.
                            </p>
                            <p className="text-xs mt-2">
                                Kérdés? <a href="mailto:info@titoksorozat.hu" className="text-red-500 underline">info@titoksorozat.hu</a>
                            </p>
                        </div>
                    </aside>
                </section>
            </div>
        </div>
    );
}

function Field({ label, children, required, hint }: { label: string; children: ReactNode; required?: boolean; hint?: string }) {
    return (
        <label className="block space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.4em] text-muted uppercase">
                <span>{label}</span>
                {required && <span className="text-red-600">*</span>}
            </div>
            {children}
            {hint && <p className="text-[11px] text-muted/70">{hint}</p>}
        </label>
    );
}

function InfoCard({ title, highlighted, children }: { title: string; highlighted: string; children: ReactNode }) {
    return (
        <div className="border border-white/10 bg-black/50 p-4">
            <p className="text-[10px] font-mono tracking-[0.3em] text-red-400 uppercase mb-2">{title}</p>
            <p className="text-white font-semibold mb-1">{highlighted}</p>
            <p className="text-xs mt-1 leading-relaxed opacity-80">{children}</p>
        </div>
    );
}
