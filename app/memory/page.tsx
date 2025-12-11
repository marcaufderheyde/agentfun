'use client';

import MemoryGame from '@/components/MemoryGame';
import { useTheme } from '@/components/ThemeContext';
import { useMemo } from 'react';

export default function MemoryPage() {
    const { theme } = useTheme();

    return (
        <main className="min-h-screen py-24 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background handled by Layout globally now */}

            <div className="z-10 w-full max-w-4xl text-center">
                <h1
                    className="text-4xl md:text-5xl font-black mb-2 tracking-tight text-transparent bg-clip-text"
                    style={{
                        backgroundImage: `linear-gradient(to bottom right, #ffffff, ${theme.accent})`
                    }}
                >
                    Neon Memory
                </h1>
                <p className="text-slate-400 mb-12">Match the pairs. Challenge your mind.</p>

                <MemoryGame />
            </div>
        </main>
    );
}
