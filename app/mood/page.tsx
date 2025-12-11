"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { Palette, Check } from 'lucide-react';

const themes = [
    { name: 'Vivid Default', bg: '#0f172a', accent: '#a855f7' },
    { name: 'Midnight', bg: '#000000', accent: '#3b82f6' },
    { name: 'Forest', bg: '#022c22', accent: '#22c55e' },
    { name: 'Sunset', bg: '#431407', accent: '#f97316' },
    { name: 'Rose', bg: '#4c0519', accent: '#f43f5e' },
];

export default function MoodPage() {
    const [currentTheme, setCurrentTheme] = useState(themes[0]);

    // Apply theme to root element
    useEffect(() => {
        const root = document.documentElement;
        // We can interact with the global CSS variables here
        // But for this demo, we might need a more robust context. 
        // However, direct modification works for visual proof of concept.

        // Note: This relies on the global CSS using these vars, or we can override specific classes.
        // Since our original global.css uses hardcoded gradients for .bg-mesh, 
        // we'll use inline styles on the body or a specific wrapper if we want to change it fully.

        // Let's try to update the blob colors if possible, or just set a new background color override.
        document.body.style.backgroundColor = currentTheme.bg;
    }, [currentTheme]);

    return (
        <main className="min-h-screen p-8 md:p-24 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
                        <Palette className="w-10 h-10 text-fuchsia-400" />
                        Mood Controller
                    </h1>
                    <p className="text-slate-400 text-lg">Set the vibe for your dashboard.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {themes.map((theme) => (
                        <Card
                            key={theme.name}
                            className={`cursor-pointer group hover:bg-white/10 relative overflow-hidden transition-all ${currentTheme.name === theme.name ? 'ring-2 ring-white/50 bg-white/10' : ''}`}
                            onClick={() => setCurrentTheme(theme)}
                        >
                            <div className="flex items-center space-x-4 relative z-10">
                                <div
                                    className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg"
                                    style={{ backgroundColor: theme.bg }}
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{theme.name}</h3>
                                    <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="h-full w-2/3"
                                            style={{ backgroundColor: theme.accent }}
                                        />
                                    </div>
                                </div>
                                {currentTheme.name === theme.name && (
                                    <div className="bg-white/20 p-2 rounded-full">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Preview Gradient */}
                            <div
                                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                                style={{ background: `linear-gradient(45deg, ${theme.bg}, ${theme.accent})` }}
                            />
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
