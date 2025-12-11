'use client';

import { useTheme } from './ThemeContext';

export default function ThemeBackground() {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700" style={{ backgroundColor: theme.bg }}>
            {/* Dynamic Blobs */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] animate-blob transition-colors duration-1000 opacity-20"
                style={{ backgroundColor: theme.accent }}
            />
            <div
                className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] animate-blob animation-delay-2000 transition-colors duration-1000 opacity-20"
                style={{ backgroundColor: theme.accent }}
            />
            <div
                className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full blur-[100px] animate-blob animation-delay-4000 transition-colors duration-1000 opacity-20"
                style={{ backgroundColor: theme.bg === '#000000' ? '#ffffff' : theme.accent }}
            />
        </div>
    );
}
