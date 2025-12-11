'use client';

import Scene from '@/components/game/Scene';
import { Crosshair } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

export default function WorldPage() {
    const score = useGameStore((state) => state.score);

    return (
        <main className="h-screen w-full relative bg-black">
            <Scene />

            {/* HUD */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            NEON RUNNER
                        </h1>
                        <p className="text-white/60 font-mono text-sm">WASD to Move • SPACE to Jump</p>
                    </div>

                    <div className="text-right">
                        <h2 className="text-6xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] tabular-nums">
                            {score}
                        </h2>
                        <p className="text-white/60 font-mono text-sm uppercase">Score</p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    {/* Centered hints or stats could go here */}
                </div>
            </div>

            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                <Crosshair size={24} strokeWidth={1} />
            </div>
        </main>
    );
}
