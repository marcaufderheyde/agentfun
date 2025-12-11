"use client";

import Card from './Card';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const quotes = [
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
    { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
];

export default function QuoteWidget() {
    // Simple random quote on mount (hydration safe)
    const [index, setIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setIndex(Math.floor(Math.random() * quotes.length));
        setMounted(true);
    }, []);

    if (!mounted) return <Card className="h-full" >...</Card>;

    const quote = quotes[index];

    return (
        <Card className="h-full flex flex-col justify-between group cursor-pointer" onClick={() => setIndex((prev) => (prev + 1) % quotes.length)}>
            <Quote className="w-8 h-8 text-fuchsia-400 mb-4 opacity-50" />
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col justify-center"
            >
                <p className="text-xl font-medium leading-relaxed text-slate-100">
                    "{quote.text}"
                </p>
                <p className="mt-4 text-sm text-fuchsia-300 font-semibold uppercase tracking-wider">
                    — {quote.author}
                </p>
            </motion.div>
            <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-fuchsia-500/50 w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
        </Card>
    );
}
