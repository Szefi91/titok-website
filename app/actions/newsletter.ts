'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for 25/587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export async function subscribeAction(formData: { name: string; email: string }) {
    const { name } = formData;
    const email = formData.email?.toLowerCase().trim();

    console.log('--- SUBSCRIBE ATTEMPT ---');
    console.log('Name:', name);
    console.log('Email:', email);

    if (!name || !email) {
        console.error('Validation failed: Missing name or email');
        return { error: 'Név és email megadása kötelező!' };
    }

    if (process.env.NODE_ENV !== 'development') {
        const cookieStore = await cookies();
        const isSubscribed = cookieStore.get('titok_subscribed');
        if (isSubscribed) {
            console.log('Already subscribed (cookie check)');
            return { error: 'Te már feliratkoztál a hírlevélre!' };
        }
    }

    try {
        console.log('Inserting into Supabase...');
        const { data, error: dbError } = await supabaseAdmin
            .from('newsletter_subscribers')
            .insert([{ name, email }])
            .select('id')
            .single();

        let subscriberId = data?.id;

        if (dbError) {
            console.log('Supabase Error Code:', dbError.code);
            console.log('Supabase Error Msg:', dbError.message);

            if (dbError.code === '23505') {
                if (process.env.NODE_ENV !== 'development') {
                    return { error: 'Ez az email cím már a rendszerben van!' };
                }
                console.log('Duplicate email in dev, fetching existing ID...');
                const { data: existing } = await supabaseAdmin
                    .from('newsletter_subscribers')
                    .select('id')
                    .eq('email', email)
                    .single();

                if (existing) {
                    subscriberId = existing.id;
                    console.log('Existing ID found:', subscriberId);
                }
            } else {
                console.error('Unhandled DB Error:', dbError);
                throw dbError;
            }
        } else {
            console.log('Successfully inserted. ID:', subscriberId);
        }

        const unsubscribeLink = `https://titoksorozat.hu/leiratkozas?id=${subscriberId}`;

        console.log('Sending email via Nodemailer...');
        const mailOptions = {
            from: '"TITOK" <info@titoksorozat.hu>',
            to: email,
            subject: 'Üdvözlünk a TITOK világában',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
                    <style>
                        body { 
                            font-family: 'Inter', sans-serif; 
                            background-color: #050505; 
                            color: #E6E6E6; 
                            margin: 0; 
                            padding: 0; 
                        }
                        .email-wrapper { 
                            background-color: #050505; 
                            padding: 60px 20px; 
                        }
                        .container { 
                            max-width: 500px; 
                            margin: 0 auto; 
                            background-color: #080808; 
                            padding: 60px 50px; 
                            border: 1px solid rgba(122, 17, 17, 0.2);
                        }
                        .header { text-align: center; margin-bottom: 50px; }
                        .logo { 
                            font-family: 'Oswald', sans-serif;
                            font-size: 48px; 
                            letter-spacing: 20px; 
                            color: #E6E6E6; 
                            font-weight: 200; 
                            text-transform: uppercase;
                            margin: 0;
                            padding-left: 20px; 
                        }
                        .divider { 
                            width: 30px; 
                            height: 1px; 
                            background-color: #7A1111; 
                            margin: 25px auto; 
                        }
                        .welcome-text {
                            font-family: 'Oswald', sans-serif;
                            font-size: 20px;
                            letter-spacing: 4px;
                            text-transform: uppercase;
                            color: #ffffff;
                            margin-bottom: 30px;
                            text-align: center;
                        }
                        .content { 
                            line-height: 2; 
                            color: #A0A0A0; 
                            font-size: 14px;
                            letter-spacing: 1px;
                        }
                        .list-section {
                            margin: 40px 0;
                            border-top: 1px solid rgba(255,255,255,0.03);
                            padding-top: 30px;
                        }
                        .list-item { 
                            margin-bottom: 15px; 
                            display: block;
                        }
                        .bullet { color: #7A1111; font-weight: bold; margin-right: 10px; }
                        .footer { 
                            margin-top: 80px; 
                            text-align: center; 
                            color: #404040; 
                            font-size: 10px; 
                            text-transform: uppercase;
                            letter-spacing: 3px;
                        }
                        .accent-text { color: #7A1111; font-weight: bold; }
                        .unsub-link {
                            color: #404040;
                            text-decoration: underline;
                            font-size: 9px;
                        }
                        .unsub-link:hover { color: #7A1111; }
                    </style>
                </head>
                <body>
                    <div class="email-wrapper">
                        <div class="container">
                            <div class="header">
                                <h1 class="logo">TITOK</h1>
                                <div class="divider"></div>
                            </div>
                            
                            <div class="welcome-text">ÜDVÖZLÜNK, ${name.toUpperCase()}</div>
                            
                            <div class="content">
                                <p>A valóság néha repedezik. Te pedig mostantól az elsők között látod meg, mi van mögötte.</p>
                                
                                <div class="list-section">
                                    <div class="list-item"><span class="bullet">></span> Friss állapotjelentések a projektről</div>
                                    <div class="list-item"><span class="bullet">></span> Interaktív közösségi feladványok</div>
                                    <div class="list-item"><span class="bullet">></span> <span class="accent-text">CASTING</span> és részvételi felhívások</div>
                                </div>
                                
                                <p style="text-align: center; margin-top: 40px; font-size: 12px; opacity: 0.7;">JELENTKEZÜNK MÉG..</p>
                            </div>
                            
                            <div class="footer">
                                <p>&copy; ${new Date().getFullYear()} TITOK PROJECT</p>
                                <p style="margin-top: 20px;">
                                    <a href="${unsubscribeLink}" class="unsub-link">Leiratkozás a hírlevélről</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        const cookieStore = await cookies();
        cookieStore.set('titok_subscribed', 'true', {
            maxAge: 60 * 60 * 24 * 365,
            path: '/',
            httpOnly: true,
        });

        console.log('--- SUCCESS ---');
        return { success: true };

    } catch (err) {
        console.error('FATAL ACTION ERROR:', err);
        return { error: 'Hiba történt a feliratkozás során.' };
    }
}
