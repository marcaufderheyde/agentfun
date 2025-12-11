"use client";

import { useState, useEffect } from 'react';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gamepad2, Trophy, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';

const ICONS = ['🎨', '🚀', '🔮', '🦄', '🌈', '⚡', '💎', '🧩'];
// Duplicate icons to create pairs
const CARDS_DATA = [...ICONS, ...ICONS];

interface MemoryCard {
    id: number;
    content: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export default function MemoryGame() {
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const shuffled = [...CARDS_DATA]
            .sort(() => Math.random() - 0.5)
            .map((content, index) => ({
                id: index,
                content,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(shuffled);
        setFlippedIndices([]);
        setMoves(0);
        setIsWon(false);
        setIsProcessing(false);
    };

    const handleCardClick = (index: number) => {
        // Prevent clicking if processing, card is already flipped/matched, or clicking same card twice
        if (isProcessing || cards[index].isFlipped || cards[index].isMatched) return;

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        // Flip the card visually
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);

        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);
            checkForMatch(newFlipped, newCards);
        }
    };

    const checkForMatch = (indices: number[], currentCards: MemoryCard[]) => {
        const [firstIndex, secondIndex] = indices;
        const firstCard = currentCards[firstIndex];
        const secondCard = currentCards[secondIndex];

        if (firstCard.content === secondCard.content) {
            // It's a match!
            const updatedCards = currentCards.map((card, i) =>
                i === firstIndex || i === secondIndex ? { ...card, isMatched: true } : card
            );
            setCards(updatedCards);
            setFlippedIndices([]);

            if (updatedCards.every(c => c.isMatched)) {
                setIsWon(true);
            }
        } else {
            // No match, flip back after delay
            setIsProcessing(true);
            setTimeout(() => {
                const resetCards = currentCards.map((card, i) =>
                    i === firstIndex || i === secondIndex ? { ...card, isFlipped: false } : card
                );
                setCards(resetCards);
                setFlippedIndices([]);
                setIsProcessing(false);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-between items-center w-full max-w-md mb-8 px-4">
                <div className="text-white/80 font-bold mb-2 flex items-center space-x-2 bg-white/5 py-2 px-4 rounded-full border border-white/10">
                    <Gamepad2 className="w-5 h-5 text-fuchsia-400" />
                    <span>Moves: <span className="text-white text-xl">{moves}</span></span>
                </div>
                <button
                    onClick={startNewGame}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white px-4 py-2 rounded-full transition-all border border-white/10"
                >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restart</span>
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-md w-full px-4">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className="aspect-square perspective-1000"
                        onClick={() => handleCardClick(index)}
                    >
                        <motion.div
                            className={clsx(
                                "relative w-full h-full preserve-3d cursor-pointer transition-shadow",
                                card.isMatched && "opacity-50 grayscale-[50%]"
                            )}
                            initial={false}
                            animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring" }}
                        >
                            {/* Back of Card */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl border border-white/10 shadow-lg flex items-center justify-center group hover:border-fuchsia-500/50 transition-colors">
                                <Sparkles className="w-6 h-6 text-fuchsia-500/30 group-hover:text-fuchsia-400/50 transition-colors" />
                            </div>

                            {/* Front of Card */}
                            <div
                                className={clsx(
                                    "absolute inset-0 backface-hidden bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl flex items-center justify-center text-4xl rotate-y-180",
                                    card.isMatched ? "border-green-500/50 bg-green-500/20" : "border-fuchsia-500 bg-fuchsia-600/20"
                                )}
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                {card.content}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isWon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                    >
                        <div className="bg-black/80 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center shadow-2xl pointer-events-auto">
                            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
                            <h2 className="text-4xl font-black text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
                                Victory!
                            </h2>
                            <p className="text-slate-300 text-lg mb-8">You completed it in <span className="text-white font-bold">{moves}</span> moves.</p>
                            <button
                                onClick={startNewGame}
                                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform active:scale-95"
                            >
                                Play Again
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
