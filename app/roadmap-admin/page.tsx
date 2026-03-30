'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getRoadmapPhases, updateRoadmapPhase, createRoadmapPhase, deleteRoadmapPhase, reorderRoadmapPhases, type TimelinePhase } from '@/app/actions/roadmap';

export default function RoadmapAdminPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = use(searchParams);
    const [phases, setPhases] = useState<TimelinePhase[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<TimelinePhase>>({});
    const [itemsText, setItemsText] = useState('');

    const [isCreating, setIsCreating] = useState(false);
    
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    useEffect(() => {
        loadData();
    }, [token]);

    const loadData = () => {
        setLoading(true);
        // Ensure token is passed if needed, though getRoadmapPhases doesn't strictly need it for reading
        getRoadmapPhases().then((result) => {
            setPhases(result);
            setLoading(false);
            if (result.length === 0 && !token) {
                 setError('Hozzáférés megtagadva vagy nincs adat.');
            } else if (!token) {
                 setError('Kérjük adja meg az admintokent az URL-ben (?token=...).');
            }
        });
    };

    const handleEditClick = (phase: TimelinePhase) => {
        setEditingId(phase.id!);
        setIsCreating(false);
        setEditForm({ ...phase });
        setItemsText((phase.items || []).join('\n'));
    };

    const handleCreateClick = () => {
        setIsCreating(true);
        setEditingId(null);
        setEditForm({
            year: '',
            title: '',
            status: 'upcoming',
            statusLabel: 'HAMAROSAN',
            icon: '📌',
            description: '',
            items: [],
            order_index: phases.length,
        });
        setItemsText('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsCreating(false);
        setEditForm({});
    };

    const handleSave = async () => {
        if (!token) return;
        
        const processedItems = itemsText.split('\n').map(line => line.trim()).filter(line => line !== '');
        const payload = { ...editForm, items: processedItems } as TimelinePhase;

        if (isCreating) {
            const result = await createRoadmapPhase(payload, token);
            if (result.error) alert(result.error);
            else {
                handleCancel();
                loadData();
            }
        } else if (editingId) {
            const result = await updateRoadmapPhase(editingId, payload, token);
            if (result.error) alert(result.error);
            else {
                handleCancel();
                loadData();
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!token) return;
        if (!confirm('Biztosan törlöd ezt a roadmap fázist?')) return;
        const result = await deleteRoadmapPhase(id, token);
        if (result.error) alert(result.error);
        else loadData();
    };

    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            if (e.target instanceof HTMLElement) e.target.style.opacity = '0.3';
        }, 0);
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.preventDefault(); // allow drop
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = async (e: React.DragEvent<HTMLTableRowElement>, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) return;
        if (e.target instanceof HTMLElement) e.target.style.opacity = '1';

        const newPhases = [...phases];
        const [movedPhase] = newPhases.splice(draggedIndex, 1);
        newPhases.splice(dropIndex, 0, movedPhase);

        const updatedPhases = newPhases.map((p, i) => ({ ...p, order_index: i }));
        setPhases(updatedPhases);
        setDraggedIndex(null);

        if (!token) return;
        setIsSavingOrder(true);
        const updates = updatedPhases.map(p => ({ id: p.id!, order_index: p.order_index! }));
        const result = await reorderRoadmapPhases(updates, token);
        setIsSavingOrder(false);

        if (result.error) {
            alert(result.error);
            loadData();
        }
    };

    const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
        if (e.target instanceof HTMLElement) e.target.style.opacity = '1';
        setDraggedIndex(null);
    };

    const handleItemsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setItemsText(e.target.value);
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

    if (error && !token) {
        return (
            <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-mono">
                <div className="text-center max-w-md">
                    <p className="text-red-500 text-sm mb-6">&gt; {error}</p>
                    <Link
                        href="/"
                        className="inline-block py-3 px-6 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-xs tracking-widest uppercase"
                    >
                        Vissza a főoldalra
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050505] relative pt-12 pb-20 px-4 font-mono">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(122,17,17,.5),_transparent_60%)]" />
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-heading tracking-[0.3em] text-white uppercase">
                            Roadmap Admin
                        </h1>
                        <p className="text-xs text-muted tracking-[0.3em] mt-1 flex items-center gap-3">
                            Szerkesztő felület
                            {isSavingOrder && <span className="text-amber-500 animate-pulse hidden sm:inline">&gt; Sorrend mentése...</span>}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleCreateClick}
                            className="px-4 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/30 transition text-xs tracking-widest uppercase"
                        >
                            + Új Fázis
                        </button>
                        <Link
                            href="/roadmap"
                            className="px-4 py-2 border border-white/10 text-white/80 hover:border-white/30 transition text-xs tracking-widest uppercase"
                        >
                            Megtekintés
                        </Link>
                    </div>
                </div>

                {/* CREATION OR EDIITING FORM */}
                {(isCreating || editingId) && (
                    <div className="border border-white/10 bg-black/70 p-6 mb-8 uppercase text-xs">
                        <h2 className="text-red-500 tracking-widest mb-4">
                            {isCreating ? 'Új fázis hozzáadása' : 'Fázis szerkesztése'}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <label className="block">
                                <span className="text-muted block mb-1">Cím / Title</span>
                                <input type="text" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-red-900" />
                            </label>
                            <label className="block">
                                <span className="text-muted block mb-1">Év / Year</span>
                                <input type="text" value={editForm.year || ''} onChange={e => setEditForm({...editForm, year: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-red-900" />
                            </label>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <label className="block">
                                <span className="text-muted block mb-1">Sorrend (0,1,2...)</span>
                                <input type="number" value={editForm.order_index ?? 0} onChange={e => setEditForm({...editForm, order_index: parseInt(e.target.value)})} className="w-full bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-red-900" />
                            </label>
                            <label className="block">
                                <span className="text-muted block mb-1">Státusz (belső)</span>
                                <select value={editForm.status || 'upcoming'} onChange={e => setEditForm({...editForm, status: e.target.value as any})} className="w-full bg-black border border-white/10 p-2 text-white outline-none focus:border-red-900 appearance-none">
                                    <option value="completed">completed</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="upcoming">upcoming</option>
                                </select>
                            </label>
                            <label className="block">
                                <span className="text-muted block mb-1">Státusz Szöveg (pl. HAMAROSAN)</span>
                                <input type="text" value={editForm.statusLabel || ''} onChange={e => setEditForm({...editForm, statusLabel: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-red-900" />
                            </label>
                            <label className="block">
                                <span className="text-muted block mb-1">Ikon (Emoji)</span>
                                <input type="text" value={editForm.icon || ''} onChange={e => setEditForm({...editForm, icon: e.target.value})} className="w-full bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-red-900" />
                            </label>
                        </div>
                        
                        <label className="block mb-4">
                            <span className="text-muted block mb-1">Leírás (Description)</span>
                            <textarea value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} rows={2} className="w-full bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-red-900 resize-none" />
                        </label>
                        
                        <label className="block mb-6">
                            <span className="text-muted block mb-1">Pontok (Items) - Minden új sor egy pont. Írj ' ✓' jelet a végére a kipipáláshoz.</span>
                            <textarea value={itemsText} onChange={handleItemsChange} rows={5} className="w-full bg-black/50 border border-white/10 p-2 text-white outline-none focus:border-red-900 resize-none" />
                        </label>

                        <div className="flex gap-3">
                            <button onClick={handleSave} className="px-6 py-2 bg-red-900/30 border border-red-900 text-red-400 hover:bg-red-900/50 transition">
                                Mentés
                            </button>
                            <button onClick={handleCancel} className="px-6 py-2 border border-white/10 text-white/50 hover:text-white transition">
                                Mégse
                            </button>
                        </div>
                    </div>
                )}

                <div className="border border-white/10 bg-black/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="w-10"></th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase">Sorrend</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase">Cím / Év</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase">Státusz</th>
                                    <th className="text-left py-3 px-4 text-[10px] tracking-[0.3em] text-red-500 uppercase hidden md:table-cell">Műveletek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phases.map((s, index) => (
                                    <tr 
                                        key={s.id} 
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragEnd={handleDragEnd}
                                        className={`border-b border-white/5 hover:bg-white/5 transition-colors ${draggedIndex === index ? 'opacity-50 line-through bg-black' : ''}`}
                                    >
                                        <td className="py-3 px-2 text-white/20 select-none cursor-move text-center" title="Fogd és vidd a sorrend átrendezéséhez">≡</td>
                                        <td className="py-3 px-4 text-white font-medium">{s.order_index}</td>
                                        <td className="py-3 px-4 text-white font-medium">
                                            {s.icon} {s.title}
                                            <span className="block text-xs text-muted mt-1">{s.year}</span>
                                        </td>
                                        <td className="py-3 px-4 text-white/80 text-xs">
                                            <span className={`px-2 py-0.5 border ${s.status === 'completed' ? 'border-green-500/50 text-green-400' : s.status === 'in-progress' ? 'border-amber-500/50 text-amber-400' : 'border-white/20 text-white/50'}`}>
                                                {s.statusLabel}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 flex flex-col sm:flex-row gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEditClick(s)}
                                                className="text-white hover:text-red-400 text-[10px] tracking-wider uppercase border border-white/20 hover:border-red-900/50 px-2 py-1 transition"
                                            >
                                                Szerkesztés
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(s.id!)}
                                                className="text-red-500 hover:text-red-400 text-[10px] tracking-wider uppercase border border-red-900/50 hover:border-red-700 px-2 py-1 transition"
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

                {phases.length === 0 && !loading && (
                    <p className="text-center text-muted py-12 text-sm">Még nincs feltöltve egyetlen fázis sem.</p>
                )}
            </div>
        </main>
    );
}
