import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductionRoadmap from '@/components/ProductionRoadmap';
import { getRoadmapPhases } from '@/app/actions/roadmap';
export const metadata: Metadata = {
    title: 'Idővonal - TITOK Sorozat',
    description: 'Kövesd nyomon a TITOK sorozat 4. évadának készülését. Sztori, forgatás, utómunka és minden fontos állomás valós időben.',
    keywords: ['TITOK sorozat', 'Roadmap', 'Idővonal', 'Forgatás', 'Kulisszatitkok', 'Státusz'],
    openGraph: {
        title: 'Idővonal - TITOK Sorozat',
        description: 'Kövesd nyomon a TITOK sorozat 4. évadának készülését. Sztori, forgatás, utómunka és minden fontos állomás.',
        images: [{ url: '/og-main.png', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
    }
};

export const revalidate = 60; // Revalidate every minute, or can use on-demand revalidation

export default async function RoadmapPage() {
    const phases = await getRoadmapPhases();

    return (
        <main className="min-h-screen bg-[#050505] relative cursor-none-custom font-body">
            <Header />

            <div className="pt-20">
                {phases.length > 0 ? (
                    <ProductionRoadmap phases={phases} />
                ) : (
                    <div className="py-32 text-center text-muted">
                        Jelenleg nincsenek feltöltve roadmap fázisok.
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
