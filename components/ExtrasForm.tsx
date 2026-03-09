'use client';

import { useState, useTransition, useEffect } from 'react';
import type { ReactNode } from 'react';
import { submitExtrasSignup, getStatisztaSignupCount } from '@/app/actions/statisztak';

const LOCATION_ADDRESS = '2100 Gödöllő, Páter Károly utca 1. – Szőkőkút (Egyetem főbejárat)';
const LOCATION_COORDS = '47.59461961349297,19.361063071517254';
const TARGET_COUNT = 35;
const MAP_LINK = 'https://maps.app.goo.gl/33VoqV57CobGUmPo6';
const MAP_EMBED = `https://www.google.com/maps?q=${LOCATION_COORDS}&z=17&output=embed`;

const conductPoints = [
    'Önkéntes részvétel – nincs díjazás, cserébe víz + pizza + stábtámogatás jár.',
    'Dress code: sima hétköznapi ruha (civil, logómentes, visszafogott).',
    'Gyülekező 12:40-kor a gödöllői szökőkútnál (Páter Károly u. 1.); késés nincs, a stáb döntése végleges.',
];

const inputClass = 'w-full bg-black/70 border border-white/10 text-white placeholder-white/30 font-mono text-base sm:text-sm py-3 px-4 outline-none focus:border-red-900/50 transition-all duration-200 disabled:opacity-50 s29-input-focus min-h-[48px]';

export default function ExtrasForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [preferredRole, setPreferredRole] = useState('');
    const [notes, setNotes] = useState('');
    const [pizzaPreference, setPizzaPreference] = useState<'magyaros' | 'vegetarian'>('magyaros');
    const [attendanceCommit, setAttendanceCommit] = useState(false);
    const [acceptsCode, setAcceptsCode] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [isPending, startTransition] = useTransition();
    const [signupCount, setSignupCount] = useState<number | null>(null);

    useEffect(() => {
        getStatisztaSignupCount().then(setSignupCount);
    }, []);

    const refreshCount = () => getStatisztaSignupCount().then(setSignupCount);

    const handleCopyAddress = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(LOCATION_ADDRESS).catch(() => undefined);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!acceptsCode) {
            setStatus('error');
            setMessage('A részvételhez el kell fogadnod a szabályokat.');
            return;
        }

        if (!attendanceCommit) {
            setStatus('error');
            setMessage('Pipáld be, hogy 100%-ban számíthassunk rád a szökőkútnál.');
            return;
        }

        setStatus('idle');
        setMessage('');

        startTransition(async () => {
            const result = await submitExtrasSignup({
                fullName,
                email,
                availabilitySlot: '2026-03-29_confirmed',
                preferredRole,
                notes,
                acceptsCode,
                pizzaPreference,
                confirmedAttendance: attendanceCommit,
                futureInterest: false,
            });

            if (result?.error) {
                setStatus('error');
                setMessage(result.error);
                return;
            }

            setStatus('success');
            setMessage('Rögzítettük a jelentkezésed. A forgatás előtt részletes e-mailt küldünk.');
            refreshCount();
            setFullName('');
            setEmail('');
            setPreferredRole('');
            setNotes('');
            setPizzaPreference('magyaros');
            setAttendanceCommit(false);
            setAcceptsCode(false);
        });
    };

    return (
        <div className="relative w-full mx-auto border border-white/5 bg-black/70 backdrop-blur-md p-4 sm:p-6 md:p-10 overflow-hidden s29-card">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(122,17,17,.5),_transparent_60%)]" />
            {signupCount !== null && (
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 s29-count">
                    <span className="inline-block px-2 py-1 sm:px-3 sm:py-1.5 border border-green-700/50 bg-green-950/40 text-green-400 font-mono text-[10px] sm:text-xs tracking-wider text-right max-w-[140px] sm:max-w-none">
                        <span className="sm:hidden">{signupCount}/{TARGET_COUNT}</span>
                        <span className="hidden sm:inline">{signupCount} / {TARGET_COUNT} statiszta jelentkezett</span>
                    </span>
                </div>
            )}
            <div className="relative z-10 space-y-6 sm:space-y-8">
                <div className="space-y-2 sm:space-y-3">
                    <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.5em] text-red-600 uppercase">#29MÁRC • EGYETEMI JELENET</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading tracking-[0.2em] sm:tracking-[0.4em]">STATISZTA JELENTKEZÉS</h1>
                    <p className="text-xs sm:text-sm md:text-base text-muted max-w-3xl leading-relaxed">
                        2026. március 29-én (vasárnap) egyetemi jelenetet forgatunk. Gyülekező 12:40-kor a gödöllői campus előtti szökőkútnál
                        (Páter Károly utca 1.), a felvétel 13:00-16:00 között zajlik. Önkéntes statisztákat keresünk hétköznapi
                        civil ruhában – nincs díjazás, viszont ellátást és háttértámogatást kapsz. A kitöltés után belső listára kerülsz,
                        és visszaigazolást küldünk a részletekkel + titoktartási tudnivalókkal.
                    </p>
                </div>

                <div className="grid gap-3 sm:gap-4 md:grid-cols-3 text-xs sm:text-sm text-muted">
                    <InfoCard title="Időpont" highlighted="2026. március 29. (vasárnap)">
                        13:00 – 16:00 / forgatás, gyülekező 12:40-kor.
                    </InfoCard>
                    <InfoCard title="Helyszín" highlighted="Gödöllő – Szőkőkút">
                        {LOCATION_ADDRESS}. Gyülekező 12:40.
                    </InfoCard>
                    <InfoCard title="Dress code" highlighted="Sima hétköznapi ruha">
                        Civil, logómentes, neutrális színek. Hozz kényelmes cipőt.
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

                        <Field label="OTT LESZEK" required>
                            <div className="border border-white/10 bg-black/60 p-3 text-[11px] sm:text-xs text-muted">
                                <label className="flex items-start gap-3 cursor-pointer touch-manipulation">
                                    <input
                                        type="checkbox"
                                        checked={attendanceCommit}
                                        onChange={(e) => setAttendanceCommit(e.target.checked)}
                                        className="mt-0.5 accent-red-800"
                                        disabled={isPending}
                                    />
                                    <span>Bejelölöm, hogy 12:40-re a gödöllői szökőkútnál leszek, és végig maradok a 13:00-16:00 közötti forgatáson.</span>
                                </label>
                            </div>
                        </Field>

                        <Field label="MIBE SZÁMÍTHATUNK_RÁD?" hint="Pl. statiszta, runner, kellékfelelős. Opcionális">
                            <input
                                type="text"
                                value={preferredRole}
                                onChange={(e) => setPreferredRole(e.target.value)}
                                placeholder="pl. háttér statiszta / praktikus effekt"
                                className={inputClass}
                                disabled={isPending}
                            />
                        </Field>

                        <Field label="MEGJEGYZÉS" hint="Speciális igény, érkezés, saját kellék, allergia, stb.">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                className={`${inputClass} resize-none`}
                                placeholder="pl. 15:30-ig tudok maradni / laktózérzékeny vagyok / hozok saját táskát."
                                disabled={isPending}
                            />
                        </Field>

                        <Field label="PIZZA OPCIÓ" required hint="Jelölj egyet: magyaros vagy vegetáriánus.">
                            <div className="flex flex-wrap gap-4 sm:gap-6 border border-white/10 bg-black/60 p-3">
                                <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-muted touch-manipulation min-h-[44px]">
                                    <input
                                        type="radio"
                                        name="pizza"
                                        checked={pizzaPreference === 'magyaros'}
                                        onChange={() => setPizzaPreference('magyaros')}
                                        className="accent-red-800"
                                        disabled={isPending}
                                    />
                                    <span>Magyaros</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-muted touch-manipulation min-h-[44px]">
                                    <input
                                        type="radio"
                                        name="pizza"
                                        checked={pizzaPreference === 'vegetarian'}
                                        onChange={() => setPizzaPreference('vegetarian')}
                                        className="accent-red-800"
                                        disabled={isPending}
                                    />
                                    <span>Vegetáriánus</span>
                                </label>
                            </div>
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
                                    Elfogadom, hogy a részvétel önkéntes, nincs pénzbeli díjazás, és betartom a házirendet / titoktartást.
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full min-h-[48px] py-3.5 sm:py-4 bg-red-900/20 border border-red-900/50 text-red-400 font-heading text-sm sm:text-base tracking-[0.3em] sm:tracking-[0.4em] uppercase hover:bg-red-900/40 transition-all duration-200 disabled:opacity-30 s29-btn touch-manipulation active:scale-[0.99]"
                        >
                            {isPending ? 'FELDOLGOZÁS…' : 'JELENTKEZEM'}
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
                            <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-red-500 uppercase">HÁZIREND / CODE OF CONDUCT</p>
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
                            <p className="font-semibold text-white/80">Mit biztosítunk</p>
                            <ul className="space-y-1">
                                <li>• Helyszíni víz + pizza rendelés (vegetáriánus opció is)</li>
                                <li>• Pihenő / táska lerakó + stábkapcsolattartó</li>
                                <li>• 3 órás forgatás: 13:00-16:00 (gyülekező 12:40, késés nélkül)</li>
                            </ul>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm text-muted">
                            <p className="font-semibold text-white/80">Adatkezelés</p>
                            <p className="text-xs leading-relaxed">
                                Csak a megadott adatokat tároljuk (név, e-mail, elérhetőség). Nem kérünk lakcímet, telefonszámot.
                                Az adatokat kizárólag a március 29-i forgatás szervezéséhez használjuk.
                            </p>
                            <p className="text-xs">
                                Kérdés? <a href="mailto:info@titoksorozat.hu" className="text-red-500 underline">info@titoksorozat.hu</a>
                            </p>
                        </div>

                        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted">
                            <p className="font-semibold text-white/80">Google Térkép</p>
                            <div className="aspect-video min-h-[180px] border border-white/10 bg-black/50">
                                <iframe
                                    src={MAP_EMBED}
                                    className="w-full h-full"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                    style={{ filter: 'grayscale(1) contrast(1.2) brightness(0.65)' }}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-2 text-xs">
                                <button
                                    type="button"
                                    onClick={handleCopyAddress}
                                    className="min-h-[44px] px-3 py-2.5 sm:py-1 border border-white/10 text-white/80 hover:border-red-700 hover:text-red-400 transition touch-manipulation"
                                >
                                    Cím másolása
                                </button>
                                <a
                                    href={MAP_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="min-h-[44px] flex items-center justify-center px-3 py-2.5 sm:py-1 border border-red-800 text-red-400 hover:bg-red-900/30 transition touch-manipulation"
                                >
                                    Megnyitom Google Térképen
                                </a>
                            </div>
                            <p className="text-[11px] sm:text-xs leading-relaxed">Gyülekező: {LOCATION_ADDRESS} (szökőkút körgyűrű).</p>
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
            <p className="text-white font-semibold">{highlighted}</p>
            <p className="text-xs mt-1 leading-relaxed">{children}</p>
        </div>
    );
}
