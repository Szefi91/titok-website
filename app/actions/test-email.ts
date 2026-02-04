'use server';

import { subscribeAction } from '@/app/actions/newsletter';

export async function sendTestAction() {
    console.log('Test action triggered');
    try {
        const result = await subscribeAction({
            name: 'Szefi',
            email: 'szefi91@gmail.com'
        });
        return result;
    } catch (err) {
        console.error('Test action error:', err);
        return { error: 'Test failed' };
    }
}
