"use client";

import { useEffect, useState } from 'react';
import Card from './Card';
import { motion } from 'framer-motion';

export default function ClockWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const isPM = hours >= 12;

    return (
        <Card className="h-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col items-center z-10">
                <div className="flex items-baseline space-x-1">
                    <motion.span
                        key={hours}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-6xl font-bold tracking-tighter"
                    >
                        {hours % 12 || 12}
                    </motion.span>
                    <span className="text-6xl font-bold text-slate-400 animate-pulse">:</span>
                    <motion.span
                        key={minutes}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-6xl font-bold tracking-tighter"
                    >
                        {minutes.toString().padStart(2, '0')}
                    </motion.span>
                    <span className="text-xl font-medium text-slate-400 ml-2">{isPM ? 'PM' : 'AM'}</span>
                </div>
                <div className="mt-2 text-slate-400 text-sm uppercase tracking-widest font-semibold">
                    {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
            </div>
        </Card>
    );
}
