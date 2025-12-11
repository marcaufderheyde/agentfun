"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Palette, LayoutDashboard, Brain, Grid3X3, Rocket, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/', label: 'Home', icon: LayoutDashboard },
    { path: '/zen', label: 'Zen', icon: Sparkles },
    { path: '/mood', label: 'Mood', icon: Palette },
    { path: '/memory', label: 'Memory', icon: Brain },
    { path: '/chroma', label: 'Chroma', icon: Grid3X3 },
    { path: '/galaxy', label: 'Galaxy', icon: Rocket },
    { path: '/warp', label: 'Warp', icon: Zap },
    { path: '/world', label: 'World', icon: Globe },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="glass px-2 py-2 rounded-full flex items-center space-x-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="relative px-6 py-3 rounded-full transition-colors"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/20 rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className={`relative z-10 flex items-center space-x-2 ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium hidden md:inline">{item.label}</span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
