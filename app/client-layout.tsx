'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const NeuralBackground = dynamic(
    () => import('@/components/background/NeuralBackground'),
    { ssr: false }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <NeuralBackground />
            <Navbar />
            <main style={{ paddingTop: '96px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
                {children}
            </main>
        </ThemeProvider>
    );
}
