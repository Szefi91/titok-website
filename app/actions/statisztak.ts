'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import nodemailer from 'nodemailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
});

type ExtrasFormInput = {
    fullName: string;
    email: string;
    availabilitySlot: string;
    preferredRole?: string;
    notes?: string;
    pizzaPreference?: string;
    confirmedAttendance?: boolean;
    acceptsCode: boolean;
    futureInterest: boolean;
};

const sanitize = (value: string) => value?.trim() ?? '';

export async function getStatisztaSignupCount(): Promise<number> {
    try {
        const { count, error } = await supabaseAdmin
            .from('statiszta_signups')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('[getStatisztaSignupCount]', error);
            return 0;
        }
        return count ?? 0;
    } catch (err) {
        console.error('[getStatisztaSignupCount]', err);
        return 0;
    }
}

export async function submitExtrasSignup(formData: ExtrasFormInput) {
    const fullName = sanitize(formData.fullName);
    const email = sanitize(formData.email).toLowerCase();
    const availabilitySlot = sanitize(formData.availabilitySlot);
    const preferredRole = sanitize(formData.preferredRole || '');
    const notes = sanitize(formData.notes || '');
    const pizzaPreference = sanitize(formData.pizzaPreference || 'magyaros');
    const confirmedAttendance = Boolean(formData.confirmedAttendance);
    const acceptsCode = Boolean(formData.acceptsCode);
    const futureInterest = Boolean(formData.futureInterest);

    if (!fullName || fullName.length < 3) {
        return { error: 'Add meg a teljes neved (legalább 3 karakter).' };
    }

    if (!emailRegex.test(email)) {
        return { error: 'Adj meg érvényes email címet.' };
    }

    if (!availabilitySlot) {
        return { error: 'Válaszd ki, hogy melyik forgatáson tudsz megjelenni.' };
    }

    if (!acceptsCode) {
        return { error: 'A részvétel feltétele a házirend elfogadása.' };
    }

    try {
        // #region agent log
        const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
        const hasServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
        fetch('http://127.0.0.1:7296/ingest/0d54fc1c-c5ae-4811-ae09-b5e164628bcf', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '41e666' }, body: JSON.stringify({ sessionId: '41e666', location: 'statisztak.ts:insert-before', message: 'Supabase env check', data: { hasSupabaseUrl, hasServiceKey }, timestamp: Date.now(), hypothesisId: 'H3' }) }).catch(() => {});
        // #endregion
        const { error } = await supabaseAdmin.from('statiszta_signups').insert({
            full_name: fullName,
            email,
            availability_slot: availabilitySlot,
            preferred_role: preferredRole || null,
            notes: notes || null,
            pizza_preference: pizzaPreference || 'magyaros',
            confirmed_attendance: confirmedAttendance,
            future_interest: futureInterest,
            accepts_code: acceptsCode,
        });

        if (error) {
            // #region agent log
            fetch('http://127.0.0.1:7296/ingest/0d54fc1c-c5ae-4811-ae09-b5e164628bcf', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '41e666' }, body: JSON.stringify({ sessionId: '41e666', location: 'statisztak.ts:insert-error', message: 'Supabase insert error', data: { code: error.code, message: error.message, details: error.details, hint: error.hint }, timestamp: Date.now(), hypothesisId: 'H1-H2-H4-H5' }) }).catch(() => {});
            // #endregion
            console.error('[submitExtrasSignup] Supabase insert error', error);
            return { error: 'Nem sikerült rögzíteni a jelentkezést. Próbáld meg pár perc múlva.' };
        }

        try {
            const pizzaLabel = pizzaPreference === 'vegetarian' ? 'Vegetáriánus' : 'Magyaros';
            await transporter.sendMail({
                from: '"TITOK" <info@titoksorozat.hu>',
                to: email,
                subject: 'TITOK – Statiszta jelentkezés visszaigazolása',
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
                        <style>
                            body { font-family: 'Inter', sans-serif; background-color: #050505; color: #E6E6E6; margin: 0; padding: 0; }
                            .email-wrapper { background-color: #050505; padding: 60px 20px; }
                            .container { max-width: 500px; margin: 0 auto; background-color: #080808; padding: 60px 50px; border: 1px solid rgba(122, 17, 17, 0.2); }
                            .header { text-align: center; margin-bottom: 50px; }
                            .logo { font-family: 'Oswald', sans-serif; font-size: 40px; letter-spacing: 15px; color: #E6E6E6; font-weight: 200; text-transform: uppercase; margin: 0; padding-left: 15px; white-space: nowrap; display: inline-block; }
                            @media only screen and (max-width: 480px) { .logo { font-size: 28px !important; letter-spacing: 8px !important; padding-left: 8px !important; } .container { padding: 40px 30px !important; } .welcome-text { font-size: 16px !important; } }
                            .divider { width: 30px; height: 1px; background-color: #7A1111; margin: 25px auto; }
                            .welcome-text { font-family: 'Oswald', sans-serif; font-size: 20px; letter-spacing: 4px; text-transform: uppercase; color: #ffffff; margin-bottom: 30px; text-align: center; }
                            .content { line-height: 2; color: #A0A0A0; font-size: 14px; letter-spacing: 1px; }
                            .list-section { margin: 40px 0; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 30px; }
                            .list-item { margin-bottom: 15px; display: block; }
                            .bullet { color: #7A1111; font-weight: bold; margin-right: 10px; }
                            .footer { margin-top: 80px; text-align: center; color: #404040; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; }
                            .accent-text { color: #7A1111; font-weight: bold; }
                            a { color: #7A1111; }
                        </style>
                    </head>
                    <body>
                        <div class="email-wrapper">
                            <div class="container">
                                <div class="header">
                                    <h1 class="logo">TITOK</h1>
                                    <div class="divider"></div>
                                </div>
                                <div class="welcome-text">KÖSZÖNJÜNK, ${fullName.toUpperCase()}</div>
                                <div class="content">
                                    <p>Rögzítettük a statiszta jelentkezésed. Az alábbi adatokkal számolunk:</p>
                                    <div class="list-section">
                                        <div class="list-item"><span class="bullet">></span> <strong>Időpont:</strong> 2026. március 29. (vasárnap)</div>
                                        <div class="list-item"><span class="bullet">></span> <strong>Helyszín:</strong> Gödöllő, Páter Károly utca 1. – Szőkőkút</div>
                                        <div class="list-item"><span class="bullet">></span> <strong>Gyülekező:</strong> 12:40</div>
                                        <div class="list-item"><span class="bullet">></span> <strong>Pizza:</strong> ${pizzaLabel}</div>
                                    </div>
                                    <p style="text-align: center; margin-top: 30px;"><span class="accent-text">Találkozunk vasárnap 12:40-kor Gödöllőn.</span></p>
                                    <p style="text-align: center; margin-top: 20px; font-size: 12px;">Ha esetleg mégse tudsz jönni, írj az <a href="mailto:info@titoksorozat.hu">info@titoksorozat.hu</a> címre.</p>
                                </div>
                                <div class="footer">
                                    <p>&copy; ${new Date().getFullYear()} TITOK PROJECT</p>
                                </div>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            });
        } catch (mailErr) {
            console.error('[submitExtrasSignup] Email send error', mailErr);
            // Ne térjünk hibával – a jelentkezés sikeres, az email opcionális
        }

        return { success: true };
    } catch (err) {
        // #region agent log
        const errMsg = err instanceof Error ? err.message : String(err);
        fetch('http://127.0.0.1:7296/ingest/0d54fc1c-c5ae-4811-ae09-b5e164628bcf', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '41e666' }, body: JSON.stringify({ sessionId: '41e666', location: 'statisztak.ts:catch', message: 'Unexpected error', data: { errMsg }, timestamp: Date.now(), hypothesisId: 'H2' }) }).catch(() => {});
        // #endregion
        console.error('[submitExtrasSignup] Unexpected error', err);
        return { error: 'Valami félrement. Próbáld meg később, vagy írj a stábnak.' };
    }
}

export type StatisztaSignup = {
    id: string;
    created_at: string;
    full_name: string;
    email: string;
    availability_slot: string;
    preferred_role: string | null;
    notes: string | null;
    pizza_preference: string;
    confirmed_attendance: boolean;
    future_interest: boolean;
    accepts_code: boolean;
};

export type StatisztaAdminData = {
    signups: StatisztaSignup[];
    stats: { total: number; magyaros: number; vegetarian: number };
};

export async function getStatisztaSignups(token: string | null): Promise<{ error: string } | StatisztaAdminData> {
    const expectedToken = process.env.STATISZTA_ADMIN_TOKEN;
    if (!expectedToken || token !== expectedToken) {
        return { error: 'Hozzáférés megtagadva.' };
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('statiszta_signups')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[getStatisztaSignups]', error);
            return { error: 'Nem sikerült betölteni az adatokat.' };
        }

        const signups = (data ?? []) as StatisztaSignup[];
        const magyaros = signups.filter((s) => s.pizza_preference === 'magyaros').length;
        const vegetarian = signups.filter((s) => s.pizza_preference === 'vegetarian').length;

        return {
            signups,
            stats: { total: signups.length, magyaros, vegetarian },
        };
    } catch (err) {
        console.error('[getStatisztaSignups]', err);
        return { error: 'Valami hiba történt.' };
    }
}

export async function deleteStatisztaSignup(
    id: string,
    token: string | null
): Promise<{ error?: string; success?: boolean }> {
    const expectedToken = process.env.STATISZTA_ADMIN_TOKEN;
    if (!expectedToken || token !== expectedToken) {
        return { error: 'Hozzáférés megtagadva.' };
    }

    if (!id) {
        return { error: 'Hiányzó azonosító.' };
    }

    try {
        const { error } = await supabaseAdmin.from('statiszta_signups').delete().eq('id', id);

        if (error) {
            console.error('[deleteStatisztaSignup]', error);
            return { error: 'Nem sikerült törölni a jelentkezést.' };
        }
        return { success: true };
    } catch (err) {
        console.error('[deleteStatisztaSignup]', err);
        return { error: 'Valami hiba történt.' };
    }
}
