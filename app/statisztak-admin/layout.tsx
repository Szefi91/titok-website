import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Statiszta admin',
    robots: { index: false, follow: false },
};

export default function StatisztakAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
