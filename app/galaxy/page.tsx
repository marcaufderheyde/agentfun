"use client";

import { useState } from 'react';
import GalaxyScene from '@/components/3d/GalaxyScene';
import GalaxyControls from '@/components/GalaxyControls';

export default function GalaxyPage() {
    const [config, setConfig] = useState({
        starColor: '#f272c8',
        starCount: 2000,
        speed: 1.0,
        planetCount: 5,
    });

    return (
        <main className="min-h-screen relative overflow-hidden bg-black">
            {/* UI Overlay */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 tracking-tight">Galaxy Void</h1>
                <p className="text-white/50 mt-2">WASD to explore. Drag to look.</p>
            </div>

            <GalaxyControls config={config} onChange={setConfig} />
            <GalaxyScene config={config} />
        </main>
    );
}
