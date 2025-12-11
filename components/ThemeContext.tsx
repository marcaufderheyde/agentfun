'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = {
    name: string;
    bg: string;
    accent: string;
};

export const themes: Theme[] = [
    { name: 'Vivid Default', bg: '#0f172a', accent: '#a855f7' },
    { name: 'Midnight', bg: '#000000', accent: '#3b82f6' },
    { name: 'Forest', bg: '#022c22', accent: '#22c55e' },
    { name: 'Sunset', bg: '#431407', accent: '#f97316' },
    { name: 'Rose', bg: '#4c0519', accent: '#f43f5e' },
];

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(themes[0]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load from local storage
        const saved = localStorage.getItem('vivid-theme');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Validate if it's a known theme structure or just use it
                setThemeState(parsed);
            } catch (e) {
                console.error('Failed to parse theme', e);
            }
        }
        setMounted(true);
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('vivid-theme', JSON.stringify(newTheme));
    };

    useEffect(() => {
        if (!mounted) return;
        // Apply theme globally
        document.body.style.backgroundColor = theme.bg;
        // We can also set CSS variables if needed
        document.documentElement.style.setProperty('--theme-accent', theme.accent);
    }, [theme, mounted]);

    // Avoid hydration mismatch by rendering children only after mount if the theme changes significantly layout
    // But for just style, it's usually fine to render. However, to correspond with local storage read:
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
