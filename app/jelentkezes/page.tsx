import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExtrasForm from '@/components/ExtrasForm';
export const metadata: Metadata = {
    title: 'Csatlakozz a Stábhoz - TITOK Sorozat',
    description: 'Jelentkezz a TITOK sorozat stábjába, statisztának vagy háttérmunkásnak. Lépj be a filmes kulisszák mögé!',
    keywords: ['TITOK stáb', 'Statiszta jelentkezés', 'Forgatás', 'Színész casting', 'Közösség'],
    openGraph: {
        title: 'Csatlakozz a Stábhoz - TITOK',
        description: 'Légy részese a TITOK 4. évadának. Jelentkezz statisztának vagy stáb tagnak.',
        images: [{ url: '/og-main.png', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
    }
};

export default function StatisztakPage() {
    return (
        <main className="min-h-screen bg-black relative cursor-none-custom font-body overflow-x-hidden selection:bg-red-900/40 selection:text-white">
            <Header />

            <div className="pt-24 pb-12 sm:pt-32 sm:pb-20 relative px-2 sm:px-4 flex justify-center items-start min-h-[calc(100vh-200px)]">
                <ExtrasForm />
            </div>

            <Footer />
        </main>
    );
}
