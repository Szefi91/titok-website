'use client';

import { useState, useEffect, useRef } from 'react';

import { TimelinePhase } from '@/app/actions/roadmap';

function StatusBadge({ status, label }: { status: TimelinePhase['status']; label: string }) {
    const colors = {
        'completed': 'bg-green-500/20 text-green-400 border-green-500/30',
        'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse',
        'upcoming': 'bg-white/5 text-white/40 border-white/10',
    };

    const dotColors = {
        'completed': 'bg-green-500',
        'in-progress': 'bg-amber-500',
        'upcoming': 'bg-white/30',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase border rounded-sm ${colors[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />
            {label}
        </span>
    );
}

function TimelineCard({ phase, index, isVisible }: { phase: TimelinePhase; index: number; isVisible: boolean }) {
    const isLeft = index % 2 === 0;

    return (
        <div className={`relative flex items-start gap-6 md:gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:flex-row pl-12 lg:pl-0`}>
            {/* Card */}
            <div
                className={`
                    w-full lg:w-[calc(50%-2rem)] 
                    bg-white/[0.03] backdrop-blur-md 
                    border border-white/[0.08] hover:border-accent/40
                    p-5 md:p-8 rounded-sm
                    transition-all duration-700 ease-out
                    relative overflow-hidden group
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
            >
                {/* Top glow line */}
                <div className={`absolute top-0 left-0 w-full h-[1px] ${phase.status === 'completed' ? 'bg-green-500/30' : phase.status === 'in-progress' ? 'bg-amber-500/30' : 'bg-white/5'} group-hover:opacity-100 transition-opacity`} />

                {/* Subtle glass highlight */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{phase.icon}</span>
                        <div>
                            <p className="text-sm font-mono text-white/50 tracking-wider">{phase.year}</p>
                            <h3 className="text-xl md:text-2xl font-heading text-white tracking-wider">{phase.title}</h3>
                        </div>
                    </div>
                    <StatusBadge status={phase.status} label={phase.statusLabel} />
                </div>

                {phase.description && (
                    <p className="text-sm text-muted mb-5 leading-relaxed italic opacity-70">
                        {phase.description}
                    </p>
                )}

                {/* Items */}
                <ul className="space-y-2.5">
                    {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${phase.status === 'completed'
                                    ? 'bg-green-500/60'
                                    : phase.status === 'in-progress'
                                        ? item.includes('✓')
                                            ? 'bg-green-500/60'
                                            : 'bg-amber-500/40'
                                        : 'bg-white/20'
                                }`} />
                            <span className={item.includes('✓') ? 'line-through opacity-50' : ''}>
                                {item.replace(' ✓', '')}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Timeline dot - Center connector */}
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-10 flex flex-col items-center z-10">
                <div className={`
                    w-3 h-3 md:w-4 md:h-4 rounded-full border-2
                    ${phase.status === 'completed'
                        ? 'bg-green-500/30 border-green-500 shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                        : phase.status === 'in-progress'
                            ? 'bg-amber-500/30 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                            : 'bg-white/10 border-white/20'
                    }
                `} />
            </div>

            {/* Spacer for the other side on desktop */}
            <div className={`hidden lg:block w-[calc(50%-2rem)]`} />
        </div>
    );
}

export default function ProductionRoadmap({ phases }: { phases: TimelinePhase[] }) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="roadmap"
            className="py-24 px-4 bg-[#050505] relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-900/[0.04] blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-red-900/[0.03] blur-[120px] rounded-full" />
                
                {/* CRT Scanline Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 z-0 mix-blend-overlay pointer-events-none animate-flicker" />
                <div className="absolute left-0 right-0 h-[10%] bg-gradient-to-b from-transparent via-red-900/10 to-transparent opacity-30 animate-scanline z-0 pointer-events-none" />
                
                {/* Mobile vertical line base */}
                <div className="absolute left-[21px] top-0 bottom-0 w-[1px] bg-white/5 lg:hidden" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-xs font-mono text-accent tracking-[0.3em] uppercase mb-3 opacity-70">
                        A produkció útja
                    </p>
                    <h2 className="text-4xl md:text-6xl font-heading text-white mb-5 text-glow-red relative inline-block animate-flicker group">
                        {/* Glitch layers */}
                        <span className="absolute top-0 left-[2px] opacity-70 text-red-500 animate-glitch" aria-hidden="true">IDŐVONAL</span>
                        <span className="absolute top-0 -left-[2px] opacity-70 text-blue-500 animate-glitch" style={{ animationDelay: '0.2s' }} aria-hidden="true">IDŐVONAL</span>
                        <span className="relative z-10 group-hover:animate-glitch">IDŐVONAL</span>
                    </h2>
                    <div className="w-16 h-0.5 bg-accent/50 mx-auto mb-6" />
                    <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Az első ötlettől a premierig végigkísérjük a 4. évad minden állomását.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central vertical line */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px]">
                        <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    </div>

                    <div className="space-y-8 lg:space-y-12">
                        {phases.map((phase, index) => (
                            <TimelineCard
                                key={phase.id || phase.title}
                                phase={phase}
                                index={index}
                                isVisible={isVisible}
                            />
                        ))}
                    </div>

                    {/* Bottom terminal-style status */}
                    <div className="mt-16 text-center">
                        <div className="inline-block bg-white/[0.03] backdrop-blur-md border border-white/[0.08] px-8 py-5 rounded-sm">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">
                                    Aktív Produkció
                                </span>
                            </div>
                            <p className="font-mono text-[11px] text-white/30">
                                Utolsó frissítés: 2026. március &nbsp;·&nbsp; Casting: <span className="text-accent">NYITOTT</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
