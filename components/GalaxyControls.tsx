"use client";

import Card from './Card';
import { Sliders, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalaxyConfig {
    starColor: string;
    starCount: number;
    speed: number;
    planetCount: number;
}

interface GalaxyControlsProps {
    config: GalaxyConfig;
    onChange: (newConfig: GalaxyConfig) => void;
}

export default function GalaxyControls({ config, onChange }: GalaxyControlsProps) {
    // Local state to track sliders immediately without causing re-renders upstream
    const [localConfig, setLocalConfig] = useState(config);

    // Sync local state if parent config changes (e.g. initial load)
    useEffect(() => {
        setLocalConfig(config);
    }, [config]);

    const handleLocalChange = (key: keyof GalaxyConfig, value: any) => {
        setLocalConfig({ ...localConfig, [key]: value });
    };

    const handleCommit = (key: keyof GalaxyConfig, value: any) => {
        onChange({ ...config, [key]: value });
    };

    return (
        <Card className="fixed top-8 right-8 w-80 z-20 backdrop-blur-xl bg-black/40 border-white/10 p-6 space-y-6">
            <div className="flex items-center space-x-2 text-white/90 border-b border-white/10 pb-4">
                <Sliders className="w-5 h-5" />
                <h2 className="font-bold">Galaxy Config</h2>
            </div>

            <div className="space-y-4">
                {/* Star Color - Instant update is fine for color */}
                <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Star Color</label>
                    <div className="flex space-x-2">
                        {['#f272c8', '#5b21b6', '#3b82f6', '#f59e0b', '#10b981', '#ffffff'].map((color) => (
                            <button
                                key={color}
                                onClick={() => handleCommit('starColor', color)}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${localConfig.starColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Star Count - Needs commit on release */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-white/50 tracking-wider">
                        <label>Density</label>
                        <span>{localConfig.starCount}</span>
                    </div>
                    <input
                        type="range"
                        min="100"
                        max="100000"
                        step="100"
                        value={localConfig.starCount}
                        onChange={(e) => handleLocalChange('starCount', Number(e.target.value))}
                        onMouseUp={(e) => handleCommit('starCount', Number(e.currentTarget.value))}
                        onTouchEnd={(e) => handleCommit('starCount', Number(e.currentTarget.value))}
                        className="w-full accent-fuchsia-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Speed - Needs commit on release */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-white/50 tracking-wider">
                        <label>Rotation Speed</label>
                        <span>{localConfig.speed.toFixed(1)}x</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        step="0.1"
                        value={localConfig.speed}
                        onChange={(e) => handleLocalChange('speed', Number(e.target.value))}
                        onMouseUp={(e) => handleCommit('speed', Number(e.currentTarget.value))}
                        onTouchEnd={(e) => handleCommit('speed', Number(e.currentTarget.value))}
                        className="w-full accent-cyan-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Planets - Needs commit on release */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-white/50 tracking-wider">
                        <label>Planets</label>
                        <span>{localConfig.planetCount}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        step="1"
                        value={localConfig.planetCount}
                        onChange={(e) => handleLocalChange('planetCount', Number(e.target.value))}
                        onMouseUp={(e) => handleCommit('planetCount', Number(e.currentTarget.value))}
                        onTouchEnd={(e) => handleCommit('planetCount', Number(e.currentTarget.value))}
                        className="w-full accent-emerald-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="text-xs text-white/30 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    <span>Updates apply on release</span>
                </div>
            </div>
        </Card>
    );
}
