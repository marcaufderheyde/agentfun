"use client";

import { useState } from 'react';
import Card from './Card';
import { CheckCircle, Circle, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FocusWidget() {
    const [focus, setFocus] = useState('');
    const [isSet, setIsSet] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (focus.trim()) setIsSet(true);
    };

    return (
        <Card className="h-full flex flex-col items-start justify-center p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

            <div className="mb-4 flex items-center space-x-2 text-violet-300">
                <Target className="w-5 h-5" />
                <h3 className="uppercase tracking-widest text-xs font-bold">Main Focus</h3>
            </div>

            <AnimatePresence mode="wait">
                {!isSet ? (
                    <motion.form
                        key="input"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            value={focus}
                            onChange={(e) => setFocus(e.target.value)}
                            placeholder="What is your main goal today?"
                            className="w-full bg-transparent text-3xl font-bold placeholder:text-slate-600 outline-none border-b-2 border-transparent focus:border-violet-500/50 transition-all text-white"
                            autoFocus
                        />
                    </motion.form>
                ) : (
                    <motion.div
                        key="display"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center space-x-4 cursor-pointer group"
                        onClick={() => setCompleted(!completed)}
                    >
                        <button className="text-violet-400 group-hover:text-violet-300 transition-colors">
                            {completed ? <CheckCircle className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                        </button>
                        <span className={`text-3xl font-bold transition-all decoration-4 decoration-violet-500/50 ${completed ? 'line-through text-slate-500' : 'text-white'}`}>
                            {focus}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
