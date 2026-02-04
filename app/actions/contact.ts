'use server';

import nodemailer from 'nodemailer';

export async function sendContactAction(formData: { name: string; email: string; message: string }) {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
        return { error: 'Minden mező kitöltése kötelező.' };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'info@titoksorozat.hu',
            replyTo: email,
            subject: `ÚJ ÜZENET: ${name} (Kapcsolati Form)`,
            text: `Név: ${name}\nEmail: ${email}\n\nÜzenet:\n${message}`,
            html: `
                <div style="background-color: #050505; color: #E6E6E6; padding: 40px; font-family: sans-serif;">
                    <h2 style="color: #7A1111; border-bottom: 1px solid #7A1111; padding-bottom: 10px;">ÚJ KAPCSOLATFELVÉTEL</h2>
                    <p><strong>Név:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <div style="margin-top: 20px; padding: 20px; background: #111; border-left: 4px solid #7A1111;">
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Contact Action Error:', error);
        return { error: 'Nem sikerült elküldeni az üzenetet. Kérjük próbáld meg később.' };
    }
}
