'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export interface TimelinePhase {
    id?: string;
    year: string;
    title: string;
    status: 'completed' | 'in-progress' | 'upcoming';
    statusLabel: string;
    items: string[];
    icon: string;
    description?: string;
    order_index?: number;
}

export async function getRoadmapPhases(): Promise<TimelinePhase[]> {
    try {
        const { data, error } = await supabaseAdmin
            .from('roadmap_phases')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) {
            console.error('[getRoadmapPhases] Error fetching from supabase:', error);
            return [];
        }

        // Map snake_case to camelCase where necessary
        return (data || []).map((row) => ({
            id: row.id,
            year: row.year,
            title: row.title,
            status: row.status as TimelinePhase['status'],
            statusLabel: row.status_label,
            items: row.items,
            icon: row.icon,
            description: row.description,
            order_index: row.order_index,
        }));
    } catch (err) {
        console.error('[getRoadmapPhases] Unexpected error:', err);
        return [];
    }
}

export async function updateRoadmapPhase(
    id: string,
    updates: Partial<TimelinePhase>,
    token: string | null
): Promise<{ error?: string; success?: boolean }> {
    const expectedToken = process.env.STATISZTA_ADMIN_TOKEN;
    if (!expectedToken || token !== expectedToken) {
        return { error: 'Hozzáférés megtagadva.' };
    }

    try {
        const payload: Record<string, any> = {};
        if (updates.year !== undefined) payload.year = updates.year;
        if (updates.title !== undefined) payload.title = updates.title;
        if (updates.status !== undefined) payload.status = updates.status;
        if (updates.statusLabel !== undefined) payload.status_label = updates.statusLabel;
        if (updates.icon !== undefined) payload.icon = updates.icon;
        if (updates.description !== undefined) payload.description = updates.description;
        if (updates.items !== undefined) payload.items = updates.items;
        if (updates.order_index !== undefined) payload.order_index = updates.order_index;

        const { error } = await supabaseAdmin
            .from('roadmap_phases')
            .update(payload)
            .eq('id', id);

        if (error) {
            console.error('[updateRoadmapPhase] Supabase update error:', error);
            return { error: 'Nem sikerült menteni a módosításokat.' };
        }

        revalidatePath('/roadmap');
        revalidatePath('/roadmap-admin');

        return { success: true };
    } catch (err) {
        console.error('[updateRoadmapPhase] Unexpected error:', err);
        return { error: 'Váratlan hiba történt.' };
    }
}

export async function createRoadmapPhase(
    phase: TimelinePhase,
    token: string | null
): Promise<{ error?: string; success?: boolean }> {
    const expectedToken = process.env.STATISZTA_ADMIN_TOKEN;
    if (!expectedToken || token !== expectedToken) {
        return { error: 'Hozzáférés megtagadva.' };
    }

    try {
        const { error } = await supabaseAdmin.from('roadmap_phases').insert({
            year: phase.year,
            title: phase.title,
            status: phase.status,
            status_label: phase.statusLabel,
            icon: phase.icon,
            description: phase.description || null,
            items: phase.items || [],
            order_index: phase.order_index || 0,
        });

        if (error) {
            console.error('[createRoadmapPhase] Supabase insert error:', error);
            return { error: 'Nem sikerült létrehozni a fázist.' };
        }

        revalidatePath('/roadmap');
        revalidatePath('/roadmap-admin');

        return { success: true };
    } catch (err) {
        console.error('[createRoadmapPhase] Unexpected error:', err);
        return { error: 'Váratlan hiba történt.' };
    }
}

export async function deleteRoadmapPhase(
    id: string,
    token: string | null
): Promise<{ error?: string; success?: boolean }> {
    const expectedToken = process.env.STATISZTA_ADMIN_TOKEN;
    if (!expectedToken || token !== expectedToken) {
        return { error: 'Hozzáférés megtagadva.' };
    }

    try {
        const { error } = await supabaseAdmin.from('roadmap_phases').delete().eq('id', id);

        if (error) {
            console.error('[deleteRoadmapPhase] Supabase error:', error);
            return { error: 'Nem sikerült törölni a fázist.' };
        }

        revalidatePath('/roadmap');
        revalidatePath('/roadmap-admin');

        return { success: true };
    } catch (err) {
        console.error('[deleteRoadmapPhase] Unexpected error:', err);
        return { error: 'Váratlan hiba történt.' };
    }
}

export async function reorderRoadmapPhases(
    updates: { id: string; order_index: number }[],
    token: string | null
): Promise<{ error?: string; success?: boolean }> {
    const expectedToken = process.env.STATISZTA_ADMIN_TOKEN;
    if (!expectedToken || token !== expectedToken) {
        return { error: 'Hozzáférés megtagadva.' };
    }

    try {
        // Run updates sequentially (safe for small arrays like roadmap phases)
        for (const update of updates) {
            await supabaseAdmin
                .from('roadmap_phases')
                .update({ order_index: update.order_index })
                .eq('id', update.id);
        }

        revalidatePath('/roadmap');
        revalidatePath('/roadmap-admin');

        return { success: true };
    } catch (err) {
        console.error('[reorderRoadmapPhases] Unexpected error:', err);
        return { error: 'Váratlan hiba történt a sorrend mentésekor.' };
    }
}
