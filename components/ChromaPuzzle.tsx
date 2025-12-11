"use client";

import { useState, useEffect } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Trophy, CheckCircle2 } from 'lucide-react';
import Card from './Card';

interface ColorTile {
    id: string;
    color: string;
    correctIndex: number;
}

// Generate a gradient of colors
const generateGradient = (steps: number): string[] => {
    const colors = [];
    const startHue = Math.random() * 360;
    const endHue = startHue + 120; // 120 degree shift

    for (let i = 0; i < steps; i++) {
        const h = startHue + (endHue - startHue) * (i / (steps - 1));
        colors.push(`hsl(${h}, 70%, 60%)`);
    }
    return colors;
};

export default function ChromaPuzzle() {
    const [items, setItems] = useState<ColorTile[]>([]);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const gradient = generateGradient(10); // 10 steps
        const tiles = gradient.map((color, index) => ({
            id: `tile-${index}`,
            color,
            correctIndex: index,
        }));

        // Shuffle
        const shuffled = [...tiles].sort(() => Math.random() - 0.5);
        setItems(shuffled);
        setIsWon(false);
    };

    const handleReorder = (newOrder: ColorTile[]) => {
        setItems(newOrder);
        checkWin(newOrder);
    };

    const checkWin = (currentOrder: ColorTile[]) => {
        // Check if every item is in its correct original index
        const isSorted = currentOrder.every((item, index) => item.correctIndex === index);
        if (isSorted) {
            setIsWon(true);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-fuchsia-500" />
                    Sort by Hue
                </h2>
                <button
                    onClick={startNewGame}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    title="Shuffle"
                >
                    <Shuffle className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="relative">
                <Reorder.Group
                    axis="y"
                    values={items}
                    onReorder={handleReorder}
                    className="space-y-2"
                >
                    {items.map((item) => (
                        <Reorder.Item
                            key={item.id}
                            value={item}
                            className="cursor-grab active:cursor-grabbing relative"
                            whileDrag={{ scale: 1.05, zIndex: 10, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                        >
                            <div
                                className="h-12 w-full rounded-xl shadow-sm border border-white/10 flex items-center justify-between px-4 group"
                                style={{ backgroundColor: item.color }}
                            >
                                {/* Visual indicator (optional) */}
                                <div className="w-1 h-4 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Correctness hint only when won or maybe very subtle? Let's keep it purely visual for now */}
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                <AnimatePresence>
                    {isWon && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col items-center">
                                <CheckCircle2 className="w-16 h-16 text-white mb-2 drop-shadow-md" />
                                <span className="font-bold text-2xl text-white drop-shadow-md">Perfect!</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
