'use client';

import { sendTestAction } from '@/app/actions/test-email';
import { useEffect } from 'react';

export default function TestTrigger() {
    useEffect(() => {
        // We only trigger if the user specifically asks or manually refreshes a test route
        // but for now, I'll just provide a button on the UI if needed.
    }, []);

    return (
        <button
            onClick={async () => {
                const res = await sendTestAction();
                alert(res.success ? 'Email elküldve!' : 'Hiba: ' + res.error);
            }}
            className="fixed bottom-4 left-4 z-[9999] bg-red-900 text-white p-2 text-[8px] opacity-20 hover:opacity-100"
        >
            TEST_EMAIL
        </button>
    );
}
