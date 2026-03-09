'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { cookies } from 'next/headers';

export async function unsubscribeAction(id: string) {
    if (!id) {
        return { error: 'Érvénytelen azonosító.' };
    }

    try {
        // 1. Delete from Supabase
        const { error: dbError } = await supabaseAdmin
            .from('newsletter_subscribers')
            .delete()
            .eq('id', id);

        if (dbError) throw dbError;

        // 2. Clear cookie
        const cookieStore = await cookies();
        cookieStore.delete('titok_subscribed');

        return { success: true };

    } catch (err) {
        console.error('Unsubscribe error:', err);
        return { error: 'Hiba történt a leiratkozás során.' };
    }
}

export async function unsubscribeByEmailAction(email: string) {
    if (!email) {
        return { error: 'Érvénytelen email cím.' };
    }

    try {
        const { error: dbError } = await supabaseAdmin
            .from('newsletter_subscribers')
            .delete()
            .eq('email', email);

        if (dbError) throw dbError;

        const cookieStore = await cookies();
        cookieStore.delete('titok_subscribed');

        return { success: true };

    } catch (err) {
        console.error('Unsubscribe by email error:', err);
        return { error: 'Hiba történt a leiratkozás során.' };
    }
}
