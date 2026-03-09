import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExtrasForm from '@/components/ExtrasForm';

export const metadata: Metadata = {
    title: 'TITOK • Március 29. statiszta jelentkezés',
    description:
        'Gödöllő, Páter Károly u. 1. Szőkőkút • 2026.03.29 • 12:40 gyülekező • 13:00-16:00 forgatás – jelentkezz civil ruhában.',
    alternates: {
        canonical: '/s29',
    },
    openGraph: {
        title: 'TITOK – Március 29. statiszta felhívás',
        description: 'Gödöllő, Szőkőkút • gyülekező 12:40 • 13:00-16:00 • civil ruha • víz + pizza • önkéntes statiszták keresve.',
        url: 'https://titoksorozat.hu/s29',
    },
};

export default function S29Page() {
    return (
        <main className="min-h-screen bg-[#050505] relative pt-20 pb-20 px-3 sm:px-4 md:pt-24 cursor-none-custom min-h-[100dvh]">
            <Header />
            <div className="container mx-auto max-w-5xl">
                <ExtrasForm />
            </div>
            <section className="mt-12 md:mt-16">
                <Footer />
            </section>
        </main>
    );
}
