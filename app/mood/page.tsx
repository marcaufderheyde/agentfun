"use client";

import { useEffect } from 'react';
import Card from '@/components/Card';
import { Palette, Check } from 'lucide-react';
import { useTheme, themes } from '@/components/ThemeContext';

export default function MoodPage() {
    const { theme: currentTheme, setTheme } = useTheme();

    // No need for local effect, the context handles body style injection

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
                            onClick={() => setTheme(theme)}
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
